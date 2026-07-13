import React from "react";
import App from "./App";
import { createRoot } from "react-dom/client";

const container = document.getElementById("root");
// eslint-disable-next-line
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
