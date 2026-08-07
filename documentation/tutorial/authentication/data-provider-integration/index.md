---
title: Data Provider Integration
---

import { Sandpack, AddAuthenticationToDataProvider, AddProtectedProductsResourceToListProducts, AddOnErrorMethodToAuthProvider } from "./sandpack.tsx";

<Sandpack>

Having implemented the authentication logic, we will now integrate it with our data provider to protect our resources from unauthenticated users.

We've obtained the `token` from our API and stored it in the `localStorage` in the previous steps. Now, we'll be adding the `Authorization` header to our API requests.

We'll also be learning about the `onError` method of the auth provider to handle the authentication-related errors that are thrown by the data provider.

## Adding the `Authorization` Header

Our fake REST API has some resources that require authentication to access them. The authentication will be done by sending the `token` in the `Authorization` header.

Let's replace our data provider's `fetch` method with a custom wrapper that adds the `Authorization` header to the requests. This way, we'll be able to protect our resources from unauthenticated users and handle this step in a single place.

Update your `src/providers/data-provider.ts` file by adding the following lines:

```ts title="src/providers/data-provider.ts"
import type { DataProvider } from "@refinedev/core";

const API_URL = "https://api.fake-rest.refine.dev";

// highlight-start
const fetcher = async (url: string, options?: RequestInit) => {
  return fetch(url, {
    ...options,
    headers: {
      ...options?.headers,
      Authorization: localStorage.getItem("my_access_token"),
    },
  });
};
// highlight-end

export const dataProvider: DataProvider = {
  getList: async ({ resource, pagination, filters, sorters, meta }) => {
    const params = new URLSearchParams();

    if (pagination) { /* ... */ }

    if (sorters && sorters.length > 0) { /* ... */ }

    if (filters && filters.length > 0) { /* ... */ }

    // removed-line
    const response = await fetch(
    // added-line
    const response = await fetcher(
      `${API_URL}/${resource}?${params.toString()}`,
    );

    if (response.status < 200 || response.status > 299) throw response;

    const data = await response.json();

    const total = Number(response.headers.get("x-total-count"));

    return {
      data,
      total,
    };
  },
  getMany: async ({ resource, ids, meta }) => {
    const params = new URLSearchParams();

    if (ids) { /* ... */ }

    // removed-line
    const response = await fetch(
    // added-line
    const response = await fetcher(
      `${API_URL}/${resource}?${params.toString()}`,
    );

    if (response.status < 200 || response.status > 299) throw response;

    const data = await response.json();

    return { data };
  },
  getOne: async ({ resource, id, meta }) => {
    // removed-line
    const response = await fetch(`${API_URL}/${resource}/${id}`);
    // added-line
    const response = await fetcher(`${API_URL}/${resource}/${id}`);

    if (response.status < 200 || response.status > 299) throw response;

    const data = await response.json();

    return { data };
  },
  create: async ({ resource, variables }) => {
    // removed-line
    const response = await fetch(`${API_URL}/${resource}`, {
    // added-line
    const response = await fetcher(`${API_URL}/${resource}`, {
      method: "POST",
      body: JSON.stringify(variables),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status < 200 || response.status > 299) throw response;

    const data = await response.json();

    return { data };
  },
  update: async ({ resource, id, variables }) => {
    // removed-line
    const response = await fetch(`${API_URL}/${resource}/${id}`, {
    // added-line
    const response = await fetcher(`${API_URL}/${resource}/${id}`, {
      method: "PATCH",
      body: JSON.stringify(variables),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status < 200 || response.status > 299) throw response;

    const data = await response.json();

    return { data };
  },
  /* ... */
};
```

<AddAuthenticationToDataProvider />

## Using a Restricted Resource

Our fake REST API also has a resource called `protected-products` that is same as the `products` resource, but requires authentication to access it for demonstration purposes.

Let's switch to using `protected-resources` in our `<ListProducts />` component.

Update your `src/pages/products/list.tsx` file by adding the following lines:

```tsx title="src/pages/products/list.tsx"
import { useTable, useMany } from "@refinedev/core";

export const ListProducts = () => {
  const {
    result,
    tableQuery: { isLoading },
    currentPage,
    setCurrentPage,
    pageCount,
    sorters,
    setSorters,
  } = useTable({
    // highlight-next-line
    resource: "protected-products",
    pagination: { currentPage: 1, pageSize: 10 },
    sorters: { initial: [{ field: "id", order: "asc" }] },
  });

  const { result: categoriesResult } = useMany({
    resource: "categories",
    ids: result?.data?.map((product) => product.category?.id) ?? [],
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const onPrevious = () => {
    /* ... */
  };
  const onNext = () => {
    /* ... */
  };
  const onPage = (page: number) => {
    /* ... */
  };
  const getSorter = (field: string) => {
    /* ... */
  };
  const onSort = (field: string) => {
    /* ... */
  };

  const indicator = { asc: "⬆️", desc: "⬇️" };

  return <div>{/* ... */}</div>;
};
```

<AddProtectedProductsResourceToListProducts />

## Handling Authentication Errors

When we try to access a protected resource without authentication, our API will return a `401 Unauthorized` error. We'll be handling this error in our auth provider's `onError` method.

`onError` will be called by the Refine's data hooks automatically when an error is thrown from the data provider. This method does not need to handle all errors, only the ones related to authentication.

By using `onError` method, we'll be able to handle cases such as expired and invalid tokens and trigger a logout operation.

Let's add the `onError` method to our auth provider and handle the `401 Unauthorized` error.

Update your `src/providers/auth-provider.ts` file by adding the following lines:

```ts title="src/providers/auth-provider.ts"
import { AuthProvider } from "@refinedev/core";

export const authProvider: AuthProvider = {
  // highlight-start
  onError: async (error) => {
    if (error?.status === 401) {
      return {
        logout: true,
        error: {
          message: "Unauthorized",
          name: "Error",
          statusCode: error?.status ?? 403,
        },
      };
    }

    return {};
  },
  // highlight-end
  getIdentity: async () => {
    /* ... */
  },
  logout: async () => {
    /* ... */
  },
  login: async ({ email, password }) => {
    /* ... */
  },
  check: async () => {
    /* ... */
  },
  // ...
};
```

<AddOnErrorMethodToAuthProvider />

Finally, we'll be able to handle the `401 Unauthorized` error thrown from the data providers and trigger a logout operation.

## Summary

Now we have our authentication mechanism integrated with Refine, additional methods can be implemented in the same way and used with the respective hooks of Refine.

All of the built-in data providers of Refine have the ability to customize the client/fetcher instance. They can be used to handle authentication in the same way as we did in this tutorial without requiring a custom data provider.

In the next units, we'll start learning about the routing in Refine and how to integrate routing solutions such as React Router.

Current way of handling authentication can be refactored but the concepts will remain the same.

</Sandpack>
