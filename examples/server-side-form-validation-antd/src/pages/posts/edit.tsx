import React from "react";
import type { HttpError } from "@refinedev/core";
import { Edit, useForm, useSelect } from "@refinedev/antd";

import { Form, Input, Select } from "antd";

import MDEditor from "@uiw/react-md-editor";

import type { IPost, ICategory } from "../../interfaces";

export const PostEdit = () => {
  const {
    formProps,
    saveButtonProps,
    query: queryResult,
  } = useForm<IPost, HttpError, IPost>();

  const postData = queryResult?.data?.data;
  const { selectProps: categorySelectProps } = useSelect<ICategory>({
    resource: "categories",
    defaultValue: postData?.category.id,

    pagination: {
      mode: "server",
    },
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item label="Title" name="title">
          <Input />
        </Form.Item>
        <Form.Item label="Category" name={["category", "id"]}>
          <Select {...categorySelectProps} />
        </Form.Item>
        <Form.Item label="Status" name="status">
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
        <Form.Item label="Content" name="content">
          <MDEditor data-color-mode="light" />
        </Form.Item>
      </Form>
    </Edit>
  );
};
