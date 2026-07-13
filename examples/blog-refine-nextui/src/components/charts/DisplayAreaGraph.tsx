import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import type { IDisplayAreaGraphProps } from "../../interfaces";
import { formatDate } from "./DisplayBarChart";

export const DisplayAreaGraph: React.FC<IDisplayAreaGraphProps> = ({
  data,
  stroke,
  fill,
}) => {
  const transformedData = data.map(({ date, value }) => ({
    date: formatDate.format(new Date(date)),
    value,
  }));

  return (
    <ResponsiveContainer aspect={3.5}>
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
