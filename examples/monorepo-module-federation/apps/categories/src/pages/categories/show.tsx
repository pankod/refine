import { useShow } from "@refinedev/core";

import { Show } from "@refinedev/antd";

import { Typography } from "antd";

import type { ICategory } from "../../interfaces";

const { Title, Text } = Typography;

const CategoryShow = () => {
  const { query: queryResult } = useShow<ICategory>();
  const { data, isLoading } = queryResult;
  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>Id</Title>
      <Text>{record?.id}</Text>

      <Title level={5}>Title</Title>
      <Text>{record?.title}</Text>
    </Show>
  );
};

export default CategoryShow;
