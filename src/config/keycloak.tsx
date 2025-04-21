import Keycloak from "keycloak-js";

export const keycloak = new (Keycloak as any)({
  url: "http://localhost:8001",
  realm: "aicodelab-realm",
  clientId: "aicodelab-client",
});
