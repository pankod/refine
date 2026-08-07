import React from "react";
import { Create, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Select } from "antd";

export const ContactCreate = () => {
  const { formProps, saveButtonProps } = useForm();

  const { selectProps: companySelectProps } = useSelect({
    resource: "companies",
    optionLabel: "name",

    meta: {
      fields: ["id", "name"],
    },

    pagination: {
      mode: "server",
    },
  });

  const { selectProps: salesOwnerSelectProps } = useSelect({
    resource: "users",

    meta: {
      fields: ["name", "id"],
    },

    optionLabel: "name",

    pagination: {
      mode: "server",
    },
  });

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item label="Name" name={["name"]} rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Email" name={["email"]} rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Company"
          name={["companyId"]}
          rules={[{ required: true }]}
        >
          <Select {...companySelectProps} />
        </Form.Item>
        <Form.Item
          label="Sales Owner"
          name="salesOwnerId"
          rules={[{ required: true }]}
        >
          <Select {...salesOwnerSelectProps} />
        </Form.Item>
        <Form.Item label="Job Title" name={["jobTitle"]}>
          <Input />
        </Form.Item>
        <Form.Item label="Phone" name={["phone"]}>
          <Input />
        </Form.Item>
        <Form.Item label="Status" name={["status"]}>
          <Select
            options={[
              { label: "NEW", value: "NEW" },
              { label: "CONTACTED", value: "CONTACTED" },
              { label: "INTERESTED", value: "INTERESTED" },
              { label: "UNQUALIFIED", value: "UNQUALIFIED" },
              { label: "QUALIFIED", value: "QUALIFIED" },
              { label: "NEGOTIATION", value: "NEGOTIATION" },
              { label: "LOST", value: "LOST" },
              { label: "WON", value: "WON" },
              { label: "CHURNED", value: "CHURNED" },
            ]}
          />
        </Form.Item>
      </Form>
    </Create>
  );
};
