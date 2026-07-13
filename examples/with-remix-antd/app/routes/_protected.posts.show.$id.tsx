import { useOne, useShow } from "@refinedev/core";
import { Show } from "@refinedev/antd";
import { Typography, Tag } from "antd";
import dataProvider from "@refinedev/simple-rest";
import { useLoaderData } from "@remix-run/react";
import { json, type LoaderFunctionArgs } from "@remix-run/node";

import type { ICategory, IPost } from "../interfaces";
import { API_URL } from "~/constants";

const { Title, Text } = Typography;

const PostShow: React.FC = () => {
  const { initialData } = useLoaderData<typeof loader>();

  const { query: queryResult } = useShow({
    queryOptions: {
      initialData,
    },
  });
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
      <Title level={5}>Title</Title>
      <Text>{record?.title}</Text>
      <Title level={5}>Status</Title>
      <Text>
        <Tag>{record?.status}</Tag>
      </Text>
      <Title level={5}>Category</Title>
      <Text>{categoryData?.title}</Text>
    </Show>
  );
};

export default PostShow;

export async function loader({ params }: LoaderFunctionArgs) {
  const data = await dataProvider(API_URL).getOne<IPost>({
    resource: "posts",
    id: params?.id as string,
  });

  return json({ initialData: data });
}
