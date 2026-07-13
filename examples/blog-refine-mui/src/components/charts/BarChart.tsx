import React from "react";
import {
  BarChart as Chart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import type { IBarChartProps } from "../../interfaces";

const formatDate = new Intl.DateTimeFormat("en-US", {
  month: "short",
  year: "numeric",
  day: "numeric",
});

export const BarChart: React.FC<IBarChartProps> = ({ data, fill }) => {
  const transformedData = data.map(({ date, value }) => ({
    date: formatDate.format(new Date(date)),
    value,
  }));

  return (
    <ResponsiveContainer width="99%" aspect={3}>
      <Chart data={transformedData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis dataKey="value" />
        <Tooltip />
        <Bar dataKey="value" fill={fill} />
      </Chart>
    </ResponsiveContainer>
  );
};
