import { useState } from "react";
import {
  AreaChart,
  Card,
  Flex,
  Text,
  Title,
  Icon,
  TabGroup,
  TabList,
  Tab,
} from "@tremor/react";

import { InformationCircleIcon } from "@heroicons/react/24/solid";

interface IObject {
  date: string;
  value: string;
}

interface IProps {
  revenue: IObject[];
  orders: IObject[];
  customers: IObject[];
}

// Basic formatters for the chart values
const dollarFormatter = (value: number) =>
  `$ ${Intl.NumberFormat("us").format(value).toString()}`;

const numberFormatter = (value: number) =>
  `${Intl.NumberFormat("us").format(value).toString()}`;

const formatDate = new Intl.DateTimeFormat("en-US", {
  month: "short",
  year: "numeric",
  day: "numeric",
});

export function ChartView({ revenue, orders, customers }: IProps) {
  const [selectedKpi, setSelectedKpi] = useState(0);

  // map formatters by selectedKpi
  const formatters: { [key: string]: any } = {
    revenue: dollarFormatter,
    orders: numberFormatter,
    customers: numberFormatter,
  };

  let data = revenue;
  if (selectedKpi === 1) {
    data = orders;
  }

  if (selectedKpi === 2) {
    data = customers;
  }

  const transformedData = data.map((dataObj) => {
    const date = new Date(dataObj.date);
    dataObj.date = formatDate.format(date);

    return dataObj;
  });

  return (
    <Card>
      <div className="justify-between md:flex">
        <div>
          <Flex
            justifyContent="start"
            className="space-x-0.5"
            alignItems="center"
          >
            <Title> Performance History </Title>
            <Icon
              icon={InformationCircleIcon}
              variant="simple"
              tooltip="Shows daily performance change"
            />
          </Flex>
          <Text> Daily increase or decrease per domain </Text>
        </div>
        <div className="mt-6 md:mt-0">
          <TabGroup
            index={selectedKpi}
            onIndexChange={(idx) => setSelectedKpi(idx)}
          >
            <TabList>
              <Tab>Revenue</Tab>
              <Tab>Orders</Tab>
              <Tab>Customers</Tab>
            </TabList>
          </TabGroup>
        </div>
      </div>
      <AreaChart
        data={transformedData}
        index="date"
        categories={["value"]}
        colors={["blue"]}
        showLegend={true}
        valueFormatter={formatters[selectedKpi]}
        yAxisWidth={56}
        className="mt-8 h-96"
      />
    </Card>
  );
}
