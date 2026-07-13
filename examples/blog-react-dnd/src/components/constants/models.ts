import type { ColumnTypes } from "./enums";

export interface OrderProps {
  id: number;
  title: string;
  desc: string;
  column?: ColumnTypes;
}

export interface dragItem {
  index: number;
  id: OrderProps["id"];
}

export interface IProduct {
  id: number;
  name: string;
  material: string;
  column?: ColumnTypes.ORDERS;
}
