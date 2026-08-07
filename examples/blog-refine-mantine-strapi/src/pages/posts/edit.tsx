import { Edit, useForm, useSelect } from "@refinedev/mantine";
import { TextInput, Select } from "@mantine/core";

import type { ICategory } from "../../interfaces";

export const PostEdit = () => {
  const {
    getInputProps,
    saveButtonProps,
    refineCore: { query: queryResult },
  } = useForm({
    initialValues: {
      id: "",
      title: "",
      category: {
        id: "",
      },
    },
    refineCoreProps: {
      metaData: {
        populate: ["category"],
      },
    },
    validate: {
      title: (value) =>
        value.length < 5 ? "Title should be atleast 5 characters long" : null,
      category: {
        id: (value) => (value.length <= 0 ? "Title is required" : null),
      },
    },
  });

  const postData = queryResult?.data?.data;
  const { selectProps } = useSelect<ICategory>({
    resource: "categories",
    defaultValue: postData?.category?.id,

    pagination: {
      mode: "server",
    },
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <TextInput mt="sm" disabled label="Id" {...getInputProps("id")} />
      <TextInput mt="sm" required label="Title" {...getInputProps("title")} />
      <Select
        mt={8}
        label="Category"
        required
        placeholder="Select category"
        {...selectProps}
        {...getInputProps("category.id")}
      />
    </Edit>
  );
};
