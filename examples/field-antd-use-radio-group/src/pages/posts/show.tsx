import { useShow, useOne } from "@refinedev/core";

import { Show, MarkdownField } from "@refinedev/antd";

import { Typography } from "antd";

import type { IPost, ILanguage } from "../../interfaces";

const { Title, Text } = Typography;

export const PostShow = () => {
  const { query: queryResult } = useShow<IPost>();
  const { data, isLoading } = queryResult;
  const record = data?.data;

  const {
    result: languageData,
    query: { isLoading: languageIsLoading },
  } = useOne<ILanguage>({
    resource: "languages",
    id: record?.language || "",
    queryOptions: {
      enabled: !!record,
    },
  });

  return (
    <Show isLoading={isLoading && languageIsLoading}>
      <Title level={5}>Id</Title>
      <Text>{record?.id}</Text>
      <Title level={5}>Title</Title>
      <Text>{record?.title}</Text>
      <Title level={5}>Language</Title>
      <Text>{languageData?.title}</Text>
      <Title level={5}>Content</Title>
      <MarkdownField value={record?.content} />
    </Show>
  );
};
