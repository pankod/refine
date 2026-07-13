import React from "react";
import { Edit, useForm, useSelect } from "@refinedev/antd";

import { Form, Input, Select } from "antd";

import MDEditor from "@uiw/react-md-editor";
import type { ICategory, IPost } from "../../interfaces";

export const PostEdit = () => {
  const { formProps, saveButtonProps, formLoading } = useForm<IPost>();

  const { selectProps: categorySelectProps } = useSelect<ICategory>({
    resource: "category",
    optionLabel: "title",
    optionValue: "_id",
    pagination: {
      mode: "off",
    },
  });

  return (
    <Edit saveButtonProps={saveButtonProps} isLoading={formLoading}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Title"
          name="title"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Slug"
          name={["slug", "current"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Category"
          name={["categories"]}
          getValueFromEvent={(value: string[]) => {
            return value?.map((category) => {
              return {
                _ref: category,
              };
            });
          }}
          getValueProps={(value: IPost["categories"]) => {
            return {
              value: value?.map((category) => category?._ref),
            };
          }}
        >
          <Select {...categorySelectProps} mode="multiple" allowClear />
        </Form.Item>
        <Form.Item label="Content" name="content">
          <MDEditor data-color-mode="light" />
        </Form.Item>
      </Form>
    </Edit>
  );
};
