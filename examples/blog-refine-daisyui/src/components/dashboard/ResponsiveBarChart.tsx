import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
} from "recharts";
import { ChartTooltip } from "../../components/dashboard/ChartTooltip";
import type { IChartDatum } from "../../interfaces";

type TResponsiveBarChartProps = {
  kpi: string;
  data: IChartDatum[];
  colors: {
    stroke: string;
    fill: string;
  };
};

export const ResponsiveBarChart = ({
  kpi,
  data,
  colors,
}: TResponsiveBarChartProps) => {
  return (
    <ResponsiveContainer height={400}>
      <BarChart
        data={data}
        width={1200}
        height={400}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="0 0" />
        <XAxis
          dataKey="date"
          tickCount={data?.length ?? 0}
          tick={{
            stroke: "light-grey",
            strokeWidth: 0.5,
            fontSize: "12px",
          }}
        />
        <YAxis
          domain={[0, "dataMax"]}
          tickCount={13}
          tick={{
            stroke: "light-grey",
            strokeWidth: 0.5,
            fontSize: "12px",
          }}
        />
        <Tooltip
          content={<ChartTooltip colors={colors} kpi={kpi} />}
          wrapperStyle={{
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            border: "0 solid #000",
            borderRadius: "10px",
          }}
        />
        <Bar
          type="monotone"
          dataKey="value"
          stroke="rgb(255, 207, 159)"
          strokeWidth={1}
          fill="rgba(255, 207, 159, 0.7)"
        />
      </BarChart>
    </ResponsiveContainer>
  );
};
