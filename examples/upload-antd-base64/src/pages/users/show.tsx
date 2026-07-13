import { useShow } from "@refinedev/core";

import { Show, EmailField, ImageField } from "@refinedev/antd";

import { Typography, Space } from "antd";

import type { IUser } from "../../interfaces";

const { Title, Text } = Typography;

export const UserShow = () => {
  const { query: queryResult } = useShow<IUser>();
  const { data, isLoading } = queryResult;
  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>Id</Title>
      <Text>{record?.id}</Text>

      <Title level={5}>First Name</Title>
      <Text>{record?.firstName}</Text>

      <Title level={5}>Last Name</Title>
      <Text>{record?.lastName}</Text>

      <Title level={5}>Email</Title>
      <EmailField value={record?.email} />

      <Title level={5}>Images</Title>
      <Space wrap>
        {record?.avatar.map((img) => (
          <ImageField
            key={img.name}
            value={img.url}
            title={img.name}
            width={200}
          />
        ))}
      </Space>
    </Show>
  );
};
