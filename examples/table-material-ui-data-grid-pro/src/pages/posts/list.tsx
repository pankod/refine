import React from "react";
import { useSelect } from "@refinedev/core";
import { List, useDataGrid } from "@refinedev/mui";
import { Box } from "@mui/material";
import { DataGridPro, type GridColDef } from "@mui/x-data-grid-pro";

import type { ICategory, IPost } from "../../interfaces";

export const PostList: React.FC = () => {
  const { dataGridProps } = useDataGrid<IPost>({
    syncWithLocation: true,

    pagination: {
      mode: "off",
    },
  });

  const {
    options,
    query: { isLoading },
  } = useSelect<ICategory>({
    resource: "categories",

    pagination: {
      mode: "off",
    },
  });

  const columns = React.useMemo<GridColDef<IPost>[]>(
    () => [
      {
        field: "id",
        headerName: "ID",
        type: "number",
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
        renderCell: function render({ row }: any) {
          if (isLoading) {
            return "Loading...";
          }

          const category = options.find(
            (item: any) =>
              item.value?.toString() === row.category?.id?.toString(),
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
      <Box sx={{ height: 520, width: "100%" }}>
        <DataGridPro
          {...dataGridProps}
          columns={columns}
          pageSizeOptions={[10, 20, 30, 50, 100]}
        />
      </Box>
    </List>
  );
};
