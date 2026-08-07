"use client";

import { Create, useForm, useSelect } from "@refinedev/antd";
import { useTranslation } from "@refinedev/core";
import { Form, Input, Select } from "antd";

export default function BlogPostCreate() {
  const { translate: t } = useTranslation();

  const { formProps, saveButtonProps } = useForm();

  const { selectProps: categorySelectProps } = useSelect({
    resource: "categories",

    pagination: {
      mode: "server",
    },
  });

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label={t("blog_posts.fields.title")}
          name={["title"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={t("blog_posts.fields.content")}
          name="content"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input.TextArea rows={5} />
        </Form.Item>
        <Form.Item
          label={t("blog_posts.fields.category")}
          name={["category", "id"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            {...categorySelectProps}
            placeholder={t("blog_posts.form.select.category.placeholder")}
          />
        </Form.Item>
        <Form.Item
          label={t("blog_posts.fields.status.title")}
          name={["status"]}
          initialValue={"draft"}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            defaultValue={"draft"}
            options={[
              { value: "draft", label: t("blog_posts.fields.status.draft") },
              {
                value: "published",
                label: t("blog_posts.fields.status.published"),
              },
              {
                value: "rejected",
                label: t("blog_posts.fields.status.rejected"),
              },
            ]}
            style={{ width: 120 }}
          />
        </Form.Item>
      </Form>
    </Create>
  );
}
