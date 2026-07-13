export const handleMultiple = async <TData = unknown>(
  promises: Promise<{ data: TData }>[],
): Promise<{ data: TData[] }> => {
  return {
    data: (await Promise.all(promises)).map((res) => res.data),
  };
};
