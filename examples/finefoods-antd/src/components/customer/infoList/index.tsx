import React from "react";
import type { IUser } from "../../../interfaces";
import {
  PhoneOutlined,
  EnvironmentOutlined,
  CheckCircleOutlined,
  RightCircleOutlined,
  UserOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { List, Typography, Space, theme, Card } from "antd";
import dayjs from "dayjs";
import { UserStatus } from "../userStatus";
import { useTranslate } from "@refinedev/core";

type Props = {
  customer?: IUser;
};

export const CustomerInfoList = ({ customer }: Props) => {
  const { token } = theme.useToken();
  const t = useTranslate();

  return (
    <Card
      bordered={false}
      styles={{
        body: {
          padding: "0 16px 0 16px",
        },
      }}
    >
      <List
        itemLayout="horizontal"
        dataSource={[
          {
            title: t("users.fields.gsm"),
            icon: <PhoneOutlined />,
            value: <Typography.Text>{customer?.gsm}</Typography.Text>,
          },
          {
            title: t("users.fields.addresses"),
            icon: <EnvironmentOutlined />,
            value: (
              <Space direction="vertical">
                {customer?.addresses.map((address, index) => {
                  const isFirst = index === 0;

                  return (
                    <Space key={index}>
                      {isFirst ? (
                        <CheckCircleOutlined
                          style={{
                            color: token.colorSuccess,
                          }}
                        />
                      ) : (
                        <RightCircleOutlined
                          style={{
                            color: token.colorTextTertiary,
                          }}
                        />
                      )}
                      <Typography.Text
                        key={index}
                        style={{
                          color: isFirst
                            ? token.colorText
                            : token.colorTextTertiary,
                        }}
                      >
                        {address.text}
                      </Typography.Text>
                    </Space>
                  );
                })}
              </Space>
            ),
          },
          {
            title: t("users.fields.isActive.label"),
            icon: <UserOutlined />,
            value: <UserStatus value={!!customer?.isActive} />,
          },
          {
            title: t("users.fields.createdAt"),
            icon: <CalendarOutlined />,
            value: (
              <Typography.Text>
                {dayjs(customer?.createdAt).format("MMMM, YYYY HH:mm A")}
              </Typography.Text>
            ),
          },
        ]}
        renderItem={(item) => {
          return (
            <List.Item>
              <List.Item.Meta
                avatar={item.icon}
                title={
                  <Typography.Text type="secondary">
                    {item.title}
                  </Typography.Text>
                }
                description={item.value}
              />
            </List.Item>
          );
        }}
      />
    </Card>
  );
};
