---
title: Forms
---

import { Sandpack, AddCreateMethod, CreateCreateProductFile, AddUseFormToCreateProduct, AddCreateProductToAppTsx, AddPriceUpdateToCreateProduct, AddCategoryRelationToCreateProduct, MountEditProductInAppTsx, RefactorToUseFormInEditProduct } from "./sandpack.tsx";

<Sandpack>

In this step, we'll be learning about the Refine's `useForm` hook to manage forms for creating and updating records.

:::simple Implementation Tips

Refine's `useForm` has extended versions with more features and compatibility with other libraries. To learn more about the `useForm` hook, please refer to the [Forms](/core/docs/guides-concepts/forms) guide.

:::

`useForm` hook can be used for 3 different actions;

- `create`: To create a new record for a resource using the data provider's `create` method.
- `edit`: To update an existing record for a resource using the data provider's `update` method.
- `clone`: To create a new record using an existing record's data as a template using the data provider's `create` method.

In this step, we'll be covering the `create` and `edit` actions. Check out the [Clone](/core/docs/guides-concepts/forms/#clone) section of the Forms guide for information about the `clone` action.

## Implementing the `create` Method

To create a record using Refine's `useForm` and `useCreate` hooks, first we need to implement the `create` method in our data provider. This method will be called when we use the `useForm` with `create` action.

The `create` method will receive `resource`, `variables` and `meta` properties. `resource` will be the name of the entity we're creating. `variables` will be an object containing the data we're sending to the API. `meta` will be an object containing any additional data we're passing to the hook.

`products` entity of our fake API expects us to create a record using the `/products` endpoint with a `POST` request. So, we'll be using the `resource` and `variables` properties to make our request.

Update your `src/providers/data-provider.ts` file by adding the following lines:

```ts title="src/providers/data-provider.ts"
import type { DataProvider } from "@refinedev/core";

const API_URL = "https://api.fake-rest.refine.dev";

export const dataProvider: DataProvider = {
  // highlight-start
  create: async ({ resource, variables }) => {
    const response = await fetch(`${API_URL}/${resource}`, {
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
  // highlight-end
  update: async ({ resource, id, variables }) => {
    /* ... */
  },
  getList: async ({ resource, pagination, filters, sorters }) => {
    /* ... */
  },
  getOne: async ({ resource, id }) => {
    /* ... */
  },
  /* ... */
};
```

<AddCreateMethod />

## Using the `useForm` Hook

After implementing the `create` method, we'll be able to call `useForm` hook and create a single record from our API. Let's create a component called `CreateProduct` and mount it inside our `<Refine />` component. Then, we'll use the `useForm` hook inside our `CreateProduct` to create a record of `products` entity from our API.

<CreateCreateProductFile />

Now, we'll mount our `CreateProduct` component inside our `<Refine />` component. Update your `src/App.tsx` file by adding the following lines::

```tsx title="src/App.tsx"
import { Refine } from "@refinedev/core";

import { dataProvider } from "./providers/data-provider";

import { ShowProduct } from "./pages/products/show";
import { EditProduct } from "./pages/products/edit";
import { ListProducts } from "./pages/products/list";
// highlight-next-line
import { CreateProduct } from "./pages/products/create";

export default function App(): JSX.Element {
  return (
    <Refine dataProvider={dataProvider}>
      {/* <ShowProduct /> */}
      {/* <EditProduct /> */}
      {/* <ListProducts /> */}
      {/* highlight-next-line */}
      <CreateProduct />
    </Refine>
  );
}
```

<AddCreateProductToAppTsx />

We'll be using the `useForm` hook and have form fields for `name`, `description`, `price`, `material` and `category`.

Update your `src/pages/products/create.tsx` file by adding the following lines:

```tsx title="src/pages/products/create.tsx"
import { useForm } from "@refinedev/core";

export const CreateProduct = () => {
  const { onFinish, mutation } = useForm({
    action: "create",
    resource: "products",
  });

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Using FormData to get the form values and convert it to an object.
    const data = Object.fromEntries(
      new FormData(event.currentTarget).entries(),
    );
    // Calling onFinish to submit with the data we've collected from the form.
    onFinish(data);
  };

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="name">Name</label>
      <input type="text" id="name" name="name" />

      <label htmlFor="description">Description</label>
      <textarea id="description" name="description" />

      <label htmlFor="price">Price</label>
      <input type="number" id="price" name="price" step=".01" />

      <label htmlFor="material">Material</label>
      <input type="text" id="material" name="material" />

      <label htmlFor="category">Category ID</label>
      <input type="number" id="category" name="category" />

      {mutation.isSuccess && <span>successfully submitted!</span>}
      <button type="submit">Submit</button>
    </form>
  );
};
```

<AddUseFormToCreateProduct />

Now, we'll be able to create a record using our `CreateProduct` component.

## Updating Values Before Submitting

Although we're able to create a record using our `CreateProduct` component, we're not quite finished yet. We need to make sure that the values we're sending to the API are in the correct format.

Our fake API's `products` field requires us to send the `price` as a string with 2 decimal points. So, we need to make sure that the `price` value is in correct format before submitting the form. Also our `category` field requires us to send an object with the `id` property. So, we need to make sure that the `category` value is in correct format before submitting the form.

Update your `src/pages/products/create.tsx` file by adding the following lines::

```tsx title="src/pages/products/create.tsx"
import { useForm } from "@refinedev/core";

export const CreateProduct = () => {
  const { onFinish, mutation } = useForm({
    action: "create",
    resource: "products",
  });

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Using FormData to get the form values and convert it to an object.
    const data = Object.fromEntries(
      new FormData(event.currentTarget).entries(),
    );
    // Calling onFinish to submit with the data we've collected from the form.
    // highlight-start
    onFinish({
      ...data,
      price: Number(data.price).toFixed(2),
      category: { id: Number(data.category) },
    });
    // highlight-end
  };

  return <form onSubmit={onSubmit}>{/* ... */}</form>;
};
```

<AddPriceUpdateToCreateProduct />

We're now able to create a record with the `price` value properly formatted.

:::simple Implementation Tips

Modifying the values before submission is supported in all the derivatives of the `useForm` hook but the implementation may differ slightly. To learn more about their usage, please refer to the [Modifying Data Before Submission](/core/docs/guides-concepts/forms/#modifying-data-before-submission) section of the Forms guide.

:::

## Handling Relationships

Notice that we've added a `category` field to our `CreateProduct` component. This field will be used to select the category of the product we're creating.

Our fake API has the `categories` entity which we use in our `products` entity as a relationship. So, we need to make sure that we're sending the correct data to the API.

To handle this relation in our forms, Refine offers a `useSelect` hook. This hook will be used to fetch the data for the relationship and provide us options for the `<select>` element.

Update your `src/pages/products/create.tsx` file by adding the following lines to use `useSelect` and the `<select>` element:

```tsx title="src/pages/products/create.tsx"
// highlight-next-line
import { useForm, useSelect } from "@refinedev/core";

export const CreateProduct = () => {
  const { onFinish, mutation } = useForm({
    action: "create",
    resource: "products",
  });

  // highlight-start
  const { options } = useSelect({
    resource: "categories",
    // optionLabel: "title", // Default value is "title" so we don't need to provide it.
    // optionValue: "id", // Default value is "id" so we don't need to provide it.
  });
  // highlight-end

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    /* ... */
  };

  return (
    <form onSubmit={onSubmit}>
      {/* ... */}

      <label htmlFor="category">Category</label>
      {/* highlight-start */}
      <select id="category" name="category">
        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {/* highlight-end */}

      {/* ... */}
    </form>
  );
};
```

<AddCategoryRelationToCreateProduct />

And we'll finally be able to create a proper record with all the necessary fields in right format and with the correct relationships.

:::simple Relations

Refine allows you to use different types of relationships in your forms, tables or in other ways to display data. To learn more about the relationships, please refer to the [Relationships](/core/docs/guides-concepts/data-fetching/#relationships) section of the Data Fetching guide.

:::

## Refactoring `src/pages/products/edit.tsx` with `useForm`

Now we've learned how to use the `useForm` hook to create a record. Let's refactor our `EditProduct` component to use the `useForm` hook to update a record.

Let's start with mounting our `EditProduct` component inside our `<Refine />` component. Update your `src/App.tsx` file by adding the following lines:

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
      {/* highlight-next-line */}
      <EditProduct />
      {/* <ListProducts /> */}
      {/* <CreateProduct /> */}
    </Refine>
  );
}
```

<MountEditProductInAppTsx />

Now, we should be seeing our `EditProduct` component, let's import our `useForm` hook to replace both `useOne` and `useUpdate` hooks.

We'll also be re-using the elements we've used for the fields in our `<CreateProduct />` component.

:::simple Implementation Tips

`useForm` hook requires us to pass the `id` property when we're using the `edit` action.

`useForm` will fetch the record first to make sure we're able to provide default values for the fields.

In the extensions of the `useForm` hook, this is handled automatically. To learn more about the extensions, please refer to the [Forms](/core/docs/guides-concepts/forms) guide.

:::

Update your `src/pages/products/edit.tsx` file by adding the following lines:

```tsx title="src/pages/products/edit.tsx"
import { useForm, useSelect } from "@refinedev/core";

export const EditProduct = () => {
  // highlight-start
  const { onFinish, mutation, query } = useForm({
    action: "edit",
    resource: "products",
    id: "123",
  });
  // highlight-end

  // highlight-next-line
  const record = query.data?.data;

  const { options } = useSelect({
    resource: "categories",
  });

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Using FormData to get the form values and convert it to an object.
    const data = Object.fromEntries(
      new FormData(event.currentTarget).entries(),
    );
    // Calling onFinish to submit with the data we've collected from the form.
    onFinish({
      ...data,
      price: Number(data.price).toFixed(2),
      category: { id: Number(data.category) },
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="name">Name</label>
      {/* highlight-next-line */}
      <input type="text" id="name" name="name" defaultValue={record?.name} />

      <label htmlFor="description">Description</label>
      <textarea
        id="description"
        name="description"
        // highlight-next-line
        defaultValue={record?.description}
      />

      <label htmlFor="price">Price</label>
      <input
        type="text"
        id="price"
        name="price"
        pattern="\d*\.?\d*"
        // highlight-next-line
        defaultValue={record?.price}
      />

      <label htmlFor="material">Material</label>
      <input
        type="text"
        id="material"
        name="material"
        // highlight-next-line
        defaultValue={record?.material}
      />

      <label htmlFor="category">Category</label>
      <select id="category" name="category">
        {options?.map((option) => (
          <option
            key={option.value}
            value={option.value}
            // highlight-next-line
            selected={record?.category.id == option.value}
          >
            {option.label}
          </option>
        ))}
      </select>

      {mutation.isSuccess && <span>successfully submitted!</span>}
      <button type="submit">Submit</button>
    </form>
  );
};
```

<RefactorToUseFormInEditProduct />

Now we'll be able to update a record using our `EditProduct` component with `useForm` and provide all the necessary fields with the correct formats and relationships.

## Summary

Now we've learned how to use the `useForm` hook to create and update records. We've also learned how to handle relationships in our forms.

Refine's `useForm` hooks are not limited to these abilities. `useForm` hook will also handle;

- Invalidation of the related queries,
- Redirecting to a different page after submission,
- Server side validation,
- Optimistic updates for the related queries,
- Auto saving,
- Notifications and more...

To learn more about the `useForm` hook, please refer to the [Forms](/core/docs/guides-concepts/forms) guide.

In the next step, we'll be learning about the Refine's `useTable` hook and how to display a list of records in a table.

</Sandpack>
