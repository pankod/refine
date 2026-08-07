import { Edit, useForm, useSelect } from "@refinedev/mantine";
import { Select, TextInput, Text, MultiSelect } from "@mantine/core";
import MDEditor from "@uiw/react-md-editor";

import type { ICategory, ITag } from "../../interfaces";

export const PostEdit: React.FC = () => {
  const {
    saveButtonProps,
    getInputProps,
    errors,
    refineCore: { query: queryResult, autoSaveProps },
  } = useForm({
    initialValues: {
      title: "",
      status: "",
      category: {
        id: "",
      },
      content: "",
      tags: [],
    },
    validate: {
      title: (value) => (value.length < 2 ? "Too short title" : null),
      status: (value) => (value.length <= 0 ? "Status is required" : null),
      category: {
        id: (value) => (value.length <= 0 ? "Category is required" : null),
      },
      content: (value) => (value.length < 10 ? "Too short content" : null),
    },
    refineCoreProps: {
      autoSave: {
        enabled: true,
      },
    },
  });

  const defaultTags = queryResult?.data?.data?.tags || [];

  const { selectProps } = useSelect<ICategory>({
    resource: "categories",
    defaultValue: queryResult?.data?.data.category.id,

    pagination: {
      mode: "server",
    },
  });

  const { selectProps: tagSelectProps } = useSelect<ITag>({
    resource: "tags",
    defaultValue: defaultTags,

    pagination: {
      mode: "server",
    },
  });

  return (
    <Edit saveButtonProps={saveButtonProps} autoSaveProps={autoSaveProps}>
      <form>
        <TextInput
          mt={8}
          id="title"
          label="Title"
          placeholder="Title"
          {...getInputProps("title")}
        />
        <Select
          mt={8}
          id="status"
          label="Status"
          placeholder="Pick one"
          {...getInputProps("status")}
          data={[
            { label: "Published", value: "published" },
            { label: "Draft", value: "draft" },
            { label: "Rejected", value: "rejected" },
          ]}
        />
        <Select
          mt={8}
          id="categoryId"
          label="Category"
          placeholder="Pick one"
          {...getInputProps("category.id")}
          {...selectProps}
        />
        <MultiSelect
          {...getInputProps("tags")}
          {...tagSelectProps}
          mt={8}
          id="tags"
          label="Tags"
          placeholder="Pick multiple"
          defaultValue={defaultTags}
          filter={(value, _selected, item) => {
            return !!item.label?.toLowerCase().includes(value);
          }}
        />
        <Text mt={8} weight={500} size="sm" color="#212529">
          Content
        </Text>
        <MDEditor
          id="content"
          data-color-mode="light"
          {...getInputProps("content")}
        />
        {errors.content && (
          <Text mt={2} size="xs" color="red">
            {errors.content}
          </Text>
        )}
      </form>
    </Edit>
  );
};
