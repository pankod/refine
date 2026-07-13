"use client";

import { Edit, useForm } from "@refinedev/antd";
import { useTranslation } from "@refinedev/core";
import { Form, Input } from "antd";

export default function CategoryEdit() {
  const { translate: t } = useTranslation();
  const { formProps, saveButtonProps } = useForm({});

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label={t("categories.fields.title")}
          name={["title"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Edit>
  );
}
