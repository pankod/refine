import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { useMany } from "@refinedev/core";
import {
  DateField,
  DeleteButton,
  EditButton,
  List,
  MarkdownField,
  ShowButton,
  useDataGrid,
} from "@refinedev/mui";
import React from "react";

export const BlogPostList = () => {
  const { dataGridProps } = useDataGrid();

  const {
    result: categoryData,
    query: { isLoading: categoryIsLoading },
  } = useMany({
    resource: "categories",
    ids: dataGridProps?.rows?.map((item: any) => item?.category?.id) ?? [],
    queryOptions: {
      enabled: !!dataGridProps?.rows,
    },
  });

  const columns = React.useMemo<GridColDef<any>[]>(
    () => [
      {
        field: "id",
        headerName: "Id",
        type: "number",
        minWidth: 50,
        filterable: false,
      },
      {
        field: "title",
        headerName: "Title",
        minWidth: 200,
      },
      {
        field: "content",
        headerName: "Content",
        minWidth: 250,
        display: "flex",
        renderCell: function render({ value }) {
          return <MarkdownField value={`${(value ?? "").slice(0, 80)}...`} />;
        },
      },
      {
        field: "category",
        headerName: "Category",
        valueGetter: (_, row) => {
          const value = row?.category?.id;

          return value;
        },
        minWidth: 300,
        display: "flex",
        renderCell: function render({ value }) {
          return categoryIsLoading ? (
            <>Loading...</>
          ) : (
            categoryData?.data?.find((item) => item.id === value)?.title
          );
        },
      },
      {
        field: "status",
        headerName: "Status",
        minWidth: 200,
      },
      {
        field: "createdAt",
        headerName: "Created At",
        minWidth: 250,
        display: "flex",
        renderCell: function render({ value }) {
          return <DateField value={value} />;
        },
      },
      {
        field: "actions",
        headerName: "Actions",
        display: "flex",
        renderCell: function render({ row }) {
          return (
            <>
              <EditButton hideText recordItemId={row.id} />
              <ShowButton hideText recordItemId={row.id} />
              <DeleteButton hideText recordItemId={row.id} />
            </>
          );
        },
        align: "center",
        headerAlign: "center",
        minWidth: 80,
        filterable: false,
        sortable: false,
      },
    ],
    [categoryData?.data],
  );

  return (
    <List>
      <DataGrid {...dataGridProps} columns={columns} />
    </List>
  );
};
