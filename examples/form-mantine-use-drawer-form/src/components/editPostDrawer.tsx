import type { BaseRecord, HttpError } from "@refinedev/core";
import {
  type UseModalFormReturnType as UseDrawerFormReturnType,
  useSelect,
  SaveButton,
} from "@refinedev/mantine";
import { Drawer, TextInput, Select, Box, Text } from "@mantine/core";
import MDEditor from "@uiw/react-md-editor";

interface FormValues {
  title: string;
  content: string;
  status: string;
  category: { id: string };
}

export const EditPostDrawer: React.FC<
  UseDrawerFormReturnType<BaseRecord, HttpError, FormValues>
> = ({
  getInputProps,
  errors,
  modal: { visible, close, title },
  refineCore: { query },
  saveButtonProps,
}) => {
  const { selectProps } = useSelect({
    resource: "categories",
    defaultValue: query?.data?.data.category.id,

    pagination: {
      mode: "server",
    },
  });

  return (
    <Drawer
      opened={visible}
      onClose={close}
      title={title}
      padding="xl"
      size="xl"
      position="right"
    >
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
      <Text mt={8} weight={500} size="sm" color="#212529">
        Content
      </Text>
      <MDEditor
        id="content"
        data-color-mode="light"
        {...getInputProps("content")}
      />
      {errors.content && (
        <Text mt={2} weight={500} size="xs" color="red">
          {errors.content}
        </Text>
      )}
      <Box mt={8} sx={{ display: "flex", justifyContent: "flex-end" }}>
        <SaveButton {...saveButtonProps} />
      </Box>
    </Drawer>
  );
};
