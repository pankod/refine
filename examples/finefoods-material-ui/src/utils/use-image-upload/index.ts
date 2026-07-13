import axios from "axios";
import type { IFile } from "../../interfaces";

type Props = {
  file: FileList[number];
  apiUrl: string;
};

export const useImageUpload = async ({ apiUrl, file }: Props) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await axios.post<{ url: string }>(
    `${apiUrl}/media/upload`,
    formData,
    {
      withCredentials: false,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    },
  );

  const { name, size, type, lastModified } = file;

  const imagePaylod: IFile[] = [
    {
      name,
      size,
      type,
      lastModified,
      url: res.data.url,
    },
  ];

  return imagePaylod;
};
