import React, { useMemo, useRef } from "react";
import { getDefaultFilter } from "@refinedev/core";
import { useTable } from "@refinedev/react-table";
import { type ColumnDef, flexRender } from "@tanstack/react-table";
import {
  FunnelIcon,
  BarsArrowDownIcon,
  BarsArrowUpIcon,
} from "@heroicons/react/24/outline";
export const RecentSales = () => {
  const filterForm: any = useRef(null);

  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        id: "id",
        accessorKey: "id",
        header: "Id",
      },
      {
        id: "amount",
        accessorKey: "amount",
        header: "Amount",
        cell: function render({ getValue }) {
          const amountCur = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(getValue() as number);

          return <div>{amountCur}</div>;
        },
      },
      {
        id: "orderedBy",
        accessorKey: "user.fullName",
        header: "Ordered By",
      },
      {
        id: "gender",
        accessorKey: "user.gender",
        header: "Gender",
      },
      {
        id: "tel",
        accessorKey: "user.gsm",
        enableSorting: false,
        header: "Tel",
      },
      {
        id: "deliveryAddress",
        accessorKey: "adress.text",
        header: "Delivery Address",
      },
      {
        id: "deliveryStatus",
        accessorKey: "status.text",
        header: "Delivery Status",
        cell: function render({ getValue }) {
          type TSaleStatusStyleMap = {
            [key: string]: string;
          };

          const saleStatusStyleMap: TSaleStatusStyleMap = {
            Cancelled: "error",
            Ready: "primary",
            "On The Way": "info",
            Pending: "warning",
            Delivered: "success",
          };

          const status = getValue() as string;
          const daisyBadgeClasses = () =>
            `badge badge-${saleStatusStyleMap[status]}`;

          return <div className={daisyBadgeClasses()}>{status}</div>;
        },
      },
      {
        id: "createdAt",
        accessorKey: "createdAt",
        header: "Created At",
        cell: function render({ getValue }) {
          const date = new Intl.DateTimeFormat("en-US", {
            dateStyle: "short",
            timeStyle: "short",
          }).format(new Date(getValue() as string));

          return <div>{date}</div>;
        },
      },
    ],
    [],
  );

  const {
    reactTable: { getHeaderGroups, getRowModel },

    refineCore: { filters, setCurrentPage: setCurrent, setFilters },
  } = useTable({
    columns,

    refineCoreProps: {
      resource: "orders",

      pagination: {
        pageSize: 5,
      },
    },
  });

  const header = (
    <div className="w-full mx-auto">
      <div className="my-2">
        <h1 className="page-title text-gray-700">Recent Sales</h1>
      </div>
      <div className="overflow-x-auto bg-slate-50 border rounded-t-lg">
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
      </div>
    </div>
  );

  return (
    <div className="w-full mx-auto my-8 drop-shadow-md">
      {header}
      <div className="p-4 overflow-x-auto bg-slate-50 border rounded-b-lg">
        <table className="table table-zebra border-t">
          <thead className="bg-slate-200">
            {getHeaderGroups()?.map((headerGroup) => (
              <tr key={headerGroup?.id}>
                {headerGroup?.headers?.map((header) => (
                  <th
                    className="hover:bg-slate-300"
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
    </div>
  );
};
