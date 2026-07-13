---
title: Inferring Parameters
---

import { Sandpack, AddInferenceToEditProduct, AddInferenceToCreateProduct, AddInferenceToShowProduct, AddInferenceToListProducts } from "./sandpack.tsx";

<Sandpack>

Now we've learned about the `useNavigation` hook and how to handle navigation with Refine. In this step, we'll be updating components to benefit from the parameter inference of Refine.

When integrated with a router provider, Refine infers the parameters from route definitions and incorporates them into its hooks and components, eliminating the need for manual passing of `resource`, `id` and `action` parameters.

:::tip

You can always pass the parameters manually if you want to override the inferred parameters.

:::

## Updating the `ListProducts` Component

Let's update our `<ListProducts />` component and omit the `resource` parameter from the `useTable` hook.

Update your `src/pages/products/list.tsx` file by adding the following lines:

```tsx title="src/pages/products/list.tsx"
import { useTable, useMany } from "@refinedev/core";

export const ListProducts = () => {
  const {
    tableQuery: { isLoading },
    currentPage,
    setCurrentPage,
    pageCount,
    sorters,
    setSorters,
  } = useTable({
    // removed-line
    resource: "products",
    pagination: { currentPage: 1, pageSize: 10 },
    sorters: { initial: [{ field: "id", order: "asc" }] },
  });

  /* ... */
};
```

<AddInferenceToListProducts />

## Updating the `ShowProduct` Component

Let's update our `<ShowProduct />` component and omit the `resource` and `id` parameters. Remember that previously we've hard-coded the `id` parameter. Now we'll be letting Refine to infer the `id` parameter from the route definition and dynamically fetch the product.

We'll also start using [`useShow`](/core/docs/data/hooks/use-show) hook which is wrapper around `useOne`. Unlike the useOne hook, it offers inference capabilities, eliminating the need to explicitly pass `resource` and `id` parameters

Update your `src/pages/products/show.tsx` file by adding the following lines:

```tsx title="src/pages/products/show.tsx"
// highlight-next-line
import { useShow } from "@refinedev/core";

export const ShowProduct = () => {
  // removed-line
  const { isLoading } = useOne({ resource: "products", id: 123 });
  // added-line
  const { query } = useShow();

  /* ... */
};
```

<AddInferenceToShowProduct />

## Updating the `EditProduct` Component

Let's update our `<EditProduct />` component and omit the `resource`, `action` and `id` parameters from the `useForm` hook. Just like the `<ShowProduct />` component, we'll be letting Refine to infer the `id` parameter from the route definition. Since we've defined the `edit` action in our resource definition, Refine will also infer the `action` parameter as `edit`.

Update your `src/pages/products/edit.tsx` file by adding the following lines:

```tsx title="src/pages/products/edit.tsx"
import { useForm, useSelect } from "@refinedev/core";

export const EditProduct = () => {
  // removed-line
  const { onFinish, mutation, query } = useForm({
    // removed-line
    action: "edit",
    // removed-line
    resource: "products",
    // removed-line
    id: "123",
    // removed-line
  });
  // added-line
  const { onFinish, mutation, query } = useForm();

  /* ... */
};
```

<AddInferenceToEditProduct />

## Updating the `CreateProduct` Component

Let's update our `<CreateProduct />` component and omit the `resource` and `action` parameters from the `useForm` hook. Since we've defined the `create` action in our resource definition, Refine will also infer the `action` parameter as `create`.

Update your `src/pages/products/create.tsx` file by adding the following lines:

```tsx title="src/pages/products/create.tsx"
import { useForm, useSelect } from "@refinedev/core";

export const CreateProduct = () => {
  // removed-line
  const { onFinish, mutation } = useForm({
    // removed-line
    action: "create",
    // removed-line
    resource: "products",
    // removed-line
  });
  // added-line
  const { onFinish, mutation } = useForm();

  /* ... */
};
```

<AddInferenceToCreateProduct />

Now you should be able to see that our components are working as expected. We've successfully updated our components to benefit from the parameter inference of Refine.

In the next step, we'll be learning about how to handle redirects in our app.

</Sandpack>
