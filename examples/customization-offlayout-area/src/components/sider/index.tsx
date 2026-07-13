import React, { useState } from "react";
import {
  type TreeMenuItem as ITreeMenu,
  CanAccess,
  useMenu,
} from "@refinedev/core";

import {
  UnorderedListOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { Layout as AntdLayout, Menu, theme, Button } from "antd";
import { Link } from "react-router";
import { ThemedTitle as ThemedTitleV2 } from "@refinedev/antd";

const { useToken } = theme;

export const FixedSider: React.FC = () => {
  const { token } = useToken();
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const { SubMenu } = Menu;
  const { menuItems, selectedKey } = useMenu();

  const renderTreeView = (tree: ITreeMenu[], selectedKey: string) => {
    return tree.map((item: ITreeMenu) => {
      const { name, children, meta, list } = item;

      const icon = meta?.icon;
      const label = meta?.label ?? name;
      const parent = meta?.parent;
      const route = list;

      if (children.length > 0) {
        return (
          <SubMenu
            key={route}
            icon={icon ?? <UnorderedListOutlined />}
            title={label}
          >
            {renderTreeView(children, selectedKey)}
          </SubMenu>
        );
      }
      const isSelected = route === selectedKey;
      const isRoute = !(parent !== undefined && children.length === 0);
      return (
        <CanAccess
          key={route}
          resource={name}
          action="list"
          params={{ resource: item }}
        >
          <Menu.Item
            key={route}
            style={{
              textTransform: "capitalize",
            }}
            icon={icon ?? (isRoute && <UnorderedListOutlined />)}
          >
            <Link to={route || "/"}>{label}</Link>
            {!collapsed && isSelected && (
              <div className="ant-menu-tree-arrow" />
            )}
          </Menu.Item>
        </CanAccess>
      );
    });
  };

  return (
    <AntdLayout.Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(collapsed: boolean): void => setCollapsed(collapsed)}
      style={{
        overflow: "auto",
        height: "100vh",
        position: "fixed",
        left: 0,
        backgroundColor: token.colorBgContainer,
        borderRight: `1px solid ${token.colorBgElevated}`,
      }}
      trigger={
        <Button
          type="text"
          style={{
            borderRadius: 0,
            height: "100%",
            width: "100%",
            backgroundColor: token.colorBgElevated,
          }}
        >
          {collapsed ? (
            <RightOutlined
              style={{
                color: token.colorPrimary,
              }}
            />
          ) : (
            <LeftOutlined
              style={{
                color: token.colorPrimary,
              }}
            />
          )}
        </Button>
      }
    >
      <div
        style={{
          width: collapsed ? "80px" : "200px",
          padding: collapsed ? "0" : "0 16px",
          display: "flex",
          justifyContent: collapsed ? "center" : "flex-start",
          alignItems: "center",
          height: "64px",
          backgroundColor: token.colorBgElevated,
          fontSize: "14px",
        }}
      >
        <ThemedTitleV2 collapsed={collapsed} />
      </div>
      <Menu
        style={{
          marginTop: "8px",
          border: "none",
        }}
        selectedKeys={[selectedKey]}
        mode="inline"
      >
        {renderTreeView(menuItems, selectedKey)}
      </Menu>
    </AntdLayout.Sider>
  );
};
