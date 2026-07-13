import { Create, useForm, useSelect } from "@refinedev/antd";

import MDEditor from "@uiw/react-md-editor";
import { Form, Input, Select } from "antd";

import type {
  CategoriesSelectQuery,
  PostCreateMutation,
  GetFields,
  GetFieldsFromList,
} from "graphql/types";
import { CATEGORIES_SELECT_QUERY, POST_CREATE_MUTATION } from "./queries";

export const PostCreate = () => {
  const { formProps, saveButtonProps } = useForm<GetFields<PostCreateMutation>>(
    { meta: { gqlMutation: POST_CREATE_MUTATION } },
  );

  const { selectProps: categorySelectProps } = useSelect<
    GetFieldsFromList<CategoriesSelectQuery>
  >({
    resource: "categories",

    meta: {
      gqlQuery: CATEGORIES_SELECT_QUERY,
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
              { label: "Draft", value: "DRAFT" },
              { label: "Published", value: "PUBLISHED" },
              { label: "Rejected", value: "REJECTED" },
            ]}
          />
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
      </Form>
    </Create>
  );
};
