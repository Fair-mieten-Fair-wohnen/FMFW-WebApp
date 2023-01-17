package modelHelper;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.BooleanNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.fasterxml.jackson.databind.node.TextNode;
import models.Valuelist;
import models.ValuelistExt;

import java.util.*;

public class ValueListHelper {


    public static ObjectNode filterAllInvalidOthers(ObjectNode incident) {
        Set<String> keys = ValueListHelper.getListKeys("other");
        if (keys.size() > 0) {
            Map<String, List<JsonNode>> values = ValueListHelper.findValuesInIncident(keys, incident);
            if (values.keySet().size() > 0) {
                Map<String, List<JsonNode>> filteredValues = ValueListHelper.filterValuesByNotValue(values, "other");
                if (filteredValues.keySet().size() > 0) {
                    return ValueListHelper.filterInvalidOther(filteredValues, incident, "_others");
                }
            }
        }
        return incident;
    }

    public static ObjectNode filterAllInvalidOther(ObjectNode incident) {
        Set<String> keys = ValueListHelper.getListExtKeys("other");
        if (keys.size() > 0) {
            Map<String, List<JsonNode>> values = ValueListHelper.findValuesInIncident(keys, incident);
            if (values.keySet().size() > 0) {
                Map<String, List<JsonNode>> filteredValues = ValueListHelper.filterValuesByNotValue(values, "other");
                if (filteredValues.keySet().size() > 0) {
                    return ValueListHelper.filterInvalidOther(filteredValues, incident, "");
                }
            }
        }
        return incident;
    }

    private static boolean checkForFalse(List<JsonNode> filtered, String postfix) {
        if (filtered.size() == 2) {
            for (JsonNode jn : filtered) {
                if (jn instanceof BooleanNode) {
                    return !jn.asBoolean();
                }
            }
        } else if (filtered.size() == 1) {
            for (JsonNode jn : filtered) {
                if (jn instanceof TextNode) {
                    return true;
                }
            }
        }
        return false;
    }

    public static ObjectNode filterInvalidOther(Map<String, List<JsonNode>> values, ObjectNode incident, String postfix) {

        for (String key : values.keySet()) {
            String otherKey = key + postfix;
            List<JsonNode> filtered = incident.findValues(otherKey);
            if (checkForFalse(filtered, postfix)) {
                for (JsonNode jn : filtered) {
                    if (jn instanceof BooleanNode) {
                        if (!jn.asBoolean() && postfix.isEmpty()) {
                            ObjectNode root = (ObjectNode) incident.findValue("selected_grounds");
                            root.remove(otherKey);
                        }
                    } else if (jn instanceof TextNode) {
                        ObjectNode root;
                        if (postfix.isEmpty())
                            root = (ObjectNode) incident.findValue("other_grounds");
                        else
                            root = incident.findParent(otherKey);
                        root.remove(otherKey);
                    }
                }
            }
        }
        return incident;
    }

    public static Map<String, List<JsonNode>> filterValuesByNotValue(Map<String, List<JsonNode>> values, String filter) {
        Map<String, List<JsonNode>> filteredValues = new HashMap<>();

        for (String key : values.keySet()) {
            List<JsonNode> mapVals = values.get(key);
            for (JsonNode mapVal : mapVals) {
                if (!mapVal.asText().equals(filter)) {
                    List<JsonNode> jnodes;
                    if (!filteredValues.containsKey(key)) {
                        jnodes = new ArrayList<>();
                    } else {
                        jnodes = filteredValues.get(key);
                    }
                    jnodes.add(mapVal);
                    filteredValues.put(key, jnodes);
                }
            }

        }
        return filteredValues;
    }

    public static Map<String, List<JsonNode>> findValuesInIncident(Set<String> keys, ObjectNode incident) {
        Map<String, List<JsonNode>> values = new HashMap<>();

        for (String key : keys) {
            List<JsonNode> currentValues = incident.findValues(key);
            if (currentValues.size() > 0) {
                values.put(key,
                        currentValues);
            }
        }
        return values;
    }

    public static Set<String> getListKeys(String key) {
        Set<String> listtypes = new HashSet<>();

        List<Valuelist> valueLists = Valuelist.findByKey(key);
        for (Valuelist vl : valueLists) {
            listtypes.add(vl.listtype);
        }
        return listtypes;
    }

    public static Set<String> getListExtKeys(String key) {
        Set<String> listtypes = new HashSet<>();

        List<ValuelistExt> valueLists = ValuelistExt.findBySubKey(key);
        for (ValuelistExt vl : valueLists) {
            listtypes.add(vl.key + "_other");
        }
        return listtypes;
    }
}
