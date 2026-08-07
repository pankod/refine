import React from "react";
import {
  useDataGrid,
  EditButton,
  ShowButton,
  DeleteButton,
  List,
  MarkdownField,
} from "@refinedev/mui";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";

import { useTranslate, useMany } from "@refinedev/core";

export const ProductList = () => {
  const translate = useTranslate();
  const { dataGridProps } = useDataGrid();

  const {
    result: categoryData,
    query: { isLoading: categoryIsLoading },
  } = useMany({
    resource: "categories",
    ids: dataGridProps?.rows?.map((item: any) => item?.category?.id) ?? [],
    queryOptions: {
      enabled: !!dataGridProps?.rows,
    },
  });

  const formatCurrency = Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
  });

  const columns = React.useMemo<GridColDef[]>(
    () => [
      {
        field: "id",
        headerName: translate("id"),
        minWidth: 50,
      },
      {
        field: "name",
        flex: 1,
        headerName: translate("Name"),
        minWidth: 200,
      },
      {
        field: "price",
        flex: 0.5,
        headerName: translate("Price"),
        display: "flex",
        renderCell: function render({ value }) {
          return formatCurrency.format(value);
        },
      },
      {
        field: "category",
        flex: 0.5,
        headerName: translate("Category"),
        valueGetter: (_, row) => {
          const value = row?.category?.id;

          return value;
        },
        display: "flex",
        renderCell: function render({ value }) {
          return categoryIsLoading ? (
            <>Loading...</>
          ) : (
            categoryData?.data?.find((item) => item.id === value)?.title
          );
        },
      },
      {
        field: "description",
        flex: 1,
        headerName: translate("Description"),
        minWidth: 500,
        display: "flex",
        renderCell: function render({ value }) {
          return <MarkdownField value={`${(value ?? "").slice(0, 80)}...`} />;
        },
      },
      {
        field: "actions",
        headerName: translate("table.actions"),
        sortable: false,
        display: "flex",
        renderCell: function render({ row }) {
          return (
            <>
              <EditButton hideText recordItemId={row.id} />
              <ShowButton hideText recordItemId={row.id} />
              <DeleteButton hideText recordItemId={row.id} />
            </>
          );
        },
        align: "center",
        headerAlign: "center",
        flex: 1,
      },
    ],
    [translate, categoryData?.data],
  );

  return (
    <List>
      <DataGrid {...dataGridProps} columns={columns} />
    </List>
  );
};
