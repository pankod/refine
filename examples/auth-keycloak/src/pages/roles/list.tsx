import React from "react";
import { List, useTable } from "@refinedev/antd";
import { Table } from "antd";
import { toList } from "../../providers/listResponse";

export const RoleList: React.FC = () => {
  const { tableProps } = useTable();

  return (
    <List title="Phân quyền (Roles)">
      <Table {...tableProps} dataSource={toList(tableProps.dataSource)} rowKey="id">
        <Table.Column dataIndex="id" title="ID" />
        <Table.Column dataIndex="name" title="Tên Role" />
        <Table.Column dataIndex="description" title="Mô tả" />
      </Table>
    </List>
  );
};
