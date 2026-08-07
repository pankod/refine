import { useShow, useMany } from "@refinedev/core";
import { Show, MarkdownField } from "@refinedev/antd";

import { Space, Tag, Typography } from "antd";
import type { ICategory, IPost } from "../../interfaces";

const { Title, Text } = Typography;

export const PostShow = () => {
  const { query: queryResult } = useShow<IPost>();
  const { data, isLoading } = queryResult;
  const record = data?.data;

  const categoryIds =
    record?.categories?.map((category) => category._ref) || [];
  const { result: dataCategories } = useMany<ICategory>({
    resource: "category",
    ids: categoryIds,
  });

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>Id</Title>
      <Text>{record?._id}</Text>

      <Title level={5}>Title</Title>
      <Text>{record?.title}</Text>

      <Title level={5}>Slug</Title>
      <Text>{record?.slug?.current}</Text>

      <Title level={5}>Content</Title>
      <MarkdownField value={record?.content} />

      <Title level={5}>Categories</Title>
      <Space>
        {dataCategories?.data?.map((category) => (
          <Tag key={category._id}>{category.title}</Tag>
        ))}
      </Space>
    </Show>
  );
};
