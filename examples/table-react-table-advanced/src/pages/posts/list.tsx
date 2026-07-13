import React, { useCallback, useEffect } from "react";
import {
  type GetManyResponse,
  useDeleteMany,
  useMany,
  useSelect,
} from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";
import { useTable } from "@refinedev/react-table";
import { type ColumnDef, flexRender, type Row } from "@tanstack/react-table";

import MDEditor from "@uiw/react-md-editor";

import type { IPost, ICategory } from "../../interfaces";

export const PostList: React.FC = () => {
  const {
    refineCore: { onFinish, id, setId },
    register,
    handleSubmit,
    control,
  } = useForm<IPost>({
    refineCoreProps: {
      redirect: false,
      action: "edit",
    },
  });

  const { mutate } = useDeleteMany<IPost>();

  const deleteSelectedItems = (ids: number[]) => {
    mutate(
      {
        resource: "posts",
        ids,
      },
      {
        onSuccess: () => {
          resetRowSelection();
        },
      },
    );
  };

  const columns = React.useMemo<ColumnDef<IPost>[]>(
    () => [
      {
        id: "selection",
        accessorKey: "id",
        enableSorting: false,
        header: function render({ table }) {
          return (
            <>
              <IndeterminateCheckbox
                {...{
                  checked: table.getIsAllRowsSelected(),
                  indeterminate: table.getIsSomeRowsSelected(),
                  onChange: table.getToggleAllRowsSelectedHandler(),
                }}
              />{" "}
              {table.getIsSomeRowsSelected() && (
                <button
                  id="delete-selected"
                  type="button"
                  onClick={() =>
                    deleteSelectedItems(
                      table
                        .getSelectedRowModel()
                        .flatRows.map(({ original }) => original.id),
                    )
                  }
                >
                  Delete
                </button>
              )}
            </>
          );
        },
        cell: function render({ row }) {
          return (
            <>
              <IndeterminateCheckbox
                {...{
                  checked: row.getIsSelected(),
                  indeterminate: row.getIsSomeSelected(),
                  onChange: row.getToggleSelectedHandler(),
                }}
              />
              <span id="expand-toggle" onClick={() => row.toggleExpanded()}>
                {row.getIsExpanded() ? "👇" : "👉"}
              </span>
            </>
          );
        },
      },
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
        id: "category.id",
        header: "Category",
        accessorKey: "category.id",
        cell: function render({ getValue, table }) {
          const meta = table.options.meta as {
            categoriesData: GetManyResponse<ICategory>;
          };
          const category = meta.categoriesData?.data.find(
            (item) => item.id === getValue(),
          );
          return category?.title ?? "Loading...";
        },
        meta: {
          filterOperator: "eq",
        },
      },
      {
        id: "actions",
        header: "Actions",
        accessorKey: "id",
        cell: function render({ getValue }) {
          return (
            <div>
              <button
                type="button"
                onClick={() => {
                  handleEditButtonClick(getValue() as number);
                }}
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => deleteSelectedItems([getValue() as number])}
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

  function IndeterminateCheckbox({
    indeterminate,
    ...rest
  }: { indeterminate?: boolean } & React.HTMLProps<HTMLInputElement>) {
    const ref = React.useRef<HTMLInputElement>(null);

    useEffect(() => {
      if (typeof indeterminate === "boolean") {
        if (ref?.current) {
          ref.current.indeterminate = !rest.checked && indeterminate;
        }
      }
    }, [ref, indeterminate]);

    return (
      <input
        type="checkbox"
        ref={ref}
        style={{ cursor: "pointer" }}
        {...rest}
      />
    );
  }

  const {
    reactTable: {
      setOptions,
      getColumn,
      getAllColumns,
      getHeaderGroups,
      getRowModel,
      setPageIndex,
      setPageSize,
      getState,
      getCanPreviousPage,
      getPageCount,
      getCanNextPage,
      nextPage,
      previousPage,
      resetRowSelection,
    },

    refineCore: {
      tableQuery: { data: tableData },
    },
  } = useTable<IPost>({
    columns,
    getRowId: (originalRow) => originalRow.id.toString(),
  });

  const categoryIds = tableData?.data?.map((item) => item.category.id) ?? [];
  const { result: categoriesData } = useMany<ICategory>({
    resource: "categories",
    ids: categoryIds,
    queryOptions: {
      enabled: categoryIds.length > 0,
    },
  });

  setOptions((prev) => ({
    ...prev,
    meta: {
      ...prev.meta,
      categoriesData,
    },
  }));

  const { options } = useSelect<ICategory>({
    resource: "categories",
    defaultValue: categoryIds,

    pagination: {
      mode: "server",
    },
  });

  const renderRowSubComponent = useCallback(
    ({ row }: { row: Row<IPost> }) => (
      <div data-color-mode="light" style={{ padding: "16px" }}>
        <MDEditor.Markdown
          source={row.original.content}
          style={{ whiteSpace: "pre-wrap" }}
        />
      </div>
    ),
    [],
  );

  const handleEditButtonClick = (editId: number) => {
    setId(editId);
  };

  const renderEditRow = useCallback(
    (row: Row<IPost>) => {
      const { id, title, content } = row.original;

      return (
        <>
          <tr key={`edit-${id}-inputs`}>
            <td>
              <div>
                <span onClick={() => row.toggleExpanded()}>
                  {row.getIsExpanded() ? "👇" : "👉"}
                </span>
              </div>
            </td>
            <td>
              <span>{id}</span>
            </td>
            <td>
              <input
                id="title-input"
                type="text"
                defaultValue={title}
                {...register("title", {
                  required: "Title is required",
                })}
              />
            </td>
            <td>
              <select
                id="category-select"
                {...register("category.id", {
                  required: "Category title is required",
                })}
              >
                {options?.map((category) => (
                  <option
                    defaultValue={row.original.category.id}
                    key={category.value}
                    value={category.value}
                  >
                    {category.label}
                  </option>
                ))}
              </select>
            </td>

            <td>
              <button type="submit">Save</button>
              <button onClick={() => setId(undefined)}>Cancel</button>
            </td>
          </tr>
          <tr key={`edit-${id}-mde`}>
            <td colSpan={getAllColumns().length}>
              <Controller
                defaultValue={content}
                control={control}
                name="content"
                rules={{ required: "Content is required" }}
                render={({ field: { onChange, value } }) => (
                  <MDEditor
                    value={value}
                    onChange={onChange}
                    data-color-mode="light"
                  />
                )}
              />
            </td>
          </tr>
        </>
      );
    },
    [options],
  );

  const titleColumn = getColumn("title");
  const categoryColumn = getColumn("category.id");

  return (
    <>
      <div>
        <label htmlFor="title">Title: </label>
        <input
          id="title"
          type="text"
          value={(titleColumn?.getFilterValue() as string) ?? ""}
          onChange={(event) => titleColumn?.setFilterValue(event.target.value)}
        />
        <label htmlFor="Category">Category</label>
        <select
          id="category"
          aria-label="Category select"
          value={(categoryColumn?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            categoryColumn?.setFilterValue(event.target.value)
          }
        >
          <option value={[]}>All Categories</option>
          {options?.map((category) => (
            <option key={category.value} value={category.value || undefined}>
              {category.label}
            </option>
          ))}
        </select>
      </div>
      <form onSubmit={handleSubmit(onFinish)}>
        <table style={{ border: "1px solid black" }}>
          <thead>
            {getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                    {{
                      asc: " 🔼",
                      desc: " 🔽",
                    }[header.column.getIsSorted() as string] ?? null}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {getRowModel().rows.map((row) => {
              if (id === (row.original as IPost).id) {
                return renderEditRow(row);
              }
              return (
                <React.Fragment key={row.id}>
                  <tr>
                    {row.getAllCells().map((cell) => {
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

                  {row.getIsExpanded() ? (
                    <tr id="expanded-row">
                      <td colSpan={row.getVisibleCells().length}>
                        {renderRowSubComponent({
                          row,
                        })}
                      </td>
                    </tr>
                  ) : null}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>

        <div className="pagination">
          <button
            type="button"
            onClick={() => setPageIndex(0)}
            disabled={!getCanPreviousPage()}
          >
            {"<<"}
          </button>{" "}
          <button
            type="button"
            onClick={() => previousPage()}
            disabled={!getCanPreviousPage()}
          >
            {"<"}
          </button>{" "}
          <button
            type="button"
            onClick={() => nextPage()}
            disabled={!getCanNextPage()}
          >
            {">"}
          </button>{" "}
          <button
            type="button"
            onClick={() => setPageIndex(getPageCount() - 1)}
            disabled={!getCanNextPage()}
          >
            {">>"}
          </button>{" "}
          <span>
            Page{" "}
            <strong>
              {getState().pagination.pageIndex + 1} of {getPageCount()}
            </strong>{" "}
          </span>
          <span>
            | Go to page:{" "}
            <input
              type="number"
              defaultValue={getState().pagination.pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                setPageIndex(page);
              }}
              style={{ width: "100px" }}
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
      </form>
    </>
  );
};
