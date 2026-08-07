import { Sandpack } from "@site/src/components/sandpack";
import React from "react";

export default function BasicUsage() {
  return (
    <Sandpack
      // showNavigator
      dependencies={{
        "@refinedev/core": "latest",
        "@refinedev/simple-rest": "latest",
        "@refinedev/react-router": "latest",
        "@refinedev/react-hook-form": "latest",
        "react-router": "^7.0.2",
      }}
      startRoute="/products/create"
      files={{
        "/App.tsx": {
          code: AppTsxCode,
        },
        "/style.css": {
          code: StyleCssCode,
          hidden: true,
        },
        "/list.tsx": {
          code: ListTsxCode,
        },
        "/create.tsx": {
          code: CreateTsxCode,
          active: true,
        },
        "/edit.tsx": {
          code: EditTsxCode,
        },
      }}
    />
  );
}

const AppTsxCode = /* tsx */ `
import React from "react";
import { Refine } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";
import { BrowserRouter, Route, Routes, Navigate, Outlet } from "react-router";
import routerProvider from "@refinedev/react-router";

import "./style.css";

import { List } from "./list.tsx";
import { Edit } from "./edit.tsx";
import { Create } from "./create.tsx";

export default function App() {
    return (
        <BrowserRouter>
            <Refine
                routerProvider={routerProvider}
                dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
                resources={[
                    {
                        name: "products",
                        list: "/products",
                        create: "/products/create",
                        edit: "/products/edit/:id",
                    }
                ]}
            >
                <Routes>
                    <Route path="/products" element={<Outlet />}>
                        <Route index element={<List />} />
                        <Route path="create" element={<Create />} />
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
form label, form input, form button {
    display: block;
    width: 100%;
    margin-bottom: 6px;
}
`.trim();

const ListTsxCode = `
import { useList, BaseKey } from "@refinedev/core";
import { Link } from "react-router";

export const List: React.FC = () => {
    const { data, isLoading, isError } = useList<IProduct>({
        resource: "products",
        filters: [
            {
                field: "id",
                operator: "gte",
                value: 120,
            }
        ]
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
                <h1>Products</h1>
                <Link to="/products/create">Create Product</Link>
            <ul>
                {data?.data?.map((product) => (
                    <li key={product.id}>
                        {product.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

interface IProduct {
    id: BaseKey;
    name: string;
    material: string;
}
`.trim();

const CreateTsxCode = `
import React from "react";
import { useForm } from "@refinedev/react-hook-form";

import type { HttpError, BaseKey } from "@refinedev/core";

export const Create: React.FC = () => {
    const {
        refineCore: { onFinish, formLoading, redirect },
        register,
        handleSubmit,
        reset,
    } = useForm<IProduct, HttpError, FormValues>({
        refineCoreProps: {
            redirect: false,
        }
    });

    const saveAndList = (variables: FormValues) => {
        onFinish(variables).then(() => {
            // The default behavior is (unless changed in <Refine /> component) redirecting to the list page.
            // Since we've stated as \`redirect: false\` in the useForm hook, we need to redirect manually.
            redirect("list");
        });
    };

    const saveAndContinue = (variables: FormValues) => {
        onFinish(variables).then(({ data }) => {
            // We'll wait for the mutation to finish and grab the id of the created product from the response.
            // This will only work on \`pesimistic\` mutation mode.
            redirect("edit", data.id);
        });
    };

    const saveAndAddAnother = (variables: FormValues) => {
        onFinish(variables).then(() => {
            // We'll wait for the mutation to finish and reset the form.
            reset();
        });
    };

    return (
        <div>
            <h1>Create Product</h1>
            <form onSubmit={handleSubmit(saveAndList)}>
                <label htmlFor="name">Name</label>
                <input
                    name="name"
                    placeholder="Name"
                    {...register("name", { required: true })}
                />
                <label htmlFor="material">Material</label>
                <input
                    name="material"
                    placeholder="Material"
                    {...register("material", { required: true })}
                />
                <div style={{ display: "flex", gap: "12px" }}>
                    <button type="submit">Save</button>
                    <button type="button" onClick={handleSubmit(saveAndContinue)}>Save and Continue Editing</button>
                    <button type="button" onClick={handleSubmit(saveAndAddAnother)}>Save and Add Another</button>
                </div>
            </form>
        </div>
    );
};

interface IProduct {
    id: BaseKey;
    name: string;
    material: string;
}

interface FormValues {
    name?: string;
    material?: string;
}
`.trim();

const EditTsxCode = `
import React from "react";
import { useSelect } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";

import type { HttpError, BaseKey } from "@refinedev/core";

export const Edit: React.FC = () => {
    const {
        refineCore: { onFinish, formLoading },
        register,
        handleSubmit,
        reset
    } = useForm<IProduct, HttpError, FormValues>();

    return (
        <div>
            <h1>Edit Product</h1>
            <form onSubmit={handleSubmit(onFinish)}>
                <label htmlFor="name">Name</label>
                <input
                    name="name"
                    placeholder="Name"
                    {...register("name", { required: true })}
                />
                <label htmlFor="material">Material</label>
                <input
                    name="material"
                    placeholder="Material"
                    {...register("material", { required: true })}
                />
                <button type="submit">Save</button>
            </form>
        </div>
    );
};

interface IProduct {
    id: BaseKey;
    name: string;
    material: string;
}

interface FormValues {
    name?: string;
    material?: string;
}
`.trim();
