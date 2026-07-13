"use client";

import { useMemo } from "react";
import type { HttpError, useTableProps } from "@refinedev/core";
import { useTable } from "@refinedev/react-table";
import { type ColumnDef, flexRender } from "@tanstack/react-table";
import cn from "classnames";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  PlusSquareIcon,
} from "@/components/icons";
import { useBasketContext } from "@/hooks/useBasketContext";
import type { Product } from "@/types";

type Props = {
  refineCoreProps?: Partial<useTableProps<Product, HttpError, Product>>;
};

export const ProductsTable = ({ refineCoreProps }: Props) => {
  const columns = useMemo<ColumnDef<Product>[]>(
    () => [
      {
        id: "product",
        accessorFn: (row) => row,
        cell: function render({ row }) {
          const product = row.original;

          return (
            <div className="flex flex-col items-center gap-4 md:flex-row md:gap-8">
              <img
                className="h-32 w-32 flex-none rounded-full object-cover"
                src={product.images[0].url}
              />
              <div className="flex-auto flex-col text-center md:text-left">
                <h3 className="text-lg font-bold text-gray-800">
                  {product.name}
                </h3>
                <p className="text-gray-600">{product.description}</p>
              </div>
              <div className="w-16 shrink-0 text-lg font-bold text-gray-800">
                ${product.price}
              </div>
              <OrderAmountInput productId={product.id} />
            </div>
          );
        },
      },
    ],
    [],
  );

  const {
    reactTable: {
      options: {
        state: { pagination },
      },

      getRowModel,
      setPageIndex,
      getCanPreviousPage,
      getCanNextPage,
      getPageOptions,
      nextPage,
      previousPage,
    },
  } = useTable<Product>({
    columns,

    refineCoreProps: {
      syncWithLocation: true,
      resource: "products",
      pagination: {
        pageSize: 6,
      },
      ...(refineCoreProps || {}),
    },
  });

  return (
    <>
      <table className="w-full">
        <tbody>
          {getRowModel().rows.map((row) => {
            return (
              <tr key={row.id} className="border-b border-gray-100">
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td key={cell.id} className="p-4">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="py-4 flex justify-end px-4">
        <button
          className="border px-2 py-2 text-sm font-medium hover:bg-gray-50"
          onClick={() => previousPage()}
          disabled={!getCanPreviousPage()}
        >
          <ChevronLeftIcon className="text-primary h-5 w-5" />
        </button>
        {getPageOptions().map((page) => (
          <button
            key={page}
            className={`border px-4 py-2 text-sm font-medium hover:bg-gray-50 ${
              pagination?.pageIndex === page ? "text-primary" : ""
            }`}
            onClick={() => setPageIndex(page)}
          >
            {page + 1}
          </button>
        ))}
        <button
          className="border px-2 py-2 text-sm font-medium hover:bg-gray-50"
          onClick={() => nextPage()}
          disabled={!getCanNextPage()}
        >
          <ChevronRightIcon className="text-primary h-5 w-5" />
        </button>
      </div>
    </>
  );
};

const OrderAmountInput = ({ productId }: { productId: number }) => {
  const { dispatch, findOrderByProductId } = useBasketContext();

  const order = findOrderByProductId(productId);

  return (
    <div className="flex shrink-0 gap-4">
      <div
        className={cn(
          "relative flex items-center overflow-hidden",
          "transition-opacity duration-300 ease-in-out",
          {
            "opacity-0": !order,
          },
        )}
      >
        <button
          className="h-full rounded-tl-md rounded-bl-md border p-2 transition-all hover:bg-gray-50 active:bg-gray-50"
          disabled={!order}
          onClick={() =>
            dispatch({
              type: "decrementProductAmount",
              payload: { productId: productId },
            })
          }
        >
          <ChevronDownIcon className="text-primary h-4 w-4" />
        </button>
        <input
          className="focus:outline-primary focus:border-primary h-full w-10 border p-2 transition-colors"
          min={0}
          disabled={!order}
          value={order?.amount || 0}
          onChange={(event) => {
            let value = Number(event.target.value);
            // is not a number
            if (!/^\d+$/.test(event.target.value)) {
              value = 0;
            }

            dispatch({
              type: "setProductAmount",
              payload: {
                productId: productId,
                amount: value,
              },
            });
          }}
        />
        <button
          className="h-full rounded-tr-md rounded-br-md border p-2 transition-all hover:bg-gray-50 active:bg-gray-50"
          disabled={!order}
          onClick={() =>
            dispatch({
              type: "incrementProductAmount",
              payload: { productId: productId },
            })
          }
        >
          <ChevronUpIcon className="text-primary h-4 w-4" />
        </button>
      </div>
      <button
        className="bg-primary flex h-8 items-center gap-1 rounded-lg pl-2 pr-4 font-bold text-white transition-all hover:bg-orange-500 active:scale-95"
        onClick={() =>
          dispatch({
            type: "addProduct",
            payload: { productId: productId, amount: 1 },
          })
        }
      >
        <PlusSquareIcon className="h-6 w-6 text-white" />
        Add to Card
      </button>
    </div>
  );
};
