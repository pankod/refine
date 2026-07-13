---
title: "Multitenancy Guide | Best Practices in Refine v5"
display_title: "Multitenancy"
sidebar_label: "Multitenancy"
description: "Explore how to implement Multitenancy in Refine v5. Explore tenant and data for real-world React admin panels. See practical code samples."
guide: true
---

# Multitenancy <GuideBadge id="guides-concepts/multitenancy" />

Refine's Enterprise Edition provides built-in support for [Multitenancy](/core/docs/guides-concepts/multitenancy/). This feature allows you to build applications that can serve multiple tenants with a single codebase with help of
pre-built components and hooks with minimal configuration.

## Installation

This package is included in Refine's Enterprise Edition. To learn more about Refine's Enterprise Edition, please [contact us](https://refine.dev/).

<InstallPackagesCommand args="@refinedev/enterprise @refinedev/multitenancy">

```yml title=".npmrc"
# A registry with the auth token should be added for the @refinedev scope
@refinedev:registry=https://registry.refine.dev/
//registry.refine.dev/:_authToken=$NPM_TOKEN
```

</InstallPackagesCommand>

## Usage

To use the multitenancy feature, we need to wrap our application with the `<RefineEnterprise />` component and provide the `multitenancyProvider` prop.

```tsx
import { RefineEnterprise } from "@refinedev/enterprise";
import { useRouterAdapter, WithTenant } from "@refinedev/multitenancy";

type Tenant = {
  id: string;
  name: string;
};

// ... other imports

const App = () => {
  return (
    <RefineEnterprise
      // ... other props
      multitenancyProvider={{
        adapter: useRouterAdapter(),
        fetchTenants: async () => {
          const response = await dataProvider("<API_URL>").getList<Tenant>({
            resource: "tenants",
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
      }}
    >
      <WithTenant
        fallback={<div>Tenant not found</div>}
        loadingComponent={<div>Loading...</div>}
      >
        {/* Your app code */}
      </WithTenant>
    </RefineEnterprise>
  );
};
```

## multitenancyProvider

The `multitenancyProvider` is a prop that accepts an object with two properties: `adapter` and `fetchTenants`.

### fetchTenants

The `fetchTenants` function is a crucial part of the `multitenancyProvider`, responsible for fetching tenant data from an API or data source and determining the default tenant for the app. The function should return an object with two properties: `tenants` and `defaultTenant`.

### adapters

Adapters define where tenant information is stored. Refine offers `useRouterAdapter` for storing tenants in the URL and `useLocalStorageAdapter` for local storage.

#### useRouterAdapter

Extracts the tenantId from the URL and updates the route when the tenant changes.

```tsx
import { useRouterAdapter } from "@refinedev/multitenancy";

const multitenancyProvider = {
  adapter: useRouterAdapter({
    // The parameter name to use in the URL. (eg: localhost:3000/:tenantId/products)
    parameterName: "tenantId",
    // The tenant field to use in the route params. (eg: localhost:3000/:tenantId/products)
    parameterKey: "id",
    // Determines if the query string should be used to get the tenant instead of the route params. (eg: localhost:3000/products?tenantId=1)
    useQueryString: false,
  }),
  fetchTenants: async () => {
    // Fetch tenants from the API
  },
};
```

#### useLocalStorageAdapter

Retrieves tenantId from local storage and updates it when the tenant changes.

```tsx
import { useLocalStorageAdapter } from "@refinedev/multitenancy";

const multitenancyProvider = {
  adapter: useLocalStorageAdapter({
    // The key to use in the local storage. (eg: localStorage.getItem(key))
    storageKey: "tenantId",
  }),
  fetchTenants: async () => {
    // Fetch tenants from the API
  },
};
```

## Components

### WithTenant

The `<WithTenant />` component is required to wrap your app code. It fetches `tenants`, handling the loading state and error state.

```tsx
import { RefineEnterprise } from "@refinedev/enterprise";
import { WithTenant } from "@refinedev/multitenancy";

<WithTenant
  // render a component when the tenant is not available.
  fallback={<div>Tenant not found</div>}
  // render a component while the tenant is loading.
  loadingComponent={<div>Loading...</div>}
>
  {/* Your app code */}
</WithTenant>;
```

### Tenant Select components

These components allow users to select a tenant from a list of available tenants. They are automatically change the current tenant when a new tenant is selected from the list.

<Tabs wrapContent={false}>

<TabItem value="Ant Design">

```tsx
import { TenantSelect } from "@refinedev/multitenancy/antd";

<TenantSelect
  // Specifies the tenant object field to display in the select component.
  optionLabel="title"
  // Specifies the tenant object field to use as the value in the select component.
  optionValue="id"
  // Event handler for when a tenant is selected, receiving the selected tenant as an argument.
  onChange={(tenant) => console.log(tenant)}
  // Function to sort tenants.
  sortTenants={(a, b) => a.name.localeCompare(b.name)}
/>;
```

</TabItem>

<TabItem value="Material UI">

```tsx
import { TenantSelect } from "@refinedev/multitenancy/mui";

<TenantSelect
  // Specifies the tenant object field to display in the select component.
  optionLabel="title"
  // Specifies the tenant object field to use as the value in the select component.
  optionValue="id"
  // Event handler for when a tenant is selected, receiving the selected tenant as an argument.
  onChange={(tenant) => console.log(tenant)}
  // Function to sort tenants.
  sortTenants={(a, b) => a.name.localeCompare(b.name)}
/>;
```

</TabItem>

</Tabs>

### Hooks

Refine provides hooks to interact with the multitenancy feature.

#### useMultitenancy

The `useMultitenancy` hook is used to interact with the multitenancy context.

```tsx
import { useMultitenancy } from "@refinedev/multitenancy";

const {
  // The current tenant object.
  tenant,
  // The list of available tenants.
  tenants,
  // The loading state of the tenants.
  isLoading,
  // It triggers `authProvider.fetchTenants` to fetch tenants.
  fetchTenants,
  // It sets the current tenant. It accepts a tenant object as an argument.
  setTenant,
  // It deletes the current tenant.
  deleteTenant,
} = useMultitenancy();
```

## Handling Multi-tenant Requests in Data Providers

Refine automatically sends the `tenantId` to the data provider in the `meta` object. You can access the `tenantId` in the data provider and use it to fetch tenant-specific data.

To customize the data providers, you can override each method in the data provider instance or use the [`swizzle`](/core/docs/packages/cli/#swizzle) command to be fully able to customize the data provider for your needs.

An example implementation of a custom `getList` method is shown below.

```ts
import dataProvider from "@refinedev/simple-rest";

const API_URL = "<API_URL>";
const baseDataProvider = dataProvider(API_URL);

const customDataProvider = {
  ...baseDataProvider,
  getList: async ({ resource, filters = [], meta, ...props }) => {
    const { tenantId } = meta;

    // We're adding the tenantId to the filters
    // Your API may have a different way of handling this
    if (meta?.tenantId) {
      filters.push({
        field: "organization",
        operator: "eq",
        value: meta.tenantId,
      });
    }

    // Call the base data provider's getList method with the updated filters
    return baseDataProvider.getList({
      resource,
      filters,
      meta,
      ...props,
    });
  },
};
```

### Examples

Here are some examples of multi-tenant apps built:

- [Multitenancy App with Strapi](https://refine.dev/templates/multitenancy-strapi/)
- [Isolated Multitenancy App with Rest API](https://multitenancy-isolated.netlify.app/)
