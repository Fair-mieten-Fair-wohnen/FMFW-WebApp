package utils;

import play.mvc.Http;

import java.util.Optional;

public class KeycloakTokenUtil {

    public static Optional<String> getToken(Http.Headers headers) {
        Optional<String> authHeader = headers.get("Authorization");
        if (authHeader.isPresent()) {
            String token = authHeader.get().replace("bearer ", "");
            return Optional.of(token);
        } else
            return Optional.empty();
    }

}
