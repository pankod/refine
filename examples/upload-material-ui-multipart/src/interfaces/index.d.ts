export interface ICategory {
  id: number;
  title: string;
}

export type IStatus = "published" | "draft" | "rejected";

export interface IPost {
  id: number;
  title: string;
  content: string;
  status: IStatus;
  category: ICategory;
  images: Record<string, any>;
}

export type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};
