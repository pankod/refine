import { Sandpack } from "@site/src/components/sandpack";
import React from "react";

export default function OneToMany() {
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

  getList: async ({ resource, filters }) => {
    // We simplified query string generation to keep the example application short and straightforward.
    // For more detailed and complex implementation examples, you can refer to the source code of the data provider packages.
    // https://github.com/refinedev/refine/blob/main/packages/simple-rest/src/provider.ts

    // we know that we only have one filter in this example.
    const filter = filters?.[0];

    const params = [];

    if (filter && "field" in filter) {
        params.push(\`\${filter.field}=\${filter.value}\`);
    }

    // combine all params with "&" character to create query string.
    const query = params.join("&");

    const response = await fetch(\`\${url}/\${resource}?\${query}\`);
    const data = await response.json();

    return {
        data,
        total: data.length,
    };
  },



  getMany: async ({ ids, resource }) => {
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

const ProductTsxCode = `
import React from "react";
import { useOne, useList, BaseKey } from "@refinedev/core";

export const Product: React.FC = () => {
    const { data: productData, isLoading: productLoading } = useOne<IProduct>({
        resource: "products",
        id: 123,
    });
    const product = productData?.data;

    const { data: reviewsData, isLoading: reviewsLoading } =
        useList<IProductReview>({
            resource: "product-reviews",
            filters: [{ field: "product.id", operator: "eq", value: product?.id }],
            queryOptions: {
                enabled: !!product,
            },
        });
    const rewiews = reviewsData?.data;

    const loading = productLoading || reviewsLoading;

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h4>{product?.name}</h4>
            <p>Material: {product?.material}</p>
            <p>Price {product?.price}</p>

            <h5>Reviews</h5>
            <ul>
                {rewiews?.map((review) => (
                    <li key={review.id}>
                        <p>Rating: {review.rating}</p>
                        <p>{review.comment}</p>
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
    price: string;
    description: string;
}

interface IProductReview {
    id: BaseKey;
    rating: number;
    comment: string;
    product: {
        id: BaseKey;
    }
    user: {
        id: BaseKey;
    }
}
`.trim();
