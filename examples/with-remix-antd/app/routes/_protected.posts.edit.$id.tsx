import { useForm, useSelect, Edit } from "@refinedev/antd";
import dataProvider from "@refinedev/simple-rest";
import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Form, Input, Select } from "antd";

import { API_URL } from "~/constants";
import type { IPost } from "../interfaces";

const PostEdit: React.FC = () => {
  const { initialData } = useLoaderData<typeof loader>();

  const {
    formProps,
    saveButtonProps,
    query: queryResult,
  } = useForm<IPost>({
    queryOptions: {
      initialData,
    },
  });

  const { selectProps: categorySelectProps } = useSelect<IPost>({
    resource: "categories",
    defaultValue: queryResult?.data?.data?.category.id,

    pagination: {
      mode: "server",
    },
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Title"
          rules={[
            {
              required: true,
            },
          ]}
          name="title"
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Status"
          rules={[
            {
              required: true,
            },
          ]}
          name="status"
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
          label="Category"
          rules={[
            {
              required: true,
            },
          ]}
          name={["category", "id"]}
        >
          <Select {...categorySelectProps} />
        </Form.Item>
      </Form>
    </Edit>
  );
};

export default PostEdit;

export async function loader({ params }: LoaderFunctionArgs) {
  const data = await dataProvider(API_URL).getOne<IPost>({
    resource: "posts",
    id: params?.id as string,
  });

  return json({ initialData: data });
}
