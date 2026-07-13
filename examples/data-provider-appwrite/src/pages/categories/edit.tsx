import { Edit, useForm } from "@refinedev/antd";
import { Form, Input } from "antd";

import type { HttpError } from "@refinedev/core";
import type { ICategory } from "../../interfaces";

export const CategoryEdit = () => {
  const { formProps, saveButtonProps } = useForm<
    ICategory,
    HttpError,
    ICategory
  >({});

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
      </Form>
    </Edit>
  );
};
