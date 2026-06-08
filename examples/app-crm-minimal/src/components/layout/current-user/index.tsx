import React from "react";

import { useGetIdentity, useLogout, useRefineOptions } from "@refinedev/core";

import { LogoutOutlined, SettingOutlined } from "@ant-design/icons";
import { Button, Modal, Popover } from "antd";

import type { User } from "@/graphql/schema.types";

import { CustomAvatar } from "../../custom-avatar";
import { Text } from "../../text";
import { AccountSettings } from "../account-settings";

export const CurrentUser = () => {
  const [opened, setOpened] = React.useState(false);
  const { data: user } = useGetIdentity<User>();
  const { mutate: logout } = useLogout();
  const { logout: logoutOptions } = useRefineOptions();

  const handleLogout = () => {
    if (logoutOptions.confirm) {
      Modal.confirm({
        title: "Logout",
        content: "Are you sure you want to logout?",
        okText: "Logout",
        okType: "danger",
        cancelText: "Cancel",
        centered: true,
        onOk: () => logout(),
      });
    } else {
      logout();
    }
  };

  const content = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Text
        strong
        style={{
          padding: "12px 20px",
        }}
      >
        {user?.name}
      </Text>
      <div
        style={{
          borderTop: "1px solid #d9d9d9",
          padding: "4px",
          display: "flex",
          flexDirection: "column",
          gap: "4px",
        }}
      >
        <Button
          style={{ textAlign: "left" }}
          icon={<SettingOutlined />}
          type="text"
          block
          onClick={() => setOpened(true)}
        >
          Account settings
        </Button>
        <Button
          style={{ textAlign: "left" }}
          icon={<LogoutOutlined />}
          type="text"
          block
          danger
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <Popover
        placement="bottomRight"
        content={content}
        trigger="click"
        overlayInnerStyle={{ padding: 0 }}
        overlayStyle={{ zIndex: 999 }}
      >
        <CustomAvatar
          name={user?.name}
          src={user?.avatarUrl}
          size="default"
          style={{ cursor: "pointer" }}
        />
      </Popover>
      {user && (
        <AccountSettings
          opened={opened}
          setOpened={setOpened}
          userId={user.id}
        />
      )}
    </>
  );
};
