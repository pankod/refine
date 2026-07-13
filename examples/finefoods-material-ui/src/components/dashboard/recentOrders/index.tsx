import React, { useEffect, useMemo } from "react";
import {
  UpdatePasswordFormTypes,
  useNavigation,
  useTranslate,
  useUpdate,
  useUpdatePassword,
} from "@refinedev/core";
import { NumberField, useDataGrid } from "@refinedev/mui";
import CheckOutlined from "@mui/icons-material/CheckOutlined";
import CloseOutlined from "@mui/icons-material/CloseOutlined";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {
  DataGrid,
  GridActionsCellItem,
  type GridColDef,
} from "@mui/x-data-grid";
import type { IOrder } from "../../../interfaces";
import { getUniqueListWithCount } from "../../../utils";

export const RecentOrders: React.FC = () => {
  const t = useTranslate();
  const { show } = useNavigation();
  const { mutate } = useUpdate({
    resource: "orders",
  });
  const { mutate: updatePassword } =
    useUpdatePassword<Record<string, string>>();

  useEffect(() => {
    updatePassword({
      redirectPath: "/custom-url",
      query: "?foo=bar",
    });
  }, [updatePassword]);

  const { dataGridProps } = useDataGrid<IOrder>({
    resource: "orders",
    syncWithLocation: false,

    pagination: {
      pageSize: 10,
    },

    filters: {
      permanent: [
        {
          field: "status.text",
          operator: "eq",
          value: "Pending",
        },
      ],
    },

    sorters: {
      initial: [
        {
          field: "createdAt",
          order: "desc",
        },
      ],
    },
  });

  const columns = useMemo<GridColDef<IOrder>[]>(
    () => [
      {
        field: "orderNumber",
        display: "flex",
        renderCell: function render({ row }) {
          return <Typography>#{row.orderNumber}</Typography>;
        },
        width: 88,
      },
      {
        field: "user",
        width: 220,
        display: "flex",
        renderCell: function render({ row }) {
          return (
            <Stack spacing="4px">
              <Typography>{row.user.fullName}</Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{
                  whiteSpace: "pre-wrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: "2",
                  WebkitBoxOrient: "vertical",
                  minWidth: "100px",
                }}
              >
                {row.user.addresses[0].text}
              </Typography>
            </Stack>
          );
        },
      },
      {
        field: "products",
        flex: 1,
        display: "flex",
        renderCell: function render({ row }) {
          const products = getUniqueListWithCount({
            list: row.products,
            field: "id",
          });
          return (
            <Stack spacing={1}>
              {products.map((product) => (
                <Typography key={product.id} whiteSpace="nowrap">
                  {product.name}
                  <Typography
                    component="span"
                    color="GrayText"
                    sx={{ ml: "4px" }}
                  >
                    x{product.count}
                  </Typography>
                </Typography>
              ))}
            </Stack>
          );
        },
      },
      {
        field: "amount",
        align: "right",
        width: 80,
        display: "flex",
        renderCell: function render({ row }) {
          return (
            <NumberField
              options={{
                currency: "USD",
                style: "currency",
                notation: "standard",
              }}
              value={row.amount}
            />
          );
        },
      },
      {
        field: "actions",
        type: "actions",
        width: 80,
        getActions: ({ id }) => [
          <GridActionsCellItem
            key={1}
            icon={<CheckOutlined color="success" />}
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
            icon={<CloseOutlined color="error" />}
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

  return (
    <DataGrid
      {...dataGridProps}
      onRowClick={(row) => show("orders", row.id)}
      columns={columns}
      columnHeaderHeight={0}
      pageSizeOptions={[10, 25, 50, 100]}
      sx={{
        height: "100%",
        border: "none",
        "& .MuiDataGrid-row": {
          cursor: "pointer",
          maxHeight: "max-content !important",
          minHeight: "max-content !important",
        },
        "& .MuiDataGrid-cell": {
          maxHeight: "max-content !important",
          minHeight: "max-content !important",
          padding: "16px",
          alignItems: "flex-start",
        },
      }}
    />
  );
};
