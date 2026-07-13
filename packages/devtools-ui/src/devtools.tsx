import React from "react";
import { DevToolsContextProvider } from "@refinedev/devtools-shared";
import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router";
import { Layout } from "./components/layout";
import { ReloadOnChanges } from "./components/reload-on-changes";
import { Overview } from "./pages/overview";
import { Monitor } from "./pages/monitor";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { MonitorHighlightHandler } from "./components/monitor-highlight-handler";
import { LocationChangeHandler } from "./components/location-change-handler";
import { IframePageLoadHandler } from "./components/iframe-page-load-handler";
import { getLastLocation } from "./utils/last-location";

dayjs.extend(relativeTime);

export const DevToolsApp = () => {
  return (
    <DevToolsContextProvider __devtools url={location.origin}>
      <ReloadOnChanges />
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <Layout>
                <Outlet />
              </Layout>
            }
          >
            <Route path="/" element={<Navigate to={getLastLocation()} />} />
            <Route path="/overview" element={<Overview />} />
            <Route path="/monitor" element={<Monitor />} />
            <Route path="*" element={<Navigate to="/overview" />} />
          </Route>
        </Routes>
        <IframePageLoadHandler />
        <LocationChangeHandler />
        <MonitorHighlightHandler />
      </BrowserRouter>
    </DevToolsContextProvider>
  );
};
