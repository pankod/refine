import { List, useTable } from "@refinedev/antd";

import { Table } from "antd";

export const UserList = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,

    pagination: {
      mode: "off",
    },
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" key="id" title="ID" />
        <Table.Column dataIndex="username" key="name" title="Username" />
        <Table.Column dataIndex="email" key="email" title="Email" />
      </Table>
    </List>
  );
};
