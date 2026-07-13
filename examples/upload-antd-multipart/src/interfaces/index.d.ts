export interface UploadFile {
  name: string;
  url: string;
  size: number;
  uid: string;
}

export interface ICategory {
  id: number;
  title: string;
}

export interface IPost {
  id: number;
  title: string;
  content: string;
  status: "published" | "draft" | "rejected";
  image: UploadFile[];
  category: { id: number };
}
