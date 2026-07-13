import {
  BarChart,
  Bar,
  Tooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { ChartTooltip } from "../chartTooltip";
import dayjs from "dayjs";
import type { ISalesChart } from "../../../interfaces";

type Props = {
  data: ISalesChart[];
};

export const NewCustomers = (props: Props) => {
  const data = props.data || [];

  return (
    <ResponsiveContainer width="99%">
      <BarChart
        data={data}
        barSize={15}
        margin={{ top: 30, right: 10, left: -25, bottom: 0 }}
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
        <YAxis dataKey="value" fontSize={12} />
        <Bar type="natural" dataKey="value" fill="#2196F3" />
        <Tooltip
          cursor={{
            fill: "rgba(255, 255, 255, 0.2)",
            radius: 4,
          }}
          content={
            <ChartTooltip
              labelFormatter={(label) => dayjs(label).format("MMM D, YYYY")}
            />
          }
        />
      </BarChart>
    </ResponsiveContainer>
  );
};
