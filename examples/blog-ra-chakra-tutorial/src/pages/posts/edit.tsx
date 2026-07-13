import React from "react";
import { Edit } from "@refinedev/chakra-ui";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Select,
} from "@chakra-ui/react";
import { useForm } from "@refinedev/react-hook-form";
import { useSelect } from "@refinedev/core";

export const PostEdit = () => {
  const {
    refineCore: { formLoading, query: queryResult },
    saveButtonProps,
    register,
    setValue,
    formState: { errors },
  } = useForm({
    refineCoreProps: {
      metaData: {
        populate: ["category"],
      },
    },
  });

  const postsData = queryResult?.data?.data;

  const { options: categoryOptions } = useSelect({
    resource: "categories",
    defaultValue: postsData?.category?.id,

    pagination: {
      mode: "server",
    },
  });

  React.useEffect(() => {
    setValue("category.id", queryResult?.data?.data?.category?.id || 1);
  }, [categoryOptions]);

  return (
    <Edit isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <FormControl mb="3" isInvalid={!!(errors as any)?.title}>
        <FormLabel>Title</FormLabel>
        <Input
          type="text"
          {...register("title", {
            required: "This field is required",
          })}
        />
        <FormErrorMessage>
          {(errors as any)?.title?.message as string}
        </FormErrorMessage>
      </FormControl>

      <FormControl mb="3" isInvalid={!!(errors as any)?.content}>
        <FormLabel>Content</FormLabel>
        <Input
          type="text"
          {...register("content", {
            required: "This field is required",
          })}
        />
        <FormErrorMessage>
          {(errors as any)?.content?.message as string}
        </FormErrorMessage>
      </FormControl>

      <FormControl mb="3" isInvalid={!!errors?.category}>
        <FormLabel>Category</FormLabel>
        <Select
          placeholder="Select category"
          {...register("category.id", {
            required: "This field is required",
          })}
        >
          {categoryOptions?.map((option) => (
            <option value={option.value} key={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
        <FormErrorMessage>
          {(errors as any)?.category?.id?.message as string}
        </FormErrorMessage>
      </FormControl>
    </Edit>
  );
};
