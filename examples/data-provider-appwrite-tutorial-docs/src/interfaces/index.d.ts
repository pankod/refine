export interface ICategory {
  id: string;
  title: string;
}

export const IStatus = "draft" | "published" | "rejected";

export interface IFile {
  name: string;
  percent: number;
  size: number;
  status: "error" | "success" | "done" | "uploading" | "removed";
  type: string;
  uid: string;
  url: string;
}

export interface IPost {
  id: string;
  title: string;
  content: string;
  status: IStatus;
  category: {
    $id: string;
    title: string;
  };
  images: string;
}

export interface IPostVariables {
  id: string;
  title: string;
  content: string;
  category: string;
  images: string;
}
