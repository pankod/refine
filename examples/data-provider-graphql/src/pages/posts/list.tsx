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

import { Table, Space, Select } from "antd";

import { CATEGORIES_SELECT_QUERY, POSTS_LIST_QUERY } from "./queries";
import type {
  BlogPostsListQuery,
  CategoriesSelectQuery,
  GetFieldsFromList,
} from "graphql/types";

type IPost = GetFieldsFromList<BlogPostsListQuery>;

export const PostList = () => {
  const { tableProps, filters, sorters } = useTable<IPost>({
    meta: {
      gqlQuery: POSTS_LIST_QUERY,
    },

    queryOptions: {
      retry(failureCount, error) {
        if (error?.message.includes("Network Error") && failureCount <= 3)
          return true;
        return false;
      },
    },

    sorters: {
      initial: [
        {
          field: "id",
          order: "desc",
        },
      ],
    },
  });

  const { selectProps } = useSelect<GetFieldsFromList<CategoriesSelectQuery>>({
    resource: "categories",

    meta: {
      gqlQuery: CATEGORIES_SELECT_QUERY,
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
        />
        <Table.Column<IPost>
          dataIndex="categoryId"
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
          render={(_, record) => record.category.title}
          defaultFilteredValue={getDefaultFilter("categoryId", filters, "in")}
        />
        <Table.Column
          dataIndex="createdAt"
          title="Created At"
          render={(value) => <DateField value={value} format="LLL" />}
          defaultSortOrder={getDefaultSortOrder("createdAt", sorters)}
          sorter
        />
        <Table.Column<IPost>
          title="Actions"
          dataIndex="actions"
          render={(_, record) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.id} />
              <ShowButton hideText size="small" recordItemId={record.id} />
              <DeleteButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
