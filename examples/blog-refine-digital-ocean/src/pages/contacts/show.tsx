import React from "react";
import { useShow } from "@refinedev/core";
import { Show, NumberField, TextField, EmailField } from "@refinedev/antd";
import { Typography } from "antd";

const { Title } = Typography;

export const ContactShow = () => {
  const { query: queryResult } = useShow({
    meta: {
      fields: [
        "id",
        "name",
        "email",
        { company: ["id", "name"] },
        "jobTitle",
        "phone",
        "status",
      ],
    },
  });
  const { data, isLoading } = queryResult;
  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>Id</Title>
      <NumberField value={record?.id ?? ""} />
      <Title level={5}>Name</Title>
      <TextField value={record?.name} />
      <Title level={5}>Email</Title>
      <EmailField value={record?.email} />
      <Title level={5}>Company</Title>
      <TextField value={record?.company?.name} />
      <Title level={5}>Job Title</Title>
      <TextField value={record?.jobTitle} />
      <Title level={5}>Phone</Title>
      <TextField value={record?.phone} />
      <Title level={5}>Status</Title>
      <TextField value={record?.status} />
    </Show>
  );
};
