import { Card } from "primereact/card";
import { Chart } from "primereact/chart";
import { TabView, TabPanel } from "primereact/tabview";

import type { ChartData, ChartOptions } from "chart.js";

import type { IChartDatum } from "../../../interfaces";

interface ChartViewProps {
  revenue: IChartDatum[];
  orders: IChartDatum[];
  customers: IChartDatum[];
}

const commonLineOptions: ChartOptions = {
  maintainAspectRatio: false,
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

const formatDate = new Intl.DateTimeFormat("en-US", {
  month: "short",
  year: "numeric",
  day: "numeric",
});

export const ChartView = ({ revenue, orders, customers }: ChartViewProps) => {
  const dailyRevenueLabels = revenue.map((dataObj) => {
    const date = new Date(dataObj.date);
    return formatDate.format(date);
  });
  const dailyRevenueData = revenue.map((data) => Number(data.value));

  const dailyOrdersLabels = orders.map((data) => {
    const date = new Date(data.date);
    return formatDate.format(date);
  });
  const dailyOrdersData = orders.map((data) => Number(data.value));

  const newCustomersLabels = customers.map((data) => {
    const date = new Date(data.date);
    return formatDate.format(date);
  });
  const newCustomersData = customers.map((data) => Number(data.value));

  const documentStyle = getComputedStyle(document.documentElement);

  const revenuelineData: ChartData = {
    labels: dailyRevenueLabels,
    datasets: [
      {
        label: "Daily Revenue",
        data: dailyRevenueData,
        fill: true,
        borderColor: documentStyle.getPropertyValue("--blue-500"),
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        tension: 0.4,
      },
    ],
  };

  const orderBarData: ChartData = {
    labels: dailyOrdersLabels,
    datasets: [
      {
        label: "Daily Orders",
        data: dailyOrdersData,
        backgroundColor: "rgba(255, 159, 64, 0.5)",
      },
    ],
  };

  const newCustomersLineData: ChartData = {
    labels: newCustomersLabels,
    datasets: [
      {
        label: "New Customers",
        data: newCustomersData,
        fill: true,
        borderColor: documentStyle.getPropertyValue("--green-500"),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4,
      },
    ],
  };

  return (
    <Card className="shadow-1">
      <TabView>
        <TabPanel header="Daily Revenue">
          <Chart
            type="line"
            data={revenuelineData}
            options={commonLineOptions}
            style={{ height: "400px" }}
          />
        </TabPanel>
        <TabPanel header="Daily Orders">
          <Chart
            type="bar"
            data={orderBarData}
            options={commonLineOptions}
            style={{ height: "400px" }}
          />
        </TabPanel>
        <TabPanel header="New Customers">
          <Chart
            type="line"
            data={newCustomersLineData}
            options={commonLineOptions}
            style={{ height: "400px" }}
          />
        </TabPanel>
      </TabView>
    </Card>
  );
};
