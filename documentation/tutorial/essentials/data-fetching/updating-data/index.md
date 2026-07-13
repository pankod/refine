---
title: Updating a Record
---

import { Sandpack, AddUpdateMethod, CreateEditProductFile, AddUseUpdateToEditProduct, AddEditProductToAppTsx } from "./sandpack.tsx";

<Sandpack>

In this step, we'll be learning about the Refine's `useUpdate` hook to update a record from our API and implement the `update` method in our data provider.

## Implementing the `update` Method

To update a record using Refine's hooks, first we need to implement the [`update`](/core/docs/data/data-provider/#update-) method in our data provider. This method will be called when we use the [`useUpdate`](/core/docs/data/hooks/use-update) hook or its extensions in our components.

The `update` method accepts `resource`, `id`, `variables` and `meta` properties.

- `resource` refers to the entity we're updating
- `id` is the ID of the record we're updating
- `variables` is an object containing the data we're sending to the API.
- `meta` is an object containing any additional data passed to the hook.

`products` entity of our fake API expects us to update a record using the `/products/:id` endpoint with a `PATCH` request. So, we'll be using the `resource`, `id` and `variables` properties to make our request.

Update your `src/providers/data-provider.ts` file by adding the following lines:

```ts title="src/providers/data-provider.ts"
import type { DataProvider } from "@refinedev/core";

const API_URL = "https://api.fake-rest.refine.dev";

export const dataProvider: DataProvider = {
  getOne: async ({ resource, id, meta }) => {
    const response = await fetch(`${API_URL}/${resource}/${id}`);

    if (response.status < 200 || response.status > 299) throw response;

    const data = await response.json();

    return { data };
  },
  // highlight-start
  update: async ({ resource, id, variables }) => {
    const response = await fetch(`${API_URL}/${resource}/${id}`, {
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
  // highlight-end
  getList: () => {
    throw new Error("Not implemented");
  },
  /* ... */
};
```

<AddUpdateMethod />

## Using the `useUpdate` Hook

After implementing the `update` method, we'll be able to call `useUpdate` hook and update a single record from our API. Let's create a component called `EditProduct` and mount it inside our `<Refine />` component.

<CreateEditProductFile />

Initially, we'll include a `useOne` hook call in our `EditProduct` component to fetch the record we want to update.

Then, we'll use the `useUpdate` hook inside our `EditProduct` to update a single record of `products` entity from our API.

Update your `src/pages/products/edit.tsx` file by adding the following lines:

```tsx title="src/pages/products/edit.tsx"
// highlight-next-line
import { useOne, useUpdate } from "@refinedev/core";

export const EditProduct = () => {
  const {
    result,
    query: { isLoading },
  } = useOne({ resource: "products", id: 123 });
  // highlight-next-line
  const {
    mutate,
    mutation: { isPending: isUpdating },
  } = useUpdate();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const updatePrice = async () => {
    // highlight-start
    await mutate({
      resource: "products",
      id: 123,
      values: {
        price: Math.floor(Math.random() * 100),
      },
    });
    // highlight-end
  };

  return (
    <div>
      <div>Product name: {result?.name}</div>
      <div>Product price: ${result?.price}</div>
      <button onClick={updatePrice}>Update Price</button>
    </div>
  );
};
```

<AddUseUpdateToEditProduct />

Finally, we'll mount our `EditProduct` component inside our `<Refine />` component.

Update your `src/App.tsx` file by adding the following lines:

```tsx title="src/App.tsx"
import { Refine } from "@refinedev/core";

import { dataProvider } from "./providers/data-provider";

import { ShowProduct } from "./pages/products/show";
// highlight-next-line
import { EditProduct } from "./pages/products/edit";

export default function App(): JSX.Element {
  return (
    <Refine dataProvider={dataProvider}>
      {/* <ShowProduct /> */}
      {/* highlight-next-line */}
      <EditProduct />
    </Refine>
  );
}
```

<AddEditProductToAppTsx />

Now, we should be able to view both the product name and price on our screen. Once we click the `Update Price` button, the product's price will be updated.

:::tip Smart Invalidations

Notice that when we update the price using `useUpdate`, the `useOne` hook we called before is automatically invalidated. This is because Refine will invalidate all the queries that are using the same resource and id when we update a record. This will ensure that we'll always see the latest data on our screen and we won't need to manually invalidate the queries.

:::

In the next step, we'll be learning about the Refine's `useList` hook to fetch a list of records from our API and implement the `getList` method in our data provider.

</Sandpack>
