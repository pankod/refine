import { Sandpack } from "@site/src/components/sandpack";
import React from "react";

export function ReactRouterUseTableUsage() {
  return (
    <Sandpack
      showNavigator
      showFiles
      dependencies={{
        "@refinedev/core": "latest",
        "@refinedev/simple-rest": "latest",
        "@refinedev/react-router": "latest",
        "react-router": "^7.0.2",
      }}
      startRoute="/my-products"
      theme={{}}
      files={{
        "/App.tsx": {
          code: AppTsxCode,
        },
        "/style.css": {
          code: StyleCssCode,
          hidden: true,
        },
        "/pages/products/list.tsx": {
          code: ListPageTsxCode,
          active: true,
        },
        "/components/products/list.tsx": {
          code: ListTsxCode,
        },
      }}
    />
  );
}

const AppTsxCode = /* tsx */ `
import React from "react";

import { Refine } from "@refinedev/core";
import routerProvider from "@refinedev/react-router";
import dataProvider from "@refinedev/simple-rest";
import { BrowserRouter, Route, Routes } from "react-router";

import "./style.css";

import { ListPage } from "./pages/products/list.tsx";

export default function App() {
  return (
    <BrowserRouter>
      <Refine
        routerProvider={routerProvider}
        dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
        resources={[
          {
            name: "products",
            list: "/my-products",
          },
        ]}
        options={{ syncWithLocation: true }}
      >
        <Routes>
          <Route path="/my-products" element={<ListPage />} />
        </Routes>
      </Refine>
    </BrowserRouter>
  );
}
`.trim();

const StyleCssCode = `
html {
    margin: 0;
    padding: 0;
    font-size: 14px;
}
body {
    margin: 0;
    padding: 12px;
}
* {
    box-sizing: border-box;
}
body {
    font-family: sans-serif;
}
form label, form input, form button {
    display: block;
    width: 100%;
    margin-bottom: 6px;
}
span, button {
    margin: 6px 0;
}
ul > li {
    margin-bottom: 6px;
}
`.trim();

const ListPageTsxCode = `
import React from "react";

import { useTable } from "@refinedev/core";

import { ProductList } from "../../components/products/list";

export const ListPage: React.FC = () => {
  const tableProps = useTable({
    pagination: { current: 1, pageSize: 2 },
    filters: {
      initial: [{ field: "category.id", operator: "eq", value: "1" }],
    },
    sorters: { initial: [{ field: "id", order: "asc" }] },
  });

  return <ProductList tableProps={tableProps} />;
};
`.trim();

const ListTsxCode = `
import React from "react";

export const ProductList: React.FC = ({ tableProps }) => {
  const {
    tableQuery,
    isLoading,
    current,
    setCurrent,
    pageSize,
    pageCount,
    filters,
    setFilters,
    sorters,
    setSorters,
  } = tableProps;

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h3>Products</h3>
      <table style={{ border: "1px solid black" }}>
        <thead>
          <tr key="header">
            <td>id</td>
            <td>name</td>
            <td>categoryId</td>
          </tr>
        </thead>
        <tbody>
          {tableQuery.data?.data?.map((record) => (
            <tr key={record.id}>
              <td>{record.id}</td>
              <td>{record.name}</td>
              <td>{record.category.id}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <hr />
      Sorting by field:
      <b>
        {sorters[0].field}, order {sorters[0].order}
      </b>
      <br />
      <button
        onClick={() => {
          setSorters([
            {
              field: "id",
              order: sorters[0].order === "asc" ? "desc" : "asc",
            },
          ]);
        }}
      >
        Toggle Sort
      </button>
      <hr />
      Filtering by field:
      <b>
        {filters[0].field}, operator {filters[0].operator}, value
        {filters[0].value}
      </b>
      <br />
      <button
        onClick={() => {
          setFilters([
            {
              field: "category.id",
              operator: "eq",
              value: filters[0].value === "1" ? "2" : "1",
            },
          ]);
        }}
      >
        Toggle Filter
      </button>
      <hr />
      <p>Current Page: {current}</p>
      <p>Page Size: {pageSize}</p>
      <button
        onClick={() => {
          setCurrent(current - 1);
        }}
        disabled={current < 2}
      >
        Previous Page
      </button>
      <button
        onClick={() => {
          setCurrent(current + 1);
        }}
        disabled={current === pageCount}
      >
        Next Page
      </button>
    </div>
  );
};
`.trim();
