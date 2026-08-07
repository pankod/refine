import {
  List,
  useTable,
  EditButton,
  ShowButton,
  getDefaultSortOrder,
  TagField,
} from "@refinedev/antd";
import { Table, Space } from "antd";

import type { IPost } from "../../interfaces";

export const PostList = () => {
  const { tableProps, sorters } = useTable<IPost>({
    sorters: {
      initial: [
        {
          field: "$createdAt",
          order: "asc",
        },
      ],
    },
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column
          dataIndex="id"
          title="ID"
          sorter
          width={100}
          defaultSortOrder={getDefaultSortOrder("id", sorters)}
        />
        <Table.Column
          dataIndex="title"
          title="Title"
          sorter
          defaultSortOrder={getDefaultSortOrder("title", sorters)}
        />
        <Table.Column dataIndex={["category", "title"]} title="Category" />
        <Table.Column
          dataIndex="status"
          title="Status"
          render={(value) => <TagField value={value} />}
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
