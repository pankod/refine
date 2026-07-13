import { type BaseOption, useSelect } from "@refinedev/core";
import { List, useDataGrid } from "@refinedev/mui";
import React from "react";

import { DataGrid, type GridColDef } from "@mui/x-data-grid";

import type { ICategory, IPost } from "../../interfaces";

export const PostList: React.FC = () => {
  const { dataGridProps } = useDataGrid<IPost>({
    editable: true,
    syncWithLocation: true,

    pagination: {
      currentPage: 1,
      pageSize: 10,
    },

    filters: {
      initial: [
        {
          field: "status",
          operator: "eq",
          value: "draft",
        },
      ],
    },

    sorters: {
      initial: [
        {
          field: "title",
          order: "asc",
        },
      ],
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
      {
        field: "title",
        headerName: "Title",
        minWidth: 400,
        flex: 1,
        editable: true,
      },
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
    <List>
      <DataGrid
        {...dataGridProps}
        columns={columns}
        pageSizeOptions={[10, 20, 30, 50, 100]}
      />
    </List>
  );
};
