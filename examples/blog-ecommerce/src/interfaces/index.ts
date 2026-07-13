export interface IProduct {
  id: string;
  title: string;
  description: string;
  image?: null | { url: string };
}

export interface IStore {
  id: string;
  title: string;
}
