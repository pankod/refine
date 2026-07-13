import type { HttpError } from "@refinedev/core";

import { Edit, ListButton, RefreshButton, useForm } from "@refinedev/antd";

import { Form, Input } from "antd";

import type { GetFields, GetVariables } from "@refinedev/hasura";
import type {
  UpdateCategoryMutation,
  UpdateCategoryMutationVariables,
} from "graphql/types";
import { CATEGORY_UPDATE_MUTATION } from "./queries";

export const CategoryEdit = () => {
  const {
    formProps,
    saveButtonProps,
    query: queryResult,
  } = useForm<
    GetFields<UpdateCategoryMutation>,
    HttpError,
    GetVariables<UpdateCategoryMutationVariables>
  >({
    meta: {
      gqlMutation: CATEGORY_UPDATE_MUTATION,
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
      </Form>
    </Edit>
  );
};
