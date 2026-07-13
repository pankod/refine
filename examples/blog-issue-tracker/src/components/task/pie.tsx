import React, { useContext } from "react";
import { Pie, type PieConfig } from "@ant-design/charts";
import { Empty, Space, Typography, theme } from "antd";
import { ColorModeContext } from "../../contexts/color-mode";

interface ChartProps {
  data: {
    type: string;
    value: number;
  }[];
}

interface ChartDatum {
  type: string;
  value: number;
  percent?: number;
}

export const TaskChart: React.FC<ChartProps> = ({ data }) => {
  const { token } = theme.useToken();
  const { mode } = useContext(ColorModeContext);
  const totalValue = data.reduce((sum, item) => sum + item.value, 0);

  const colorMap = React.useMemo(() => {
    const chartColors = [
      "#1677ff",
      "#13c2c2",
      "#fa8c16",
      "#52c41a",
      "#722ed1",
      "#eb2f96",
      "#faad14",
      "#2f54eb",
    ];

    return data.reduce<Record<string, string>>((acc, item, index) => {
      acc[item.type] = chartColors[index % chartColors.length];
      return acc;
    }, {});
  }, [data]);

  if (!data.length) {
    return (
      <div
        style={{
          minHeight: 320,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Empty description="No task data yet" />
      </div>
    );
  }

  const config: PieConfig = {
    data,
    height: 280,
    angleField: "value",
    colorField: "type",
    radius: 0.88,
    innerRadius: 0.55,
    legend: false,
    theme: mode,
    color: ({ type }: ChartDatum) => colorMap[type] ?? token.colorPrimary,
    tooltip: {
      title: (datum: ChartDatum) => datum.type,
      items: [
        (datum: ChartDatum) => {
          const percentage = totalValue
            ? Math.round((datum.value / totalValue) * 100)
            : 0;

          return {
            name: "Tasks",
            value: `${datum.value} (${percentage}%)`,
          };
        },
      ],
    },
    label: {
      type: "inner",
      offset: "-50%",
      content: ({ percent }: ChartDatum) =>
        `${Math.round((percent ?? 0) * 100)}%`,
      style: {
        fontSize: 12,
        fontWeight: 700,
        fill: token.colorTextLightSolid,
        textAlign: "center",
      },
      autoRotate: false,
    },
    pieStyle: {
      lineWidth: 2,
      stroke: token.colorBgContainer,
    },
    interactions: [{ type: "element-active" }],
  };

  return (
    <>
      <Space wrap size={[16, 8]} style={{ marginBottom: 16 }}>
        {data.map((item) => (
          <Space key={item.type} size={8}>
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: 999,
                display: "inline-block",
                background: colorMap[item.type],
              }}
            />
            <Typography.Text style={{ color: token.colorTextSecondary }}>
              {item.type}
            </Typography.Text>
          </Space>
        ))}
      </Space>
      <Pie {...config} />
    </>
  );
};
