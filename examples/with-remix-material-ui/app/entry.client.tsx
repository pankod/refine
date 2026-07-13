import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { RemixBrowser } from "@remix-run/react";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import { ColorModeContextProvider } from "~/contexts/ColorModeContext";
import { ClientStyleCacheProvider } from "~/contexts/ClientStyleContext";

const hydrate = () => {
  React.startTransition(() => {
    ReactDOM.hydrateRoot(
      document,
      <ClientStyleCacheProvider>
        <ColorModeContextProvider>
          <CssBaseline />
          <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
          <RemixBrowser />
        </ColorModeContextProvider>
      </ClientStyleCacheProvider>,
    );
  });
};

if (window.requestIdleCallback) {
  window.requestIdleCallback(hydrate);
} else {
  // Safari doesn't support requestIdleCallback
  // https://caniuse.com/requestidlecallback
  window.setTimeout(hydrate, 1);
}
