import type { HttpError } from "@refinedev/core";
import { useState } from "react";
import { Edit, useForm, useSelect } from "@refinedev/mantine";
import { Select, TextInput, Text, SimpleGrid, Image } from "@mantine/core";
import MDEditor from "@uiw/react-md-editor";
import {
  Dropzone,
  IMAGE_MIME_TYPE,
  type FileWithPath,
} from "@mantine/dropzone";

import { convertBase64 } from "../../utils";
import type { ICategory, IPost } from "../../interfaces";

interface FormValues {
  title: string;
  status: string;
  category: {
    id: string;
  };
  content: string;
  images: string[];
}

export const PostEdit: React.FC = () => {
  const [isUploadLoading, setIsUploadLoading] = useState(false);

  const {
    saveButtonProps,
    getInputProps,
    setFieldValue,
    values,
    errors,
    refineCore: { query: queryResult },
  } = useForm<IPost, HttpError, FormValues>({
    initialValues: {
      title: "",
      status: "",
      category: {
        id: "",
      },
      content: "",
      images: [],
    },
    validate: {
      title: (value) => (value.length < 2 ? "Too short title" : null),
      status: (value) => (value.length <= 0 ? "Status is required" : null),
      category: {
        id: (value) => (value.length <= 0 ? "Category is required" : null),
      },
      content: (value) => (value.length < 10 ? "Too short content" : null),
    },
  });

  const { selectProps } = useSelect<ICategory>({
    resource: "categories",
    defaultValue: queryResult?.data?.data.category.id,

    pagination: {
      mode: "server",
    },
  });

  const handleOnDrop = (files: FileWithPath[]) => {
    try {
      setIsUploadLoading(true);

      files.map(async (file) => {
        const base64 = await convertBase64(file);

        if (values.images) {
          setFieldValue("images", [...values.images, base64]);
        } else {
          setFieldValue("images", [base64]);
        }
      });

      setIsUploadLoading(false);
    } catch (error) {
      setIsUploadLoading(false);
    }
  };

  const previews = values.images?.map((base64, index) => {
    return <Image key={index} src={base64} />;
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <form>
        <TextInput
          mt={8}
          label="Title"
          placeholder="Title"
          {...getInputProps("title")}
        />
        <Select
          mt={8}
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
          label="Category"
          placeholder="Pick one"
          {...getInputProps("category.id")}
          {...selectProps}
        />
        <Text mt={8} weight={500} size="sm" color="#212529">
          Content
        </Text>
        <Text mt={8} weight={500} size="sm">
          Content
        </Text>
        <MDEditor data-color-mode="light" {...getInputProps("content")} />
        {errors.content && (
          <Text mt={2} weight={500} size="xs" color="red">
            {errors.content}
          </Text>
        )}

        <Text mt={8} weight={500} size="sm" color="#212529">
          Images
        </Text>
        <Dropzone
          accept={IMAGE_MIME_TYPE}
          onDrop={handleOnDrop}
          loading={isUploadLoading}
        >
          <Text align="center">Drop images here</Text>
        </Dropzone>

        <SimpleGrid
          cols={4}
          breakpoints={[{ maxWidth: "sm", cols: 2 }]}
          mt={previews?.length > 0 ? "xl" : 0}
        >
          {previews}
        </SimpleGrid>
      </form>
    </Edit>
  );
};
