import React from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import "./i18n";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <NextUIProvider>
      <React.Suspense fallback="loading">
        <App />
      </React.Suspense>
    </NextUIProvider>
  </React.StrictMode>,
);
