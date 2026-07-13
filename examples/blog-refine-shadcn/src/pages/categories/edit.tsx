import React from "react";
import { type IResourceComponentsProps, useNavigation } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";

import { Form, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { ChevronLeft, ListIcon } from "lucide-react";

export const CategoryEdit: React.FC<IResourceComponentsProps> = () => {
  const { list } = useNavigation();

  const {
    refineCore: { onFinish },
    ...form
  } = useForm();

  const {
    formState: { errors },
    handleSubmit,
    register,
    setValue,
  } = form;

  return (
    <div className="p-2">
      <div className="flex justify-between">
        <div className="flex justify-between items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => list("categories")}>
            <ChevronLeft />
          </Button>
          <h1 className="text-2xl font-bold">Edit Category</h1>
        </div>
        <div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              list("categories");
            }}
          >
            <ListIcon />
          </Button>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={handleSubmit(onFinish)} className="mt-6">
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
            <div className="mt-4">
              <Button className="w-40" type="submit">
                Save
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};
