import { getDefaultFilter } from "@refinedev/core";

import {
  List,
  TextField,
  EditButton,
  ShowButton,
  FilterDropdown,
  useTable,
  DeleteButton,
  TagField,
  useSelect,
  getDefaultSortOrder,
} from "@refinedev/antd";

import { Table, Space, Input, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import type { IPost } from "../../interfaces";

export const PostList = () => {
  const { tableProps, filters, sorters } = useTable<IPost>({
    syncWithLocation: true,

    sorters: {
      initial: [
        {
          field: "_createdAt",
          order: "desc",
        },
      ],
    },

    filters: {
      initial: [
        {
          field: "title",
          operator: "contains",
          value: null,
        },
        {
          field: "categories[]._ref",
          operator: "contains",
          value: null,
        },
      ],
    },
  });

  const { selectProps: selectPropsCategory, query: queryResultCategory } =
    useSelect({
      resource: "category",
      optionLabel: "title",
      optionValue: "_id",
      pagination: {
        mode: "off",
      },
    });

  return (
    <List>
      <Table
        {...tableProps}
        loading={tableProps.loading || queryResultCategory.isLoading}
        rowKey="_id"
      >
        <Table.Column dataIndex="_id" title="ID" />
        <Table.Column
          dataIndex="title"
          title="Title"
          filterIcon={<SearchOutlined />}
          defaultFilteredValue={getDefaultFilter("title", filters, "contains")}
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Input placeholder="Search in title" />
            </FilterDropdown>
          )}
        />
        <Table.Column
          dataIndex="slug"
          title="Slug"
          render={(value) => {
            return <TextField value={value.current} />;
          }}
        />
        <Table.Column<IPost>
          dataIndex="categories[]._ref"
          title="Category"
          render={(_, record) => {
            if (queryResultCategory.isLoading) return null;

            const categoryIds = record?.categories?.map(
              (category) => category._ref,
            );

            const categories = selectPropsCategory?.options?.filter(
              (category) =>
                categoryIds?.includes(category?.value?.toString() || ""),
            );

            if (!categories?.length) return "-";

            return (
              <Space>
                {categories?.map((category) => (
                  <TagField key={category.value} value={category.label} />
                ))}
              </Space>
            );
          }}
          defaultFilteredValue={getDefaultFilter(
            "categories._ref",
            filters,
            "contains",
          )}
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Select
                {...selectPropsCategory}
                style={{ width: "200px" }}
                placeholder="Select Category"
              />
            </FilterDropdown>
          )}
        />
        <Table.Column
          dataIndex="_updatedAt"
          title="Updated At"
          render={(value: string) => {
            const date = new Date(value);
            return <TextField value={date.toLocaleString()} />;
          }}
          sorter
          defaultSortOrder={getDefaultSortOrder("_updatedAt", sorters)}
        />
        <Table.Column
          title="Actions"
          dataIndex="_id"
          render={(value) => {
            return (
              <Space>
                <EditButton hideText size="small" recordItemId={value} />
                <ShowButton hideText size="small" recordItemId={value} />
                <DeleteButton hideText size="small" recordItemId={value} />
              </Space>
            );
          }}
        />
      </Table>
    </List>
  );
};
