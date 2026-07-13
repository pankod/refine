export interface ICategory {
  id: number;
  title: string;
}

export interface IUser {
  id: number;
}
export interface IPostFile {
  id: number;
  title: string;
  content: string;
  userId: number;
  categoryId: number;
  status: "published" | "draft" | "rejected";
}

export interface IPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  status: "published" | "draft" | "rejected";
  category: { id: number };
  user: IUser;
}
