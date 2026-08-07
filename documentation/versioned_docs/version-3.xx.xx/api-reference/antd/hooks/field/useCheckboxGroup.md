---
id: useCheckboxGroup
title: useCheckboxGroup
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
import { Form, Checkbox, useCheckboxGroup } from "@pankod/refine-antd";

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
`useCheckboxGroup` uses the `useList` hook for fetching data. [Refer to `useList` hook for details. &#8594](/core/docs/3.xx.xx/api-reference/core/hooks/data/useList)

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/hooks/useCheckboxGroup/basic.png" alt="Tags" />

## Options

### `resource`

```tsx
const { checkboxGroupProps } = useCheckboxGroup({
  resource: "tags",
});
```

`resource` property determines which? API resource endpoint to fetch records from [`dataProvider`](/core/docs/3.xx.xx/api-reference/core/providers/data-provider). It returns properly configured `options` values for checkboxes.

[Refer to Ant Design Checkbox.Group component documentation for detailed info for `options`. &#8594](https://ant.design/components/checkbox)

### `defaultValue`

```tsx
const { selectProps } = useCheckboxGroup({
  resource: "languages",
  // highlight-next-line
  defaultValue: [1, 2],
});
```

The easiest way to selecting a default values for checkbox fields is by passing in `defaultValue`.

### `optionLabel` and `optionValue`

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

:::tip

Supports use with `optionLabel` and `optionValue` [Object path](https://lodash.com/docs/4.17.15#get) syntax.

```tsx
const { options } = useSelect({
  resource: "categories",
  // highlight-start
  optionLabel: "nested.title",
  optionValue: "nested.id",
  // highlight-end
});
```

:::

### `filters`

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

It allows us to add some filters while fetching the data. For example, if you want to list only the `titles` that are equal to `"Driver Deposit"` records.

### `sort`

```tsx
const { checkboxGroupProps } = useCheckboxGroup({
  resource: "tags",
  // highlight-start
  sort: [
    {
      field: "title",
      order: "asc",
    },
  ],
  // highlight-end
});
```

It allows us to sort the `options`. For example, if you want to sort your list according to `title` by ascending.

### `fetchSize`

```tsx
const { selectProps } = useCheckboxGroup({
  resource: "languages",
  // highlight-next-line
  fetchSize: 20,
});
```

Amount of records to fetch in checkboxes.

### `queryOptions`

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

[useQuery](https://react-query.tanstack.com/reference/useQuery) options can be set by passing `queryOptions` property.

### `pagination`

Allows us to set page and items per page values.

For example imagine that we have 1000 post records:

```ts
const { selectProps } = useSelect({
  resource: "categories",
  // highlight-next-line
  pagination: { current: 3, pageSize: 8 },
});
```

> Listing will start from page 3 showing 8 records.

## API Reference

### Properties

<PropsTable module="@pankod/refine-antd/useCheckboxGroup"/>

## Example

<CodeSandboxExample path="field-antd-use-checkbox-group" />
