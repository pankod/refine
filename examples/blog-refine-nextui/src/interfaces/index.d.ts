export interface IOrder {
  id: number;
  user: IUser;
  createdAt: string;
  status: IOrderStatus;
  adress: IAddress;
  amount: number;
}

export interface IUser {
  id: number;
  fullName: string;
  gender: string;
  gsm: string;
  createdAt: string;
  addresses: IAddress[];
}

export interface IOrderStatus {
  id: number;
  text: "Pending" | "Ready" | "On The Way" | "Delivered" | "Cancelled";
}

export interface IAddress {
  text: string;
  coordinate: [string, string];
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

export interface IProduct {
  id: number;
  name: string;
  isActive: boolean;
  description: string;
  createdAt: string;
  price: number;
  category: ICategory;
  stock: number;
  images: IImage[];
}

export interface IImage {
  url: string;
}

export interface ICategory {
  id: number;
  title: string;
  isActive: boolean;
  cover: string;
}

export interface IProductCategory {
  value: number;
  label: string;
}

export interface IDeleteModalProps {
  isOpen: boolean;
  warningMessage: string;
  onOpenChange: () => void;
  onDelete: () => void;
}

interface IDisplayAreaGraphProps {
  data: IChartDatum[];
  stroke: string;
  fill: string;
}

interface IDisplayBarChartProps {
  data: IChartDatum[];
  fill: string;
}
