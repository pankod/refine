import React, { useState } from "react";
import {
  type TreeMenuItem,
  CanAccess,
  useIsExistAuthentication,
  useTranslate,
  useLogout,
  useMenu,
  useWarnAboutChange,
  useSubscription,
} from "@refinedev/core";
import { Link } from "react-router";
import {
  type ThemedSider as ThemedSiderV2,
  ThemedTitle as ThemedTitleV2,
} from "@refinedev/antd";
import { Layout as AntdLayout, Menu, Grid, theme, Button, Badge } from "antd";
import {
  LogoutOutlined,
  UnorderedListOutlined,
  RightOutlined,
  LeftOutlined,
} from "@ant-design/icons";

import { antLayoutSider, antLayoutSiderMobile } from "./styles";

const { useToken } = theme;

export const CustomSider: typeof ThemedSiderV2 = ({ render }) => {
  const { token } = useToken();
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const isExistAuthentication = useIsExistAuthentication();
  const { warnWhen, setWarnWhen } = useWarnAboutChange();
  const { mutate: mutateLogout } = useLogout();
  const translate = useTranslate();
  const { menuItems, selectedKey, defaultOpenKeys } = useMenu();
  const { SubMenu } = Menu;
  const [subscriptionCount, setSubscriptionCount] = useState(0);

  const breakpoint = Grid.useBreakpoint();

  const isMobile =
    typeof breakpoint.lg === "undefined" ? false : !breakpoint.lg;

  useSubscription({
    channel: "resources/posts",
    types: ["created", "updated"],
    onLiveEvent: () => setSubscriptionCount((prev) => prev + 1),
  });

  const renderTreeView = (tree: TreeMenuItem[], selectedKey?: string) => {
    return tree.map((item: TreeMenuItem) => {
      const { name, children, meta, key, list } = item;

      const icon = meta?.icon;
      const label = meta?.label ?? name;
      const parent = meta?.parent;
      const route =
        typeof list === "string"
          ? list
          : typeof list !== "function"
            ? list
            : key;

      if (children.length > 0) {
        return (
          <SubMenu
            key={key}
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
          key={key}
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
            {route ? <Link to={route || "/"}>{label}</Link> : label}
            {route && (
              <>
                {label.toLowerCase() === "posts" && (
                  <Badge
                    size="small"
                    count={subscriptionCount}
                    offset={[2, -15]}
                  />
                )}
              </>
            )}
            {!collapsed && isSelected && (
              <div className="ant-menu-tree-arrow" />
            )}
          </Menu.Item>
        </CanAccess>
      );
    });
  };

  const handleLogout = () => {
    if (warnWhen) {
      const confirm = window.confirm(
        translate(
          "warnWhenUnsavedChanges",
          "Are you sure you want to leave? You have unsaved changes.",
        ),
      );

      if (confirm) {
        setWarnWhen(false);
        mutateLogout();
      }
    } else {
      mutateLogout();
    }
  };

  const logout = isExistAuthentication && (
    <Menu.Item key="logout" onClick={handleLogout} icon={<LogoutOutlined />}>
      {translate("buttons.logout", "Logout")}
    </Menu.Item>
  );

  const items = renderTreeView(menuItems, selectedKey);

  const renderSider = () => {
    if (render) {
      return render({
        items,
        logout,
        collapsed,
      });
    }
    return (
      <>
        {items}
        {logout}
      </>
    );
  };

  const siderStyle = isMobile ? antLayoutSiderMobile : antLayoutSider;

  return (
    <AntdLayout.Sider
      collapsible
      collapsedWidth={isMobile ? 0 : 80}
      collapsed={collapsed}
      breakpoint="lg"
      onCollapse={(collapsed: boolean): void => setCollapsed(collapsed)}
      style={{
        ...siderStyle,
        backgroundColor: token.colorBgContainer,
        borderRight: `1px solid ${token.colorBgElevated}`,
      }}
      trigger={
        !isMobile && (
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
        )
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
        defaultOpenKeys={defaultOpenKeys}
        selectedKeys={[selectedKey]}
        mode="inline"
        style={{
          marginTop: "8px",
          border: "none",
        }}
        onClick={({ key }) => {
          if (!breakpoint.lg) {
            setCollapsed(true);
          }

          if (key === "/posts") {
            setSubscriptionCount(0);
          }
        }}
      >
        {renderSider()}
      </Menu>
    </AntdLayout.Sider>
  );
};
