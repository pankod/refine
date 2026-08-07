import { Sandpack } from "@site/src/components/sandpack";
import React from "react";

export default function OneToOne() {
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
    const { data: productData, isLoading: productLoading } = useOne<IProduct>({
        resource: "products",
        id: 123,
    });
    const product = productData?.data;

    const { data: productDetailData, isLoading: productDetailLoading }  = useOne<IProductDetail>({
        resource: "product-detail",
        id: product?.id,
        queryOptions: {
            enabled: !!product,
        },
    });
    const productDetail = productDetailData?.data;

    loading = productLoading || productDetailLoading;

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h4>{product?.name}</h4>
            <p>Material: {product?.material}</p>
            <p>Price {product?.price}</p>
            <p>Weight: {productDetail?.weight}</p>
            <p>Dimensions: {productDetail?.dimensions?.width} x {productDetail?.dimensions?.height} x {productDetail?.dimensions?.depth}</p>
        </div>
    );
};


interface IProduct {
    id: BaseKey;
    name: string;
    material: string;
    price: string;
    description: string;
}

interface IProductDetail {
    id: BaseKey;
    weight: number;
    dimensions: {
        width: number;
        height: number;
        depth: number;
    };
}
`.trim();
