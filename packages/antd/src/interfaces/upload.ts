export interface UploadedFile {
  uid: string;
  name: string;
  url: string;
  type: string;
  size: number;
  percent: number;
  status: "error" | "success" | "done" | "uploading" | "removed";
}
