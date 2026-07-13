import { Create, useForm, useSelect } from "@refinedev/antd";

import { Form, Input, Checkbox, Select } from "antd";

import MDEditor from "@uiw/react-md-editor";

import type { ICompany } from "interfaces";

export const JobCreate = () => {
  const { formProps, saveButtonProps } = useForm<ICompany>();

  const { selectProps: companySelectProps } = useSelect<ICompany>({
    resource: "companies",
    optionLabel: "name",

    pagination: {
      mode: "server",
    },
  });

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Job Title"
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
          label="Company"
          name={["company", "id"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select {...companySelectProps} />
        </Form.Item>
        <Form.Item label="Location" name="location">
          <Input />
        </Form.Item>
        <Form.Item label="Content" name="content">
          <MDEditor data-color-mode="light" />
        </Form.Item>

        <Form.Item label="Is Active" name="isActive" valuePropName="checked">
          <Checkbox>Active</Checkbox>
        </Form.Item>
      </Form>
    </Create>
  );
};
