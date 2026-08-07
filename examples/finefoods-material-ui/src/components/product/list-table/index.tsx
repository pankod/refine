import { useMemo } from "react";
import { useGo, useNavigation, useTranslate } from "@refinedev/core";
import { NumberField, type UseDataGridReturnType } from "@refinedev/mui";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import type { ICategory, IProduct } from "../../../interfaces";
import { useLocation } from "react-router";
import IconButton from "@mui/material/IconButton";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { ProductStatus } from "../status";

type Props = {
  categories: ICategory[];
} & UseDataGridReturnType<IProduct>;

export const ProductListTable = (props: Props) => {
  const go = useGo();
  const { pathname } = useLocation();
  const { editUrl } = useNavigation();
  const t = useTranslate();

  const columns = useMemo<GridColDef<IProduct>[]>(
    () => [
      {
        field: "id",
        headerName: "ID #",
        description: "ID #",
        width: 52,
        display: "flex",
        renderCell: function render({ row }) {
          return <Typography>#{row.id}</Typography>;
        },
      },
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
        width: 200,
        sortable: false,
      },
      {
        field: "description",
        headerName: t("products.fields.description"),
        minWidth: 320,
        flex: 1,
        sortable: false,
      },
      {
        field: "price",
        type: "number",
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
        field: "category.title",
        headerName: t("products.fields.category"),
        minWidth: 160,
        sortable: false,
        filterable: false,
        display: "flex",
        renderCell: function render({ row }) {
          const category = props.categories.find(
            (category) => category.id === row.category.id,
          );

          return <Typography>{category?.title}</Typography>;
        },
      },
      {
        field: "isActive",
        headerName: t("products.fields.isActive.label"),
        minWidth: 136,
        display: "flex",
        renderCell: function render({ row }) {
          return <ProductStatus value={row.isActive} />;
        },
      },
      {
        field: "actions",
        headerName: t("table.actions"),
        width: 80,
        align: "center",
        headerAlign: "center",
        display: "flex",
        renderCell: function render({ row }) {
          return (
            <IconButton
              sx={{
                color: "text.secondary",
              }}
              onClick={() => {
                return go({
                  to: `${editUrl("products", row.id)}`,
                  query: {
                    to: pathname,
                  },
                  options: {
                    keepQuery: true,
                  },
                  type: "replace",
                });
              }}
            >
              <EditOutlinedIcon />
            </IconButton>
          );
        },
      },
    ],
    [t, props.categories, editUrl, go, pathname],
  );

  return (
    <DataGrid
      {...props.dataGridProps}
      columns={columns}
      pageSizeOptions={[12, 24, 48, 96]}
    />
  );
};
