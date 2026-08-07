import React from "react";
import { useApiUrl, useCustom } from "@refinedev/core";
import dayjs from "dayjs";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Tab from "@mui/material/Tab";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";

import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import KpiCard from "../../components/kpi-card";
import { AreaGraph, BarChart } from "../../components/charts";
import { RecentSales } from "../../components/recent-sales";
import type { IChart } from "../../interfaces";

const Responsive = styled("div")(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    width: "880px",
  },
  [theme.breakpoints.down("sm")]: {
    width: "374px",
  },
}));

// KPI card code
const query = {
  start: dayjs().subtract(7, "days").startOf("day"),
  end: dayjs().startOf("day"),
};

const formatCurrency = Intl.NumberFormat("en", {
  style: "currency",
  currency: "USD",
});

export function Dashboard() {
  const API_URL = useApiUrl();

  const { result: revenue } = useCustom<IChart>({
    url: `${API_URL}/dailyRevenue`,
    method: "get",
    config: {
      query,
    },
  });

  const { result: orders } = useCustom<IChart>({
    url: `${API_URL}/dailyOrders`,
    method: "get",
    config: {
      query,
    },
  });

  const { result: customers } = useCustom<IChart>({
    url: `${API_URL}/newCustomers`,
    method: "get",
    config: {
      query,
    },
  });

  // Chart code
  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <main>
      <Box mt={2} mb={5}>
        <Grid container columnGap={3} rowGap={3}>
          <Grid size="grow">
            <KpiCard
              title="Weekly Revenue"
              total={revenue?.data.total ?? 0}
              trend={revenue?.data.trend ?? 0}
              target={10000}
              formatTotal={(value) => formatCurrency.format(value)}
              formatTarget={(value) => formatCurrency.format(value)}
            />
          </Grid>
          <Grid size="grow">
            <KpiCard
              title="Weekly Orders"
              total={orders?.data.total ?? 0}
              trend={orders?.data.trend ?? 0}
              target={150}
            />
          </Grid>
          <Grid size="grow">
            <KpiCard
              title="New Customers"
              total={customers?.data.total ?? 0}
              trend={customers?.data.trend ?? 0}
              target={300}
            />
          </Grid>
        </Grid>
      </Box>
      <Box my={5} sx={{ boxShadow: 5 }}>
        <Card>
          <CardHeader title="Sales Chart" />
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Revenues" value="1" />
                <Tab label="Orders" value="2" />
                <Tab label="Customers" value="3" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <AreaGraph
                data={revenue?.data?.data ?? []}
                stroke="#8884d8"
                fill="#cfeafc"
              />
            </TabPanel>
            <TabPanel value="2">
              <BarChart data={orders?.data?.data ?? []} fill="#ffce90" />
            </TabPanel>
            <TabPanel value="3">
              <AreaGraph
                data={customers?.data?.data ?? []}
                stroke="#00bd56"
                fill="#ccf3f3"
              />
            </TabPanel>
          </TabContext>
        </Card>
      </Box>
      <Responsive>
        <RecentSales />
      </Responsive>
    </main>
  );
}
