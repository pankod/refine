import { List, EditButton, useTable, DeleteButton } from "@refinedev/antd";

import { Table, Space } from "antd";
import type { ICategory } from "../../interfaces";

export const CategoryList = () => {
  const { tableProps } = useTable<ICategory>();

  return (
    <List>
      <Table {...tableProps} rowKey="_id">
        <Table.Column dataIndex="title" title="Title" />
        <Table.Column dataIndex="description" title="Description" />
        <Table.Column
          title="Actions"
          dataIndex="_id"
          render={(value) => {
            return (
              <Space>
                <EditButton hideText size="small" recordItemId={value} />
                <DeleteButton hideText size="small" recordItemId={value} />
              </Space>
            );
          }}
        />
      </Table>
    </List>
  );
};
