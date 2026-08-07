import { useMany, getDefaultFilter } from "@refinedev/core";

import {
  List,
  FilterDropdown,
  TagField,
  useTable,
  getDefaultSortOrder,
  useSelect,
} from "@refinedev/antd";

import type { FilterDropdownProps } from "antd/lib/table/interface";
import { Table, Radio, Select, Input } from "antd";

import type { ICategory, IPost } from "../../interfaces";

export const PostList = () => {
  const {
    tableProps,
    sorters: sorter,
    filters,
  } = useTable<IPost>({
    syncWithLocation: true,

    filters: {
      initial: [
        {
          field: "title",
          operator: "contains",
          value: "",
        },
        {
          field: "status",
          operator: "eq",
          value: "draft",
        },
        {
          field: "category.id",
          operator: "in",
          value: [1, 2],
        },
      ],
    },

    sorters: {
      initial: [
        {
          field: "title",
          order: "asc",
        },
      ],
    },
  });

  const categoryIds =
    tableProps.dataSource?.map((p) => p.category.id.toString()) || [];
  const {
    result: data,
    query: { isFetching },
  } = useMany<ICategory>({
    resource: "categories",
    ids: categoryIds,
    queryOptions: {
      enabled: categoryIds.length > 0,
    },
  });

  const { selectProps } = useSelect<ICategory>({
    resource: "categories",
    optionLabel: "title",
    optionValue: "id",
    defaultValue: getDefaultFilter("category.id", filters, "in"),

    pagination: {
      mode: "server",
    },
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column
          dataIndex="id"
          title="ID"
          sorter
          defaultSortOrder={getDefaultSortOrder("id", sorter)}
        />
        <Table.Column
          dataIndex="title"
          title="Title"
          sorter={{ multiple: 2 }}
          defaultSortOrder={getDefaultSortOrder("title", sorter)}
          filterDropdown={(props: FilterDropdownProps) => (
            <FilterDropdown {...props}>
              <Input />
            </FilterDropdown>
          )}
        />
        <Table.Column
          dataIndex="content"
          title="Content"
          sorter={{ multiple: 1 }}
          defaultSortOrder={getDefaultSortOrder("content", sorter)}
        />
        <Table.Column
          dataIndex={["category", "id"]}
          title="Category"
          render={(value) => {
            if (isFetching) return "loading...";

            return data?.data.find((p) => p.id === value)?.title;
          }}
          filterDropdown={(props: FilterDropdownProps) => (
            <FilterDropdown
              {...props}
              mapValue={(selectedKeys) =>
                selectedKeys.map((i) => Number.parseInt(i.toString()))
              }
            >
              <Select
                style={{ minWidth: 200 }}
                mode="multiple"
                {...selectProps}
              />
            </FilterDropdown>
          )}
          defaultFilteredValue={getDefaultFilter("category.id", filters, "in")}
        />
        <Table.Column
          dataIndex="status"
          title="Status"
          render={(value: string) => <TagField value={value} />}
          filterDropdown={(props: FilterDropdownProps) => (
            <FilterDropdown {...props}>
              <Radio.Group>
                <Radio value="published">Published</Radio>
                <Radio value="draft">Draft</Radio>
                <Radio value="rejected">Rejected</Radio>
              </Radio.Group>
            </FilterDropdown>
          )}
          defaultFilteredValue={getDefaultFilter("status", filters)}
        />
      </Table>
    </List>
  );
};
