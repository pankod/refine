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
        "react-router": "^7.0.2",
      }}
      startRoute="/products/create"
      files={{
        "/App.tsx": {
          code: AppTsxCode,
          hidden: true,
        },
        "/style.css": {
          code: StyleCssCode,
          hidden: true,
        },
        "/list.tsx": {
          code: ListTsxCode,
          hidden: true,
        },
        "/show.tsx": {
          code: ShowTsxCode,
          hidden: true,
        },
        "/create.tsx": {
          code: CreateTsxCode,
          active: true,
        },
        "/edit.tsx": {
          code: EditTsxCode,
        },
        "/clone.tsx": {
          code: CloneTsxCode,
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

import { List } from "./list.tsx";
import { Show } from "./show.tsx";
import { Clone } from "./clone.tsx";
import { Edit } from "./edit.tsx";
import { Create } from "./create.tsx";

const Layout = ({ children }) => {
    return (
        <div>
            <div style={{ padding: "10px 0", display: "flex", gap: "10px" }}>
                <Link to="/products/create">Create Product</Link>
                <Link to="/products/edit/123">Edit Product #123</Link>
                <Link to="/products/clone/123">Clone Product #123</Link>
            </div>
            <div>
                {children}
            </div>
        </div>
    );
};

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
                        show: "/products/:id",
                        create: "/products/create",
                        edit: "/products/edit/:id",
                        clone: "/products/clone/:id",
                    }
                ]}
            >
                <Routes>
                    <Route index element={<Navigate to="/products" />} />
                    <Route path="/products" element={<Layout><Outlet /></Layout>}>
                        <Route index element={<List />} />
                        <Route path="edit/:id" element={<Edit />} />
                        <Route path="clone/:id" element={<Clone />} />
                        <Route path="create" element={<Create />} />
                        <Route path=":id" element={<Show />} />
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
        <ul>
            {data?.data?.map((product) => (
                <li key={product.id}>
                    {product.name}
                </li>
            ))}
        </ul>
    );
};

interface IProduct {
    id: BaseKey;
    name: string;
    material: string;
}
`.trim();

const ShowTsxCode = `
import { useShow, BaseKey } from "@refinedev/core";

export const Show: React.FC = () => {
    const { query: { data, isLoading, isError } } = useShow<IProduct>({
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{data?.data?.name}</h1>
            <p>Material: {data?.data?.material}</p>
            <small>ID: {data?.data?.id}</small>
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
import { useForm, HttpError, BaseKey } from "@refinedev/core";

export const Create: React.FC = () => {
    const { onFinish } = useForm<IProduct, HttpError, FormValues>({
        resource: "products",
        action: "create",
        redirect: "show", // redirect to show page after form submission, defaults to "list"
    });

    const [values, setValues] = React.useState<FormValues>({ name: "", material: "" });

    const onSubmit = (e) => {
        e.preventDefault();
        onFinish(values);
    };

    return (
        <form onSubmit={onSubmit}>
            <label htmlFor="name">Name</label>
            <input
                name="name"
                placeholder="Name"
                value={values.name}
                onChange={(e) => setValues({ ...values, name: e.target.value })}
            />
            <label htmlFor="material">Material</label>
            <input
                name="material"
                placeholder="Material"
                value={values.material}
                onChange={(e) => setValues({ ...values, material: e.target.value })}
            />
            <button type="submit">Submit</button>
        </form>
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
import { useForm, HttpError, BaseKey } from "@refinedev/core";

export const Edit: React.FC = () => {
    const { query, formLoading, onFinish } = useForm<IProduct, HttpError, FormValues>({
        resource: "products",
        action: "edit",
        id: "123",
        redirect: "show", // redirect to show page after form submission, defaults to "list"
    });

    const defaultValues = query?.data?.data;

    const [values, setValues] = React.useState<FormValues>({
        name: defaultValues?.name || "",
        material: defaultValues?.material || "",
    });

    React.useEffect(() => {
        setValues({
            name: defaultValues?.name || "",
            material: defaultValues?.material || "",
        });
    }, [defaultValues]);

    const onSubmit = (e) => {
        e.preventDefault();
        onFinish(values);
    };

    return (
        <form onSubmit={onSubmit}>
            <label htmlFor="name">Name</label>
            <input
                name="name"
                placeholder="Name"
                value={values.name}
                onChange={(e) => setValues({ ...values, name: e.target.value })}
            />
            <label htmlFor="material">Material</label>
            <input
                name="material"
                placeholder="Material"
                value={values.material}
                onChange={(e) => setValues({ ...values, material: e.target.value })}
            />
            <button type="submit">Submit</button>
        </form>
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

const CloneTsxCode = `
import React from "react";
import { useForm, HttpError, BaseKey } from "@refinedev/core";

export const Clone: React.FC = () => {
    const { query, formLoading, onFinish } = useForm<IProduct, HttpError, FormValues>({
        resource: "products",
        action: "clone",
        id: "123",
        redirect: "show", // redirect to show page after form submission, defaults to "list"
    });

    const defaultValues = query?.data?.data;

    const [values, setValues] = React.useState<FormValues>({
        name: defaultValues?.name || "",
        material: defaultValues?.material || "",
    });

    React.useEffect(() => {
        setValues({
            name: defaultValues?.name || "",
            material: defaultValues?.material || "",
        });
    }, [defaultValues]);

    const onSubmit = (e) => {
        e.preventDefault();
        onFinish(values);
    };

    return (
        <form onSubmit={onSubmit}>
            <label htmlFor="name">Name</label>
            <input
                name="name"
                placeholder="Name"
                value={values.name}
                onChange={(e) => setValues({ ...values, name: e.target.value })}
            />
            <label htmlFor="material">Material</label>
            <input
                name="material"
                placeholder="Material"
                value={values.material}
                onChange={(e) => setValues({ ...values, material: e.target.value })}
            />
            <button type="submit">Submit</button>
        </form>
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
