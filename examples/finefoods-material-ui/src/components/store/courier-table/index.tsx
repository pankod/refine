import { useMemo } from "react";
import { useNavigation, useTranslate } from "@refinedev/core";
import { useDataGrid } from "@refinedev/mui";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { ICourier, IStore } from "../../../interfaces";
import { CourierRating, CourierStatus } from "../../courier";

type Props = {
  store?: IStore;
};

export const StoreCourierTable = (props: Props) => {
  const t = useTranslate();
  const { edit } = useNavigation();

  const { dataGridProps } = useDataGrid<ICourier>({
    resource: "couriers",

    filters: {
      permanent: [
        {
          field: "store.id",
          value: props.store?.id,
          operator: "eq",
        },
      ],
    },

    pagination: {
      mode: "off",
    },

    queryOptions: {
      enabled: !!props.store?.id,
    },
  });

  const columns = useMemo<GridColDef<ICourier>[]>(
    () => [
      {
        field: "name",
        headerName: t("couriers.couriers"),
        display: "flex",
        renderCell: function render({ row }) {
          return (
            <Stack alignItems="center" direction="row" spacing={2}>
              <Avatar
                alt={`${row.name} ${row.surname}`}
                src={row.avatar?.[0]?.url}
              />
              <Typography variant="body2">
                {row.name} {row.surname}
              </Typography>
            </Stack>
          );
        },
        flex: 1,
      },
      {
        field: "licensePlate",
        headerName: t("couriers.fields.licensePlate.label"),
      },
      {
        field: "rating",
        headerName: t("couriers.fields.rating.label"),
        width: 172,
        display: "flex",
        renderCell: function render({ row }) {
          return <CourierRating courier={row} />;
        },
      },
      {
        field: "status",
        headerName: t("couriers.fields.status.label"),
        width: 140,
        display: "flex",
        renderCell: function render({ row }) {
          return <CourierStatus value={row.status} />;
        },
      },
    ],
    [t],
  );

  return (
    <DataGrid
      {...dataGridProps}
      columns={columns}
      pageSizeOptions={[10, 20, 50, 100]}
      initialState={{ density: "comfortable" }}
      sx={{
        "& .MuiDataGrid-cell:hover": {
          cursor: "pointer",
        },
      }}
      onRowClick={(row) => {
        edit("couriers", row.id);
      }}
    />
  );
};
