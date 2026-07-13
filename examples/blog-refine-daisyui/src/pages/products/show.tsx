import React from "react";
import { useShow, useNavigation } from "@refinedev/core";
import { ArrowLeftIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import type { IProduct } from "../../interfaces";

export const ProductShow = () => {
  const { edit, list } = useNavigation();
  const {
    query: { data },
  } = useShow<IProduct>();

  const record = data?.data;
  const id = record?.id;

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="flex justify-start items-center">
          <button
            className="mr-2 btn btn-primary btn-sm btn-ghost"
            onClick={() => list("products")}
          >
            <ArrowLeftIcon className="h-5 w-5" />
          </button>
          <h1 className="page-title">Product Details</h1>
        </div>
        <div className="flex justify-between items-center">
          <button
            className="flex justify-center items-center btn btn-primary btn-sm text-zinc-50 normal-case font-normal"
            onClick={() => edit("products", id ?? "")}
          >
            <PencilSquareIcon className="h-5 w-5" />
            Edit
          </button>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <div className="text-xl font-bold">
            {record?.name ?? "Loading..."}
          </div>
          <div className="divider p-0 m-0" />
          <div className="mb-2">
            <h5 className="mb-1 font-bold">Price</h5>
            <div>{record?.price ? `$ ${record?.price}` : "Loading..."}</div>
          </div>
          <div className="mb-2">
            <h5 className="mb-1 font-bold">Category</h5>
            <div>{record?.category?.title ?? "Loading..."}</div>
          </div>
          <div className="mb-2">
            <h5 className="mb-1 font-bold">Description</h5>
            <div>{record?.description ?? "Loading..."}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
