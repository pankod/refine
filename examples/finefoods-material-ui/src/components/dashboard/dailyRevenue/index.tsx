import {
  Tooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
  AreaChart,
  Area,
} from "recharts";
import { ChartTooltip } from "../chartTooltip";
import dayjs from "dayjs";
import type { ISalesChart } from "../../../interfaces";

type Props = {
  data: ISalesChart[];
};

export const DailyRevenue = (props: Props) => {
  const data = props.data || [];

  return (
    <ResponsiveContainer width="99%">
      <AreaChart
        data={data}
        margin={{ top: 20, right: 10, left: 0, bottom: 0 }}
      >
        <XAxis
          dataKey="date"
          fontSize={12}
          tickFormatter={(value) => {
            if (data.length > 7) {
              return dayjs(value).format("MM/DD");
            }

            return dayjs(value).format("ddd");
          }}
        />
        <YAxis
          dataKey="value"
          fontSize={12}
          tickFormatter={(value) => {
            return `$${Number(value) / 1000}k`;
          }}
        />
        <defs>
          <linearGradient id="area-color" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#2196F3" stopOpacity={0.5} />
            <stop offset="95%" stopColor="#2196F3" stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="value"
          stroke="#2196F3"
          fill="url(#area-color)"
        />
        <Tooltip
          content={
            <ChartTooltip
              valueFormatter={(value) =>
                new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(Number(value))
              }
              labelFormatter={(label) => dayjs(label).format("MMM D, YYYY")}
            />
          }
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};
