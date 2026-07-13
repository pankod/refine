import { type BaseOption, useSelect, useUpdateMany } from "@refinedev/core";
import { List, useDataGrid } from "@refinedev/mui";
import React from "react";

import Button from "@mui/material/Button";
import {
  DataGrid,
  type GridColDef,
  type GridRowSelectionModel,
} from "@mui/x-data-grid";

import type { ICategory, IPost } from "../../interfaces";

export const PostList: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] =
    React.useState<GridRowSelectionModel>({ type: "include", ids: new Set() });
  const selectedIds = Array.from(selectedRowKeys.ids);
  const hasSelected = selectedIds.length > 0;

  const { mutate } = useUpdateMany<IPost>({
    resource: "posts",
    ids: selectedIds.map(String),
    mutationOptions: {
      onSuccess: () => {
        setSelectedRowKeys({ type: "include", ids: new Set() });
      },
    },
  });

  const updateSelectedItems = () => {
    mutate({
      values: {
        status: "approved",
      },
    });
  };

  const { dataGridProps } = useDataGrid<IPost>({
    pagination: {
      pageSize: 10,
    },
  });

  const {
    options,
    query: { isLoading },
  } = useSelect<ICategory>({
    resource: "categories",

    pagination: {
      mode: "server",
    },
  });

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
        type: "singleSelect",
        headerAlign: "left",
        align: "left",
        minWidth: 250,
        flex: 0.5,
        valueOptions: options,
        display: "flex",
        renderCell: function render({ row }) {
          if (isLoading) {
            return "Loading...";
          }

          const category = options.find(
            (item) => item.value.toString() === row.category.id.toString(),
          );
          return category?.label;
        },
      },
      {
        field: "status",
        headerName: "Status",
        minWidth: 120,
        flex: 0.3,
        type: "singleSelect",
        valueOptions: ["draft", "published", "rejected"],
      },
    ],
    [options, isLoading],
  );

  return (
    <List
      wrapperProps={{ sx: { paddingX: { xs: 2, md: 0 } } }}
      headerButtons={
        <Button
          id="update-selected"
          onClick={() => updateSelectedItems()}
          disabled={!hasSelected}
          size="small"
          variant="contained"
        >
          Update Status to Approved
        </Button>
      }
    >
      <DataGrid
        {...dataGridProps}
        columns={columns}
        checkboxSelection
        onRowSelectionModelChange={(newSelectionModel) => {
          setSelectedRowKeys(newSelectionModel);
        }}
        pageSizeOptions={[10, 20, 50, 100]}
        rowSelectionModel={selectedRowKeys}
      />
    </List>
  );
};
