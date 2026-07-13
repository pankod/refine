import { Edit, useForm, useSelect } from "@refinedev/mantine";
import { NumberInput, TextInput, Textarea, Select } from "@mantine/core";

export const BlogPostEdit = () => {
  const {
    getInputProps,
    saveButtonProps,
    refineCore: { query: queryResult },
  } = useForm({
    initialValues: {
      id: "",
      title: "",
      content: "",
      category: { id: "" },
      status: "",
      createdAt: "",
    },
  });

  const blogPostsData = queryResult?.data?.data;

  const { selectProps: categorySelectProps } = useSelect({
    resource: "categories",
    defaultValue: blogPostsData?.category?.id,

    pagination: {
      mode: "server",
    },
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <NumberInput mt="sm" disabled label="Id" {...getInputProps("id")} />
      <TextInput mt="sm" label="Title" {...getInputProps("title")} />
      <Textarea
        mt="sm"
        label="Content"
        autosize
        {...getInputProps("content")}
      />
      <Select
        mt="sm"
        label="Category"
        {...getInputProps("category.id")}
        {...categorySelectProps}
      />
      <TextInput mt="sm" label="Status" {...getInputProps("status")} />
      {/* 
                    DatePicker component is not included in "@refinedev/mantine" package.
                    To use a <DatePicker> component, you can follow the official documentation for Mantine.
                    
                    Docs: https://mantine.dev/dates/date-picker/
                */}
      <TextInput mt="sm" label="Created At" {...getInputProps("createdAt")} />
    </Edit>
  );
};
