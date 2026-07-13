import { useOne, useShow } from "@refinedev/core";
import { Show, MarkdownField } from "@refinedev/antd";

import type { IPost, ICategory } from "../../interfaces";
import { Tag, Typography } from "antd";

const { Title, Text } = Typography;

export const PostShow = () => {
  const { query: queryResult } = useShow<IPost>();
  const { data, isLoading } = queryResult;
  const record = data?.data;

  const { result: categoryData } = useOne<ICategory>({
    resource: "categories",
    id: record?.category.id ?? "",
    queryOptions: {
      enabled: !!record?.category.id,
    },
  });

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>Title</Title>
      <Text>{record?.title}</Text>
      <Title level={5}>Status</Title>
      <Text>
        <Tag>{record?.status}</Tag>
      </Text>
      <Title level={5}>Category</Title>
      <Text>{categoryData?.title}</Text>
      <Title level={5}>Content</Title>
      <MarkdownField value={record?.content} />
    </Show>
  );
};
