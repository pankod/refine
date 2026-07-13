import { Sandpack } from "@site/src/components/sandpack";
import React from "react";

export default function UseList() {
  return (
    <Sandpack
      dependencies={{
        "@refinedev/core": "latest",
      }}
      startRoute="/"
      files={{
        "/App.tsx": {
          code: AppTsxCode,
          hidden: false,
        },
        "/home-page.tsx": {
          code: HomePageTsxCode,
          hidden: false,
          active: true,
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

import { HomePage } from "./home-page.tsx";
import { dataProvider } from "./data-provider.ts";

const API_URL = "https://api.fake-rest.refine.dev";


export default function App() {
    return (
        <Refine dataProvider={dataProvider(API_URL)}>
            <HomePage />
        </Refine>
    );
}
`.trim();

const DataProviderCode = `
import React from "react";
import { DataProvider } from "@refinedev/core";

export const dataProvider = (url: string): DataProvider => ({
    getList: async ({ resource }) => {
        const response = await fetch(\`\${url}/\${resource}\`);
        const data = await response.json();

        return {
            data,
            total: data.length,
        };
    },

    getOne: async () => {
        throw new Error("Not implemented");
    },

    getMany: async () => {
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

const HomePageTsxCode = `
import { useList } from "@refinedev/core";

export const HomePage = () => {
    const { data: products } = useList({
        resource: "products",
    });

    return (
        <div>
            <h2>Products</h2>
            <p> Showing {products?.total} records in total. </p>
            <ul>
                {products?.data?.map((product) => (
                    <li key={product.id}>
                        <p>
                            {product.name}
                            <br />
                            Price: {product.price}
                            <br />
                            Material: {product.material}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
};


interface IProducts {
    id: BaseKey;
    name: string;
    material: string;
    price: string;
}
`.trim();
