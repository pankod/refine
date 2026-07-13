---
title: "useAutoComplete Hook | MUI & Refine v4 Relational"
display_title: "useAutocomplete"
sidebar_label: "useAutocomplete"
description: "Simplify relational data selection with MUI AutoComplete. Official guide to fetching and filtering data for your forms in Refine v4."
siderbar_label: useAutocomplete
source: https://github.com/refinedev/refine/blob/main/packages/mui/src/hooks/useAutocomplete/index.ts
---

import BasicUsageLivePreview from "./\_basic-usage-live-preview.md";
import DefaultValueLivePreview from "./\_default-value-live-preview.md";
import CrudLivePreview from "./\_crud-live-preview.md";
import SortLivePreview from "./\_sort-live-preview.md";
import OnSearchLivePreview from "./\_on-search-live-preview.md";

`useAutocomplete` hook allows you to manage Material UI's [`<Autocomplete>`](https://mui.com/material-ui/react-autocomplete/) component when records in a resource needs to be used as select options.

This hook uses the `useList` hook for fetching data. [Refer to useList hook for details. →](/core/docs/data/hooks/use-list)

## Usage

Here is a basic example of how to use `useAutocomplete` hook.

<BasicUsageLivePreview />

## Realtime Updates

> [`LiveProvider`](/core/docs/realtime/live-provider) is required for this prop to work.

When `useAutocomplete` hook is mounted, it passes some parameters (`channel`, `resource` etc.) to the `subscribe` method from the `liveProvider`.
It is useful when you want to subscribe to the live updates.

## Properties

### resource <PropTag required />

It will be passed to the `getList` method from the `dataProvider` as parameter via the `useList` hook. The parameter is usually used as an API endpoint path. It all depends on how to handle the `resource` in the `getList` method. See the [creating a data provider](/core/docs/data/data-provider#creating-a-data-provider) section for an example of how resources are handled.

```tsx
useAutocomplete({
  resource: "categories",
});
```

If you have multiple resources with the same name, you can pass the `identifier` instead of the `name` of the resource. It will only be used as the main matching key for the resource, data provider methods will still work with the `name` of the resource defined in the `<Refine/>` component.

> For more information, refer to the [`identifier` section of the `<Refine/>` component documentation &#8594](/core/docs/core/refine-component#identifier)

### sorters

It allows to show the options in the desired order. `sorters` will be passed to the `getList` method from the `dataProvider` as parameter via the `useList` hook. It is used to send `sorters` query parameters to the API.

> For more information, refer to the [`CrudSorting` interface documentation &#8594](/core/docs/core/interface-references#crudsorting)

```tsx
useAutocomplete({
  sorters: [
    {
      field: "title",
      order: "asc",
    },
  ],
});
```

<SortLivePreview />

### filters

`filters` is used to show options by filtering them. `filters` will be passed to the `getList` method from the `dataProvider` as parameter via the `useList` hook. It is used to send filter query parameters to the API.

> For more information, refer to the [`CrudFilters` interface documentation &#8594](/core/docs/core/interface-references#crudfilters)

```tsx
useAutocomplete({
  filters: [
    {
      field: "isActive",
      operator: "eq",
      value: true,
    },
  ],
});
```

### `defaultValue`

Is used to fetch extra options from the API.

If there are many `<select>` options and pagination is needed, the `defaultValue` might not be in the visible list. This can break the `<select>` component. To prevent this, a separate `useMany` query fetches the `defaultValue` from the backend and adds it to the options, ensuring it exists in the list. Since it uses `useMany`, `defaultValue` can be a single value or an array:

```tsx
useAutocomplete({
  defaultValue: 1, // or [1, 2]
});
```

:::info

`defaultValue` **does not** set a default selection. It only ensures the default value exists in the options.

To set a default selection, pass `defaultValue` to the `value` prop of `<Autocomplete>` or `useForm`:

```tsx
const form = useForm({
  defaultValues: {
    category: { id: 1 }, // Default selected value
  },
});

const { autocompleteProps } = useAutocomplete({
  resource: "categories",
  defaultValue: [1], // Ensures the default value is included in options
});
```

:::

### selectedOptionsOrder

`selectedOptionsOrder` allows us to sort `selectedOptions` on `defaultValue`. It can be:

- `"in-place"`: sort `selectedOptions` at the bottom. It is by default.
- `"selected-first"`: sort `selectedOptions` at the top.

```tsx
useAutocomplete({
  defaultValue: 1, // or [1, 2]
  selectedOptionsOrder: "selected-first", // in-place | selected-first
});
```

> For more information, refer to the [`useMany` documentation &#8594](/core/docs/data/hooks/use-many)

### debounce

It allows us to `debounce` the `onSearch` function.

```tsx
useAutocomplete({
  debounce: 500,
});
```

### queryOptions

`queryOptions` is used to pass additional options to the `useQuery` hook. It is useful when you want to pass additional options to the `useQuery` hook.

> For more information, refer to the [`useQuery` documentation &#8594](https://tanstack.com/query/v4/docs/react/reference/useQuery)

```tsx
useAutocomplete({
  queryOptions: {
    retry: 3,
  },
});
```

### pagination

`pagination` will be passed to the `getList` method from the `dataProvider` as parameter. It is used to send pagination query parameters to the API.

#### current

You can pass the `current` page number to the `pagination` property.

```tsx
useAutocomplete({
  pagination: {
    current: 2,
  },
});
```

#### pageSize

You can pass the `pageSize` to the `pagination` property.

```tsx
useAutocomplete({
  pagination: {
    pageSize: 20,
  },
});
```

#### mode

It can be `"off"`, `"client"` or `"server"`. It is used to determine whether to use server-side pagination or not.

```tsx
useAutocomplete({
  pagination: {
    mode: "off",
  },
});
```

### defaultValueQueryOptions

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

### onSearch

It allows us to `AutoComplete` the `options`.

> For more information, refer to the [`CrudFilters` interface documentation &#8594](/core/docs/core/interface-references#crudfilters)

<OnSearchLivePreview />

If `onSearch` is used, it will override the existing `filters`.

#### Client-side filtering

Sometimes, you may want to filter the options on the client-side. You can do this by passing `onSearch` function as `undefined`. This will disable the server-side filtering and will filter the options on the client-side.

```tsx
// highlight-next-line
import { createFilterOptions } from "@mui/material";

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

### meta

`meta` is a special property that can be used to pass additional information to data provider methods for the following purposes:

- Customizing the data provider methods for specific use cases.
- Generating GraphQL queries using plain JavaScript Objects (JSON).

> For more information, refer to the [`meta` section of the General Concepts documentation &#8594](/core/docs/guides-concepts/general-concepts/#meta-concept)

In the following example, we pass the `headers` property in the `meta` object to the `create` method. With similar logic, you can pass any properties to specifically handle the data provider methods.

```tsx
useAutocomplete({
  // highlight-start
  meta: {
    headers: { "x-meta-data": "true" },
  },
  // highlight-end
});

const myDataProvider = {
  //...
  getList: async ({
    resource,
    pagination,
    sorters,
    filters,
    // highlight-next-line
    meta,
  }) => {
    // highlight-next-line
    const headers = meta?.headers ?? {};
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

### dataProviderName

If there is more than one `dataProvider`, you can specify which one to use by passing the `dataProviderName` prop. It is useful when you have a different data provider for different resources.

```tsx
useAutocomplete({
  dataProviderName: "second-data-provider",
});
```

### successNotification

> [`NotificationProvider`](/core/docs/notification/notification-provider) is required for this prop to work.

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

### errorNotification

> [`NotificationProvider`](/core/docs/notification/notification-provider) is required for this prop to work.

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

### liveMode

> [`LiveProvider`](/core/docs/realtime/live-provider) is required for this prop to work.

Determines whether to update data automatically ("auto") or not ("manual") if a related live event is received. It can be used to update and show data in Realtime throughout your app.

> For more information, please refer to the [Live / Realtime documentation](/core/docs/realtime/live-provider#livemode)

```tsx
useAutocomplete({
  liveMode: "auto",
});
```

### onLiveEvent

> [`LiveProvider`](/core/docs/realtime/live-provider) is required for this prop to work.

The callback function that is executed when new events from a subscription are arrived.

```tsx
useAutocomplete({
  onLiveEvent: (event) => {
    console.log(event);
  },
});
```

### liveParams

> [`LiveProvider`](/core/docs/realtime/live-provider) is required for this prop to work.

Params to pass to liveProvider's [subscribe](/core/docs/realtime/live-provider#subscribe) method.

### overtimeOptions

If you want loading overtime for the request, you can pass the `overtimeOptions` prop to the this hook. It is useful when you want to show a loading indicator when the request takes too long.
`interval` is the time interval in milliseconds while `onInterval` is the function that will be called on each interval.

Return `overtime` object from this hook. `elapsedTime` is the elapsed time in milliseconds. It becomes `undefined` when the request is completed.

```tsx
const { overtime } = useAutocomplete({
  //...
  overtimeOptions: {
    interval: 1000,
    onInterval(elapsedInterval) {
      console.log(elapsedInterval);
    },
  },
});

console.log(overtime.elapsedTime); // undefined, 1000, 2000, 3000 4000, ...

// You can use it like this:
{
  elapsedTime >= 4000 && <div>this takes a bit longer than expected</div>;
}
```

### ~~sort~~ <PropTag deprecated />

Use `sorters` instead.

### ~~hasPagination~~ <PropTag deprecated />

Use `pagination.mode` instead.

## FAQ

### How to ensure `defaultValue` is included in the options?

In some cases we only have `id`, it may be necessary to show it selected in the selection box. This hook sends the request via [`useMany`](/core/docs/data/hooks/use-many), gets the data and mark as selected.

<DefaultValueLivePreview />

### Can I create the options manually?

You can create a new `options` object with `query`.

```tsx
const { autocompleteProps, query } = useAutocomplete();

const options = query.data?.data.map((item) => ({
  title: item.title,
  value: item.id,
}));

return <Autocomplete {...autocompleteProps} options={options || []} />;
```

### How do I use it with `CRUD` components and `useForm`?

<CrudLivePreview />

The use of `useAutocomplete` with [`useForm`](/core/docs/packages/list-of-packages) is demonstrated in the code above. You can use the `useAutocomplete` hook independently of the `useForm` hook.

By default, Refine does the search using the [`useList`](/core/docs/data/hooks/use-delete) hook and passes it to the search parameter. If you get a problem you should check your `getList` function in your Data Provider. If you want to change this behavior to make client-side filtering, you can examine [this](https://mui.com/material-ui/react-autocomplete/#search-as-you-type) documentation.

## API Reference

### Properties

<PropsTable module="@refinedev/mui/useAutocomplete"/>

### Type Parameters

| Property     | Description                                                                                                                                                         | Type                       | Default                    |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- | -------------------------- |
| TQueryFnData | Result data returned by the query function. Extends [`BaseRecord`][baserecord]                                                                                      | [`BaseRecord`][baserecord] | [`BaseRecord`][baserecord] |
| TError       | Custom error object that extends [`HttpError`][httperror]                                                                                                           | [`HttpError`][httperror]   | [`HttpError`][httperror]   |
| TData        | Result data returned by the `select` function. Extends [`BaseRecord`][baserecord]. If not specified, the value of `TQueryFnData` will be used as the default value. | [`BaseRecord`][baserecord] | `TQueryFnData`             |

### Return values

| Property                   | Description                                    | Type                                                                                          |
| -------------------------- | ---------------------------------------------- | --------------------------------------------------------------------------------------------- |
| autocompleteProps          | Material UI Autocomplete props                 | [`AutoCompleteReturnValues`](#autocompletereturnvalues)                                       |
| query                      | Result of the query of a record                | [`QueryObserverResult<{ data: TData }>`](https://react-query.tanstack.com/reference/useQuery) |
| defaultValueQuery          | Result of the query of a `defaultValue` record | [`QueryObserverResult<{ data: TData }>`](https://react-query.tanstack.com/reference/useQuery) |
| defaultValueQueryOnSuccess | Default value onSuccess method                 | `() => void`                                                                                  |
| overtime                   | Overtime loading props                         | `{ elapsedTime?: number }`                                                                    |

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

[baserecord]: /core/docs/core/interface-references#baserecord
[httperror]: /core/docs/core/interface-references#httperror
