import type { HttpError } from "@refinedev/core";
import {
  Edit,
  ListButton,
  RefreshButton,
  useForm,
  useSelect,
} from "@refinedev/antd";
import type { GetFields, GetFieldsFromList } from "@refinedev/nestjs-query";

import MDEditor from "@uiw/react-md-editor";
import { Form, Input, Select } from "antd";

import { CATEGORIES_SELECT_QUERY, POST_EDIT_MUTATION } from "./queries";
import type { CategoriesSelectQuery, PostEditMutation } from "graphql/types";

export const PostEdit = () => {
  const {
    formProps,
    saveButtonProps,
    query: queryResult,
  } = useForm<GetFields<PostEditMutation>, HttpError>({
    meta: {
      gqlMutation: POST_EDIT_MUTATION,
    },
  });

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
    <Edit
      headerProps={{
        extra: (
          <>
            <ListButton />
            <RefreshButton onClick={() => queryResult?.refetch()} />
          </>
        ),
      }}
      saveButtonProps={saveButtonProps}
    >
      <Form
        {...formProps}
        layout="vertical"
        onFinish={(values) =>
          formProps.onFinish?.({
            ...values,
          })
        }
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
    </Edit>
  );
};
