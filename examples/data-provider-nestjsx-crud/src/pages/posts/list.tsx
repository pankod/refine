import {
  List,
  useTable,
  EditButton,
  ShowButton,
  DateField,
  getDefaultSortOrder,
} from "@refinedev/antd";

import { Table, Space } from "antd";

import type { IPost } from "../../interfaces";

export const PostList = () => {
  const { tableProps, sorters: sorter } = useTable<IPost>({
    sorters: {
      initial: [
        {
          field: "createdAt",
          order: "desc",
        },
      ],
    },
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="ID" />
        <Table.Column dataIndex="title" title="Title" />
        <Table.Column dataIndex={["category", "title"]} title="Category" />
        <Table.Column
          dataIndex="createdAt"
          title="Created At"
          key="createdAt"
          sorter
          defaultSortOrder={getDefaultSortOrder("createdAt", sorter)}
          render={(value) => <DateField value={value} format="LLL" />}
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
