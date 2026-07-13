import { Sandpack } from "@site/src/components/sandpack";
import React from "react";

export default function RouteDefinitions() {
  return (
    <Sandpack
      hidePreview={true}
      showFiles={false}
      showOpenInCodeSandbox={false}
      showReadOnly={false}
      template="react-ts"
      dependencies={{
        "@refinedev/core": "latest",
      }}
      files={{
        "App.tsx": {
          code: AppTsxCode,
          readOnly: true,
        },
        "multitenancy.ts": {
          code: MultitenancyProviderTsxCode,
          readOnly: true,
        },
      }}
    />
  );
}

const AppTsxCode = /* jsx */ `
import { RefineEnterprise } from "@refinedev/enterprise";
import { WithTenant } from "@refinedev/multitenancy";
import dataProvider from "@refinedev/simple-rest";
import routerProvider from "@refinedev/react-router";

import { BrowserRouter, Outlet, Routes, Route } from "react-router";

import { multitenancyProvider } from "./multitenancy";

import { ProductsList, ProductsCreate, ProductsShow, ProductsEdit } from "./products";

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <RefineEnterprise
        multitenancyProvider={multitenancyProvider}
        dataProvider={dataProvider("<API_URL>")}
        routerProvider={routerProvider}
        resources={[
          {
            name: "products",
            // We're prefixing the routes with \`/:tenantId\` to make them tenant-aware.
            list: "/:tenantId/products",
            show: "/:tenantId/products/:id",
            edit: "/:tenantId/products/:id/edit",
            create: "/:tenantId/products/create",
          },
        ]}
      >
        <Routes>
          {/* We're defining the \`tenantId\` as a route parameter. */}
          <Route path="/:tenantId" element={
            <WithTenant
              fallback={<div>Tenant not found</div>}
              loadingComponent={<div>Loading...</div>}
            >
              <Outlet />
            </WithTenant>
          }>
            <Route path="products" element={<ProductsList />} />
            <Route path="products/create" element={<ProductsCreate />} />
            <Route path="products/:id" element={<ProductsShow />} />
            <Route path="products/:id/edit" element={<ProductsEdit />} />
          </Route>
        </Routes>
      </RefineEnterprise>
    </BrowserRouter>
  );
};
`.trim();

const MultitenancyProviderTsxCode = /* jsx */ `
import type { MultiTenancyProvider } from "@refinedev/core";
import { useRouterAdapter } from "@refinedev/multitenancy";
import dataProvider from "@refinedev/simple-rest";

export type Tenant = {
  id: string;
  name: string;
};

export const multitenancyProvider: MultiTenancyProvider = {
  adapter: useRouterAdapter(),
  fetchTenants: async () => {
    const response = await dataProvider("<API_URL>").getList<Tenant>({
      resource: "categories",
      pagination: {
        mode: "off",
      },
    });
    const tenants = response.data;
    const defaultTenant = tenants[0];

    return {
      tenants,
      defaultTenant,
    };
  },
};
`.trim();
