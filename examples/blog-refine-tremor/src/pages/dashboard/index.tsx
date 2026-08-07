import React from "react";
import {
  Card,
  Grid,
  Title,
  Text,
  Tab,
  TabList,
  TabGroup,
  TabPanel,
  TabPanels,
} from "@tremor/react";

import { useApiUrl, useCustom } from "@refinedev/core";
import dayjs from "dayjs";

const query = {
  start: dayjs().subtract(7, "days").startOf("day"),
  end: dayjs().startOf("day"),
};

import { KpiCard } from "./kpiCard";
import { ChartView } from "./chartView";
import { Details } from "./details";

const calculatePercentage = (total: number, target: number): number => {
  return Math.round((total / target) * 100 * 100) / 100;
};

export const DashboardPage: React.FC = () => {
  const API_URL = useApiUrl("metrics");

  const { result: dailyRevenue } = useCustom({
    url: `${API_URL}/dailyRevenue`,
    method: "get",
    config: {
      query,
    },
  });

  const { result: dailyOrders } = useCustom({
    url: `${API_URL}/dailyOrders`,
    method: "get",
    config: {
      query,
    },
  });

  const { result: newCustomers } = useCustom({
    url: `${API_URL}/newCustomers`,
    method: "get",
    config: {
      query,
    },
  });
  return (
    <main className="m-2">
      <Title>Dashboard</Title>
      <Text>View core metrics on the state of your company.</Text>
      <TabGroup className="mt-6">
        <TabList>
          <Tab>Overview</Tab>
          <Tab>Details</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Grid numItemsMd={2} numItemsLg={3} className="mt-6 gap-6">
              <KpiCard
                title="Weekly Revenue"
                total={`$ ${dailyRevenue?.data.total ?? 0}`}
                trend={dailyRevenue?.data.trend ?? 0}
                target="$ 10,500"
                percentage={calculatePercentage(
                  dailyRevenue?.data.total ?? 0,
                  10_500,
                )}
              />
              <KpiCard
                title="Weekly Orders"
                total={`${dailyOrders?.data.total ?? 0}`}
                trend={dailyOrders?.data.trend ?? 0}
                target="500"
                percentage={calculatePercentage(
                  dailyOrders?.data.total ?? 0,
                  500,
                )}
              />
              <KpiCard
                title="New Customers"
                total={`${newCustomers?.data.total ?? 0}`}
                trend={newCustomers?.data.trend ?? 0}
                target="200"
                percentage={calculatePercentage(
                  newCustomers?.data.total ?? 0,
                  200,
                )}
              />
            </Grid>
            <div className="mt-6">
              <ChartView
                revenue={dailyRevenue?.data.data ?? []}
                orders={dailyOrders?.data.data ?? []}
                customers={newCustomers?.data.data ?? []}
              />
            </div>
          </TabPanel>
          <TabPanel>
            <div className="mt-6">
              <Details />
            </div>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </main>
  );
};
