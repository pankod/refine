import { useGetLocale, useSetLocale, useTranslation } from "@refinedev/core";
import { DownOutlined } from "@ant-design/icons";
import {
  Layout as AntdLayout,
  Space,
  Button,
  Dropdown,
  Avatar,
  type MenuProps,
} from "antd";
import { useTranslation as usei18nextTranslation } from "react-i18next";

export const Header: React.FC = () => {
  const { i18n } = usei18nextTranslation();
  const { getLocale, changeLocale } = useTranslation();
  const currentLocale = getLocale();

  const menuItems: MenuProps["items"] = [...(i18n.languages || [])]
    .sort()
    .map((lang: string) => ({
      key: lang,
      onClick: () => changeLocale(lang),
      icon: (
        <span style={{ marginRight: 8 }}>
          <Avatar size={16} src={`/images/flags/${lang}.svg`} />
        </span>
      ),
      label: lang === "en" ? "English" : "German",
    }));

  return (
    <AntdLayout.Header
      style={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        padding: "0px 24px",
        height: "48px",
        backgroundColor: "#FFF",
        position: "sticky",
        top: 0,
        zIndex: 1,
      }}
    >
      <Dropdown
        menu={{
          items: menuItems,
          selectedKeys: currentLocale ? [currentLocale] : [],
        }}
      >
        <Button type="text">
          <Space>
            <Avatar size={16} src={`/images/flags/${currentLocale}.svg`} />
            {currentLocale === "en" ? "English" : "German"}
            <DownOutlined />
          </Space>
        </Button>
      </Dropdown>
    </AntdLayout.Header>
  );
};
