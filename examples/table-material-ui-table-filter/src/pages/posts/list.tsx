import {
  type CrudFilters,
  getDefaultFilter,
  type HttpError,
  useMany,
} from "@refinedev/core";
import { List, TagField, useAutocomplete, useDataGrid } from "@refinedev/mui";
import React, { type ComponentProps, useMemo } from "react";

import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid2";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";

import SearchOutlined from "@mui/icons-material/SearchOutlined";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { useForm } from "@refinedev/react-hook-form";

import { Controller } from "react-hook-form";

import type {
  ICategory,
  IPost,
  IPostFilterVariables,
  IStatus,
  Nullable,
} from "../../interfaces";

export const PostList: React.FC = () => {
  const { dataGridProps, filters, search } = useDataGrid<
    IPost,
    HttpError,
    Nullable<IPostFilterVariables>
  >({
    onSearch: (params) => {
      const filters: CrudFilters = [];
      const { q, category, status } = params;

      filters.push(
        {
          field: "q",
          operator: "eq",
          value: q,
        },
        {
          field: "category.id",
          operator: "eq",
          value: category !== "" ? category : undefined,
        },
        {
          field: "status",
          operator: "eq",
          value: status ? status : undefined,
        },
      );

      return filters;
    },

    pagination: {
      pageSize: 10,
    },
  });

  const categoryIds = dataGridProps.rows.map((item) => item.category.id);
  const {
    result: categoriesData,
    query: { isLoading },
  } = useMany<ICategory>({
    resource: "categories",
    ids: categoryIds,
    queryOptions: {
      enabled: categoryIds.length > 0,
    },
  });

  const columns = useMemo<GridColDef<IPost>[]>(
    () => [
      {
        field: "id",
        headerName: "ID",
        type: "number",
        width: 50,
      },
      { field: "title", headerName: "Title", minWidth: 400, flex: 1 },
      {
        field: "status",
        headerName: "Status",
        display: "flex",
        renderCell: function render({ row }) {
          let color: ComponentProps<typeof TagField>["color"];
          switch (row.status) {
            case "published":
              color = "success";
              break;
            case "rejected":
              color = "error";
              break;
            case "draft":
              color = "info";
              break;
            default:
              color = "default";
              break;
          }
          return <TagField value={row.status} color={color} />;
        },
        minWidth: 120,
        flex: 0.3,
      },
      {
        field: "category.id",
        headerName: "Category",
        type: "number",
        headerAlign: "left",
        align: "left",
        minWidth: 250,
        flex: 0.5,
        display: "flex",
        renderCell: function render({ row }) {
          if (isLoading) {
            return "Loading...";
          }

          const category = categoriesData?.data.find(
            (item) => item.id === row.category.id,
          );
          return category?.title;
        },
      },
    ],
    [categoriesData, isLoading],
  );

  const { control, register, handleSubmit } = useForm<
    IPost,
    HttpError,
    Nullable<IPostFilterVariables>
  >({
    defaultValues: {
      q: getDefaultFilter("q", filters, "eq"),
      status: getDefaultFilter("status", filters, "eq"),
      category: getDefaultFilter("category.id", filters, "eq"),
    },
  });

  const { autocompleteProps } = useAutocomplete({
    resource: "categories",
    defaultValue: getDefaultFilter("category.id", filters, "eq"),
  });

  return (
    <Grid container spacing={2}>
      <Grid
        size={{
          xs: 12,
          lg: 3,
        }}
      >
        <Card sx={{ paddingX: { xs: 2, md: 0 } }}>
          <CardHeader title="Filters" />
          <CardContent sx={{ pt: 0 }}>
            <Box
              component="form"
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
              autoComplete="off"
              onSubmit={handleSubmit(search)}
            >
              <TextField
                {...register("q")}
                id="q"
                label="Search"
                placeholder="ID, Title, Content, etc."
                margin="normal"
                fullWidth
                autoFocus
                size="small"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchOutlined />
                      </InputAdornment>
                    ),
                  },
                }}
              />

              <Controller
                control={control}
                name="status"
                render={({ field }) => (
                  <Autocomplete<IStatus>
                    id="status"
                    options={["published", "draft", "rejected"]}
                    {...field}
                    onChange={(_, value) => {
                      field.onChange(value);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Status"
                        placeholder="Post Status"
                        margin="normal"
                        variant="outlined"
                        size="small"
                      />
                    )}
                  />
                )}
              />
              <Controller
                control={control}
                name="category"
                render={({ field }) => (
                  <Autocomplete
                    id="category"
                    {...autocompleteProps}
                    {...field}
                    onChange={(_, value) => {
                      field.onChange(value?.id ?? value);
                    }}
                    getOptionLabel={(item) => {
                      return item.title
                        ? item.title
                        : autocompleteProps?.options?.find(
                            (p) => p.id.toString() === item.toString(),
                          )?.title ?? "";
                    }}
                    isOptionEqualToValue={(option, value) =>
                      value === undefined ||
                      option?.id?.toString() ===
                        (value?.id ?? value)?.toString()
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Category"
                        placeholder="Search Categories"
                        margin="normal"
                        variant="outlined"
                        size="small"
                      />
                    )}
                  />
                )}
              />
              <br />
              <Button type="submit" variant="contained">
                Submit
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid size={{ xs: 12, lg: 9 }}>
        <List>
          <DataGrid
            {...dataGridProps}
            columns={columns}
            disableColumnFilter={true}
            filterModel={undefined}
            pageSizeOptions={[10, 20, 50, 100]}
          />
        </List>
      </Grid>
    </Grid>
  );
};
