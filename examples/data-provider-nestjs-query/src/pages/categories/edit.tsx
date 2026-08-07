import { Edit, ListButton, RefreshButton, useForm } from "@refinedev/antd";
import type { GetFields } from "@refinedev/nestjs-query";

import { Form, Input } from "antd";

import { CATEGORY_EDIT_MUTATION } from "./queries";
import type { CategoryEditMutation } from "graphql/types";

export const CategoryEdit = () => {
  const {
    formProps,
    saveButtonProps,
    query: queryResult,
  } = useForm<GetFields<CategoryEditMutation>>({
    meta: {
      gqlMutation: CATEGORY_EDIT_MUTATION,
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
