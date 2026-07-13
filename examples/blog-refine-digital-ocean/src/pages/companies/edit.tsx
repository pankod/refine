import React from "react";
import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, Select } from "antd";

export const CompanyEdit = () => {
  const { formProps, saveButtonProps } = useForm({
    meta: {
      fields: [
        "id",
        "name",
        "businessType",
        "companySize",
        "country",
        "website",
      ],
    },
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item label="Name" name={["name"]} rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Business Type" name={["businessType"]}>
          <Select
            options={[
              { label: "B2B", value: "B2B" },
              { label: "B2C", value: "B2C" },
              { label: "B2G", value: "B2G" },
            ]}
          />
        </Form.Item>

        <Form.Item label="Company Size" name={["companySize"]}>
          <Select
            options={[
              { label: "Enterprise", value: "ENTERPRISE" },
              { label: "Large", value: "LARGE" },
              { label: "Medium", value: "MEDIUM" },
              { label: "Small", value: "SMALL" },
            ]}
          />
        </Form.Item>
        <Form.Item label="Country" name={["country"]}>
          <Input />
        </Form.Item>
        <Form.Item label="Website" name={["website"]}>
          <Input />
        </Form.Item>
      </Form>
    </Edit>
  );
};
