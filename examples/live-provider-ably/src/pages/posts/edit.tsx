import React, { useState } from "react";
import {
  Edit,
  ListButton,
  RefreshButton,
  useForm,
  useSelect,
} from "@refinedev/antd";
import { Alert, Form, Input, Select } from "antd";
import MDEditor from "@uiw/react-md-editor";

import type { IPost, ICategory } from "../../interfaces";

export const PostEdit = () => {
  const [deprecated, setDeprecated] = useState<
    "deleted" | "updated" | undefined
  >();

  const {
    formProps,
    saveButtonProps,
    query: queryResult,
  } = useForm<IPost>({
    liveMode: "manual",
    onLiveEvent: (event) => {
      if (event.type === "deleted" || event.type === "updated") {
        setDeprecated(event.type);
      }
    },
  });

  const postData = queryResult?.data?.data;
  const { selectProps: categorySelectProps } = useSelect<ICategory>({
    resource: "categories",
    defaultValue: postData?.category.id,

    pagination: {
      mode: "server",
    },
  });

  const handleRefresh = () => {
    queryResult?.refetch();
    setDeprecated(undefined);
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
      {deprecated === "deleted" && (
        <Alert
          message="This post is deleted."
          type="warning"
          style={{
            marginBottom: 20,
          }}
          action={<ListButton size="small" />}
        />
      )}

      {deprecated === "updated" && (
        <Alert
          message="This post is updated. Refresh to see changes."
          type="warning"
          style={{
            marginBottom: 20,
          }}
          action={<RefreshButton size="small" onClick={handleRefresh} />}
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
      </Form>
    </Edit>
  );
};
