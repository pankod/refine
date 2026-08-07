import { List, useDataGrid } from "@refinedev/mui";
import React from "react";

import { DataGrid, type GridColDef } from "@mui/x-data-grid";

import type { ICommit } from "../../interfaces";

export const PostList: React.FC = () => {
  const [next, setNext] = React.useState<string | undefined>(undefined);
  const { dataGridProps, tableQuery: tableQueryResult } = useDataGrid<ICommit>({
    meta: {
      cursor: {
        next,
      },
    },

    pagination: {
      pageSize: 5,
    },
  });

  const { data } = tableQueryResult;

  const columns: GridColDef<ICommit>[] = [
    {
      field: "sha",
      headerName: "SHA",
      type: "string",
      width: 100,
      filterable: false,
      sortable: false,
    },
    {
      field: "message",
      headerName: "Message",
      minWidth: 400,
      flex: 1,
      filterable: false,
      sortable: false,
      display: "flex",
      renderCell: ({ row }) => {
        return row.commit.message;
      },
    },
    {
      field: "author",
      headerName: "Author",
      minWidth: 140,
      flex: 1,
      filterable: false,
      sortable: false,
      display: "flex",
      renderCell: ({ row }) => {
        return row.commit.author.name;
      },
    },
    {
      field: "date",
      headerName: "Date",
      minWidth: 140,
      flex: 1,
      filterable: false,
      sortable: false,
      display: "flex",
      renderCell: ({ row }) => {
        return row.commit.author.date;
      },
    },
  ];

  return (
    <List>
      <DataGrid
        getRowId={(row) => row.sha}
        {...dataGridProps}
        onPaginationModelChange={(model, details) => {
          const lastRow = data?.data[data.data.length - 1];
          const next = lastRow?.commit.committer.date;
          if (next) {
            setNext(next);
          }
          dataGridProps.onPaginationModelChange?.(model, details);
        }}
        columns={columns}
      />
    </List>
  );
};
