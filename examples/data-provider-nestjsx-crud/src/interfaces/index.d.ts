export interface ICategory {
  id: string;
  title: string;
}

export interface ITags {
  id: string;
  title: string;
}

export interface IPost {
  id: string;
  title: string;
  content: string;
  status: "published" | "draft" | "rejected";
  category: ICategory;
  tags: ITags[];
}
