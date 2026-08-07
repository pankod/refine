---
title: "Introduction Integration Guide | React Hook Form in Refine v5"
display_title: "Introduction"
sidebar_label: "Introduction"
description: "Integrate Introduction in Refine v5. Learn best practices. Explore best practices for form and react for real-world React admin panels."
---

# React Hook Form <GuideBadge id="guides-concepts/forms" /> <RouterBadge id="guides-concepts/routing/#useform" />

Refine provides an integration package for [React Hook Form][react-hook-form] library. This package enables you to manage your forms in a headless manner. This adapter supports all of the features of both [React Hook Form][react-hook-form] and [Refine's useForm][use-form-core] hook. Simply, you can use any of the [React Hook Form][react-hook-form] examples as-is by copying and pasting them into your project.

This package exports following hooks to manage your forms:

- [`useForm`][use-form-react-hook-form]
- [`useModalForm`](/core/docs/packages/list-of-packages/)
- [`useStepsForm`](/core/docs/packages/list-of-packages/)

## Installation

Install the [`@refinedev/react-hook-form`][refine-react-hook-form] library.

<InstallPackagesCommand args="@refinedev/react-hook-form"/>

## Usage

Let's see how to edit a post with [useForm][use-form-react-hook-form] hook.

<Tabs wrapContent={false}>

<TabItem value="Headless">

```tsx title="edit.tsx"
import { HttpError } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";

export const PostEdit = () => {
  const {
    refineCore: { onFinish, formLoading, query },
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IPost, HttpError>({
    refineCoreProps: {
      resource: "posts",
      action: "edit",
      id: 1,
    },
  });

  return (
    <form onSubmit={handleSubmit(onFinish)}>
      <label>Title: </label>
      <input {...register("title", { required: true })} />
      {errors.title && <span>This field is required</span>}
      <br />

      <label>Status: </label>
      <select {...register("status")}>
        <option value="published">published</option>
        <option value="draft">draft</option>
        <option value="rejected">rejected</option>
      </select>
      <br />

      <label>Content: </label>
      <textarea
        {...register("content", { required: true })}
        rows={10}
        cols={50}
      />
      {errors.content && <span>This field is required</span>}
      <br />

      <input type="submit" value="Submit" />
      {formLoading && <p>Loading</p>}
    </form>
  );
};

export type IStatus = "published" | "draft" | "rejected";

interface IPost {
  id: number;
  title: string;
  content: string;
  status: IStatus;
}
```

</TabItem>

<TabItem value="Material UI">

```tsx title="edit.tsx"
import { HttpError } from "@refinedev/core";
import { Edit } from "@refinedev/mui";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";

export const PostEdit: React.FC = () => {
  const {
    saveButtonProps,
    register,
    control,
    formState: { errors },
  } = useForm<IPost, HttpError>({
    refineCoreProps: {
      resource: "posts",
      action: "edit",
      id: 1,
    },
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column" }}
        autoComplete="off"
      >
        <TextField
          id="title"
          {...register("title", {
            required: "This field is required",
          })}
          error={!!errors.title}
          helperText={errors.title?.message}
          margin="normal"
          fullWidth
          label="Title"
          name="title"
          autoFocus
        />

        <Controller
          control={control}
          name="status"
          rules={{ required: "This field is required" }}
          // eslint-disable-next-line
          defaultValue={null as any}
          render={({ field }) => (
            <Autocomplete<IStatus>
              id="status"
              options={["published", "draft", "rejected"]}
              {...field}
              onChange={(_, value) => {
                field.onChange(value);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Status"
                  margin="normal"
                  variant="outlined"
                  error={!!errors.status}
                  helperText={errors.status?.message}
                  required
                />
              )}
            />
          )}
        />

        <TextField
          id="content"
          {...register("content", {
            required: "This field is required",
          })}
          error={!!errors.content}
          helperText={errors.content?.message}
          margin="normal"
          label="Content"
          multiline
          rows={4}
        />
      </Box>
    </Edit>
  );
};

export type IStatus = "published" | "draft" | "rejected";

export interface IPost {
  id: number;
  title: string;
  content: string;
  status: IStatus;
}
```

</TabItem>

<TabItem value="Chakra UI">

```tsx title="edit.tsx"
import { HttpError } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { Edit } from "@refinedev/chakra-ui";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Textarea,
} from "@chakra-ui/react";

export const PostEdit = () => {
  const {
    refineCore: { formLoading },
    saveButtonProps,
    register,
    formState: { errors },
  } = useForm<IPost, HttpError>({
    refineCoreProps: {
      resource: "posts",
      action: "edit",
      id: 1,
    },
  });

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

      <FormControl mb="3" isInvalid={!!errors?.content}>
        <FormLabel>Content</FormLabel>
        <Textarea
          id="content"
          {...register("content", {
            required: "content is required",
          })}
        />
        <FormErrorMessage>{`${errors.content?.message}`}</FormErrorMessage>
      </FormControl>
    </Edit>
  );
};

export type IStatus = "published" | "draft" | "rejected";

interface IPost {
  id: number;
  title: string;
  content: string;
  status: IStatus;
}
```

</TabItem>

</Tabs>

[use-form-react-hook-form]: /core/docs/packages/list-of-packages
[react-hook-form]: https://react-hook-form.com
[refine-react-hook-form]: https://github.com/refinedev/refine/tree/main/packages/react-hook-form
[use-form-core]: /core/docs/data/hooks/use-form/
[baserecord]: /core/docs/core/interface-references#baserecord
[httperror]: /core/docs/core/interface-references#httperror
[notification-provider]: /core/docs/notification/notification-provider
[get-one]: /core/docs/data/data-provider#getone-
[create]: /core/docs/data/data-provider#create-
[update]: /core/docs/data/data-provider#update-
[data-provider]: /core/docs/data/data-provider
