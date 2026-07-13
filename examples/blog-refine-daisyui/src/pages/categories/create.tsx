import React from "react";
import { useNavigation } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export const CategoryCreate = () => {
  const { list } = useNavigation();

  const {
    refineCore: { onFinish },
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className="page-container">
      <div className="flex justify-start items-center">
        <div>
          <button
            className="mr-2 btn btn-primary btn-sm btn-ghost"
            onClick={() => {
              list("categories");
            }}
          >
            <ArrowLeftIcon className="h-4 w-4" />
          </button>
        </div>
        <h1 className="page-title">Create a Category</h1>
      </div>
      <form className="mx-2" onSubmit={handleSubmit(onFinish)}>
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
          <div className="flex justify-end items-center my-6">
            <input
              className="btn btn-primary btn-sm normal-case text-xl text-zinc-50 font-normal"
              type="submit"
              value="Save"
            />
          </div>
        </div>
      </form>
    </div>
  );
};
