import { useMemo } from "react";
import { useTranslate } from "@refinedev/core";
import { useDataGrid } from "@refinedev/mui";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import Rating from "@mui/material/Rating";
import Chip from "@mui/material/Chip";
import type { ICourier, IReview } from "../../../interfaces";

interface Props {
  courier?: ICourier;
}

export const CourierTableReviews = (props: Props) => {
  const t = useTranslate();

  const { dataGridProps } = useDataGrid({
    resource: "reviews",

    pagination: {
      pageSize: 10,
    },

    filters: {
      permanent: [
        {
          field: "courier.id",
          operator: "eq",
          value: props.courier?.id,
        },
      ],
    },

    queryOptions: {
      enabled: !!props.courier?.id,
    },

    syncWithLocation: false,
  });

  const columns = useMemo<GridColDef<IReview>[]>(
    () => [
      {
        field: "comment",
        headerName: t("reviews.reviews"),
        flex: 1,
        sortable: false,
        filterable: false,
      },
      {
        field: "star",
        headerName: t("reviews.fields.rating"),
        width: 172,
        filterable: false,
        display: "flex",
        renderCell: function render({ row }: { row: IReview }) {
          return (
            <Rating
              name="courier-rating"
              value={row.star || 0}
              precision={0.5}
              readOnly
            />
          );
        },
      },
      {
        field: "orderNumber",
        headerName: t("orders.fields.orderNumber"),
        filterable: false,
        sortable: false,
        display: "flex",
        renderCell: function render({ row }: { row: IReview }) {
          return (
            <Chip
              variant="outlined"
              size="small"
              label={`#${row.order.orderNumber}`}
            />
          );
        },
      },
    ],
    [t],
  );

  return (
    <DataGrid
      {...dataGridProps}
      columns={columns}
      pageSizeOptions={[10, 20, 50]}
    />
  );
};
