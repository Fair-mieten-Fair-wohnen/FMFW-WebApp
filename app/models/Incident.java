package models;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import finder.IncidentFinder;
import io.ebean.ExpressionList;
import io.ebean.Finder;
import modelHelper.IncidentHelper;
import modelHelper.IncidentResult;
import modelHelper.IncidentStub;
import modelHelper.ValueListHelper;
import org.joda.time.DateTime;
import org.joda.time.Instant;
import play.Logger;
import play.data.validation.Constraints;
import play.libs.Json;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.util.*;

//@History
@Entity
@Table(name = "incidents")
public class Incident extends BaseModel {

    @Constraints.Required
    @Column(name = "incident_type")
    public String incidentType;

    @Constraints.Required
    @Column(name = "incident")
    public String incident;

    //@WhenCreated
    @Constraints.Required
    @Column(name = "created")
    public Date created = new Date();

    //@WhenModified
    @Constraints.Required
    @Column(name = "updated")
    public Date updated = new Date();

    @Constraints.Required
    @Column(name = "institution")
    public String institution;

    //@WhoCreated
    @Constraints.Required
    @Column(name = "owner")
    public String owner;

    //@WhoModified
    @Constraints.Required
    @Column(name = "update_user")
    public String updateUser;

    public static final Finder<Long, Incident> find = new IncidentFinder();

    public static IncidentResult findAll(UserContext userContext) {
        return findPaged(0, 100, userContext);
    }

    public static IncidentResult findPaged(int firstRow, int maxRows, UserContext userContext) {
        int size = find
                .query().findCount();

        List<Incident> result = find
                .query()
                .orderBy("id desc")
                .setFirstRow(firstRow)
                .setMaxRows(maxRows)
                .findList();

        return new IncidentResult(result, size);
    }

    public static Incident findById(long id) throws Exception {
        List<Incident> result = find.query("where id = " + id)
                .findList();
        if (result.size() > 0)
            return result.get(0);
        else
            throw new Exception("no item with id=" + id);
    }

    public static List<Incident> findByScope(String aggScope) {
        if (aggScope != null && aggScope.equals("all")) {
            return find.all();
        } else {
            List<Incident> allIncidents = find.all();
            List<Incident> scopedIncidents = new Vector<>();
            for (Incident i : allIncidents) {
                JsonNode ij = Json.parse(i.incident);
                JsonNode riNode = ij.findValue("responsible_institution");
                if (riNode != null) {
                    String ri = riNode.asText();
                    if (ri != null && ri.equals(aggScope)) {
                        scopedIncidents.add(i);
                    }
                } else {
                    Logger.error("missing responsible_institution: " + i.id.toString());
                }
            }
            return scopedIncidents;
        }
    }

    public static Incident updateIncidentJson(JsonNode json, UserContext userContext) throws Exception {
        if (json.get("id") != null) {
            Instant updated = Instant.now();
            long id = json.get("id").asLong();

            ObjectNode on = Json.newObject();
            Iterator<String> jItr = json.fieldNames();
            while (jItr.hasNext()) {
                String key = jItr.next();
                on.set(key, json.get(key));
            }

            // here we clean up incident json doc related to type
            Optional<ObjectNode> onOpt = IncidentHelper.fixIncident(json.get("id").asInt(), on);
            if (onOpt.isPresent()) {
                on = onOpt.get();
            } else {
                throw new Exception("invalid json data incident id: " + json.get("id").asText());
            }

            on = ValueListHelper.filterAllInvalidOthers(on);
            on = ValueListHelper.filterAllInvalidOther(on);

            ObjectNode onMeta = on.get("metadata").deepCopy();
            onMeta.set("lastupdated_date", Json.toJson(updated.toString()));
            onMeta.set("lastupdated_user", Json.toJson(userContext.getName()));

            if (onMeta.has("external_incident")) {
                JsonNode externalIncident = onMeta.get("external_incident");
                if (!externalIncident.isBoolean()) {
                    onMeta.set("external_incident", Json.toJson(false));
                    onMeta.set("responsible_institution", Json.toJson(userContext.getInstitutionKey()));
                } else if (!externalIncident.asBoolean())
                    onMeta.set("responsible_institution", Json.toJson(userContext.getInstitutionKey()));
            } else {
                onMeta.set("external_incident", Json.toJson(false));
                onMeta.set("responsible_institution", Json.toJson(userContext.getInstitutionKey()));
            }


            on.set("metadata", onMeta);

            Incident incident = Incident.findById(id);
            if (incident.owner.equals(userContext.getUserName()) || userContext.isSuperUser()) {
                incident.incidentType = json.get("type").asText().toUpperCase();
                incident.incident = on.toString();
                incident.updated = updated.toDate();
                incident.updateUser = userContext.getUserName();
                incident.save();
                return incident;
            } else
                throw new Exception("currentUser (" + userContext.getUserName() + ") is not owner (" + incident.owner + ") of current incident: " + incident.id);
        } else
            throw new Exception("updateIncidentJson: invalid json, id missing");
    }

    public static Incident createIncidentJson(JsonNode json, UserContext userContext) {
        String type = json.get("type").asText().toUpperCase();
        Instant created = Instant.now();

        Incident incident = new Incident();
        incident.incidentType = type;
        incident.incident = "";
        incident.created = created.toDate();
        incident.updated = created.toDate();
        incident.institution = userContext.getInstitution();
        incident.owner = userContext.getUserName();
        incident.updateUser = userContext.getUserName();
        incident.save();

        IncidentStub incidentStub = IncidentStub.createInitialIncident(type, incident.id, created, userContext);
        JsonNode incidentStubJson = Json.toJson(incidentStub);
        incident.incident = incidentStubJson.toString();
        incident.save();

        return incident;
    }

    public static List<JsonNode> findStubsJson(int firstRow, int maxRows, UserContext userContext) {
        IncidentResult allIncidents = findPaged(firstRow, maxRows, userContext);
        return extractIncidentStubsJson(allIncidents, userContext);
    }

    private static IncidentResult findWithExp(int firstRow, int maxRows, String searchExpression, UserContext
            userContext) {
        ExpressionList<Incident> query;
        if (searchExpression == null || searchExpression.length() < 3) {
            return new IncidentResult(new Vector<>(), 0);
        } else if (userContext.isSuperUser())
            query = find
                    .query()
                    .orderBy("id desc")
                    .setFirstRow(firstRow)
                    .setMaxRows(maxRows)
                    .where()
                    .icontains("incident", searchExpression.trim());
        else
            query = find.query()
                    .orderBy("id desc")
                    .setFirstRow(firstRow)
                    .setMaxRows(maxRows)
                    .where()
                    .icontains("incident", searchExpression.trim())
                    .icontains("institution", userContext.getInstitution());

        int size = query.findCount();
        List<Incident> result = query
                .findList();

        return new IncidentResult(result, size);
    }

    public static List<JsonNode> findStubsJson(int firstRow, int maxRows, String searchExpression, UserContext
            userContext) {
        IncidentResult incidents = findWithExp(firstRow, maxRows, searchExpression, userContext);
        return extractIncidentStubsJson(incidents, userContext);
    }

    private static List<JsonNode> extractIncidentJson(List<Incident> incidents) {
        Iterator<Incident> itr = incidents.iterator();
        Vector<JsonNode> jsons = new Vector<>();
        while (itr.hasNext()) {
            Incident incident = itr.next();
            try {
                jsons.addElement(Json.parse(incident.incident));
            } catch (Exception e) {
                Logger.error("invalid json for incident=" + incident.id);
            }
        }
        return jsons;
    }

    private static List<JsonNode> extractIncidentStubsJson(IncidentResult incidents, UserContext userContext) {
        Vector<JsonNode> allStubsJs = new Vector<>();
        Iterator<Incident> itr = incidents.getIncidents().iterator();

        List<String> cNames = ColumnName.columnNamesByTableName("incidents");
        while (itr.hasNext()) {
            Incident incident = itr.next();
            JsonNode incidentJ = Json.parse(incident.incident);

            Set<String> uar = userContext.getAccessRights(incident);

            Iterator<String> itr2 = cNames.iterator();

            ObjectNode jo = Json.newObject();

            while (itr2.hasNext()) {
                String key = itr2.next();
                JsonNode jVal = incidentJ.findValue(key);
                jo.set(key, jVal);
            }

//            @TODO this have to be refactored, may be add rights to ColumnName table
            if (jo.has("consultant") && uar.contains(UserContext.LIMITED))
                jo.remove("consultant");

            jo.set("id", incidentJ.findValue("id"));
            jo.set("access_rights", Json.toJson(uar));
            jo.put("totalItemsCount", incidents.getTotalItemsCount());
            allStubsJs.addElement(jo);
        }
        return allStubsJs;
    }

    public Calendar getCreatedAsCal() {
        return dateToCalendar(this.created);
    }

    private Calendar dateToCalendar(Date date) {

        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        return calendar;

    }

    public static Set<Integer> getAllCreationYears(int currentYear) {
        HashSet<Integer> allCreationYears = new HashSet<>();
        allCreationYears.add(currentYear);

        int lastYear = currentYear;
        ListIterator<Incident> itr = find.all().listIterator();
        while (itr.hasNext()) {
            Incident i = itr.next();
            allCreationYears.add(i.getCreatedAsCal().get(Calendar.YEAR));
        }
        return allCreationYears;
    }

    public JsonNode getIncidentJson() {
        return Json.parse(this.incident);
    }

    public Date getBestIncidentDate() {
        JsonNode json = getIncidentJson();
        //        first try this
        Date idate = getDateFromJson(json, "generaldata.first_contact_date");
        // then try 2. option
        if (idate == null) {
            idate = getDateFromJson(json, "short_description.incident_date ");
        }
        // ok, this is our worst case fall back
        if (idate == null) {
            idate = this.created;
        }

        return idate;
    }

    public Calendar getBestIncidentCal() {
        Date date = getBestIncidentDate();
        return dateToCalendar(date);
    }

    private Date getDateFromJson(JsonNode json, String key) {
        DateTime datetime = getDateTimeFromJson(json, key);
        if (datetime != null) {
            return datetime.toDate();
        } else {
            return null;
        }
    }

    private DateTime getDateTimeFromJson(JsonNode json, String key) {
        if (json.has(key)) {
            String idateStr = json.get(key).asText();
            try {
                return DateTime.parse(idateStr);
            } catch (Exception e) {
            }
        }
        return null;
    }
}

