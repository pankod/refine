---
title: Fetching a Record
---

import { Sandpack, AddGetOneMethod, CreateShowProductFile, AddUseOneToShowProduct, AddShowProductToAppTsx } from "./sandpack.tsx";

<Sandpack>

In this step, we'll be learning about the Refine's `useOne` hook to fetch a single record from our API and implement the `getOne` method in our data provider.

## Implementing the `getOne` Method

To fetch a record using Refine's hooks, first we need to implement the [`getOne`](/core/docs/data/data-provider/#getone-) method in our data provider. This method will be called when we use the [`useOne`](/core/docs/data/hooks/use-one) hook or its extensions in our components.

The `getOne` method accepts `resource`, `id` and `meta` properties.

- `resource` refers to the entity we're fetching.
- `id` is the ID of the record we're fetching.
- `meta` is an object containing any additional data passed to the hook.

Our fake API has `products` entity and expects us to fetch a single record using the `/products/:id` endpoint. So, we'll be using the `resource` and `id` properties to make our request.

Update your `src/providers/data-provider.ts` file by adding the following lines:

```ts title="src/providers/data-provider.ts"
import type { DataProvider } from "@refinedev/core";

const API_URL = "https://api.fake-rest.refine.dev";

export const dataProvider: DataProvider = {
  // highlight-start
  getOne: async ({ resource, id, meta }) => {
    const response = await fetch(`${API_URL}/${resource}/${id}`);

    if (response.status < 200 || response.status > 299) throw response;

    const data = await response.json();

    return { data };
  },
  // highlight-end
  update: () => {
    throw new Error("Not implemented");
  },
  getList: () => {
    throw new Error("Not implemented");
  },
  /* ... */
};
```

<AddGetOneMethod />

## Using the `useOne` Hook

After implementing the `getOne` method, we'll be able to call `useOne` hook and fetch a single record from our API. Let's create a component called `ShowProduct` and mount it inside our `<Refine />` component.

<CreateShowProductFile />

Then, we'll import `useOne` hook and use it inside our `ShowProduct` component to fetch a single record of `products` entity from our API.

Update your `src/pages/products/show.tsx` file by adding the following lines:

```tsx title="src/pages/products/show.tsx"
// highlight-next-line
import { useOne } from "@refinedev/core";

export const ShowProduct = () => {
  // highlight-next-line
  const {
    result,
    query: { isLoading },
  } = useOne({ resource: "products", id: 123 });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <div>Product name: {result?.name}</div>;
};
```

<AddUseOneToShowProduct />

Finally, we'll mount the `ShowProduct` component inside our `<Refine />` component.

Update your `src/App.tsx` file by adding the following lines:

```tsx title="src/App.tsx"
import { Refine } from "@refinedev/core";

import { dataProvider } from "./providers/data-provider";
// highlight-next-line
import { ShowProduct } from "./pages/products/show";

export default function App(): JSX.Element {
  return (
    <Refine dataProvider={dataProvider}>
      {/* highlight-next-line */}
      <ShowProduct />
    </Refine>
  );
}
```

<AddShowProductToAppTsx />

Now, we should be able to see the product name on our screen.

In the next step, we'll be learning about the Refine's `useUpdate` hook to update a single record from our API and implement the `update` method in our data provider.

</Sandpack>
