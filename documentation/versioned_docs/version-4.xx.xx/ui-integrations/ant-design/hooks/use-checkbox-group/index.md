---
title: "useCheckboxGroup Hook | Ant Design & Refine v4 Guide"
display_title: "useCheckboxGroup"
sidebar_label: "useCheckboxGroup"
description: "Efficiently manage checkbox groups in your forms. Learn how the useCheckboxGroup hook syncs Ant Design components with Refine v4 data providers."
---

`useCheckboxGroup` hook allows you to manage an Ant Design [Checkbox.Group](https://ant.design/components/checkbox/#components-checkbox-demo-group) component when records in a resource needs to be used as checkbox options.

## Usage

We will demonstrate how to get data at the `/tags` endpoint from the `https://api.fake-rest.refine.dev` REST API.

```ts title="https://api.fake-rest.refine.dev/tags"
{
  [
    {
      id: 1,
      title: "Driver Deposit",
    },
    {
      id: 2,
      title: "Index Compatible Synergistic",
    },
    {
      id: 3,
      title: "Plum",
    },
  ];
}
```

```tsx title="pages/posts/create.tsx"
import { useCheckboxGroup } from "@refinedev/antd";
import { Form, Checkbox } from "antd";

export const PostCreate: React.FC = () => {
  // highlight-start
  const { checkboxGroupProps } = useCheckboxGroup<ITag>({
    resource: "tags",
  });
  // highlight-end

  return (
    <Form>
      <Form.Item label="Tags" name="tags">
        // highlight-next-line
        <Checkbox.Group {...checkboxGroupProps} />
      </Form.Item>
    </Form>
  );
};

interface ITag {
  id: number;
  title: string;
}
```

<br/>

All we have to do is pass the `checkboxGroupProps` it returns to the `<Checkbox.Group>` component.
`useCheckboxGroup` uses the `useList` hook for fetching data.

<Image src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/hooks/useCheckboxGroup/basic.png" alt="Tags" />

> For more information, refer to the [`useList` documentation &#8594](/core/docs/data/hooks/use-list)

## Options

### resource

```tsx
const { checkboxGroupProps } = useCheckboxGroup({
  resource: "tags",
});
```

`resource` property determines which API resource endpoint to fetch records from [`dataProvider`](/core/docs/data/data-provider). It returns properly configured `options` values for checkboxes.

If you have multiple resources with the same name, you can pass the `identifier` instead of the `name` of the resource. It will only be used as the main matching key for the resource, data provider methods will still work with the `name` of the resource defined in the `<Refine/>` component.

> For more information, refer to the [`identifier` section of the `<Refine/>` component documentation &#8594](/core/docs/core/refine-component#identifier)

> For more information, refer to the [Ant Design's Checkbox.Group component documentation &#8594](https://ant.design/components/checkbox)

### defaultValue

```tsx
const { selectProps } = useCheckboxGroup({
  resource: "languages",
  // highlight-next-line
  defaultValue: [1, 2],
});
```

### selectedOptionsOrder

`selectedOptionsOrder` allows us to sort `selectedOptions` on `defaultValue`. It can be:

- `"in-place"`: sort `selectedOptions` at the bottom. It is by default.
- `"selected-first"`: sort `selectedOptions` at the top.

```tsx
const { selectProps } = useCheckboxGroup({
  resource: "languages",
  // highlight-next-line
  defaultValue: [1, 2],
  // highlight-next-line
  selectedOptionsOrder: "selected-first", // in-place | selected-first
});
```

The easiest way to select default values for checkbox fields is by passing in `defaultValue`.

### optionLabel and optionValue

```tsx
const { checkboxGroupProps } = useCheckboxGroup({
  resource: "tags",
  // highlight-start
  optionLabel: "title",
  optionValue: "id",
  // highlight-end
});
```

`optionLabel` and `optionValue` allows you to change the values and appearances of your options. Default values are `optionLabel = "title"` and `optionValue = "id"`.

These properties also support nested property access with [Object path](https://lodash.com/docs/4.17.15#get) syntax.

```tsx
const { options } = useCheckboxGroup({
  resource: "categories",
  // highlight-start
  optionLabel: "nested.title",
  optionValue: "nested.id",
  // highlight-end
});
```

It's also possible to pass function to these props. These functions will receive `item` argument.

```tsx
const { options } = useCheckboxGroup({
  optionLabel: (item) => `${item.firstName} ${item.lastName}`,
  optionValue: (item) => item.id,
});
```

### searchField

Can be used to specify which field will be searched with value given to `onSearch` function.

```tsx
const { onSearch } = useCheckboxGroup({ searchField: "name" });

onSearch("John"); // Searches by `name` field with value John.
```

By default, it uses `optionLabel`'s value, if `optionLabel` is a string. Uses `title` field otherwise.

```tsx
// When `optionLabel` is string.
const { onSearch } = useCheckboxGroup({ optionLabel: "name" });

onSearch("John"); // Searches by `name` field with value John.

// When `optionLabel` is function.
const { onSearch } = useCheckboxGroup({
  optionLabel: (item) => `${item.id} - ${item.name}`,
});

onSearch("John"); // Searches by `title` field with value John.
```

### filters

`filters` allows us to add filters while fetching the data. For example, if you want to list only the `titles` that are equal to "Driver Deposit":

```tsx
const { checkboxGroupProps } = useCheckboxGroup({
  resource: "tags",
  // highlight-start
  filters: [
    {
      field: "title",
      operator: "eq",
      value: "Driver Deposit",
    },
  ],
  // highlight-end
});
```

### sorters

`sorters` allows us to sort the `options`. For example, if you want to sort your list according to `title` by ascending:

```tsx
const { checkboxGroupProps } = useCheckboxGroup({
  resource: "tags",
  // highlight-start
  sorters: [
    {
      field: "title",
      order: "asc",
    },
  ],
  // highlight-end
});
```

### fetchSize

`fetchSize` is the amount of records to fetch in checkboxes.

```tsx
const { selectProps } = useCheckboxGroup({
  resource: "languages",
  // highlight-next-line
  fetchSize: 20,
});
```

### queryOptions

Passing the `queryOptions` property allows us to set the [useQuery](https://react-query.tanstack.com/reference/useQuery) options

```tsx
const { checkboxGroupProps } = useCheckboxGroup({
  resource: "tags",
  // highlight-start
  queryOptions: {
    onError: () => {
      console.log("triggers when on query return Error");
    },
  },
  // highlight-end
});
```

### pagination

`pagination` allows us to set page and items per page values.

For example, lets say that we have 1000 post records:

```ts
const { selectProps } = useCheckboxGroup({
  resource: "categories",
  // highlight-next-line
  pagination: { current: 3, pageSize: 8 },
});
```

The listing will start from page 3, showing 8 records per page.

### ~~sort~~ <PropTag deprecated />

Use `sorters` instead.

## API Reference

### Properties

<PropsTable module="@refinedev/antd/useCheckboxGroup"/>

### Type Parameters

| Property     | Description                                                                                                                                                         | Type                       | Default                    |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- | -------------------------- |
| TQueryFnData | Result data returned by the query function. Extends [`BaseRecord`][baserecord]                                                                                      | [`BaseRecord`][baserecord] | [`BaseRecord`][baserecord] |
| TError       | Custom error object that extends [`HttpError`][httperror]                                                                                                           | [`HttpError`][httperror]   | [`HttpError`][httperror]   |
| TData        | Result data returned by the `select` function. Extends [`BaseRecord`][baserecord]. If not specified, the value of `TQueryFnData` will be used as the default value. | [`BaseRecord`][baserecord] | `TQueryFnData`             |

## Example

<CodeSandboxExample path="field-antd-use-checkbox-group" />

[baserecord]: /core/docs/core/interface-references#baserecord
[httperror]: /core/docs/core/interface-references#httperror

```

```
