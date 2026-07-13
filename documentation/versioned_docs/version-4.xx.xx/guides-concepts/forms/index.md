---
title: "Form Management Concepts | Refine v4 Guide"
display_title: "Forms"
sidebar_label: "Forms"
description: "Learn the core principles of headless form management in Refine v4. Understand how logic-first forms improve React development."
---

In almost every user facing application, forms are a necessity. They are the primary way for users to interact with your application and provide data to your backend. They are also one of the most complex parts of an application to build and maintain with many cases and features to consider. Refine's form integration aims to make this process as simple as possible while providing as many real world features as possible out of the box. This guide will cover the basics of forms in Refine and how to use them.

## Handling Data

`useForm` hook orchestrates Refine's [`useOne`](/core/docs/data/hooks/use-one), [`useUpdate`](/core/docs/data/hooks/use-update) and [`useCreate`](/core/docs/data/hooks/use-create) hooks internally to provide a single interface for form handling.

While editing or cloning a record, `useOne` will be used to fetch the record to provide values for the form. When creating a new record, `useCreate` will be used for the mutation. When updating a record, `useUpdate` will be used for the mutation.

This means that the `useForm` hook will handle all of the data fetching and mutation logic for you. All you need to do is provide the form with the correct props and it will handle the rest.

## Basic Usage

The usage of the `useForm` hooks may slightly differ between libraries, the core functionality is provided by the `@refinedev/core`'s `useForm` hook and is the same across all implementations. Refine's core has the `useForm` hook which is the foundation of all the other extensions and `useForm` implementations in the other helper libraries.

To learn more about the usage and see `useForm` in action, check out the reference pages for each library:

<Tabs smallTabs>
<TabItem value="core" label="Refine's Core">

```tsx title="edit.tsx"
import { useForm } from "@refinedev/core";

const EditPage = () => {
  const { query, formLoading, onFinish } = useForm<
    IProduct,
    HttpError,
    FormValues
  >({
    resource: "products",
    action: "edit",
    id: 123,
  });

  const record = query.data?.data;

  const onSubmit = (event) => {
    const data = Object.fromEntries(new FormData(event.target).entries());

    onFinish(data);
  };

  return (
    <form onSubmit={onSubmit}>
      <label>
        Name:
        <input defaultValue={record?.name} />
      </label>
      <label>
        Material:
        <input defaultValue={record?.material} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};
```

[Check out Core's `useForm` reference page to learn more about the usage and see it in action.](/core/docs/data/hooks/use-form/)

</TabItem>
<TabItem value="hook-form" label="React Hook Form" default>

```tsx title="edit.tsx"
import { useForm } from "@refinedev/react-hook-form";

const EditPage = () => {
  const {
    refineCore: { onFinish, formLoading, query },
    register,
    handleSubmit,
    formState: { errors },
    saveButtonProps,
  } = useForm<IProduct, HttpError, FormValues>({
    refineCoreProps: {
      resource: "products",
      action: "edit",
      id: 123,
    },
  });

  return (
    <form onSubmit={handleSubmit(onFinish)}>
      <label>
        Name:
        <input {...register("name")} />
      </label>
      <label>
        Material:
        <input {...register("material")} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};
```

[Check out React Hook Form's `useForm` reference page to learn more about the usage and see it in action.](/core/docs/packages/list-of-packages)

</TabItem>
<TabItem value="antd" label="Ant Design">

```tsx title="edit.tsx"
import { useForm, Edit } from "@refinedev/antd";
import { Form, Input } from "antd";

const EditPage = () => {
  const { formProps, saveButtonProps, query } = useForm<
    IProduct,
    HttpError,
    FormValues
  >({
    refineCoreProps: {
      resource: "products",
      action: "edit",
      id: 123,
    },
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item label="Name" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="Material" name="material">
          <Input />
        </Form.Item>
      </Form>
    </Edit>
  );
};
```

[Check out Ant Design Form's `useForm` reference page to learn more about the usage and see it in action.](/core/docs/ui-integrations/ant-design/hooks/use-form)

</TabItem>
<TabItem value="mantine" label="Mantine">

```tsx title="edit.tsx"
import { useForm, Edit } from "@refinedev/mantine";
import { TextInput } from "@mantine/core";

const EditPage = () => {
  const {
    refineCore: { onFinish, formLoading, query },
    register,
    handleSubmit,
    formState: { errors },
    saveButtonProps,
  } = useForm<IProduct, HttpError, FormValues>({
    refineCoreProps: {
      resource: "products",
      action: "edit",
      id: 123,
    },
    initialValues: {
      name: "",
      material: "",
    },
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <form>
        <TextInput
          mt={8}
          label="Name"
          placeholder="Name"
          {...getInputProps("name")}
        />
        <TextInput
          mt={8}
          label="Material"
          placeholder="Material"
          {...getInputProps("material")}
        />
      </form>
    </Edit>
  );
};
```

[Check out Mantine Form's `useForm` reference page to learn more about the usage and see it in action.](/core/docs/ui-integrations/mantine/hooks/use-form)

</TabItem>
<TabItem value="material-ui" label={(<span><span className="block">Material UI</span><small className="block">React Hook Form</small></span>)}>

```tsx title="edit.tsx"
import { HttpError } from "@refinedev/core";
import { Edit } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { Button, Box, TextField } from "@mui/material";

const EditPage = () => {
  const {
    refineCore: { onFinish, formLoading, query },
    register,
    handleSubmit,
    saveButtonProps,
  } = useForm<IProduct, HttpError, FormValues>({
    refineCoreProps: {
      resource: "products",
      action: "edit",
      id: 123,
    },
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Box component="form">
        <TextField
          {...register("name", {
            required: "This field is required",
          })}
          name="name"
          label="Name"
        />
        <TextField
          {...register("material", {
            required: "This field is required",
          })}
          name="material"
          label="Material"
        />
      </Box>
    </Edit>
  );
};
```

[Check out React Hook Form's `useForm` reference page to learn more about the usage and see it in action.](/core/docs/packages/list-of-packages)

</TabItem>
<TabItem value="chakra-ui" label={(<span><span className="block">Chakra UI</span><small className="block">React Hook Form</small></span>)}>

```tsx title="edit.tsx"
import { HttpError } from "@refinedev/core";
import { Edit } from "@refinedev/chakra-ui";
import { useForm } from "@refinedev/react-hook-form";
import { FormControl, FormLabel, Input, Button } from "@chakra-ui/react";

const EditPage = () => {
  const {
    refineCore: { onFinish, formLoading, query },
    register,
    handleSubmit,
    saveButtonProps,
  } = useForm<IProduct, HttpError, FormValues>({
    refineCoreProps: {
      resource: "products",
      action: "edit",
      id: 123,
    },
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <form>
        <FormControl mb="3">
          <FormLabel>Name</FormLabel>
          <Input
            id="name"
            type="text"
            {...register("name", { required: "Name is required" })}
          />
        </FormControl>
        <FormControl mb="3">
          <FormLabel>Material</FormLabel>
          <Input
            id="material"
            type="text"
            {...register("material", {
              required: "Material is required",
            })}
          />
        </FormControl>
      </form>
    </Edit>
  );
};
```

[Check out React Hook Form's `useForm` reference page to learn more about the usage and see it in action.](/core/docs/packages/list-of-packages)

</TabItem>
</Tabs>

## Integration with Routers

If a router integration is made, in most of the cases this enables Refine to infer the `resource`, `action` and `id` from the current route and provide them to `useForm` hook. In most of the cases, this will prevent the need of passing explicit `resource`, `action` and `id` props to the hooks including `useForm`.

```tsx
import { useForm } from "@refinedev/core";

useForm({
  // These properties will be inferred from the current route
  // removed-start
  resource: "posts",
  action: "edit",
  id: 1,
  // removed-end
});
```

To learn more about the routing, check out the [Routing](/guides-concepts/routing/index#router-integrations) guide and the [General Concepts](/guides-concepts/general-concepts/index#router-provider) guide to learn more about how it benefits the development experience.

### Redirection

`useForm` also uses the router integration to redirect the user to the desired page after a successful mutation. By default, it's the list page of the resource but this can be customized by passing a `redirect` prop to the `useForm` hook. If you want to change the redirection behavior for all forms, you can use the `options.redirect` prop of the [`<Refine>` component](/core/docs/core/refine-component).

```tsx
import { useForm } from "@refinedev/core";

useForm({
  redirect: "show", // Can also be "list", "edit" or false
});
```

### Unsaved Changes <GuideBadge id="guides-concepts/routing/#useform" /> <GlobalConfigBadge id="core/refine-component/#warnwhenunsavedchanges" />

Refine's `useForm` hooks have a built-in feature to prevent the user from losing the unsaved changes via a confirmation dialog when changing the route/leaving the page. To enable this feature, you need to use the [`<UnsavedChangesNotifier />`](/core/docs/guides-concepts/routing/#useform) components from the router package of the library you are using and set the `warnWhenUnsavedChanges` prop to `true`.

```tsx
import { Refine, useForm } from "@refinedev/core";

useForm({
  warnWhenUnsavedChanges: true,
});
```

#### **Usage of `<UnsavedChangesNotifier />`**

<Tabs wrapContent={false}>
<TabItem value="react-router" label="React Router">

```tsx title="app.tsx"
import { Refine } from "@refinedev/core";
import {
  routerProvider,
  UnsavedChangesNotifier,
} from "@refinedev/react-router";
import { BrowserRouter, Routes } from "react-router";

const App = () => (
  <BrowserRouter>
    <Refine
      // ...
      routerProvider={routerProvider}
      options={{
        // highlight-next-line
        warnWhenUnsavedChanges: true,
      }}
    >
      <Routes>{/* ... */}</Routes>
      {/* highlight-start */}
      {/* The `UnsavedChangesNotifier` component should be placed under <Refine /> component. */}
      <UnsavedChangesNotifier />
      {/* highlight-end */}
    </Refine>
  </BrowserRouter>
);
```

Check out the [`UnsavedChangesNotifier` section of the React Router integration documentation](/core/docs/packages/list-of-packages#unsavedchangesnotifier) for more information.

</TabItem>
<TabItem value="next-js" label="Next.js">

```tsx title="_app.tsx"
import type { AppProps } from "next/app";
import { Refine } from "@refinedev/core";
import {
  routerProvider,
  UnsavedChangesNotifier,
} from "@refinedev/nextjs-router/pages";

export default function App({ Component, pageProps }) {
  return (
    <Refine
      // ...
      routerProvider={routerProvider}
      options={{
        // highlight-next-line
        warnWhenUnsavedChanges: true,
      }}
    >
      <Component {...pageProps} />
      {/* highlight-start */}
      {/* The `UnsavedChangesNotifier` component should be placed under <Refine /> component. */}
      <UnsavedChangesNotifier />
      {/* highlight-end */}
    </Refine>
  );
}
```

Check out the [`UnsavedChangesNotifier` section of the React Router integration documentation](/core/docs/packages/list-of-packages#unsavedchangesnotifier) for more information.

</TabItem>
<TabItem value="remix" label="Remix">

```tsx title="app/root.tsx"
import type { MetaFunction } from "@remix-run/node";

import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import { Refine } from "@refinedev/core";

// highlight-next-line
import routerProvider, {
  UnsavedChangesNotifier,
} from "@refinedev/remix-router";

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Refine
          // ...
          routerProvider={routerProvider}
          options={{
            // highlight-next-line
            warnWhenUnsavedChanges: true,
          }}
        >
          <Outlet />
          {/* highlight-next-line */}
          <UnsavedChangesNotifier />
        </Refine>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
```

Check out the [`UnsavedChangesNotifier` section of the React Router integration documentation](/core/docs/packages/list-of-packages#unsavedchangesnotifier) for more information.

</TabItem>
</Tabs>

## Actions <RouterBadge />

In `useForm`, you'll have 3 action modes to choose from:

### Create

This is the default action mode and is used for creating a new record for the resource.

### Edit

Used for editing an existing record. This action mode requires an `id` prop to be passed to the form.

### Clone

Used for cloning an existing record. This action mode requires an `id` prop to be passed to the form. The record with the given `id` will be fetched and the values will be used as the initial values for the form fields and the mutation will be performed to create a new record.

## Relationships <GuideBadge id="guides-concepts/data-fetching/#relationships" />

Refine handles [data relations](/core/docs/guides-concepts/data-fetching/#relationships) with data hooks(eg: `useOne`, `useMany`, etc.). This compositional design allows you to easily display other resources' data in your components.

However, when it comes to forms, we may want to add fields that are related to other resources. For instance, you may want to add a `category` field to the `products` resource. This field will be a select input that will display the categories fetched from the `categories` resource. Refine offers [`useSelect`](/core/docs/data/hooks/use-select) hook to easily manage select (like a [Html `<select>` tag](https://www.w3schools.com/tags/tag_select.asp), [React Select](https://react-select.com/home), etc.) components.

You can find more information and usage examples on following `useSelect` documentation pages:

- [Headless](/core/docs/data/hooks/use-select)
- [Ant Design Select](/core/docs/ui-integrations/ant-design/hooks/use-select/)
- [Material UI Autocomplete](/core/docs/ui-integrations/material-ui/hooks/use-auto-complete/)
- [Mantine Select](/core/docs/ui-integrations/mantine/hooks/use-select/)

In the following example, we will add a `category` field to the `products` resource. This field will be a select input populated with categories using the `useSelect` hook.

<Tabs wrapContent={false}>
<TabItem value="headless" label="Headless">

import UseSelectHeadless from "./use-select-headless";

<UseSelectHeadless />

</TabItem>

<TabItem  value="antd" label="Ant Design">

import UseSelectAntd from "./use-select-antd";

<UseSelectAntd />

</TabItem>

<TabItem value="material-ui" label="Material UI">

import UseSelectMaterialUI from "./use-select-material-ui";

<UseSelectMaterialUI />

</TabItem>

<TabItem value="mantine" label="Mantine">

import UseSelectMantine from "./use-select-mantine";

<UseSelectMantine />

</TabItem>

</Tabs>

## Mutation Modes <GlobalConfigBadge id="core/refine-component/#mutationmode" />

`useForm` provides 3 mutation modes to choose from, you may need each of them in different scenarios throughout your application.

```tsx
useForm({
  mutationMode: "optimistic", // Can be "pessimistic", "optimistic" and "undoable". Default is "pessimistic"
});
```

### Pessimistic

This is the default mode and is the most common mode. In this mode, the mutation will be performed immediately and the form will be toggle the loading state until the mutation is completed.

If the mutation fails, the error will be displayed to the user with no further action such as invalidating the cache and redirection after the mutation.

### Optimistic

In this mode, the mutation will be performed immediately and simultaneously it will be treated as if it has succeeded. The user will be shown a success notification and the existing query cache will be optimistically updated with the provided form values for the list, many and detail queries.

If not specified the opposite, it will do the redirection to the desired page. If the mutation succeeds, the query cache will be invalidated and the active queries will trigger a refetch.

If the mutation fails, the optimistic updates will be reverted and the error will be displayed to the user.

### Undoable

In this mode, the mutation will be delayed for the specified amount of time but simultaneously will be treated as if it has succeeded. Identical to the `optimistic` mode, the existing query cache will be updated accordingly and the user will be shown a notification with a countdown.

Unless it is ordered to "undo" the action by the user, the mutation will be performed after the countdown. If the mutation succeeds, the query cache will be invalidated and the active queries will trigger a refetch.

If the mutation fails, the optimistic updates will be reverted and the error will be displayed to the user.

## Invalidation <GuideBadge id="guides-concepts/general-concepts#caching" description="To learn more about caching, refer to General Concepts guide" />

All the queries made by Refine's data hooks and their derivatives are cached for a certain amount of time. This means that if you perform a query for a resource, the result will be cached and the next time you perform the same query, the results will be returned immediately from the cache and then if the data is considered stale, the query will be refetched in the background.

When you perform a mutation, the query cache will be invalidated by default after a successful mutation. This means that if you perform a mutation that affects the data of a query, the query will be refetched in the background and the UI will be updated accordingly.

### Default Behavior

By default, `useForm` will invalidate the following queries after a successful mutation:

For `create` and `clone` actions; `list` and `many` queries for the resource. This means all the related queries made by `useList`, `useSelect`, `useMany`, `useTable` etc. will be invalidated.

For `edit` action; in addition to the queries invalidated in `create` and `clone` modes, `detail` query for the resource will be invalidated. This means all the related queries made by `useOne`, `useShow` etc. will be invalidated.

### Custom Invalidation

In some cases, you may want to change the default invalidation behavior such as to invalidate all the resource or skipping the `list` queries etc. To do that, you can use the `invalidates` prop of the `useForm` to determine which query sets should be invalidated after a successful mutation.

```tsx
const { formProps } = useForm({
  resource: "posts",
  action: "edit",
  id: 1,
  // highlight-next-line
  invalidates: ["many", "detail"], // default is ["list", "many", "detail"]
});
```

If you want to disable the invalidation completely and handle it manually, you can pass `false` to the `invalidates` prop. Then, you can use the [`useInvalidate`](/core/docs/data/hooks/use-invalidate) hook to invalidate the queries manually based on your conditions.

```tsx
import { useInvalidate } from "@refinedev/core";

const invalidate = useInvalidate();

useForm({
  resource: "categories",
  action: "edit",
  id: 1,
  // highlight-start
  invalidates: false,
  onMutationSuccess() {
    invalidate({
      resource: "posts",
      invalidates: ["resourceAll"],
    });
  },
  // highlight-end
});
```

## Optimistic Updates

In many cases, you may want to update the query cache optimistically after a mutation before the mutation is completed. This is especially comes in handy when managing the waiting experience of the user. For example, if you are updating a record, you may want to update the query cache with the new values to show the user that the record is updated immediately and then revert the changes if the mutation fails.

:::note

Optimistic updates are only available in `optimistic` and `undoable` mutation modes.

:::

### Default Behavior

By default, Refine's mutations will use the provided form data/values to update the existing records in the query cache. This update process includes the `list`, `many` and `detail` queries related to the record and the resource.

### Custom Optimistic Updates

In some cases such as the data being submitted is slightly different from the data being fetched in the structural level, you may want to customize the optimistic updates. To do that, you can use the `optimisticUpdateMap` prop of the `useForm` to determine how the query cache will be updated for each query set.

`optimisticUpdateMap` prop also lets you disable the optimistic updates for a specific query set by passing `false` to the corresponding key.

```tsx
useForm({
  resource: "posts",
  id: 1,
  mutationMode: "optimistic",
  optimisticUpdateMap: {
    list: (
      previous, // Previous query data
      variables, // Variables used in the query
      id, // Record id
    ) => {
      // update the `previous` data using the `variables` and `id`, then return it
    },
    many: (
      previous, // Previous query data
      variables, // Variables used in the query
      id, // Record id
    ) => {
      // update the `previous` data using the `variables` and `id`, then return it
    },
    detail: (
      previous, // Previous query data
      variables, // Variables used in the query
    ) => {
      // update the `previous` data using the `variables`, then return it
    },
  },
});
```

## Server Side Validation <GlobalConfigBadge id="core/refine-component/#disableserversidevalidation" />

Server-side form validation is a technique used to validate form data on the server before processing it. Unlike client-side validation, which is performed in the user's browser using JavaScript, server-side validation occurs on the server-side code, typically in the backend of the application.

Refine supports server-side validation out-of-the-box in all `useForm` derivatives. To handle server-side validation, the data providers needs to be correctly set up to return the errors in form submissions with a specific format. After this, Refine's `useForm` will propagate the errors to the respective form fields.

```ts
import { HttpError } from "@refinedev/core";

const error: HttpError = {
  message: "An error occurred while updating the record.",
  statusCode: 400,
  // the errors field is required for server-side validation.
  // when the errors field is set, useForm will automatically display the error messages in the form with the corresponding fields.
  errors: {
    title: ["Title is required"],
    content: {
      key: "form.error.content",
      message: "Content is required.",
    },
    tags: true,
  },
};
```

[Check out `HttpError` interface for more information about the error format.](/core/docs/core/interface-references#httperror)

Examples below demonstrates the server-side validation and error propagation:

<Tabs smallTabs wrapContent={false}>
<TabItem value="core" label="Refine's Core">

import ServerSideValidationCore from "./server-side-validation-core.tsx";

<ServerSideValidationCore />

</TabItem>
<TabItem value="hook-form" label="React Hook Form">

import ServerSideValidationReactHookForm from "./server-side-validation-react-hook-form.tsx";

<ServerSideValidationReactHookForm />

</TabItem>
<TabItem default value="antd" label="Ant Design">

import ServerSideValidationAntd from "./server-side-validation-antd.tsx";

<ServerSideValidationAntd />

</TabItem>
<TabItem value="mantine" label="Mantine">

import ServerSideValidationMantine from "./server-side-validation-mantine.tsx";

<ServerSideValidationMantine />

</TabItem>
<TabItem value="material-ui" label={(<span><span className="block">Material UI</span><small className="block">React Hook Form</small></span>)}>

import ServerSideValidationMui from "./server-side-validation-mui.tsx";

<ServerSideValidationMui />

</TabItem>
<TabItem value="chakra-ui" label={(<span><span className="block">Chakra UI</span><small className="block">React Hook Form</small></span>)}>

import ServerSideValidationChakraUi from "./server-side-validation-chakra-ui.tsx";

<ServerSideValidationChakraUi />

</TabItem>
</Tabs>

## Notifications <GuideBadge id="notification/notification-provider" />

When forms are submitted, it is a good practice to notify the user about the result of the submission. `useForm` handles this for you, when the mutation succeeds or fails it will show a notification to the user with a proper message. This behavior can be customized or disabled using the `successNotification` and `errorNotification` props.

These props accepts both a function that returns the configuration or a static configuration, this means you'll be able to use the response of the mutation to customize the notification message.

```tsx title="Default Notification Values"
useForm({
  // If not passed explicitly, these default values will be used. Default values can also be customized via i18n.
  successNotification: (data, values, resource) => {
    return {
      description: translate("notifications.success", "Successful"),
      message: translate(
        "notifications.(edit|create)Success",
        "Successfully (updated|created) {resource}",
      ),
      type: "success",
    };
  },
  // If not passed explicitly, these default values will be used. Default values can also be customized via i18n.
  errorNotification: (error, values, resource) => {
    return {
      description: error.message,
      message: translate(
        "notifications.(edit|create)Error",
        "Error when (updating|creating) {resource} (status code: {error.statusCode})",
      ),
      type: "error",
    };
  },
});
```

## Auto Save

In many forms, it is a good practice to save the form data automatically as the user types to avoid losing the data in case of an unexpected event. This is especially useful in long forms where the user may spend a lot of time filling the form. `useForm` is packed with this feature out-of-the-box.

While `@refinedev/core`'s `useForm` packs this feature, the auto save is not triggered automatically. In the extensions of the `useForm` hook in the other libraries, the auto save is handled internally and is triggered automatically.

```tsx title="edit.tsx"
import { useForm } from "@refinedev/core";

const { autoSaveProps } = useForm({
  autoSave: {
    enabled: true, // Enables the auto save feature, defaults to false
    debounce: 2000, // Debounce interval to trigger the auto save, defaults to 1000
    invalidateOnUnmount: true, // Invalidates the queries when the form is unmounted, defaults to false
  },
});
```

### `<AutoSaveIndicator />`

Refine's core and ui integrations are shipped with an [`<AutoSaveIndicator />`](/core/docs/core/components/auto-save-indicator) component that can be used to show a visual indicator to the user when the auto save is triggered. The `autoSaveProps` value from the `useForm`'s return value can be passed to the `<AutoSaveIndicator />` to show the auto save status to the user. It will automatically show the loading, success and error states to the user.

```tsx title="edit.tsx"
import { AutoSaveIndicator } from "@refinedev/core";

const { autoSaveProps } = useForm({
  resource: "posts",
  action: "edit",
  id: 1,
  autoSave: {
    enabled: true,
  },
});

return (
  <form>
    {/* ... */}
    <AutoSaveIndicator {...autoSaveProps} />
  </form>
);
```

## Modifying Data Before Submission

In some cases, you might want to change the data before submitting it to the backend. For example, you might want to add a `full_name` field to the form data of a user resource by combining the `first_name` and `last_name` fields. While the `useForm` from the `@refinedev/core` has the natural support for this, the `useForm` derivatives from the other libraries of Refine has a different approach.

Each of these form implementations have a way to modify the data before submission with a slightly different approach. To learn more about how to modify the data before submission, check out the usage examples of each library:

<Tabs>
<TabItem value="react-hook-form" label="React Hook Form" default>

To learn more about how to modify the data before submission, check out the [Using `useForm` of `@refinedev/react-hook-form`](/core/docs/packages/list-of-packages##how-can-i-change-the-form-data-before-submitting-it-to-the-api) reference page.

<Tabs>
<TabItem value="headless" label="Headless">

```tsx title="edit.tsx"
import { useForm } from "@refinedev/react-hook-form";
import { FieldValues } from "react-hook-form";

const EditPage = () => {
  const {
    refineCore: { onFinish },
    register,
    handleSubmit,
  } = useForm();

  // highlight-start
  const onFinishHandler = (data: FieldValues) => {
    onFinish({
      fullName: `${data.name} ${data.surname}`,
    });
  };
  // highlight-end

  return (
    // highlight-next-line
    <form onSubmit={handleSubmit(onFinishHandler)}>
      <label>
        Name:
        <input {...register("name")} />
      </label>
      <label>
        Surname:
        <input {...register("surname")} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};
```

</TabItem>
<TabItem value="material-ui" label="With Material UI">

```tsx title="edit.tsx"
import { HttpError } from "@refinedev/core";
import { Create } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { Button, Box, TextField } from "@mui/material";

type FormValues = {
  name: string;
  surname: string;
};

export const UserCreate: React.FC = () => {
  const {
    saveButtonProps,
    refineCore: { onFinish },
    handleSubmit,
  } = useForm<FormValues, HttpError, FormValues>();

  const handleSubmitPostCreate = (values: FormValues) => {
    const { name, surname } = values;
    const fullName = `${name} ${surname}`;
    onFinish({
      ...value,
      fullName,
    });
  };

  return (
    <Create
      saveButtonProps={{
        ...saveButtonProps,
        onClick: handleSubmit(handleSubmitForm),
      }}
    >
      <Box component="form">
        <TextField
          {...register("name", {
            required: "This field is required",
          })}
          name="name"
          label="Name"
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        <TextField
          {...register("surname", {
            required: "This field is required",
          })}
          name="surname"
          label="Surname"
          error={!!errors.surname}
          helperText={errors.surname?.message}
        />
      </Box>
    </Create>
  );
};
```

Check out the [`<Create />`](/core/docs/ui-integrations/material-ui/components/basic-views/create#savebuttonprops) component and [`saveButtonProps`](/core/docs/packages/list-of-packages#savebuttonprops) prop to learn more about their usage.

</TabItem>
<TabItem value="chakra-ui" label="With Chakra UI">

```tsx title="edit.tsx"
import { HttpError } from "@refinedev/core";
import { Create } from "@refinedev/chakra-ui";
import { useForm } from "@refinedev/react-hook-form";
import { FormControl, FormLabel, Input, Button } from "@chakra-ui/react";

type FormValues = {
  name: string;
  surname: string;
};

export const UserCreate: React.FC = () => {
  const {
    saveButtonProps,
    refineCore: { onFinish },
    handleSubmit,
  } = useForm<FormValues, HttpError, FormValues>();

  const handleSubmitPostCreate = (values: FormValues) => {
    const { name, surname } = values;
    const fullName = `${name} ${surname}`;
    onFinish({
      ...value,
      fullName,
    });
  };

  return (
    <Create
      saveButtonProps={{
        ...saveButtonProps,
        onClick: handleSubmit(handleSubmitForm),
      }}
    >
      <form>
        <FormControl mb="3">
          <FormLabel>Name</FormLabel>
          <Input
            id="name"
            type="text"
            {...register("name", { required: "Name is required" })}
          />
        </FormControl>
        <FormControl mb="3">
          <FormLabel>Surname</FormLabel>
          <Input
            id="surname"
            type="text"
            {...register("surname", {
              required: "Surname is required",
            })}
          />
        </FormControl>
      </form>
    </Create>
  );
};
```

Check out the [`<Create />`](/core/docs/ui-integrations/chakra-ui/components/basic-views/create#savebuttonprops) component and [`saveButtonProps`](/core/docs/packages/list-of-packages#savebuttonprops) prop to learn more about their usage.

</TabItem>
</Tabs>

</TabItem>
<TabItem value="antd" label="Ant Design">

To learn more about how to modify the data before submission, check out the [Using `useForm` of `@refinedev/antd`](/core/docs/ui-integrations/ant-design/hooks/use-form#how-can-i-change-the-form-data-before-submitting-it-to-the-api) reference page.

```tsx title="edit.tsx"
import { useForm, Create } from "@refinedev/antd";
import { Form, Input } from "antd";

const EditPage = () => {
  const { formProps, saveButtonProps, onFinish } = useForm();

  // highlight-start
  const handleOnFinish = (values) => {
    onFinish({
      fullName: `${values.name} ${values.surname}`,
    });
  };
  // highlight-end

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} onFinish={handleOnFinish} layout="vertical">
        <Form.Item label="Name" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="Surname" name="surname">
          <Input />
        </Form.Item>
      </Form>
    </Create>
  );
};
```

</TabItem>
<TabItem value="mantine" label="Mantine">

To learn more about how to modify the data before submission, check out the [Using `useForm` of `@refinedev/mantine`](/core/docs/ui-integrations/mantine/hooks/use-form#how-can-i-change-the-form-data-before-submitting-it-to-the-api) reference page.

```tsx title="edit.tsx"
import { useForm, Create } from "@refinedev/mantine";
import { TextInput } from "@mantine/core";

const CreatePage = () => {
  const { saveButtonProps, getInputProps } = useForm({
    initialValues: {
      name: "",
      surname: "",
    },
    // highlight-start
    transformValues: (values) => ({
      fullName: `${values.name} ${values.surname}`,
    }),
    // highlight-end
  });

  return (
    <Create saveButtonProps={saveButtonProps}>
      <form>
        <TextInput
          mt={8}
          label="Name"
          placeholder="Name"
          {...getInputProps("name")}
        />
        <TextInput
          mt={8}
          label="Surname"
          placeholder="Surname"
          {...getInputProps("surname")}
        />
      </form>
    </Create>
  );
};
```

</TabItem>
</Tabs>

## Save and Continue

In many cases, you may want to redirect the user to the edit page of the record after creating it. This is especially useful in cases where the user needs to fill a long form and you don't want to lose the data in case of an unexpected event.

In the example below, we'll create multiple options for the user to choose from after creating a record. The user will be able to choose between redirecting to the list page, edit page or staying in the create page in order to continue creating records.

import SaveAndContinue from "./save-and-continue";

<SaveAndContinue />
