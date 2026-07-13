import React from "react";

import { Edit, useForm, useCheckboxGroup } from "@refinedev/antd";

import { Form, Input, Checkbox } from "antd";

import MDEditor from "@uiw/react-md-editor";

import type { IPost, ITag } from "../../interfaces";

export const PostEdit = () => {
  const { formProps, saveButtonProps } = useForm<IPost>();

  const { checkboxGroupProps: tagsCheckboxGroupProps } = useCheckboxGroup<ITag>(
    {
      resource: "tags",
    },
  );

  return (
    <Edit saveButtonProps={saveButtonProps}>
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
          label="Tags"
          name="tags"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Checkbox.Group {...tagsCheckboxGroupProps} />
        </Form.Item>
        <Form.Item
          label="Content"
          name="content"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <MDEditor data-color-mode="light" />
        </Form.Item>
      </Form>
    </Edit>
  );
};
