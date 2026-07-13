import React from "react";
import { useNavigation, useSelect } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export const ProductCreate = () => {
  const { list } = useNavigation();

  const {
    refineCore: { onFinish },
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { options: categoryOptions } = useSelect({
    resource: "categories",

    pagination: {
      mode: "server",
    },
  });

  return (
    <div className="page-container">
      <div className="flex justify-start items-center">
        <div>
          <button
            className="mr-2 btn btn-primary btn-sm btn-ghost"
            onClick={() => {
              list("products");
            }}
          >
            <ArrowLeftIcon className="h-5 w-5" />
          </button>
        </div>
        <h1 className="page-title">Create a Product</h1>
      </div>
      <form className="mx-2" onSubmit={handleSubmit(onFinish)}>
        <div className="form-control my-4">
          <label className="m-1">Name</label>
          <input
            className="input input-sm input-bordered"
            type="text"
            {...register("name", {
              required: "This field is required",
            })}
          />
          <span style={{ color: "red" }}>
            {(errors as any)?.name?.message as string}
          </span>
        </div>
        <div className="form-control my-4">
          <label className="m-1">Price</label>
          <input
            className="input input-sm input-bordered"
            type="number"
            {...register("price", {
              required: "This field is required",
              valueAsNumber: true,
            })}
          />
          <span style={{ color: "red" }}>
            {(errors as any)?.price?.message as string}
          </span>
        </div>
        <div className="form-control my-4">
          <label className="m-1" htmlFor="category">
            Category
          </label>
          <select
            className="input input-sm input-bordered"
            {...register("category.id", {
              required: "This field is required",
            })}
          >
            {categoryOptions?.map((option) => (
              <option value={option.value} key={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <span style={{ color: "red" }}>
            {(errors as any)?.category?.id?.message as string}
          </span>
        </div>
        <div className="form-control my-4">
          <label className="m-1">Description</label>
          <textarea
            className="textarea textarea-bordered"
            rows={5}
            style={{ verticalAlign: "top" }}
            {...register("description", {
              required: "This field is required",
            })}
          />
          <span style={{ color: "red" }}>
            {(errors as any)?.description?.message as string}
          </span>
        </div>
        <div className="flex justify-end items-center my-6">
          <input
            className="btn btn-primary btn-sm normal-case text-xl text-zinc-50 font-normal"
            type="submit"
            value="Save"
          />
        </div>
      </form>
    </div>
  );
};
