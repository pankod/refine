import { useTranslation } from "@refinedev/core";
import { Edit, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Select } from "antd";
import MDEditor from "@uiw/react-md-editor";

import type { IPost, ICategory } from "../../interfaces";

export const PostEdit = () => {
  const { translate } = useTranslation();
  const { formProps, saveButtonProps, query: queryResult } = useForm<IPost>();

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
        <Form.Item
          label={translate("posts.fields.title")}
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
          label={translate("posts.fields.category")}
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
          label={translate("posts.fields.status.title")}
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
                label: translate("posts.fields.status.published"),
                value: "published",
              },
              {
                label: translate("posts.fields.status.draft"),
                value: "draft",
              },
              {
                label: translate("posts.fields.status.rejected"),
                value: "rejected",
              },
            ]}
          />
        </Form.Item>
        <Form.Item
          label={translate("posts.fields.content")}
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
