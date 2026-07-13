export const normalizeFile = (event: any) => {
  const { fileList } = event;

  return fileList.map((item: any) => {
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
