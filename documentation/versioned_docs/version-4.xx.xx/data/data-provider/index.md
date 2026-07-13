---
title: "Data Provider Concept | Refine v4 Data"
display_title: "Data Provider"
sidebar_label: "Data Provider"
description: "Understand how data providers work in Refine v4. Learn how to connect REST, GraphQL, or custom APIs to your application."
---

import SupportedDataProviders from "@site/src/partials/data-provider/supported-data-providers.md";

Data provider acts as a data layer for your app, making HTTP requests and encapsulating how the data is retrieved. The methods of these requests are then consumed by Refine via data hooks.

You don’t need to worry about creating data providers from scratch, as Refine offers built-in data provider support for the most popular [API providers](#supported-data-providers).

:::simple Good to know

- Data hooks use [TanStack Query](https://tanstack.com/query) to manage data fetching, which handles important concerns like caching, invalidation, loading states, etc.
- If you want to create your own data provider, check out the ["Creating a data provider from scratch" tutorial][create-a-data-provider]

:::

<Image src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/guides-and-concepts/providers/data-provider/api-consuming-flow.webp" />

## Usage

To activate the data provider in Refine, we have to pass the `dataProvider` to the `<Refine />` component.

```tsx title="App.tsx"
import { Refine } from "@refinedev/core";

import dataProvider from "./dataProvider";

const App = () => (
  <Refine
    /* ... */
    dataProvider={dataProvider}
  />
);
```

[Refer to the Data Provider tutorial for more information and usage examples →][data-provider-tutorial]

## Multiple Data Providers

Refine allows you to use multiple data providers in your app. All you need to do is pass key and value pairs to the `dataProvider` prop of the `<Refine />` component. In the pair object, the key corresponds to the data provider name, and the value corresponds to the data provider itself.

When defining multiple data providers, `default` key is required for defining the default data provider.

Here is an example which uses multiple data providers:

```tsx live hideCode url=http://localhost:3000/posts previewHeight=420px
setInitialRoutes(["/posts"]);
setRefineProps({ Sider: () => null });

// visible-block-start
import { Refine, useList } from "@refinedev/core";
import routerProvider from "@refinedev/react-router";
import dataProvider from "@refinedev/simple-rest";

import { BrowserRouter, Route, Routes } from "react-router";

import { Collapse, Tag } from "antd";

const API_URL = "https://api.fake-rest.refine.dev";
const FINE_FOODS_API_URL = "https://api.finefoods.refine.dev";

interface IPost {
  id: number;
  title: string;
  status: "published" | "draft" | "rejected";
}

interface IProduct {
  id: number;
  name: string;
  price: number;
}

const App = () => {
  return (
    <BrowserRouter>
      <Refine
        routerProvider={routerProvider}
        // highlight-start
        dataProvider={{
          // `default` is required to determine the default data provider
          default: dataProvider(API_URL),
          fineFoods: dataProvider(FINE_FOODS_API_URL),
        }}
        // highlight-end
        resources={[
          {
            // highlight-next-line
            // Refine will use the `default` data provider for this resource
            name: "posts",
            list: "/posts",
          },
          {
            name: "products",
            meta: {
              // highlight-start
              // Refine will use the `fineFoods` data provider for this resource
              dataProviderName: "fineFoods",
              // highlight-end
            },
          },
        ]}
      >
        <Routes>
          <Route path="/posts" element={<PostList />} />
        </Routes>
      </Refine>
    </BrowserRouter>
  );
};

const PostList = () => {
  const { data: posts } = useList<IPost>({
    resource: "posts",
    // highlight-start
    // Data provider can be selected through props
    dataProviderName: "default",
    // highlight-end
  });
  // highlight-start
  // We've defined the data provider for this resource as "fineFoods" in its config so we don't need to pass it here
  const { data: products } = useList<IProduct>({ resource: "products" });
  // highlight-end

  console.log({
    posts,
    products,
  });

  return (
    <Collapse defaultActiveKey={["products"]}>
      <Collapse.Panel header="Posts" key="posts">
        {posts?.data.map((post) => (
          <div
            key={post.title}
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "0.5rem",
              marginBottom: "0.25rem",
            }}
          >
            {post.title}
            <Tag>{post.status}</Tag>
          </div>
        ))}
      </Collapse.Panel>
      <Collapse.Panel header="Products" key="products">
        {products?.data.map((product) => (
          <div
            key={product.name}
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "0.5rem",
              marginBottom: "0.25rem",
            }}
          >
            {product.name}
            <Tag>{product.price / 10}</Tag>
          </div>
        ))}
      </Collapse.Panel>
    </Collapse>
  );
};
// visible-block-end

render(<App />);
```

### Usage

You can pick data providers in two ways:

You can either use the `dataProviderName` prop in data hooks and data-related components/functions:

```tsx
useTable({
  meta: {
    dataProviderName: "example",
  },
});
```

Or use the `meta.dataProviderName` property in your resource config, which will be the default data provider but can be overridden in data hooks and components:

```tsx
const App = () => (
  <Refine
    dataProvider={{
      default: defaultDataProvider,
      example: exampleDataProvider,
    }}
    resources={[
      {
        // `default` data provider will be used for this resource
        name: "posts",
      },
      {
        name: "products",
        // `exampleDataProvider` data provider will be used for this resource
        meta: { dataProviderName: "exampleDataProvider" },
      },
    ]}
  />
);
```

## Methods

Data provider's methods are expected to return a promise, meaning that they are async and can be used to create a data provider.
Refine consumes these data provider methods using [data hooks](#supported-hooks), which are used for CRUD actions like creating a new record, listing a resource or deleting a record, etc.

```tsx
import { DataProvider } from "@refinedev/core";

const dataProvider: DataProvider = {
  // required methods
  getList: ({ resource, pagination, sorters, filters, meta }) => Promise,
  create: ({ resource, variables, meta }) => Promise,
  update: ({ resource, id, variables, meta }) => Promise,
  deleteOne: ({ resource, id, variables, meta }) => Promise,
  getOne: ({ resource, id, meta }) => Promise,
  getApiUrl: () => "",
  // optional methods
  getMany: ({ resource, ids, meta }) => Promise,
  createMany: ({ resource, variables, meta }) => Promise,
  deleteMany: ({ resource, ids, variables, meta }) => Promise,
  updateMany: ({ resource, ids, variables, meta }) => Promise,
  custom: ({ url, method, filters, sorters, payload, query, headers, meta }) =>
    Promise,
};
```

[Refer to the Data Provider tutorial for more information and usage examples&#8594][data-provider-tutorial]

### getList <PropTag required />

The `getList` method is used to get a list of resources with sorting, filtering, and pagination features. It takes `resource`, `sorters`, `pagination`, and, `filters` as parameters. And it returns both `data` and `total` fields, regardless of the data provider used.

Refine will consume this method using the [`useList`][use-list] or [`useInfiniteList`][use-infinite-list] data hook.

#### Retrieving the Total Row Count

- Different data providers have specific ways to determine the total row count, and these are just some examples:
  - **Simple REST Providers:** The `x-total-count` header is commonly used to get the row count.
  - **GraphQL Providers:** The total count is often sourced from specific data fields, like `response.data.pageInfo.total`.

This documentation provides only illustrative examples. It's up to the data provider to determine how to best source the total count.

The method signature remains the same, and Refine expects a consistent format:

```ts
getList: async ({ resource, pagination, sorters, filters, meta }) => {
  const { current, pageSize } = pagination ?? {};

  // Adjust request parameters to meet the requirements of your API
  const response = await apiClient.get(`/${resource}`, {
    params: { _page: current, _limit: pageSize },
  });

  // The total row count could be sourced differently based on the provider
  const total = response.headers["x-total-count"] ?? response.data.length;

  return {
    data: response.data,
    total,
  };
};
```

:::tip

`getList` can also support cursor-based pagination. Refer to [related section in the `useInfiniteList` documentation](/core/docs/data/hooks/use-infinite-list#how-to-use-cursor-based-pagination) for more information.

:::

**Parameter Types:**

| Name        | Type                          |
| ----------- | ----------------------------- |
| resource    | `string`                      |
| pagination? | [`Pagination`][pagination]    |
| sorters?    | [`CrudSorting`][crud-sorting] |
| filters?    | [`CrudFilters`][crud-filters] |
| meta?       | [`MetaDataQuery`][meta-data]  |

### create <PropTag required/>

The `create` method creates a new record with the `resource` and `variables` parameters.

Refine will consume this method using the [`useCreate`][use-create] data hook.

```ts
create: async ({ resource, variables, meta }) => {
  // You can handle the request according to your API requirements.

  return {
    data,
  };
};
```

**Parameter Types**

| Name      | Type                         | Default |
| --------- | ---------------------------- | ------- |
| resource  | `string`                     |         |
| variables | `TVariables`                 | `{}`    |
| meta?     | [`MetaDataQuery`][meta-data] |

> `TVariables` is a user defined type which can be passed to [`useCreate`](/core/docs/data/hooks/use-create#type-parameters) to type `variables`.

### update <PropTag required />

The `update` method updates the record with the `resource`, `id`, and, `variables` parameters.

Refine will consume this method using the [`useUpdate`][use-update] data hook.

```ts
update: async ({ resource, id, variables, meta }) => {
  // You can handle the request according to your API requirements.

  return {
    data,
  };
};
```

**Parameter Types:**

| Name      | Type                         | Default |
| --------- | ---------------------------- | ------- |
| resource  | `string`                     |         |
| id        | [BaseKey][basekey]           |         |
| variables | `TVariables`                 | `{}`    |
| meta?     | [`MetaDataQuery`][meta-data] |

> `TVariables` is a user defined type which can be passed to [`useUpdate`](/core/docs/data/hooks/use-update#type-parameters) to type `variables`.

### deleteOne <PropTag required />

The `deleteOne` method delete the record with the `resource` and `id` parameters.

Refine will consume this method using the [`useDelete`][use-delete] data hook.

```ts
deleteOne: async ({ resource, id, variables, meta }) => {
  // You can handle the request according to your API requirements.

  return {
    data,
  };
};
```

**Parameter Types:**

| Name      | Type                         | Default |
| --------- | ---------------------------- | ------- |
| resource  | `string`                     |         |
| id        | [BaseKey][basekey]           |         |
| variables | `TVariables[]`               | `{}`    |
| meta?     | [`MetaDataQuery`][meta-data] |

> `TVariables` is a user defined type which can be passed to [`useDelete`](/core/docs/data/hooks/use-delete) to type `variables`.

### getOne <PropTag required />

The `getOne` method gets the record with the `resource` and `id` parameters.

Refine will consume this method using the [`useOne`][use-one] data hook.

```ts
getOne: async ({ resource, id, meta }) => {
  // You can handle the request according to your API requirements.

  return {
    data,
  };
};
```

**Parameter Types:**

| Name     | Type                         | Default |
| -------- | ---------------------------- | ------- |
| resource | `string`                     |         |
| id       | [BaseKey][basekey]           |         |
| meta?    | [`MetaDataQuery`][meta-data] |

### getApiUrl <PropTag required />

The `getApiUrl` method returns the `apiUrl` value.

Refine will consume this method using the [`useApiUrl`][use-api-url] data hook.

```ts title="src/data-provider.ts"
import { DataProvider } from "@refinedev/core";

export const dataProvider = (apiUrl: string): DataProvider => ({
  getApiUrl: () => apiUrl,
  // ...
});
```

### custom

An optional method named `custom` can be added to handle requests with custom parameters like URL, CRUD methods and configurations.
It's useful if you have non-standard REST API endpoints or want to make a connection with external resources.

Refine will consume this method using the [`useCustom`][use-custom] data hook.

```ts
custom: async ({
  url,
  method,
  filters,
  sorters,
  payload,
  query,
  headers,
  meta,
}) => {
  // You can handle the request according to your API requirements.

  return {
    data,
  };
};
```

**Parameter Types**

| Name     | Type                                                       |
| -------- | ---------------------------------------------------------- |
| url      | `string`                                                   |
| method   | `get`, `delete`, `head`, `options`, `post`, `put`, `patch` |
| sorters? | [`CrudSorting`][crud-sorting]                              |
| filters? | [`CrudFilters`][crud-filters]                              |
| payload? | `{}`                                                       |
| query?   | `{}`                                                       |
| headers? | `{}`                                                       |
| meta?    | [`MetaDataQuery`][meta-data]                               |

## Bulk Actions

Bulk actions are actions that can be performed on multiple items at once to improve speed and efficiency. They are commonly used in admin panels. They can be used for data [`import`](/core/docs/core/hooks/utilities/use-import) and [`export`](/core/docs/core/hooks/utilities/use-export), and are also atomic, meaning that they are treated as a single unit.

If your API supports bulk actions, you can implement them in your data provider.

### getMany

The `getMany` method gets the records with the `resource` and `ids` parameters. This method is optional, and Refine will use the [`getOne`](#getone-) method to handle multiple requests if you don't implement it.

Refine will consume this `getMany` method using the [`useMany`][use-many] data hook.

```ts
getMany: async ({ resource, ids, meta }) => {
  // You can handle the request according to your API requirements.

  return {
    data,
  };
};
```

**Parameter Types:**

| Name     | Type                         | Default |
| -------- | ---------------------------- | ------- |
| resource | `string`                     |         |
| ids      | [[BaseKey][basekey]]         |         |
| meta?    | [`MetaDataQuery`][meta-data] |

### createMany

This method allows us to create multiple items in a resource. This method is optional, and Refine will use the [`create`](#create-) method to handle multiple requests if you don't implement it.

Refine will consume this `createMany` method using the [`useCreateMany`][use-create-many] data hook.

```ts
createMany: async ({ resource, variables, meta }) => {
  // You can handle the request according to your API requirements.

  return {
    data,
  };
};
```

**Parameter Types:**

| Name      | Type                         | Default |
| --------- | ---------------------------- | ------- |
| resource  | `string`                     |         |
| variables | `TVariables[]`               | `{}`    |
| meta?     | [`MetaDataQuery`][meta-data] |

> `TVariables` is a user defined type which can be passed to [`useCreateMany`][use-create-many] to type `variables`.

### deleteMany

This method allows us to delete multiple items in a resource. This method is optional, and Refine will use the [`deleteOne`](#deleteone-) method to handle multiple requests if you don't implement it.

Refine will consume this `deleteMany` method using the [`useDeleteMany`][use-delete-many] data hook.

```ts
deleteMany: async ({ resource, ids, variables, meta }) => {
  // You can handle the request according to your API requirements.

  return {
    data,
  };
};
```

| Name      | Type                         | Default |
| --------- | ---------------------------- | ------- |
| resource  | `string`                     |         |
| ids       | [[BaseKey][basekey]]         |         |
| variables | `TVariables[]`               | `{}`    |
| meta?     | [`MetaDataQuery`][meta-data] |

> `TVariables` is a user defined type which can be passed to [`useDeleteMany`][use-delete-many] to type `variables`.

### updateMany

This method allows us to update multiple items in a resource. This method is optional, and Refine will use the [`update`](#update-) method to handle multiple requests if you don't implement it.

Refine will consume this `updateMany` method using the [`useUpdateMany`][use-update-many] data hook.

```ts
updateMany: async ({ resource, ids, variables, meta }) => {
  // You can handle the request according to your API requirements.

  return {
    data,
  };
};
```

| Name      | Type                         | Default |
| --------- | ---------------------------- | ------- |
| resource  | `string`                     |         |
| ids       | [[BaseKey][basekey]]         |         |
| variables | `TVariables[]`               | `{}`    |
| meta?     | [`MetaDataQuery`][meta-data] |

> `TVariables` is a user defined type which can be passed to [`useUpdateMany`][use-update-many] to type `variables`.

## Error Format

Refine expects errors to be extended from [`HttpError`][http-error].

Here is a basic example of how to implement error handling in your data provider.

```ts title="src/data-provider.ts"
import { DataProvider, HttpError } from "@refinedev/core";

export const dataProvider = (apiUrl: string): DataProvider => ({
  getOne: async ({ resource, id }) => {
    try {
      const response = await fetch(`https://api.example.com/${resource}/${id}`);

      // highlight-start
      if (!response.ok) {
        const error: HttpError = {
          message: response.statusText,
          statusCode: response.status,
        };
        return Promise.reject(error);
      }
      // highlight-end

      return {
        data: response.data,
      };
    } catch (error) {
      // highlight-start
      const error: HttpError = {
        message: error?.message || "Something went wrong",
        statusCode: error?.status || 500,
      };
      return Promise.reject(error);
      // highlight-end
    }
  },
  // ...
});
```

Also, the Axios interceptor can be used to transform the error from the response before Axios returns the response to your code.

```ts title="src/data-provider.ts"
// highlight-start
import axios from "axios";
import { DataProvider, HttpError } from "@refinedev/core";
// highlight-end
import { stringify } from "query-string";

// highlight-start
// Error handling with axios interceptors
const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const customError: HttpError = {
      ...error,
      message: error.response?.data?.message,
      statusCode: error.response?.status,
    };

    return Promise.reject(customError);
  },
);
// highlight-end

export const dataProvider = (apiUrl: string): DataProvider => ({
  // Methods
});
```

## meta Usage

When using APIs, you may wish to include custom parameters, such as a custom header. To accomplish this, you can utilize the `meta` field, which allows the sent parameter to be easily accessed by the data provider.

Here is an example of how to send a custom header parameter to the `getOne` method using `meta`:

We first need to send a custom header parameter to the [`getOne`](#getone-) method using `meta`.

```ts title="post/edit.tsx"
import { useOne } from "@refinedev/core";

useOne({
  resource: "post",
  id: "1",
  meta: {
    headers: {
      "x-custom-header": "hello world",
    },
  },
});
```

Then we can get the `meta` parameter from the data provider:

```ts title="src/data-provider.ts"
import { DataProvider } from "@refinedev/core";

export const dataProvider = (apiUrl: string): DataProvider => ({
  ...
  getOne: async ({ resource, id, variables, meta }) => {
    // highlight-next-line
    const { headers } = meta;
    const url = `${apiUrl}/${resource}/${id}`;

    // highlight-start
    httpClient.defaults.headers = {
      ...headers,
    };
    // highlight-end

    const { data } = await httpClient.get(url, variables);

    return {
      data,
    };
  },
});
```

## Supported Data Providers

<SupportedDataProviders/>

## Supported Hooks

Refine will consume:

- [`getList`](#getlist-) method using the [`useList`][use-list] or [`useInfiniteList`][use-infinite-list] data hook.
- [`create`](#create-) method using the [`useCreate`][use-create] data hook.
- [`update`](#update-) method using the [`useUpdate`][use-update] data hook.
- [`deleteOne`](#deleteone-) method using the [`useDeleteOne`][use-delete] data hook.
- [`getOne`](#getone-) method using the [`useOne`][use-one] data hook.
- [`getApiUrl`](#getapiurl-) method using the [`useApiUrl`][use-api-url] data hook.
- [`custom`](#custom) method using the [`useCustom`][use-custom] data hook.
- [`getMany`](#getmany) method using the [`useMany`][use-many] data hook.
- [`createMany`](#createmany) method using the [`useCreateMany`][use-create-many] data hook.
- [`deleteMany`](#deletemany) method using the [`useDeleteMany`][use-delete-many] data hook.
- [`updateMany`](#updatemany) method using the [`useUpdateMany`][use-update-many] data hook.

## FAQ

### How can I create a custom data provider?

[Refer to the "Create Data Provider From Scratch" section in the tutorial for more information →][create-a-data-provider]

### How can I customize existing data providers?

[You can swizzle the data provider using the Refine CLI and customize it as needed.][swizzle-a-data-provider]

### How I can override a specific method of Data Providers?

In some cases, you may need to override the method of Refine data providers. The simplest way to do this is to use the [Spread syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)

For example, Let's override the `update` function of the [`@refinedev/simple-rest`](https://github.com/refinedev/refine/tree/main/packages/simple-rest). `@refinedev/simple-rest` uses the `PATCH` HTTP method for `update`, let's change it to `PUT` without forking the whole data provider.

```tsx
import dataProvider from "@refinedev/simple-rest";

const simpleRestProvider = dataProvider("API_URL");
const myDataProvider = {
  ...simpleRestProvider,
  update: async ({ resource, id, variables }) => {
    const url = `${apiUrl}/${resource}/${id}`;

    const { data } = await httpClient.put(url, variables);

    return {
      data,
    };
  },
};

<Refine dataProvider={myDataProvider}>{/* ... */}</Refine>;
```

[basekey]: /core/docs/core/interface-references#basekey
[create-a-data-provider]: https://refine.dev/core/tutorial/essentials/data-fetching/intro/#creating-a-data-provider
[swizzle-a-data-provider]: /core/docs/packages/cli/#swizzle
[data-provider-tutorial]: https://refine.dev/core/tutorial/essentials/data-fetching/intro/
[use-api-url]: /core/docs/data/hooks/use-api-url
[use-create]: /core/docs/data/hooks/use-create
[use-create-many]: /core/docs/data/hooks/use-create
[use-custom]: /core/docs/data/hooks/use-custom
[use-delete]: /core/docs/data/hooks/use-delete
[use-delete-many]: /core/docs/data/hooks/use-delete
[use-list]: /core/docs/data/hooks/use-list
[use-infinite-list]: /core/docs/data/hooks/use-infinite-list
[use-many]: /core/docs/data/hooks/use-many
[use-one]: /core/docs/data/hooks/use-one
[use-update]: /core/docs/data/hooks/use-update
[use-update-many]: /core/docs/data/hooks/use-update
[crud-sorting]: /core/docs/core/interface-references#crudsorting
[crud-filters]: /core/docs/core/interface-references#crudfilters
[pagination]: /core/docs/core/interface-references#pagination
[http-error]: /core/docs/core/interface-references#httperror
[meta-data]: /core/docs/core/interface-references#metaquery
