import React from "react";
import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, Select } from "antd";

export const ContactEdit = () => {
  const { formProps, saveButtonProps } = useForm({
    meta: {
      fields: [
        "avatarUrl",
        "id",
        "name",
        "email",
        "jobTitle",
        "phone",
        "status",
      ],
    },
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item label="Name" name={["name"]} rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Email" name={["email"]} rules={[{ required: true }]}>
          <Input />
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
    </Edit>
  );
};
