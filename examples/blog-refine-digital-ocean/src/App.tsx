import { Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import { ThemedLayout, useNotificationProvider } from "@refinedev/antd";
import dataProvider, {
  GraphQLClient,
  liveProvider,
} from "@refinedev/nestjs-query";
import { createClient } from "graphql-ws";
import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import routerProvider, {
  UnsavedChangesNotifier,
  DocumentTitleHandler,
} from "@refinedev/react-router";
import {
  DashboardOutlined,
  ShopOutlined,
  TeamOutlined,
} from "@ant-design/icons";

import { ColorModeContextProvider } from "./contexts/color-mode";
import { Dashboard } from "./pages/dashboard";
import {
  CompanyList,
  CompanyCreate,
  CompanyEdit,
  CompanyShow,
} from "./pages/companies";
import {
  ContactList,
  ContactCreate,
  ContactEdit,
  ContactShow,
} from "./pages/contacts";

import "@ant-design/v5-patch-for-react-19";
import "@refinedev/antd/dist/reset.css";

const API_URL = "https://api.crm.refine.dev/graphql";
const WS_URL = "wss://api.crm.refine.dev/graphql";
const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjMsImVtYWlsIjoiamltLmhhbHBlcnRAZHVuZGVybWlmZmxpbi5jb20iLCJpYXQiOjE2OTQ2ODI0OTksImV4cCI6MTg1MjQ3MDQ5OX0.4PF7-VYY4tlpuvGHmsunaH_ETLd-N_ANSjEB_NiPExw";

const gqlClient = new GraphQLClient(API_URL, {
  headers: {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },
});

const wsClient = createClient({
  url: WS_URL,
  connectionParams: () => ({
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  }),
});

function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <Refine
            dataProvider={dataProvider(gqlClient)}
            liveProvider={liveProvider(wsClient)}
            notificationProvider={useNotificationProvider}
            routerProvider={routerProvider}
            resources={[
              {
                name: "dashboard",
                list: "/",
                meta: {
                  icon: <DashboardOutlined />,
                },
              },
              {
                name: "companies",
                list: "/companies",
                create: "/companies/create",
                edit: "/companies/edit/:id",
                show: "/companies/show/:id",
                meta: {
                  canDelete: true,
                  icon: <ShopOutlined />,
                },
              },
              {
                name: "contacts",
                list: "/contacts",
                create: "/contacts/create",
                edit: "/contacts/edit/:id",
                show: "/contacts/show/:id",
                meta: {
                  canDelete: true,
                  icon: <TeamOutlined />,
                },
              },
            ]}
            options={{
              syncWithLocation: true,
              warnWhenUnsavedChanges: true,
              liveMode: "auto",
            }}
          >
            <Routes>
              <Route
                element={
                  <ThemedLayout>
                    <Outlet />
                  </ThemedLayout>
                }
              >
                <Route path="/">
                  <Route index element={<Dashboard />} />
                </Route>

                <Route path="/companies">
                  <Route index element={<CompanyList />} />
                  <Route path="create" element={<CompanyCreate />} />
                  <Route path="edit/:id" element={<CompanyEdit />} />
                  <Route path="show/:id" element={<CompanyShow />} />
                </Route>

                <Route path="/contacts">
                  <Route index element={<ContactList />} />
                  <Route path="create" element={<ContactCreate />} />
                  <Route path="edit/:id" element={<ContactEdit />} />
                  <Route path="show/:id" element={<ContactShow />} />
                </Route>
              </Route>
            </Routes>
            <RefineKbar />
            <UnsavedChangesNotifier />
            <DocumentTitleHandler />
          </Refine>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
