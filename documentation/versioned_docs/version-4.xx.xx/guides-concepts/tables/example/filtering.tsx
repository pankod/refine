import { Sandpack } from "@site/src/components/sandpack";
import React from "react";

export default function Filtering() {
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
  const { tableQuery, filters, setFilters } = useTable<IProduct>({
      resource: "products",
      filters: {
          permanent: [
              {
                  field: "price",
                  value: "200",
                  operator: "lte",
              },
          ],
          initial: [{ field: "category.id", operator: "eq", value: "1" }],
      },
  });
  const products = tableQuery?.data?.data ?? [];

  const getFilterByField = (field: string) => {
      return filters.find((filter) => {
          if ("field" in filter && filter.field === field) {
              return filter;
          }
      }) as LogicalFilter | undefined;
  };

  const resetFilters = () => {
    setFilters([], "replace");
  };


  if (tableQuery.isLoading) {
      return <div>Loading...</div>;
  }

  return (
      <div>
          <h1>Products with price less than 200</h1>
          <table>
              <thead>
                  <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>categoryId</th>
                  </tr>
              </thead>
              <tbody>
                  {products.map((product) => (
                      <tr key={product.id}>
                          <td>{product.id}</td>
                          <td>{product.name}</td>
                          <td>{product.price}</td>
                          <td>{product.category.id}</td>
                      </tr>
                  ))}
              </tbody>
          </table>
          <hr />
          Filtering by field:
          <b>
              {getFilterByField("category.id")?.field}, operator{" "}
              {getFilterByField("category.id")?.operator}, value
              {getFilterByField("category.id")?.value}
          </b>
          <br />
          <button
              onClick={() => {
                  setFilters([
                      {
                          field: "category.id",
                          operator: "eq",
                          value:
                              getFilterByField("category.id")?.value === "1"
                                  ? "2"
                                  : "1",
                      },
                  ]);
              }}
          >
              Toggle Filter
          </button>
          <button onClick={resetFilters}>Reset filter</button>
      </div>
  );
};

interface IProduct {
  id: number;
  name: string;
  price: string;
  category: {
      id: number;
  };
}

`.trim();
