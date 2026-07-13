export interface ICompany {
  id: string;
  name: string;
  address: string;
  country: string;
  city: string;
  email: string;
  website: string;
  logo?: null | { url: string };
}

export interface IClient {
  id: string;
  name: string;
  contacts: IContact[];
}

export interface IContact {
  id: string;
  first_name: string;
  last_name: string;
  client: IClient;
  email: string;
}

export interface IMission {
  id: string;
  mission: string;
  day: number;
  daily_rate: number;
}

export interface IInvoice {
  id: string;
  name: string;
  date: Date;
  company: ICompany;
  discount: number;
  tax: number;
  custom_id: string;
  comments: string;
  contact: IContact;
  missions: IMission[];
  status: Status;
}

type Status = {
  status: "Paid" | "No Paid";
};
