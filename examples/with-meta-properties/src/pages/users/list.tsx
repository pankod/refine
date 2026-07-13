import { List, useTable, EmailField } from "@refinedev/antd";
import { Table } from "antd";

import type { IUser } from "../../interfaces";

export const UserList: React.FC = () => {
  const { tableProps } = useTable<IUser>({
    meta: {
      isGreat: true,
      bar: "foo",
      // This will override the meta property from App.tsx
      order: 1,
    },
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="firstName" title="First Name" />
        <Table.Column dataIndex="lastName" title="Last Name" />
        <Table.Column
          dataIndex="email"
          title="Email"
          render={(value) => <EmailField value={value} />}
        />
      </Table>
    </List>
  );
};
