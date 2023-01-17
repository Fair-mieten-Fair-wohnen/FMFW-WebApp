package adwdoc;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import modelHelper.ValueListHelper;
import org.junit.Assert;
import org.junit.Test;
import play.libs.Json;
import play.test.WithServer;

import java.io.BufferedInputStream;
import java.util.List;
import java.util.Map;
import java.util.Set;


public class ValueListHelperTest extends WithServer {

    String incident1Filename = "incident1.json";
    String incident2Filename = "incident2.json";
    String incident3Filename = "incident3.json";
    String incident4Filename = "incident4.json";
    String incident5Filename = "incident5.json";
    String incident6Filename = "incident6.json";
    String incident7Filename = "incident7.json";

    @Test
    public void simple() {
        Assert.assertEquals(1, 1);
    }

    @Test
    public void simpleListTypeTest() {
        Set<String> listTypes = ValueListHelper.getListKeys("other");
        Assert.assertTrue(listTypes.size() > 0);
        Assert.assertTrue(listTypes.contains("goal_person_concerned"));
        Assert.assertTrue(listTypes.contains("affected_group"));
        Assert.assertTrue(listTypes.contains("become_aware_of"));
        Assert.assertTrue(listTypes.contains("form_of_intervention"));
        Assert.assertTrue(listTypes.contains("outcome"));
    }

    @Test
    public void listTypeTest() {

        BufferedInputStream is = new BufferedInputStream(ValueListHelperTest.class.getClassLoader().getResourceAsStream(incident1Filename));
        ObjectNode incidentJson = (ObjectNode) Json.parse(is);
        Assert.assertEquals(1, incidentJson.findValues("become_aware_of_others").size());
        Assert.assertEquals(1, incidentJson.findValues("become_aware_of").size());

        Set<String> keys = ValueListHelper.getListKeys("other");
        Map<String, List<JsonNode>> values = ValueListHelper.findValuesInIncident(keys, incidentJson);
        Assert.assertTrue(values.keySet().size() > 0);
        Map<String, List<JsonNode>> filteredValues = ValueListHelper.filterValuesByNotValue(values, "other");
        JsonNode incidentFixed = ValueListHelper.filterInvalidOther(filteredValues, incidentJson, "_others");
        Assert.assertTrue(filteredValues.keySet().size() > 0);
        Assert.assertEquals(0, incidentFixed.findValues("become_aware_of_others").size());
        Assert.assertEquals(1, incidentFixed.findValues("become_aware_of").size());

    }

    @Test
    public void filterAllInvalidOthersTest() {
        BufferedInputStream is = new BufferedInputStream(ValueListHelperTest.class.getClassLoader().getResourceAsStream(incident1Filename));
        ObjectNode incidentJson = (ObjectNode) Json.parse(is);
        Assert.assertEquals(1, incidentJson.findValues("become_aware_of_others").size());
        Assert.assertEquals(1, incidentJson.findValues("become_aware_of").size());
        ObjectNode incidentFixed = ValueListHelper.filterAllInvalidOthers(incidentJson);
        Assert.assertEquals(0, incidentFixed.findValues("become_aware_of_others").size());
        Assert.assertEquals(1, incidentFixed.findValues("become_aware_of").size());

    }

    @Test
    public void simpleListTypeExtTest() {
        String postfix = "_other";
        Set<String> listTypes = ValueListHelper.getListExtKeys("other");
        Assert.assertTrue(listTypes.size() > 0);
        Assert.assertTrue(listTypes.contains("appearance" + postfix));
        Assert.assertTrue(listTypes.contains("racist_discrimination_ethnic_origin" + postfix));
        Assert.assertTrue(listTypes.contains("social_status" + postfix));
        Assert.assertTrue(listTypes.contains("age" + postfix));
    }

    @Test
    public void listTypeExtNegTest() {

        BufferedInputStream is = new BufferedInputStream(ValueListHelperTest.class.getClassLoader().getResourceAsStream(incident2Filename));
        ObjectNode incidentJson = (ObjectNode) Json.parse(is);
        Assert.assertEquals(2, incidentJson.findValues("sexuell_identity_other").size());

        Set<String> keys = ValueListHelper.getListExtKeys("other");
        Assert.assertTrue(keys.size() > 0);

        Map<String, List<JsonNode>> values = ValueListHelper.findValuesInIncident(keys, incidentJson);
        Assert.assertTrue(values.keySet().size() > 0);

        Map<String, List<JsonNode>> filteredValues = ValueListHelper.filterValuesByNotValue(values, "false");
        Assert.assertTrue(filteredValues.keySet().size() > 0);

        JsonNode incidentFixed = ValueListHelper.filterInvalidOther(filteredValues, incidentJson, "");
        Assert.assertEquals(0, incidentFixed.findValues("sexuell_identity_other").size());

    }

    @Test
    public void listTypeExtPosTest() {

        BufferedInputStream is = new BufferedInputStream(ValueListHelperTest.class.getClassLoader().getResourceAsStream(incident3Filename));
        ObjectNode incidentJson = (ObjectNode) Json.parse(is);
        Assert.assertEquals(2, incidentJson.findValues("sexuell_identity_other").size());

        Set<String> keys = ValueListHelper.getListExtKeys("other");
        Assert.assertTrue(keys.size() > 0);

        Map<String, List<JsonNode>> values = ValueListHelper.findValuesInIncident(keys, incidentJson);
        Assert.assertTrue(values.keySet().size() > 0);

        Map<String, List<JsonNode>> filteredValues = ValueListHelper.filterValuesByNotValue(values, "false");
        Assert.assertTrue(filteredValues.keySet().size() > 0);

        JsonNode incidentFixed = ValueListHelper.filterInvalidOther(filteredValues, incidentJson, "");
        Assert.assertEquals(2, incidentFixed.findValues("sexuell_identity_other").size());

    }

    @Test
    public void listTypeExtPosTest2() {

        BufferedInputStream is = new BufferedInputStream(ValueListHelperTest.class.getClassLoader().getResourceAsStream(incident4Filename));
        ObjectNode incidentJson = (ObjectNode) Json.parse(is);
        Assert.assertEquals(1, incidentJson.findValues("sexuell_identity_other").size());

        Set<String> keys = ValueListHelper.getListExtKeys("other");
        Assert.assertTrue(keys.size() > 0);

        Map<String, List<JsonNode>> values = ValueListHelper.findValuesInIncident(keys, incidentJson);
        Assert.assertTrue(values.keySet().size() > 0);

        Map<String, List<JsonNode>> filteredValues = ValueListHelper.filterValuesByNotValue(values, "false");
        Assert.assertTrue(filteredValues.keySet().size() > 0);

        JsonNode incidentFixed = ValueListHelper.filterInvalidOther(filteredValues, incidentJson, "");
        Assert.assertEquals(0, incidentFixed.findValues("sexuell_identity_other").size());
    }

    @Test
    public void listTypeExtIntegrationTest() {
        BufferedInputStream is = new BufferedInputStream(ValueListHelperTest.class.getClassLoader().getResourceAsStream(incident5Filename));
        ObjectNode incidentJson1 = (ObjectNode) Json.parse(is);

        Assert.assertEquals(1, incidentJson1.findValues("become_aware_of_others").size());
        Assert.assertEquals(1, incidentJson1.findValues("become_aware_of").size());
        Assert.assertEquals(2, incidentJson1.findValues("sexuell_identity_other").size());

        ObjectNode incidentJson2 = ValueListHelper.filterAllInvalidOther(incidentJson1.deepCopy());
        ObjectNode incidentJson3 = ValueListHelper.filterAllInvalidOthers(incidentJson2.deepCopy());

        Assert.assertEquals(0, incidentJson2.findValues("sexuell_identity_other").size());
        Assert.assertEquals(0, incidentJson3.findValues("become_aware_of_others").size());
        Assert.assertEquals(1, incidentJson3.findValues("become_aware_of").size());
    }

    @Test
    public void listTypeExtIntegration2Test() {
        BufferedInputStream is = new BufferedInputStream(ValueListHelperTest.class.getClassLoader().getResourceAsStream(incident6Filename));
        ObjectNode incidentJson1 = (ObjectNode) Json.parse(is);

        Assert.assertEquals(1, incidentJson1.findValues("become_aware_of_others").size());
        Assert.assertEquals(1, incidentJson1.findValues("become_aware_of").size());
        Assert.assertEquals(2, incidentJson1.findValues("sexuell_identity_other").size());

        ObjectNode incidentJson2 = ValueListHelper.filterAllInvalidOther(incidentJson1.deepCopy());
        ObjectNode incidentJson3 = ValueListHelper.filterAllInvalidOthers(incidentJson2.deepCopy());

        Assert.assertEquals(2, incidentJson2.findValues("sexuell_identity_other").size());
        Assert.assertEquals(1, incidentJson3.findValues("become_aware_of_others").size());
        Assert.assertEquals(1, incidentJson3.findValues("become_aware_of").size());

    }

    @Test
    public void listTypeExtIntegration3Test() {
        BufferedInputStream is = new BufferedInputStream(ValueListHelperTest.class.getClassLoader().getResourceAsStream(incident7Filename));
        ObjectNode incidentJson1 = (ObjectNode) Json.parse(is);

        Assert.assertEquals(2, incidentJson1.findValues("racist_discrimination_ethnic_origin_other").size());

        ObjectNode incidentJson2 = ValueListHelper.filterAllInvalidOther(incidentJson1.deepCopy());
        ObjectNode incidentJson3 = ValueListHelper.filterAllInvalidOthers(incidentJson2.deepCopy());

        Assert.assertEquals(0, incidentJson2.findValues("racist_discrimination_ethnic_origin_other").size());
    }


}
