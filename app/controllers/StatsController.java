package controllers;

import com.google.inject.Inject;
import com.typesafe.config.Config;
import play.cache.SyncCacheApi;
import play.libs.concurrent.HttpExecutionContext;
import play.mvc.Controller;
import play.mvc.Result;
import stats.SimpleStatsBuilder;

public class StatsController extends Controller {

    @Inject
    private Config config;

    @Inject
    private HttpExecutionContext httpExecutionContext;

    @Inject
    private SyncCacheApi cache;

    //    @With(SimpleKeycloakAuthAction.class)
    public Result simpleStats(String token, String mode) {
        String currentToken = config.getString("statsToken");

        if (token.equals(currentToken)) {
            String stats;
            if (mode.equals("other")) {
                stats = SimpleStatsBuilder.simpleOtherStatsAsCsv("all");
            } else
                stats = SimpleStatsBuilder.simpleStatsAsCsv("all");
            return ok(stats);
        } else
            return unauthorized("invalid token");
    }
}
