import React from "react";
import {
  useNavigation,
  type GetManyResponse,
  useMany,
  useDelete,
} from "@refinedev/core";
import { useTable } from "@refinedev/react-table";
import { type ColumnDef, flexRender } from "@tanstack/react-table";

export const BlogPostList = () => {
  const { mutate: deleteBlogPost } = useDelete();
  const columns = React.useMemo<ColumnDef<any>[]>(
    () => [
      {
        id: "id",
        accessorKey: "id",
        header: "Id",
        enableColumnFilter: false,
      },
      {
        id: "title",
        accessorKey: "title",
        header: "Title",
        meta: {
          filterOperator: "contains",
        },
      },
      {
        id: "content",
        accessorKey: "content",
        header: "Content",
        meta: {
          filterOperator: "contains",
        },
      },
      {
        id: "category",
        header: "Category",
        accessorKey: "category.id",
        cell: function render({ getValue, table }) {
          const meta = table.options.meta as {
            categoryData: GetManyResponse;
          };

          try {
            const category = meta.categoryData?.data?.find(
              (item) => item.id === getValue<any>(),
            );

            return category?.title ?? "Loading...";
          } catch (error) {
            return null;
          }
        },
      },
      {
        id: "status",
        accessorKey: "status",
        header: "Status",
      },
      {
        id: "createdAt",
        accessorKey: "createdAt",
        header: "Created At",
        cell: function render({ getValue }) {
          return new Date(getValue<any>()).toLocaleString(undefined, {
            timeZone: "UTC",
          });
        },
      },
      {
        id: "actions",
        accessorKey: "id",
        header: "Actions",
        enableSorting: false,
        enableColumnFilter: false,
        cell: function render({ getValue }) {
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                gap: "4px",
              }}
            >
              <button
                onClick={() => {
                  show("blog_posts", getValue() as string);
                }}
              >
                Show
              </button>
              <button
                onClick={() => {
                  edit("blog_posts", getValue() as string);
                }}
              >
                Edit
              </button>
              <button
                onClick={() => {
                  deleteBlogPost({
                    resource: "blog_posts",
                    id: getValue() as string,
                  });
                }}
              >
                Delete
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
      setOptions,
      getState,
      setPageIndex,
      getCanPreviousPage,
      getPageCount,
      getCanNextPage,
      nextPage,
      previousPage,
      setPageSize,
    },

    refineCore: {
      tableQuery: { data: tableData },
    },
  } = useTable({
    columns,
  });

  const { result: categoryData } = useMany({
    resource: "categories",
    ids: tableData?.data?.map((item) => item?.category?.id) ?? [],
    queryOptions: {
      enabled: !!tableData?.data,
    },
  });

  setOptions((prev) => ({
    ...prev,
    meta: {
      ...prev.meta,
      categoryData,
    },
  }));

  return (
    <div style={{ padding: "16px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h1>Blog Posts</h1>
        <button onClick={() => create("blog_posts")}>Create</button>
      </div>
      <div style={{ maxWidth: "100%", overflowY: "scroll" }}>
        <table>
          <thead>
            {getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    <div onClick={header.column.getToggleSortingHandler()}>
                      {!header.isPlaceholder &&
                        flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                      {{
                        asc: " 🔼",
                        desc: " 🔽",
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                    <div>
                      {header.column.getCanFilter() && (
                        <input
                          value={header.column.getFilterValue() as string}
                          onChange={(e) => {
                            header.column.setFilterValue(e.target.value);
                          }}
                          placeholder={`Search ${header.column.columnDef.header}`}
                        />
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ marginTop: "12px" }}>
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
    </div>
  );
};
