import { useState, useEffect } from "react";
import {
  useGetLocale,
  useSetLocale,
  useGetIdentity,
  useTranslate,
  useList,
} from "@refinedev/core";
import { Link } from "react-router";
import { SearchOutlined, DownOutlined } from "@ant-design/icons";

import {
  Dropdown,
  Input,
  Avatar,
  Typography,
  Space,
  Grid,
  Row,
  Col,
  AutoComplete,
  Layout as AntdLayout,
  Button,
  theme,
  type MenuProps,
} from "antd";

import { useTranslation } from "react-i18next";
import debounce from "lodash/debounce";

import { useConfigProvider } from "../../context";
import { IconMoon, IconSun } from "../../components/icons";
import type { IOrder, IStore, ICourier, IIdentity } from "../../interfaces";
import { useStyles } from "./styled";

const { Header: AntdHeader } = AntdLayout;
const { useToken } = theme;
const { Text } = Typography;
const { useBreakpoint } = Grid;

interface IOptionGroup {
  value: string;
  label: string | React.ReactNode;
}

interface IOptions {
  label: string | React.ReactNode;
  options: IOptionGroup[];
}

export const Header: React.FC = () => {
  const { token } = useToken();
  const { styles } = useStyles();
  const { mode, setMode } = useConfigProvider();
  const { i18n } = useTranslation();
  const locale = useGetLocale();
  const changeLanguage = useSetLocale();
  const { data: user } = useGetIdentity<IIdentity>();
  const screens = useBreakpoint();
  const t = useTranslate();

  const currentLocale = locale();

  const renderTitle = (title: string) => (
    <div className={styles.headerTitle}>
      <Text style={{ fontSize: "16px" }}>{title}</Text>
      <Link to={`/${title.toLowerCase()}`}>{t("search.more")}</Link>
    </div>
  );

  const renderItem = (title: string, imageUrl: string, link: string) => ({
    value: title,
    label: (
      <Link to={link} style={{ display: "flex", alignItems: "center" }}>
        {imageUrl && (
          <Avatar
            size={32}
            src={imageUrl}
            style={{ minWidth: "32px", marginRight: "16px" }}
          />
        )}
        <Text>{title}</Text>
      </Link>
    ),
  });

  const [value, setValue] = useState<string>("");
  const [options, setOptions] = useState<IOptions[]>([]);

  const {
    result: ordersData,

    query: { refetch: refetchOrders, isSuccess: ordersIsSuccess },
  } = useList<IOrder>({
    resource: "orders",

    queryOptions: {
      enabled: false,
    },

    filters: [{ field: "q", operator: "contains", value }],
  });

  useEffect(() => {
    if (!ordersIsSuccess || !ordersData) return;

    const orderOptionGroup = ordersData.data.map((item) =>
      renderItem(
        `${item.store.title} / #${item.orderNumber}`,
        item?.products?.[0].images?.[0]?.url || "/images/default-order-img.png",
        `/orders/show/${item.id}`,
      ),
    );
    if (orderOptionGroup.length > 0) {
      setOptions((prevOptions) => [
        ...prevOptions,
        {
          label: renderTitle(t("orders.orders")),
          options: orderOptionGroup,
        },
      ]);
    }
  }, [ordersData, ordersIsSuccess, t, renderTitle, renderItem]);

  const {
    result: storesData,

    query: { refetch: refetchStores, isSuccess: storesIsSuccess },
  } = useList<IStore>({
    resource: "stores",

    queryOptions: {
      enabled: false,
    },

    filters: [{ field: "q", operator: "contains", value }],
  });

  useEffect(() => {
    if (!storesIsSuccess || !storesData) return;

    const storeOptionGroup = storesData.data.map((item) =>
      renderItem(item.title, "", `/stores/edit/${item.id}`),
    );
    if (storeOptionGroup.length > 0) {
      setOptions((prevOptions) => [
        ...prevOptions,
        {
          label: renderTitle(t("stores.stores")),
          options: storeOptionGroup,
        },
      ]);
    }
  }, [storesData, storesIsSuccess, t, renderTitle, renderItem]);

  const {
    result: couriersData,

    query: { refetch: refetchCouriers, isSuccess: couriersIsSuccess },
  } = useList<ICourier>({
    resource: "couriers",

    queryOptions: {
      enabled: false,
    },

    filters: [{ field: "q", operator: "contains", value }],
  });

  useEffect(() => {
    if (!couriersIsSuccess || !couriersData) return;

    const courierOptionGroup = couriersData.data.map((item) =>
      renderItem(
        `${item.name} ${item.surname}`,
        item.avatar[0].url,
        `/couriers/show/${item.id}`,
      ),
    );
    if (courierOptionGroup.length > 0) {
      setOptions((prevOptions) => [
        ...prevOptions,
        {
          label: renderTitle(t("couriers.couriers")),
          options: courierOptionGroup,
        },
      ]);
    }
  }, [couriersData, couriersIsSuccess, t, renderTitle, renderItem]);

  useEffect(() => {
    if (value?.trim() === "") return;

    setOptions([]);
    refetchOrders();
    refetchCouriers();
    refetchStores();
  }, [value, refetchOrders, refetchCouriers, refetchStores]);

  const menuItems: MenuProps["items"] = [...(i18n.languages || [])]
    .sort()
    .map((lang: string) => ({
      key: lang,
      onClick: () => changeLanguage(lang),
      icon: (
        <span style={{ marginRight: 8 }}>
          <Avatar size={16} src={`/images/flags/${lang}.svg`} />
        </span>
      ),
      label: lang === "en" ? "English" : "German",
    }));

  return (
    <AntdHeader
      style={{
        backgroundColor: token.colorBgElevated,
        padding: "0 24px",
      }}
    >
      <Row
        align="middle"
        style={{
          justifyContent: screens.sm ? "space-between" : "end",
        }}
      >
        <Col xs={0} sm={8} md={12}>
          <AutoComplete
            style={{
              width: "100%",
              maxWidth: "550px",
            }}
            options={options}
            filterOption={false}
            onSearch={debounce((value: string) => setValue(value), 300)}
          >
            <Input
              size="large"
              placeholder={t("search.placeholder")}
              suffix={<div className={styles.inputSuffix}>/</div>}
              prefix={<SearchOutlined className={styles.inputPrefix} />}
            />
          </AutoComplete>
        </Col>
        <Col>
          <Space size={screens.md ? 32 : 16} align="center">
            <Dropdown
              menu={{
                items: menuItems,
                selectedKeys: currentLocale ? [currentLocale] : [],
              }}
            >
              <Button onClick={(e) => e.preventDefault()}>
                <Space>
                  <Text className={styles.languageSwitchText}>
                    {currentLocale === "en" ? "English" : "German"}
                  </Text>
                  <DownOutlined className={styles.languageSwitchIcon} />
                </Space>
              </Button>
            </Dropdown>

            <Button
              className={styles.themeSwitch}
              type="text"
              icon={mode === "light" ? <IconMoon /> : <IconSun />}
              onClick={() => {
                setMode(mode === "light" ? "dark" : "light");
              }}
            />

            <Space size={screens.md ? 16 : 8} align="center">
              <Text ellipsis className={styles.userName}>
                {user?.name}
              </Text>
              <Avatar size="large" src={user?.avatar} alt={user?.name} />
            </Space>
          </Space>
        </Col>
      </Row>
    </AntdHeader>
  );
};
