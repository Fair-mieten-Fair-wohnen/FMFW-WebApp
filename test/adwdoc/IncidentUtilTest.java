package adwdoc;

import com.fasterxml.jackson.databind.node.ObjectNode;
import org.junit.Assert;
import org.junit.Test;
import play.libs.Json;
import modelHelper.IncidentHelper;

import java.util.Optional;

public class IncidentUtilTest {

    String simpleAllgBeratungStr = "{\"id\" : 1, \"type\" : \"ALLG_BERATUNG\"}";
    ObjectNode simpleAllgBeratungJson = (ObjectNode) Json.parse(simpleAllgBeratungStr);

    String allgBeratungStr = "{\"id\" : 2, \"type\" : \"ALLG_BERATUNG\", \"affected_person\" : {}}";
    ObjectNode allgBeratungJson = (ObjectNode) Json.parse(allgBeratungStr);

    String simpleMeldungStr = "{\"id\" : 3, \"type\" : \"MELDUNG\", \"generaldata\" : {\"anonymous\" : false}}";
    ObjectNode simpleMeldungJson = (ObjectNode) Json.parse(simpleMeldungStr);

    String meldungStr = "{\"id\" : 4, \"type\" : \"MELDUNG\", \"generaldata\" : {\"anonymous\" : false}, \"completion\" : {}}";
    ObjectNode meldungJson = (ObjectNode) Json.parse(meldungStr);

    String simpleAnoMeldungStr = "{\"id\" : 5, \"type\" : \"MELDUNG\", \"generaldata\" : {\"anonymous\" : true}}";
    ObjectNode simpleAnoMeldungJson = (ObjectNode) Json.parse(simpleAnoMeldungStr);

    String anoMeldungStr = "{\"id\" : 6, \"type\" : \"MELDUNG\", \"generaldata\" : {\"anonymous\" : true}, \"affected_person\" : {}}";
    ObjectNode anoMeldungJson = (ObjectNode) Json.parse(anoMeldungStr);


    @Test
    public void simple() {
        Assert.assertEquals(1, 1);
    }

    @Test
    public void simpleAllgBeratung() {
        Optional<ObjectNode> fixedDoc = IncidentHelper.fixIncident(1, simpleAllgBeratungJson);
        Assert.assertTrue(fixedDoc.isPresent());
        Assert.assertTrue(fixedDoc.get().has("id"));
        Assert.assertEquals(fixedDoc.get().get("id").intValue(), 1);
        Assert.assertTrue(fixedDoc.get().has("type"));
        Assert.assertEquals(fixedDoc.get().get("type").asText(), IncidentHelper.INCIDENTTYPE_ALGBERATUNG);
    }

    @Test
    public void fixAllgBeratung() {
        Optional<ObjectNode> fixedDoc = IncidentHelper.fixIncident(2, allgBeratungJson);

        Assert.assertTrue(allgBeratungJson.has("affected_person"));
        Assert.assertTrue(fixedDoc.isPresent());

        Assert.assertNotEquals(fixedDoc.get().has("affected_person"), true);

        Assert.assertTrue(fixedDoc.get().has("id"));
        Assert.assertEquals(fixedDoc.get().get("id").intValue(), 2);
        Assert.assertTrue(fixedDoc.get().has("type"));
        Assert.assertEquals(fixedDoc.get().get("type").asText(), IncidentHelper.INCIDENTTYPE_ALGBERATUNG);
    }

    @Test
    public void simpleMeldung() {
        Optional<ObjectNode> fixedDoc = IncidentHelper.fixIncident(3, simpleMeldungJson);
        Assert.assertTrue(fixedDoc.isPresent());
        Assert.assertTrue(fixedDoc.get().has("id"));
        Assert.assertEquals(fixedDoc.get().get("id").intValue(), 3);
        Assert.assertTrue(fixedDoc.get().has("type"));
        Assert.assertEquals(fixedDoc.get().get("type").asText(), IncidentHelper.INCIDENTTYPE_MELDUNG);
    }

    @Test
    public void fixMeldung() {
        Optional<ObjectNode> fixedDoc = IncidentHelper.fixIncident(4, meldungJson);

        Assert.assertTrue(meldungJson.has("completion"));
        Assert.assertTrue(fixedDoc.isPresent());

        Assert.assertNotEquals(fixedDoc.get().has("completion"), true);

        Assert.assertTrue(fixedDoc.get().has("id"));
        Assert.assertEquals(fixedDoc.get().get("id").intValue(), 4);
        Assert.assertTrue(fixedDoc.get().has("type"));
        Assert.assertEquals(fixedDoc.get().get("type").asText(), IncidentHelper.INCIDENTTYPE_MELDUNG);
        Assert.assertFalse(fixedDoc.get().has("completion"));
    }

    @Test
    public void simpleAnoMeldung() {
        Optional<ObjectNode> fixedDoc = IncidentHelper.fixIncident(5, simpleAnoMeldungJson);
        Assert.assertTrue(fixedDoc.isPresent());
        Assert.assertTrue(fixedDoc.get().has("id"));
        Assert.assertEquals(fixedDoc.get().get("id").intValue(), 5);
        Assert.assertTrue(fixedDoc.get().has("type"));
        Assert.assertEquals(fixedDoc.get().get("type").asText(), IncidentHelper.INCIDENTTYPE_MELDUNG);
    }

    @Test
    public void fixAnoMeldung() {
        Optional<ObjectNode> fixedDoc = IncidentHelper.fixIncident(6, anoMeldungJson);

        Assert.assertTrue(anoMeldungJson.has("affected_person"));
        Assert.assertTrue(fixedDoc.isPresent());

        Assert.assertNotEquals(fixedDoc.get().has("completion"), true);

        Assert.assertTrue(fixedDoc.get().has("id"));
        Assert.assertEquals(fixedDoc.get().get("id").intValue(), 6);
        Assert.assertTrue(fixedDoc.get().has("type"));
        Assert.assertEquals(fixedDoc.get().get("type").asText(), IncidentHelper.INCIDENTTYPE_MELDUNG);
        Assert.assertTrue(fixedDoc.get().has("generaldata"));
        Assert.assertTrue(fixedDoc.get().get("generaldata").has("anonymous"));
        Assert.assertTrue(fixedDoc.get().get("generaldata").get("anonymous").asBoolean());
        Assert.assertFalse(fixedDoc.get().has("affected_person"));
    }
}
