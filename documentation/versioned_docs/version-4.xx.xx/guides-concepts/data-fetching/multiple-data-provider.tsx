import { Sandpack } from "@site/src/components/sandpack";
import React from "react";

export default function MultipleDataProvider() {
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
const FINE_FOODS_API_URL = "https://api.finefoods.refine.dev";


export default function App() {
    return (
        <Refine
            dataProvider={{
                default: dataProvider(API_URL),
                fineFoods: dataProvider(FINE_FOODS_API_URL),
            }}
        >
            <HomePage />
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

const HomePageTsxCode = `
import { useOne } from "@refinedev/core";

export const HomePage = () => {
    const { data: product, isLoading: isLoadingProduct } = useOne<IProduct>({
        resource: "products",
        id: 123,
        dataProviderName: "default",
    });

    const { data: user, isLoading: isLoadingUser } = useOne<IUser>({
        resource: "users",
        id: 123,
        dataProviderName: "fineFoods",
    });

    if (isLoadingProduct || isLoadingUser) return <div>Loading...</div>;

    return (
        <div>
            <h2>Product</h2>
            <h4>{product?.data?.name}</h4>
            <p>Material: {product?.data?.material}</p>
            <p>Price {product?.data?.price}</p>

            <br />

            <h2>User</h2>
            <h4>
                {user?.data?.firstName} {user?.data?.lastName}
            </h4>
            <p>Phone: {user?.data?.gsm}</p>
        </div>
    );
};

interface IProduct {
    id: BaseKey;
    name: string;
    material: string;
    price: string;
}

interface IUser {
    id: BaseKey;
    firstName: string;
    lastName: string;
    gsm: string;
}
`.trim();
