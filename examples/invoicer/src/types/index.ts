import type { UploadFile } from "antd";
import type { UploadChangeParam } from "antd/lib/upload";

export type UploadResponse = UploadChangeParam<UploadFile<Media[]>>;

export type AccountForm = {
  company_name: string;
  owner_name: string;
  owner_email: string;
  country: string;
  address: string;
  phone: string;
  logo?: UploadResponse;
};

export type Account = {
  id: number;
  createdAt: string;
  updatedAt: string;
  logo?: Media;
  invoices?: Invoice[];
  clients?: Client[];
} & Omit<AccountForm, "logo">;

export type Client = {
  id: number;
  name: string;
  owner_name: string;
  owner_email: string;
  country: string;
  address: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  invoices?: Invoice[];
  account?: Account;
};

export type Invoice = {
  id: number;
  name: string;
  date: string;
  discount: number;
  tax: number;
  custom_id: string;
  services: Service[];
  subTotal: number;
  total: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  account: Account;
  client: Client;
};

export type Service = {
  title: string;
  unitPrice: number;
  quantity: number;
  discount: number;
  totalPrice: number;
};

export type User = {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Media = {
  id: number;
  name: string;
  alternativeText: any;
  caption: any;
  width: number;
  height: number;
  formats: any;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: any;
  provider: string;
  provider_metadata: any;
  createdAt: string;
  updatedAt: string;
};
