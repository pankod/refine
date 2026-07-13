---
id: create-dataprovider
title: 3. Create Data Provider From Scratch
tutorial:
  prev: 3.xx.xx/tutorial/understanding-dataprovider/swizzle
  next: 3.xx.xx/tutorial/understanding-resources/index
---

## Introduction

The standards and usage of APIs can vary significantly, so it is possible that **refine's** built-in data providers may not be suitable for your needs.
In this case, you will need to develop your own Data Provider.

Data providers works like an adapter system infrastructure. So they can communicate with REST, GraphQL, RPC and SOAP based APIs. You can use `fetch`, `axios`, `apollo-client` or any library for this communication.

As shown below, we will begin by creating a file and adding additional methods as we proceed.

Using `axios` as our HTTP client will allow us to make efficient and reliable HTTP requests to our server. Interceptors provide several benefits, such as centralized error handling, the ability to modify request or response data, and show global loading indicators.
To get started, install the `axios` to our project.

<InstallPackagesCommand args="axios"/>

Using the `stringify` library will allow us to convert the query parameters into a string format. This can be useful when we need to pass query parameters as part of an HTTP request.

<InstallPackagesCommand args="query-string@7"/>

For our own data provider, the first step is to create the following file.

```ts title="src/data-provider.ts"
import { DataProvider } from "@pankod/refine-core";
import { stringify } from "query-string";

export const dataProvider = (apiUrl: string): DataProvider => ({
  // Methods
});
```

## Error Handling

When an error is returned from the API, **refine** must be extended from [HttpError](https://github.com/refinedev/refine/blob/v3/packages/core/src/interfaces/HttpError.ts) to handle it.
Axios interceptor can be used to transform the error from response before Axios returns the response to your code.
Interceptors are methods which are triggered before the main method.

In a `utility` file, create an `axiosInstance` and define an `interceptor` to handle errors. Then export it.

```ts title="src/data-provider.ts"
// highlight-start
import axios from "axios";
import { DataProvider, HttpError } from "@pankod/refine-core";
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

## Methods

Now we'll add the methods that the data provider needs to implement. We will implement the following methods:

### getList

`getList` method is used to get a list of resources with sorting, filtering and pagination features.
It takes `resource`, `sort`, `pagination` and `filters` as parameters and returns `data` and `total`.

Let's assume the API we want to implement is as follows:

```bash
[GET] https://api.fake-rest.refine.dev/posts

HTTP/2 200
Content-Type: application/json
x-total-count: 1000
access-control-expose-headers: X-Total-Count

[
  {
    "id": 930,
    "title": "Rerum id laborum architecto et rerum earum.",
    "slug": "et-voluptas-corporis",
    "category": {
      "id": 4
    }
    "status": "draft",
  },
  {
    "id": 892,
    "title": "Architecto officiis sint voluptatem modi.",
    "slug": "iusto-est-corrupti",
    "category": {
      "id": 1
    },
    "status": "rejected",
  }
  ...
]
```

1. In the first step, we'll return the data and the total number of records using the `resource` parameter.

   `resource` parameter is the name of the resource that we want to get the data from. It passes by the `resource` parameter in hooks. In our case, it is `posts`.

   ```ts title="src/data-provider.ts"
   export const dataProvider = (apiUrl: string): DataProvider => ({
     // ...
     getList: async ({ resource }) => {
       const url = `${apiUrl}/${resource}`;

       const { data, headers } = await axiosInstance.get(url);

       const total = +headers["x-total-count"];

       return {
         data,
         total,
       };
     },
     // ...
   });
   ```

2. Now let's add the pagination feature. For this, the API takes the following parameters.

   ```bash
   [GET] https://api.fake-rest.refine.dev/posts?_limit=10&_page=2
   ```

   **refine** uses the `pagination` parameter for pagination.
   For this parameter, `current` is refer to page number and `pageSize` refer to the number of records in the each page.

   ```bash
   [
     {
       current: 1,
       pageSize: 10,
     },
   ]
   ```

   ```ts title="src/data-provider.ts"
   export const dataProvider = (apiUrl: string): DataProvider => ({
     // ...
     getList: async ({ resource, pagination }) => {
       const url = `${apiUrl}/${resource}`;

       // highlight-start
       const { current = 1, pageSize = 10 } = pagination ?? {};

       const query: {
         _start?: number;
         _end?: number;
       } = {
         _start: (current - 1) * pageSize,
         _end: current * pageSize,
       };

       const { data, headers } = await axiosInstance.get(
         `${url}?${stringify(query)}`,
       );
       // highlight-end

       const total = +headers["x-total-count"];

       return {
         data,
         total,
       };
     },
     // ...
   });
   ```

3. Now let's add the sorting feature. The API expects the following parameters for sorting.

   ```bash
   [GET] https://api.fake-rest.refine.dev/posts?_limit=10&_page=2&_sort=id&_order=desc
   ```

   **refine** uses the `sort` parameter for sorting. This parameter includes `field` and `order` values.
   Supports multiple field sorting. [CrudSort[]](../../api-reference/core/interfaces#CrudSorting) type, it comes in the data provider as follows.

   ```bash
   [
     {
       field: "id",
       order: "desc",
     },
   ]
   ```

   :::tip
   **refine** supports multi-field sorting.
   :::

   ```ts title="src/data-provider.ts"
   getList: async ({ resource, pagination, sort }) => {
     const url = `${apiUrl}/${resource}`;

     const { current = 1, pageSize = 10 } = pagination ?? {};

     const query: {
       _start?: number;
       _end?: number;
       // highlight-start
       _sort?: string;
       _order?: string;
       // highlight-end
     } = {
       _start: (current - 1) * pageSize,
       _end: current * pageSize,
     };

     // highlight-start
     if (sort && sort.length > 0) {
       query._sort = sort[0].field;
       query._order = sort[0].order;
     }
     // highlight-end

     // highlight-next-line
     const { data, headers } = await axiosInstance.get(
      `${url}?${stringify(query)}`,
     );

     const total = +headers["x-total-count"];

     return {
       data,
       total,
     };
   },
   ```

4. Now let's add the filtering feature. The API expects the following parameters for filtering.

   ```bash

   [GET] https://api.fake-rest.refine.dev/posts?_limit=10&_page=2&_sort=id&_order=desc&title_like
   ```

   **refine** uses the `filters` parameter for filtering. This parameter contains `field`, `operator` and `value` with type [CrudFilters []](../../api-reference/core/interfaces#crudfilters).

   ```bash
   [
     {
       field: "status"
       operator: "eq"
       value: "published"
     },
     {
       field: "title"
       operator: "contain"
       value: "Hello"
     },
   ]
   ```

   The `operator` data comes with the [CrudOperators](../../api-reference/core/interfaces#crudoperators) type and needs to be mapped to the API. For this, the following `mapOperator` function is written.

   ```ts
   // Map refine operators to API operators
   const mapOperator = (operator: CrudOperators): string => {
     switch (operator) {
       case "ne":
       case "gte":
       case "lte":
         return `_${operator}`;
       case "contains":
         return "_like";
       case "eq":
       default:
         return "";
     }
   };
   ```

   ```ts title="src/data-provider.ts"
   // highlight-start
   const generateFilters = (filters?: CrudFilters) => {
     const queryFilters: { [key: string]: string } = {};

     filters?.map((filter): void => {
       if ("field" in filter) {
         const { field, operator, value } = filter;
         const mappedOperator = mapOperator(operator);
         queryFilters[`${field}${mappedOperator}`] = value;
       }
     });

     return queryFilters;
   };
   // highlight-end

   getList: async ({ resource, pagination, sort, filters }) => {
     const url = `${apiUrl}/${resource}`;

     const { current = 1, pageSize = 10 } = pagination ?? {};

     const query: {
       _start?: number;
       _end?: number;
       _sort?: string;
       _order?: string;
     } = {
       _start: (current - 1) * pageSize,
       _end: current * pageSize,
     };

     if (sort && sort.length > 0) {
       query._sort = sort[0].field;
       query._order = sort[0].order;
     }

     // highlight-next-line
     const queryFilters = generateFilters(filters);

     const { data, headers } = await axiosInstance.get(
       // highlight-next-line
       `${url}?${stringify(query)}&${stringify(queryFilters)}`
     );

     const total = +headers["x-total-count"];

     return {
       data,
       total,
     };
   },
   ```

   :::info
   Also, conditional filters can be made using `and` and `or`. For example:

   ```bash
   [
     {
       operator: "or",
       value: [
         {
           operator: "and"
           value: [
             {
               field: "title"
               operator: "contain"
               value: "Hello"
             },
             {
               field: "age"
               operator: "gte"
               value: "18"
             },
           ]
         },
         {
           operator: "and"
           value: [
             {
               field: "title"
               operator: "contain"
               value: "Hello"
             },
             {
               field: "age"
               operator: "lte"
               value: "18"
             },
           ]
         }
       ]
     }
   ]
   ```

   :::

   **Parameter Types:**

   | Name           | Type                                                             |
   | -------------- | ---------------------------------------------------------------- |
   | resource       | `string`                                                         |
   | hasPagination? | `boolean` _(defaults to `true`)_                                 |
   | pagination?    | [`Pagination`](../../api-reference/core/interfaces#pagination)   |
   | sort?          | [`CrudSorting`](../../api-reference/core/interfaces#crudsorting) |
   | filters?       | [`CrudFilters`](../../api-reference/core/interfaces#crudfilters) |

<br/>

**refine** will consume this `getList` method using the `useList` or `useInfiniteList` data hook.

```ts
import { useList } from "@pankod/refine-core";

const { data } = useList({
  resource: "posts",
  config: {
    sort: [
      {
        field: "id",
        order: "desc",
      },
    ],
    filters: [
      {
        field: "title",
        operator: "contains",
        value: "hello",
      },
    ],
  },
});
```

> [Refer to the useList documentation for more information. &#8594](/core/docs/3.xx.xx/api-reference/core/hooks/data/useList)

### create

The `create` method creates a new record with the `resource` and `variables` parameters.

```ts title="src/data-provider.ts"
export const dataProvider = (apiUrl: string): DataProvider => ({
  // ...
  create: async ({ resource, variables }) => {
    const url = `${apiUrl}/${resource}`;

    const { data } = await axiosInstance.post(url, variables);

    return {
      data,
    };
  },
  // ...
});
```

**Parameter Types**

| Name      | Type         | Default |
| --------- | ------------ | ------- |
| resource  | `string`     |         |
| variables | `TVariables` | `{}`    |

> `TVariables` is a user defined type which can be passed to [`useCreate`](/core/docs/3.xx.xx/api-reference/core/hooks/data/useCreate#type-parameters) to type `variables`

<br/>

**refine** will consume this `create` method using the `useCreate` data hook.

```ts
import { useCreate } from "@pankod/refine-core";

const { mutate } = useCreate();

mutate({
  resource: "posts",
  values: {
    title: "New Post",
  },
});
```

> [Refer to the useCreate documentation for more information. &#8594](/core/docs/3.xx.xx/api-reference/core/hooks/data/useCreate/)

### update

The `update` method updates the record with the `resource`, `id` and `variables` parameters.

```ts title="src/data-provider.ts"
export const dataProvider = (apiUrl: string): DataProvider => ({
  // ...
  update: async ({ resource, id, variables }) => {
    const url = `${apiUrl}/${resource}/${id}`;

    const { data } = await axiosInstance.patch(url, variables);

    return {
      data,
    };
  },
  // ...
});
```

**Parameter Types:**

| Name      | Type                                                   | Default |
| --------- | ------------------------------------------------------ | ------- |
| resource  | `string`                                               |         |
| id        | [BaseKey](../../api-reference/core/interfaces#basekey) |         |
| variables | `TVariables`                                           | `{}`    |

> `TVariables` is a user defined type which can be passed to [`useUpdate`](/core/docs/3.xx.xx/api-reference/core/hooks/data/useUpdate#type-parameters) to type `variables`

<br/>

**refine** will consume this `update` method using the `useUpdate` data hook.

```ts
import { useUpdate } from "@pankod/refine-core";

const { mutate } = useUpdate();

mutate({
  resource: "posts",
  id: 2,
  values: { title: "New Post Title" },
});
```

> [Refer to the useUpdate documentation for more information. &#8594](/core/docs/3.xx.xx/api-reference/core/hooks/data/useUpdate/)

### deleteOne

The `deleteOne` method delete the record with the `resource` and `id` parameters.

```ts title="src/data-provider.ts"
export const dataProvider = (apiUrl: string): DataProvider => ({
  // ...
  deleteOne: async ({ resource, id, variables }) => {
    const url = `${apiUrl}/${resource}/${id}`;

    const { data } = await axiosInstance.delete(url, {
      data: variables,
    });

    return {
      data,
    };
  },
  // ...
});
```

**Parameter Types:**

| Name      | Type                                                   | Default |
| --------- | ------------------------------------------------------ | ------- |
| resource  | `string`                                               |         |
| id        | [BaseKey](../../api-reference/core/interfaces#basekey) |         |
| variables | `TVariables[]`                                         | `{}`    |

> `TVariables` is a user defined type which can be passed to [`useDelete`](/core/docs/3.xx.xx/api-reference/core/hooks/data/useDelete/) to type `variables`

<br/>

**refine** will consume this `deleteOne` method using the `useDelete` data hook.

```ts
import { useDelete } from "@pankod/refine-core";

const { mutate } = useDelete();

mutate({ resource: "posts", id: 2 });
```

> [Refer to the useDelete documentation for more information. &#8594](/core/docs/3.xx.xx/api-reference/core/hooks/data/useDelete/)

### getOne

The `getOne` method gets the record with the `resource` and `id` parameters.

```ts title="src/data-provider.ts"
export const dataProvider = (apiUrl: string): DataProvider => ({
  // ...
  getOne: async ({ resource, id }) => {
    const url = `${apiUrl}/${resource}/${id}`;

    const { data } = await axiosInstance.get(url);

    return {
      data,
    };
  },
  // ...
});
```

**Parameter Types:**

| Name     | Type                                                   | Default |
| -------- | ------------------------------------------------------ | ------- |
| resource | `string`                                               |         |
| id       | [BaseKey](../../api-reference/core/interfaces#basekey) |         |

<br/>

**refine** will consume this `getOne` method using the `useOne` data hook.

```ts
import { useOne } from "@pankod/refine-core";

const { data } = useOne({ resource: "posts", id: 1 });
```

> [Refer to the useOne documentation for more information. &#8594](/core/docs/3.xx.xx/api-reference/core/hooks/data/useOne/)

<br/>

### getApiUrl

The `getApiUrl` method returns the `apiUrl` value.

```ts title="src/data-provider.ts"
import { DataProvider } from "@pankod/refine-core";

export const dataProvider = (apiUrl: string): DataProvider => ({
  // highlight-next-line
  getApiUrl: () => apiUrl,
  // ...
});
```

**refine** will consume this `getApiUrl` method using the `useApiUrl` data hook.

```ts
import { useApiUrl } from "@pankod/refine-core";

const { data } = useApiUrl();
```

> [Refer to the useApiUrl documentation for more information. &#8594](/core/docs/3.xx.xx/api-reference/core/hooks/data/useApiUrl/)

### custom

An optional method named `custom` can be added to handle requests with custom parameters like URL, CRUD methods and configurations.
It's useful if you have non-standard REST API endpoints or want to make a connection with external resources.

```ts title="dataProvider.ts"
export const dataProvider = (apiUrl: string): DataProvider => ({
  // ...
  custom: async ({ url, method, filters, sort, payload, query, headers }) => {
    let requestUrl = `${url}?`;

    if (sort && sort.length > 0) {
      const sortQuery = {
        _sort: sort[0].field,
        _order: sort[0].order,
      };
      requestUrl = `${requestUrl}&${stringify(sortQuery)}`;
    }

    if (filters) {
      const filterQuery = generateFilters(filters);
      requestUrl = `${requestUrl}&${stringify(filterQuery)}`;
    }

    if (query) {
      requestUrl = `${requestUrl}&${stringify(query)}`;
    }

    if (headers) {
      axiosInstance.defaults.headers = {
        ...axiosInstance.defaults.headers,
        ...headers,
      };
    }

    let axiosResponse;
    switch (method) {
      case "put":
      case "post":
      case "patch":
        axiosResponse = await axiosInstance[method](url, payload);
        break;
      case "delete":
        axiosResponse = await axiosInstance.delete(url, {
          data: payload,
        });
        break;
      default:
        axiosResponse = await axiosInstance.get(requestUrl);
        break;
    }

    const { data } = axiosResponse;

    return Promise.resolve({ data });
  },
  // ...
});
```

**Parameter Types**

| Name     | Type                                                              |
| -------- | ----------------------------------------------------------------- |
| url      | `string`                                                          |
| method   | `get`, `delete`, `head`, `options`, `post`, `put`, `patch`        |
| sort?    | [`CrudSorting`](../../api-reference/core/interfaces#crudsorting); |
| filters? | [`CrudFilters`](../../api-reference/core/interfaces#crudfilters); |
| payload? | `{}`                                                              |
| query?   | `{}`                                                              |
| headers? | `{}`                                                              |

<br/>

**refine** will consume this `custom` method using the `useCustom` data hook.

```ts
import { useCustom, useApiUrl } from "@pankod/refine-core";

const { data, isLoading } = useCustom({
  url: `${apiURL}/posts-unique-check`,
  method: "get",
  config: {
    query: {
      title: "Foo bar",
    },
  },
});
```

> [Refer to the useCustom documentation for more information. &#8594](/core/docs/3.xx.xx/api-reference/core/hooks/data/useCustom/)

## Bulk Actions

Bulk actions are actions that can be performed on multiple items at once. Performing bulk actions is a common pattern in admin panels. If your API supports bulk actions, you can implement them in your data provider.

:::tip
Bulk operations are a way to perform many database operations at once, improving speed and efficiency. They can be used for data [`import`](../../examples/core/useImport) and [`export`](../../api-reference/core/hooks/import-export/useExport), and have the added benefit of being atomic, meaning that they are treated as a single unit.
:::

### getMany

The `getMany` method gets the records with the `resource` and `ids` parameters. Implementation of this method is optional. If you don't implement it, refine will use [`getOne`](#getone) method to handle multiple requests.

```ts title="src/data-provider.ts"
export const dataProvider = (apiUrl: string): DataProvider => ({
  // ...
  getMany: async ({ resource, ids }) => {
    const { data } = await axiosInstance.get(
      `${apiUrl}/${resource}?${stringify({ id: ids })}`,
    );

    return {
      data,
    };
  },
  // ...
});
```

**Parameter Types:**

| Name     | Type                                                     | Default |
| -------- | -------------------------------------------------------- | ------- |
| resource | `string`                                                 |         |
| ids      | [[BaseKey](../../api-reference/core/interfaces#basekey)] |         |

<br/>

**refine** will consume this `getMany` method using the `useMany` data hook.

```ts
import { useMany } from "@pankod/refine-core";

const { data } = useMany({ resource: "posts", ids: [1, 2] });
```

> [Refer to the useMany documentation for more information. &#8594](/core/docs/3.xx.xx/api-reference/core/hooks/data/useMany/)

### createMany

This method allows us to create multiple items in a resource. Implementation of this method is optional. If you don't implement it, refine will use [`create`](#create) method to handle multiple requests.

```ts title="src/data-provider.ts"
export const dataProvider = (apiUrl: string): DataProvider => ({
  // ...
  createMany: async ({ resource, variables }) => {
    const url = `${apiUrl}/${resource}/bulk`;
    const { data } = await axiosInstance.post(url, { values: variables });

    return {
      data,
    };
  },
  // ...
});
```

**Parameter Types:**

| Name      | Type           | Default |
| --------- | -------------- | ------- |
| resource  | `string`       |         |
| variables | `TVariables[]` | `{}`    |

> `TVariables` is a user defined type which can be passed to [`useCreateMany`](/core/docs/3.xx.xx/api-reference/core/hooks/data/useCreateMany/) to type `variables`

<br/>

**refine** will consume this `createMany` method using the `useCreateMany` data hook.

```ts
import { useCreateMany } from "@pankod/refine-core";

const { mutate } = useCreateMany();

mutate({
  resource: "posts",
  values: [
    {
      title: "New Post",
    },
    {
      title: "Another New Post",
    },
  ],
});
```

> [Refer to the useCreateMany documentation for more information. &#8594](/core/docs/3.xx.xx/api-reference/core/hooks/data/useCreateMany/)

### deleteMany

This method allows us to delete multiple items in a resource. Implementation of this method is optional. If you don't implement it, refine will use [`deleteOne`](#deleteone) method to handle multiple requests.

```ts title="src/data-provider.ts"
export const dataProvider = (apiUrl: string): DataProvider => ({
  // ...
  deleteMany: async ({ resource, ids }) => {
    const url = `${apiUrl}/${resource}/bulk?ids=${ids.join(",")}`;
    const { data } = await axiosInstance.delete(url);

    return {
      data,
    };
  },
  // ...
});
```

**Parameter Types:**

| Name      | Type                                                     | Default |
| --------- | -------------------------------------------------------- | ------- |
| resource  | `string`                                                 |         |
| ids       | [[BaseKey](../../api-reference/core/interfaces#basekey)] |         |
| variables | `TVariables[]`                                           | `{}`    |

> `TVariables` is a user defined type which can be passed to [`useDeleteMany`](/core/docs/3.xx.xx/api-reference/core/hooks/data/useDeleteMany/) to type `variables`

<br/>

**refine** will consume this `deleteMany` method using the `useDeleteMany` data hook.

```ts
import { useDeleteMany } from "@pankod/refine-core";

const { mutate } = useDeleteMany();

mutate({
  resource: "posts",
  ids: [2, 3],
});
```

> [Refer to the useDeleteMany documentation for more information. &#8594](/core/docs/3.xx.xx/api-reference/core/hooks/data/useDeleteMany/)

### updateMany

This method allows us to update multiple items in a resource. Implementation of this method is optional. If you don't implement it, refine will use [`update`](#update) method to handle multiple requests.

```ts title="src/data-provider.ts"
export const dataProvider = (apiUrl: string): DataProvider => ({
  // ...
  updateMany: async ({ resource, ids, variables }) => {
    const url = `${apiUrl}/${resource}/bulk`;
    const { data } = await axiosInstance.patch(url, { ids, variables });

    return {
      data,
    };
  },
  // ...
});
```

**refine** will consume this `updateMany` method using the `useUpdateMany` data hook.

```ts
import { useUpdateMany } from "@pankod/refine-core";

const { mutate } = useUpdateMany();

mutate({
  resource: "posts",
  ids: [1, 2],
  values: { status: "draft" },
});
```

> [Refer to the useUpdateMany documentation for more information. &#8594](/core/docs/3.xx.xx/api-reference/core/hooks/data/useUpdateMany/)

## metaData Usage

When using APIs, you may wish to include custom parameters, such as a custom header. To accomplish this, you can utilize the `metaData` field, which allows the sent parameter to be easily accessed by the data provider.

Now let's send a custom header parameter to the [`getOne`](#getone) method using `metaData`.

:::tip
The `metaData` parameter can be used in all data, form, and table hooks.
:::

```ts title="post/edit.tsx"
import { useOne } from "@pankod/refine-core";

useOne({
  resource: "post",
  id: "1",
  metaData: {
    headers: {
      "x-custom-header": "hello world",
    },
  },
});
```

Now let's get the `metaData` parameter from the data provider.

```ts title="src/data-provider.ts"
import { DataProvider } from "@pankod/refine-core";

export const dataProvider = (apiUrl: string): DataProvider => ({
  // ...
  getOne: async ({ resource, id, variables, metaData }) => {
    // highlight-next-line
    const { headers } = metaData;
    const url = `${apiUrl}/${resource}/${id}`;

    // highlight-start
    axiosInstance.defaults.headers = {
      ...headers,
    };
    // highlight-end

    const { data } = await axiosInstance.get(url, variables);

    return {
      data,
    };
  },
  // ...
});
```

<Checklist>

<ChecklistItem id="data-provider-create-your-data-provider">
I understood how to create a data provider.
</ChecklistItem>
<ChecklistItem id="data-provider-create-your-data-provider-2">
I learned how to handle errors.
</ChecklistItem>
<ChecklistItem id="data-provider-create-your-data-provider-3">
I understood how to use the `metaData` parameter.
</ChecklistItem>

</Checklist>
