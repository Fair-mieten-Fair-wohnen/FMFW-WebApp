package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import models.ExtValuelist;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;

import javax.inject.Singleton;
import java.util.*;

import static java.util.stream.Collectors.groupingBy;
import static utils.RequestUtils.addCORS;

@Singleton
public class ExtValuelistController extends Controller {

    public Result optionReq(String listType) {
        return addCORS(ok("{}"));
    }

    public Result valueList(String listType) {

        List<ExtValuelist> valuelist = ExtValuelist.findByType(listType);

        ArrayList<ObjectNode> result = new ArrayList<>();

        Map<String, List<ExtValuelist>> gValuelist = valuelist.stream().collect(groupingBy(vl -> vl.key));

        Iterator<String> itr = gValuelist.keySet().iterator();
        while (itr.hasNext()) {
            String tp = itr.next();

            ExtValuelist parent = gValuelist.get(tp).get(0);
            ObjectNode on = Json.newObject();
            on.put("id", parent.id);
            on.put("isFolder", !tp.equals("other"));
            on.put("key", tp);
            on.put("label", parent.label);
            on.put("weight", parent.weight);

            List<ExtValuelist> exVL = gValuelist.get(tp);
            ArrayNode onArray = Json.newArray();
            Iterator<ExtValuelist> subItr = exVL.iterator();
            while (subItr.hasNext()) {
                ExtValuelist evl = subItr.next();
                if (evl.subKey.length() > 0) {
                    ObjectNode son = Json.newObject();
                    son.put("id", evl.id);
                    son.put("isFolder", false);
                    son.put("key", evl.subKey.equals("other") ? tp.concat("_").concat(evl.subKey) : evl.subKey);
                    son.put("label", evl.subLabel);
                    son.put("weight", evl.subWeight);
                    onArray.add(son);
                }

            }
            if (onArray.size() > 0) {
                on.set("list", onArray);
            }
            result.add(on);
        }

        Collections.sort(result, Comparator.comparing((ObjectNode on) -> on.get("weight").asInt()));

        JsonNode jsonNode = Json.toJson(result);
        return addCORS(ok(jsonNode));
    }
}
