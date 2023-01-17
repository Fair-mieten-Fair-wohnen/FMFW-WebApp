package modelHelper;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;

import java.util.*;

public class IncidentHelper {

    final public static String INCIDENTTYPE_ALGBERATUNG = "ALLG_BERATUNG";
    final public static String INCIDENTTYPE_MELDUNG = "MELDUNG";


    final private static Set<String> invalidAllgBeratungKeys = Collections.unmodifiableSet(
            new HashSet<>(Arrays.asList(
                    "affected_person", "supporter_list", "causer_list", "short_description", "involved_list",
                    "evidence_list", "incident_typology", "process_blog_part1", "interventions", "completion")
            ));

    final private static Set<String> invalidMeldungKeys = Collections.unmodifiableSet(
            new HashSet<>(Arrays.asList(
                    "process_blog_part1", "interventions", "completion")
            ));

    final private static Set<String> invalidAnoMeldungKeys = Collections.unmodifiableSet(
            new HashSet<>(Arrays.asList(
                    "process_blog_part1", "interventions", "completion", "affected_person")
            ));


    private static Optional<ObjectNode> fixIncident(ObjectNode incidentJson, Set<String> invalidKeys) {
        ObjectNode incidentJsonBak = incidentJson.deepCopy();

        for (String key : invalidKeys) {
            if (incidentJsonBak.has(key)) {
                incidentJsonBak.remove(key);
            }
        }

        return Optional.of(incidentJsonBak);
    }

    public static Optional<ObjectNode> fixIncident(long incidentId, ObjectNode incidentJson) {

        if (incidentJson != null && incidentJson.has("type") && incidentJson.has("id") && incidentJson.get("id").asLong() == incidentId) {

            JsonNode incidentBackupJ = incidentJson.deepCopy();

            if (incidentJson.get("type").asText().equals(IncidentHelper.INCIDENTTYPE_ALGBERATUNG)) {
                return fixIncident(incidentJson, invalidAllgBeratungKeys);

            } else if (incidentJson.get("type").asText().equals(IncidentHelper.INCIDENTTYPE_MELDUNG)) {
                if (incidentJson.has("generaldata") && incidentJson.get("generaldata").has("anonymous") && incidentJson.get("generaldata").get("anonymous").asBoolean()) {
                    return fixIncident(incidentJson, invalidAnoMeldungKeys);
                } else
                    return fixIncident(incidentJson, invalidMeldungKeys);
            }

        }
        return Optional.empty();


    }


}
