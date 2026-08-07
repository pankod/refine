import React from "react";
import { Sandpack } from "@site/src/components/sandpack";

export default function UseExportExample() {
  return (
    <Sandpack
      height={460}
      dependencies={{
        "@refinedev/core": "latest",
        "@refinedev/simple-rest": "latest",
      }}
      startRoute="/"
      files={{
        "/App.tsx": {
          code: AppTsxCode,
        },
        "/home-page.tsx": {
          code: HomePageTsxCode,
          active: true,
        },
      }}
    />
  );
}

const AppTsxCode = /* jsx */ `
import React from "react";
import { Refine } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";
import { HomePage } from "./home-page";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
  return (
      <Refine
          dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
          resources={[
              {
                  name: "products",
              },
          ]}
      >
          <HomePage />
      </Refine>
  );
};

export default App;

`.trim();

const HomePageTsxCode = /* jsx */ `
import React from "react";
import { useExport, useList } from "@refinedev/core";

export const HomePage = () => {
  const { data } = useList({ resource: "products" });
  const products = data?.data;

  const { triggerExport, isLoading } = useExport<IProduct>({
      resource: "products",
      mapData: (item) => {
          return {
              ...item,
              // category is an object, we need to stringify it
              category: JSON.stringify(item.category),
          };
      },
  });

  return (
      <div
          style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              padding: "16px",
          }}
      >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <h2>Products</h2>
              <button onClick={triggerExport} disabled={isLoading}>
                  {isLoading ? "Exporting..." : "Export Products"}
              </button>
          </div>
          {products?.map((product) => (
              <div key={product.id}>
                  <h4>[ID: {product.id}] - {product.name}</h4>
                  <p>{product.description}</p>
              </div>
          ))}
      </div>
  );
};

interface IProduct {
  id: string;
  name: string;
  description: string;
  material: string;
  price: number;
  category: {
      id: string;
  };
}


`.trim();
