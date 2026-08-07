import { Sandpack } from "@site/src/components/sandpack";
import React from "react";

export function RemixResourceAndRoutesUsage() {
  return (
    <Sandpack
      hidePreview
      showFiles
      dependencies={{
        "@refinedev/core": "latest",
        "@refinedev/simple-rest": "latest",
        "@refinedev/remix-router": "latest",
        "react-router": "^7.0.2",
      }}
      files={{
        "/app/root.tsx": {
          code: RootTsxCode,
        },
        "/app/routes/my-products._index.tsx": {
          code: ListTsxCode,
        },
        "/app/routes/my-products.$id.tsx": {
          code: ShowTsxCode,
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
              // We're defining the routes and assigning them to an action of a resource
              list: "/my-products",
              show: "/my-products/:id",
              // For sake of simplicity, we are not defining other routes here but the implementation is the same
              // create: "/my-products/new",
              // edit: "/my-products/:id/edit",
              // clone: "/my-products/:id/clone",
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

const ListTsxCode = /* tsx */ `
import { useGo, useList } from "@refinedev/core";
import React from "react";

const ProductList = () => {
  // We're inferring the resource from the route
  // So we call \`useList\` hook without any arguments.
  // const { ... } = useList({ resource: "products" })
  const { data, isLoading } = useList();

  const go = useGo();

  if (isLoading) return <div>Loading...</div>;

  return (
    <ul>
      {data?.data?.map((product) => (
        <li key={product.id}>
          <span>{product.name}</span>
          <button
            onClick={() => {
              go({
                to: {
                  resource: "products",
                  action: "show",
                  id: product.id,
                },
              });
            }}
          >
            show
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ProductList;
`.trim();

const ShowTsxCode = /* tsx */ `
import React from "react";

import { useGo, useShow } from "@refinedev/core";

const ProductShow = () => {
  // We're inferring the resource and the id from the route params
  // So we can call useShow hook without any arguments.
  // const result = useShow({ resource: "products", id: "xxx" })
  const result = useShow();

  const {
    queryResult: { data, isLoading },
  } = result;

  const go = useGo();

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <div>
        <h1>{data?.data?.name}</h1>
        <p>Material: {data?.data?.material}</p>
        <small>ID: {data?.data?.id}</small>
      </div>
      <button
        onClick={() => {
          go({ to: { resource: "products", action: "list" } });
        }}
      >
        Go to Products list
      </button>
    </>
  );
};

export default ProductShow;
`.trim();
