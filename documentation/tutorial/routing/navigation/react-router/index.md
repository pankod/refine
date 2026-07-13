---
title: Navigation
---

import { Sandpack, AddLinksToHeader, AddShowAndEditButtonsToListProducts } from "./sandpack.tsx";

<Sandpack>

Now we've set up our routes and resources. In this step, we'll be learning about Refine's navigation helpers and how to use them in our app.

:::tip

You can always use the preferred methods of your routing library to navigate between pages. Refine's navigation hooks are helpers to make it easier to navigate between any action of any resource.

:::

We'll use the [`useNavigation`](/core/docs/routing/hooks/use-navigation) hook and create buttons to navigate to the create, edit and show pages of the products. Additionally we'll provide a link to the list page of the products in the `<Header />` component.

## Adding a Link to the List Page and to the Create Page

We'll be using the `useNavigation` hook from `@refinedev/core` and the `<Link />` component of the `react-router` library to create links to the list page and the create page of the products.

Let's update our `<Header />` component and add a link to the list page of the products:

```tsx title="src/components/header.tsx"
import React from "react";
// highlight-next-line
import { useLogout, useGetIdentity, useNavigation } from "@refinedev/core";

// highlight-next-line
import { Link } from "react-router";

export const Header = () => {
  const {
    mutate,
    mutation: { isPending },
  } = useLogout();
  const { data: identity } = useGetIdentity();

  // You can also use methods like list or create to trigger navigation.
  // We're using url methods to provide more semantically correct html.
  // highlight-next-line
  const { listUrl, createUrl } = useNavigation();

  return (
    <>
      <h2>
        <span>Welcome, </span>
        <span>{identity?.name ?? ""}</span>
      </h2>
      {/* highlight-start */}
      <Link to={listUrl("protected-products")}>List Products</Link>
      <Link to={createUrl("protected-products")}>Create Product</Link>
      {/* highlight-end */}
      <button type="button" disabled={isPending} onClick={mutate}>
        Logout
      </button>
    </>
  );
};
```

<AddLinksToHeader />

## Adding Show and Edit Buttons to the List Page

Similarly, we'll update the `<ListProducts />` component and add links for showing and editing the products.

```tsx title="src/pages/products/list.tsx"
// highlight-next-line
import { useTable, useMany, useNavigation } from "@refinedev/core";

// highlight-next-line
import { Link } from "react-router";

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
    resource: "protected-products",
    pagination: { currentPage: 1, pageSize: 10 },
    sorters: { initial: [{ field: "id", order: "asc" }] },
  });

  // You can also use methods like show or list to trigger navigation.
  // We're using url methods to provide more semantically correct html.
  // highlight-next-line
  const { showUrl, editUrl } = useNavigation();

  /* ... */

  return (
    <div>
      <h1>Products</h1>
      <table>
        <thead>
          <tr>
            <th onClick={() => onSort("id")}>
              ID {indicator[getSorter("id")]}
            </th>
            <th onClick={() => onSort("name")}>
              Name {indicator[getSorter("name")]}
            </th>
            <th>Category</th>
            <th onClick={() => onSort("material")}>
              Material {indicator[getSorter("material")]}
            </th>
            <th onClick={() => onSort("price")}>
              Price {indicator[getSorter("price")]}
            </th>
            {/* highlight-start */}
            <th>Actions</th>
            {/* highlight-end */}
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
              {/* highlight-start */}
              <td>
                <Link to={showUrl("protected-products", product.id)}>Show</Link>
                <Link to={editUrl("protected-products", product.id)}>Edit</Link>
              </td>
              {/* highlight-end */}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">{/* ... */}</div>
    </div>
  );
};
```

<AddShowAndEditButtonsToListProducts />

:::info

You can also use anchors and any other navigation methods provided by your routing library to move between pages, without being limited to the `useNavigation` hook.

:::

Now we've learned about the navigating between pages with Refine's `useNavigation` hook. In the next step, we'll be updating our components to benefit from the parameter inference of Refine.

</Sandpack>
