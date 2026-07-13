import React, { useMemo } from "react";
import {
  type HttpError,
  useExport,
  useNavigation,
  useTranslate,
  useUpdate,
} from "@refinedev/core";
import {
  DateField,
  ExportButton,
  NumberField,
  useDataGrid,
} from "@refinedev/mui";
import {
  DataGrid,
  GridActionsCellItem,
  type GridColDef,
} from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { OrderStatus, OrderTableColumnProducts } from "../../components/order";
import type { IOrder, IOrderFilterVariables } from "../../interfaces";
import { RefineListView } from "../../components";

export const OrderList = () => {
  const t = useTranslate();
  const { mutate } = useUpdate({ resource: "orders" });

  const { dataGridProps, filters, sorters } = useDataGrid<
    IOrder,
    HttpError,
    IOrderFilterVariables
  >({
    pagination: {
      pageSize: 10,
    },
  });

  const columns = useMemo<GridColDef<IOrder>[]>(
    () => [
      {
        field: "orderNumber",
        headerName: t("orders.fields.order"),
        description: t("orders.fields.order"),
        display: "flex",
        renderCell: function render({ row }) {
          return <Typography>#{row.orderNumber}</Typography>;
        },
      },
      {
        field: "status.text",
        headerName: t("orders.fields.status"),
        width: 124,
        display: "flex",
        renderCell: function render({ row }) {
          return <OrderStatus status={row.status.text} />;
        },
      },
      {
        field: "products",
        headerName: t("orders.fields.products"),
        width: 184,
        sortable: false,
        display: "flex",
        renderCell: function render({ row }) {
          return <OrderTableColumnProducts order={row} />;
        },
      },
      {
        field: "amount",
        headerName: t("orders.fields.amount"),
        headerAlign: "center",
        align: "right",
        width: 120,
        display: "flex",
        renderCell: function render({ row }) {
          return (
            <NumberField
              options={{
                currency: "USD",
                style: "currency",
              }}
              value={row.amount}
            />
          );
        },
      },
      {
        field: "store",
        headerName: t("orders.fields.store"),
        width: 154,
        valueGetter: (_, row) => row.store.title,
        sortable: false,
      },
      {
        field: "user.fullName",
        headerName: t("orders.fields.customer"),
        width: 154,
        valueGetter: (_, row) => row.user.fullName,
        sortable: false,
      },

      {
        field: "createdAt",
        headerName: t("orders.fields.createdAt"),
        width: 200,
        display: "flex",
        renderCell: function render({ row }) {
          return <DateField value={row.createdAt} format="LL / hh:mm a" />;
        },
      },
      {
        field: "actions",
        type: "actions",
        headerName: t("table.actions"),
        sortable: false,
        headerAlign: "right",
        align: "right",
        getActions: ({ id }) => [
          <GridActionsCellItem
            key={1}
            icon={<CheckOutlinedIcon color="success" />}
            label={t("buttons.accept")}
            showInMenu
            onClick={() => {
              mutate({
                id,
                values: {
                  status: {
                    id: 2,
                    text: "Ready",
                  },
                },
              });
            }}
          />,
          <GridActionsCellItem
            key={2}
            icon={<CloseOutlinedIcon color="error" />}
            label={t("buttons.reject")}
            showInMenu
            onClick={() =>
              mutate({
                id,
                values: {
                  status: {
                    id: 5,
                    text: "Cancelled",
                  },
                },
              })
            }
          />,
        ],
      },
    ],
    [t, mutate],
  );

  const { show } = useNavigation();

  const { isLoading, triggerExport } = useExport<IOrder>({
    sorters,
    filters,
    pageSize: 50,
    maxItemCount: 50,
    mapData: (item) => {
      return {
        id: item.id,
        amount: item.amount,
        orderNumber: item.orderNumber,
        status: item.status.text,
        store: item.store.title,
        user: item.user.firstName,
      };
    },
  });

  return (
    <RefineListView
      headerButtons={
        <ExportButton
          variant="outlined"
          onClick={triggerExport}
          loading={isLoading}
          size="medium"
          sx={{ height: "40px" }}
        />
      }
    >
      <DataGrid
        {...dataGridProps}
        columns={columns}
        onRowClick={({ id }) => {
          show("orders", id);
        }}
        pageSizeOptions={[10, 20, 50, 100]}
        sx={{
          "& .MuiDataGrid-row": {
            cursor: "pointer",
          },
        }}
      />
    </RefineListView>
  );
};
