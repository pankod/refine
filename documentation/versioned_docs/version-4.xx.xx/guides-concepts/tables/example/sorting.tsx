import { Sandpack } from "@site/src/components/sandpack";
import React from "react";

export default function Sorting() {
  return (
    <Sandpack
      dependencies={{
        "@refinedev/core": "latest",
        "@refinedev/simple-rest": "latest",
      }}
      startRoute="/"
      files={{
        "/App.tsx": {
          code: AppTsxCode,
          hidden: false,
        },
        "/product-table.tsx": {
          code: ProductTableTsxCode,
          hidden: false,
          active: true,
        },
      }}
    />
  );
}

const AppTsxCode = `
import React from "react";
import { Refine } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";
import { ProductTable } from "./product-table.tsx";

const API_URL = "https://api.fake-rest.refine.dev";

export default function App() {
    return (
        <Refine dataProvider={dataProvider(API_URL)}>
            <ProductTable />
        </Refine>
    );
}

`.trim();

export const ProductTableTsxCode = `
import React from "react";
import { useTable } from "@refinedev/core";

export const ProductTable: React.FC = () => {
    const { tableQuery, sorters, setSorters } = useTable<IProduct>({
        resource: "products",
        sorters: {
            initial: [{ field: "price", order: "asc" }],
        },
    });
    const products = tableQuery?.data?.data ?? [];

    const findSorterByFieldName = (fieldName: string) => {
        return sorters.find((sorter) => sorter.field === fieldName);
    };


    if (tableQuery.isLoading) {
        return <div>Loading...</div>;
    }
    
    return (
        <div>
            <h1>Products</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <hr />
            <hr />
            Sorting by field:
            <b>
                {findSorterByFieldName("price")?.field}, order{" "}
                {findSorterByFieldName("price")?.order}
            </b>
            <br />
            <button
                onClick={() => {
                    setSorters([
                        {
                            field: "price",
                            order:
                                findSorterByFieldName("price")?.order === "asc"
                                    ? "desc"
                                    : "asc",
                        },
                    ]);
                }}
            >
                Toggle Sort
            </button>
        </div>
    );
};

interface IProduct {
    id: number;
    name: string;
    price: string;
}


`.trim();
