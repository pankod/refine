import React from "react";
import { file2Base64, type HttpError } from "@refinedev/core";

import { Edit, useForm, getValueFromEvent } from "@refinedev/antd";

import { Form, Input, Upload } from "antd";

import type { IUser, IUserVariable } from "../../interfaces";

export const UserEdit = () => {
  const { formProps, saveButtonProps } = useForm<
    IUser,
    HttpError,
    IUserVariable
  >();

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form
        {...formProps}
        layout="vertical"
        onFinish={async (values) => {
          const base64Files = [];
          const { avatar } = values;

          for (const file of avatar) {
            if (file.originFileObj) {
              const base64String = await file2Base64(file);

              base64Files.push({
                ...file,
                base64String,
              });
            } else {
              base64Files.push(file);
            }
          }

          return formProps.onFinish?.({
            ...values,
            avatar: base64Files,
          });
        }}
      >
        <Form.Item
          label="First Name"
          name="firstName"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Last Name"
          name="lastName"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Avatar">
          <Form.Item
            name="avatar"
            valuePropName="fileList"
            getValueFromEvent={getValueFromEvent}
            noStyle
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Upload.Dragger
              listType="picture"
              multiple
              beforeUpload={() => false}
            >
              <p className="ant-upload-text">Drag & drop a file in this area</p>
            </Upload.Dragger>
          </Form.Item>
        </Form.Item>
      </Form>
    </Edit>
  );
};
