import React from "react";
import { useShow, useNavigation } from "@refinedev/core";
import { ArrowLeftIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import type { ICategory } from "../../interfaces";

export const CategoryShow = () => {
  const { edit, list } = useNavigation();
  const {
    query: { data },
  } = useShow<ICategory>();

  const record = data?.data;

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="flex justify-between items-center">
          <button
            className="mr-2 btn btn-primary btn-sm btn-ghost"
            onClick={() => list("categories")}
          >
            <ArrowLeftIcon className="h-5 w-5" />
          </button>
          <h1 className="page-title">Category Details</h1>
        </div>
        <div className="flex justify-start items-center">
          <button
            className="flex justify-center items-center btn btn-primary btn-sm text-zinc-50 normal-case font-normal"
            onClick={() => edit("categories", record?.id ?? "")}
          >
            <PencilSquareIcon className="h-5 w-5" />
            Edit
          </button>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <div className="mb-2">
            <h5 className="text-xl font-bold">Id</h5>
            <div>{record?.id ?? "Loading..."}</div>
          </div>
          <div className="mb-2">
            <h5 className="text-xl font-bold">Name</h5>
            <div>{record?.title ?? "Loading..."}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
