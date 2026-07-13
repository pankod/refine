import React, { useRef } from "react";
import { getDefaultFilter, useDelete, useNavigation } from "@refinedev/core";
import { useTable } from "@refinedev/react-table";
import { type ColumnDef, flexRender } from "@tanstack/react-table";
import { PlusIcon } from "@heroicons/react/20/solid";
import {
  FunnelIcon,
  PencilSquareIcon,
  EyeIcon,
  TrashIcon,
  BarsArrowDownIcon,
  BarsArrowUpIcon,
} from "@heroicons/react/24/outline";

export const ProductList = () => {
  const filterForm: any = useRef(null);

  const { mutate: deleteProduct } = useDelete();

  const columns = React.useMemo<ColumnDef<any>[]>(
    () => [
      {
        id: "id",
        accessorKey: "id",
        header: "Id",
      },
      {
        id: "name",
        accessorKey: "name",
        header: "Name",
      },
      {
        id: "price",
        accessorKey: "price",
        header: "Price",
      },
      {
        id: "category",
        header: "Category",
        enableSorting: false,
        accessorKey: "category.title",
      },
      {
        id: "description",
        accessorKey: "description",
        enableSorting: false,
        header: "Description",
      },
      {
        id: "actions",
        accessorKey: "id",
        header: "Actions",
        enableSorting: false,
        cell: function render({ getValue }) {
          return (
            <div className="flex justify-around items-center">
              <button
                className="btn btn-xs btn-circle btn-ghost m-1"
                onClick={() => {
                  edit("products", getValue() as string);
                }}
              >
                <PencilSquareIcon className="h-4 w-4" />
              </button>
              <button
                className="btn btn-xs btn-circle btn-ghost m-1"
                onClick={() => {
                  show("products", getValue() as string);
                }}
              >
                <EyeIcon className="h-4 w-4" />
              </button>
              <button
                className="btn btn-xs btn-circle btn-ghost m-1"
                onClick={() => {
                  deleteProduct({
                    resource: "products",
                    id: getValue() as string,
                  });
                }}
              >
                <TrashIcon className="h-4 w-4 text-error" />
              </button>
            </div>
          );
        },
      },
    ],
    [],
  );

  const { edit, show, create } = useNavigation();

  const {
    reactTable: {
      getHeaderGroups,
      getRowModel,
      getState,
      setPageIndex,
      getCanPreviousPage,
      getPageCount,
      getCanNextPage,
      nextPage,
      previousPage,
      setPageSize,
    },

    refineCore: { filters, setCurrentPage: setCurrent, setFilters },
  } = useTable({
    columns,
  });

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Products</h1>
        <button
          className="btn btn-sm btn-primary normal-case font-normal text-zinc-50"
          onClick={() => create("products")}
        >
          <PlusIcon className="h-5 w-5" />
          Create
        </button>
      </div>
      <div className="overflow-x-auto bg-slate-50 border">
        <div className="flex justify-between items-center m-4">
          <button
            className="btn btn-outline btn-primary btn-sm normal-case font-light"
            onClick={() => {
              setCurrent(1);
              setFilters([], "replace");
              filterForm?.current?.reset();
            }}
          >
            <FunnelIcon className="h-4 w-4" />
            Clear
          </button>
          <div className="flex justify-end items-center">
            <form ref={filterForm}>
              <input
                className="input input-bordered input-sm"
                type="search"
                value={getDefaultFilter("q", filters)}
                onChange={(e) => {
                  setCurrent(1);
                  setFilters([
                    {
                      field: "q",
                      value: e.target.value,
                      operator: "contains",
                    },
                  ]);
                }}
                placeholder="Search with keywords"
              />
            </form>
          </div>
        </div>
        <table className="table table-zebra border-t">
          <thead className="bg-slate-200">
            {getHeaderGroups()?.map((headerGroup) => (
              <tr key={headerGroup?.id}>
                {headerGroup?.headers?.map((header) => (
                  <th
                    className="text-center hover:bg-slate-300"
                    key={header?.id}
                    onClick={header?.column?.getToggleSortingHandler()}
                  >
                    <div className="flex justify-start items-center">
                      {!header?.isPlaceholder &&
                        flexRender(
                          header?.column?.columnDef?.header,
                          header?.getContext(),
                        )}
                      {{
                        asc: <BarsArrowUpIcon className="h-4 w-4" />,
                        desc: <BarsArrowDownIcon className="h-4 w-4" />,
                      }[header?.column?.getIsSorted() as string] ?? null}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {getRowModel()?.rows?.map((row) => (
              <tr key={row?.id}>
                {row?.getVisibleCells()?.map((cell) => (
                  <td key={cell?.id}>
                    {flexRender(
                      cell?.column?.columnDef?.cell,
                      cell?.getContext(),
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center items-center mt-3">
        <div className="join">
          <button
            className="join-item btn btn-sm btn-ghost"
            onClick={() => setPageIndex(0)}
            disabled={!getCanPreviousPage()}
          >
            {"<<"}
          </button>
          <button
            className="join-item btn btn-sm btn-ghost"
            onClick={() => previousPage()}
            disabled={!getCanPreviousPage()}
          >
            {"<"}
          </button>
          {Array.from({ length: getPageCount() }, (_, index) => index + 1)?.map(
            (pageNumber) => {
              const btnActive =
                pageNumber - 1 === getState()?.pagination?.pageIndex
                  ? " btn-active"
                  : "";
              return (
                <button
                  key={pageNumber}
                  className={`join-item btn btn-sm${btnActive}`}
                  onClick={() => setPageIndex(pageNumber - 1)}
                >
                  {pageNumber}
                </button>
              );
            },
          )}
          <button
            className="join-item btn btn-sm btn-ghost"
            onClick={() => nextPage()}
            disabled={!getCanNextPage()}
          >
            {">"}
          </button>
          <button
            className="join-item btn btn-sm btn-ghost"
            onClick={() => setPageIndex(getPageCount() - 1)}
            disabled={!getCanNextPage()}
          >
            {">>"}
          </button>
        </div>
        <select
          className="mx-2 p-1 border rounded"
          value={getState()?.pagination?.pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 25, 50].map((pageSize) => (
            <option className="border rounded" key={pageSize} value={pageSize}>
              {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
