import { Edit, useForm } from "@refinedev/antd";
import { Checkbox, Form, Input } from "antd";

import type { ICategory } from "../../interfaces";

export const CategoryEdit = () => {
  const { formProps, saveButtonProps } = useForm<ICategory>();

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form
        {...formProps}
        layout="vertical"
        initialValues={{
          isActive: true,
          ...formProps.initialValues,
        }}
      >
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
    </Edit>
  );
};
