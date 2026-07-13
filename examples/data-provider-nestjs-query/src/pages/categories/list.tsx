import {
  List,
  useTable,
  EditButton,
  DateField,
  getDefaultSortOrder,
  DeleteButton,
} from "@refinedev/antd";
import type { GetFieldsFromList } from "@refinedev/nestjs-query";

import { Space, Table } from "antd";

import { CATEGORIES_LIST_QUERY } from "./queries";
import type { CategoriesListQuery } from "graphql/types";

type ICategory = GetFieldsFromList<CategoriesListQuery>;

export const CategoryList = () => {
  const { tableProps, sorters } = useTable<ICategory>({
    meta: {
      gqlQuery: CATEGORIES_LIST_QUERY,
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

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="ID" />
        <Table.Column dataIndex="title" title="Title" />
        <Table.Column
          dataIndex="createdAt"
          title="Created At"
          render={(value) => <DateField value={value} format="LLL" />}
          defaultSortOrder={getDefaultSortOrder("createdAt", sorters)}
          sorter
        />
        <Table.Column<ICategory>
          title="Actions"
          dataIndex="actions"
          render={(_, record) => (
            <Space>
              <EditButton size="small" hideText recordItemId={record.id} />
              <DeleteButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
