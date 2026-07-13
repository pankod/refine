import type { UploadFile } from "antd/lib/upload/interface";

interface UploadResponse {
  fileUrl: string;
}
interface EventArgs<T = UploadResponse> {
  file: UploadFile<T>;
  fileList: Array<UploadFile<T>>;
}

export const normalizeFile = (event: EventArgs) => {
  const { fileList } = event;

  return fileList.map((item) => {
    let { url } = item;
    const { uid, name, response, type, size, percent, status } = item;

    if (response) {
      url = response.fileUrl;
    }

    return { uid, name, url, type, size, percent, status };
  });
};
