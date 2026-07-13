import React from "react";
import {
  type IResourceComponentsProps,
  useNavigation,
  useSelect,
} from "@refinedev/core";

import { useForm } from "@refinedev/react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import { ChevronLeft, ListIcon } from "lucide-react";

export const BlogPostCreate: React.FC<IResourceComponentsProps> = () => {
  const { list } = useNavigation();

  const {
    refineCore: { onFinish },
    ...form
  } = useForm({});

  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = form;

  const { options: categoryOptions } = useSelect({
    resource: "categories",
    optionLabel: "title",
  });

  return (
    <div className="mx-2 py-2">
      <div className="flex justify-between items-center my-8">
        <div className="flex justify-start items-center gap-1">
          <Button variant="ghost" size="sm" onClick={() => list("blog_posts")}>
            <ChevronLeft />
          </Button>
          <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight">
            Create Blog Post
          </h1>
        </div>
        <div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              list("blog_posts");
            }}
          >
            <ListIcon className="text-primary" />
          </Button>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={handleSubmit(onFinish)}>
          <div className="flex flex-col gap-2">
            <FormItem>
              <FormLabel className="mr-4">Title</FormLabel>
              <Input
                type="text"
                {...register("title", {
                  required: "Title cannot be empty",
                })}
              />
              <FormMessage className="text-destructive">
                {(errors as any)?.title?.message as string}
              </FormMessage>
            </FormItem>
            <FormItem>
              <FormLabel>Content</FormLabel>
              <Textarea
                rows={5}
                cols={33}
                style={{ verticalAlign: "top" }}
                {...register("content", {
                  required: "Content cannot be empty",
                })}
              />
              <FormMessage className="text-destructive">
                {(errors as any)?.content?.message as string}
              </FormMessage>
            </FormItem>
            <FormField
              name="category"
              control={control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mr-2">Category</FormLabel>
                  <Select
                    defaultValue={field?.value}
                    onValueChange={field?.onChange}
                    {...register("category", {
                      required: "Category cannot be empty",
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categoryOptions?.map((option) => (
                        <SelectItem
                          value={`${option?.value}` as string}
                          key={option?.value}
                        >
                          {option?.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-destructive">
                    {(errors as any)?.category?.id?.message as string}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mr-2">Status</FormLabel>
                  <Select
                    defaultValue={field?.value}
                    onValueChange={field?.onChange}
                    {...register("status", {
                      required: "Status cannot be empty",
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select post status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">draft</SelectItem>
                      <SelectItem value="published">published</SelectItem>
                      <SelectItem value="rejected">rejected</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-destructive">
                    {(errors as any)?.status?.message as string}
                  </FormMessage>
                </FormItem>
              )}
            />
            <div>
              <Button type="submit" className="w-40 mt-4">
                Save
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};
