import React from "react";
import { useNavigation, useSelect } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { ArrowLeftIcon, ArrowPathIcon } from "@heroicons/react/24/outline";

export const ProductEdit = () => {
  const { list } = useNavigation();

  const {
    refineCore: { onFinish, query: queryResult },
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const productsData = queryResult?.data?.data;

  const { options: categoryOptions } = useSelect({
    resource: "categories",
    defaultValue: productsData?.category?.id,

    pagination: {
      mode: "server",
    },
  });

  React.useEffect(() => {
    setValue("category.id", productsData?.category?.id);
  }, [productsData, categoryOptions]);

  return (
    <div className="page-container">
      <div className="flex justify-between items-center">
        <div className="flex justify-start items-center">
          <button
            className="mr-2 btn btn-primary btn-sm btn-ghost"
            onClick={() => {
              list("products");
            }}
          >
            <ArrowLeftIcon className="h-5 w-5" />
          </button>
          <h1 className="page-title">Edit Product</h1>
        </div>
        <div>
          <button
            className="flex justify-center items-center btn btn-sm btn-primary btn-outline normal-case font-normal"
            onClick={() => queryResult?.refetch()}
          >
            <ArrowPathIcon className="h-5 w-5" />
            Refresh
          </button>
        </div>
      </div>
      <form className="mx-2" onSubmit={handleSubmit(onFinish)}>
        <div className="form-control my-4">
          <label className="label">Name</label>
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
          <label className="label">Price</label>
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
          <label className="label">Category</label>
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
          <label className="label">Description</label>
          <textarea
            className="textarea textarea-bordered"
            rows={5}
            {...register("description", {
              required: "This field is required",
            })}
          />
          <span style={{ color: "red" }}>
            {(errors as any)?.description?.message as string}
          </span>
        </div>
        <div className="flex justify-end items-center">
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
