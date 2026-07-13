export type KpiCardProps = {
  title: string;
  total: number;
  trend: number;
  target: number;
  formatTotal?: (value: number) => number | string;
  formatTarget?: (value: number) => number | string;
};

export type DeltaType =
  | "error"
  | "warning"
  | "primary"
  | "secondary"
  | "success"
  | "info";

export interface IOrder {
  id: number;
  user: IUser;
  createdAt: string;
  status: IOrderStatus;
  address: IAddress;
  amount: number;
}

export interface IOrderStatus {
  id: number;
  text: "Pending" | "Ready" | "On The Way" | "Delivered" | "Cancelled";
}

export interface IChartDatum {
  date: string;
  value: string;
}

export interface IChart {
  data: IChartDatum[];
  total: number;
  trend: number;
}

export type IUser = {
  id: number;
  name: string;
  avatar: string;
};

interface IAreaGraphProps {
  data: IChartDatum[];
  stroke: string;
  fill: string;
}

interface IBarChartProps {
  data: IChartDatum[];
  fill: string;
}
