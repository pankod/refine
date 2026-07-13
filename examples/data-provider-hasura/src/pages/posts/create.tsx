import React from "react";
import type { HttpError } from "@refinedev/core";

import { Create, useForm, useSelect } from "@refinedev/antd";

import { Form, Input, Select } from "antd";

import MDEditor from "@uiw/react-md-editor";

import type {
  CreatePostMutation,
  CreatePostMutationVariables,
  GetPostCategoriesSelectQuery,
} from "graphql/types";
import type {
  GetFields,
  GetFieldsFromList,
  GetVariables,
} from "@refinedev/hasura";
import { POST_CATEGORIES_SELECT_QUERY, POST_CREATE_MUTATION } from "./queries";

export const PostCreate = () => {
  const { formProps, saveButtonProps } = useForm<
    GetFields<CreatePostMutation>,
    HttpError,
    GetVariables<CreatePostMutationVariables>
  >({
    meta: {
      gqlMutation: POST_CREATE_MUTATION,
    },
  });

  const { selectProps: categorySelectProps } = useSelect<
    GetFieldsFromList<GetPostCategoriesSelectQuery>
  >({
    resource: "categories",

    meta: {
      gqlQuery: POST_CATEGORIES_SELECT_QUERY,
    },

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
          name="category_id"
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
      </Form>
    </Create>
  );
};
