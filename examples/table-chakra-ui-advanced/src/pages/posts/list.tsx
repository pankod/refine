import React, { Fragment, useCallback } from "react";
import { useTable } from "@refinedev/react-table";
import { type ColumnDef, flexRender, type Row } from "@tanstack/react-table";
import {
  type GetManyResponse,
  useDeleteMany,
  useMany,
  useSelect,
} from "@refinedev/core";
import {
  List,
  EditButton,
  DeleteButton,
  DateField,
  SaveButton,
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
  Select,
  Checkbox,
  Button,
  IconButton,
  Input,
  Textarea,
  Box,
} from "@chakra-ui/react";

import { useForm } from "@refinedev/react-hook-form";
import { IconChevronDown, IconChevronRight } from "@tabler/icons-react";

import { ColumnFilter, ColumnSorter } from "../../components/table";
import { Pagination } from "../../components/pagination";
import type { FilterElementProps, ICategory, IPost } from "../../interfaces";

export const PostList: React.FC = () => {
  const {
    refineCore: { onFinish, id, setId },
    saveButtonProps,
    handleSubmit,
    register,
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
        enableColumnFilter: false,
        header: function render({ table }) {
          return (
            <HStack>
              <Checkbox
                checked={table.getIsAllRowsSelected()}
                isIndeterminate={table.getIsSomeRowsSelected()}
                onChange={table.getToggleAllRowsSelectedHandler()}
              />

              {(table.getIsSomeRowsSelected() === true ||
                table.getIsAllRowsSelected() === true) && (
                <Button
                  id="delete-selected"
                  size="xs"
                  color="red"
                  variant="outline"
                  onClick={() =>
                    deleteSelectedItems(
                      table
                        .getSelectedRowModel()
                        .flatRows.map(({ original }) => original.id),
                    )
                  }
                >
                  Delete
                </Button>
              )}
            </HStack>
          );
        },
        cell: function render({ row }) {
          return (
            <HStack spacing="3">
              <Checkbox
                id="row-select"
                isChecked={row.getIsSelected()}
                isIndeterminate={row.getIsSomeSelected()}
                onChange={row.getToggleSelectedHandler()}
              />
              <IconButton
                aria-label="Collapse/Expand"
                size="xs"
                onClick={() => row.toggleExpanded()}
              >
                {row.getIsExpanded() ? (
                  <IconChevronDown size={14} />
                ) : (
                  <IconChevronRight size={14} />
                )}
              </IconButton>
            </HStack>
          );
        },
      },
      {
        id: "id",
        header: "ID",
        accessorKey: "id",
        enableColumnFilter: false,
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
        meta: {
          filterElement: function render(props: FilterElementProps) {
            return (
              <Select
                borderRadius="md"
                size="sm"
                placeholder="All Status"
                {...props}
              >
                <option value="published">published</option>
                <option value="draft">draft</option>
                <option value="rejected">rejected</option>
              </Select>
            );
          },
          filterOperator: "eq",
        },
      },
      {
        id: "category.id",
        header: "Category",
        enableColumnFilter: false,
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
      },
      {
        id: "createdAt",
        header: "Created At",
        accessorKey: "createdAt",
        cell: function render({ getValue }) {
          return <DateField value={getValue() as string} format="LLL" />;
        },
        enableColumnFilter: false,
      },
      {
        id: "actions",
        header: "Actions",
        accessorKey: "id",
        enableColumnFilter: false,
        enableSorting: false,
        cell: function render({ getValue }) {
          return (
            <HStack>
              <EditButton
                hideText
                size="sm"
                onClick={() => {
                  setId(getValue() as number);
                }}
              />
              <DeleteButton
                hideText
                size="sm"
                recordItemId={getValue() as number}
              />
            </HStack>
          );
        },
      },
    ],
    [],
  );

  const {
    reactTable: {
      getAllColumns,
      getHeaderGroups,
      getRowModel,
      setOptions,
      resetRowSelection,
    },

    refineCore: {
      setCurrentPage: setCurrent,
      pageCount,
      currentPage: current,

      tableQuery: { data: tableData },
    },
  } = useTable({
    columns,

    refineCoreProps: {
      sorters: {
        initial: [
          {
            field: "id",
            order: "desc",
          },
        ],
      },
    },
  });

  const categoryIds = tableData?.data?.map((item) => item.category.id) ?? [];
  const { result: categoriesData } = useMany<ICategory>({
    resource: "categories",
    ids: categoryIds,
    queryOptions: {
      enabled: categoryIds.length > 0,
    },
  });

  const { options } = useSelect({
    resource: "categories",
    pagination: {
      pageSize: 9999,
      mode: "server",
    },
  });

  setOptions((prev) => ({
    ...prev,
    meta: {
      ...prev.meta,
      categoriesData,
    },
  }));

  const renderEditRow = useCallback(
    (row: Row<IPost>) => {
      const { id } = row.original;

      return (
        <React.Fragment key={id}>
          <Tr>
            <Td>
              <IconButton
                aria-label="Collapse / Expand"
                onClick={() => row.toggleExpanded()}
              >
                {row.getIsExpanded() ? (
                  <IconChevronDown />
                ) : (
                  <IconChevronRight />
                )}
              </IconButton>
            </Td>
            <Td>{id}</Td>
            <Td>
              <Input id="title-input" {...register("title")} />
            </Td>
            <Td>
              <Select {...register("status")}>
                <option value="published">published</option>
                <option value="draft">draft</option>
                <option value="rejected">rejected</option>
              </Select>
            </Td>
            <Td>
              <Select {...register("category.id")}>
                {options.map((item) => (
                  <option key={item.value} value={Number(item.value)}>
                    {item.label}
                  </option>
                ))}
              </Select>
            </Td>
            <Td>
              <HStack spacing={4}>
                <SaveButton size="sm" type="submit" />
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setId(undefined)}
                >
                  Cancel
                </Button>
              </HStack>
            </Td>
          </Tr>
          <Tr>
            <Td colSpan={getAllColumns().length}>
              <Textarea {...register("content")} />
            </Td>
          </Tr>
        </React.Fragment>
      );
    },
    [options],
  );

  return (
    <form onSubmit={handleSubmit(onFinish)}>
      <List>
        <TableContainer whiteSpace="pre-line">
          <Table variant="simple">
            <Thead>
              {getHeaderGroups().map((headerGroup) => (
                <Tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <Th key={header.id}>
                      {!header.isPlaceholder && (
                        <HStack spacing="2">
                          <Box>
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                          </Box>
                          <HStack spacing="2">
                            <ColumnSorter column={header.column} />
                            <ColumnFilter column={header.column} />
                          </HStack>
                        </HStack>
                      )}
                    </Th>
                  ))}
                </Tr>
              ))}
            </Thead>
            <Tbody>
              {getRowModel().rows.map((row) => {
                if (id === (row.original as IPost).id) {
                  return renderEditRow(row);
                }
                return (
                  <Fragment key={row.id}>
                    <Tr>
                      {row.getVisibleCells().map((cell) => {
                        return (
                          <Td key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext(),
                            )}
                          </Td>
                        );
                      })}
                    </Tr>

                    {row.getIsExpanded() && (
                      <Tr id="expanded-row">
                        <Td colSpan={row.getVisibleCells().length}>
                          <Textarea readOnly value={row.original.content} />
                        </Td>
                      </Tr>
                    )}
                  </Fragment>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
        <Pagination
          current={current}
          pageCount={pageCount}
          setCurrent={setCurrent}
        />
      </List>
    </form>
  );
};
