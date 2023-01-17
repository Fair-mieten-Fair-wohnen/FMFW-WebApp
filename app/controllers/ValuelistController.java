package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import models.Valuelist;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;

import javax.inject.Singleton;
import java.util.List;
import java.util.Map;

import static utils.RequestUtils.addCORS;

@Singleton
public class ValuelistController extends Controller {

    public Result optionReq(String listType) {
        return addCORS(ok("{}"));
    }

    public Result valueList(String listType) {

        List<Valuelist> valuelist = Valuelist.findByType(listType);
        JsonNode jsonNode = Json.toJson(valuelist);
        return addCORS(ok(jsonNode));
    }

    public Result valueListAsMap(String listType) {

        Map<String, Valuelist> valuelistMap = Valuelist.findByTypeAsMap(listType);

        JsonNode jsonNode = Json.toJson(valuelistMap);
        return addCORS(ok(jsonNode).as("application/json"));
    }
}
