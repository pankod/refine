import React from "react";
import { List, useTable } from "@refinedev/antd";
import { Table } from "antd";

export const RoleList: React.FC = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  return (
    <List title="Phân quyền (Roles)">
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="ID" />
        <Table.Column dataIndex="name" title="Tên Role" />
        <Table.Column dataIndex="description" title="Mô tả" />
      </Table>
    </List>
  );
};
