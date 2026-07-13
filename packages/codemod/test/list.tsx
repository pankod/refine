import React from "react";
import { useOne } from "@pankod/refine-core";
import {
  useDataGrid,
  DataGrid,
  type GridColumns,
  List,
  EditButton,
} from "@pankod/refine-mui";

import type { ICategory, IPost } from "interfaces";

export const PostsList: React.FC = () => {
  const columns = React.useMemo<GridColumns<IPost>>(
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
        valueGetter: ({ row }) => {
          const { data } = useOne<ICategory>({
            resource: "categories",
            id: row.category.id,
          });
          return data?.data.title;
        },
      },
      { field: "status", headerName: "Status", minWidth: 120, flex: 0.3 },
      {
        field: "actions",
        headerName: "Actions",
        renderCell: function render({ row }) {
          return <EditButton hideText recordItemId={row.id} />;
        },
        align: "center",
        headerAlign: "center",
        minWidth: 80,
      },
    ],
    [],
  );

  const { dataGridProps } = useDataGrid({
    columns,
  });

  return (
    <List>
      <DataGrid {...dataGridProps} autoHeight />
    </List>
  );
};
