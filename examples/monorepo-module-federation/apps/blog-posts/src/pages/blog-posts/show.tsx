import { MarkdownField, Show } from "@refinedev/antd";
import { useOne, useShow } from "@refinedev/core";

import { Typography } from "antd";

import type { ICategory, IPost } from "../../interfaces";

const { Title, Text } = Typography;

const PostShow = () => {
  const { query: queryResult } = useShow<IPost>();
  const { data, isLoading } = queryResult;
  const record = data?.data;

  const {
    result: categoryData,
    query: { isLoading: categoryIsLoading },
  } = useOne<ICategory>({
    resource: "categories",
    id: record?.category.id || "",
    queryOptions: {
      enabled: !!record,
    },
  });

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>Id</Title>
      <Text>{record?.id}</Text>
      <Title level={5}>Title</Title>
      <Text>{record?.title}</Text>
      <Title level={5}>Category</Title>
      <Text>{categoryIsLoading ? "Loading..." : categoryData?.title}</Text>
      <Title level={5}>Content</Title>
      <MarkdownField value={record?.content} />
    </Show>
  );
};

export default PostShow;
