import React from "react";
import type { RefineThemedLayoutHeaderProps } from "@refinedev/antd";
import { useNavigation, Link } from "@refinedev/core";
import { Layout as AntdLayout, Button, theme, Flex, Tabs } from "antd";
import {
  BankOutlined,
  ShopOutlined,
  ContainerOutlined,
} from "@ant-design/icons";
import { useLocation } from "react-router";
import { useConfigProvider } from "@/providers/config-provider";
import { Search } from "@/components/header/search";
import { IconMoon, IconSun } from "@/components/icons";
import { User } from "@/components/header/user";
import { Logo } from "@/components/logo";
import { useStyles } from "./styled";

export const Header: React.FC<RefineThemedLayoutHeaderProps> = () => {
  const { list } = useNavigation();

  const location = useLocation();

  const { token } = theme.useToken();
  const { mode, setMode } = useConfigProvider();
  const { styles } = useStyles();

  return (
    <AntdLayout.Header
      className="print-hidden"
      style={{
        backgroundColor: token.colorBgElevated,
        padding: "0 16px",
        minHeight: "48px",
        height: "max-content",
      }}
    >
      <Flex
        align="center"
        justify="space-between"
        wrap="wrap"
        style={{
          width: "100%",
          maxWidth: "1440px",
          margin: "0 auto",
          height: "100%",
        }}
      >
        <Flex align="center" wrap="wrap">
          <Link
            go={{
              to: {
                resource: "accounts",
                action: "list",
              },
            }}
          >
            <Logo
              style={{
                width: "200px",
              }}
            />
          </Link>
          <Tabs
            className={styles.tabs}
            activeKey={location.pathname.split("/")[1]}
            onChange={(key) => {
              list(key);
            }}
            items={[
              {
                key: "accounts",
                label: "Accounts",
                icon: <BankOutlined />,
              },
              {
                key: "clients",
                label: "Clients",
                icon: <ShopOutlined />,
              },
              {
                key: "invoices",
                label: "Invoices",
                icon: <ContainerOutlined />,
              },
            ]}
          />
        </Flex>
        <Flex align="center" gap={32} className={styles.rightSlot}>
          <Search />
          <Button
            className={styles.themeSwitch}
            type="text"
            icon={mode === "light" ? <IconMoon /> : <IconSun />}
            onClick={() => {
              setMode(mode === "light" ? "dark" : "light");
            }}
          />
          <User />
        </Flex>
      </Flex>
    </AntdLayout.Header>
  );
};
