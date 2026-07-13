import { Sandpack } from "@site/src/components/sandpack";
import React from "react";

export default function BasicUsage() {
  return (
    <Sandpack
      showOpenInCodeSandbox={false}
      dependencies={{
        "@refinedev/core": "latest",
        "@refinedev/simple-rest": "latest",
        "@refinedev/react-router": "latest",
        "react-router": "^7.0.2",
      }}
      startRoute="/products/edit/123"
      files={{
        "/App.tsx": {
          code: AppTsxCode,
          hidden: true,
        },
        "/style.css": {
          code: StyleCssCode,
          hidden: true,
        },
        "/edit.tsx": {
          code: EditTsxCode,
          active: true,
        },
      }}
    />
  );
}

const AppTsxCode = /* jsx */ `
import React from "react";
import { Refine } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";
import { BrowserRouter, Route, Routes, Navigate, Link, Outlet } from "react-router";
import routerProvider from "@refinedev/react-router";

import "./style.css";

import { Edit } from "./edit.tsx";

export default function App() {
    return (
        <BrowserRouter>
            <Refine
                routerProvider={routerProvider}
                dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
                resources={[
                    {
                        name: "products",
                        edit: "/products/edit/:id",
                    }
                ]}
            >
                <Routes>
                    <Route index element={<Navigate to="/products/edit/123" />} />
                    <Route path="/products" element={<Outlet />}>
                        <Route path="edit/:id" element={<Edit />} />
                    </Route>
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
form button {
    display: block;
    // width: 100%;
    margin-bottom: 6px;
}
.page {
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.page form {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  max-width: 400px;
}
.page form label {
  display: flex;
  align-items: center;
}
.page form label input, .page form label textarea, .page form label select {
  flex: 1;
}
.page form label span {
  width: 90px;
}
.auto-save-wrapper {
  padding: 6px 0;
  font-weight: 600;
}
`.trim();

const EditTsxCode = /* jsx */ `import React from "react";
import { useForm, useSelect, AutoSaveIndicator, HttpError, BaseKey } from "@refinedev/core";

export const Edit: React.FC = () => {
  const { query, isLoading, onFinish, autoSaveProps, onFinishAutoSave } = useForm<
    IProduct,
    HttpError,
    FormValues
  >({
    autoSave: {
      enabled: true,
      interval: 1000,
    },
  });

  const { options: categorySelectOptions } = useSelect({
    resource: "categories",
  });

  const defaultValues = query?.data?.data;

  return (
    <div className="page">
      <div className="auto-save-wrapper">
        <AutoSaveIndicator {...autoSaveProps} />
      </div>
      <form
        onChange={(event) => {
          const formData = new FormData(event.currentTarget);

          onFinishAutoSave(transformValues(Object.fromEntries(formData.entries()) as RawFormValues));
        }}
        onSubmit={(event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);

          onFinish(transformValues(Object.fromEntries(formData.entries()) as RawFormValues));
        }}
      >
        <label htmlFor="name">
          <span>Name</span>
          <input name="name" placeholder="Name" defaultValue={defaultValues?.name} />
        </label>
        <label htmlFor="description">
          <span>Description</span>
          <textarea name="description" placeholder="Description" defaultValue={defaultValues?.description} />
        </label>
        <label htmlFor="material">
          <span>Material</span>
          <input name="material" placeholder="Material" defaultValue={defaultValues?.material} />
        </label>
        <label htmlFor="category">
          <span>Category</span>
          <select name="category" defaultValue={defaultValues?.category?.id}>
            {categorySelectOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

const transformValues = (values: RawFormValues): FormValues => {
  return {
    ...values,
    category: values.category ? { id: values.category } : undefined,
  };
};

interface IProduct {
  id: BaseKey;
  name: string;
  material: string;
  description: string;
  category: { id: BaseKey; name: string };
}

interface FormValues {
  name?: string;
  material?: string;
  description?: string;
  category?: { id: BaseKey };
}

interface RawFormValues extends FormValues {
  category?: BaseKey;
}
`.trim();
