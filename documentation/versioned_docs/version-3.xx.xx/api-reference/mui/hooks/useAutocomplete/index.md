---
title: useAutocomplete
siderbar_label: useAutocomplete
source: https://github.com/refinedev/refine/blob/v3/packages/mui/src/hooks/useAutocomplete/index.ts
---

import BasicUsageLivePreview from "./basic-usage-live-preview.md";
import DefaultValueLivePreview from "./default-value-live-preview.md";
import CrudLivePreview from "./crud-live-preview.md";
import SortLivePreview from "./sort-live-preview.md";
import OnSearchLivePreview from "./on-search-live-preview.md";

`useAutocomplete` hook allows you to manage Material UI [`<Autocomplete>`](https://mui.com/material-ui/react-autocomplete/) component when records in a resource needs to be used as select options.

This hook uses the `useList` hook for fetching data. [Refer to useList hook for details. →](/core/docs/3.xx.xx/api-reference/core/hooks/data/useList/)

:::info-tip DERIVATIVES
If you're looking for a complete select library, refine has out-of-the-box support for the libraries below:

- refine's `useSelect` (for Headless users) - [Documentation](/core/docs/3.xx.xx/api-reference/core/hooks/useSelect/) - [Example](/core/docs/3.xx.xx/examples/core/useSelect)
- [Ant Design Select](https://ant.design/components/select) (for Ant Design users) - [Documentation](/core/docs/3.xx.xx/api-reference/antd/hooks/field/useSelect) - [Example](/core/docs/3.xx.xx/examples/field/useSelect)
- [Mantine Select](https://mantine.dev/core/select/) (for Mantine users) - [Documentation](/core/docs/3.xx.xx/api-reference/mantine/hooks/useSelect)
  :::

## Basic Usage

Here is a basic example of how to use `useAutocomplete` hook.

<BasicUsageLivePreview />

## Realtime Updates

> This feature is only available if you use a [Live Provider](/core/docs/3.xx.xx/api-reference/core/providers/live-provider)

When `useAutocomplete` hook is mounted, it passes some parameters (`channel`, `resource` etc.) to the `subscribe` method from the `liveProvider`.
It is useful when you want to subscribe to the live updates.

[Refer to the `liveProvider` documentation for more information &#8594](/core/docs/3.xx.xx/api-reference/core/providers/live-provider)

## Properties

### `resource` <PropTag required />

It will be passed to the `getList` method from the `dataProvider` as parameter via the `useList` hook. The parameter is usually used as an API endpoint path. It all depends on how to handle the `resource` in the `getList` method. See the [creating a data provider](/core/docs/3.xx.xx/api-reference/core/providers/data-provider#creating-a-data-provider) section for an example of how resources are handled.

```tsx
useAutocomplete({
  resource: "categories",
});
```

### `sort`

It allows to show the options in the desired order. `sort` will be passed to the `getList` method from the `dataProvider` as parameter via the `useList` hook. It is used to send sort query parameters to the API.

[Refer to the `CrudSorting` interface for more information &#8594](/core/docs/3.xx.xx/api-reference/core/interfaceReferences#crudsorting)

```tsx
useAutocomplete({
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
useAutocomplete({
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
useAutocomplete({
  defaultValue: 1, // or [1, 2]
});
```

[Refer to the `useMany` documentation for detailed usage. &#8594](/core/docs/3.xx.xx/api-reference/core/hooks/data/useMany/)

### `debounce`

It allows us to `debounce` the `onSearch` function.

```tsx
useAutocomplete({
  debounce: 500,
});
```

### `queryOptions`

`queryOptions` is used to pass additional options to the `useQuery` hook. It is useful when you want to pass additional options to the `useQuery` hook.

[Refer to the `useQuery` documentation for more information &#8594](https://tanstack.com/query/v4/docs/react/reference/useQuery)

```tsx
useAutocomplete({
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
useAutocomplete({
  pagination: {
    current: 2,
  },
});
```

#### `pageSize`

You can pass the `pageSize` to the `pagination` property.

```tsx
useAutocomplete({
  pagination: {
    pageSize: 20,
  },
});
```

### `hasPagination`

> Default: `false`

`hasPagination` will be passed to the `getList` method from the `dataProvider` as parameter via the `useList` hook. It is used to determine whether to use server-side pagination or not.

```tsx
useAutocomplete({
  hasPagination: false,
});
```

### `defaultValueQueryOptions`

When the `defaultValue` property is given, the `useMany` data hook is called for the selected records. With this property, you can change the options of this query. If not given, the values given in `queryOptions` will be used.

```tsx
useAutocomplete({
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

:::info
If `onSearch` is used, it will override the existing `filters`.
:::

#### Client-side filtering

Sometimes, you may want to filter the options on the client-side. You can do this by passing `onSearch` function as `undefined`. This will disable the server-side filtering and will filter the options on the client-side.

```tsx
// highlight-next-line
import { createFilterOptions } from "@pankod/refine-mui";

const { autocompleteProps } = useAutocomplete({
  resource: "categories",
});

// highlight-start
const filterOptions = createFilterOptions({
  matchFrom: "start",
  stringify: (option: any) => option.title,
});
// highlight-end

<Autocomplete
  {...autocompleteProps}
  getOptionLabel={(item) => item.title}
  // highlight-start
  onInputChange={(event, value) => {}}
  filterOptions={filterOptions}
  // highlight-end
  isOptionEqualToValue={(option, value) =>
    value === undefined ||
    option?.id?.toString() === (value?.id ?? value)?.toString()
  }
  placeholder="Select a category"
  renderInput={(params) => (
    <TextField
      {...params}
      label="Category"
      margin="normal"
      variant="outlined"
      required
    />
  )}
/>;
```

### `metaData`

[`metaData`](/core/docs/3.xx.xx/api-reference/general-concepts/#metadata) is used following two purposes:

- To pass additional information to data provider methods.
- Generate GraphQL queries using plain JavaScript Objects (JSON). Please refer [GraphQL](/core/docs/3.xx.xx/advanced-tutorials/data-provider/graphql/#edit-page) for more information.

In the following example, we pass the `headers` property in the `metaData` object to the `create` method. With similar logic, you can pass any properties to specifically handle the data provider methods.

```tsx
useAutocomplete({
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
useAutocomplete({
  dataProviderName: "second-data-provider",
});
```

### `successNotification`

> [`NotificationProvider`](/core/docs/3.xx.xx/api-reference/core/providers/notification-provider/) is required for this prop to work.

After data is fetched successfully, `useAutocomplete` can call `open` function from `NotificationProvider` to show a success notification. With this prop, you can customize the success notification.

```tsx
useAutocomplete({
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

After data fetching is failed, `useAutocomplete` will call `open` function from `NotificationProvider` to show a error notification. With this prop, you can customize the error notification.

```tsx
useAutocomplete({
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
useAutocomplete({
  liveMode: "auto",
});
```

### `onLiveEvent`

> [`LiveProvider`](/core/docs/3.xx.xx/api-reference/core/providers/live-provider/) is required for this prop to work.

The callback function that is executed when new events from a subscription are arrived.

```tsx
useAutocomplete({
  onLiveEvent: (event) => {
    console.log(event);
  },
});
```

### `liveParams`

> [`LiveProvider`](/core/docs/3.xx.xx/api-reference/core/providers/live-provider/) is required for this prop to work.

Params to pass to liveProvider's [subscribe](/core/docs/3.xx.xx/api-reference/core/providers/live-provider/#subscribe) method.

## FAQ

### How to ensure `defaultValue` is included in the options?

In some cases we only have `id`, it may be necessary to show it selected in the selection box. This hook sends the request via [`useMany`](/core/docs/3.xx.xx/api-reference/core/hooks/data/useMany/), gets the data and mark as seleted.

<DefaultValueLivePreview />

### Can I create the options manually?

You can create a new `options` object with `queryResult`.

```tsx
const { autocompleteProps, queryResult } = useAutocomplete();

const options = queryResult.data?.data.map((item) => ({
  title: item.title,
  value: item.id,
}));

return <Autocomplete {...autocompleteProps} options={options || []} />;
```

### How do I use it with `CRUD` components and `useForm`?

<CrudLivePreview />

The use of `useAutocomplete` with [`useForm`](/core/docs/3.xx.xx/packages/documentation/react-hook-form/useForm/) is demonstrated in the code above. You can use the `useAutocomplete` hook independently of the `useForm` hook.

:::info
By default, refine does the search using the [`useList`](/core/docs/3.xx.xx/api-reference/core/hooks/data/useDelete/) hook and passes it to the search parameter. If you get a problem you should check your `getList` function in your Data Provider. If you want to change this behavior to make client-side filtering, you can examine [this](https://mui.com/material-ui/react-autocomplete/#search-as-you-type) documentation.
:::

## API Reference

### Properties

<PropsTable module="@pankod/refine-mui/useAutocomplete"/>

### Return values

| Property                   | Description                                    | Type                                                                                          |
| -------------------------- | ---------------------------------------------- | --------------------------------------------------------------------------------------------- |
| autocompleteProps          | Material UI Autocomplete props                 | [`AutoCompleteReturnValues`](#autocompletereturnvalues)                                       |
| queryResult                | Result of the query of a record                | [`QueryObserverResult<{ data: TData }>`](https://react-query.tanstack.com/reference/useQuery) |
| defaultValueQueryResult    | Result of the query of a `defaultValue` record | [`QueryObserverResult<{ data: TData }>`](https://react-query.tanstack.com/reference/useQuery) |
| defaultValueQueryOnSuccess | Default value onSuccess method                 | `() => void`                                                                                  |

> #### AutoCompleteReturnValues
>
> | Property      | Description                                               | Type                                                                   |
> | ------------- | --------------------------------------------------------- | ---------------------------------------------------------------------- |
> | options       | Array of options                                          | `TData`                                                                |
> | loading       | Loading state                                             | `boolean`                                                              |
> | onInputChange | Callback fired when the input value changes               | `(event: React.SyntheticEvent, value: string, reason: string) => void` |
> | filterOptions | Determines the filtered options to be rendered on search. | `(options: TData, state: object) => TData`                             |

## Example

<CodeSandboxExample path="field-material-ui-use-autocomplete" />
