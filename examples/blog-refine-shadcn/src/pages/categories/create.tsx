import React from "react";
import { IResourceComponentsProps, useNavigation } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";

import { Form, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { ChevronLeft, ListIcon } from "lucide-react";
import type { Category } from "../../interfaces";

export const CategoryCreate: React.FC = () => {
  const { list } = useNavigation();

  const {
    refineCore: { onFinish },
    ...form
  } = useForm<Category>({});

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <div className="mx-2 py-2">
      <div className="flex justify-between">
        <div className="flex justify-between items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => list("categories")}>
            <ChevronLeft />
          </Button>
          <h1 className="text-2xl font-bold">Create a Category</h1>
        </div>
        <div className="mt-8">
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
        <form onSubmit={handleSubmit(onFinish)}>
          <div className="flex flex-col gap-2">
            <FormItem>
              <FormLabel className="m-2">Title</FormLabel>
              <Input
                type="text"
                {...register("title", {
                  required: "Title cannot be empty",
                })}
              />
              <FormMessage className="text-destructive">
                {errors?.title?.message as string}
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
