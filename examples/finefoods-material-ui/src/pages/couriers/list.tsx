import { type PropsWithChildren, useMemo } from "react";
import { useGo, useNavigation, useTranslate } from "@refinedev/core";
import { CreateButton, EditButton, useDataGrid } from "@refinedev/mui";
import { useLocation } from "react-router";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { CourierRating, CourierStatus, RefineListView } from "../../components";
import type { ICourier } from "../../interfaces";

export const CourierList = ({ children }: PropsWithChildren) => {
  const go = useGo();
  const { pathname } = useLocation();
  const { createUrl } = useNavigation();
  const t = useTranslate();

  const { dataGridProps } = useDataGrid<ICourier>({
    pagination: {
      pageSize: 10,
    },
  });

  const columns = useMemo<GridColDef<ICourier>[]>(
    () => [
      {
        field: "id",
        headerName: "ID #",
        width: 64,
        display: "flex",
        renderCell: function render({ row }) {
          return <Typography>#{row.id}</Typography>;
        },
      },
      {
        field: "avatar",
        headerName: t("couriers.fields.avatar.label"),
        width: 64,
        display: "flex",
        renderCell: function render({ row }) {
          return (
            <Avatar
              alt={`${row.name} ${row.surname}`}
              src={row.avatar?.[0]?.url}
              sx={{ width: 32, height: 32 }}
            />
          );
        },
      },
      {
        field: "name",
        width: 188,
        headerName: t("couriers.fields.name.label"),
      },
      {
        field: "licensePlate",
        width: 112,
        headerName: t("couriers.fields.licensePlate.label"),
      },
      {
        field: "gsm",
        width: 132,
        headerName: t("couriers.fields.gsm.label"),
      },
      {
        field: "store",
        minWidth: 156,
        flex: 1,
        headerName: t("couriers.fields.store.label"),
        display: "flex",
        renderCell: function render({ row }) {
          return <Typography>{row.store?.title}</Typography>;
        },
      },
      {
        field: "rating",
        width: 156,
        headerName: t("couriers.fields.rating.label"),
        renderCell: function render({ row }) {
          return <CourierRating courier={row} />;
        },
      },
      {
        field: "status",
        width: 156,
        headerName: t("couriers.fields.status.label"),
        renderCell: function render({ row }) {
          return <CourierStatus value={row?.status} />;
        },
      },
      {
        field: "actions",
        headerName: t("table.actions"),
        type: "actions",
        renderCell: function render({ row }) {
          return (
            <EditButton
              hideText
              recordItemId={row.id}
              svgIconProps={{
                color: "action",
              }}
            />
          );
        },
      },
    ],
    [t],
  );

  return (
    <>
      <RefineListView
        headerButtons={() => [
          <CreateButton
            key="create"
            variant="contained"
            size="medium"
            sx={{ height: "40px" }}
            onClick={() => {
              go({
                to: `${createUrl("couriers")}`,
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
            {t("couriers.actions.add")}
          </CreateButton>,
        ]}
      >
        <DataGrid
          {...dataGridProps}
          columns={columns}
          pageSizeOptions={[10, 20, 50, 100]}
        />
      </RefineListView>
      {children}
    </>
  );
};
