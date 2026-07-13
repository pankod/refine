import React from "react";
import { useForm, Edit } from "@refinedev/antd";

import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Form, Input, Button, Space } from "antd";

interface IFormValue {
  name: string;
  email: string;
  skills: string;
}

export default function UserEdit() {
  const { formProps, saveButtonProps } = useForm<IFormValue>();
  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} size="large" layout="vertical">
        <Form.Item
          name={"firstName"}
          label="First Name"
          style={{ maxWidth: "600px" }}
          rules={[
            {
              required: true,
              message: "please enter your first name",
            },
            {
              whitespace: true,
            },
            {
              min: 3,
              message: "field must be at least 3 characters",
            },
          ]}
          hasFeedback
        >
          <Input placeholder="e.g John" />
        </Form.Item>
        <Form.Item
          name={"email"}
          label="Email"
          style={{ maxWidth: "600px" }}
          rules={[
            {
              required: true,
              message: "please enter your email: e.g john@email.com",
            },
            {
              whitespace: true,
            },
            {
              min: 3,
              message: "field must be at least 3 characters",
            },
          ]}
          hasFeedback
        >
          <Input placeholder="e.g john@email.com" />
        </Form.Item>
        <Form.List name={"skills"}>
          {(fields, { add, remove }) => {
            return (
              <>
                {fields.map((field, index) => {
                  return (
                    <Space
                      key={field.key}
                      direction="horizontal"
                      style={{
                        display: "flex",
                        position: "relative",
                      }}
                    >
                      <Form.Item
                        name={field.name}
                        label={`skill - ${index + 1}`}
                        style={{ width: "400px" }}
                        rules={[
                          {
                            required: true,
                            message: "please enter a skill",
                          },
                          {
                            whitespace: true,
                          },
                          {
                            min: 3,
                            message: "field must be at least 3 characters",
                          },
                        ]}
                        hasFeedback
                      >
                        <Input placeholder="e.g javascript" />
                      </Form.Item>
                      <Button
                        danger
                        onClick={() => remove(field.name)}
                        style={{
                          position: "absolute",
                          top: "47px",
                        }}
                        icon={<DeleteOutlined />}
                      />
                    </Space>
                  );
                })}
                <Form.Item>
                  <Button
                    icon={<PlusOutlined />}
                    type="dashed"
                    block
                    style={{ maxWidth: "600px" }}
                    onClick={() => add()}
                  >
                    Add a skill
                  </Button>
                </Form.Item>
              </>
            );
          }}
        </Form.List>
      </Form>
    </Edit>
  );
}
