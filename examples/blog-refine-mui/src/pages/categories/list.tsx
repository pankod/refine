import React from "react";
import {
  useDataGrid,
  EditButton,
  ShowButton,
  DeleteButton,
  List,
} from "@refinedev/mui";

import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { useTranslate } from "@refinedev/core";

export const CategoryList = () => {
  const translate = useTranslate();
  const { dataGridProps } = useDataGrid();

  const columns = React.useMemo<GridColDef[]>(
    () => [
      {
        field: "id",
        headerName: translate("categories.fields.id"),
        width: 200,
      },
      {
        field: "title",
        headerName: translate("categories.fields.title"),
        flex: 1,
      },
      {
        field: "actions",
        headerName: translate("table.actions"),
        sortable: false,
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
        flex: 1,
      },
    ],
    [translate],
  );

  return (
    <List>
      <DataGrid {...dataGridProps} columns={columns} />
    </List>
  );
};
