import { useShow } from "@refinedev/core";
import { Show } from "@refinedev/antd";

import { Typography } from "antd";

import type { ICompany } from "interfaces";

const { Title, Text, Paragraph } = Typography;

export const CompanyShow = () => {
  const { query: queryResult } = useShow<ICompany>();
  const { data, isLoading } = queryResult;
  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>Name</Title>
      <Text>{record?.name}</Text>
      <Title level={5}>Location</Title>
      <Text>{record?.location}</Text>
      <Title level={5}>Is Active</Title>
      <Text>{record?.isActive ? "Active" : "Passive"}</Text>

      <Title level={4}>Links</Title>
      <Paragraph>
        <strong>Web: </strong> {record?.web || "-"}
      </Paragraph>
      <Paragraph>
        <strong>Linkedin: </strong> {record?.linkedin || "-"}
      </Paragraph>
      <Paragraph>
        <strong>Twitter: </strong> {record?.twitter || "-"}
      </Paragraph>
      <Paragraph>
        <strong>Instagram: </strong> {record?.instagram || "-"}
      </Paragraph>
      <Paragraph>
        <strong>Youtube: </strong> {record?.youtube || "-"}
      </Paragraph>
      <Paragraph>
        <strong>Github: </strong> {record?.github || "-"}
      </Paragraph>
    </Show>
  );
};
