import { Sandpack } from "@site/src/components/sandpack";
import React from "react";

export function ReactRouterUseFormUsage() {
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
      files={{
        "/App.tsx": {
          code: AppTsxCode,
          hidden: true,
        },
        "/style.css": {
          code: StyleCssCode,
          hidden: true,
        },
        "list.tsx": {
          code: ListTsxCode,
        },
        "edit.tsx": {
          code: EditTsxCode,
          active: true,
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

import { ProductEdit } from "./edit.tsx";
import { ProductList } from "./list.tsx";

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
            edit: "/my-products/:id/edit",
          },
        ]}
      >
        <Routes>
          <Route path="/my-products" element={<ProductList />} />
          <Route path="/my-products/:id/edit" element={<ProductEdit />} />
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
span + button {
    margin-left: 6px;
}
ul > li {
    margin-bottom: 6px;
}
`.trim();

const ListTsxCode = `
import React from "react";

import { useGo, useList } from "@refinedev/core";

export const ProductList: React.FC = () => {
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
                  action: "edit",
                  id: product.id,
                },
              });
            }}
          >
            edit
          </button>
        </li>
      ))}
    </ul>
  );
};
`.trim();

const EditTsxCode = `
import React from "react";

import { useForm } from "@refinedev/core";

export const ProductEdit: React.FC = () => {
  const { formLoading, onFinish, query } = useForm();
  const defaultValues = query?.data?.data;

  const onSubmit = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target).entries());

    onFinish(data);
  };

  return (
    <div>
      <br />
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="name">name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="name"
            defaultValue={defaultValues?.name}
          />
        </div>
        <button type="submit" disabled={formLoading}>
          <span>Save</span>
        </button>
      </form>
    </div>
  );
};
`.trim();
