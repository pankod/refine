import { Suspense } from "react";
import { useTranslate } from "@refinedev/core";
import type { ColumnConfig } from "@ant-design/plots/lib/components/column";
import { Column } from "@ant-design/plots";
import dayjs from "dayjs";
import { useConfigProvider } from "../../../context";

type Props = {
  data: ColumnConfig["data"];
  height: number;
};

export const NewCustomers = ({ data, height }: Props) => {
  const { mode } = useConfigProvider();
  const t = useTranslate();

  const config: ColumnConfig = {
    data,
    xField: "timeText",
    yField: "value",
    seriesField: "state",
    autoFit: true,
    animation: true,
    legend: false,
    columnStyle: {
      radius: [4, 4, 0, 0],
      fill:
        mode === "dark"
          ? "l(270) 0:#122849 1:#3C88E5"
          : "l(270) 0:#BAE0FF 1:#1677FF",
    },
    theme: mode,
    tooltip: {
      formatter: (datum) => {
        return {
          name: t("dashboard.newCustomers.title"),
          value: new Intl.NumberFormat().format(Number(datum.value)),
        };
      },
    },
    xAxis: {
      label: {
        formatter: (v) => {
          if (data.length > 7) {
            return dayjs(v).format("MM/DD");
          }

          return dayjs(v).format("ddd");
        },
      },
    },
    yAxis: {
      label: {
        formatter: (v) => {
          return new Intl.NumberFormat().format(Number(v));
        },
      },
    },
  };

  return (
    <Suspense>
      <Column {...config} height={height} />
    </Suspense>
  );
};
