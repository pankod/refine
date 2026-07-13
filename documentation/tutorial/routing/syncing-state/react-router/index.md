---
title: Syncing State with Location
---

import { Sandpack, AddLocationSyncToListProducts } from "./sandpack.tsx";

<Sandpack>

As the final step of this unit, we'll be learning how to sync the state of our tables with the location. This will allow us to share the currentPage state of the table with others. For example, we can share the URL of the table with our colleagues and they will see the same table with the same filters, sorting, and pagination.

Refine's `useTable` hook offers a `syncWithLocation` option that allows us to sync the state of the table with the location with a single line of code.

Whenever the state of the table changes (e.g. filters, sorting, pagination), the URL will be updated with the new state. And the table will be updated with the state in the URL when the page is loaded.

Let's update our `<ListProducts>` component and add the `syncWithLocation` option to the `useTable` hook.

Update your `src/pages/products/list.tsx` file by adding the following lines:

```tsx title="src/pages/products/list.tsx"
import { useTable, useMany, useNavigation } from "@refinedev/core";

export const ListProducts = () => {
  const {
    tableQuery: { isLoading },
    currentPage,
    setCurrentPage,
    pageCount,
    sorters,
    setSorters,
  } = useTable({
    pagination: { currentPage: 1, pageSize: 10 },
    sorters: { initial: [{ field: "id", order: "asc" }] },
    // highlight-next-line
    syncWithLocation: true,
  });

  /* ... */
};
```

<AddLocationSyncToListProducts />

Now, let's try to navigate to the `/products` page and change the filters, sorting, or pagination. You'll see that the URL is updated with the new state of the table. When you refresh the page, you'll see that the table is updated with the same state in the URL.

## Summary

In this unit, we've learned;

- How to use Refine's router integrations,
- How to define resources and why it's important to define them,
- Using the inferred parameters from the URL in our hooks,
- Using Refine's hooks to handle navigation between any action of any resource,
- Handling redirections from auth provider and forms,
- Syncing the state of the table with the location.

In the next unit, we'll be learning on how to use a UI framework with Refine and how Refine handles the UI framework integrations.

</Sandpack>
