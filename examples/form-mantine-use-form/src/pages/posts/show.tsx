import { useShow, useOne } from "@refinedev/core";
import { Show, MarkdownField } from "@refinedev/mantine";

import { Title, Text } from "@mantine/core";

import type { ICategory, IPost } from "../../interfaces";

export const PostShow: React.FC = () => {
  const { query: queryResult } = useShow<IPost>();
  const { data, isLoading } = queryResult;
  const record = data?.data;

  const { result: categoryData } = useOne<ICategory>({
    resource: "categories",
    id: record?.category.id || "",
    queryOptions: {
      enabled: !!record?.category.id,
    },
  });

  return (
    <Show isLoading={isLoading}>
      <Title order={5}>Id</Title>
      <Text mt="xs">{record?.id}</Text>
      <Title mt="xs" order={5}>
        Title
      </Title>
      <Text mt="xs">{record?.title}</Text>
      <Title mt="xs" order={5}>
        Status
      </Title>
      <Text mt="xs">{record?.status}</Text>
      <Title mt="xs" order={5}>
        Category
      </Title>
      <Text mt="xs">{categoryData?.title}</Text>
      <Title mt="xs" order={5}>
        Tags
      </Title>
      <Title mt="xs" order={5}>
        Content
      </Title>
      <MarkdownField value={record?.content} />
    </Show>
  );
};
