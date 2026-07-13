import { useShow, useOne, useMany } from "@refinedev/core";

import { Show, MarkdownField } from "@refinedev/antd";

import { Space, Tag, Typography } from "antd";

import type { IPost, ICategory, ITag } from "../../interfaces";

const { Title, Text } = Typography;

export const PostShow = () => {
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

  const { result: tagsData } = useMany<ITag>({
    resource: "tags",
    ids: record?.tags || [],
    queryOptions: {
      enabled: !!record?.tags.length,
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
      <Title level={5}>Tags</Title>
      <Space size={[0, 8]} wrap>
        {tagsData?.data?.map((tag) => (
          <Tag key={tag.id}>{tag.title}</Tag>
        ))}
      </Space>
    </Show>
  );
};
