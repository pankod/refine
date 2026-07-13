export interface ICategory {
  id: number;
  title: string;
}

export interface IPost {
  title: string;
  content: string;
  status: "published" | "draft" | "rejected";
  category: { id: number };
}
