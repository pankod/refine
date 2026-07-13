export const getValueProps = (data: any, imageUrl: string) => {
  if (!data) {
    return { fileList: [] };
  }

  return {
    file: data.file,
    fileList:
      data.fileList ??
      (Array.isArray(data) ? data : [...data]).map((item: any) => {
        const file: any = {
          name: item.name,
          percent: item.percent,
          size: item.size,
          status: item.status,
          type: item.mime || item.type,
          uid: item.id,
        };

        if (item.url) {
          file.url = `${imageUrl}${item.url}`;
        }

        return file;
      }),
  };
};

export const mediaUploadMapper = (params: any) => {
  Object.keys(params).map((item) => {
    if (params[item]) {
      const param = params[item].fileList;
      const isMediaField = Array.isArray(param);
      if (isMediaField) {
        const ids = [];
        for (const item of param) {
          if (item.response) {
            for (const response of item.response) {
              ids.push(response.id);
            }
          } else {
            ids.push(item.uid);
          }
        }
        params[item] = ids;
      }
    }
  });
  return params;
};
