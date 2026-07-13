import React from "react";

import { useTable, List } from "@refinedev/antd";

import { Table } from "antd";

import type { IAuthUser } from "../../types";

export const UserList = () => {
  const { tableProps } = useTable<IAuthUser>();

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="email" title="Email" />
        <Table.Column dataIndex="id" title="ID" />
      </Table>
    </List>
  );
};
