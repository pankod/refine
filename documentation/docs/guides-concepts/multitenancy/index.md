---
title: "Multitenancy Guide | Guides Concepts in Refine v5"
display_title: "Multitenancy"
sidebar_label: "Multitenancy"
description: "Learn to implement Multitenancy in Refine v5. Learn best practices for tenant and data for real-world React admin panels. Hands-on examples included."
---

Refine's architecture allows you to customize your app's data providers, access control and routing to support multi tenant features easily. This guide will provide you with a high level overview of the concepts and how to implement them. To see multi tenant app examples, check out the [Examples](#examples) section.

## What is Multitenancy?

Multitenancy, especially in cloud-based systems or software solutions, refers to the ability of a software application or system to serve multiple customers (tenants) simultaneously. While these customers share the same infrastructure and codebase, their data remains separate, and each customer has exclusive access to their own data.

**Benefits of Multitenancy:**

- **Resource Sharing:** Efficient use of shared infrastructure reduces costs.
- **Cost Savings:** Lower maintenance costs passed on to customers.
- **Customization:** Each tenant can adjust settings to their needs.
- **Easy Updates:** System-wide updates benefit all tenants at once.

**Use Cases:**

- **Cloud Office Tools:** Multiple organizations share document management and collaboration features.
- **CRM Systems:** Businesses manage customer interactions on a shared platform with secure, custom configurations.
- **ERP Systems:** Companies use shared ERP solutions with separate data and configurations.
- **E-commerce Platforms:** Sellers run personalized storefronts on a shared backend.
- **LMS Platforms:** Schools and organizations deliver courses on a shared learning system.

## Implementing Multitenancy in Refine

In the next sections, we'll show you how to set up multitenancy in Refine using a route-based approach. We'll use the [`multitenancyProvider`](/core/docs/enterprise-edition/multitenancy/) from the `"@refinedev/enterprise"` package.

### 1. Setting up the Multitenancy Provider

First, we need to install the `@refinedev/enterprise` and `@refinedev/multitenancy` packages.

<InstallPackagesCommand args="@refinedev/enterprise @refinedev/multitenancy"/>

Then we need to change `<Refine />` component to `<RefineEnterprise />` in your `App.tsx` file. You can use same props of `<Refine />` component in `<RefineEnterprise />` component.

> 🚨 All the props of the `<Refine />` component are also available in the `<RefineEnterprise />` component with additional features.

```diff
- import { Refine } from "@refinedev/core";
+ import { RefineEnterprise } from "@refinedev/enterprise";

export const App = () => {
  return (
-    <Refine>
+      <RefineEnterprise>
        {/* Your app code */}
+      </RefineEnterprise>
-    </Refine>
  );
};
```

After that, we need to provide the [`multitenancyProvider`](/core/docs/enterprise-edition/multitenancy/) to the `<RefineEnterprise />` component. The [`multitenancyProvider`](/core/docs/enterprise-edition/multitenancy/) prop accepts an object with two properties: `adapter` and `fetchTenants`.

- `adapter`: The adapter is a function that extracts the tenantId from the current route. You can use the provided `useRouterAdapter` or create your own custom adapter.

- `fetchTenants`: This function is used to fetch the list of tenants. You can fetch the list of tenants from your API and return them in the format `{ tenants: Tenant[], defaultTenant: Tenant }`.

- `<WithTenant />`: This component is required to wrap your app code. It fetches `tenants`, handling the loading state and error state.
  - `fallback`: You can provide a custom fallback component to be displayed while the tenant is not available.
  - `loadingComponent`: You can provide a custom loading component to be displayed while the tenant is loading.

When you mount `<RefineEnterprise />` and `<WithTenant />` components and provide the [`multitenancyProvider`](/core/docs/enterprise-edition/multitenancy/) prop, Refine will automatically extract the `tenantId` from the route and pass it to the data provider in the `meta` object.

```tsx
import { RefineEnterprise } from "@refinedev/enterprise";
import { useRouterAdapter, WithTenant } from "@refinedev/multitenancy";

// ... other imports

const App = () => {
  return (
    <RefineEnterprise
      // ... other props
      multitenancyProvider={{
        adapter: useRouterAdapter(),
        fetchTenants: async () => {
          const response = await dataProvider(API_URL).getList<ICategory>({
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

### 2. Configuring Multi-tenant Routes

We'll be using routes to determine which tenant is being selected. Once we've setup our routes, `useRouterAdapter` will automatically extract the `tenantId` from the route.

> Note: In the examples below, we are only showing the route definitions. You may need additional code to implement styling and layout depending on your choice of UI library. Regardless of the UI library you choose, the routing implementation will be similar to the examples below.

<Tabs wrapContent={false}>

<TabItem value="React Router Dom">

import ReactRouterRouteDefinitions from "./examples/react-router.tsx";

<ReactRouterRouteDefinitions />

</TabItem>

<TabItem value="Next.js">

import NextjsRouteDefinitions from "./examples/nextjs.tsx";

<NextjsRouteDefinitions />

</TabItem>

<TabItem value="Remix">

import RemixRouteDefinitions from "./examples/remix.tsx";

<RemixRouteDefinitions />

</TabItem>

</Tabs>

### Handling Multi-tenant Requests in Data Providers

We'll be using the `tenantId` from the route to determine which tenant is being accessed. Refine will infer the `tenantId` from the current route and pass it to the data provider in `meta`. You can access the `tenantId` from the `meta` object in your data provider and use it in your API calls.

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

### Adding a Tenant Selector to the UI

Now we've defined our routes and data providers to use `tenantId` to determine which tenant is being accessed. We'll need to add a tenant selector to the UI to allow users to switch between tenants.

You can use the Tenant selector components from the `@refinedev/multitenancy` package to easily add a tenant selector to your app.

<Tabs wrapContent={false}>

<TabItem value="Ant Design">

```tsx
import { TenantSelect } from "@refinedev/multitenancy/antd";

<TenantSelect />;
```

</TabItem>

<TabItem value="Material UI">

```tsx
import { TenantSelect } from "@refinedev/multitenancy/mui";

<TenantSelect />;
```

</TabItem>

</Tabs>

### Examples

Here are some examples of multi-tenant apps:

- [Multitenancy App with Strapi](https://refine.dev/templates/multitenancy-strapi/)
- [Isolated Multitenancy App with Rest API](https://multitenancy-isolated.netlify.app/)
