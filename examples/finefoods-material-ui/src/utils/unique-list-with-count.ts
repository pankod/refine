export const getUniqueListWithCount = <TData = any>(props: {
  list: TData[];
  field: string;
}) => {
  const { list, field } = props;

  const uniqueList = list.reduce(
    (acc, item: any) => {
      if (!acc[item[field]]) {
        acc[item[field]] = {
          ...item,
          count: 1,
        };
      } else {
        acc[item[field]].count += 1;
      }
      return acc;
    },
    {} as Record<string, TData & { count: number }>,
  );

  return Object.values(uniqueList);
};
