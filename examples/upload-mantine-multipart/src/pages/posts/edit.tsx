import { useEffect, useState } from "react";
import axios from "axios";
import { type HttpError, useApiUrl } from "@refinedev/core";
import { Edit, useForm, useSelect } from "@refinedev/mantine";
import { Select, TextInput, Text, Image, SimpleGrid } from "@mantine/core";
import MDEditor from "@uiw/react-md-editor";
import {
  Dropzone,
  IMAGE_MIME_TYPE,
  type FileWithPath,
} from "@mantine/dropzone";

import type { ICategory, IPost } from "../../interfaces";

interface FormValues {
  title: string;
  status: string;
  category: {
    id: string;
  };
  content: string;
  images: FileWithURL[];
}

interface FileWithURL extends FileWithPath {
  url?: string;
}

export const PostEdit: React.FC = () => {
  const [files, setFiles] = useState<FileWithURL[]>([]);
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

  const previews = values.images?.map((file, index) => {
    return <Image key={index} src={file.url} />;
  });

  const apiUrl = useApiUrl();

  const handleOnDrop = (files: FileWithPath[]) => {
    try {
      setIsUploadLoading(true);

      files.map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);

        const res = await axios.post<{ url: string }>(
          `${apiUrl}/media/upload`,
          formData,
          {
            withCredentials: false,
            headers: {
              "Access-Control-Allow-Origin": "*",
            },
          },
        );

        setFiles(
          (prev) => [...prev, { url: res.data.url, ...file }] as FileWithURL[],
        );
      });

      setIsUploadLoading(false);
    } catch (error) {
      setIsUploadLoading(false);
    }
  };

  useEffect(() => {
    setFieldValue("images", files);
  }, [files]);

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
