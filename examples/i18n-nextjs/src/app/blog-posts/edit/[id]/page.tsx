"use client";

import { Edit, useForm, useSelect } from "@refinedev/antd";
import { useTranslation } from "@refinedev/core";
import { Form, Input, Select } from "antd";

export default function BlogPostEdit() {
  const { translate: t } = useTranslation();
  const { formProps, saveButtonProps, query: queryResult } = useForm();

  const blogPostsData = queryResult?.data?.data;

  const { selectProps: categorySelectProps } = useSelect({
    resource: "categories",
    defaultValue: blogPostsData?.category?.id,

    pagination: {
      mode: "server",
    },
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label={t("blog_posts.fields.content")}
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
          initialValue={formProps?.initialValues?.category?.id}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select {...categorySelectProps} />
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
    </Edit>
  );
}
