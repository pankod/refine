"use client";

import { NumberField, Show, TextField } from "@refinedev/antd";
import { useShow, useTranslation } from "@refinedev/core";
import { Typography } from "antd";

const { Title } = Typography;

export default function CategoryShow() {
  const { translate: t } = useTranslation();
  const { query: queryResult } = useShow({});
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>{t("ID")}</Title>
      <NumberField value={record?.id ?? ""} />
      <Title level={5}>{t("categories.fields.title")}</Title>
      <TextField value={record?.title} />
    </Show>
  );
}
