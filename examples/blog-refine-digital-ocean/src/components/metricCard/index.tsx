import React, { type FC, type PropsWithChildren } from "react";
import { Card, Skeleton, Typography } from "antd";
import { useList } from "@refinedev/core";
import { Area, type AreaConfig } from "@ant-design/plots";
import { AuditOutlined, ShopOutlined, TeamOutlined } from "@ant-design/icons";

type MetricType = "companies" | "contacts" | "deals";

export const MetricCard = ({ variant }: { variant: MetricType }) => {
  const {
    result: data,

    query: { isLoading, isError, error },
  } = useList({
    resource: variant,
    liveMode: "off",
    meta: {
      fields: ["id"],
    },
  });

  if (isError) {
    console.error("Error fetching dashboard data", error);
    return null;
  }

  const { primaryColor, secondaryColor, icon, title } = variants[variant];

  const config: AreaConfig = {
    style: {
      height: "48px",
      width: "100%",
    },
    appendPadding: [1, 0, 0, 0],
    padding: 0,
    syncViewPadding: true,
    data: variants[variant].data,
    autoFit: true,
    tooltip: false,
    animation: false,
    xField: "index",
    yField: "value",
    xAxis: false,
    yAxis: {
      tickCount: 12,
      label: { style: { fill: "transparent" } },
      grid: { line: { style: { stroke: "transparent" } } },
    },
    smooth: true,
    areaStyle: () => ({
      fill: `l(270) 0:#fff 0.2:${secondaryColor} 1:${primaryColor}`,
    }),
    line: { color: primaryColor },
  };

  return (
    <Card
      bodyStyle={{
        padding: "8px 8px 8px 12px",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
      }}
      size="small"
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            whiteSpace: "nowrap",
          }}
        >
          {icon}
          <Typography.Text className="secondary" style={{ marginLeft: "8px" }}>
            {title}
          </Typography.Text>
        </div>

        {isLoading ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              height: "60px",
            }}
          >
            <Skeleton.Button style={{ marginLeft: "48px", marginTop: "8px" }} />
          </div>
        ) : (
          <Typography.Text
            strong
            style={{
              fontSize: 38,
              textAlign: "start",
              marginLeft: "48px",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {data?.total}
          </Typography.Text>
        )}
      </div>
      <div
        style={{
          marginTop: "auto",
          marginLeft: "auto",
          width: "110px",
        }}
      >
        <Area {...config} />
      </div>
    </Card>
  );
};

const IconWrapper: FC<PropsWithChildren<{ color: string }>> = ({
  color,
  children,
}) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "32px",
        height: "32px",
        borderRadius: "50%",
        backgroundColor: color,
      }}
    >
      {children}
    </div>
  );
};

const variants: {
  [key in MetricType]: {
    primaryColor: string;
    secondaryColor?: string;
    icon: React.ReactNode;
    title: string;
    data: { index: string; value: number }[];
  };
} = {
  companies: {
    primaryColor: "#1677FF",
    secondaryColor: "#BAE0FF",
    icon: (
      <IconWrapper color="#E6F4FF">
        <ShopOutlined
          className="md"
          style={{
            color: "#1677FF",
          }}
        />
      </IconWrapper>
    ),
    title: "Number of companies",
    data: [
      { index: "1", value: 3500 },
      { index: "2", value: 2750 },
      { index: "3", value: 5000 },
      { index: "4", value: 4250 },
      { index: "5", value: 5000 },
    ],
  },
  contacts: {
    primaryColor: "#52C41A",
    secondaryColor: "#D9F7BE",
    icon: (
      <IconWrapper color="#F6FFED">
        <TeamOutlined
          className="md"
          style={{
            color: "#52C41A",
          }}
        />
      </IconWrapper>
    ),
    title: "Number of contacts",
    data: [
      { index: "1", value: 10000 },
      { index: "2", value: 19500 },
      { index: "3", value: 13000 },
      { index: "4", value: 17000 },
      { index: "5", value: 13000 },
      { index: "6", value: 20000 },
    ],
  },
  deals: {
    primaryColor: "#FA541C",
    secondaryColor: "#FFD8BF",
    icon: (
      <IconWrapper color="#FFF2E8">
        <AuditOutlined
          className="md"
          style={{
            color: "#FA541C",
          }}
        />
      </IconWrapper>
    ),
    title: "Total deals in pipeline",
    data: [
      { index: "1", value: 1000 },
      { index: "2", value: 1300 },
      { index: "3", value: 1200 },
      { index: "4", value: 2000 },
      { index: "5", value: 800 },
      { index: "6", value: 1700 },
      { index: "7", value: 1400 },
      { index: "8", value: 1800 },
    ],
  },
};
