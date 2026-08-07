---
title: useSelect
siderbar_label: useSelect
source: packages/core/src/hooks/useSelect/index.ts
---

import BasicUsageLivePreview from "./basic-usage-live-preview.md";
import OnSearchLivePreview from "./on-search-live-preview.md";
import SortLivePreview from "./sort-live-preview.md";
import DefaultValueLivePreview from "./default-value-live-preview.md";

`useSelect` hook allows you to manage any `select` (like a [Html `<select>` tag](https://www.w3schools.com/tags/tag_select.asp), [React Select](https://react-select.com/home), etc...) component. Since it is designed as headless, It expects you to handle the UI.

This hook uses the `useList` hook for fetching data. [Refer to useList hook for details. →](/core/docs/3.xx.xx/api-reference/core/hooks/data/useList/)

:::info-tip DERIVATIVES

If you're looking for a complete select library, refine has out-of-the-box support for the libraries below:

- [Ant Design Select](https://ant.design/components/select) (for Ant Design users) - [Documentation](/core/docs/3.xx.xx/api-reference/antd/hooks/field/useSelect) - [Example](/core/docs/3.xx.xx/examples/field/useSelect)
- [Material UI Autocomplete](https://mui.com/material-ui/react-autocomplete) (for Material UI users) - [Documentation](/core/docs/3.xx.xx/api-reference/mui/hooks/useAutocomplete)
- [Mantine Select](https://mantine.dev/core/select/) (for Mantine users) - [Documentation](/core/docs/3.xx.xx/api-reference/mantine/hooks/useSelect)

:::

## Basic Usage

Here is a basic example of how to use `useSelect` hook.

<BasicUsageLivePreview />

## Realtime Updates

> This feature is only available if you use a [Live Provider](/core/docs/3.xx.xx/api-reference/core/providers/live-provider)

When `useSelect` hook is mounted, it will call the `subscribe` method from the `liveProvider` with some parameters such as `channel`, `resource` etc. It is useful when you want to subscribe to the live updates.

[Refer to the `liveProvider` documentation for more information &#8594](/core/docs/3.xx.xx/api-reference/core/providers/live-provider)

## Properties

### `resource` <PropTag required />

It will be passed to the `getList` method from the `dataProvider` as parameter via the `useList` hook. The parameter is usually used as an API endpoint path. It all depends on how to handle the `resource` in the `getList` method. See the [creating a data provider](/core/docs/3.xx.xx/tutorial/understanding-dataprovider/create-dataprovider/) section for an example of how resource are handled.

```tsx
useSelect({
  resource: "categories",
});
```

### `optionLabel` and `optionValue`

Allows you to change the `value` and `label` of your options.
Default values are `optionLabel = "title"` and `optionValue = "id"`

```tsx
useSelect<ICategory>({
    resource: "products",
    optionLabel: "name"
    optionValue: "productId"
});
```

:::tip

Supports nested properties with option [Object path](https://lodash.com/docs/4.17.15#get) syntax.

```tsx
const { options } = useSelect({
  resource: "categories",
  optionLabel: "nested.title",
  optionValue: "nested.id",
});
```

:::

### `sort`

It allows to show the options in the desired order. `sort` will be passed to the `getList` method from the `dataProvider` as parameter via the `useList` hook. It is used to send sort query parameters to the API.

[Refer to the `CrudSorting` interface for more information &#8594](/core/docs/3.xx.xx/api-reference/core/interfaceReferences#crudsorting)

```tsx
useSelect({
  sort: [
    {
      field: "title",
      order: "asc",
    },
  ],
});
```

<SortLivePreview />

### `filters`

It is used to show options by filtering them. `filters` will be passed to the `getList` method from the `dataProvider` as parameter via the `useList` hook. It is used to send filter query parameters to the API.

[Refer to the `CrudFilters` interface for more information &#8594](/core/docs/3.xx.xx/api-reference/core/interfaceReferences#crudfilters)

```tsx
useSelect({
  filter: [
    {
      field: "isActive",
      operator: "eq",
      value: true,
    },
  ],
});
```

### `defaultValue`

Allows to make options selected by default. Adds extra options to `<select>` component. In some cases like there are many entries for the `<select>` and pagination is required, `defaultValue` may not be present in the current visible options and this can break the `<select>` component. To avoid such cases, A seperate `useMany` query is sent to the backend with the `defaultValue` and appended to the options of `<select>`, ensuring the default values exist in the current options array. Since it uses `useMany` to query the necessary data, the `defaultValue` can be a single value or an array of values like the following:

```tsx
useSelect({
  defaultValue: 1, // or [1, 2]
});
```

[Refer to the `useMany` documentation for detailed usage. &#8594](/core/docs/3.xx.xx/api-reference/core/hooks/data/useMany/)

### `debounce`

It allows us to `debounce` the `onSearch` function.

```tsx
useSelect({
  resource: "categories",
  debounce: 500,
});
```

### `queryOptions`

`queryOptions` is used to pass additional options to the `useQuery` hook. It is useful when you want to pass additional options to the `useQuery` hook.

[Refer to the `useQuery` documentation for more information &#8594](https://tanstack.com/query/v4/docs/react/reference/useQuery)

```tsx
useSelect({
  queryOptions: {
    retry: 3,
  },
});
```

### `pagination`

`pagination` will be passed to the `getList` method from the `dataProvider` as parameter. It is used to send pagination query parameters to the API.

#### `current`

You can pass the `current` page number to the `pagination` property.

```tsx
useSelect({
  pagination: {
    current: 2,
  },
});
```

#### `pageSize`

You can pass the `pageSize` to the `pagination` property.

```tsx
useSelect({
  pagination: {
    pageSize: 20,
  },
});
```

### `hasPagination`

`hasPagination` will be passed to the `getList` method from the `dataProvider` as parameter via the `useList` hook. It is used to determine whether to use server-side pagination or not.

```tsx
useSelect({
  hasPagination: false,
});
```

### `defaultValueQueryOptions`

When the `defaultValue` property is given, the `useMany` data hook is called for the selected records. With this property, you can change the options of this query. If not given, the values given in `queryOptions` will be used.

```tsx
const { options } = useSelect({
  resource: "categories",
  defaultValueQueryOptions: {
    onSuccess: (data) => {
      console.log("triggers when on query return on success");
    },
  },
});
```

### `onSearch`

It allows us to `AutoComplete` the `options`.

[Refer to the `CrudFilters` interface for more information &#8594](/core/docs/3.xx.xx/api-reference/core/interfaceReferences#crudfilters)

<OnSearchLivePreview />

:::tip
The HTML select tag does not natively support AutoComplete. If AutoComplete is desired, it can be used with [React Select](https://react-select.com/async) or [use-select](https://github.com/tannerlinsley/use-select).
:::

:::info
If `onSearch` is used, it will override the existing `filters`.
:::

### `metaData`

[`metaData`](/core/docs/3.xx.xx/api-reference/general-concepts/#metadata) is used following two purposes:

- To pass additional information to data provider methods.
- Generate GraphQL queries using plain JavaScript Objects (JSON). Please refer [GraphQL](/core/docs/3.xx.xx/advanced-tutorials/data-provider/graphql/#edit-page) for more information.

In the following example, we pass the `headers` property in the `metaData` object to the `create` method. With similar logic, you can pass any properties to specifically handle the data provider methods.

```tsx
useSelect({
  // highlight-start
  metaData: {
    headers: { "x-meta-data": "true" },
  },
  // highlight-end
});

const myDataProvider = {
  //...
  getList: async ({
    resource,
    pagination,
    hasPagination,
    sort,
    filters,
    // highlight-next-line
    metaData,
  }) => {
    // highlight-next-line
    const headers = metaData?.headers ?? {};
    const url = `${apiUrl}/${resource}`;
    //...
    //...
    // highlight-next-line
    const { data, headers } = await httpClient.get(`${url}`, { headers });
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
useSelect({
  dataProviderName: "second-data-provider",
});
```

### `successNotification`

> [`NotificationProvider`](/core/docs/3.xx.xx/api-reference/core/providers/notification-provider/) is required for this prop to work.

After data is fetched successfully, `useSelect` can call `open` function from `NotificationProvider` to show a success notification. With this prop, you can customize the success notification.

```tsx
useSelect({
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

After data fetching is failed, `useSelect` will call `open` function from `NotificationProvider` to show a error notification. With this prop, you can customize the error notification.

```tsx
useSelect({
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
For more information about live mode, please check [Live / Realtime](/core/docs/3.xx.xx/api-reference/core/providers/live-provider/#livemode) page.

```tsx
useSelect({
  liveMode: "auto",
});
```

### `onLiveEvent`

> [`LiveProvider`](/core/docs/3.xx.xx/api-reference/core/providers/live-provider/) is required for this prop to work.

The callback function that is executed when new events from a subscription are arrived.

```tsx
useSelect({
  onLiveEvent: (event) => {
    console.log(event);
  },
});
```

### `liveParams`

> [`LiveProvider`](/core/docs/3.xx.xx/api-reference/core/providers/live-provider/) is required for this prop to work.

Params to pass to liveProvider's [subscribe](/core/docs/3.xx.xx/api-reference/core/providers/live-provider/#subscribe) method.

## FAQ

### How to get all the data without pagination?

You may want to get all the data without pagination. In this case you should use the [`hasPagination`](/core/docs/3.xx.xx/api-reference/core/hooks/useSelect/#haspagination) prop.

> Don't forget to implement it in the [data provider](/core/docs/3.xx.xx/api-reference/core/providers/data-provider/#getlist).

### How to add search to options (Autocomplete)?

[`onSearch`](/core/docs/3.xx.xx/api-reference/core/hooks/useSelect/#onsearch) is a function that is used to set the search value. It is useful when you want to search for a specific value. A simple example of this is shown below.

<OnSearchLivePreview />

### How to ensure `defaultValue` is included in the options?

In some cases we only have `id`, it may be necessary to show it selected in the selection box. This hook sends the request via [`useMany`](/core/docs/3.xx.xx/api-reference/core/hooks/data/useMany/), gets the data and mark as seleted.

<DefaultValueLivePreview />

### How to change the `label` and `value` properties in options?

[`optionLabel` and `optionValue`](/core/docs/3.xx.xx/api-reference/core/hooks/useSelect/#optionlabel-and-optionvalue) are used to change the value of your options.
The default values are `optionsLabel="title"` and `optionsValue="id"`.

To change to `name` and `categoryId`;

```tsx
useSelect({
  optionLabel: "name",
  optionValue: "categoryId",
});
```

### Can I create the options manually?

Sometimes it may not be enough to create `optionLabel` and `optionValue` options. In this case we create options with `queryResult`.

```tsx
const { queryResult } = useSelect({
  resource: "categories",
});

const options = queryResult.data?.data.map((item) => ({
  label: item.name,
  value: item.id,
}));

return (
  <select>
    {options?.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);
```

## API Reference

### Properties

<PropsTable module="@pankod/refine-core/useSelect"  />

### Return values

| Property                | Description                                    | Type                                                                                          |
| ----------------------- | ---------------------------------------------- | --------------------------------------------------------------------------------------------- |
| options                 | It returns possible options                    | `{ label: string; value: string }`                                                            |
| queryResult             | Result of the query of a record                | [`QueryObserverResult<{ data: TData }>`](https://react-query.tanstack.com/reference/useQuery) |
| defaultValueQueryResult | Result of the query of a `defaultValue` record | [`QueryObserverResult<{ data: TData }>`](https://react-query.tanstack.com/reference/useQuery) |
| onSearch                | A function to set the search value             | `onSearch: (value: string) => void`                                                           |

## Example

<CodeSandboxExample path="core-use-select" />
