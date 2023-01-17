package actions;

import com.fasterxml.jackson.databind.JsonNode;
import com.google.inject.Inject;
import com.typesafe.config.Config;
import models.UserContext;
import play.Logger;
import play.cache.SyncCacheApi;
import play.libs.ws.WSAuthScheme;
import play.libs.ws.WSClient;
import play.libs.ws.WSResponse;
import play.mvc.Http;
import play.mvc.Result;
import play.mvc.Results;
import utils.HashUtil;
import utils.KeycloakTokenUtil;

import java.util.Optional;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.CompletionStage;

public class SimpleKeycloakAuthAction extends play.mvc.Action.Simple {

    @Inject
    private Config config;

    @Inject
    private WSClient ws;

    @Inject
    private SyncCacheApi cache;

    public CompletionStage<Result> call(Http.Context ctx) {
        Logger.info("Calling action for {}", ctx);
        Optional<String> tokenOpt = KeycloakTokenUtil.getToken(ctx.request().getHeaders());

        if (tokenOpt.isPresent()) {
            String token = tokenOpt.get();
            String hashedToken = HashUtil.hashString(token);

            Logger.debug("current Token: " + token);
            if (cache.get(hashedToken) != null) {
                Logger.debug("token was found in cache");
                return delegate.call(ctx);
            } else {
                Logger.debug("token was not found in cache !!!");
                CompletionStage<WSResponse> wsRes = ws
                        .url(config.getString("SimpleKeycloakAuthAction.url"))
                        .setAuth(config.getString("SimpleKeycloakAuthAction.username"), "eed1d250-3771-40d2-88ce-6af1e1e2c28e", WSAuthScheme.BASIC)
                        .setContentType("application/x-www-form-urlencoded")
                        .post("token=" + token);

                return wsRes.thenCompose(r ->
                {
                    if (r.getStatus() < 300) {
                        JsonNode rJson = r.asJson();
                        if (
                                rJson.has("name") &&
                                        rJson.has("preferred_username") &&
                                        rJson.has("user.groups") &&
                                        rJson.has("realm_access")
                        ) {
                            UserContext uc = new UserContext();
                            uc.setName(rJson.get("name").asText().trim());
                            uc.setUserName(rJson.get("preferred_username").asText().trim());
                            if (rJson.withArray("user.groups").isArray()) {
                                for (JsonNode jgroup : rJson.withArray("user.groups")) {
                                    uc.addGroup(jgroup.asText().trim());
                                }
                                if (uc.getGroups().isEmpty())
                                    return CompletableFuture.completedFuture(Results.unauthorized("user is not member of a group"));
                            }
                            if (rJson.get("realm_access").get("roles").isArray()) {
                                for (JsonNode jrole : rJson.get("realm_access").withArray("roles")) {
                                    uc.addRole(jrole.asText().trim());
                                }
                                if (uc.getRoles().isEmpty())
                                    return CompletableFuture.completedFuture(Results.unauthorized("user has no roles"));
                            }
                            if (uc.getInstitution().isEmpty() || uc.getUserName().isEmpty())
                                return CompletableFuture.completedFuture(Results.unauthorized("invalid user"));
                            else {
                                cache.set(hashedToken, uc, 300);
                                return delegate.call(ctx);
                            }
                        } else
                            return CompletableFuture.completedFuture(Results.unauthorized("missing token metadata"));
                    } else
                        return CompletableFuture.completedFuture(Results.unauthorized("invalid token"));

                });
            }
        }
        return CompletableFuture.completedFuture(Results.unauthorized("token missing"));
    }
}
