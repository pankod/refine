import { getDefaultFilter } from "@refinedev/core";

import {
  List,
  useTable,
  EditButton,
  ShowButton,
  DeleteButton,
  getDefaultSortOrder,
  FilterDropdown,
  useSelect,
  DateField,
} from "@refinedev/antd";

import { Table, Space, Select, Input } from "antd";

import type {
  GetPostCategoriesSelectQuery,
  GetPostsQuery,
} from "graphql/types";
import type { GetFieldsFromList } from "@refinedev/hasura";
import {
  POST_CATEGORIES_SELECT_QUERY,
  POSTS_QUERY,
  POST_DELETE_MUTATION,
} from "./queries";

export const PostList = () => {
  const { tableProps, filters, sorters } = useTable<
    GetFieldsFromList<GetPostsQuery>
  >({
    filters: {
      initial: [
        {
          field: "title",
          operator: "contains",
          value: "",
        },
      ],
    },

    meta: {
      gqlQuery: POSTS_QUERY,
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

  const { selectProps } = useSelect<
    GetFieldsFromList<GetPostCategoriesSelectQuery>
  >({
    resource: "categories",

    meta: {
      gqlQuery: POST_CATEGORIES_SELECT_QUERY,
    },

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
          sorter={{ multiple: 2 }}
          defaultSortOrder={getDefaultSortOrder("id", sorters)}
        />
        <Table.Column
          dataIndex="title"
          title="Title"
          sorter={{ multiple: 1 }}
          defaultFilteredValue={getDefaultFilter("title", filters, "contains")}
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Input />
            </FilterDropdown>
          )}
        />
        <Table.Column<GetFieldsFromList<GetPostsQuery>>
          dataIndex="category_id"
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
          render={(_, record) => record?.category?.title}
          defaultFilteredValue={getDefaultFilter("category_id", filters, "in")}
        />
        <Table.Column
          dataIndex="created_at"
          title="Created At"
          render={(value) => <DateField value={value} format="LLL" />}
          defaultSortOrder={getDefaultSortOrder("created_at", sorters)}
          sorter
        />
        <Table.Column<GetFieldsFromList<GetPostsQuery>>
          title="Actions"
          dataIndex="actions"
          render={(_, record) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record?.id} />
              <ShowButton hideText size="small" recordItemId={record?.id} />
              <DeleteButton
                hideText
                size="small"
                recordItemId={record?.id}
                meta={{
                  gqlMutation: POST_DELETE_MUTATION,
                }}
              />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
