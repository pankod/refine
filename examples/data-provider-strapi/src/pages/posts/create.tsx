import React from "react";
import { useApiUrl } from "@refinedev/core";

import { Create, useForm, useSelect } from "@refinedev/antd";

import { Form, Input, Select, Upload } from "antd";

import MDEditor from "@uiw/react-md-editor";

import {
  useStrapiUpload,
  mediaUploadMapper,
  getValueProps,
} from "@refinedev/strapi";

import { TOKEN_KEY } from "../../constants";

export const PostCreate = () => {
  const API_URL = useApiUrl();

  const { formProps, saveButtonProps, query: queryResult } = useForm();

  const postData = queryResult?.data?.data;
  const { selectProps } = useSelect({
    resource: "categories",
    defaultValue: postData?.category.id,

    pagination: {
      mode: "server",
    },
  });

  const { ...uploadProps } = useStrapiUpload({
    maxCount: 1,
  });

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form
        {...formProps}
        layout="vertical"
        onFinish={(values) => {
          return formProps.onFinish?.(mediaUploadMapper(values));
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
        <Form.Item
          label="Category"
          name={["category", "id"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select {...selectProps} />
        </Form.Item>
        <Form.Item
          label="Content"
          name="content"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <MDEditor data-color-mode="light" />
        </Form.Item>
        <Form.Item label="Cover">
          <Form.Item
            name="cover"
            valuePropName="fileList"
            getValueProps={(data) => getValueProps(data, API_URL)}
            noStyle
          >
            <Upload.Dragger
              name="files"
              action={`${API_URL}/upload`}
              headers={{
                Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
              }}
              listType="picture"
              multiple
              {...uploadProps}
            >
              <p className="ant-upload-text">Drag & drop a file in this area</p>
            </Upload.Dragger>
          </Form.Item>
        </Form.Item>
      </Form>
    </Create>
  );
};
