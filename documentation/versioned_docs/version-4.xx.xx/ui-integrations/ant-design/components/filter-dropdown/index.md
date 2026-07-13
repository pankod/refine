---
title: "Ant Design FilterDropdown | Refine v4 Table Filters"
display_title: "<FilterDropdown />"
sidebar_label: "<FilterDropdown />"
description: "Learn how to implement custom table filters using the FilterDropdown component. Official guide to advanced data filtering in Refine v4 with Ant Design."
---

## Usage

`<FilterDropdown>` is a helper component for [filter dropdowns in Ant Design's `<Table>` components.](https://ant.design/components/table/#components-table-demo-custom-filter-panel)

It serves as a bridge by synchronizing between its children's input value and `<Table>`'s filter values.

```tsx title="components/pages/postList.tsx"
import {
  List,
  // highlight-start
  FilterDropdown,
  // highlight-end
  useTable,
} from "@refinedev/antd";
import { Table, Select } from "antd";

const PostList: React.FC = (props) => {
  const { tableProps } = useTable<IPost>();

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="ID" />
        <Table.Column
          dataIndex={["category", "id"]}
          title="Category"
          key="category.id"
          // highlight-start
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Select
                mode="multiple"
                placeholder="Select Category"
                options={[
                  { label: "Ergonomic", value: "1" },
                  { label: "Island", value: "2" },
                ]}
              />
            </FilterDropdown>
          )}
          // highlight-end
        />
      </Table>
    </List>
  );
};

interface IPost {
  id: number;
  category: {
    id: number;
  };
}
```

Selecting categories from dropdown will send the id's of categories as filtering values to **Table** and data will be updated by Refine under the hood.

`<FilterDropdown>` will put two buttons for filtering and clearing filter actions.

<Image src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/category_filter-dropdown.png" alt="Show record action" />

We added category options for `<Select>` manually for the sake of simplicity but the [useSelect](/core/docs/ui-integrations/ant-design/hooks/use-select) hook can be used to populate the props of `<Select>`

```tsx
const { selectProps: categorySelectProps } = useSelect<ICategory>({
  resource: "categories",
  optionLabel: "title",
  optionValue: "id",
});

<Select {...categorySelectProps} />;
```

## Properties

### selectedKeys, setSelectedKeys, confirm, clearFilters

These are to be passed from [`<Table.Column>`'s filterDropdown](https://ant.design/components/table/#Column) prop.

### mapValue

The `mapValue` function is a utility function used to transform the `selectedKeys` based on certain events.

```ts
function mapValue(selectedKeys: React.Key[], event: "onChange" | "value"): any;
```

- `selectedKeys`: The selected keys from the dropdown.
- `event`: The event that triggered the `mapValue` function. It can be either `onChange` or `value`.
  - `onChange`: The event that is triggered when the value of the dropdown changes. It is used to map the value to the format that the Refine expects(data provider, syncWithLocation etc.).
  - `value`: When the value needs to be mapped for the child component.

For example when using [`useSelect`](/core/docs/ui-integrations/ant-design/hooks/use-select/) for [`<Select />`](https://ant.design/components/select/) component, in which case, the values must be mapped to `number`s using `mapValue`.

```tsx
import { getDefaultFilter } from "@refinedev/core";
import { useTable, FilterDropdown, useSelect } from "@refinedev/antd";
import { Table, Select } from "antd";

const { tableProps, filters } = useTable<IPost>({
  filters: {
    initial: [
      {
        field: "category.id",
        value: [1, 2],
        operator: "in",
      },
    ],
  },
});

const { selectProps: categorySelectProps } = useSelect<ICategory>({
  resource: "categories",
  optionLabel: "title",
  optionValue: "id",
  defaultValue: getDefaultFilter("category.id", filters, "in"),
});

<Table>
  <Table.Column dataIndex="id" title="ID" />
  <Table.Column
    dataIndex={["category", "id"]}
    title="Category"
    key="category.id"
    filterDropdown={(props) => (
      <FilterDropdown
        {...props}
        mapValue={(selectedKeys) =>
          selectedKeys.map((i) => parseInt(i.toString()))
        }
      >
        <Select
          style={{ minWidth: 200 }}
          mode="multiple"
          placeholder="Select Category"
          {...categorySelectProps}
        />
      </FilterDropdown>
    )}
    defaultFilteredValue={getDefaultFilter("category.id", filters, "in")}
  />
</Table>;
```

#### rangePickerFilterMapper

A more complex example is using a filter dropdown with a date picker.

Imagine you need to filter data based on a date range where Refine's data provider expects dates in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format, but Ant Design's [`<DatePicker.RangePicker />`](https://ant.design/components/date-picker) uses Dayjs objects. To solve this, use the `mapValue` and [`rangePickerFilterMapper`](https://github.com/refinedev/refine/blob/main/packages/antd/src/definitions/filter-mappers/index.ts) utility function to convert `selectedKeys` to satisfy both the data provider and `<DatePicker.RangePicker />`.

```tsx
import { getDefaultFilter } from "@refinedev/core";
import {
  DateField,
  FilterDropdown,
  rangePickerFilterMapper,
  useTable,
} from "@refinedev/antd";
import { Table, DatePicker } from "antd";

export const Posts = () => {
  const { tableProps, filters } = useTable({
    filters: {
      initial: [
        {
          field: "created_at",
          value: ["2022-01-01", "2022-01-31"],
          operator: "between",
        },
      ],
    },
  });

  return (
    <Table {...tableProps} rowKey="id">
      <Table.Column dataIndex="id" title="ID" />
      <Table.Column dataIndex="title" title="Title" />
      <Table.Column
        dataIndex="createdAt"
        title="Created At"
        filterDropdown={(props) => (
          <FilterDropdown
            {...props}
            mapValue={(selectedKeys, event) => {
              return rangePickerFilterMapper(selectedKeys, event);
            }}
          >
            <DatePicker.RangePicker />
          </FilterDropdown>
        )}
        defaultFilteredValue={getDefaultFilter(
          "created_at",
          filters,
          "between",
        )}
      />
    </Table>
  );
};
```

Let's closer look at the [`rangePickerFilterMapper`](https://github.com/refinedev/refine/blob/main/packages/antd/src/definitions/filter-mappers/index.ts) function source code to understand how it works.

when the `event` is:

- `"value"`: It converts the `selectedKeys` to Dayjs objects to be used in the `<DatePicker.RangePicker />` component.
- `"onChange"`, It converts the Dayjs objects to ISO 8601 string format to be used in the Refine(data-provider, syncWithLocation etc.) filter.

```ts
import type {
  FilterDropdownProps,
  MapValueEvent,
} from "@components/table/components";
import dayjs from "dayjs";

export const rangePickerFilterMapper = (
  selectedKeys: FilterDropdownProps["selectedKeys"],
  event: MapValueEvent,
) => {
  if (!selectedKeys) {
    return selectedKeys;
  }

  if (event === "value") {
    return selectedKeys.map((key) => {
      if (typeof key === "string") {
        return dayjs(key);
      }

      return key;
    });
  }

  if (event === "onChange") {
    if (selectedKeys.every(dayjs.isDayjs)) {
      return selectedKeys.map((date: any) => dayjs(date).toISOString());
    }
  }

  return selectedKeys;
};
```

:::simple Good to know

If [syncWithLocation](/core/docs/core/refine-component#syncwithlocation) is enabled, on page refresh, the filter values will be type of `string` since they will be parsed from URL. This might produce some incompatibility if data for filter input comes from an API and it's not type of `string`.

`getDefaultFilter` finds filter values for a given column from the given filters. In the example, `filters` passed to `getDefaultFilter` includes filter values from the URL since it comes from `useTable`.

:::

<PropsTable module="@refinedev/antd/FilterDropdown"/>

## Example

<CodeSandboxExample path="table-antd-use-table" />
