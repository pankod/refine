import { type HttpError, useBack } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";

import { Button, Card, Input } from "@nextui-org/react";

import { ArrowLongLeftIcon } from "@heroicons/react/24/outline";

import type { ICategory } from "../../interfaces";

export const CategoryEdit = () => {
  const goBack = useBack();

  const {
    refineCore: { onFinish, formLoading },
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ICategory, HttpError>({
    defaultValues: {
      title: "",
    },
  });

  return (
    <div>
      <Card className="shadow-1 p-5">
        <div className="flex items-center">
          <Button
            onClick={goBack}
            className="m-1"
            color="primary"
            variant="light"
            isIconOnly
            aria-label="Go to products page"
          >
            <ArrowLongLeftIcon width={16} />
          </Button>
          <h1 className="text-lg font-bold">Edit Category</h1>
        </div>
        <form onSubmit={handleSubmit(onFinish)}>
          <div className="p-fluid">
            <Controller
              name="title"
              control={control}
              rules={{ required: "Name is required." }}
              render={({ field, fieldState }) => {
                return (
                  <Input
                    label="Name"
                    variant="bordered"
                    labelPlacement="outside"
                    placeholder="Enter category name"
                    value={field.value ?? ""}
                    errorMessage={`${errors[field.name]?.message ?? ""}`}
                    type="text"
                    onChange={(ev) => field.onChange(ev.target.value)}
                  />
                );
              }}
            />
          </div>
          <div className="flex justify-content-end">
            <Button
              type="submit"
              isLoading={formLoading}
              color="primary"
              className="mt-5"
            >
              Save Category
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};
