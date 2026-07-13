import { List, useTable, getDefaultSortOrder } from "@refinedev/antd";
import { Table } from "antd";

import type { ICategory } from "../../interfaces";

export const CategoryList = () => {
  const { tableProps, sorters } = useTable<ICategory>();

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column<ICategory>
          dataIndex="id"
          title="ID"
          sorter
          defaultSortOrder={getDefaultSortOrder("id", sorters)}
        />
        <Table.Column<ICategory> dataIndex="title" title="Title" sorter />
      </Table>
    </List>
  );
};
