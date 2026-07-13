export interface IPost {
  id: string;
  title: string;
  status: "published" | "draft" | "rejected";
  createdAt: string;
  category: ICategory;
}

export interface ICategory {
  id: string;
  title: string;
}
