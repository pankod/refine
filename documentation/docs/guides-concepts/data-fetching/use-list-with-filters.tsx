import { Sandpack } from "@site/src/components/sandpack";
import React from "react";

export default function UseListWithFilters() {
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
    getList: async ({ resource, filters, pagination, sorters }) => {
        // We simplified query string generation to keep the example application short and straightforward.
        // For more detailed and complex implementation examples, you can refer to the source code of the data provider packages.
        // https://github.com/refinedev/refine/blob/main/packages/simple-rest/src/provider.ts

        // we know that we only have one filter and one sorter in this example.
        const filter = filters?.[0];
        const sorter = sorters?.[0];

        const params = [];

        if (filter && "field" in filter) {
            params.push(\`\${filter.field}=\${filter.value}\`);
        }

        if (sorter && "field" in sorter) {
            params.push(\`_sort=\${sorter.field}\`);
            params.push(\`_order=\${sorter.order}\`);
        }

        // pagination is optional, so we need give default values if it is undefined.
        const { currentPage = 1, pageSize = 10 } = pagination ?? {};
        params.push(\`_start=\${(currentPage - 1) * pageSize}\`);
        params.push(\`_end=\${currentPage * pageSize}\`);

        // combine all params with "&" character to create query string.
        const query = params.join("&");

        const response = await fetch(\`\${url}/\${resource}?\${query}\`);
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
    const { result } = useList({
        resource: "products",
        pagination: { currentPage: 1, pageSize: 5 },
        sorters: [{ field: "id", order: "DESC" }],
        filters: [{ field: "material", operator: "eq", value: "Wooden" }],
    });
    const products = result?.data;

    return (
        <div>
            <h2>Wooden Products</h2>
            <ul>
                {products?.map((product) => (
                    <li key={product.id}>
                       <p>
                            {product.id}
                            <br />
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
