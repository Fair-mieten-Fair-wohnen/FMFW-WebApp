// Add here your keycloak setup infos
import {KeycloakConfig} from "keycloak-angular";

let keycloakConfig: KeycloakConfig = {
  url: 'https://id.fairmieten-fairwohnen.de/auth',
  realm: 'FMFW',
  clientId: 'fmfw-documentation-system-local'
};

export const environment = {
  production: false,
  serverUrl: "http://localhost:9000",
//  serverUrl: "https://api.fairmieten-fairwohnen.de",
  apiPrefix: "/adwDocumentationSystem/api/v1/",
  authServer: "https://id.fairmieten-fairwohnen.de",
  keycloak: keycloakConfig,
  POLLING_INTERVAL_MILLISECONDS: 600000
};
