import { getDefaultFilter } from "@refinedev/core";

import {
  List,
  useTable,
  getDefaultSortOrder,
  FilterDropdown,
  useSelect,
  DateField,
  EditButton,
  DeleteButton,
} from "@refinedev/antd";

import { Table, Select, Space } from "antd";

import type { IPost } from "../../interfaces";

export const PostList = () => {
  const {
    tableProps,
    sorters: sorter,
    filters,
  } = useTable<IPost>({
    sorters: {
      initial: [
        {
          field: "id",
          order: "desc",
        },
      ],
    },
  });

  const { selectProps } = useSelect({
    resource: "categories",
    optionLabel: "title",
    optionValue: "id",
    defaultValue: getDefaultFilter("category.id", filters),

    pagination: {
      mode: "server",
    },
  });

  return (
    <List>
      <Table
        {...tableProps}
        rowKey="id"
        pagination={{
          ...tableProps.pagination,
        }}
      >
        <Table.Column
          dataIndex="id"
          key="id"
          title="ID"
          defaultSortOrder={getDefaultSortOrder("id", sorter)}
          sorter
        />
        <Table.Column
          dataIndex="title"
          key="title"
          title="Title"
          defaultSortOrder={getDefaultSortOrder("title", sorter)}
          sorter
        />
        <Table.Column
          key="category.id"
          dataIndex={["category", "title"]}
          title="Category"
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Select
                style={{ minWidth: 200 }}
                mode="multiple"
                placeholder="Select Category"
                {...selectProps}
              />
            </FilterDropdown>
          )}
          defaultFilteredValue={getDefaultFilter("category.id", filters)}
        />
        <Table.Column
          dataIndex="created_at"
          key="created_at"
          title="Created At"
          render={(value) => <DateField value={value} format="LLL" />}
          defaultSortOrder={getDefaultSortOrder("created_at", sorter)}
          sorter
        />
        <Table.Column<{ id: string }>
          title="Actions"
          dataIndex="actions"
          render={(_, record) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.id} />
              <DeleteButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
