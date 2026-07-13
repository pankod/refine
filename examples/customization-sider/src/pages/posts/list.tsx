import { List, useTable } from "@refinedev/antd";

import { Table } from "antd";

import type { IPost } from "../../interfaces";

export const PostList = () => {
  const { tableProps } = useTable<IPost>();

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="ID" />
        <Table.Column dataIndex="title" title="Title" />
      </Table>
    </List>
  );
};
