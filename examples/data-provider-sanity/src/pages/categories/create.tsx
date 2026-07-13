import React from "react";
import { Edit, useForm } from "@refinedev/antd";

import { Form, Input } from "antd";

import type { ICategory } from "../../interfaces";

export const CategoryCreate = () => {
  const { formProps, saveButtonProps, formLoading } = useForm<ICategory>();

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
          label="Description"
          name="description"
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
};
