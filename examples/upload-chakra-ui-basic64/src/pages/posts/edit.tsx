import { useEffect } from "react";
import { Edit } from "@refinedev/chakra-ui";

import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  Image,
  Input,
  Select,
  Text,
} from "@chakra-ui/react";

import { file2Base64, useSelect } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import Upload from "rc-upload";
import { IconFileUpload } from "@tabler/icons-react";

import type { IPost } from "../../interfaces";

export const PostEdit = () => {
  const {
    refineCore: { formLoading, query: queryResult },
    saveButtonProps,
    register,
    watch,
    setValue,
    formState: { errors },
    resetField,
  } = useForm<IPost>();

  const { options } = useSelect({
    resource: "categories",
    defaultValue: queryResult?.data?.data.category.id,
    queryOptions: { enabled: !!queryResult?.data?.data.category.id },

    pagination: {
      mode: "server",
    },
  });

  useEffect(() => {
    resetField("category.id");
  }, [options]);

  const imageInput = watch("images");

  return (
    <Edit isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <FormControl mb="3" isInvalid={!!errors?.title}>
        <FormLabel>Title</FormLabel>
        <Input
          id="title"
          type="text"
          {...register("title", { required: "Title is required" })}
        />
        <FormErrorMessage>{`${errors.title?.message}`}</FormErrorMessage>
      </FormControl>
      <FormControl mb="3" isInvalid={!!errors?.status}>
        <FormLabel>Status</FormLabel>
        <Select
          id="content"
          placeholder="Select Post Status"
          {...register("status", {
            required: "Status is required",
          })}
        >
          <option>published</option>
          <option>draft</option>
          <option>rejected</option>
        </Select>
        <FormErrorMessage>{`${errors.status?.message}`}</FormErrorMessage>
      </FormControl>
      <FormControl mb="3" isInvalid={!!errors?.categoryId}>
        <FormLabel>Category</FormLabel>
        <Select
          id="ca"
          placeholder="Select Category"
          {...register("category.id", {
            required: true,
          })}
        >
          {options?.map((option) => (
            <option value={option.value} key={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
        <FormErrorMessage>{`${errors.categoryId?.message}`}</FormErrorMessage>
      </FormControl>

      <FormControl mb="3">
        <FormLabel>Images</FormLabel>
        <Input type="file" display="none" {...register("images")} />
        <Upload
          name="file"
          beforeUpload={async (file) => {
            const base64String = await file2Base64({
              originFileObj: file,
            });

            const { name, size, type, lastModified } = file;

            const images = [
              {
                name,
                size,
                type,
                lastModified,
                base64String,
              },
            ];

            setValue("images", images);
            return false;
          }}
        >
          <Box
            p="4"
            bg="gray.100"
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
          >
            <Icon as={IconFileUpload} w={8} h={8} mb="3" color="gray.600" />
            <Text color="gray.700" fontWeight="semibold">
              Click or drag file to this area to upload
            </Text>
          </Box>
        </Upload>
      </FormControl>

      {imageInput && imageInput.length > 0 && (
        <Image
          boxSize="100px"
          objectFit="cover"
          src={imageInput[0].base64String}
          alt="Post image"
        />
      )}
    </Edit>
  );
};
