import { Sandpack } from "@site/src/components/sandpack";
import React from "react";

export function NextJSResourceAndRoutesUsage() {
  return (
    <Sandpack
      template="nextjs"
      showFiles
      startRoute="/my-products"
      files={{
        "/pages/_app.tsx": {
          code: AppTsxCode,
        },
        "/style.css": {
          code: StyleCssCode,
          hidden: true,
        },
        "/pages/my-products/index.tsx": {
          code: ListTsxCode,
        },
        "/pages/my-products/[id].tsx": {
          code: ShowTsxCode,
          active: true,
        },
      }}
    />
  );
}

const StyleCssCode = /* css */ `
html {
    margin: 0;
    padding: 0;
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
form label,
form input,
form button {
    display: block;
    width: 100%;
    margin-bottom: 6px;
}
span + button {
    margin-left: 6px;
}
ul > li {
    margin-bottom: 6px;
}
`.trim();

const AppTsxCode = /* tsx */ `
import React from "react";

import { Refine } from "@refinedev/core";
import routerProvider from "@refinedev/nextjs-router/pages";
import dataProvider from "@refinedev/simple-rest";
import type { AppProps } from "next/app";

import "../style.css";

function App({ Component, pageProps }: AppProps) {
  return (
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
      <Component {...pageProps} />
    </Refine>
  );
}

export default App;
`.trim();

const ListTsxCode = /* tsx */ `
import React from "react";

import { useGo, useList } from "@refinedev/core";

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
