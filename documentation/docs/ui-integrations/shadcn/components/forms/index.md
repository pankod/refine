---
title: "shadcn/ui Forms Component | UI Component in Refine v5"
display_title: "Forms"
sidebar_label: "Forms"
description: "Learn to integrate Forms in Refine v5. Learn integrate Radix UI, Tailwind CSS for polished admin UIs. Real-world snippets included."
source: https://github.com/refinedev/refine/tree/feat/init-shadcn/packages/refine-ui/registry/new-york/refine-ui/form
---

This guide explains how to create and manage forms in your Refine applications using the [`@refinedev/react-hook-form`](/core/docs/packages/react-hook-form/use-form/) adapter and [`shadcn/ui`](https://ui.shadcn.com/) [form components](https://ui.shadcn.com/docs/components/form). We'll cover complete setup, validation with [Zod](https://zod.dev/), and provide examples for create and edit scenarios.

## Key Features

- **Seamless integration** with Refine's data lifecycle for creating and updating resources
- **Powerful validation capabilities** using `react-hook-form` and Zod with TypeScript support
- **Pre-built shadcn/ui components** [(`Form`, `FormField`, `FormItem`, `FormLabel`, `FormControl`, `FormMessage`, `Input`, `Textarea`, `Select`, `Button`, etc.)](https://ui.shadcn.com/docs/components/form)
- **Automatic CRUD operations** that connect directly to your data provider
- **Loading states and error handling** built-in for better user experience
- **Works seamlessly** within Refine UI's view components like `CreateView` and `EditView`

## How It Works

The `useForm` hook from [`@refinedev/react-hook-form`](/core/docs/packages/react-hook-form/use-form/) acts as a bridge between:

- **React Hook Form**: For form state management and validation
- **Refine Core**: For automatic data provider integration and CRUD operations
- **shadcn/ui**: For consistent, accessible UI components
- **Zod**: For TypeScript-first schema validation

This integration means you get automatic:

- Form submission to your backend via data providers
- Loading states during API calls
- Error handling and validation feedback
- Data fetching for edit forms
- Optimistic updates and cache invalidation

## What You'll Build

By the end of this guide, you'll know how to:

- Set up forms with automatic data integration
- Add validation with Zod schemas
- Handle both create and edit operations
- Work with relationships and complex data
- Implement advanced validation patterns
- Integrate with Refine's notification system

## Step 1: Installation

First, install the required packages:

```bash
npm install @refinedev/react-hook-form @hookform/resolvers zod
```

Next, add the necessary shadcn/ui components:

```bash
npx shadcn@latest add form input button select textarea
```

## Step 2: Understanding the Hook

The `useForm` hook from `@refinedev/react-hook-form` provides everything you need:

- **Automatic data integration**: Connects to your data provider for create/update operations
- **Form state management**: Handles loading, validation, and error states
- **Validation**: Integrates with Zod schemas for type-safe validation
- **shadcn/ui compatibility**: Works seamlessly with Form components

## Step 3: Define Your Schema

Start by creating a Zod schema that defines your form structure and validation rules:

```typescript
import * as z from "zod";

const postSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  content: z.string().min(10, "Content must be at least 10 characters"),
  status: z.enum(["draft", "published", "rejected"], {
    errorMap: () => ({ message: "Please select a status" }),
  }),
});

type PostFormData = z.infer<typeof postSchema>;
```

## Step 4: Create a Form

Here's a complete example of a create form using [shadcn/ui form components](https://ui.shadcn.com/docs/components/form):

```tsx
import React from "react";
import { useForm } from "@refinedev/react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CreateView,
  CreateViewHeader,
} from "@/components/refine-ui/views/create-view";
import { BaseRecord, HttpError } from "@refinedev/core";

const postSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  content: z.string().min(10, "Content must be at least 10 characters"),
  status: z.enum(["draft", "published", "rejected"]),
});

type PostFormData = z.infer<typeof postSchema>;

export default function CreatePost() {
  const {
    refineCore: { onFinish, formLoading },
    ...form
  } = useForm<BaseRecord, HttpError, PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      content: "",
      status: "draft",
    },
    refineCoreProps: {
      resource: "posts",
      action: "create",
    },
  });

  const onSubmit = (data: PostFormData) => {
    onFinish(data); // Automatically calls your data provider's create method
  };

  return (
    <CreateView>
      <CreateViewHeader title="Create New Post" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter post title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Write your post content..."
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline">
              Cancel
            </Button>
            <Button type="submit" disabled={formLoading}>
              {formLoading ? "Creating..." : "Create Post"}
            </Button>
          </div>
        </form>
      </Form>
    </CreateView>
  );
}
```

<h3>Key Points:</h3>

1. **useForm hook**: Configured with `action: "create"` to handle new record creation
2. **zodResolver**: Connects your Zod schema to form validation
3. **onFinish**: Automatically calls your data provider's `create` method
4. **FormField**: Each field connects to the form state with automatic validation

## Step 5: Creating Edit Forms

For editing existing records, change the `action` and add an `ID`. Other than that, the form structure remains the same.

```tsx
import React from "react";
// highlight-start
import { useParams } from "react-router";
// highlight-end
import { useForm } from "@refinedev/react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  EditView,
  EditViewHeader,
} from "@/components/refine-ui/views/edit-view";
import { LoadingOverlay } from "@/components/refine-ui/layout/loading-overlay";

const postSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  content: z.string().min(10, "Content must be at least 10 characters"),
  status: z.enum(["draft", "published", "rejected"]),
});

type PostFormData = z.infer<typeof postSchema>;

export default function EditPost() {
  // highlight-start
  const { id } = useParams();
  // highlight-end

  const {
    refineCore: { onFinish, formLoading, query },
    ...form
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    refineCoreProps: {
      resource: "posts",
      // highlight-start
      action: "edit",
      id,
      // highlight-end
    },
  });

  const onSubmit = (data: PostFormData) => {
    onFinish(data); // Calls your data provider's update method
  };

  return (
    <EditView>
      <EditViewHeader title={`Edit Post #${id}`} />
      <LoadingOverlay loading={formLoading || query?.isLoading}>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 p-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter post title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write your post content..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline">
                Cancel
              </Button>
              <Button type="submit" disabled={formLoading}>
                {formLoading ? "Updating..." : "Update Post"}
              </Button>
            </div>
          </form>
        </Form>
      </LoadingOverlay>
    </EditView>
  );
}
```

<h3>Edit Form Features:</h3>

1. **Automatic data loading**: The hook automatically loads existing data using the record ID
2. **query**: Contains loading state and data for the record being edited
3. **value vs defaultValue**: Use `value` for Select components in edit forms to ensure proper state management

## Step 6: Working with Relationships

When your forms need to handle relationships with other resources (like selecting a category for a post), you can use the [`useSelect`](/core/docs/data/hooks/use-select/) hook alongside your form. This approach works identically for both create and edit forms, but adds the ability to fetch and select related data from other resources.

Here's how to extend your form with relationship handling using shadcn/ui's Combobox pattern:

```tsx
// highlight-start
import { useForm, useSelect } from "@refinedev/react-hook-form";
// highlight-end
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";

// Extended schema with relationship
const postWithCategorySchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  content: z.string().min(10, "Content must be at least 10 characters"),
  status: z.enum(["draft", "published", "rejected"]),
  // highlight-start
  category: z.object({
    id: z.number({ required_error: "Please select a category" }),
  }),
  // highlight-end
});

type PostWithCategoryData = z.infer<typeof postWithCategorySchema>;

export default function PostFormWithCategory() {
  const {
    refineCore: { onFinish, formLoading },
    ...form
  } = useForm<PostWithCategoryData>({
    resolver: zodResolver(postWithCategorySchema),
    refineCoreProps: {
      resource: "posts",
      action: "create",
    },
  });

  // Fetch categories for selection
  // highlight-start
  const { options: categoryOptions } = useSelect({
    resource: "categories",
    optionValue: "id",
    optionLabel: "title",
  });
  // highlight-end

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onFinish)} className="space-y-6">
        {/* Other fields... */}

        {/* highlight-start */}
        <FormField
          control={form.control}
          name="category.id"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Category</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[300px] justify-between",
                        !field.value && "text-muted-foreground",
                      )}
                      type="button"
                    >
                      {field.value
                        ? categoryOptions?.find(
                            (option) => option.value === field.value,
                          )?.label
                        : "Select category..."}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[300px] p-0">
                  <Command>
                    <CommandInput placeholder="Search category..." />
                    <CommandList>
                      <CommandEmpty>No category found.</CommandEmpty>
                      <CommandGroup>
                        {categoryOptions?.map((option) => (
                          <CommandItem
                            key={option.value}
                            value={option.label}
                            onSelect={() => {
                              form.setValue(
                                "category.id",
                                option.value as number,
                              );
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                option.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                            {option.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* highlight-end */}
      </form>
    </Form>
  );
}
```

## Advanced Validation Patterns

These patterns show common validation scenarios. For comprehensive validation options and advanced features, see the [Zod documentation](https://zod.dev/).

### Cross-field Validation

```typescript
const userSchema = z
  .object({
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // Error shows on confirmPassword field
  });
```

### Conditional Validation

```typescript
const productSchema = z
  .object({
    type: z.enum(["physical", "digital"]),
    weight: z.number().optional(),
    downloadUrl: z.string().url().optional(),
  })
  .refine(
    (data) => {
      if (data.type === "physical") return data.weight && data.weight > 0;
      return true;
    },
    {
      message: "Weight is required for physical products",
      path: ["weight"],
    },
  )
  .refine(
    (data) => {
      if (data.type === "digital") return data.downloadUrl;
      return true;
    },
    {
      message: "Download URL is required for digital products",
      path: ["downloadUrl"],
    },
  );
```
