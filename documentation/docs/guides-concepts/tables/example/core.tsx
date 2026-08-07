import { Sandpack } from "@site/src/components/sandpack";
import React from "react";

export default function BaseCoreTable() {
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
import { useTable, pageCount, pageSize, currentPage, setCurrentPage } from "@refinedev/core";


export const ProductTable: React.FC = () => {
    const { result, tableQuery, pageCount, pageSize, currentPage, setCurrentPage } = useTable<IProduct>({
        resource: "products",
        pagination: {
            currentPage: 1,
            pageSize: 10,
        },
    });
    const posts = result.data

    if (tableQuery?.isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ padding:"8px" }}>
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
                    {posts.map((post) => (
                        <tr key={post.id}>
                            <td>{post.id}</td>
                            <td>{post.name}</td>
                            <td>{post.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <hr />
            <p>Current Page: {currentPage}</p>
            <p>Page Size: {pageSize}</p>
            <button
              onClick={() => {
                setCurrentPage(currentPage - 1);
              }}
              disabled={currentPage < 2}
            >
              Previous Page
            </button>
            <button
              onClick={() => {
                setCurrentPage(currentPage + 1);
              }}
              disabled={currentPage === pageCount}
            >
              Next Page
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
