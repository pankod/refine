import { useShow } from "@refinedev/core";
import { Show, MarkdownField, ImageField } from "@refinedev/antd";
import { Typography, Space } from "antd";

import type { IPost, IFile } from "../../interfaces";

const { Title, Text } = Typography;

export const PostShow = () => {
  const { query: queryResult } = useShow<IPost>();
  const { data, isLoading } = queryResult;
  const record = data?.data;

  const images = record?.images ? (JSON.parse(record.images) as IFile[]) : [];

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>Id</Title>
      <Text>{record?.id}</Text>
      <Title level={5}>Title</Title>
      <Text>{record?.title}</Text>
      <Title level={5}>Category</Title>
      <Text>{record?.category.title}</Text>
      <Title level={5}>Status</Title>
      <Text>{record?.status}</Text>
      <Title level={5}>Content</Title>
      <MarkdownField value={record?.content} />
      <Title level={5}>Images</Title>
      <Space wrap>
        {record?.images ? (
          images.map((img) => (
            <ImageField
              key={img.name}
              value={img.url}
              title={img.name}
              width={200}
            />
          ))
        ) : (
          <Text>Not found any images</Text>
        )}
      </Space>
    </Show>
  );
};
