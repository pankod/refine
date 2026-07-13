---
title: Tables
---

import { Sandpack, MountListProductsInAppTsx, RefactorToUseTableInListProducts, AddRelationHandlingToUseTableInListProducts, AddGetManyMethodToDataProvider, AddTotalToGetListMethodInDataProvider, AddPaginationToUseTableInListProducts, AddHeaderSortersToUseTableInListProducts } from "./sandpack.tsx";

<Sandpack>

In this step, we'll be learning about the Refine's `useTable` hook to manage tables in our application.

:::simple Implementation Tips

Refine's `useTable` has extended versions for UI libraries like Ant Design, Material UI and table libraries like Tanstack Table. To learn more about them, please refer to the [Tables](/core/docs/guides-concepts/tables) guide.

:::

`useTable` hook is an extended version of the `useList` hook. It internally manages the search, filters, sorters and pagination for us and also has a built-in integration with the router options to persist the state of the table in the URL.

In this step, we'll be refactoring our `<ListProducts />` component to use the `useTable` hook.

Let's start with mounting our `<ListProducts />` in our `/src/App.tsx` file:

```tsx title="src/App.tsx"
import { Refine } from "@refinedev/core";

import { dataProvider } from "./providers/data-provider";

import { ShowProduct } from "./pages/products/show";
import { EditProduct } from "./pages/products/edit";
import { ListProducts } from "./pages/products/list";
import { CreateProduct } from "./pages/products/create";

export default function App(): JSX.Element {
  return (
    <Refine dataProvider={dataProvider}>
      {/* <ShowProduct /> */}
      {/* <EditProduct /> */}
      {/* highlight-next-line */}
      <ListProducts />
      {/* <CreateProduct /> */}
    </Refine>
  );
}
```

<MountListProductsInAppTsx />

## Refactoring to use `useTable`

We'll be using the `useTable` hook in our `<ListProducts />` component and add fields `id`, `name`, `category`, `material` and `price`.

Update your `src/pages/products/list.tsx` file by adding the following lines::

```tsx title="src/pages/products/list.tsx"
// highlight-next-line
import { useTable } from "@refinedev/core";

export const ListProducts = () => {
  // highlight-start
  const {
    result,
    tableQuery: { isLoading },
  } = useTable({
    resource: "products",
    pagination: { currentPage: 1, pageSize: 10 },
    sorters: { initial: [{ field: "id", order: "asc" }] },
  });
  // highlight-end

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Products</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Material</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {/* highlight-start */}
          {result?.data?.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.category?.id}</td>
              <td>{product.material}</td>
              <td>{product.price}</td>
            </tr>
          ))}
          {/* highlight-end */}
        </tbody>
      </table>
    </div>
  );
};
```

<RefactorToUseTableInListProducts />

## Handling Relationships

Notice that we're now only displaying the `category.id` in our table. Similar to the `useSelect` hook, Refine offers `useMany` hook that we can use to fetch multiple records with their ids at once.

Let's update our code to use `useMany` hook to fetch the categories in the table and display the `category.title` instead of `category.id`:

```tsx title="src/pages/products/list.tsx"
// highlight-next-line
import { useTable, useMany } from "@refinedev/core";

export const ListProducts = () => {
  const {
    result,
    tableQuery: { isLoading },
  } = useTable({
    resource: "products",
    pagination: { currentPage: 1, pageSize: 10 },
    sorters: { initial: [{ field: "id", order: "asc" }] },
  });

  // highlight-start
  const { result: categories } = useMany({
    resource: "categories",
    ids: result?.data?.map((product) => product.category?.id) ?? [],
  });
  // highlight-end

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Products</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Material</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {result?.data?.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              {/* highlight-start */}
              <td>
                {
                  categories?.data?.find(
                    (category) => category.id == product.category?.id,
                  )?.title
                }
              </td>
              {/* highlight-end */}
              <td>{product.material}</td>
              <td>{product.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
```

<AddRelationHandlingToUseTableInListProducts />

## Adding `getMany` to the Data Provider

We're now fetching the categories in our `<ListProducts />` component. However, we're fetching them one-by-one using the `getOne` method. We can implement the `getMany` method in our data provider to fetch multiple records at once.

:::simple Implementation Tips

If `getMany` method is not implemented in the data provider, Refine will automatically fetch the records one-by-one using the `getOne` method.

:::

Our fake API supports fetching multiple records at once by passing multiple ids to the url like; `/products?id=1&id=2&id=3`. Let's add the `getMany` method to our data provider:

```tsx title="src/providers/data-provider.ts"
import type { DataProvider } from "@refinedev/core";

const API_URL = "https://api.fake-rest.refine.dev";

export const dataProvider: DataProvider = {
  // highlight-start
  getMany: async ({ resource, ids, meta }) => {
    const params = new URLSearchParams();

    if (ids) {
      ids.forEach((id) => params.append("id", id));
    }

    const response = await fetch(`${API_URL}/${resource}?${params.toString()}`);

    if (response.status < 200 || response.status > 299) throw response;

    const data = await response.json();

    return { data };
  },
  // highlight-end
  getOne: async ({ resource, id, meta }) => {
    const response = await fetch(`${API_URL}/${resource}/${id}`);

    if (response.status < 200 || response.status > 299) throw response;

    const data = await response.json();

    return { data };
  },
  create: async ({ resource, variables }) => {
    /* ... */
  },
  update: async ({ resource, id, variables }) => {
    /* ... */
  },
  getList: async ({ resource, pagination, filters, sorters, meta }) => {
    /* ... */
  },
  /* ... */
};
```

<AddGetManyMethodToDataProvider />

Now our `useMany` method will be able to fetch the categories in a single request and prevent us from bloating our network.

## Adding `total` to the Data Provider

In order to make the pagination work properly, we need to return a proper `total` value from the `getList` method in our data provider.

Our fake API sends the total number of records in the `X-Total-Count` header.

Let's update our `getList` method to return the `total` value:

```tsx title="src/providers/data-provider.ts"
import type { DataProvider } from "@refinedev/core";

const API_URL = "https://api.fake-rest.refine.dev";

export const dataProvider: DataProvider = {
  // highlight-next-line
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

    if (filters && filters.length > 0) {
      filters.forEach((filter) => {
        if ("field" in filter && filter.operator === "eq") {
          // Our fake API supports "eq" operator by simply appending the field name and value to the query string.
          params.append(filter.field, filter.value);
        }
      });
    }

    const response = await fetch(`${API_URL}/${resource}?${params.toString()}`);

    if (response.status < 200 || response.status > 299) throw response;

    const data = await response.json();

    // highlight-next-line
    const total = Number(response.headers.get("x-total-count"));

    return {
      data,
      // highlight-next-line
      total,
    };
  },
  getMany: async ({ resource, ids, meta }) => {
    /* ... */
  },
  getOne: async ({ resource, id, meta }) => {
    /* ... */
  },
  create: async ({ resource, variables }) => {
    /* ... */
  },
  update: async ({ resource, id, variables }) => {
    /* ... */
  },
  /* ... */
};
```

<AddTotalToGetListMethodInDataProvider />

## Adding Pagination to the Table

Now we're ready to add pagination to our table. By using the `total`, Refine's `useTable` will calculate the `pageCount` values for us.

We'll use the `currentPage`, `setCurrentPage` and `pageCount` values from the `useTable`'s response to implement the pagination.

Let's update our `<ListProducts />` component to display a simple pagination under the table:

```tsx title="src/pages/products/list.tsx"
import { useTable, useMany } from "@refinedev/core";

export const ListProducts = () => {
  const {
    result,
    tableQuery: { isLoading },
    // highlight-start
    currentPage,
    setCurrentPage,
    pageCount,
    // highlight-end
  } = useTable({
    resource: "products",
    pagination: { currentPage: 1, pageSize: 10 },
    sorters: { initial: [{ field: "id", order: "asc" }] },
  });

  const { result: categories } = useMany({
    resource: "categories",
    ids: result?.data?.map((product) => product.category?.id) ?? [],
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // highlight-start
  const onPrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  // highlight-end

  // highlight-start
  const onNext = () => {
    if (currentPage < pageCount) {
      setCurrentPage(currentPage + 1);
    }
  };
  // highlight-end

  // highlight-start
  const onPage = (page: number) => {
    setCurrentPage(page);
  };
  // highlight-end

  return (
    <div>
      <h1>Products</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Material</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {result?.data?.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>
                {
                  categories?.data?.find(
                    (category) => category.id == product.category?.id,
                  )?.title
                }
              </td>
              <td>{product.material}</td>
              <td>{product.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* highlight-start */}
      <div className="pagination">
        <button type="button" onClick={onPrevious}>
          {"<"}
        </button>
        <div>
          {currentPage - 1 > 0 && (
            <span onClick={() => onPage(currentPage - 1)}>
              {currentPage - 1}
            </span>
          )}
          <span className="currentPage">{currentPage}</span>
          {currentPage + 1 <= pageCount && (
            <span onClick={() => onPage(currentPage + 1)}>
              {currentPage + 1}
            </span>
          )}
        </div>
        <button type="button" onClick={onNext}>
          {">"}
        </button>
      </div>
      {/* highlight-end */}
    </div>
  );
};
```

<AddPaginationToUseTableInListProducts />

Now when we change the page, `useTable` will automatically fetch the new page and update the table.

## Adding Sorters to the Table

As the last step, we'll implement sorters in our table which will allow us to sort the table by clicking on the table headers. We'll use the `sorters` and `setSorters` values from the `useTable`'s response to implement this.

Let's update our `<ListProducts />` component to allow sorting by clicking on the table headers and display a visual indicator for the sorters:

```tsx title="src/pages/products/list.tsx"
import { useTable, useMany } from "@refinedev/core";

export const ListProducts = () => {
  const {
    result,
    tableQuery: { isLoading },
    currentPage,
    setCurrentPage,
    pageCount,
    // highlight-start
    sorters,
    setSorters,
    // highlight-end
  } = useTable({
    resource: "products",
    pagination: { currentPage: 1, pageSize: 10 },
    sorters: { initial: [{ field: "id", order: "asc" }] },
  });

  const { result: categories } = useMany({
    resource: "categories",
    ids: result?.data?.map((product) => product.category?.id) ?? [],
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const onPrevious = () => { /* ... */ };

  const onNext = () => { /* ... */ };

  const onPage = (page: number) => { /* ... */ };

  // highlight-start
  // We'll use this function to get the currentPage sorter for a field.
  const getSorter = (field: string) => {
    const sorter = sorters?.find((sorter) => sorter.field === field);

    if (sorter) {
      return sorter.order;
    }
  }
  // highlight-end

  // highlight-start
  // We'll use this function to toggle the sorters when the user clicks on the table headers.
  const onSort = (field: string) => {
    const sorter = getSorter(field);
    setSorters(
        sorter === "desc" ? [] : [
        {
            field,
            order: sorter === "asc" ? "desc" : "asc",
        },
        ]
    );
  }
  // highlight-end

  // highlight-start
  // We'll use this object to display visual indicators for the sorters.
  const indicator = { asc: "⬆️", desc: "⬇️" };
  // highlight-end

  return (
    <div>
      <h1>Products</h1>
      <table>
        <thead>
          <tr>
            {/* highlight-start */}
            <th onClick={() => onSort("id")}>
              ID {indicator[getSorter("id")]}
            </th>
            <th onClick={() => onSort("name")}>
              Name {indicator[getSorter("name")]}
            </th>
            <th>
              Category
            </th>
            <th onClick={() => onSort("material")}>
              Material {indicator[getSorter("material")]}
            </th>
            <th onClick={() => onSort("price")}>
              Price {indicator[getSorter("price")]}
            </th>
            {/* highlight-end */}
          </tr>
        </thead>
        <tbody>
          {data?.data?.map((product) => (/* ... */))}
        </tbody>
      </table>
      <div className="pagination">
        {/* ... */}
      </div>
    </div>
  );
};
```

<AddHeaderSortersToUseTableInListProducts />

## Summary

In this step, we've learned about the `useTable` hook and how to use it to manage tables in our application.

It provides many utilities to manage filters, sorters, paginations and also has a built-in integration with the router options to persist the state of the table in the URL.

Notice that the interfaces are almost identical to the `useList` hook. The only difference is that `useTable` has the implementations for wider range of use cases.

To learn more about the Tables in Refine, please refer to the [Tables](/core/docs/guides-concepts/tables) guide.

In the next steps, we'll be learning about the Authentication and Routing in Refine.

</Sandpack>
