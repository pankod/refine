---
title: "Nestjsx Crud Integration Guide | Best Practices in Refine v5"
display_title: "NestJS CRUD"
sidebar_label: "NestJS CRUD"
description: "Implement Nestjsx Crud in Refine v5. Learn the key steps. Learn patterns to scale authentication and data for custom APIs and scalable data flows."
source: https://github.com/refinedev/refine/tree/main/packages/nestjsx-crud
swizzle: true
---

Refine provides a data provider for APIs powered with [Nest.js CRUD](https://github.com/nestjsx/crud/wiki), a module for Nest.js that provides easier ways to build CRUD RESTful APIs.

:::simple Good to know

- This library uses [`axios`](https://axios-http.com) to handle the requests.
- To learn more about data fetching in Refine, check out the [Data Fetching](/core/docs/guides-concepts/data-fetching/) guide.

:::

## Installation

<InstallPackagesCommand args="@refinedev/nestjsx-crud"/>

## Usage

We'll provide the API url to the `dataProvider` function to create a data provider.

```tsx title="app.tsx"
import Refine from "@refinedev/core";
import dataProvider from "@refinedev/nestjsx-crud";

const App = () => (
  <Refine
    // highlight-next-line
    dataProvider={dataProvider("<API_URL>")}
  >
    {/* ... */}
  </Refine>
);
```

## Authentication

If your API uses authentication, you can easily provide an axios instance with the authentication headers to the `dataProvider` function via second argument.

<Tabs>

<TabItem value="headers" label="Using Headers" default>

```tsx title="App.tsx"
import { Refine, AuthProvider } from "@refinedev/core";
/**
 * We're using the `axiosInstance` exported from the package
 * But you are free to use your own instance with your own configuration.
 */
// highlight-next-line
import dataProvider, { axiosInstance } from "@refinedev/nestjsx-crud";

const authProvider: AuthProvider = {
  login: async () => {
    // ...
    // We're setting the Authorization header when the user logs in.
    // highlight-next-line
    axiosInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;
  },
  logout: async () => {
    // ...
    // We're removing the Authorization header when the user logs out.
    // highlight-next-line
    axiosInstance.defaults.headers.common["Authorization"] = undefined;
  },
  // ...
};

const App = () => {
  return (
    <Refine
      // highlight-next-line
      dataProvider={dataProvider("<API_URL>", axiosInstance)}
      authProvider={authProvider}
    >
      {/* ... */}
    </Refine>
  );
};
```

</TabItem>

<TabItem value="axios" label="Using Interceptors">

```tsx title="App.tsx"
import { Refine, AuthProvider } from "@refinedev/core";
/**
 * We're using the `axiosInstance` exported from the package
 * But you are free to use your own instance with your own configuration.
 */
// highlight-next-line
import dataProvider, { axiosInstance } from "@refinedev/nestjsx-crud";

axiosInstance.interceptors.request.use(
  (config) => {
    // ...
    // We're setting the Authorization header if it's available in the localStorage.
    const token = localStorage.getItem("token");
    if (token) {
      // highlight-next-line
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

const App = () => {
  return (
    <Refine
      // highlight-next-line
      dataProvider={dataProvider("<API_URL>", axiosInstance)}
    >
      {/* ... */}
    </Refine>
  );
};
```

</TabItem>

</Tabs>

## Example

<CodeSandboxExample path="data-provider-nestjsx-crud" />
