import React from "react";
import { Edit, useForm, useSelect } from "@refinedev/antd";
import { getValueProps, mediaUploadMapper } from "@refinedev/strapi-v4";
import { Form, Input, Select, Upload, Radio } from "antd";
import MDEditor from "@uiw/react-md-editor";

import { TOKEN_KEY, API_URL } from "../../constants";
import type { ICategory, IPost } from "../../interfaces";

export const PostEdit: React.FC = () => {
  const {
    formProps,
    saveButtonProps,
    query: queryResult,
  } = useForm<IPost>({
    meta: { populate: ["category", "cover"] },
  });

  const { selectProps } = useSelect<ICategory>({
    resource: "categories",
    defaultValue: queryResult?.data?.data?.category?.id,
    meta: { locale: queryResult?.data?.data.locale },

    pagination: {
      mode: "server",
    },
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form
        {...formProps}
        layout="vertical"
        onFinish={(values) => {
          formProps.onFinish?.(mediaUploadMapper(values));
        }}
      >
        <Form.Item label="Locale" name="locale">
          <Radio.Group disabled>
            <Radio.Button value="en">English</Radio.Button>
            <Radio.Button value="de">Deutsch</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          wrapperCol={{ span: 14 }}
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
          wrapperCol={{ span: 8 }}
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
    </Edit>
  );
};
