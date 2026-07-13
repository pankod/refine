import { Create, useForm } from "@refinedev/antd";

import { Form, Input, Radio } from "antd";

import type { ICategory } from "../../interfaces";

export const CategoryCreate = () => {
  const { formProps, saveButtonProps } = useForm<ICategory>();

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item label="Locale" name="locale">
          <Radio.Group>
            <Radio.Button value="en">English</Radio.Button>
            <Radio.Button value="de">Deutsch</Radio.Button>
          </Radio.Group>
        </Form.Item>
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
