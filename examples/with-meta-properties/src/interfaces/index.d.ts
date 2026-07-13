export interface IPost {
  id: number;
  title: string;
  content: string;
  status: "published" | "draft" | "rejected";
  category: { id: number };
}

export interface IUser {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
}
