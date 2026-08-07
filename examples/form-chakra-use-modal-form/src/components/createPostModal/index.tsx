import { Create } from "@refinedev/chakra-ui";

import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Select,
} from "@chakra-ui/react";

import { useSelect } from "@refinedev/core";
import type { UseModalFormReturnType } from "@refinedev/react-hook-form";

import type { IPost, ICategory } from "../../interfaces";

export const CreatePostModal: React.FC<UseModalFormReturnType<IPost>> = ({
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
    <Modal size="lg" isOpen={visible} onClose={close}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalHeader>Create New Post</ModalHeader>

        <ModalBody>
          <Create
            headerButtons={false}
            title={false}
            goBack={null}
            saveButtonProps={saveButtonProps}
          >
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
            <FormControl mb="3" isInvalid={!!errors?.categoryId}>
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
                {`${errors.categoryId?.message}`}
              </FormErrorMessage>
            </FormControl>
          </Create>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
