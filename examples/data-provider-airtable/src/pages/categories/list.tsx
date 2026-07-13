import {
  List,
  useTable,
  EditButton,
  DeleteButton,
  BooleanField,
} from "@refinedev/antd";

import { Table, Space } from "antd";

import type { ICategory } from "../../interfaces";

export const CategoryList = () => {
  const { tableProps } = useTable<ICategory>();

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="ID" />
        <Table.Column dataIndex="title" title="Title" />
        <Table.Column
          dataIndex="active"
          title="Active"
          render={(value) => {
            return <BooleanField value={value} />;
          }}
        />
        <Table.Column<ICategory>
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
