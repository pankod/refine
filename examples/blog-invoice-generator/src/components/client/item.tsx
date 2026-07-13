import { useDelete } from "@refinedev/core";
import { TagField } from "@refinedev/antd";

import { FormOutlined, DeleteOutlined, MoreOutlined } from "@ant-design/icons";
import { Card, Typography, Dropdown, type MenuProps } from "antd";

import type { IClient } from "interfaces";

const { Title, Text } = Typography;

type ClientItemProps = {
  item: IClient;
  editShow: (id?: string | undefined) => void;
};

export const ClientItem: React.FC<ClientItemProps> = ({ item, editShow }) => {
  const { mutate } = useDelete();

  const menuItems: MenuProps["items"] = [
    {
      key: "1",
      style: { fontWeight: 500 },
      icon: <FormOutlined style={{ color: "green" }} />,
      onClick: () => editShow(item.id),
      label: "Edit Client",
    },
    {
      key: "2",
      style: { fontWeight: 500 },
      icon: <DeleteOutlined style={{ color: "red" }} />,
      onClick: () =>
        mutate({
          resource: "clients",
          id: item.id,
          mutationMode: "undoable",
          undoableTimeout: 5000,
        }),
      label: "Delete Client",
    },
  ];

  return (
    <Card style={{ width: 300, height: 300, borderColor: "black" }}>
      <div style={{ position: "absolute", top: "10px", right: "5px" }}>
        <Dropdown menu={{ items: menuItems }} trigger={["click"]}>
          <MoreOutlined
            style={{
              fontSize: 24,
            }}
          />
        </Dropdown>
      </div>

      <Title level={4}>{item.name}</Title>
      <Title level={5}>Client Id:</Title>
      <Text>{item.id}</Text>
      <Title level={5}>Contacts:</Title>

      {item.contacts.map((item) => {
        return (
          <TagField
            key={item.id}
            style={{ marginTop: 4 }}
            color={"#673ab7"}
            value={`${item.first_name} ${item.last_name}`}
          />
        );
      })}
    </Card>
  );
};
