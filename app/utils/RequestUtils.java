package utils;

import play.mvc.Result;

public class RequestUtils {

    public static Result addCORS(Result result) {
        return result
                .as("application/json")
                .withHeader("Access-Control-Allow-Origin", "*")
                .withHeader("Access-Control-Allow-Methods", "OPTIONS, GET")
                .withHeader("Access-Control-Allow-Headers", "Accept, Content-Type, Origin, X-Json, X-Prototype-Version, X-Requested-With");
    }
}
