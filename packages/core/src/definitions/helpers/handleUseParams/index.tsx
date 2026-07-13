export const handleUseParams = (params: any = {}): any => {
  if (params?.id) {
    return {
      ...params,
      id: decodeURIComponent(params.id),
    };
  }
  return params;
};
