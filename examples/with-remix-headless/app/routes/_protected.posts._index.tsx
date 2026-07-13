import React from "react";
import { useTable } from "@refinedev/react-table";
import { type ColumnDef, flexRender } from "@tanstack/react-table";
import { useNavigation } from "@refinedev/core";
import { useLoaderData } from "@remix-run/react";
import { json, type LoaderFunctionArgs } from "@remix-run/node";
import dataProvider from "@refinedev/simple-rest";
import { parseTableParams } from "@refinedev/remix-router";

import { API_URL } from "~/constants";
import type { IPost } from "~/interfaces";

const PostList: React.FC = () => {
  const { initialData } = useLoaderData<typeof loader>();
  const { edit, create } = useNavigation();

  const columns = React.useMemo<ColumnDef<IPost>[]>(
    () => [
      {
        id: "id",
        header: "ID",
        accessorKey: "id",
      },
      {
        id: "title",
        header: "Title",
        accessorKey: "title",
        meta: {
          filterOperator: "contains",
        },
      },
      {
        id: "status",
        header: "Status",
        accessorKey: "status",
      },
      {
        id: "createdAt",
        header: "CreatedAt",
        accessorKey: "createdAt",
      },
      {
        id: "action",
        Header: "Action",
        accessorKey: "id",
        cell: function render({ getValue }) {
          return (
            <button onClick={() => edit("posts", getValue() as number)}>
              Edit
            </button>
          );
        },
      },
    ],
    [],
  );

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
      getColumn,
    },
  } = useTable<IPost>({
    columns,

    refineCoreProps: {
      queryOptions: {
        initialData,
      },
    },
  });

  const titleColumn = getColumn("title");

  return (
    <>
      <div>
        <button onClick={() => create("posts")}>Create Post</button>
        <br />
        <br />
        <label htmlFor="title">Title: </label>
        <input
          id="title"
          type="text"
          value={(titleColumn?.getFilterValue() as string) ?? ""}
          onChange={(event) => titleColumn?.setFilterValue(event.target.value)}
        />
      </div>
      <table>
        <thead>
          {getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder ? null : (
                    <div onClick={header.column.getToggleSortingHandler()}>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                      {{
                        asc: " 🔼",
                        desc: " 🔽",
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {getRowModel().rows.map((row) => {
            return (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td key={cell.id}>
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

      <div>
        <button
          onClick={() => setPageIndex(0)}
          disabled={!getCanPreviousPage()}
        >
          {"<<"}
        </button>
        <button onClick={() => previousPage()} disabled={!getCanPreviousPage()}>
          {"<"}
        </button>
        <button onClick={() => nextPage()} disabled={!getCanNextPage()}>
          {">"}
        </button>
        <button
          onClick={() => setPageIndex(getPageCount() - 1)}
          disabled={!getCanNextPage()}
        >
          {">>"}
        </button>
        <span>
          Page
          <strong>
            {getState().pagination.pageIndex + 1} of {getPageCount()}
          </strong>
        </span>
        <span>
          | Go to page:
          <input
            type="number"
            defaultValue={getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              setPageIndex(page);
            }}
          />
        </span>{" "}
        <select
          value={getState().pagination.pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default PostList;

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);

  const { pagination, filters, sorters } = parseTableParams(url.search);

  const data = await dataProvider(API_URL).getList<IPost>({
    resource: "posts",
    filters,
    pagination,
    sorters,
  });

  return json({ initialData: data });
}
