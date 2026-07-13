import { Create, useForm } from "@refinedev/antd";
import { Checkbox, Form, Input } from "antd";

import type { ICategory } from "../../interfaces";

export const CategoryCreate = () => {
  const { formProps, saveButtonProps } = useForm<ICategory>();

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
        <Form.Item label="Active" name="active" valuePropName="checked">
          <Checkbox>Active</Checkbox>
        </Form.Item>
      </Form>
    </Create>
  );
};
