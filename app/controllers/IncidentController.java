package controllers;

import actions.SimpleKeycloakAuthAction;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.google.inject.Inject;
import modelHelper.limited.LimitedIncident;
import models.Incident;
import models.UserContext;
import play.Logger;
import play.cache.SyncCacheApi;
import play.libs.Json;
import play.libs.concurrent.HttpExecutionContext;
import play.mvc.Controller;
import play.mvc.Result;
import play.mvc.With;
import utils.HashUtil;
import utils.KeycloakTokenUtil;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import static utils.RequestUtils.addCORS;

public class IncidentController extends Controller {

    @Inject
    private HttpExecutionContext httpExecutionContext;

    @Inject
    private SyncCacheApi cache;

    public Result optionReq() {
        return addCORS(ok("{}"));
    }

    public Result optionReq(int firstRow, int maxRows) {
        return addCORS(ok("{}"));
    }

    public Result optionReqWithId(long id) {
        return addCORS(ok("{}"));
    }

    public Result optionSearchReq(int firstRow, int maxRows, String searchExpression) {
        return addCORS(ok("{}"));
    }

    @With(SimpleKeycloakAuthAction.class)
    public Result incidentStubs(int firstRow, int maxRows) {
        Optional<String> tokenOpt = KeycloakTokenUtil.getToken(ctx().request().getHeaders());
        if (tokenOpt.isPresent()) {
            String token = tokenOpt.get();
            UserContext uc = cache.get(HashUtil.hashString(token));
            Logger.debug("userContext: " + uc.toString());
            List<JsonNode> incidents = Incident.findStubsJson(firstRow, maxRows, uc);
            JsonNode jsonNode = Json.toJson(incidents);
            return addCORS(ok(jsonNode));
        } else
            return addCORS(unauthorized("no valid token"));
    }

    @With(SimpleKeycloakAuthAction.class)
    public Result updateIncident(long id) {
        Optional<String> tokenOpt = KeycloakTokenUtil.getToken(ctx().request().getHeaders());
        if (tokenOpt.isPresent()) {
            String token = tokenOpt.get();
            UserContext uc = cache.get(HashUtil.hashString(token));
            JsonNode json = request().body().asJson();
            if (json == null || json.toString().equalsIgnoreCase("{}")) {
                return badRequest("Expecting Json data");
            } else {
                try {
                    Incident incident = Incident.updateIncidentJson(json, uc);
                    return addCORS(ok(Json.parse(incident.incident)));
                } catch (Exception exception) {
                    Logger.error("updateIncident", exception);
                    return addCORS(unauthorized("missing access rights to update incident"));
                }

            }
        } else
            return addCORS(unauthorized("no valid token"));
    }

    @With(SimpleKeycloakAuthAction.class)
    public Result createIncident() {
        Optional<String> tokenOpt = KeycloakTokenUtil.getToken(ctx().request().getHeaders());
        if (tokenOpt.isPresent()) {
            String token = tokenOpt.get();
            UserContext uc = cache.get(HashUtil.hashString(token));
            JsonNode json = request().body().asJson();
            if (json == null || json.toString().equalsIgnoreCase("{}")) {
                return badRequest("Expecting Json data");
            } else {
                Incident incident = Incident.createIncidentJson(json, uc);
                return addCORS(ok(Json.parse(incident.incident)));
            }
        } else
            return addCORS(unauthorized("no valid token"));
    }

    @With(SimpleKeycloakAuthAction.class)
    public Result getIncident(long id) throws Exception {
        Optional<String> tokenOpt = KeycloakTokenUtil.getToken(ctx().request().getHeaders());
        if (tokenOpt.isPresent()) {
            String token = tokenOpt.get();
            UserContext uc = cache.get(HashUtil.hashString(token));
            Incident incident = Incident.findById(id);
            ObjectNode on = Json.newObject();
            Set<String> accessRights = uc.getAccessRights(incident);
            if (accessRights.contains(UserContext.LIMITED))
                on.set("incident", limitIncident(Json.parse(incident.incident)));
            else
                on.set("incident", Json.parse(incident.incident));
            on.set("access_rights", Json.toJson(accessRights));
            return addCORS(ok(on));
        } else
            return addCORS(unauthorized("no valid token"));
    }

    @With(SimpleKeycloakAuthAction.class)
    public Result searchIncidents(int firstRow, int maxRows, String searchExpression) {
        Optional<String> tokenOpt = KeycloakTokenUtil.getToken(ctx().request().getHeaders());
        if (tokenOpt.isPresent()) {
            String token = tokenOpt.get();
            UserContext uc = cache.get(HashUtil.hashString(token));
            Logger.debug("userContext: " + uc.toString());
            List<JsonNode> incidentsJson = Incident.findStubsJson(0, 100, searchExpression, uc);
            return addCORS(ok(Json.toJson(incidentsJson)));
        } else
            return addCORS(unauthorized("no valid token"));
    }

    private JsonNode limitIncident(JsonNode incidentJson) {
        LimitedIncident li = Json.fromJson(incidentJson, LimitedIncident.class);
        //String incidentString = incidentJson.toString();
        return Json.toJson(li);
//        return incidentJson;
    }

}
