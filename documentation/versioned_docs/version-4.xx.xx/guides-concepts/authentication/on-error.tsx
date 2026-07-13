import { Sandpack } from "@site/src/components/sandpack";
import React from "react";

export default function OnError() {
  return (
    <Sandpack
      dependencies={{
        "@refinedev/core": "latest",
        axios: "^1.6.2",
      }}
      startRoute="/"
      files={{
        "/App.tsx": {
          code: AppTsxCode,
          hidden: false,
        },
        "/product-page.tsx": {
          code: ProductPageTsxCode,
          hidden: false,
          active: true,
        },
        "/auth-provider.ts": {
          code: AuthProviderCode,
          hidden: false,
        },
        "/data-provider.ts": {
          code: DataProviderCode,
          hidden: false,
        },
      }}
    />
  );
}

const AppTsxCode = `
import React from "react";
import { Refine } from "@refinedev/core";

import { ProductPage } from "./product-page.tsx";
import { dataProvider } from "./data-provider.ts";
import { authProvider } from "./auth-provider.ts";

const API_URL = "https://api.fake-rest.refine.dev";


export default function App() {
    return (
        <Refine
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            authProvider={authProvider}
        >
            <ProductPage />
        </Refine>
    );
}

`.trim();

const AuthProviderCode = `
import React from "react";
import { AuthProvider } from "@refinedev/core";

export const authProvider: AuthProvider = {
    onError: async (error: HttpError) => {
        // simulating a HTTP error
        if (error.statusCode === 401) {
            alert(error.message);
        }

        return {};
    },
    login: async () => {
        throw new Error("Not implemented");
    },
    logout: async () => {
        throw new Error("Not implemented");
    },
    check: async () => {
        throw new Error("Not implemented");
    },
};
`.trim();

const DataProviderCode = `
import React from "react";
import { DataProvider } from "@refinedev/core";

export const dataProvider = (url: string): DataProvider => ({
    getOne: async () => {
        // simulating a HTTP error
        const error: HttpError = {
            message: "User is not authenticated",
            statusCode: 401,
        };
        return Promise.reject(error);
    },
    getList: async () => {
        throw new Error("Not implemented");
    },
    create: async () => {
        throw new Error("Not implemented");
    },
    update: async () => {
        throw new Error("Not implemented");
    },
    deleteOne: async () => {
        throw new Error("Not implemented");
    },
    getApiUrl: () => url,
});
`.trim();

const ProductPageTsxCode = `
import React from "react";
import { useOne } from "@refinedev/core";

export const ProductPage = () => {
    const { data, refetch } = useOne<Product>({
        resource: "products",
        id: "1",
        queryOptions: {
            retry: false,
            enabled: false,
        },
    });
    const product = data?.data;

    return (
        <div>
            <h2>Product</h2>
            <p>name: {product?.name}</p>
            <button onClick={() => refetch()}>Get Product</button>
        </div>
    );
};

type Product = {
    id: string;
    name: string;
};

`.trim();
