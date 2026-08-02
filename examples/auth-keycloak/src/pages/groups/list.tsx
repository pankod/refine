import React from "react";
import { List, useTable } from "@refinedev/antd";
import { Table } from "antd";
import { toList } from "../../providers/listResponse";

export const GroupList: React.FC = () => {
  const { tableProps } = useTable();

  return (
    <List title="Nhóm (Groups)">
      <Table {...tableProps} dataSource={toList(tableProps.dataSource)} rowKey="id">
        <Table.Column dataIndex="id" title="ID" />
        <Table.Column dataIndex="name" title="Tên nhóm" />
        <Table.Column dataIndex="memberCount" title="Số thành viên" />
      </Table>
    </List>
  );
};
