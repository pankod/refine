import { useState } from "react";

import { Create, useForm, useSelect } from "@refinedev/antd";

import type { RcFile } from "antd/lib/upload/interface";
import { Form, Input, Select, Upload } from "antd";

import MDEditor from "@uiw/react-md-editor";

import type { IPost, ICategory } from "../../interfaces";
import { supabaseClient, normalizeFile } from "../../utility";

export const PostCreate = () => {
  const { formProps, saveButtonProps } = useForm<IPost>();

  const { selectProps: categorySelectProps } = useSelect<ICategory>({
    resource: "categories",

    pagination: {
      mode: "server",
    },
  });

  return (
    <Create saveButtonProps={saveButtonProps}>
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
          name="categoryId"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select {...categorySelectProps} />
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
              listType="picture"
              multiple
              customRequest={async ({ file, onError, onSuccess }) => {
                try {
                  const rcFile = file as RcFile;
                  await supabaseClient.storage
                    .from("refine")
                    .upload(`public/${rcFile.name}`, file, {
                      cacheControl: "3600",
                      upsert: true,
                    });

                  const { data } = await supabaseClient.storage
                    .from("refine")
                    .getPublicUrl(`public/${rcFile.name}`);

                  const xhr = new XMLHttpRequest();
                  onSuccess?.({ url: data?.publicUrl }, xhr);
                } catch (error) {
                  onError?.(new Error("Upload Error"));
                }
              }}
            >
              <p className="ant-upload-text">Drag & drop a file in this area</p>
            </Upload.Dragger>
          </Form.Item>
        </Form.Item>
      </Form>
    </Create>
  );
};
