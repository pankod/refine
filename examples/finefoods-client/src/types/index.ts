export type File = {
  name: string;
  percent: number;
  size: number;
  status: "error" | "success" | "done" | "uploading" | "removed";
  type: string;
  uid: string;
  url: string;
};

export type Category = {
  id: number;
  title: string;
  isActive: boolean;
  cover?: string;
};

export type Product = {
  id: number;
  name: string;
  isActive: boolean;
  description: string;
  images: File[];
  createdAt: string;
  price: number;
  category: Category;
  stock: number;
};

export type Address = {
  text: string;
  coordinate: [string, string];
};

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  fullName: string;
  gender: string;
  gsm: string;
  createdAt: string;
  isActive: boolean;
  avatar: File[];
  addresses: Address[];
};

export type OrderStatus = {
  id: number;
  text: "Pending" | "Ready" | "On The Way" | "Delivered" | "Cancelled";
};

export type Store = {
  id: number;
  title: string;
  isActive: boolean;
  createdAt: string;
  address: Address;
  products: Product[];
};

export type Courier = {
  id: number;
  name: string;
  surname: string;
  gender: string;
  gsm: string;
  createdAt: string;
  isActive: boolean;
  avatar: File[];
};

export type Event = {
  date: string;
  status: string;
};

export type Order = {
  id: number;
  user: User;
  createdAt: string;
  products: Product[];
  status: OrderStatus;
  adress: Address;
  store: Store;
  courier: Courier;
  events: Event[];
  orderNumber: number;
  amount: number;
};

export type BasketOrder = {
  productId: number;
  amount: number;
};
