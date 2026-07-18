const safeDecodeURIComponent = (value: string) => {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
};

export const handleUseParams = (params: any = {}): any => {
  if (params?.id) {
    return {
      ...params,
      id: safeDecodeURIComponent(params.id),
    };
  }
  return params;
};
