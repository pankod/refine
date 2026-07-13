export interface IPost {
  id: string;
  name: string;
  title: string;
  content: string;
  category: string;
  Status: "published" | "draft" | "rejected";
  createdAt: string;
}

export interface ICategory {
  id: string;
  name: string;
  posts: string;
}
