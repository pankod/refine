import React from "react";
import { List, useTable } from "@refinedev/antd";
import { Table, Space, Tag } from "antd";

export const UserList: React.FC = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  return (
    <List title="Người dùng">
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="ID" />
        <Table.Column dataIndex="name" title="Tên" />
        <Table.Column dataIndex="email" title="Email" />
        <Table.Column dataIndex="role" title="Vai trò" />
      </Table>
    </List>
  );
};
