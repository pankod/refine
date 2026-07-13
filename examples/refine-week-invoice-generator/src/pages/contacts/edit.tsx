import { Edit, useForm, useSelect } from "@refinedev/antd";
import { Form, Select, Input } from "antd";

import type { IContact } from "../../interfaces";

export const EditContact = () => {
  const {
    formProps,
    saveButtonProps,
    query: queryResult,
  } = useForm<IContact>({
    meta: { populate: ["client"] },
  });

  const { selectProps } = useSelect({
    resource: "clients",
    optionValue: "id",
    optionLabel: "name",
    pagination: {
      mode: "server",
    },
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical" wrapperCol={{ md: 18, lg: 16 }}>
        <Form.Item
          label="First Name"
          name="first_name"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Last Name"
          name="last_name"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Client Company"
          name={["client", "id"]}
          rules={[{ required: true }]}
        >
          <Select {...selectProps} />
        </Form.Item>
        <Form.Item
          label="Phone Number"
          name="phone_number"
          rules={[{ type: "number", transform: (value) => Number(value) }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, type: "email" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Job" name="job">
          <Input />
        </Form.Item>
      </Form>
    </Edit>
  );
};
