import React from "react";
import clsx from "clsx";
import { type ColumnDef, type Table, flexRender } from "@tanstack/react-table";
import type { Activity } from "src/interfaces/activity";
import { ChevronDownIcon } from "./icons/chevron-down";

type Props = {
  table: Table<Activity>;
  columns: ColumnDef<Activity>[];
  selected: string | null;
  onSelect: (identifier: string | null) => void;
};

export const MonitorTable = ({ table, columns, selected, onSelect }: Props) => {
  return (
    <>
      <div className={clsx("re-flex-1")}>
        <table className={clsx("re-w-full", "re-rounded-lg")}>
          <thead
            className={clsx(
              "re-bg-gray-800",
              "re-rounded-lg",
              "re-sticky",
              "re-left-0",
              "re-top-0",
              "after:re-h-px",
              "after:re-w-full",
              "after:re-absolute",
              "after:re-left-0",
              "after:re-bottom-0",
              "after:re-bg-gray-700",
              "re-z-[1]",
            )}
          >
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                className={clsx("re-border-b", "re-border-gray-700")}
              >
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className={clsx(
                      "re-p-2",
                      "re-text-gray-300",
                      "re-text-xs",
                      "re-font-semibold",
                      "re-text-left",
                    )}
                    style={{
                      minWidth: columns[header.index].minSize,
                    }}
                  >
                    <div
                      {...{
                        className: header.column.getCanSort()
                          ? "re-cursor-pointer re-select-none hover:re-underline re-flex re-items-center"
                          : "",
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                      {{
                        asc: <ChevronDownIcon className="re-rotate-180" />,
                        desc: <ChevronDownIcon className="re-rotate-0" />,
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => {
              const isSelected = row.original.identifier === selected;

              return (
                <tr
                  key={row.original.identifier}
                  className={clsx(
                    isSelected && "re-bg-gray-800",
                    !isSelected && "hover:re-bg-gray-800",
                    !isSelected && "hover:re-bg-opacity-50",
                    "re-border-b",
                    "re-border-b-gray-700",
                    "re-text-gray-300",
                    "last-of-type:re-border-b-0",
                    "re-text-xs",
                    "re-cursor-pointer",
                  )}
                  onClick={() => {
                    onSelect(
                      selected === row.original.identifier
                        ? null
                        : row.original.identifier,
                    );
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className={clsx("re-p-2")}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div
        className={clsx(
          "re-border-t",
          "re-border-t-gray-700",
          "re-flex",
          "re-items-center",
          "re-justify-center",
          "re-py-2",
          "re-px-2",
          "re-sticky",
          "re-left-0",
          "re-bottom-0",
          "re-z-[1]",
          "re-bg-gray-900",
        )}
      >
        <div
          className={clsx(
            "re-flex",
            "re-items-center",
            "re-justify-center",
            "re-gap-2",
            "re-flex-wrap",
          )}
        >
          <button
            className={clsx(
              "re-py-1",
              "re-px-3",
              "re-text-xs",
              "hover:re-bg-gray-800",
              "re-border",
              "re-border-gray-700",
              "re-text-gray-300",
              "re-rounded-2xl",
              "re-cursor-pointer",
            )}
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </button>
          <span
            className={clsx(
              "re-flex",
              "re-items-center",
              "re-break-keep",
              "re-whitespace-nowrap",
              "re-text-gray-300",
              "re-text-xs",
            )}
          >
            {`${
              table.getState().pagination.pageIndex + 1
            } of ${table.getPageCount()}`}
          </span>
          <button
            className={clsx(
              "re-py-1",
              "re-px-3",
              "re-text-xs",
              "hover:re-bg-gray-800",
              "re-border",
              "re-border-gray-700",
              "re-text-gray-300",
              "re-rounded-2xl",
              "re-cursor-pointer",
            )}
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};
