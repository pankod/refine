export interface ICategory {
  id: number;
  title: string;
}

export interface IPost {
  id: number;
  title: string;
  content: string;
  status: "published" | "draft";
  category: { id: number };
}

export interface IPostFilterVariables {
  q: string;
  category: string;
  status: string;
  createdAt: [Dayjs, Dayjs];
}
