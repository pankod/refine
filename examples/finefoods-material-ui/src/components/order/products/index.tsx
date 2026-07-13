import { useMemo } from "react";
import { NumberField } from "@refinedev/mui";
import { useTranslate } from "@refinedev/core";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import type { IOrder, IProduct } from "../../../interfaces";
import { getUniqueListWithCount } from "../../../utils";

type Props = {
  order?: IOrder;
};

export const OrderProducts = ({ order }: Props) => {
  const t = useTranslate();

  const products = order?.products || [];
  const uniqueProducts = getUniqueListWithCount({
    list: products,
    field: "id",
  });

  const columns = useMemo<GridColDef<IProduct & { count: number }>[]>(
    () => [
      {
        field: "avatar",
        headerName: t("products.fields.images.label"),
        display: "flex",
        renderCell: function render({ row }) {
          return (
            <Avatar
              variant="rounded"
              sx={{
                width: 32,
                height: 32,
              }}
              src={row.images[0]?.thumbnailUrl || row.images[0]?.url}
              alt={row.name}
            />
          );
        },
        width: 64,
        align: "center",
        headerAlign: "center",
        sortable: false,
      },
      {
        field: "name",
        headerName: t("products.fields.name"),
        flex: 1,
        sortable: false,
      },
      {
        field: "count",
        headerName: "Quantity",
        align: "right",
        headerAlign: "right",
        sortable: false,
      },
      {
        field: "price",
        headerName: t("products.fields.price"),
        width: 120,
        sortable: false,
        align: "right",
        headerAlign: "right",
        display: "flex",
        renderCell: function render({ row }) {
          return (
            <NumberField
              value={row.price}
              options={{
                currency: "USD",
                style: "currency",
              }}
            />
          );
        },
      },
      {
        field: "total",
        headerName: "Total",
        sortable: false,
        align: "right",
        headerAlign: "right",
        display: "flex",
        renderCell: function render({ row }) {
          return (
            <NumberField
              value={row.count * row.price}
              options={{ style: "currency", currency: "USD" }}
              style={{
                whiteSpace: "nowrap",
              }}
            />
          );
        },
      },
    ],
    [t],
  );

  return (
    <DataGrid
      rows={uniqueProducts}
      columns={columns}
      slots={{
        footer: () => {
          return (
            <>
              <Divider />
              <Box display="flex" flexDirection="row" py="16px" ml="auto">
                <Typography
                  textAlign={"right"}
                  width={120}
                  fontWeight={500}
                  paddingRight="16px"
                >
                  Total
                </Typography>
                <NumberField
                  width={90}
                  textAlign="right"
                  fontWeight={500}
                  paddingRight="8px"
                  value={uniqueProducts.reduce(
                    (acc, product) => acc + product.count * product.price,
                    0,
                  )}
                  options={{
                    style: "currency",
                    currency: "USD",
                  }}
                />
              </Box>
            </>
          );
        },
      }}
    />
  );
};
