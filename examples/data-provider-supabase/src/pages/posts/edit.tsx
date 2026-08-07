import React, { useState } from "react";

import {
  Edit,
  ListButton,
  RefreshButton,
  useForm,
  useSelect,
} from "@refinedev/antd";

import type { RcFile } from "antd/lib/upload/interface";
import { Alert, Button, Form, Input, Select, Upload } from "antd";

import MDEditor from "@uiw/react-md-editor";

import type { IPost, ICategory } from "../../interfaces";
import { supabaseClient, normalizeFile } from "../../utility";

export const PostEdit = () => {
  const [isDeprecated, setIsDeprecated] = useState(false);
  const {
    formProps,
    saveButtonProps,
    query: queryResult,
  } = useForm<IPost>({
    liveMode: "manual",
    onLiveEvent: () => {
      setIsDeprecated(true);
    },
  });

  const postData = queryResult?.data?.data;
  const { selectProps: categorySelectProps } = useSelect<ICategory>({
    resource: "categories",
    defaultValue: postData?.categoryId,

    pagination: {
      mode: "server",
    },
  });

  const handleRefresh = () => {
    queryResult?.refetch();
    setIsDeprecated(false);
  };

  return (
    <Edit
      saveButtonProps={saveButtonProps}
      headerProps={{
        extra: (
          <>
            <ListButton />
            <RefreshButton onClick={handleRefresh} />
          </>
        ),
      }}
    >
      {isDeprecated && (
        <Alert
          message="This post is changed. Reload to see it's latest version."
          type="warning"
          style={{
            marginBottom: 20,
          }}
          action={
            <Button onClick={handleRefresh} size="small" ghost>
              Refresh
            </Button>
          }
        />
      )}

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
                const rcFile = file as RcFile;
                const fileUrl = `public/${rcFile.name}`;

                const { error } = await supabaseClient.storage
                  .from("refine")
                  .upload(fileUrl, file, {
                    cacheControl: "3600",
                    upsert: true,
                  });

                if (error) {
                  return onError?.(error);
                }
                const { data } = await supabaseClient.storage
                  .from("refine")
                  .getPublicUrl(fileUrl);

                onSuccess?.({ url: data?.publicUrl }, new XMLHttpRequest());
              }}
            >
              <p className="ant-upload-text">Drag & drop a file in this area</p>
            </Upload.Dragger>
          </Form.Item>
        </Form.Item>
      </Form>
    </Edit>
  );
};
