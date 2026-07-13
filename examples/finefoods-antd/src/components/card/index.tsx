import { Card, Flex, Space, Typography } from "antd";
import type { PropsWithChildren } from "react";
import { useConfigProvider } from "../../context";

export const CardWithContent = (
  props: PropsWithChildren<{
    icon?: React.ReactNode;
    title: string;
    bodyStyles?: React.CSSProperties;
  }>,
) => {
  const { mode } = useConfigProvider();

  return (
    <Card
      styles={{
        header: {
          backgroundColor: mode === "light" ? "#FAFAFA" : "#1F1F1F",
          padding: "16px",
        },
        body: {
          ...(props?.bodyStyles || {}),
        },
      }}
      title={
        <Space align="center" size={8}>
          {props.icon}
          <Typography.Text
            style={{
              fontWeight: 400,
            }}
          >
            {props.title}
          </Typography.Text>
        </Space>
      }
    >
      {props.children}
    </Card>
  );
};

export const CardWithPlot = (
  props: PropsWithChildren<{
    icon: React.ReactNode;
    title: string;
    rightSlot?: React.ReactNode;
    bodyStyles?: React.CSSProperties;
  }>,
) => {
  return (
    <Card
      styles={{
        header: {
          padding: "16px 16px 10px 16px",
          minHeight: "max-content",
          borderBottom: 0,
        },
        body: {
          padding: "24px 16px 24px 24px",
          ...(props?.bodyStyles || {}),
        },
      }}
      title={
        <Flex align="center" justify="space-between">
          <Flex gap={8}>
            {props.icon}
            <Typography.Text
              style={{
                fontWeight: 400,
              }}
            >
              {props.title}
            </Typography.Text>
          </Flex>
          {props?.rightSlot}
        </Flex>
      }
    >
      {props.children}
    </Card>
  );
};
