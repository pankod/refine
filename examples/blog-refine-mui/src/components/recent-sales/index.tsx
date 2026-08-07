import React from "react";
import { DataGrid, type GridColTypeDef } from "@mui/x-data-grid";
import { useDataGrid } from "@refinedev/mui";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";

import { getDefaultFilter } from "@refinedev/core";
import type { IOrder, IOrderStatus } from "../../interfaces";

export function RecentSales() {
  const {
    dataGridProps,
    setCurrentPage: setCurrent,
    setFilters,
    filters,
  } = useDataGrid<IOrder>({
    resource: "orders",

    pagination: {
      pageSize: 5,
    },
  });

  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const formatDate = (value: string) => {
    return new Date(value).toLocaleString("en-US", {
      month: "short",
      year: "numeric",
      day: "numeric",
    });
  };

  const getColor = (status: IOrderStatus["text"]) => {
    switch (status) {
      case "Cancelled":
        return "error";

      case "Ready":
        return "success";

      case "On The Way":
        return "info";

      case "Pending":
        return "warning";

      case "Delivered":
        return "secondary";

      default:
        return "primary";
    }
  };

  const columns = React.useMemo<GridColTypeDef<any>[]>(
    () => [
      {
        field: "id",
        headerName: "id",
        width: 70,
      },
      {
        field: "user.fullName",
        headerName: "Ordered By",
        width: 200,
        display: "flex",
        renderCell: ({ row }) => <>{row["user"]["fullName"]}</>,
      },
      {
        field: "amount",
        headerName: "Amount",
        type: "singleSelect",
        width: 150,
        valueFormatter: (value) => currencyFormatter.format(value),
      },
      {
        field: "user.gender",
        headerName: "Gender",
        width: 120,
        display: "flex",
        renderCell: ({ row }) => <>{row["user"]["gender"]}</>,
      },
      {
        field: "user.gsm",
        headerName: "Tel",
        width: 170,
        display: "flex",
        renderCell: ({ row }) => <>{row["user"]["gsm"]}</>,
      },
      {
        field: "status.text",
        headerName: "Status",
        width: 160,
        type: "singleSelect",
        valueOptions: [
          "Cancelled",
          "Ready",
          "On The Way",
          "Pending",
          "Delivered",
        ],
        display: "flex",
        renderCell: ({ row }) => (
          <Chip
            label={row["status"]["text"]}
            color={getColor(row["status"]["text"])}
            variant="outlined"
          />
        ),
      },
      {
        field: "adress.text",
        headerName: "Address",
        width: 350,
        headerAlign: "left",
        display: "flex",
        renderCell: ({ row }) => <>{row["adress"]["text"]}</>,
      },
      {
        field: "createdAt",
        headerName: "Created At",
        width: 200,
        display: "flex",
        renderCell: ({ row }) => <>{formatDate(row["createdAt"])}</>,
      },
    ],
    [],
  );

  return (
    <Card elevation={5}>
      <Stack
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        paddingRight={2}
      >
        <CardHeader title="Recent Sales" />
        <TextField
          value={getDefaultFilter("q", filters, "contains")}
          id="outlined-basic"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (!e.target.value.trim()) {
              setCurrent(1);
              setFilters([], "replace");
              return;
            }

            setCurrent(1);
            setFilters([
              {
                field: "q",
                value: e.target.value,
                operator: "contains",
              },
            ]);
          }}
          size="small"
          placeholder="Keyword Search"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            },
          }}
        />
      </Stack>
      <DataGrid
        {...dataGridProps}
        columns={columns as any}
        sx={{ pl: 3 }}
        pageSizeOptions={[5, 10, 25, 50]}
      />
    </Card>
  );
}
