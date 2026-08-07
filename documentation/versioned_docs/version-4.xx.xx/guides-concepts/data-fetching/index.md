---
title: "Data Fetching Guide | Refine v4 Architecture"
display_title: "Data Fetching"
sidebar_label: "Data Fetching"
description: "Understand how Refine v4 handles data. Learn about data providers, hooks, and the underlying architecture for efficient API communication."
---

import UseOne from "./use-one";
import UseUpdate from "./use-update";
import UseList from "./use-list";
import UseListWithFilters from "./use-list-with-filters";
import MultipleDataProvider from "./multiple-data-provider";
import Authentication from "./authentication";
import OneToOne from "./one-to-one";
import OneToMany from "./one-to-many";
import ErrorHandling from "./error-handling";
import SupportedDataProviders from "@site/src/partials/data-provider/supported-data-providers.md";
import DataHooks from "@site/src/partials/data-provider/data-hooks.md";
import DataProviderInterface from "./data-provider-interface.md";

Data is essential for any UI Application and these applications are a bridge between users and the underlying data source(s), making it possible for users to interact with data in a meaningful way.

To manage data, Refine needs a `data provider`, which is a function that implements the [`DataProvider`](/core/docs/core/interface-references#dataprovider) interface. It is responsible for communicating with your API and making data available to Refine applications. While you can use one of our built-in data providers, you can also easily create your own data provider matching your API.

Refine passes relevant parameters like `resource` name, or the `id` of the record to your data provider, so data provider can make API calls to appropriate endpoints.

Once you provide `data provider` to Refine, you can utilize our data hooks (`useOne`, `useList`, `useUpdate`) to easily manage your data from various sources, including REST, GraphQL, RPC, and SOAP.

Moreover, Refine offers support for multiple data providers, allowing you to use different data providers for different resources. For instance, you can use **REST** for the `posts` endpoint and **GraphQL** for the `users` query.

<Image src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/guides-and-concepts/providers/data-provider/api-consuming-flow.webp" />

## Fetching Data

Imagine we want to fetch a record with the ID `123` from the `products` endpoint. For this, we will use the `useOne` hook. Under the hood, it calls the `dataProvider.getOne` method from your data provider.

<UseOne />

## Updating Data

Now, let's update the record with the ID `124` from `products` endpoint. To do this, we can use `useUpdate` hook, which calls `dataProvider.update` method under the hood.

In this example, we are updating product's price with a random value.

<UseUpdate />

Refine offers various data hooks for CRUD operations, you can see the list of these hooks below:

<DataHooks />

## How Refine treats data and state?

Data hooks uses [TanStack Query](https://tanstack.com/query) under the hood. It takes care of managing the state for you. It provides `data`, `isLoading`, and `error` states to help you handle loading, success, and error scenarios gracefully.

Refine treats data and state in a structured and efficient manner, providing developers with powerful tools to manage data seamlessly within their applications. Here are some key aspects of how Refine treats data and state:

1. **Resource-Based Approach:** Organizes data around resources, which are essentially models representing different data entities or API endpoints. These resources help structure your application's data management.

2. **Invalidation:** Automatically invalidates data after a successful mutation (e.g., creating, updating, or deleting a resource), ensuring that the UI is updated with the latest data.

3. **Caching:** Caches data to improve performance and deduplicates API calls.

4. **Optimistic Updates:** Supports optimistic updates, which means it will update the UI optimistically before the actual API call is complete. This enhances the user experience by reducing perceived latency.

5. **Hooks for CRUD Operations:** Offers a collection of hooks that align with common data operations like listing, creating, updating, and deleting data (`useList`, `useCreate`, `useUpdate`, `useDelete`). In addition to these basic hooks, Refine provides advanced hooks that are a composition of these fundamental ones for handling more complex tasks (`useForm`, `useTable`, `useSelect`).

6. **Integration with UI Libraries:** Works seamlessly with popular UI libraries. It provides a structured approach to represent data within these libraries.

7. **Realtime Updates**: Allowing your application to reflect changes in data as they occur.

## Meta usage <GuideBadge id="guides-concepts/general-concepts#meta" />

[`meta`][meta] is a special property that can be used to pass additional information to your data provider methods through data hooks like `useOne`, `useList`, `useForm` from anywhere across your application.

The capabilities of `meta` properties depend on your data provider's implementation. While some may use additional features through `meta`, others may not use them or follow a different approach.

Here are some examples of `meta` usage:

- Passing additional headers or parameters to the request.
- Generate GraphQL queries.
- Multi-tenancy support (passing the tenant id to the request).

In the example below, we are passing `meta.foo` property to the `useOne` hook. Then, we are using this property to pass additional headers to the request.

```tsx
import { DataProvider, useOne } from "@refinedev/core";

useOne({
    resource: "products",
    id: 1,
    meta: {
        foo: "bar",
    },
});

export const dataProvider = (apiUrl: string): DataProvider => ({
    getOne: async ({ resource, id, meta }) => {
        const response = await fetch(`${apiUrl}/${resource}/${id}`, {
            headers: {
                "x-foo": meta.foo,
            },
        });

        const data = await response.json();

        return {
            data,
        };
    },
    ...
});
```

## GraphQL

Refine's `meta` property has `gqlQuery` and `gqlMutation` fields, which accepts **GraphQL** operation as `graphql`'s [`DocumentNode`](https://graphql.org/graphql-js/type/#documentnode) type.

You can use these fields to pass **GraphQL** queries or mutations to your data provider methods through data hooks like `useOne`, `useList`, `useForm` from anywhere across your application.

Easiest way to generate GraphQL queries is to use [graphql-tag](https://www.npmjs.com/package/graphql-tag) package.

```tsx
import gql from "graphql-tag";
import { useOne, useUpdate } from "@refinedev/core";

const GET_PRODUCT_QUERY = gql`
  query GetProduct($id: ID!) {
    product(id: $id) {
      id
      title
      category {
        title
      }
    }
  }
`;

useOne({
  resource: "products",
  id: 1,
  meta: {
    gqlQuery: GET_PRODUCT_QUERY,
  },
});

const UPDATE_PRODUCT_MUTATION = gql`
  mutation UpdateOneProduct($id: ID!, $input: UpdateOneProductInput!) {
    updateOneProduct(id: $id, input: $input) {
      id
      title
      category {
        title
      }
    }
  }
`;

const { mutate } = useUpdate();

mutate({
  resource: "products",
  id: 1,
  values: {
    title: "New Title",
  },
  meta: {
    gqlMutation: UPDATE_PRODUCT_MUTATION,
  },
});
```

:::simple

**Nest.js Query** data provider implements full support for `gqlQuery` and `gqlMutation` fields.

See [Nest.js Query Docs](/core/docs/data/packages/nestjs-query) for more information.

:::

Also, you can check Refine's built-in [GraphQL data providers](#supported-data-providers) to handle communication with your GraphQL APIs or use them as a starting point.

## Multiple Data Providers

Using multiple data providers in Refine allows you to work with various APIs or data sources in a single application. You might use different data providers for different parts of your app.

Each data provider can have its own configuration, making it easier to manage complex data scenarios within a single application.
This flexibility is handy when dealing with various data structures and APIs.

For example, we want to fetch:

- `products` from `https://api.finefoods.refine.dev`
- `user` from `https://api.fake-rest.refine.dev`.

As you can see the example below:

- We are defining multiple data providers in `App.tsx`.
- Using `dataProviderName` field to specify which data provider to use in data hooks in `home-page.tsx`.

<MultipleDataProvider />

## Handling errors

Refine expects errors to be extended from [HttpError](/core/docs/core/interface-references#httperror). We believe that having consistent error interface makes it easier to handle errors coming from your API.

When implemented correctly, Refine offers several advantages in error handling:

- **Notification**: If you have [`notificationProvider` ](/core/docs/notification/notification-provider), Refine will automatically show a notification when an error occurs.
- **Server-Side Validation**: Shows [errors coming from the API](/core/docs/advanced-tutorials/forms/server-side-form-validation/) on the corresponding form fields.
- **Optimistic Updates**: Instantly update UI when you send a mutation and automatically revert the changes if an error occurs during the mutation.

<ErrorHandling />

## Listing Data

Imagine we need to fetch a list of records from the `products` endpoint. For this, we can use [`useList`][use-list] or [`useInfiniteList`][use-infinite-list] hooks. It calls `dataProvider.getList` method from your data provider, returns `data` and `total` fields from the response.

<UseList />

### Filters, Sorters and Pagination

We fetched all the products from the `products` endpoint in the previous example. But in real world, we usually need to fetch a subset of the data.

Refine provides a unified [`filters`][crud-filters], [`sorters`][crud-sorting], and [`pagination`][pagination] parameters in data hooks to pass your `data provider` methods, making it possible to fetch the data you need with any complexity. It's data provider's responsibility to handle these parameters and modify the request sent to your API.

Now let's make it more realistic example by adding filters, sorters, and pagination.

We want to:

- Fetch 5 products
- With `material` field equals to `wooden`
- Sorted by `ID` field in `descending` order

For this purpose, we can pass additional parameters to `useList` hook like [`filters`][crud-filters], [`sorters`][crud-sorting], and [`pagination`][pagination].

`useList` calls the `dataProvider.getList` method under the hood with the given parameters. We will use these parameters modify our request sent to our API.

<UseListWithFilters />

While the example above is simple, it's also possible to build more complex queries with [`filters`][crud-filters] and [`sorters`][crud-sorting].

For instance, we can fetch products:

- With wooden material
- Belongs to category ID 45
- **OR** have a price between 1000 and 2000.

```tsx
import { DataProvider, useList } from "@refinedev/core";

useList({
  resource: "products",
  pagination: {
    current: 1,
    pageSize: 10,
  },
  filters: [
    {
      operator: "and",
      value: [
        { field: "material", operator: "eq", value: "wooden" },
        { field: "category.id", operator: "eq", value: 45 },
      ],
    },
    {
      operator: "or",
      value: [
        { field: "price", operator: "gte", value: 1000 },
        { field: "price", operator: "lte", value: 2000 },
      ],
    },
  ],
});
```

## Relationships

Refine handles data relations with data hooks(eg: `useOne`, `useMany`, etc.). This compositional design allows you to flexibly and efficiently manage data relationships to suit your specific requirements.

### One-to-One

In a one-to-one relationship, each thing matches with just one other thing. It's like a unique partnership.

For instance, a product can have only one product detail.

<!-- prettier-ignore-start -->
```md
┌──────────────┐       ┌────────────────┐
│ Products     │       │ ProductDetail  │
│--------------│       │----------------│
│ id           │───────│ id             │
│ name         │       │ weight         │
│ price        │       │ dimensions     │
│ description  │       │ productId      │
│ detail       │       │                │
│              │       │                │
└──────────────┘       └────────────────┘
```
<!-- prettier-ignore-end -->

We can use the `useOne` hook to fetch the detail of a product.

<OneToOne />

### One-to-Many

In a one-to-many relationship, each resource matches with many other resource. It's like a parent with many children.

For instance, a products can have many reviews.

<!-- prettier-ignore-start -->

```md
┌──────────────┐       ┌────────────────┐
│ Products     │       │ Reviews        │
│--------------│       │----------------│
│ id           │───┐   │ id             │
│ name         │   │   │ rating         │
│ price        │   │   │ comment        │
│ description  │   │   │ user           │
│ detail       │   └───│ product        │
│              │       │                │
└──────────────┘       └────────────────┘
```
<!-- prettier-ignore-end -->

We can use the `useList` hook and filter by the product ID to fetch the reviews of a product.

<OneToMany />

### Many-to-Many

In a many-to-many relationship, each resource matches with many other resources, and each of those resources matches with many other resources.

For instance, products can have many categories, and categories can have many products.

<!-- prettier-ignore-start -->
```md
┌──────────────┐       ┌───────────────────┐       ┌──────────────┐
│ Products     │       │ ProductCategories │       │ Categories   │
│--------------│       │----------------───│       │--------------│
│ id           │───┐   │ id                │   ┌───│ id           │
│ name         │   └───│ productId         │   │   │ name         │
│ price        │       │ categoryId        │───┘   │ description  │
│ description  │       │                   │       │              │
│ detail       │       │                   │       │              │
│              │       │                   │       │              │
└──────────────┘       └───────────────────┘       └──────────────┘

```
<!-- prettier-ignore-end -->

In this case, we can use the `useMany` hook to fetch the categories of a product and the `useMany` hook to fetch the products of a category.

```tsx
import { DataProvider, useMany } from "@refinedev/core";

const { data: productCategories } = useList({
  resource: "productCategories",
});

const { data: products } = useMany({
  resource: "products",
  ids: productCategories.map((productCategory) => productCategory.productId),
  queryOptions: {
    enabled: productCategories.length > 0,
  },
});

const { data: categories } = useMany({
  resource: "categories",
  ids: productCategories.map((productCategory) => productCategory.categoryId),
  queryOptions: {
    enabled: productCategories.length > 0,
  },
});
```

## Authentication <GuideBadge id="guides-concepts/authentication/" />

Imagine you want to fetch a data from a protected API. To do this, you will first need to obtain your authentication token and you will need to send this token with every request.

In Refine we handle [authentication](/core/docs/guides-concepts/authentication/) with [Auth Provider](/core/docs/authentication/auth-provider/). To get token from the API, we will use the `authProvider.login` method. Then, we will use [`<Authenticated />`](/core/docs/authentication/components/authenticated) component to to render the appropriate components.

After obtaining the token, we'll use Axios interceptors to include the token in the headers of all requests.

<Authentication />

## TanStack Query `QueryClient`

To modify the [`QueryClient`](https://tanstack.com/query/v4/docs/reference/QueryClient) instance, you can use the `reactQuery` prop of the [`<Refine />`](/core/docs/core/refine-component) component.

## `dataProvider` interface

To better understand the data provider interface, we have created an example that demonstrates how the required methods are implemented. For more comprehensive and diverse examples, you can refer to the [supported data providers](#supported-data-providers) section.

> In this example, we implemented data provider to support [JSON placeholder API](https://jsonplaceholder.typicode.com/).

<DataProviderInterface />

[To learn more about the `dataProvider` interface, check out the reference page.](/core/docs/data/data-provider)

## Supported data providers

<SupportedDataProviders/>

## Data hooks

<DataHooks />

[basekey]: /core/docs/core/interface-references#basekey
[create-a-data-provider]: /core/docs/data/data-provider
[swizzle-a-data-provider]: /core/docs/packages/cli#swizzle
[data-provider-tutorial]: /core/docs/data/data-provider
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
[meta]: /core/docs/core/interface-references#metaquery
[use-login]: /core/docs/authentication/hooks/use-login
[use-register]: /core/docs/authentication/hooks/use-register
