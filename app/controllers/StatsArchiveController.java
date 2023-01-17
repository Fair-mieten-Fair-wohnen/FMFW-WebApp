package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import com.google.inject.Inject;
import models.Aggregation;
import models.AggregationCharts;
import models.ArchiveJob;
import models.ArchiveStat;
import play.cache.SyncCacheApi;
import play.libs.Json;
import play.libs.concurrent.HttpExecutionContext;
import play.mvc.Controller;
import play.mvc.Result;
import utils.KeycloakTokenUtil;

import java.util.List;
import java.util.Optional;

import static utils.RequestUtils.addCORS;

public class StatsArchiveController extends Controller {

    @Inject
    private HttpExecutionContext httpExecutionContext;

    @Inject
    private SyncCacheApi cache;

    //    @With(SimpleKeycloakAuthAction.class)
    public Result statsArchivJobs(String aggScope) {
        Optional<String> tokenOpt = KeycloakTokenUtil.getToken(ctx().request().getHeaders());
        List<JsonNode> jobsJson = ArchiveJob.finishedJobsJson(aggScope);
        return addCORS(ok(Json.toJson(jobsJson)));
    }

    //    @With(SimpleKeycloakAuthAction.class)
    public Result aggretationParams() {
        JsonNode aggsJson = Aggregation.getAggregationsJson();
        return addCORS(ok(Json.toJson(aggsJson)));
    }

    //    @With(SimpleKeycloakAuthAction.class)
    public Result statsArchivJob(String aggregationTypeID, long timeOfDataDumpID) {

        Optional<String> tokenOpt = KeycloakTokenUtil.getToken(ctx().request().getHeaders());

        Optional<AggregationCharts> stats = ArchiveStat.statsForJobAggr(aggregationTypeID, timeOfDataDumpID);
        if (stats.isPresent()) {
            JsonNode jsonNode = Json.toJson(stats.get());
            return addCORS(ok(jsonNode));
        } else return addCORS(ok(Json.newObject()));


    }
}
