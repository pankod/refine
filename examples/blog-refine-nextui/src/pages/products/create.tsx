import { type HttpError, useBack, useSelect } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";

import {
  Button,
  Card,
  Input,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Textarea,
} from "@nextui-org/react";

import { ArrowLongLeftIcon } from "@heroicons/react/24/outline";

import type { IProduct, IProductCategory } from "../../interfaces";

export const ProductCreate = () => {
  const goBack = useBack();

  const {
    refineCore: { onFinish, formLoading },
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IProduct, HttpError, IProduct>({
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const { options: categoryOptions } = useSelect<IProductCategory>({
    resource: "categories",

    pagination: {
      mode: "server",
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
          <h1 className="font-bold">Create Product</h1>
        </div>
        <form onSubmit={handleSubmit(onFinish)}>
          <div className="p-fluid">
            <Controller
              name="name"
              control={control}
              rules={{ required: "Name is required." }}
              render={({ field, fieldState }) => {
                return (
                  <Input
                    label="Name"
                    variant="bordered"
                    labelPlacement="outside"
                    placeholder="Enter product name"
                    value={field.value ?? ""}
                    errorMessage={errors[field.name]?.message ?? ""}
                    type="text"
                    onChange={(ev) => field.onChange(ev.target.value)}
                  />
                );
              }}
            />
            <Controller
              name="price"
              control={control}
              rules={{
                required: "Price is required.",
              }}
              render={({ field, fieldState }) => {
                return (
                  <Input
                    label="Price"
                    variant="bordered"
                    labelPlacement="outside"
                    placeholder="Enter price"
                    errorMessage={errors[field.name]?.message ?? ""}
                    type="number"
                    min="0"
                    value={`${field.value ?? ""}`}
                    onChange={(ev) => field.onChange(ev.target.value)}
                    className="mt-5"
                  />
                );
              }}
            />
            <Controller
              name="category.id"
              control={control}
              rules={{ required: "Category is required." }}
              render={({ field, fieldState }) => {
                return (
                  <Dropdown id="options-categories">
                    <DropdownTrigger>
                      <Button className="mt-5" variant="bordered">
                        Select product category
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                      aria-label="Select category"
                      selectionMode="single"
                      selectedKeys={[
                        field.value ?? categoryOptions[0]?.label ?? "",
                      ]}
                      onSelectionChange={(selectedItem) => {
                        field.onChange(
                          (selectedItem as Set<string>).values().next().value,
                        );
                      }}
                    >
                      {categoryOptions.map((categoryOption) => {
                        return (
                          <DropdownItem key={`${categoryOption.label}`}>
                            {categoryOption.label}
                          </DropdownItem>
                        );
                      })}
                    </DropdownMenu>
                  </Dropdown>
                );
              }}
            />
            <Controller
              name="description"
              control={control}
              rules={{ required: "Description is required." }}
              render={({ field, fieldState }) => {
                return (
                  <Textarea
                    label="Description"
                    placeholder="Enter product description here"
                    variant="bordered"
                    labelPlacement="outside"
                    errorMessage={errors[field.name]?.message ?? ""}
                    value={field.value ?? ""}
                    onChange={(ev) => field.onChange(ev.target.value)}
                    className="mt-5"
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
              Save Product
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};
