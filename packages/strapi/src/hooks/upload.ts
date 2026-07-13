import { useState } from "react";

interface StrapiUploadParams {
  maxCount: number;
}

type UseStrapiUploadType = (uploadParams: StrapiUploadParams) => {
  uploadedFileIds: string[];
  beforeUpload: (_file: any, files: any[]) => boolean;
  fileList: any[];
  maxCount: number;
};

export const useStrapiUpload: UseStrapiUploadType = ({ maxCount }) => {
  const [uploadedFileIds] = useState<string[]>([]);
  const [fileList, setFileList] = useState<any[]>([]);

  const beforeUpload = (_file: any, files: any[]): boolean => {
    const totalFiles = fileList.length;
    const filesCount = files.length;

    if (totalFiles + filesCount > maxCount) {
      const excessFileCount = totalFiles + filesCount - maxCount;
      // convert negative
      const deleteItemCount = excessFileCount - excessFileCount * 2;
      files.splice(deleteItemCount);
    }

    // @ts-ignore
    setFileList([...fileList, ...files]);

    return true;
  };

  return {
    uploadedFileIds,
    beforeUpload,
    fileList,
    maxCount,
  };
};
