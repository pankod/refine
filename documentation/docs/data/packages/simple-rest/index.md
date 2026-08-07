---
title: "Simple Rest Integration Guide | REST API Integration in Refine v5"
display_title: "Simple REST"
sidebar_label: "Simple REST"
description: "Implement Simple Rest in Refine v5. Learn the key steps. Learn scale REST, GraphQL for custom APIs and scalable data flows. Hands-on examples included."
source: https://github.com/refinedev/refine/tree/main/packages/simple-rest
swizzle: true
---

The Simple REST data provider is a package that provides an implementation for working with REST APIs that conform to a standard API design. It is built on the foundation of the [json-server](https://github.com/typicode/json-server) package.

You can use this data provider to quickly get started with Refine and then customize it to fit your specific needs.

## Installation

<InstallPackagesCommand args="@refinedev/simple-rest"/>

## Usage

Simple REST package exports a function that accepts `apiUrl` and `httpClient` parameters. While `apiUrl` is required to set the base URL for your API endpoints, `httpClient` is optional and can be used to provide a custom axios instance to handle logics like authentication, error handling, etc.

```tsx title="app.tsx"
import { Refine } from "@refinedev/core";
// highlight-start
import dataProvider from "@refinedev/simple-rest";
import axios from "axios";
// highlight-end

// highlight-start
const httpClient = axios.create();

const App = () => {
  return (
    <Refine
      // highlight-start
      // `httpClient` is optional.
      dataProvider={(dataProvider("<API_URL>"), httpClient)}
      // highlight-end
      /* ... */
    />
  );
};
```

## URL design

The data provider methods are designed to work with REST APIs that follow the standard design. The following table shows the expected URL for each method:

| Method      | URL                          | Query Parameters                   | Body              |
| ----------- | ---------------------------- | ---------------------------------- | ----------------- |
| `getList`   | `apiUrl` / `resource`        | `pagination`, `sorters`, `filters` |                   |
| `getOne`    | `apiUrl` / `resource` / `id` |                                    |                   |
| `getMany`   | `apiUrl` / `resource`        | `id`                               |                   |
| `create`    | `apiUrl` / `resource`        |                                    | `variables`       |
| `update`    | `apiUrl` / `resource` / `id` |                                    | `variables`       |
| `deleteOne` | `apiUrl` / `resource` / `id` |                                    | `data: variables` |

## Default HTTP methods and customizing them

The following table shows the HTTP method used for each data provider method:

| Method      | HTTP Method |
| ----------- | ----------- |
| `getList`   | `GET`       |
| `getOne`    | `GET`       |
| `getMany`   | `GET`       |
| `create`    | `POST`      |
| `update`    | `PATCH`     |
| `deleteOne` | `DELETE`    |

You can customize the HTTP method used for each data provider method by passing a `method` property in the `meta` parameter when calling a hook.

```tsx
import { useUpdate } from "@refinedev/core";

const { mutate } = useUpdate();

mutate({
  resource: "posts",
  id: 1,
  values: {
    title: "New title",
  },
  //highlight-start
  meta: {
    method: "put",
  },
  //highlight-end
});
```

## Passing custom headers

You can pass custom headers to the data provider by passing a `headers` property in the `meta` parameter.

```tsx
import { useOne } from "@refinedev/core";

useOne({
  resource: "posts",
  id: 1,
  //highlight-start
  meta: {
    headers: {
      "X-Custom-Header": "Custom header value",
    },
  },
  //highlight-end
});
```

## Customizing the data provider <GuideBadge id="packages/cli/#swizzle" />

In some cases, you may need to customize the data provider to work with a REST API that doesn't follow the simple-rest design. In this case, you can use the `swizzle` command to customize the data provider.

1. Run the `swizzle` command in the project directory:

   ```bash
   npm run refine swizzle
   ```

2. Select `@refinedev/simple-rest` from the list of available data providers.

3. Edit the `/rest-data-provider/index.ts` file to customize the data provider.

4. Pass the customized data provider to the `dataProvider` prop of the `Refine` component.

   ```tsx
   import { Refine } from "@refinedev/core";

   import { dataProvider } from "./rest-data-provider";

   const App = () => {
     return (
       <Refine
         dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
         /* ... */
       />
     );
   };
   ```
