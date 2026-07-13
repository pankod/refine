---
id: useShow
title: useShow
---

import BasicUsageLivePreview from "./basic-usage-live-preview.md";
import PropResource from "@site/src/partials/prop-resource";

`useShow` is an extended version of [`useOne`](/core/docs/3.xx.xx/api-reference/core/hooks/data/useOne/). It supports all the features of `useOne` and adds some extra features.

It is useful when you want to fetch a single record from the API. It will return the data and some functions to control the query.

## Usage

The `useShow` hook does not expect any properties. By default, it will try to read the `resource` and `id` values from the current URL. It will be passed to the `getOne` method from the `dataProvider` as a parameter.

If you define `resource` and `id` on the hook, when these properties are changed, the `useShow` hook will trigger a new request.

<BasicUsageLivePreview />

## Realtime Updates

> This feature is only available if you use a [Live Provider](/core/docs/3.xx.xx/api-reference/core/providers/live-provider).

When the `useShow` hook is mounted, it will call the `subscribe` method from the `liveProvider` with some parameters such as `channel`, `resource` etc. It is useful when you want to subscribe to live updates.

[Refer to the `liveProvider` documentation for more information &#8594](/core/docs/3.xx.xx/api-reference/core/providers/live-provider)

## Properties

### `resource`

<PropResource
hook={{
        name:"useOne",
        URL:"/docs/api-reference/core/hooks/data/useOne/"
    }}
method={{
        name:"getOne",
        URL:"/docs/api-reference/core/providers/data-provider/#getone"
    }}
/>

```tsx
useShow({
  resource: "categories",
});
```

### `id`

> Default: It reads the `id` value from the current URL.

It will be passed to the `getOne` method from the `dataProvider` as a parameter. It is used to determine which record to fetch.

```tsx
useShow({
  id: 123,
});
```

### `metaData`

[`metaData`](/core/docs/3.xx.xx/api-reference/general-concepts/#metadata) is used following two purposes:

- To pass additional information to data provider methods.
- Generate GraphQL queries using plain JavaScript Objects (JSON). Please refer [GraphQL](/core/docs/3.xx.xx/advanced-tutorials/data-provider/graphql/#edit-page) for more information.

In the following example, we pass the `headers` property in the `metaData` object to the `create` method. With similar logic, you can pass any properties to specifically handle the data provider methods.

```tsx
useShow({
  // highlight-start
  metaData: {
    headers: { "x-meta-data": "true" },
  },
  // highlight-end
});

const myDataProvider = {
  //...
  getOne: async ({
    resource,
    id,
    // highlight-next-line
    metaData,
  }) => {
    // highlight-next-line
    const headers = metaData?.headers ?? {};
    const url = `${apiUrl}/${resource}/${id}`;

    //...
    //...

    // highlight-next-line
    const { data } = await httpClient.get(`${url}`, { headers });

    return {
      data,
    };
  },
  //...
};
```

### `dataProviderName`

If there is more than one `dataProvider`, you can specify which one to use by passing the `dataProviderName` prop. It is useful when you have a different data provider for different resources.

```tsx
useShow({
  dataProviderName: "second-data-provider",
});
```

### `queryOptions`

`queryOptions` is used to pass additional options to the `useQuery` hook. It is useful when you want to pass additional options to the `useQuery` hook.

[Refer to the `useQuery` documentation for more information &#8594](https://tanstack.com/query/v4/docs/react/reference/useQuery)

```tsx
useShow({
  queryOptions: {
    retry: 3,
    enabled: false,
  },
});
```

### `successNotification`

> [`NotificationProvider`](/core/docs/3.xx.xx/api-reference/core/providers/notification-provider/) is required for this prop to work.

After data is fetched successfully, `useShow` can call `open` function from `NotificationProvider` to show a success notification. With this prop, you can customize the success notification.

```tsx
useShow({
  successNotification: (data, values, resource) => {
    return {
      message: `${data.title} Successfully fetched.`,
      description: "Success with no errors",
      type: "success",
    };
  },
});
```

### `errorNotification`

> [`NotificationProvider`](/core/docs/3.xx.xx/api-reference/core/providers/notification-provider/) is required for this prop to work.

After data fetching is failed, `useShow` will call the `open` function from `NotificationProvider` to show an error notification. With this prop, you can customize the error notification.

```tsx
useShow({
  errorNotification: (data, values, resource) => {
    return {
      message: `Something went wrong when getting ${data.id}`,
      description: "Error",
      type: "error",
    };
  },
});
```

### `liveMode`

> [`LiveProvider`](/core/docs/3.xx.xx/api-reference/core/providers/live-provider/) is required for this prop to work.

Determines whether to update data automatically ("auto") or not ("manual") if a related live event is received. It can be used to update and show data in Realtime throughout your app.
For more information about live mode, please check the [Live / Realtime](/core/docs/3.xx.xx/api-reference/core/providers/live-provider/#livemode) page.

```tsx
useShow({
  liveMode: "auto",
});
```

### `onLiveEvent`

> [`LiveProvider`](/core/docs/3.xx.xx/api-reference/core/providers/live-provider/) is required for this prop to work.

The callback function is executed when new events from a subscription have arrived.

```tsx
useShow({
  onLiveEvent: (event) => {
    console.log(event);
  },
});
```

### `liveParams`

> [`LiveProvider`](/core/docs/3.xx.xx/api-reference/core/providers/live-provider/) is required for this prop to work.

Params to pass to liveProvider's [subscribe](/core/docs/3.xx.xx/api-reference/core/providers/live-provider/#subscribe) method.

## Return Values

### `queryResult`

It is TanStack Query's `useQuery` return values.

[Refer to the `useQuery` documentation for more information &#8594](https://tanstack.com/query/v4/docs/react/reference/useQuery)

### `showId`

It is the `id` value that is used on the `useShow` hook.

### `setShowId`

When you want to change the `showId` value, you can use this setter. It is useful when you want to change the `showId` value based on the user's action.

It will trigger new request to fetch the data when the `showId` value is changed.

## API Reference

### Props

<PropsTable module="@pankod/refine-core/useShow" liveMode-default='`"off"`' />

### Return values

| Property    | Description                     | Type                                                                                          |
| ----------- | ------------------------------- | --------------------------------------------------------------------------------------------- |
| queryResult | Result of the query of a record | [`QueryObserverResult<{ data: TData }>`](https://react-query.tanstack.com/reference/useQuery) |
| showId      | Record id                       | `string`                                                                                      |
| setShowId   | `showId` setter                 | `Dispatch<SetStateAction< string` \| `undefined>>`                                            |
