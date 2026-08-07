import React from "react";
import { Create } from "@refinedev/chakra-ui";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Textarea,
  Select,
} from "@chakra-ui/react";
import { useSelect } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";

export const PostCreate = () => {
  const {
    refineCore: { formLoading, query: queryResult },
    saveButtonProps,
    register,
    resetField,
    formState: { errors },
  } = useForm();

  const postsData = queryResult?.data?.data;

  const { options: categoryOptions } = useSelect({
    resource: "categories",
    defaultValue: postsData?.category?.id,

    pagination: {
      mode: "server",
    },
  });

  React.useEffect(() => {
    resetField("category.id");
  }, [categoryOptions]);

  return (
    <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
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

      <FormControl mb="3" isInvalid={!!(errors as any)?.title}>
        <FormLabel>Content</FormLabel>
        <Textarea
          {...register("content", {
            required: "This field is required",
          })}
        />
        <FormErrorMessage>
          {(errors as any)?.title?.message as string}
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
    </Create>
  );
};
