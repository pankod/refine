import { useState } from "react";
import { type HttpError, useApiUrl, useCustom } from "@refinedev/core";

import { Create, useForm, useSelect } from "@refinedev/antd";

import { Form, Input, Select } from "antd";

import MDEditor from "@uiw/react-md-editor";

import type { IPost, ICategory } from "../../interfaces";

interface PostUniqueCheckResponse {
  isAvailable: boolean;
}

interface PostUniqueCheckRequestQuery {
  title: string;
}

export const PostCreate = () => {
  const { formProps, saveButtonProps } = useForm<IPost>();

  const { selectProps: categorySelectProps } = useSelect<ICategory>({
    resource: "categories",
  });

  const apiUrl = useApiUrl();
  const url = `${apiUrl}/posts-unique-check`;

  const [title, setTitle] = useState("");

  const {
    query: { refetch },
  } = useCustom<
    PostUniqueCheckResponse,
    HttpError,
    PostUniqueCheckRequestQuery
  >({
    url,
    method: "get",
    config: {
      query: {
        title,
      },
    },
    queryOptions: {
      enabled: false,
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
            {
              validator: async (_, value) => {
                if (!value) return;

                const { data } = await refetch();

                if (data?.data.isAvailable) {
                  return Promise.resolve();
                }

                return Promise.reject(new Error("'title' is must be unique"));
              },
            },
          ]}
        >
          <Input onChange={(event) => setTitle(event.target.value)} />
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
    </Create>
  );
};
