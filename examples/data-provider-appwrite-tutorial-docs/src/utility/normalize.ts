import type { UploadFile } from "antd/lib/upload/interface";

interface UploadResponse {
  url: string;
}
interface EventArgs<T = UploadResponse> {
  file: UploadFile<T>;
  fileList: Array<UploadFile<T>>;
}

export const normalizeFile = (event: EventArgs) => {
  const { fileList } = event;

  return fileList.map((item) => {
    const { uid, name, type, size, response, percent, status } = item;

    return {
      uid,
      name,
      url: item.url || response?.url,
      type,
      size,
      percent,
      status,
    };
  });
};
