import { Sandpack } from "@site/src/components/sandpack";
import React from "react";

export default function RouteDefinitions() {
  return (
    <Sandpack
      hidePreview={true}
      showFiles={true}
      showOpenInCodeSandbox={false}
      showReadOnly={false}
      template="react-ts"
      dependencies={{
        "@refinedev/core": "latest",
      }}
      files={{
        "/pages/_app.tsx": {
          code: AppTsxCode,
          active: true,
          readOnly: true,
        },
        "/pages/[tenantId]/products/index.tsx": {
          code: ListTsxCode,
          readOnly: true,
        },
        "/pages/[tenantId]/products/create.tsx": {
          code: CreateTsxCode,
          readOnly: true,
        },
        "/pages/[tenantId]/products/[id]/index.tsx": {
          code: ShowTsxCode,
          readOnly: true,
        },
        "/pages/[tenantId]/products/[id]/edit.tsx": {
          code: EditTsxCode,
          readOnly: true,
        },
        "/providers/multitenancy.ts": {
          code: MultitenancyProviderTsxCode,
          readOnly: true,
        },
      }}
    />
  );
}

const AppTsxCode = /* jsx */ `
import React from "react";

import { RefineEnterprise } from "@refinedev/enterprise";
import { WithTenant } from "@refinedev/multitenancy";
import routerProvider from "@refinedev/nextjs-router/pages";
import dataProvider from "@refinedev/simple-rest";
import type { AppProps } from "next/app";

import { multitenancyProvider } from "./providers/multitenancy";

function App({ Component, pageProps }: AppProps) {
    return (
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
        <WithTenant
          fallback={<div>Tenant not found</div>}
          loadingComponent={<div>Loading...</div>}
        >
          <Component {...pageProps} />
        </WithTenant>
      </RefineEnterprise>
    );
}

export default App;
`.trim();

const ListTsxCode = /* jsx */ `
import React from "react";

import { useList } from "@refinedev/core";

export default function ProductsList() {
  const { data, isLoading } = useList();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {data?.data.map((record) => (
          <li key={record.id}>{record.name}</li>
        ))}
      </ul>
    </div>
  );
}
`.trim();

const CreateTsxCode = /* jsx */ `
import React from "react";

import { useCreate } from "@refinedev/core";

export default function ProductsCreate() {
  const { onFinish } = useForm();

  return (
    <div>
      <h1>Create Product</h1>
      <form onSubmit={(event) => { /* ... */ }}>
        <label htmlFor="name">Name</label>
        <input id="name" type="text" name="name" />
        <button type="submit">Create</button>
      </form>
    </div>
  );
}
`.trim();

const ShowTsxCode = /* jsx */ `
import React from "react";

import { useShow } from "@refinedev/core";

export default function ProductsShow() {
  const { query: { data, isLoading } } = useShow();
  const record = data?.data;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{record?.name}</h1>
      <p>{record?.description}</p>
    </div>
  );
}
`.trim();

const EditTsxCode = /* jsx */ `
import React from "react";

import { useForm } from "@refinedev/core";

export default function ProductsEdit() {
  const { onFinish, query, formLoading } = useForm();
  const record = query?.data?.data;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Edit Product</h1>
      <form onSubmit={(event) => { /* ... */ }}>
        <label htmlFor="name">Name</label>
        <input id="name" type="text" name="name" defaultValue={record?.name} />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}
`.trim();

const MultitenancyProviderTsxCode = /* jsx */ `
import type { MultiTenancyProvider } from "@refinedev/enterprise";
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
