import { Create, useForm } from "@refinedev/antd";

import { Form, Input } from "antd";

import type { CategoryCreateMutation, GetFields } from "graphql/types";
import { CATEGORY_CREATE_MUTATION } from "./queries";

export const CategoryCreate = () => {
  const { formProps, saveButtonProps } = useForm<
    GetFields<CategoryCreateMutation>
  >({ meta: { gqlMutation: CATEGORY_CREATE_MUTATION } });

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
      </Form>
    </Create>
  );
};
