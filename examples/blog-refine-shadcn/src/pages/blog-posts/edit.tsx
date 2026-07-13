import React from "react";
import {
  type IResourceComponentsProps,
  useNavigation,
  useOne,
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
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { ChevronLeft, ListIcon } from "lucide-react";

export const BlogPostEdit: React.FC<IResourceComponentsProps> = () => {
  const { list } = useNavigation();

  const {
    refineCore: { onFinish, query: queryResult },
    ...form
  } = useForm({
    refineCoreProps: {
      meta: {
        populate: ["category"],
      },
    },
  });

  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    setValue,
  } = form;
  const blogPostsData = queryResult?.data?.data;

  const blogPostCategoryData = useOne({
    resource: "categories",
    id: blogPostsData?.category,
  });
  const blogPostCategory = blogPostCategoryData?.data?.data;

  const { options: categoryOptions } = useSelect({
    resource: "categories",
    optionLabel: "title",
    defaultValue: blogPostCategory?.id,
  });

  React.useEffect(() => {
    setValue("category", blogPostCategory);
  }, [categoryOptions]);

  return (
    <div className="p-2">
      <div className="flex justify-between">
        <div className="flex justify-start items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => list("blog_posts")}>
            <ChevronLeft />
          </Button>
          <h1 className="text-2xl font-bold">Edit Blog Post</h1>
        </div>
        <div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              list("blog_posts");
            }}
          >
            <ListIcon />
          </Button>
        </div>
      </div>
      <Form {...form}>
        <form className="mt-8" onSubmit={handleSubmit(onFinish)}>
          <div className="flex flex-col gap-2">
            <FormItem>
              <FormLabel className="mr-2">Title</FormLabel>
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
              <FormLabel className="mr-2">Content</FormLabel>
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
                    defaultValue={field?.value?.id}
                    onValueChange={field?.onChange}
                    {...register("category", {
                      required: "Category cannot be empty",
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue
                        placeholder={field?.value?.title ?? "Select a category"}
                      />
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
                    defaultValue={field?.value?.name}
                    onOpenChange={field?.onChange}
                    {...register("status")}
                  >
                    <SelectTrigger>
                      <SelectValue
                        placeholder={field?.value ?? "Select post status"}
                      />
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
              <Button className="w-40 mt-4" type="submit">
                Save
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};
