import { useTable, List } from "@refinedev/antd";
import { Table, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

import type { TUser } from "../../types/user";

export const UserList = () => {
  const { tableProps } = useTable<TUser>();

  return (
    <List>
      <Table {...tableProps} rowKey={"id"}>
        <Table.Column
          dataIndex="avatar_url"
          title={
            <h4 style={{ textAlign: "center", fontWeight: "bold" }}>Avatar</h4>
          }
          render={(_, record: TUser) => (
            <Avatar
              icon={<UserOutlined />}
              src={record.avatar_url}
              size={{ xs: 24, sm: 32, md: 40 }}
            />
          )}
        />
        <Table.Column
          dataIndex="id"
          title={
            <h4 style={{ textAlign: "center", fontWeight: "bold" }}>ID</h4>
          }
          render={(_, record: TUser) => (
            <p style={{ textAlign: "center" }}>{record?.id}</p>
          )}
        />
        <Table.Column
          dataIndex="email"
          title={
            <h4 style={{ textAlign: "center", fontWeight: "bold" }}>Email</h4>
          }
          render={() => <p style={{ textAlign: "center" }}>Not listed</p>}
        />
        <Table.Column
          dataIndex="full_name"
          title={
            <h4 style={{ textAlign: "center", fontWeight: "bold" }}>
              Full Name
            </h4>
          }
          render={(_, record: TUser) =>
            record.full_name ? (
              <p
                style={{
                  textAlign: "center",
                }}
              >
                {record.full_name}
              </p>
            ) : (
              <p
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                --
              </p>
            )
          }
        />
        <Table.Column
          dataIndex="username"
          title={
            <h4 style={{ textAlign: "center", fontWeight: "bold" }}>
              Username
            </h4>
          }
          render={(_, record: TUser) =>
            record.username ? (
              <p
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                {record.username}
              </p>
            ) : (
              <p
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                --
              </p>
            )
          }
        />
      </Table>
    </List>
  );
};
