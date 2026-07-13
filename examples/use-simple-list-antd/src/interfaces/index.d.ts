export interface ICategory {
  id: number;
  title: string;
}

export interface IPost {
  id: number;
  title: string;
  content: string;
  hit: number;
  category: { id: number };
}

export interface IPostFilterVariables {
  category: string;
  createdAt: [Dayjs, Dayjs];
}
