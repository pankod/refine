import React from "react";
import { createRoot } from "react-dom/client";
import Keycloak from "keycloak-js";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import axios from "axios";

import App from "./App";

const keycloak = new Keycloak({
  clientId: "refine-client",
  url: "https://auth.greeniq.vn",
  realm: "master",
});

const container = document.getElementById("root");
// eslint-disable-next-line
const root = createRoot(container!);
root.render(
    <ReactKeycloakProvider 
      authClient={keycloak}
      initOptions={{ checkLoginIframe: false }}
      onEvent={(event) => {
        if (event === "onTokenExpired") {
          keycloak.updateToken(30).catch(() => {
            console.error("Failed to refresh token");
          });
        }
      }}
      onTokens={(tokens) => {
        if (tokens?.token) {
          axios.defaults.headers.common["Authorization"] = `Bearer ${tokens.token}`;
        }
      }}
    >
      <App />
    </ReactKeycloakProvider>
);
