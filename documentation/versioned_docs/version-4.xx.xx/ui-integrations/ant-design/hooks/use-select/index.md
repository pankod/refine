---
title: "useSelect Hook | Ant Design & Refine v4 Relational Data"
display_title: "useSelect"
sidebar_label: "useSelect"
description: "Effortlessly populate Ant Design Select components. Learn how to fetch and filter relational data for your forms with the useSelect hook."
siderbar_label: useSelect
source: https://github.com/refinedev/refine/blob/main/packages/antd/src/hooks/fields/useSelect/index.ts
---

import BasicUsageLivePreview from "./\_basic-usage-live-preview.md";
import OnSearchLivePreview from "./\_on-search-live-preview.md";
import SortLivePreview from "./\_sort-live-preview.md";
import DefaultValueLivePreview from "./\_default-value-live-preview.md";
import CrudLivePreview from "./\_crud-live-preview.md";

`useSelect` hook allows you to manage Ant Design's [`<Select>`](https://ant.design/components/select) component when the records in a resource needs to be used as select options.

This hook uses the `useList` hook for fetching data.

> For more information, refer to the [useList documentation &#8594](/core/docs/data/hooks/use-list)

## Usage

Here is a basic example that uses the `useSelect` hook.

<BasicUsageLivePreview />

## Realtime Updates

> [`LiveProvider`](/core/docs/realtime/live-provider) is required for this prop to work.

When the `useSelect` hook is mounted, it passes some parameters (`channel`, `resource` etc.) to the `subscribe` method from the `liveProvider` that allow you to subscribe to live updates.

## Properties

### resource <PropTag required />

`resource` will be passed to the `getList` method from the `dataProvider` as parameter via the `useList` hook. The parameter is usually used as an API endpoint path but it all depends on how you handle the `resource` in the `getList` method.

See the [creating a data provider documentation](/core/docs/data/data-provider) for an example of how resource are handled.

```tsx
useSelect({
  resource: "categories",
});
```

If you have multiple resources with the same name, you can pass the `identifier` instead of the `name` of the resource. It will only be used as the main matching key for the resource, data provider methods will still work with the `name` of the resource defined in the `<Refine/>` component.

> For more information, refer to the [`identifier` section of the `<Refine/>` component documentation &#8594](/core/docs/core/refine-component#identifier)

### optionLabel and optionValue

Allows you to change the `value` and `label` of your options.
Default values are `optionLabel = "title"` and `optionValue = "id"`

```tsx
useSelect<ICategory>({
    resource: "products",
    optionLabel: "name"
    optionValue: "productId"
});
```

These properties also support nested property access with [Object path](https://lodash.com/docs/4.17.15#get) syntax.

```tsx
const { options } = useSelect({
  resource: "categories",
  optionLabel: "nested.title",
  optionValue: "nested.id",
});
```

It's also possible to pass function to these props. These functions will receive `item` argument.

```tsx
const { options } = useSelect({
  optionLabel: (item) => `${item.firstName} ${item.lastName}`,
  optionValue: (item) => item.id,
});
```

### searchField

Can be used to specify which field will be searched with value given to `onSearch` function.

```tsx
const { onSearch } = useSelect({ searchField: "name" });

onSearch("John"); // Searches by `name` field with value John.
```

By default, it uses `optionLabel`'s value, if `optionLabel` is a string. Uses `title` field otherwise.

```tsx
// When `optionLabel` is string.
const { onSearch } = useSelect({ optionLabel: "name" });

onSearch("John"); // Searches by `name` field with value John.

// When `optionLabel` is function.
const { onSearch } = useSelect({
  optionLabel: (item) => `${item.id} - ${item.name}`,
});

onSearch("John"); // Searches by `title` field with value John.
```

### sorters

`sorters` prop allows you to show the options in the desired order. It will be passed to the `getList` method from the `dataProvider` as parameter via the `useList` hook and used to send sort query parameters to the API.

```tsx
useSelect({
  sorters: [
    {
      field: "title",
      order: "asc",
    },
  ],
});
```

<SortLivePreview />

> For more information, refer to the [`CrudSorting` interface documentation &#8594](/core/docs/core/interface-references#crudsorting)

### filters

`filters` is used to filter the options you are showing. `filters` will be passed to the `getList` method from the `dataProvider` as parameter via the `useList` hook and used to send filter query parameters to the API.

```tsx
useSelect({
  filters: [
    {
      field: "isActive",
      operator: "eq",
      value: true,
    },
  ],
});
```

> For more information, refer to the [`CrudFilters` interface documentation &#8594](/core/docs/core/interface-references#crudfilters)

### defaultValue

Is used to fetch extra options from the API.

If there are many `<select>` options and pagination is needed, the `defaultValue` might not be in the visible list. This can break the `<select>` component. To prevent this, a separate `useMany` query fetches the `defaultValue` from the backend and adds it to the options, ensuring it exists in the list. Since it uses `useMany`, `defaultValue` can be a single value or an array:

```tsx
useSelect({
  defaultValue: 1, // or [1, 2]
});
```

:::info

`defaultValue` **does not** set a default selection. It only ensures the default value exists in the options.

To set a default selection, pass `defaultValue` to the `value` prop of `<Select>` or `useForm`:

```tsx
const form = useForm({
  defaultValues: {
    category: { id: 1 }, // Default selected value
  },
});

const { selectProps } = useSelect({
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
useSelect({
  defaultValue: 1, // or [1, 2]
  selectedOptionsOrder: "selected-first", // in-place | selected-first
});
```

> For more information, refer to the [`useMany` documentation &#8594](/core/docs/data/hooks/use-many)

### debounce

This prop allows us to `debounce` the `onSearch` function.

```tsx
useSelect({
  resource: "categories",
  debounce: 500,
});
```

### queryOptions

`queryOptions` is used to pass additional options to the `useQuery` hook. It is useful when you want to pass additional options to the `useQuery` hook.

```tsx
useSelect({
  queryOptions: {
    retry: 3,
  },
});
```

> For more information, refer to the [`useQuery` documentation &#8594](https://tanstack.com/query/v4/docs/react/reference/useQuery)

### pagination

`pagination` will be passed to the `getList` method from the `dataProvider` as parameter. It is used to send pagination query parameters to the API.

#### current

You can pass the `current` page number to the `pagination` property.

```tsx
useSelect({
  pagination: {
    current: 2,
  },
});
```

#### pageSize

You can pass the `pageSize` to the `pagination` property.

```tsx
useSelect({
  pagination: {
    pageSize: 20,
  },
});
```

#### mode

It can be `"off"`, `"client"` or `"server"`. It is used to determine whether to use server-side pagination or not.

```tsx
useSelect({
  pagination: {
    mode: "off",
  },
});
```

### defaultValueQueryOptions

When the `defaultValue` property is given, the `useMany` data hook is called for the selected records. `defaultValueQueryOptions` allows you to change the options of this query.

If `defaultValue` property is not given, the values given in the `queryOptions` will be used instead.

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

### onSearch

`onSearch` allows the addittion of `AutoComplete` to the `options`.

<OnSearchLivePreview />

If `onSearch` is used, it will override the existing `filters`.

> For more information, refer to the [`CrudFilters` interface documentation &#8594](/core/docs/core/interface-references#crudfilters)

#### Client-side filtering

Sometimes, you may want to filter the options on the client-side. You can do this by passing the `onSearch` function as `undefined` and setting `filterOption` to `true`. You can also set `optionFilterProp` to `label` or `value` to filter the options by label or value respectively.

```tsx
const { selectProps } = useSelect({
  resource: "categories",
});

<Select
  {...selectProps}
  onSearch={undefined}
  filterOption={true}
  optionFilterProp="label" // or "value"
/>;
```

### meta

`meta` is a special property that can be used to pass additional information to data provider methods for the following purposes:

- Customizing the data provider methods for specific use cases.
- Generating GraphQL queries using plain JavaScript Objects (JSON).

In the following example, we pass the `headers` property in the `meta` object to the `create` method. With similar logic, you can pass any properties to specifically handle the data provider methods.

```tsx
useSelect({
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

> For more information, refer to the [`meta` section of the General Concepts documentation &#8594](/core/docs/guides-concepts/general-concepts/#meta-concept)

### dataProviderName

If there is more than one `dataProvider`, you can specify which one to use by passing the `dataProviderName` prop. It is useful when you have different data providers for different resources.

```tsx
useSelect({
  dataProviderName: "second-data-provider",
});
```

### successNotification

> [`NotificationProvider`](/core/docs/notification/notification-provider) is required for this prop to work.

After data is fetched successfully, `useSelect` can call the `open` function from `NotificationProvider` to show a success notification. This prop allows you to customize the success notification message

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

### errorNotification

> [`NotificationProvider`](/core/docs/notification/notification-provider) is required for this prop to work.

After data fetching is failed, `useSelect` will call the `open` function from `NotificationProvider` to show an error notification. This prop allows you to customize the error notification message

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

### liveMode

> [`LiveProvider`](/core/docs/realtime/live-provider) is required for this prop to work.

This property determines whether to update data automatically ("auto") or not ("manual") if a related live event is received. It can be used to update and show data in Realtime throughout your app.

```tsx
useSelect({
  liveMode: "auto",
});
```

> For more information, refer to the [Live / Realtime documentation &#8594](/core/docs/realtime/live-provider#livemode)

### onLiveEvent

> [`LiveProvider`](/core/docs/realtime/live-provider) is required for this prop to work.

The callback function that is executed when new events from a subscription are arrived.

```tsx
useSelect({
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
const { overtime } = useSelect({
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

### How to add search to options (Autocomplete)?

[`onSearch`](/core/docs/data/hooks/use-select#onsearch) is a function that is used to set the search value. It is useful when you want to search for a specific value. A simple example of this is shown below.

<OnSearchLivePreview />

### How to ensure `defaultValue` is included in the options?

In some cases we only have `id`, it may be necessary to show it selected in the selection box. This hook sends the request via [`useMany`](/core/docs/data/hooks/use-many), gets the data and mark as selected.

<DefaultValueLivePreview />

### How to change the `label` and `value` properties in options?

[`optionLabel` and `optionValue`](/core/docs/data/hooks/use-select#optionlabel-and-optionvalue) are used to change the value of your options.
The default values are `optionsLabel="title"` and `optionsValue="id"`.

To change to `name` and `categoryId`;

```tsx
useSelect({
  optionLabel: "name",
  optionValue: "categoryId",
});
```

### Can I create the options manually?

Sometimes it may not be enough to create `optionLabel` and `optionValue` options. In this case we create options with `query`.

```tsx
const { query } = useSelect();

const options = query.data?.data.map((item) => ({
  label: item.title,
  value: item.id,
}));

return <Select options={options} />;
```

### How do I use it with `CRUD` components and `useForm`?

<CrudLivePreview />

## API Reference

### Properties

<PropsTable module="@refinedev/antd/useSelect"  />

### Type Parameters

| Property     | Description                                                                                                                                                         | Type                       | Default                    |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- | -------------------------- |
| TQueryFnData | Result data returned by the query function. Extends [`BaseRecord`][baserecord]                                                                                      | [`BaseRecord`][baserecord] | [`BaseRecord`][baserecord] |
| TError       | Custom error object that extends [`HttpError`][httperror]                                                                                                           | [`HttpError`][httperror]   | [`HttpError`][httperror]   |
| TData        | Result data returned by the `select` function. Extends [`BaseRecord`][baserecord]. If not specified, the value of `TQueryFnData` will be used as the default value. | [`BaseRecord`][baserecord] | `TQueryFnData`             |

### Return values

| Property                   | Description                                    | Type                                                                                          |
| -------------------------- | ---------------------------------------------- | --------------------------------------------------------------------------------------------- |
| selectProps                | Ant design Select props                        | [`Select`](https://ant.design/components/select/#API)                                         |
| query                      | Result of the query of a record                | [`QueryObserverResult<{ data: TData }>`](https://react-query.tanstack.com/reference/useQuery) |
| defaultValueQuery          | Result of the query of a `defaultValue` record | [`QueryObserverResult<{ data: TData }>`](https://react-query.tanstack.com/reference/useQuery) |
| defaultValueQueryOnSuccess | Default value onSuccess method                 | `() => void`                                                                                  |
| overtime                   | Overtime loading props                         | `{ elapsedTime?: number }`                                                                    |

## Example

<CodeSandboxExample path="field-antd-use-select-basic" />

## Infinite Loading Example

<CodeSandboxExample path="field-antd-use-select-infinite" />

[baserecord]: /core/docs/core/interface-references#baserecord
[httperror]: /core/docs/core/interface-references#httperror
