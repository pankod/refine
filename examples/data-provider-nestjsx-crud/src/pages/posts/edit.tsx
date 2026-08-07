import React from "react";
import { useApiUrl } from "@refinedev/core";

import { Edit, useForm, useSelect, useFileUploadState } from "@refinedev/antd";

import { Form, Input, Select, Upload } from "antd";

import MDEditor from "@uiw/react-md-editor";

import type { IPost, ICategory, ITags } from "../../interfaces";
import { normalizeFile } from "../../utility/normalize";

export const PostEdit = () => {
  const { formProps, saveButtonProps, query: queryResult } = useForm<IPost>();
  const apiUrl = useApiUrl();

  const postData = queryResult?.data?.data;
  const { selectProps: categorySelectProps } = useSelect<ICategory>({
    resource: "categories",
    defaultValue: postData?.category.id,

    pagination: {
      mode: "server",
    },
  });

  const { selectProps: tagsSelectProps } = useSelect<ITags>({
    resource: "tags",
    defaultValue: postData?.tags.map((tag) => tag.id),

    pagination: {
      mode: "server",
    },
  });

  const { isLoading, onChange } = useFileUploadState();

  return (
    <Edit saveButtonProps={{ ...saveButtonProps, disabled: isLoading }}>
      <Form {...formProps} layout="vertical">
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
          <Select {...categorySelectProps} />
        </Form.Item>
        <Form.Item
          label="Tags"
          name="tags"
          rules={[
            {
              required: true,
            },
          ]}
          getValueProps={(tags?: { id: string }[]) => {
            return { value: tags?.map((tag) => tag.id) };
          }}
          getValueFromEvent={(args: string[]) => {
            return args.map((item) => ({
              id: item,
            }));
          }}
        >
          <Select mode="multiple" {...tagsSelectProps} />
        </Form.Item>
        <Form.Item
          label="Status"
          name="status"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            options={[
              {
                label: "Published",
                value: "published",
              },
              {
                label: "Draft",
                value: "draft",
              },
              {
                label: "Rejected",
                value: "rejected",
              },
            ]}
          />
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
        <Form.Item label="Images">
          <Form.Item
            name="images"
            valuePropName="fileList"
            normalize={normalizeFile}
            noStyle
          >
            <Upload.Dragger
              name="file"
              action={`${apiUrl}/media/upload`}
              listType="picture"
              maxCount={5}
              multiple
              onChange={onChange}
            >
              <p className="ant-upload-text">Drag & drop a file in this area</p>
            </Upload.Dragger>
          </Form.Item>
        </Form.Item>
      </Form>
    </Edit>
  );
};
