import React from "react";
import { createRoot } from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";

import App from "./App";

const container = document.getElementById("root");
// eslint-disable-next-line
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-y38p834gjptooc4g.us.auth0.com"
      clientId="AcinJvjWp1Dr41gPcJeQ20r5vcsteks4"
      redirectUri={window.location.origin}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>,
);
