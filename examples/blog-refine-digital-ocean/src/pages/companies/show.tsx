import React from "react";
import { useShow } from "@refinedev/core";
import { Show, NumberField, TextField } from "@refinedev/antd";
import { Typography } from "antd";

const { Title } = Typography;

export const CompanyShow = () => {
  const { query: queryResult } = useShow({
    meta: {
      fields: [
        "id",
        "name",
        "businessType",
        "companySize",
        "country",
        "website",
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
      <Title level={5}>Business Type</Title>
      <TextField value={record?.businessType} />
      <Title level={5}>Company Size</Title>
      <TextField value={record?.companySize} />
      <Title level={5}>Country</Title>
      <TextField value={record?.country} />
      <Title level={5}>Website</Title>
      <TextField value={record?.website} />
    </Show>
  );
};
