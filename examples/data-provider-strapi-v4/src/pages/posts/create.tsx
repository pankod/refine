import React, { useState } from "react";
import { mediaUploadMapper, getValueProps } from "@refinedev/strapi-v4";
import { Create, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Select, Upload, Radio } from "antd";
import MDEditor from "@uiw/react-md-editor";

import { TOKEN_KEY, API_URL } from "../../constants";
import type { IPost } from "../../interfaces";

export const PostCreate: React.FC = () => {
  const [locale, setLocale] = useState("en");

  const { formProps, saveButtonProps } = useForm<IPost>();

  const { selectProps } = useSelect({
    resource: "categories",
    meta: { locale },

    pagination: {
      mode: "server",
    },
  });

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form
        {...formProps}
        layout="vertical"
        onFinish={(values) => {
          formProps.onFinish?.(mediaUploadMapper(values));
        }}
      >
        <Form.Item label="Locale" name="locale">
          <Radio.Group onChange={(e) => setLocale(e.target.value)}>
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
        <Form.Item
          label="Category"
          name="category"
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
              action={`${API_URL}/api/upload`}
              headers={{
                Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
              }}
              listType="picture"
              multiple
            >
              <p className="ant-upload-text">Drag & drop a file in this area</p>
            </Upload.Dragger>
          </Form.Item>
        </Form.Item>
      </Form>
    </Create>
  );
};
