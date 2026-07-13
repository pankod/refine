import React, { useContext } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import type { IAreaGraphProps } from "../../interfaces";

export const formatDate = new Intl.DateTimeFormat("en-US", {
  month: "short",
  year: "numeric",
  day: "numeric",
});

export const AreaGraph: React.FC<IAreaGraphProps> = ({
  data,
  stroke,
  fill,
}) => {
  const transformedData = data.map(({ date, value }) => ({
    date: formatDate.format(new Date(date)),
    value,
  }));

  return (
    <ResponsiveContainer width="99%" aspect={3}>
      <AreaChart data={transformedData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis dataKey="value" />
        <Tooltip label="Daily Revenue" />
        <Area type="monotone" dataKey="value" stroke={stroke} fill={fill} />
      </AreaChart>
    </ResponsiveContainer>
  );
};
