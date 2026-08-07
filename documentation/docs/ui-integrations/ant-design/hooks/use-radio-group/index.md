---
title: "useRadioGroup Hook | Options, Patterns & Edge Cases in Refine v5"
display_title: "useRadioGroup"
sidebar_label: "useRadioGroup"
description: "Implement Use Radio Group in Refine v5. Learn the key steps. Learn integration patterns for data and allows for polished admin UIs. Hands-on examples included."
---

`useRadioGroup` hook allows you to manage an Ant Design [Radio.Group](https://ant.design/components/radio/#components-radio-demo-radiogroup-with-name) component when records in a resource needs to be used as radio options.

## Usage

We will demonstrate how to get data at `/languages` endpoint from the `https://api.fake-rest.refine.dev` REST API.

```ts title="https://api.fake-rest.refine.dev/languages"
{
  [
    {
      id: 1,
      title: "Turkish",
    },
    {
      id: 2,
      title: "English",
    },
    {
      id: 3,
      title: "German",
    },
  ];
}
```

```tsx title="pages/posts/create.tsx"
import { useRadioGroup } from "@refinedev/antd";
import { Form, Radio } from "antd";

export const PostCreate = () => {
  // highlight-start
  const { radioGroupProps } = useRadioGroup<ILanguage>({
    resource: "languages",
  });
  // highlight-end

  return (
    <Form>
      <Form.Item label="Languages" name="languages">
        // highlight-next-line
        <Radio.Group {...radioGroupProps} />
      </Form.Item>
    </Form>
  );
};

interface ILanguage {
  id: number;
  title: string;
}
```

<Image src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/hooks/useRadioGroup/basic-usage.png" alt="Radio group" />

All we have to do is pass the `radioGroupProps` it returns to the `<Radio.Group>` component.

`useRadioGroup` uses the `useList` hook for fetching data.

> For more information, refer to the [Refine Core's `useList` hook documentation &#8594](/core/docs/data/hooks/use-list/)

## Options

### resource

```tsx
const { radioGroupProps } = useRadioGroup({
  resource: "languages",
});
```

`resource` property determines API resource endpoint to fetch records from [`dataProvider`](/core/docs/data/data-provider/). It returns properly configured `options` values for radio buttons.

If you have multiple resources with the same name, you can pass the `identifier` instead of the `name` of the resource. It will only be used as the main matching key for the resource, data provider methods will still work with the `name` of the resource defined in the `<Refine/>` component.

> For more information, refer to the [`identifier` section of the `<Refine/>` component documentation &#8594](/core/docs/core/refine-component#identifier)

> For more information, refer to the [Ant Design's `Radio.Group` component documentation &#8594](https://ant.design/components/radio)

### defaultValue

```tsx
const { radioGroupProps } = useRadioGroup({
  resource: "languages",
  // highlight-next-line
  defaultValue: 1,
});
```

### selectedOptionsOrder

`selectedOptionsOrder` allows us to sort `selectedOptions` on `defaultValue`. It can be:

- `"in-place"`: sort `selectedOptions` at the bottom. It is by default.
- `"selected-first"`: sort `selectedOptions` at the top.

```tsx
const { radioGroupProps } = useRadioGroup({
  resource: "languages",
  // highlight-next-line
  defaultValue: 1,
  // highlight-next-line
  selectedOptionsOrder: "selected-first", // in-place | selected-first
});
```

The easiest way to selecting a default value for an radio button field is by passing in `defaultValue`.

### optionLabel and optionValue

```tsx
const { radioGroupProps } = useRadioGroup({
  resource: "languages",
  // highlight-start
  optionLabel: "title",
  optionValue: "id",
  // highlight-end
});
```

`optionLabel` and `optionValue` allows you to change the values and appearances of your options. Default values are `optionLabel = "title"` and `optionValue = "id"`.

These properties also support nested property access with [Object path](https://lodash.com/docs/4.17.15#get) syntax.

```tsx
const { options } = useRadioGroup({
  resource: "categories",
  // highlight-start
  optionLabel: "nested.title",
  optionValue: "nested.id",
  // highlight-end
});
```

It's also possible to pass function to these props. These functions will receive `item` argument.

```tsx
const { options } = useRadioGroup({
  optionLabel: (item) => `${item.firstName} ${item.lastName}`,
  optionValue: (item) => item.id,
});
```

### searchField

Can be used to specify which field will be searched with value given to `onSearch` function.

```tsx
const { onSearch } = useRadioGroup({ searchField: "name" });

onSearch("John"); // Searches by `name` field with value John.
```

By default, it uses `optionLabel`'s value, if `optionLabel` is a string. Uses `title` field otherwise.

```tsx
// When `optionLabel` is string.
const { onSearch } = useRadioGroup({ optionLabel: "name" });

onSearch("John"); // Searches by `name` field with value John.

// When `optionLabel` is function.
const { onSearch } = useRadioGroup({
  optionLabel: (item) => `${item.id} - ${item.name}`,
});

onSearch("John"); // Searches by `title` field with value John.
```

### filters

`filters` allows us to add filters while fetching the data. For example, if you want to list only the `titles` that are equal to "German":

```tsx
const { radioGroupProps } = useRadioGroup({
  resource: "languages",
  // highlight-start
  filters: [
    {
      field: "title",
      operator: "eq",
      value: "German",
    },
  ],
  // highlight-end
});
```

### sorters

`sorters` allows us to sort the `options`. For example, if you want to sort your list according to `title` by ascending:

```tsx
const { radioGroupProps } = useRadioGroup({
  resource: "languages",
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
const { radioGroupProps } = useRadioGroup({
  resource: "languages",
  // highlight-next-line
  fetchSize: 20,
});
```

### queryOptions

Passing the `queryOptions` property allows us to set the [useQuery](https://react-query.tanstack.com/reference/useQuery) options

```tsx
const { radioGroupProps } = useRadioGroup({
  resource: "languages",
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
const { radioGroupProps } = useRadioGroup({
  resource: "categories",
  // highlight-next-line
  pagination: { currentPage: 3, pageSize: 8 },
});
```

The listing will start from page 3, showing 8 records per page.

## API Reference

### Properties

<PropsTable module="@refinedev/antd/useRadioGroup"/>

### Type Parameters

| Property     | Description                                                                                                                                                         | Type                       | Default                    |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- | -------------------------- |
| TQueryFnData | Result data returned by the query function. Extends [`BaseRecord`][baserecord]                                                                                      | [`BaseRecord`][baserecord] | [`BaseRecord`][baserecord] |
| TError       | Custom error object that extends [`HttpError`][httperror]                                                                                                           | [`HttpError`][httperror]   | [`HttpError`][httperror]   |
| TData        | Result data returned by the `select` function. Extends [`BaseRecord`][baserecord]. If not specified, the value of `TQueryFnData` will be used as the default value. | [`BaseRecord`][baserecord] | `TQueryFnData`             |

### Return values

| Property        | Description                      | Type                                                                                          |
| --------------- | -------------------------------- | --------------------------------------------------------------------------------------------- |
| radioGroupProps | Ant design radio group props     | [`Radio Group`](https://ant.design/components/radio/#RadioGroup)                              |
| query           | Results of the query of a record | [`QueryObserverResult<{ data: TData }>`](https://react-query.tanstack.com/reference/useQuery) |

## Example

<CodeSandboxExample path="field-antd-use-radio-group" />

[baserecord]: /core/docs/core/interface-references#baserecord
[httperror]: /core/docs/core/interface-references#httperror
