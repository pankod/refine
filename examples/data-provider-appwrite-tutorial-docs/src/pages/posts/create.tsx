import { Create, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Select, Upload } from "antd";
import MDEditor from "@uiw/react-md-editor";

import { normalizeFile, statuses, storage } from "../../utility";

import type { HttpError } from "@refinedev/core";
import type { RcFile } from "antd/lib/upload/interface";
import type { IPost, IPostVariables, ICategory } from "../../interfaces";

export const PostCreate = () => {
  const { formProps, saveButtonProps } = useForm<
    IPost,
    HttpError,
    IPostVariables
  >();

  const { selectProps: categorySelectProps } = useSelect<ICategory>({
    resource: "categories",
    optionLabel: "title",
    optionValue: "id",

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
          formProps.onFinish?.({
            ...values,
            images: JSON.stringify(values.images),
          });
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
          name="category"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select {...categorySelectProps} />
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
          <Select options={statuses} />
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

                  const { $id } = await storage.createFile(
                    "default",
                    rcFile.name,
                    rcFile,
                  );

                  const url = storage.getFileView("default", $id);

                  onSuccess?.({ url }, new XMLHttpRequest());
                } catch (error) {
                  onError?.(new Error("Upload Error"));
                }
              }}
            >
              <p className="ant-upload-text">
                Drag &amp; drop a file in this area
              </p>
            </Upload.Dragger>
          </Form.Item>
        </Form.Item>
      </Form>
    </Create>
  );
};
