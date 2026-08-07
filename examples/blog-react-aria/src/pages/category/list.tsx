import React from "react";
import { useTable } from "@refinedev/react-table";
import { type ColumnDef, flexRender } from "@tanstack/react-table";
import { CategoryCreate } from "./create";

export const CategoryList: React.FC = () => {
  // eslint-disable-next-line
  const columns = React.useMemo<ColumnDef<any>[]>(
    () => [
      {
        id: "id",
        header: "ID",
        accessorKey: "id",
        width: 50,
      },
      {
        id: "title",
        header: "Title",
        accessorKey: "title",
      },
    ],
    [],
  );

  // eslint-disable-next-line
  const {
    reactTable: { getHeaderGroups, getRowModel },
  } = useTable<any>({
    columns,

    refineCoreProps: {
      sorters: {
        permanent: [
          {
            field: "id",
            order: "desc",
          },
        ],
      },
    },
  });
  return (
    <div className="container mx-auto w-full max-w-3xl pb-4">
      <CategoryCreate />

      <table className="min-w-full table-fixed divide-y divide-gray-200 border">
        <thead className="bg-gray-100">
          {getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  colSpan={header.colSpan}
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 "
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {getRowModel().rows.map((row) => {
            return (
              <tr key={row.id} className="transition hover:bg-gray-100">
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td
                      key={cell.id}
                      className="whitespace-nowrap px-6 py-2 text-sm font-medium text-gray-900"
                    >
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
    </div>
  );
};
