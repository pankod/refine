import { getDefaultFilter } from "@refinedev/core";

import {
  List,
  useTable,
  EditButton,
  ShowButton,
  getDefaultSortOrder,
  FilterDropdown,
  useSelect,
  TagField,
} from "@refinedev/antd";

import { Table, Space, Select, Radio } from "antd";

import type { IPost, ICategory } from "../../interfaces";

export const PostList = () => {
  const { tableProps, sorters, filters } = useTable<IPost>({
    meta: {
      select: "*, categories(title)",
    },

    sorters: {
      initial: [
        {
          field: "id",
          order: "asc",
        },
      ],
    },
  });

  const { selectProps } = useSelect<ICategory>({
    resource: "categories",

    pagination: {
      mode: "server",
    },
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column
          key="id"
          dataIndex="id"
          title="ID"
          sorter
          defaultSortOrder={getDefaultSortOrder("id", sorters)}
        />
        <Table.Column
          key="title"
          dataIndex="title"
          title="Title"
          sorter
          defaultSortOrder={getDefaultSortOrder("title", sorters)}
        />
        <Table.Column
          key="categoryId"
          dataIndex={["categories", "title"]}
          title="Category"
          defaultSortOrder={getDefaultSortOrder("categories.title", sorters)}
          defaultFilteredValue={getDefaultFilter("categoryId", filters, "in")}
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
        />
        <Table.Column<IPost>
          title="Actions"
          dataIndex="actions"
          render={(_, record) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.id} />
              <ShowButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
