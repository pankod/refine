import React from "react";
import { createRoot } from "react-dom/client";
import Keycloak from "keycloak-js";
import { ReactKeycloakProvider } from "@react-keycloak/web";

import App from "./App";

const keycloak = new Keycloak({
  clientId: "refine-demo",
  url: "https://lemur-0.cloud-iam.com/auth",
  realm: "refine",
});

const container = document.getElementById("root");
// eslint-disable-next-line
const root = createRoot(container!);
root.render(
  <ReactKeycloakProvider authClient={keycloak}>
    <App />
  </ReactKeycloakProvider>,
);
