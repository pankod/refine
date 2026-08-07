import React from "react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import { useApiUrl, useCustom } from "@refinedev/core";
import type { IChart } from "../../interfaces";

import { KpiCard } from "../../components/kpiCard";
import { DisplayAreaGraph, DisplayBarChart } from "../../components/charts";
import { RecentSalesTable } from "../../components/table";
import dayjs from "dayjs";

const query = {
  start: dayjs().subtract(7, "days").startOf("day"),
  end: dayjs().startOf("day"),
};

const currencyFormatter = Intl.NumberFormat("en", {
  style: "currency",
  currency: "USD",
});
const numberFormatter = Intl.NumberFormat("en");

export const DashboardPage: React.FC = () => {
  const API_URL = useApiUrl();

  const { result: dailyRevenue } = useCustom<IChart>({
    url: `${API_URL}/dailyRevenue`,
    method: "get",
    config: {
      query,
    },
  });

  const { result: dailyOrders } = useCustom<IChart>({
    url: `${API_URL}/dailyOrders`,
    method: "get",
    config: {
      query,
    },
  });

  const { result: newCustomers } = useCustom<IChart>({
    url: `${API_URL}/newCustomers`,
    method: "get",
    config: {
      query,
    },
  });

  return (
    <main className="flex w-full flex-col mt-5 gap-3">
      <h1 className="font-bold">Dashboards</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 justify-items-stretch">
        <KpiCard
          title="Weekly Revenue"
          total={dailyRevenue?.data.total ?? 0}
          trend={dailyRevenue?.data.trend ?? 0}
          target={10_500}
          formattedTotal={`${currencyFormatter.format(
            dailyRevenue?.data.total ?? 0,
          )}`}
          formattedTarget={`${currencyFormatter.format(10_500)}`}
        />
        <KpiCard
          title="Weekly Orders"
          total={dailyOrders?.data.total ?? 0}
          trend={dailyOrders?.data.trend ?? 0}
          target={500}
          formattedTotal={`${numberFormatter.format(
            dailyOrders?.data.total ?? 0,
          )}`}
          formattedTarget={`${numberFormatter.format(500)}`}
        />
        <KpiCard
          title="New Customers"
          total={newCustomers?.data.total ?? 0}
          trend={newCustomers?.data.trend ?? 0}
          target={200}
          formattedTotal={`${numberFormatter.format(
            newCustomers?.data.total ?? 0,
          )}`}
          formattedTarget={`${numberFormatter.format(200)}`}
        />
      </div>
      <Card className="p-5">
        <Tabs aria-label="Options" className="gap-0">
          <Tab key="revenue" title="Revenue">
            <Card shadow="none" radius="none">
              <CardBody>
                <DisplayAreaGraph
                  data={dailyRevenue?.data?.data ?? []}
                  stroke="#8884d8"
                  fill="#cfeafc"
                />
              </CardBody>
            </Card>
          </Tab>
          <Tab key="orders" title="Orders">
            <Card shadow="none" radius="none">
              <CardBody>
                <DisplayBarChart
                  data={dailyOrders?.data?.data ?? []}
                  fill="#ffce90"
                />{" "}
              </CardBody>
            </Card>
          </Tab>
          <Tab key="customers" title="Customers">
            <Card shadow="none" radius="none">
              <CardBody>
                <DisplayAreaGraph
                  data={newCustomers?.data?.data ?? []}
                  stroke="#00bd56"
                  fill="#ccf3f3"
                />{" "}
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </Card>
      <RecentSalesTable />
    </main>
  );
};
