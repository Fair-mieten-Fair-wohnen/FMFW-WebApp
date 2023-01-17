package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import models.ColumnName;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;

import java.util.List;

import static utils.RequestUtils.addCORS;

public class ColumnNameController extends Controller {

    public Result optionReq() {
        return addCORS(ok("{}"));
    }

    public Result getColumnNames(String tableName) {
        List<ColumnName> columnNames = ColumnName.findByTableName(tableName);
        JsonNode jsonNode = Json.toJson(columnNames);
        return addCORS(ok(jsonNode));
    }

}
