import { alpha } from "@mui/material/styles";
import {
  type GetManyResponse,
  useDeleteMany,
  useMany,
  useSelect,
} from "@refinedev/core";
import { DeleteButton, EditButton, List, SaveButton } from "@refinedev/mui";
import { useTable } from "@refinedev/react-table";
import { type ColumnDef, flexRender, type Row } from "@tanstack/react-table";
import React, { useCallback, useEffect } from "react";

import Button from "@mui/material/Button";
import type { CheckboxProps } from "@mui/material/Checkbox";
import Checkbox from "@mui/material/Checkbox";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import { useForm } from "@refinedev/react-hook-form";

import { Controller } from "react-hook-form";

import MDEditor from "@uiw/react-md-editor";

import type { ICategory, IPost } from "../../interfaces";

export const PostList: React.FC = () => {
  const {
    refineCore: { onFinish, id, setId },
    register,
    handleSubmit,
    control,
  } = useForm<IPost>({
    refineCoreProps: {
      resource: "posts",
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
        header: function render({ table }) {
          return (
            <IndeterminateCheckbox
              {...{
                checked: table.getIsAllRowsSelected(),
                indeterminate: table.getIsSomeRowsSelected(),
                onChange: table.getToggleAllRowsSelectedHandler(),
              }}
            />
          );
        },
        cell: function render({ row }) {
          return (
            <Stack direction="row" alignItems="center" flexWrap="nowrap">
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
            </Stack>
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
            <Stack direction="row">
              <EditButton
                onClick={() => {
                  handleEditButtonClick(getValue() as number);
                }}
              >
                Edit
              </EditButton>
              <DeleteButton recordItemId={getValue() as number}>
                Delete
              </DeleteButton>
            </Stack>
          );
        },
      },
    ],
    [],
  );

  function IndeterminateCheckbox({
    indeterminate,
    ...rest
  }: { indeterminate?: boolean } & Omit<CheckboxProps, "inputRef">) {
    const ref = React.useRef<HTMLInputElement>(null);

    useEffect(() => {
      if (typeof indeterminate === "boolean" && ref.current) {
        ref.current.indeterminate = !rest.checked && indeterminate;
      }
    }, [ref, indeterminate]);

    return <Checkbox {...rest} id="row-select" inputRef={ref} />;
  }

  const {
    reactTable: {
      options: {
        state: { pagination, rowSelection },

        pageCount,
      },

      setOptions,
      getColumn,
      getAllColumns,
      getHeaderGroups,
      getRowModel,
      setPageIndex,
      setPageSize,
      getSelectedRowModel,
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
          <TableRow key={`edit-${id}-inputs`}>
            <TableCell>
              <span>{row.getIsExpanded() ? "👇" : "👉"}</span>
            </TableCell>
            <TableCell>
              <span>{id}</span>
            </TableCell>
            <TableCell>
              <TextField
                fullWidth
                id="title"
                type="text"
                defaultValue={title}
                {...register("title", {
                  required: "Title is required",
                })}
              />
            </TableCell>
            <TableCell>
              <TextField
                select
                id="category.id"
                defaultValue={row.original.category.id}
                {...register("category.id", {
                  required: "Category title is required",
                })}
              >
                {options?.map((category) => (
                  <MenuItem
                    defaultValue={row.original.category.id}
                    key={category.value}
                    value={category.value}
                  >
                    {category.label}
                  </MenuItem>
                ))}
              </TextField>
            </TableCell>

            <TableCell>
              <SaveButton type="submit">Save</SaveButton>
              <Button onClick={() => setId(undefined)}>Cancel</Button>
            </TableCell>
          </TableRow>
          <TableRow key={`edit-${id}-mde`}>
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
          </TableRow>
        </>
      );
    },
    [options],
  );

  const EnhancedTableToolbar = (props: {
    numSelected: number;
    onDelete: () => void;
  }) => {
    const { numSelected, onDelete } = props;
    return (
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(numSelected > 0 && {
            bgcolor: (theme) =>
              alpha(
                theme.palette.primary.main,
                theme.palette.action.activatedOpacity,
              ),
          }),
        }}
      >
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected > 0 ? `${numSelected} selected` : "Not selected any row"}
        </Typography>
        {numSelected > 0 && (
          <DeleteButton id="delete-selected" onClick={() => onDelete()} />
        )}
      </Toolbar>
    );
  };

  const titleColumn = getColumn("title");
  const categoryColumn = getColumn("category.id");

  return (
    <List
      title="React Table Usage"
      breadcrumb={false}
      headerButtons={
        <Stack direction="row" spacing={2}>
          <TextField
            label="Search by title"
            id="title"
            type="search"
            value={(titleColumn?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              titleColumn?.setFilterValue(event.target.value)
            }
          />

          <TextField
            select
            id="category"
            label="Category Select"
            defaultValue={"0"}
            onChange={(event) => {
              categoryColumn?.setFilterValue(
                event.target.value === "0"
                  ? undefined
                  : event.target.value.toString(),
              );
            }}
            sx={{ minWidth: 200 }}
          >
            <MenuItem key="All Categories" value={"0"}>
              All Categories
            </MenuItem>
            {options?.map((category) => (
              <MenuItem key={category.value} value={category.value}>
                {category.label}
              </MenuItem>
            ))}
          </TextField>
        </Stack>
      }
    >
      <form onSubmit={handleSubmit(onFinish)}>
        <EnhancedTableToolbar
          numSelected={Object.keys(rowSelection ?? {}).length}
          onDelete={() => {
            deleteSelectedItems(
              getSelectedRowModel().flatRows.map((row) => row.original.id),
            );
          }}
        />
        <TableContainer>
          <Table size="small">
            <TableHead>
              {getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableCell
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                      {header.column.id !== "selection" ? (
                        <TableSortLabel
                          active={header.column.getIsSorted() !== false}
                          direction={
                            header.column.getIsSorted() === false
                              ? undefined
                              : (header.column.getIsSorted() as "asc" | "desc")
                          }
                        />
                      ) : null}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>
            <TableBody>
              {getRowModel().rows.map((row) => {
                if (id === row.original.id) {
                  return renderEditRow(row);
                }
                return (
                  <React.Fragment key={row.id}>
                    <TableRow>
                      {row.getAllCells().map((cell) => {
                        return (
                          <TableCell key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext(),
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>

                    {row.getIsExpanded() ? (
                      <TableRow>
                        <TableCell
                          id="expanded-row"
                          colSpan={row.getVisibleCells().length}
                        >
                          {renderRowSubComponent({
                            row,
                          })}
                        </TableCell>
                      </TableRow>
                    ) : null}
                  </React.Fragment>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          rowsPerPageOptions={[
            5,
            10,
            25,
            {
              label: "All",
              value: tableData?.total ?? 100,
            },
          ]}
          showFirstButton
          showLastButton
          count={pageCount || 0}
          rowsPerPage={pagination?.pageSize || 10}
          page={pagination?.pageIndex || 0}
          onPageChange={(_, newPage: number) => setPageIndex(newPage)}
          onRowsPerPageChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setPageSize(Number.parseInt(event.target.value, 10));
            setPageIndex(0);
          }}
        />
      </form>
    </List>
  );
};
