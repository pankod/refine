import React from "react";
import { useTable } from "@refinedev/react-table";
import { type ColumnDef, flexRender } from "@tanstack/react-table";
import { List, DateField, EditButton, DeleteButton } from "@refinedev/mantine";
import { Table, Pagination, Group } from "@mantine/core";

import type { IPost } from "../../interfaces";

export const PostList: React.FC = () => {
  const columns = React.useMemo<ColumnDef<IPost>[]>(
    () => [
      {
        id: "id",
        accessorKey: "id",
        header: "Id",
      },
      {
        id: "title",
        accessorKey: "title",
        header: "Title",
      },

      {
        id: "createdAt",
        accessorKey: "createdAt",
        header: "Created At",
        cell: function render({ getValue }) {
          return <DateField format="LL" value={getValue<string>()} />;
        },
      },
      {
        id: "category",
        header: "Category",
        accessorFn: ({ category }) => {
          return category?.title;
        },
      },
      {
        id: "actions",
        accessorKey: "id",
        header: "Actions",
        cell: ({ getValue }) => {
          return (
            <Group>
              <EditButton
                hideText
                size="xs"
                recordItemId={getValue() as number}
                variant="subtle"
              />
              <DeleteButton
                hideText
                size="xs"
                recordItemId={getValue() as number}
                variant="subtle"
              />
            </Group>
          );
        },
      },
    ],
    [],
  );

  const {
    reactTable: { getHeaderGroups, getRowModel },

    refineCore: { setCurrentPage: setCurrent, pageCount, currentPage: current },
  } = useTable({
    columns,

    refineCoreProps: {
      meta: {
        populate: ["category"],
      },
    },
  });

  return (
    <List>
      <Table highlightOnHover striped withBorder withColumnBorders>
        <thead>
          {getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th key={header.id}>
                    {!header.isPlaceholder &&
                      flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                  </th>
                );
              })}
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
      </Table>
      <br />
      <Pagination
        position="right"
        total={pageCount}
        page={current}
        onChange={setCurrent}
      />
    </List>
  );
};
