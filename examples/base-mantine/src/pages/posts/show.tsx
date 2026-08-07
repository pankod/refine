import { useShow, useOne, useMany } from "@refinedev/core";
import { Show, MarkdownField } from "@refinedev/mantine";

import { Title, Text, Badge, Flex } from "@mantine/core";

import type { ICategory, IPost, ITag } from "../../interfaces";

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

  const { result: tagsData } = useMany<ITag>({
    resource: "tags",
    ids: record?.tags || [],
    queryOptions: {
      enabled: !!record?.tags?.length,
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
      <Flex
        gap="xs"
        justify="flex-start"
        align="center"
        direction="row"
        wrap="wrap"
      >
        {tagsData?.data?.map((tag) => (
          <Badge key={tag.id} mt="xs">
            {tag.title}
          </Badge>
        ))}
      </Flex>
      <Title mt="xs" order={5}>
        Content
      </Title>
      <MarkdownField value={record?.content} />
    </Show>
  );
};
