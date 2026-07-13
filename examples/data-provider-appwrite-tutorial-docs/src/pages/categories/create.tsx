import { Create, useForm } from "@refinedev/antd";
import { Form, Input } from "antd";

import type { HttpError } from "@refinedev/core";
import type { ICategory } from "../../interfaces";

export const CategoryCreate = () => {
  const { formProps, saveButtonProps } = useForm<
    ICategory,
    HttpError,
    ICategory
  >();

  return (
    <Create saveButtonProps={saveButtonProps}>
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
    </Create>
  );
};
