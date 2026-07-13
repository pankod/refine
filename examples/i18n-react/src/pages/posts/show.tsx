import { useShow, useOne, useTranslation } from "@refinedev/core";
import { Show, MarkdownField } from "@refinedev/antd";
import { Typography } from "antd";

import type { IPost, ICategory } from "../../interfaces";

const { Title, Text } = Typography;

export const PostShow = () => {
  const { translate } = useTranslation();
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
      <Title level={5}>{translate("posts.fields.title")}</Title>
      <Text>{record?.title}</Text>
      <Title level={5}>{translate("posts.fields.category")}</Title>
      <Text>{categoryIsLoading ? "Loading..." : categoryData?.title}</Text>
      <Title level={5}>{translate("posts.fields.content")}</Title>
      <MarkdownField value={record?.content} />
    </Show>
  );
};
