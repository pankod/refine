import { Sandpack } from "@site/src/components/sandpack";
import React from "react";

export default function ServerSideValidationReactHookForm() {
  return (
    <Sandpack
      height={460}
      showOpenInCodeSandbox={false}
      dependencies={{
        "@refinedev/core": "^4.45.1",
        "@refinedev/react-router": "latest",
        "@refinedev/simple-rest": "^4.5.4",
        "react-dom": "^18.0.0",
        "react-router": "^7.0.2",
      }}
      startRoute="/products/create"
      files={{
        "/App.tsx": {
          code: AppTsxCode,
          hidden: true,
        },
        "style.css": {
          code: StyleCssCode,
          hidden: true,
        },
        "/data-provider.tsx": {
          code: DataProviderTsxCode,
          active: true,
        },
        "/create.tsx": {
          code: CreateTsxCode,
        },
      }}
    />
  );
}

const DataProviderTsxCode = /* jsx */ `
import type { HttpError } from "@refinedev/core";
import baseDataProvider from "@refinedev/simple-rest";

const dataProvider = {
    ...baseDataProvider("https://api.fake-rest.refine.dev"),
    create: async () => {
        // For demo purposes, we're hardcoding the error response.
        // In a real-world application, the error of the server should match the \`HttpError\` interface
        // or should be transformed to match it.
        return Promise.reject({
            message: "This is an error from the server",
            statusCode: 400,
            errors: {
                name: "Name should be at least 3 characters long",
                material: "Material should start with a capital letter",
                description: "Description should be at least 10 characters long",
            },
        } as HttpError);
    }
};

export default dataProvider;
`.trim();

const StyleCssCode = /* css */ `
body {
    margin: 0;
    padding: 0;
    font-family: sans-serif;
}
form {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
label {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
}
label span {
  display: inline-flex;
  min-width: 120px;
}
form button[type="button"] {
  margin-top: 12px;
  align-self: flex-end;
}
`.trim();

const AppTsxCode = /* jsx */ `
import { Refine } from "@refinedev/core";
import routerProvider from "@refinedev/react-router";
import { BrowserRouter, Routes, Route, Outlet } from "react-router";

import "./style.css";

import dataProvider from "./data-provider";

import { ProductCreate } from "./create";

const App: React.FC = () => {
    return (
        <BrowserRouter>
                <Refine
                    routerProvider={routerProvider}
                    dataProvider={dataProvider}
                    resources={[
                        {
                            name: "products",
                            create: "/products/create",
                        },
                    ]}
                    options={{ mutationMode: "pessimistic", syncWithLocation: true, redirect: { afterCreate: false } }}
                >
                    <Routes>
                      <Route path="/products" element={<Outlet />}>
                          <Route path="create" element={<ProductCreate />} />
                      </Route>
                    </Routes>
                </Refine>
        </BrowserRouter>
    );
};

export default App;
`.trim();

const CreateTsxCode = /* jsx */ `
import { useForm } from "@refinedev/core";

export const ProductCreate = () => {
    const {
        mutation: { error },
        formLoading,
        onFinish,
    } = useForm();

    const { errors } = error ?? {};

    return (
      <div style={{ position: "relative" }}>
        <form onSubmit={(event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const variables = Object.fromEntries(formData.entries());
          onFinish(variables).catch(() => {})
        }} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <label>
            <span>Name</span>
            <input type="text" id="name" name="name" />
            </label>
            <span style={{ color: "red" }}>{errors?.name ?? ""}</span>
          <label>
            <span>Material</span>
            <input type="text" id="material" name="material" />
            </label>
            <span style={{ color: "red" }}>{errors?.material ?? ""}</span>
          <label>
            <span>Description</span>
            <textarea id="description" name="description" />
            </label>
            <span style={{ color: "red" }}>{errors?.description ?? ""}</span>
          <button type="submit">Save</button>
        </form>
        {formLoading && (<div style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          color: "#000",
        }}>loading...</div>)}
      </div>
    );
};
`.trim();
