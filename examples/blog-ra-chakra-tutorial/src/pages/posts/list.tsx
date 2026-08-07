import React from "react";
import { useTable } from "@refinedev/react-table";
import {
  List,
  ShowButton,
  EditButton,
  DateField,
  DeleteButton,
} from "@refinedev/chakra-ui";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  HStack,
} from "@chakra-ui/react";
import { type ColumnDef, flexRender } from "@tanstack/react-table";
import { Pagination } from "../../components/pagination";
import { ColumnSorter } from "../../components/column-sorter";
import { ColumnFilter } from "../../components/column-filter";
import type { IPost } from "../../interfaces";

export const PostList = () => {
  const columns = React.useMemo<ColumnDef<IPost>[]>(
    () => [
      {
        id: "id",
        accessorKey: "id",
        header: "Id",
        meta: {
          filterOperator: "eq",
        },
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
        id: "category",
        accessorKey: "category.title",
        header: "Category",
        cell: function render({ getValue }) {
          return getValue();
        },
        meta: {
          filterOperator: "contains",
        },
      },
      {
        id: "createdAt",
        accessorKey: "createdAt",
        header: "Created At",
        cell: function render({ getValue }) {
          return <DateField value={getValue() as string} format="LLL" />;
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
            <HStack>
              <ShowButton hideText recordItemId={getValue() as string} />
              <EditButton hideText recordItemId={getValue() as string} />
              <DeleteButton hideText recordItemId={getValue() as string} />
            </HStack>
          );
        },
      },
    ],
    [],
  );

  const {
    reactTable: { getHeaderGroups, getRowModel, setOptions },

    refineCore: { currentPage: current, pageCount, setCurrentPage: setCurrent },
  } = useTable({
    columns,

    refineCoreProps: {
      meta: {
        populate: ["category"],
      },
    },
  });

  setOptions((prev) => ({
    ...prev,
    meta: {
      ...prev.meta,
    },
  }));

  return (
    <List>
      <TableContainer whiteSpace="pre-line">
        <Table variant="simple">
          <Thead>
            {getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Th key={header.id}>
                    {!header.isPlaceholder &&
                      flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                    <ColumnSorter column={header.column} />
                    <ColumnFilter column={header.column} />
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {getRowModel().rows.map((row) => (
              <Tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <Td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Pagination
        current={current}
        pageCount={pageCount}
        setCurrent={setCurrent}
      />
    </List>
  );
};
