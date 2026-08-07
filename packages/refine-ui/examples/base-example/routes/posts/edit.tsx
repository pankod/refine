import React from "react";
import type { HttpError } from "@refinedev/core";
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
} from "@/registry/new-york/ui/form";
import { Input } from "@/registry/new-york/ui/input";
import { Textarea } from "@/registry/new-york/ui/textarea";
import { Button } from "@/registry/new-york/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/new-york/ui/select";
import {
  EditView,
  EditViewHeader,
} from "@/registry/new-york/refine-ui/views/edit-view";
import { useNavigate } from "react-router";
import { Loader2 } from "lucide-react";
import { LoadingOverlay } from "@/registry/new-york/refine-ui/layout/loading-overlay";
import { AutoSaveIndicator } from "@/registry/new-york/refine-ui/form/auto-save-indicator";
import { useSelect } from "@refinedev/core";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/registry/new-york/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/registry/new-york/ui/command";
import { ChevronsUpDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Post } from "../../types/resources";

const postFormSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  content: z.string().min(10, {
    message: "Content must be at least 10 characters.",
  }),
  status: z.string({
    required_error: "Please select a status.",
  }),
  category: z.object({
    id: z.number(),
  }),
});

type PostFormValues = z.infer<typeof postFormSchema>;

export default function EditPost() {
  const navigate = useNavigate();

  const {
    refineCore: { onFinish, autoSaveProps, query },
    ...form
  } = useForm<Post, HttpError, PostFormValues>({
    resolver: zodResolver(postFormSchema),
    refineCoreProps: {
      autoSave: {
        enabled: true,
        debounce: 1000,
      },
    },
    defaultValues: {
      title: "",
      content: "",
      status: "draft",
      category: undefined,
    },
  });

  const { options: categoryOptions, query: categoriesQuery } = useSelect({
    resource: "categories",
    optionValue: "id",
    optionLabel: "title",
    pagination: {
      pageSize: 999,
    },
  });

  function onSubmit(values: PostFormValues) {
    onFinish(values);
  }

  const isLoading = !query?.isFetched || query.isRefetching;

  return (
    <EditView>
      <EditViewHeader
        title="Edit Post"
        actionsSlot={<AutoSaveIndicator {...autoSaveProps} />}
      />
      <LoadingOverlay loading={isLoading}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                      placeholder="Enter post content"
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
              name="category.id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        className="w-[200px] justify-between"
                        type="button"
                        disabled={categoriesQuery.isLoading}
                      >
                        {field.value
                          ? categoryOptions?.find(
                              (option) => option.value === field.value,
                            )?.label
                          : "Select category..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search category..." />
                        <CommandList>
                          <CommandEmpty>No category found.</CommandEmpty>
                          <CommandGroup>
                            {categoryOptions?.map((option) => {
                              return (
                                <CommandItem
                                  key={option.value}
                                  value={option.value}
                                  onSelect={() => {
                                    field.onChange(option.value);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      field.value === option.value
                                        ? "opacity-100"
                                        : "opacity-0",
                                    )}
                                  />
                                  {option.label}
                                </CommandItem>
                              );
                            })}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => {
                return (
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
                        <SelectItem value="published">Published</SelectItem>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/posts")}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
                Save
              </Button>
            </div>
          </form>
        </Form>
      </LoadingOverlay>
    </EditView>
  );
}
