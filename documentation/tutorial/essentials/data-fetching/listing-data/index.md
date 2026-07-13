---
title: Listing Records
---

import { Sandpack, AddGetListMethod, CreateListProductsFile, AddUseListToListProducts, AddListProductsToAppTsx, AddPaginationToGetList, AddPaginationToListProducts, AddSortingToGetList, AddSortingToListProducts, AddFiltersToGetList, AddFiltersToListProducts } from "./sandpack.tsx";

<Sandpack>

In this step, we'll be learning about the Refine's `useList` hook to fetch a list of records from our API. We'll also learn about pagination, sorting and filtering through the `useList` hook.

## Implementing the `getList` Method

To list records using Refine's hooks, first we need to implement the [`getList`](/core/docs/data/data-provider/#getlist-) method in our data provider. This method will be called when we use the [`useList`](/core/docs/data/hooks/use-list) hook or its extensions in our components.

The `getList` method accepts `resource`, `pagination`, `sorters`, `filters` and `meta` properties.

- `resource` refers to the entity we're fetching.
- `pagination` is an object containing the `currentPage` and `pageSize` properties.
- `sorters` is an array containing the sorters we're using.
- `filters` is an array containing the filters we're using.
- `meta` is an object containing any additional data passed to the hook.

Our fake API has `products` entity and expects us to list records using the `/products` endpoint. So, we'll be using the `resource`, `pagination`, `sorters` and `filters` properties to make our request.

To make the implementation process easier, we'll start by implementing the `getList` method without pagination, sorting, or filtering, and then gradually add these features to our implementation.

Update your `src/providers/data-provider.ts` file by adding the following lines:

```ts title="src/providers/data-provider.ts"
import type { DataProvider } from "@refinedev/core";

const API_URL = "https://api.fake-rest.refine.dev";

export const dataProvider: DataProvider = {
  // highlight-start
  getList: async ({ resource, pagination, filters, sorters, meta }) => {
    const response = await fetch(`${API_URL}/${resource}`);

    if (response.status < 200 || response.status > 299) throw response;

    const data = await response.json();

    return {
      data,
      total: 0, // We'll cover this in the next steps.
    };
  },
  // highlight-end
  /* ... */
};
```

<AddGetListMethod />

## Using the `useList` Hook

After implementing the `getList` method, we'll be able to call `useList` hook and fetch a list of records from our API. Let's create a component called `ListProducts` and mount it inside our `<Refine />` component.

<CreateListProductsFile />

Then, we'll use the `useList` hook inside our `ListProducts` to fetch a list of records of `products` entity from our API.

Update your `src/pages/products/list.tsx` file by adding the following lines:

```tsx title="src/pages/products/list.tsx"
// highlight-next-line
import { useList } from "@refinedev/core";

export const ListProducts = () => {
  // highlight-start
  const { result, query } = useList({ resource: "products" });
  // highlight-end

  if (query.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {/* highlight-next-line */}
        {result.data?.map((product) => (
          <li key={product.id}>
            <p>
              {product.name}
              <br />
              Price: {product.price}
              <br />
              Material: {product.material}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};
```

<AddUseListToListProducts />

Finally, we'll mount our `ListProducts` component inside our `<Refine />` component.

Update your `src/App.tsx` file by adding the following lines:

```tsx title="src/App.tsx"
import { Refine } from "@refinedev/core";

import { dataProvider } from "./providers/data-provider";

import { ShowProduct } from "./pages/products/show";
import { EditProduct } from "./pages/products/edit";
// highlight-next-line
import { ListProducts } from "./pages/products/list";

export default function App(): JSX.Element {
  return (
    <Refine dataProvider={dataProvider}>
      {/* <ShowProduct /> */}
      {/* <EditProduct /> */}
      {/* highlight-next-line */}
      <ListProducts />
    </Refine>
  );
}
```

<AddListProductsToAppTsx />

We should be able to see the list of products on our screen now.

## Adding Pagination

At this point, we've listed all the products in our API, but we're not able to paginate the list. Let's add pagination logic to our `getList` method.

Our fake API supports pagination through the `_start` and `_end` query parameters. `_start` is the index of the first record we want to fetch and `_end` is the index of the last record we want to fetch. So, we'll be using the `pagination` property to calculate the `_start` and `_end` query parameters.

Update your `src/providers/data-provider.ts` file by adding the following lines:

```ts title="src/providers/data-provider.ts"
import type { DataProvider } from "@refinedev/core";

const API_URL = "https://api.fake-rest.refine.dev";

export const dataProvider: DataProvider = {
  getList: async ({ resource, pagination, filters, sorters, meta }) => {
    // highlight-start
    const params = new URLSearchParams();

    if (pagination) {
      params.append(
        "_start",
        (pagination.currentPage - 1) * pagination.pageSize,
      );
      params.append("_end", pagination.currentPage * pagination.pageSize);
    }

    const response = await fetch(`${API_URL}/${resource}?${params.toString()}`);
    // highlight-end

    if (response.status < 200 || response.status > 299) throw response;

    const data = await response.json();

    return {
      data,
      total: 0, // We'll cover this in the next steps.
    };
  },
  /* ... */
};
```

<AddPaginationToGetList />

Now, we'll be able to paginate the list of products. Let's add pagination to our `ListProducts` component.

Update your `src/pages/products/list.tsx` file by adding the following lines:

```tsx title="src/pages/products/list.tsx"
import { useList } from "@refinedev/core";

export const ListProducts = () => {
  const { result, query } = useList({
    resource: "products",
    // highlight-next-line
    pagination: { currentPage: 1, pageSize: 10 },
  });

  if (query.isLoading) {
    return <div>Loading...</div>;
  }

  return <div>{/* ... */}</div>;
};
```

<AddPaginationToListProducts />

We should be able to see the first 10 products on our screen now.

## Adding Sorting

We've added pagination to our `getList` method, but we're not able to sort the list. Let's add sorting logic to our `getList` method.

Our fake API supports sorting through the `_sort` and `_order` query parameters. `_sort` is the name of the field we want to sort and `_order` is the order we want to sort. So, we'll be using the `sorters` property to calculate the `_sort` and `_order` query parameters.

:::simple Implementation Details

Refine supports multiple sorters to be passed to the `useList` hook. Fortunately, our fake API also supports multiple sorters. But, if your API doesn't support multiple sorters, you can simply use the first sorter in the `sorters` array.

Our fake API requires multiple sorters and orders to be passed with a comma separated string. So, we'll be mapping the `sorters` array to a comma separated string.

:::

Update your `src/providers/data-provider.ts` file by adding the following lines:

```ts title="src/providers/data-provider.ts"
import type { DataProvider } from "@refinedev/core";

const API_URL = "https://api.fake-rest.refine.dev";

export const dataProvider: DataProvider = {
  getList: async ({ resource, pagination, filters, sorters, meta }) => {
    const params = new URLSearchParams();

    if (pagination) {
      params.append(
        "_start",
        (pagination.currentPage - 1) * pagination.pageSize,
      );
      params.append("_end", pagination.currentPage * pagination.pageSize);
    }

    // highlight-start
    if (sorters && sorters.length > 0) {
      params.append("_sort", sorters.map((sorter) => sorter.field).join(","));
      params.append("_order", sorters.map((sorter) => sorter.order).join(","));
    }
    // highlight-end

    const response = await fetch(`${API_URL}/${resource}?${params.toString()}`);

    if (response.status < 200 || response.status > 299) throw response;

    const data = await response.json();

    return {
      data,
      total: 0, // We'll cover this in the next steps.
    };
  },
  /* ... */
};
```

<AddSortingToGetList />

Now, we'll be able to sort the list of products. Let's add sorting to our `ListProducts` component.

Update your `src/pages/products/list.tsx` file by adding the following lines:

```tsx title="src/pages/products/list.tsx"
import { useList } from "@refinedev/core";

export const ListProducts = () => {
  const { result, query } = useList({
    resource: "products",
    pagination: { currentPage: 1, pageSize: 10 },
    // highlight-next-line
    sorters: [{ field: "name", order: "asc" }],
  });

  if (query.isLoading) {
    return <div>Loading...</div>;
  }

  return <div>{/* ... */}</div>;
};
```

<AddSortingToListProducts />

We should be able to see the first 10 products sorted by name on our screen now.

## Adding Filtering

We've added sorting to our `getList` method. But, we're not able to filter the list. Let's add filtering logic to our `getList` method.

`useList`'s `filters` property implements the [`CrudFilters`](/core/docs/core/interface-references/#crudfilters) interface which accepts various operators for fields. To learn more about the operators, you can check the [Filters](/core/docs/guides-concepts/data-fetching/#filters-sorters-and-pagination) section of the Data Fetching guide.

:::simple Implementation Details

- Refine supports multiple filters to be passed to the `useList` hook. Fortunately, our fake API also supports multiple filters. But, if your API doesn't support multiple filters, you can simply use the first filter in the `filters` array.

- Our fake API supports filtering with various operators but for sake of simplicity, we'll be implementing filtering through with `"eq"` operator.

- `URLSearchParams`'s `append` method accepts duplicate keys and appends them to the query string. So, we'll be mapping through the `filters` array and appending the field name and value to the query string.

- Refine also supports conditional filtering operators `"and"` and `"or"`. But, our fake API doesn't support these operators. So, we'll be ignoring these operators in our implementation.

:::

Update your `src/providers/data-provider.ts` file by adding the following lines:

```ts title="src/providers/data-provider.ts"
import type { DataProvider } from "@refinedev/core";

const API_URL = "https://api.fake-rest.refine.dev";

export const dataProvider: DataProvider = {
  getList: async ({ resource, pagination, filters, sorters, meta }) => {
    const params = new URLSearchParams();

    if (pagination) {
      params.append(
        "_start",
        (pagination.currentPage - 1) * pagination.pageSize,
      );
      params.append("_end", pagination.currentPage * pagination.pageSize);
    }

    if (sorters && sorters.length > 0) {
      params.append("_sort", sorters.map((sorter) => sorter.field).join(","));
      params.append("_order", sorters.map((sorter) => sorter.order).join(","));
    }

    // highlight-start
    if (filters && filters.length > 0) {
      filters.forEach((filter) => {
        if ("field" in filter && filter.operator === "eq") {
          // Our fake API supports "eq" operator by simply appending the field name and value to the query string.
          params.append(filter.field, filter.value);
        }
      });
    }
    // highlight-end

    const response = await fetch(`${API_URL}/${resource}?${params.toString()}`);

    if (response.status < 200 || response.status > 299) throw response;

    const data = await response.json();

    return {
      data,
      total: 0, // We'll cover this in the next steps.
    };
  },
  /* ... */
};
```

<AddFiltersToGetList />

Now, we'll be able to filter the list of products. Let's add filtering to our `ListProducts` component.

Update your `src/pages/products/list.tsx` file by adding the following lines:

```tsx title="src/pages/products/list.tsx"
import { useList } from "@refinedev/core";

export const ListProducts = () => {
  const { result, query } = useList({
    resource: "products",
    pagination: { currentPage: 1, pageSize: 10 },
    sorters: [{ field: "name", order: "asc" }],
    // highlight-next-line
    filters: [{ field: "material", operator: "eq", value: "Aluminum" }],
  });

  if (query.isLoading) {
    return <div>Loading...</div>;
  }

  return <div>{/* ... */}</div>;
};
```

<AddFiltersToListProducts />

## Summary

In this step, we've learned about the Refine's `useList` hook to fetch a list of records from our API. We've also learned about pagination, sorting and filtering through the `useList` hook.

Refine also offers `useInfiniteList` hook to fetch a list of records with infinite scrolling and `useTable` hook to fetch a list of records with additional features on top of `useList` hook. You can check the [Hooks](/core/docs/guides-concepts/data-fetching/#data-hooks) section of the Data Fetching guide and [Tables](/core/docs/guides-concepts/tables) guide to learn more about these hooks and their usages.

:::simple Implementation Tips

To see the full implementation of a REST data provider, please check the [source code of `@refinedev/simple-rest`](https://github.com/refinedev/refine/tree/main/packages/simple-rest).

:::

In the next steps, we'll learn about how to handle forms and tables with Refine.

</Sandpack>
