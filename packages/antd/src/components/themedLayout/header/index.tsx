import React from "react";
import { Layout as AntdLayout, Typography, Avatar, Space, theme } from "antd";
import { useGetIdentity } from "@refinedev/core";
import type { RefineThemedLayoutHeaderProps } from "../types";

export const ThemedHeader: React.FC<RefineThemedLayoutHeaderProps> = ({
  sticky,
}) => {
  const { token } = theme.useToken();

  const { data: user } = useGetIdentity();

  const shouldRenderHeader = user && (user.name || user.avatar);

  if (!shouldRenderHeader) {
    return null;
  }

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
      <Space>
        <Space size="middle">
          {user?.name && <Typography.Text strong>{user.name}</Typography.Text>}
          {user?.avatar && <Avatar src={user?.avatar} alt={user?.name} />}
        </Space>
      </Space>
    </AntdLayout.Header>
  );
};
