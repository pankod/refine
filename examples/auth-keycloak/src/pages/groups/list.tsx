import React from "react";
import { List, useTable } from "@refinedev/antd";
import { Table } from "antd";

export const GroupList: React.FC = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  return (
    <List title="Nhóm (Groups)">
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="ID" />
        <Table.Column dataIndex="name" title="Tên nhóm" />
        <Table.Column dataIndex="memberCount" title="Số thành viên" />
      </Table>
    </List>
  );
};
