import { Create, useForm, useSelect } from "@refinedev/mantine";
import { TextInput, Select } from "@mantine/core";

import type { ICategory } from "../../interfaces";

export const PostCreate = () => {
  const {
    getInputProps,
    saveButtonProps,
    refineCore: { formLoading },
  } = useForm({
    initialValues: {
      title: "",
      category: {
        id: "",
      },
      status: "",
    },
    validate: {
      title: (value) =>
        value.length < 5 ? "Title should be atleast 5 characters long" : null,
      category: {
        id: (value) => (value.length <= 0 ? "Title is required" : null),
      },
      status: (value) => (value.length <= 0 ? "Status is required" : null),
    },
  });

  const { selectProps } = useSelect<ICategory>({
    resource: "categories",

    pagination: {
      mode: "server",
    },
  });

  return (
    <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <TextInput
        mt="sm"
        required={true}
        label="Title"
        {...getInputProps("title")}
      />
      <Select
        mt={8}
        label="Status"
        required={true}
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
        label="Category"
        required={true}
        placeholder="Select category"
        {...getInputProps("category.id")}
        {...selectProps}
      />
    </Create>
  );
};
