import React, { type PropsWithChildren, useState } from "react";
import { useTranslate, useGo, useNavigation, useList } from "@refinedev/core";
import { CreateButton, useDataGrid } from "@refinedev/mui";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import BorderAllOutlinedIcon from "@mui/icons-material/BorderAllOutlined";
import { useLocation } from "react-router";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import {
  ProductListTable,
  ProductListCard,
  RefineListView,
} from "../../components";
import type { ICategory, IProduct } from "../../interfaces";

type View = "table" | "card";

export const ProductList = ({ children }: PropsWithChildren) => {
  const [view, setView] = useState<View>(() => {
    const view = localStorage.getItem("product-view") as View;
    return view || "table";
  });

  const go = useGo();
  const { pathname } = useLocation();
  const { createUrl } = useNavigation();
  const t = useTranslate();

  const dataGrid = useDataGrid<IProduct>({
    resource: "products",
    pagination: {
      pageSize: 12,
    },
  });

  const { result: categoriesData } = useList<ICategory>({
    resource: "categories",
    pagination: {
      mode: "off",
    },
  });
  const categories = categoriesData?.data || [];

  const handleViewChange = (
    _e: React.MouseEvent<HTMLElement>,
    newView: View,
  ) => {
    // remove query params (pagination, filters, etc.) when changing view
    go({
      to: pathname,
      query: {
        view: newView,
      },
      options: {
        keepQuery: false,
      },
      type: "replace",
    });

    setView(newView);
    localStorage.setItem("product-view", newView);
  };

  return (
    <>
      <RefineListView
        headerButtons={(props) => [
          <ToggleButtonGroup
            key="view-toggle"
            value={view}
            exclusive
            onChange={handleViewChange}
            aria-label="text alignment"
          >
            <ToggleButton value="table" aria-label="table view" size="small">
              <ListOutlinedIcon />
            </ToggleButton>
            <ToggleButton value="card" aria-label="card view" size="small">
              <BorderAllOutlinedIcon />
            </ToggleButton>
          </ToggleButtonGroup>,
          <CreateButton
            {...props.createButtonProps}
            key="create"
            size="medium"
            sx={{ height: "40px" }}
            onClick={() => {
              return go({
                to: `${createUrl("products")}`,
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
            {t("products.actions.add")}
          </CreateButton>,
        ]}
      >
        {view === "table" && (
          <ProductListTable {...dataGrid} categories={categories} />
        )}
        {view === "card" && (
          <ProductListCard {...dataGrid} categories={categories} />
        )}
      </RefineListView>
      {children}
    </>
  );
};
