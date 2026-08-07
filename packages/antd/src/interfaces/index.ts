export type BaseRecord = {
  id?: string;
  [key: string]: any;
};
export interface Option {
  label: string;
  value: string;
}

export * from "./field";
export * from "./upload";
