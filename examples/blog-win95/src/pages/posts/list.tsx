import React from "react";
import { useTable } from "@refinedev/react-table";
import { useDelete, useNavigation } from "@refinedev/core";
import { type ColumnDef, flexRender } from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableHeadCell,
  TableDataCell,
  Window,
  WindowHeader,
  WindowContent,
  Button,
  Select,
  NumberInput,
  Hourglass,
  ScrollView,
} from "react95";

import type { IPost } from "../../interfaces";

export const PostList = () => {
  const { edit } = useNavigation();

  const { mutate: deletePost } = useDelete<IPost>();

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
      },
      {
        id: "categoryId",
        header: "Category",
        accessorKey: "categories.title",
      },
      {
        id: "action",
        header: "Action",
        accessorKey: "id",
        cell: function render({ getValue }) {
          return (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: 16,
              }}
            >
              <Button
                size="sm"
                onClick={() => edit("posts", getValue() as number)}
              >
                Edit
              </Button>
              <Button
                size="sm"
                onClick={() => {
                  const id = getValue() as number;

                  const result = window.confirm(
                    "Are you sure you want to delete this post?",
                  );

                  if (result) {
                    deletePost({
                      resource: "posts",
                      id,
                    });
                  }
                }}
              >
                Delete
              </Button>
            </div>
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

      options: { pageCount },

      getState,
      setPageIndex,
      setPageSize,
    },

    refineCore: {
      tableQuery: { isLoading },
    },
  } = useTable<IPost>({
    columns,

    refineCoreProps: {
      meta: {
        select: "*, categories(*)",
      },
    },
  });

  return (
    <>
      <Window style={{ width: "100%" }}>
        <WindowHeader>Posts</WindowHeader>
        <WindowContent>
          <ScrollView style={{ width: "100%", height: "410px" }}>
            <Table>
              <TableHead>
                {getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHeadCell
                        key={header.id}
                        colSpan={header.colSpan}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                      </TableHeadCell>
                    ))}
                  </TableRow>
                ))}
              </TableHead>
              <TableBody>
                {getRowModel().rows.map((row) => {
                  return (
                    <TableRow key={row.id}>
                      {row.getVisibleCells().map((cell) => {
                        return (
                          <TableDataCell key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext(),
                            )}
                          </TableDataCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            {isLoading && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "350px",
                }}
              >
                <Hourglass size={32} />
              </div>
            )}
          </ScrollView>
        </WindowContent>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: 8,
            marginTop: 8,
            alignItems: "flex-end",
          }}
        >
          <Select<number>
            style={{ marginLeft: 8 }}
            value={getState().pagination.pageSize}
            onChange={(option) => {
              setPageSize(option.value);
            }}
            options={pageSizeOptions}
            defaultValue={10}
          />
          <span style={{ marginLeft: 8 }}>
            Page{" "}
            <strong>
              {getState().pagination.pageIndex + 1} of {pageCount}
            </strong>
            <span style={{ marginLeft: 8 }}>
              Go to page:
              <NumberInput
                style={{ marginLeft: 8 }}
                min={1}
                defaultValue={getState().pagination.pageIndex + 1}
                width={130}
                onChange={(value) => {
                  const page = value ? Number(value) - 1 : 0;
                  setPageIndex(page);
                }}
              />
            </span>
          </span>
        </div>
      </Window>
    </>
  );
};

const pageSizeOptions = [
  { value: 10, label: "10" },
  { value: 20, label: "20" },
  { value: 30, label: "30" },
  { value: 40, label: "40" },
];
