import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { type HttpError, useMany } from "@refinedev/core";
import { EditButton, List, useDataGrid } from "@refinedev/mui";
import { useModalForm } from "@refinedev/react-hook-form";
import React from "react";

import { CreatePostDrawer, EditPostDrawer } from "../../components";
import type { ICategory, IPost, Nullable } from "../../interfaces";

export const PostList: React.FC = () => {
  const { dataGridProps } = useDataGrid<IPost>();

  const categoryIds = dataGridProps.rows.map((item) => item.category.id);
  const {
    result: categoriesData,
    query: { isLoading },
  } = useMany<ICategory>({
    resource: "categories",
    ids: categoryIds,
    queryOptions: {
      enabled: categoryIds.length > 0,
    },
  });

  const createDrawerFormProps = useModalForm<IPost, HttpError, Nullable<IPost>>(
    {
      refineCoreProps: { action: "create" },
      syncWithLocation: true,
    },
  );
  const {
    modal: { show: showCreateDrawer },
  } = createDrawerFormProps;

  const editDrawerFormProps = useModalForm<IPost, HttpError, Nullable<IPost>>({
    refineCoreProps: { action: "edit" },
    syncWithLocation: true,
  });
  const {
    modal: { show: showEditDrawer },
  } = editDrawerFormProps;

  const columns = React.useMemo<GridColDef<IPost>[]>(
    () => [
      {
        field: "id",
        headerName: "ID",
        type: "number",
        width: 50,
      },
      { field: "title", headerName: "Title", minWidth: 400, flex: 1 },
      {
        field: "category.id",
        headerName: "Category",
        type: "number",
        headerAlign: "left",
        align: "left",
        minWidth: 250,
        flex: 0.5,
        display: "flex",
        renderCell: function render({ row }) {
          if (isLoading) {
            return "Loading...";
          }

          const category = categoriesData?.data.find(
            (item) => item.id === row.category.id,
          );
          return category?.title;
        },
      },
      { field: "status", headerName: "Status", minWidth: 120, flex: 0.3 },
      {
        field: "actions",
        headerName: "Actions",
        display: "flex",
        renderCell: function render({ row }) {
          return <EditButton hideText onClick={() => showEditDrawer(row.id)} />;
        },
        align: "center",
        headerAlign: "center",
        minWidth: 80,
      },
    ],
    [categoriesData, isLoading],
  );

  return (
    <>
      <List createButtonProps={{ onClick: () => showCreateDrawer() }}>
        <DataGrid {...dataGridProps} columns={columns} />
      </List>
      <CreatePostDrawer {...createDrawerFormProps} />
      <EditPostDrawer {...editDrawerFormProps} />
    </>
  );
};
