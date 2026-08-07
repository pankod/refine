import { type BaseOption, useSelect } from "@refinedev/core";
import { List, useDataGrid } from "@refinedev/mui";
import React from "react";

import {
  DataGrid,
  GridActionsCellItem,
  type GridColDef,
  GridToolbar,
} from "@mui/x-data-grid";

import type { ICategory, IPost } from "../../interfaces";

export const BasicDataGrid: React.FC = () => {
  const { dataGridProps } = useDataGrid<IPost>();

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
        width: 70,
      },
      { field: "title", headerName: "Title", flex: 1, minWidth: 350 },
      {
        field: "category.id",
        headerName: "Category",
        flex: 1,
        type: "singleSelect",
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
        flex: 1,
        type: "singleSelect",
        valueOptions: ["draft", "published", "rejected"],
      },
      {
        field: "actions",
        type: "actions",
        headerName: "Actions",
        getActions: () => [
          <GridActionsCellItem key={1} label="Delete" showInMenu />,
          <GridActionsCellItem key={2} label="Print" showInMenu />,
        ],
      },
    ],
    [options, isLoading],
  );

  return (
    <List title="DataGrid Usage" headerProps={{ sx: { py: 0 } }}>
      <DataGrid
        {...dataGridProps}
        columns={columns}
        slots={{
          toolbar: GridToolbar,
        }}
      />
    </List>
  );
};
