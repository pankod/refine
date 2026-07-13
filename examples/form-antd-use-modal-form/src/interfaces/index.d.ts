export interface IPost {
  id: number;
  title: string;
  status: "published" | "draft" | "rejected";
}
