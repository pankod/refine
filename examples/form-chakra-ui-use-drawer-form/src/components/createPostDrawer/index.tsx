import { Create } from "@refinedev/chakra-ui";

import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Select,
} from "@chakra-ui/react";

import { type HttpError, useSelect } from "@refinedev/core";
import type { UseModalFormReturnType } from "@refinedev/react-hook-form";

import type { IPost, ICategory } from "../../interfaces";

export const CreatePostDrawer: React.FC<
  UseModalFormReturnType<IPost, HttpError, IPost>
> = ({
  saveButtonProps,
  modal: { visible, close },
  register,
  formState: { errors },
}) => {
  const { options } = useSelect<ICategory>({
    resource: "categories",
    pagination: {
      pageSize: 9999,
      mode: "server",
    },
  });

  return (
    <Drawer size="md" isOpen={visible} onClose={close}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Create New Post</DrawerHeader>

        <DrawerBody>
          <Create title={false} goBack={null} saveButtonProps={saveButtonProps}>
            <FormControl mb="3" isInvalid={!!errors?.title}>
              <FormLabel>Title</FormLabel>
              <Input
                id="title"
                type="text"
                {...register("title", {
                  required: "Title is required",
                })}
              />
              <FormErrorMessage>{`${errors.title?.message}`}</FormErrorMessage>
            </FormControl>
            <FormControl mb="3" isInvalid={!!errors?.status}>
              <FormLabel>Status</FormLabel>
              <Select
                id="status"
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
            <FormControl mb="3" isInvalid={!!errors?.category?.id}>
              <FormLabel>Category</FormLabel>
              <Select
                id="categoryId"
                placeholder="Select Category"
                {...register("category.id", {
                  required: "Category is required",
                })}
              >
                {options?.map((option) => (
                  <option value={option.value} key={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
              <FormErrorMessage>
                {`${errors.category?.id?.message}`}
              </FormErrorMessage>
            </FormControl>
          </Create>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
