import { Sandpack } from "@site/src/components/sandpack";
import React from "react";

export default function ErrorHandling() {
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
        "/product.tsx": {
          code: ProductTsxCode,
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

import { Product } from "./product.tsx";
import { dataProvider } from "./data-provider.ts";


export default function App() {
    return (
            <Refine
                dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            >
                <Product />
            </Refine>
    );
}
`.trim();

const DataProviderCode = `
import React from "react";
import { DataProvider } from "@refinedev/core";

export const dataProvider = (url: string): DataProvider => ({
  getOne: async ({ id, resource }) => {
    const response = await fetch(\`\${url}/\${resource}/\${id}\`);
      const data = await response.json();

      if (!response.ok || !data) {
        const error: HttpError = {
            message: "Something went wrong while fetching data",
            statusCode: 404,
        };
        return Promise.reject(error);
      }

      return {
          data,
      };
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
  getList: async () => {
      throw new Error("Not implemented");
  },
  getApiUrl: () => url,
});
`.trim();

const ProductTsxCode = `
import React from "react";
import { useOne, BaseKey } from "@refinedev/core";

export const Product: React.FC = () => {
    const { data, error, isError, isLoading } = useOne<IProduct>({
        resource: "products",
        id: "non-existing-id", 
        queryOptions: {
            retry: 0,
        },
    });

    if (isError) {
        return (
            <div>
                <h1>Error</h1>
                <p>{error.message}</p>
            </div>
        );
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const product = data?.data;

    return (
        <div>
            <h4>{product?.name}</h4>
            <p>Material: {product?.material}</p>
            <p>Price {product?.price}</p>
        </div>
    );
};


interface IProduct {
    id: BaseKey;
    name: string;
    material: string;
    price: string;
}
`.trim();
