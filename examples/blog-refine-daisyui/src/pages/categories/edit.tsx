import React from "react";
import { useNavigation } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { ArrowLeftIcon, ArrowPathIcon } from "@heroicons/react/24/outline";

export const CategoryEdit = () => {
  const { list } = useNavigation();

  const {
    refineCore: { onFinish, query: queryResult },
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className="page-container">
      <div className="flex justify-between items-center">
        <div className="flex justify-start items-center">
          <button
            className="mr-2 btn btn-primary btn-sm btn-ghost"
            onClick={() => {
              list("categories");
            }}
          >
            <ArrowLeftIcon className="h-5 w-5" />
          </button>
          <h1 className="page-title">Edit Category</h1>
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
      <form onSubmit={handleSubmit(onFinish)}>
        <div className="form-control my-4">
          <label className="label">Name</label>
          <input
            className="input input-sm input-bordered"
            type="text"
            {...register("title", {
              required: "This field is required",
            })}
          />
          <span style={{ color: "red" }}>
            {(errors as any)?.title?.message as string}
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
