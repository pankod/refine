---
title: "useForm Hook | Best Practices for Usage & Patterns | Refine v5"
display_title: "useForm"
sidebar_label: "useForm"
description: "Set up Use Form in Refine v5. Learn best practices. Explore best practices to scale mutation and function for custom APIs and scalable data flows."
source: packages/core/src/hooks/form/useForm.ts
---

import BasicUsage from "./basic-usage";

A hook that orchestrates Refine's data hooks to create, edit, and clone data. It also provides a set of features to make it easier for users to implement their real world needs and handle edge cases such as redirects, invalidation, auto-save and more.

```tsx
import { useForm } from "@refinedev/core";

const { onFinish, ... } = useForm({ ... });
```

:::simple Extended Versions

`@refinedev/antd`, `@refinedev/mantine` and `@refinedev/react-hook-form` packages provide their own extended versions of `useForm` hook with full support for their respective form implementations including validation, error handling, form values, and more.

Refer to their respective documentation for more information and check out the [Forms in Refine](/core/docs/guides-concepts/forms/) guide for detailed information on how to handle forms in Refine.

- [`@refinedev/antd`'s `useForm`](/core/docs/ui-integrations/ant-design/hooks/use-form/)
- [`@refinedev/mantine`'s `useForm`](/core/docs/ui-integrations/mantine/hooks/use-form/)
- [`@refinedev/react-hook-form`'s `useForm`](/core/docs/packages/list-of-packages/)

:::

## Usage

Basic usage of the `useForm` hook demonstrates how to use the hook in all three modes, `create`, `edit`, and `clone`.

<BasicUsage />

## Parameters

### action <RouterBadge />

The action that will be performed with the submission of the form. Can be `create`, `edit`, or `clone`. If not specified, it will be determined by the current route or fallback to `create`.

```tsx
useForm({ action: "create" });
```

#### Create

In `create` action, `useForm` will follow the flow below:

After form is submitted:

1. `useForm` calls `onFinish` function with the form values.
2. `onFinish` function calls [`useCreate`](/core/docs/data/hooks/use-create/) with the form values.
3. `useCreate` calls [`dataProvider`](/core/docs/data/data-provider/)'s `create` function and returns the response.
4. `useForm` calls `onSuccess` or `onError` function with the response, depending on the response status.
5. After a successful mutation, `useForm` will invalidate the queries specified in `invalidates` prop.
6. `onSuccess` or `onError` function then calls the `open` function of the [`notificationProvider`](/core/docs/notification/notification-provider/) to inform the user.
7. `useForm` redirects to the `list` page.

#### Edit

In `edit` action, `useForm` will follow the flow below:

When `useForm` is mounted, it calls [`useOne`](/core/docs/data/hooks/use-one/) hook to retrieve the record to be edited. The `id` for the record is obtained from the props or the current route.

After form is submitted:

1.  `useForm` calls `onFinish` function with the form values.
2.  `onFinish` function calls [`useUpdate`](/core/docs/data/hooks/use-update/) with the form values.
3.  If the mutation mode is `optimistic` or `undoable`, `useForm` will update the query cache with the form values immediately after the mutation is triggered.
4.  If the mutation mode is `undoable`, `useForm` will display a notification with a countdown to undo the mutation.
5.  `useUpdate` calls [`dataProvider`](/core/docs/data/data-provider/)'s `update` function and returns the response.
6.  `useForm` calls `onSuccess` or `onError` function with the response, depending on the response status.
7.  If the mutation fails, `useForm` will revert the query cache to the previous values made in step 3.
8.  After a successful mutation, `useForm` will invalidate the queries specified in `invalidates` prop.
9.  `onSuccess` or `onError` function then calls the `open` function of the [`notificationProvider`](/core/docs/notification/notification-provider/) to inform the user.
10. `useForm` redirects to the `list` page.

#### Clone

When `useForm` is mounted, it calls [`useOne`](/core/docs/data/hooks/use-one/) hook to retrieve the record to be cloned. The `id` for the record is obtained from the props or the current route.

After form is submitted:

1.  `useForm` calls `onFinish` function with the form values.
2.  `onFinish` function calls [`useCreate`](/core/docs/data/hooks/use-create/) with the form values.
3.  `useUpdate` calls [`dataProvider`](/core/docs/data/data-provider/)'s `update` function and returns the response.
4.  `useForm` calls `onSuccess` or `onError` function with the response, depending on the response status.
5.  After a successful mutation, `useForm` will invalidate the queries specified in `invalidates` prop.
6.  `onSuccess` or `onError` function then calls the `open` function of the [`notificationProvider`](/core/docs/notification/notification-provider/) to inform the user.
7.  `useForm` redirects to the `list` page.

### resource <GuideBadge id="guides-concepts/general-concepts" /> <RouterBadge />

The resource name or identifier that will be used for the form. If not specified, it will be determined by the current route.

```tsx
useForm({ resource: "products" });
```

### id <RouterBadge />

The ID of the record that will be used for the action. If not specified, it will be determined by the current route. Required for `edit` and `clone` actions.

```tsx
useForm({
  id: 123,
});
```

:::simple Using with explicit resource

If explicit `resource` is provided, `id` must be provided as well to avoid any unexpected API calls.

:::

### redirect <GuideBadge id="guides-concepts/forms#redirection" /><GlobalConfigBadge />

The redirection behavior after the form submission. It can be `list`, `edit`, `show`, `create`, or `false`. By default it will be `list` or whatever is defined in the Refine's global options.

```tsx
useForm({ redirect: "show" });
```

:::simple Router Integration

This will only work if you have `routerProvider` defined in your `<Refine>` component along with the proper `resource` definition with routes and actions.

:::

### onMutationSuccess

Callback function to be called after a successful mutation. It will be called with the mutation result and variables.

```tsx
useForm({
    onMutationSuccess: (
        data, // Mutation result, depending on the action its the response of `useCreate` or `useUpdate`
        variables, // Variables/form values that were used for the mutation
        context, // React Query's context for the mutation
        isAutoSave, // Boolean value indicating if the mutation was triggered by auto-save or not
    ) => { ... }
});
```

### onMutationError

Callback function to be called after a failed mutation. It will be called with the mutation error and variables.

```tsx
useForm({
    onMutationError: (
        error, // Mutation error, depending on the action its the error response of `useCreate` or `useUpdate`
        variables, // Variables/form values that were used for the mutation
        context, // React Query's context for the mutation
        isAutoSave, // Boolean value indicating if the mutation was triggered by auto-save or not
    ) => { ... }
});
```

### invalidates <GuideBadge id="guides-concepts/forms#invalidation" />

Determines the scope of the invalidation after a successful mutation. Can be array of `list`, `many`, `detail`, `resourceAll`, `all` or `false`. By default, `create` and `clone` actions will invalidate `list` and `many`. `edit` action will invalidate `list`, `many` and `detail` queries.

```tsx
useForm({ invalidates: ["list", "many"] });
```

### dataProviderName <GlobalConfigBadge description="This property can also be included in the `resource` definition." />

Name of the data provider to be used in API interactions. Useful when there are more than one data providers defined.

```tsx
useForm({ dataProviderName: "store" });
```

### mutationMode <GuideBadge id="guides-concepts/forms#mutation-modes" /> <GlobalConfigBadge />

Behavior of the mutation, can either be `pessimistic`, `optimistic` or `undoable`. By default, `pessimistic` or whatever is defined in the Refine's global options.

```tsx
useForm({ mutationMode: "optimistic" });
```

### successNotification <GuideBadge id="guides-concepts/forms#notifications" />

> [`NotificationProvider`](/core/docs/notification/notification-provider/) is required for this prop to work.

Customization options for the notification that will be shown after a successful mutation.

```tsx
useForm({
  // Can also be a static object if you don't need to access the data, values or resource.
  // By setting it to `false`, you can disable the notification.
  successNotification: (data, values, resource) => {
    return {
      message: `Successfully created ${data.title}`,
      description: "good job!",
      type: "success",
    };
  },
});
```

### errorNotification <GuideBadge id="guides-concepts/forms#notifications" />

> [`NotificationProvider`](/core/docs/notification/notification-provider/) is required for this prop to work.

Customization options for the notification that will be shown after a failed mutation.

```tsx
useForm({
  // Can also be a static object if you don't need to access the data, values or resource.
  // By setting it to `false`, you can disable the notification.
  errorNotification: (error, values, resource) => {
    return {
      message: `Failed to create ${values.title}`,
      description: error.message,
      type: "error",
    };
  },
});
```

### meta <GuideBadge id="guides-concepts/general-concepts#meta" description="To learn more about the `meta` and how it works with the data providers, refer to General Concepts guide" />

Additional information that will be passed to the data provider. Can be used to handle special cases in the data provider, generating GraphQL queries or handling additional parameters in the redirection routes.

```tsx
useForm({ meta: { headers: { "x-greetings": "hello world" } } });
```

### queryMeta

Meta data values to be used in the internal `useOne` call for the `edit` and `clone` actions. These values will take precedence over the `meta` values.

```tsx
useForm({ queryMeta: { headers: { "x-greetings": "hello mars" } } });
```

### mutationMeta

Meta data values to be used in the internal `useCreate` and `useUpdate` calls for form submissions. These values will take precedence over the `meta` values.

```tsx
useForm({ mutationMeta: { headers: { "x-greetings": "hello pluto" } } });
```

### queryOptions

Options to be used in the internal `useOne` call for the `edit` and `clone` actions.

```tsx
useForm({
  queryOptions: { retry: 3 },
});
```

### createMutationOptions

Options to be used in the internal `useCreate` call for the `create` and `clone` actions.

```tsx
useForm({
  createMutationOptions: { retry: 3 },
});
```

### updateMutationOptions

Options to be used in the internal `useUpdate` call for the `edit` action.

```tsx
useForm({
  updateMutationOptions: { retry: 3 },
});
```

### liveMode <GuideBadge id="guides-concepts/realtime" />

> [`LiveProvider`](/core/docs/realtime/live-provider/) is required for this prop to work.

Behavior of how to handle received real-time updates, can be `auto`, `manual` or `off`. By default, `auto` or whatever is defined in the Refine's global options.

```tsx
useForm({ liveMode: "auto" });
```

### onLiveEvent <GuideBadge id="guides-concepts/realtime" />

A callback function that will be called when a related real-time event is received.

```tsx
useForm({
  onLiveEvent: (event) => {
    console.log(event);
  },
});
```

### liveParams

Additional parameters to be used in the `liveProvider`'s `subscribe` method.

```tsx
useForm({
  liveParams: {
    foo: "bar",
  },
});
```

### overtimeOptions

A set of options to be used for the overtime loading state. Useful when the API is slow to respond and a visual feedback is needed to indicate that the request is still in progress. `overtimeOptions` accept `interval` as `number` to determine the ticking intervals and `onInterval` to be called on each tick. `useForm` also returns `overtime` object with `elapsedTime` value that can be used for the feedback.

```tsx
const { overtime } = useForm({
  interval: 1000,
  onInterval(elapsedTime) {
    console.log(elapsedTime);
  },
});
```

### autoSave <GuideBadge id="guides-concepts/forms#auto-save" />

Auto-save behavior of the form. Can have `enabled` to toggle auto-save, `debounce` to set the debounce interval for saving and `invalidateOnUnmount` to invalidate the queries specified in `invalidates` prop on unmount. This feature is only available for the `edit` action. By default, `autoSave` is disabled.

```tsx
const { onFinishAutoSave } = useForm({
  autoSave: {
    enabled: true, // default is false
    debounce: 2000, // debounce interval for auto-save, default is 1000
    invalidateOnUnmount: true, // whether to invalidate the queries on unmount, default is false
  },
});
```

:::simple Auto-save Implementation

Core implementation of the `useForm` hook doesn't provide out of the box auto-save functionality since it doesn't have access to the form values but it provides the necessary props and callbacks to implement it.

Extended versions of `useForm` (such as the one in `@refinedev/react-hook-form`) provides auto-save functionality out of the box.

:::

### optimisticUpdateMap <GuideBadge id="guides-concepts/forms#optimistic-updates" />

In `optimistic` and `undoable` mutation modes, `useForm` will automatically update the query cache with the form values immediately after the mutation is triggered. This behavior can be customized for each query set (`list`, `many` and `detail` queries) using `optimisticUpdateMap`.

```tsx
useForm({
    optimisticUpdateMap: {
        // A boolean value can also be used to enable/disable the optimistic updates for the query set.
        list: (
            previous, // Previous query data
            variables, // Variables used in the query
            id, // Record id
        ) => { ... },
        many: (
            previous, // Previous query data
            variables, // Variables used in the query
            id, // Record id
        ) => { ... },
        detail: (
            previous, // Previous query data
            variables, // Variables used in the query
        ) => { ... },
    }
})
```

## Return Values

### onFinish

A function to call to trigger the mutation. Depending on the action, it will trigger the mutation of `useCreate` or `useUpdate` hooks.

```tsx
const { onFinish } = useForm({ ... });

return (
    <form onSubmit={() => onFinish(values)}>
        { /* ... */ }
    </form>
);
```

### onFinishAutoSave

A function to call to trigger the auto-save mutation. It will trigger the mutation of `useUpdate` hook. This will not trigger the `formLoading` state.

```tsx
const { onFinishAutoSave } = useForm({ ... });

React.useEffect(() => {
    // trigger auto-save on form values change, it will be debounced by the `autoSave.debounce` value
    onFinishAutoSave(values);
}, [values]);
```

### formLoading

A boolean value indicating the loading state of the form. It will reflect the loading status of the mutation or the query in `edit` and `clone` actions.

```tsx
const { formLoading } = useForm({ ... });
```

### mutation

Result of the mutation triggered by calling `onFinish`. Depending on the action, it will be the result of `useCreate` or `useUpdate` hooks. The mutation state can be accessed through `mutation.isPending`, `mutation.data`, `mutation.error`, etc.

```tsx
const { mutation } = useForm({ ... });

// Access mutation state
if (mutation.isPending) {
  // Handle loading state
}

if (mutation.isError) {
  console.error(mutation.error);
}

if (mutation.isSuccess) {
  console.log("Form submitted successfully:", mutation.data);
}
```

### query

In `edit` and `clone` actions, result of the query of a record. It will be the result of `useOne` hook.

```tsx
const { query: { data, error, isLoading } } = useForm({ ... });
```

### setId

A setter function to set the `id` value. Useful when you want to change the `id` value after the form is mounted.

```tsx
const { setId } = useForm({ ... });

const onItemSelect = (id) => {
    setId(id);
};
```

### redirect <GuideBadge id="guides-concepts/forms#redirection" />

A function to handle custom redirections, it accepts `redirect` and `id` parameters. `redirect` can be `list`, `edit`, `show`, `create` or `false`. `id` is the record id if needed in the specified `redirect` route.

```tsx
const { redirect } = useForm({ ... });

redirect("show", 123);
```

### overtime

An object with `elapsedTime` value that can be used for the overtime loading feedback.

```tsx
const { overtime: { elapsedTime } } = useForm({ ... });
```

### autoSaveProps

An object with `data`, `error` and `status` values that can be used for the auto-save feedback. `data` will be the result of the auto-save mutation, `error` will be the error of the auto-save mutation and `status` will be the status of the auto-save mutation.

```tsx
const { autoSaveProps: { data, error, status } } = useForm({ ... });
```

## API Reference

### Properties

<PropsTable module="@refinedev/core/useForm" />

:::simple Global Configuration

These props have default values in `RefineContext` and can also be set on [`<Refine />`](/core/docs/core/refine-component/) component. `useForm` will use what is passed to `<Refine />` as default but a local value will override it.

:::

### Type Parameters

| Property       | Description                                                                                                                                                         | Type                       | Default                    |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- | -------------------------- |
| TQueryFnData   | Result data returned by the query function. Extends [`BaseRecord`][baserecord]                                                                                      | [`BaseRecord`][baserecord] | [`BaseRecord`][baserecord] |
| TError         | Custom error object that extends [`HttpError`][httperror]                                                                                                           | [`HttpError`][httperror]   | [`HttpError`][httperror]   |
| TVariables     | Values for params.                                                                                                                                                  | `{}`                       |                            |
| TData          | Result data returned by the `select` function. Extends [`BaseRecord`][baserecord]. If not specified, the value of `TQueryFnData` will be used as the default value. | [`BaseRecord`][baserecord] | `TQueryFnData`             |
| TResponse      | Result data returned by the mutation function. Extends [`BaseRecord`][baserecord]. If not specified, the value of `TData` will be used as the default value.        | [`BaseRecord`][baserecord] | `TData`                    |
| TResponseError | Custom error object that extends [`HttpError`][httperror]. If not specified, the value of `TError` will be used as the default value.                               | [`HttpError`][httperror]   | `TError`                   |

### Return values

| Property      | Description                                            | Type                                                                                                                                                              |
| ------------- | ------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| onFinish      | Triggers the mutation                                  | `(values: TVariables) => Promise<CreateResponse<TData>` \| `UpdateResponse<TData>` \| `void`>                                                                     |
| query         | Result of the query of a record                        | [`QueryObserverResult<TData, TError>`](https://react-query.tanstack.com/reference/useQuery)                                                                       |
| mutation      | Result of the mutation triggered by calling `onFinish` | [`UseMutationResult<T>`](https://tanstack.com/query/latest/docs/framework/react/reference/useMutation)                                                            |
| formLoading   | Loading state of form request                          | `boolean`                                                                                                                                                         |
| id            | Record id for `clone` and `create` action              | [`BaseKey`](/core/docs/core/interface-references#basekey)                                                                                                         |
| setId         | `id` setter                                            | `Dispatch<SetStateAction<` `string` \| `number` \| `undefined>>`                                                                                                  |
| redirect      | Redirect function for custom redirections              | (redirect: `"list"`\|`"edit"`\|`"show"`\|`"create"`\| `false` ,idFromFunction?: [`BaseKey`](/core/docs/core/interface-references#basekey)\|`undefined`) => `data` |
| overtime      | Overtime loading props                                 | `{ elapsedTime?: number }`                                                                                                                                        |
| autoSaveProps | Auto save props                                        | `{ data: UpdateResponse<TData>` \| `undefined, error: HttpError` \| `null, status: "loading"` \| `"error"` \| `"idle"` \| `"success" }`                           |
