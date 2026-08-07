import { Sandpack } from "@site/src/components/sandpack";
import React from "react";

export function RemixUseTableUsage() {
  return (
    <Sandpack
      hidePreview
      showFiles
      dependencies={{
        "@refinedev/core": "latest",
        "@refinedev/simple-rest": "latest",
        "@refinedev/remix-router": "latest",
      }}
      files={{
        "/app/root.tsx": {
          code: RootTsxCode,
        },
        "/app/components/products/list.tsx": {
          code: ListTsxCode,
        },
        "/app/routes/my-products._index.tsx": {
          code: ListPageTsxCode,
          active: true,
        },
      }}
    />
  );
}

const RootTsxCode = /* tsx */ `
import React from "react";

import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import { Refine } from "@refinedev/core";
import routerProvider from "@refinedev/remix-router";
import dataProvider from "@refinedev/simple-rest";

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Refine
          routerProvider={routerProvider}
          dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
          resources={[
            {
              name: "products",
              list: "/my-products",
            },
          ]}
        >
          <Outlet />
        </Refine>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
`.trim();

const ListPageTsxCode = /* tsx */ `
import React from "react";

import { json, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { useTable } from "@refinedev/core";
import { parseTableParams } from "@refinedev/remix-router";
import dataProvider from "@refinedev/simple-rest";

import { ProductList } from "../components/products/list";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);

  const {
    pagination: queryPagination,
    filters: queryFilters,
    sorters: querySorters,
  } = parseTableParams(url.search);

  const pagination = {
    current: queryPagination.current ?? 1,
    pageSize: queryPagination.pageSize ?? 2,
  };

  const filters = queryFilters ?? [
    {
      field: "category.id",
      operator: "eq",
      value: "1",
    },
  ];

  const sorters = querySorters ?? [{ field: "id", order: "asc" }];

  const data = await dataProvider("https://api.fake-rest.refine.dev").getList({
    resource: "products",
    filters,
    pagination,
    sorters,
  });

  return json({
    initialData: data,
    initialProps: { pagination, filters, sorters },
  });
}

const ProductList = () => {
  const {
    initialData,
    initialProps: { filters, sorters, pagination },
  } = useLoaderData<typeof loader>();
  const tableProps = useTable({
    queryOptions: { initialData },
    filters: { initial: filters },
    sorters: { initial: sorters },
    pagination,
  });

  return <ProductList tableProps={tableProps} />;
};

export default ProductList;
`.trim();

const ListTsxCode = /* tsx */ `
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
        {sorters[0]?.field}, order {sorters[0]?.order}
      </b>
      <br />
      <button
        onClick={() => {
          setSorters([
            {
              field: "id",
              order: sorters[0]?.order === "asc" ? "desc" : "asc",
            },
          ]);
        }}
      >
        Toggle Sort
      </button>
      <hr />
      Filtering by field:
      <b>
        {filters[0]?.field}, operator {filters[0]?.operator}, value:{" "}
        {filters[0]?.value}
      </b>
      <br />
      <button
        onClick={() => {
          setFilters([
            {
              field: "category.id",
              operator: "eq",
              value: filters[0]?.value === "1" ? "2" : "1",
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
          setCurrent(+current - 1);
        }}
        disabled={+current < 2}
      >
        Previous Page
      </button>
      <button
        onClick={() => {
          setCurrent(+current + 1);
        }}
        disabled={current === pageCount}
      >
        Next Page
      </button>
    </div>
  );
};
`.trim();
