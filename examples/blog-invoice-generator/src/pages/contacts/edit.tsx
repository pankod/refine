import { Edit, useForm, useSelect } from "@refinedev/antd";

import { Form, Select, Input } from "antd";

import type { IContact } from "interfaces";

export const ContactEdit = () => {
  const {
    formProps,
    saveButtonProps,
    query: queryResult,
  } = useForm<IContact>({
    meta: { populate: ["client"] },
  });

  const defaultClientCompany = queryResult?.data?.data;

  const { selectProps } = useSelect({
    resource: "clients",
    defaultValue: defaultClientCompany?.client?.id,
    optionValue: "id",
    optionLabel: "name",

    pagination: {
      mode: "server",
    },
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item label="First Name" name="first_name">
          <Input />
        </Form.Item>
        <Form.Item label="Last Name" name="last_name">
          <Input />
        </Form.Item>
        <Form.Item label="Client Company" name={["client", "id"]}>
          <Select {...selectProps} />
        </Form.Item>
        <Form.Item label="Phone Number" name="phone_number">
          <Input />
        </Form.Item>
        <Form.Item label="Email" name="email">
          <Input />
        </Form.Item>
        <Form.Item label="Job" name="job">
          <Input />
        </Form.Item>
      </Form>
    </Edit>
  );
};
