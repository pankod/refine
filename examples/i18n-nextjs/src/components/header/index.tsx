"use client";

import { DownOutlined } from "@ant-design/icons";
import { ColorModeContext } from "@contexts/color-mode";
import type { RefineThemedLayoutHeaderProps } from "@refinedev/antd";
import { useGetIdentity, useTranslation } from "@refinedev/core";
import {
  Layout as AntdLayout,
  Avatar,
  Button,
  Dropdown,
  type MenuProps,
  Space,
  Switch,
  Typography,
  theme,
} from "antd";
import React, { useContext } from "react";
import Cookies from "js-cookie";

type IUser = {
  id: number;
  name: string;
  avatar: string;
};

export const Header: React.FC<RefineThemedLayoutHeaderProps> = ({ sticky }) => {
  const { getLocale, changeLocale } = useTranslation();
  const currentLocale = getLocale();
  const { token } = theme.useToken();
  const { data: user } = useGetIdentity<IUser>();
  const { mode, setMode } = useContext(ColorModeContext);

  const languageMenuItems: MenuProps["items"] = ["en", "de"]
    .sort()
    .map((lang: string) => ({
      key: lang,
      onClick: () => {
        changeLocale(lang);
        Cookies.set("NEXT_LOCALE", lang);
      },
      label: lang === "en" ? "English" : "German",
      icon: (
        <span style={{ marginRight: 8 }}>
          <Avatar size={16} src={`/images/flags/${lang}.svg`} />
        </span>
      ),
    }));

  const headerStyles: React.CSSProperties = {
    backgroundColor: token.colorBgElevated,
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: "0px 24px",
    height: "64px",
  };

  if (sticky) {
    headerStyles.position = "sticky";
    headerStyles.top = 0;
    headerStyles.zIndex = 1;
  }

  return (
    <AntdLayout.Header style={headerStyles}>
      <Dropdown
        menu={{
          items: languageMenuItems,
          selectedKeys: currentLocale ? [currentLocale] : [],
        }}
      >
        <Button type="text">
          <Space>
            <Avatar size={16} src={`/images/flags/${currentLocale}.svg`} />
            <Typography.Text>
              {currentLocale === "en" ? "English" : "German"}
            </Typography.Text>
            <DownOutlined />
          </Space>
        </Button>
      </Dropdown>
      <Space>
        <Switch
          checkedChildren="🌛"
          unCheckedChildren="🔆"
          onChange={() => setMode(mode === "light" ? "dark" : "light")}
          defaultChecked={mode === "dark"}
        />
        {(user?.name || user?.avatar) && (
          <Space style={{ marginLeft: "8px" }} size="middle">
            {user?.name && (
              <Typography.Text strong>{user.name}</Typography.Text>
            )}
            {user?.avatar && <Avatar src={user?.avatar} alt={user?.name} />}
          </Space>
        )}
      </Space>
    </AntdLayout.Header>
  );
};
