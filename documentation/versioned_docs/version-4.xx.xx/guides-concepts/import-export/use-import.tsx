import React from "react";
import { Sandpack } from "@site/src/components/sandpack";

export default function UseImportExample() {
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
import React, { useState } from "react";
import { useImport, useList } from "@refinedev/core";

export const HomePage = () => {
  const { data } = useList({
      resource: "products",
      sorters: [{ field: "id", order: "desc" }],
  });
  const products = data?.data;

  const [importProgress, setImportProgress] = useState({
      processed: 0,
      total: 0,
  });

  const { inputProps, isLoading } = useImport<IProduct>({
      resource: "products",
      onFinish: () => {
          alert("Import completed!");
      },
      onProgress: (progress) => {
          setImportProgress({
              processed: progress.processedAmount,
              total: progress.totalAmount,
          });
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

              <label
                  style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      cursor: "pointer",
                      padding: "8px",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                  }}
              >
                  {isLoading ? (
                      <p>
                          {importProgress.processed} / {importProgress.total}
                      </p>
                  ) : (
                      <p>Import CSV</p>
                  )}
                  <input name="csv" {...inputProps} />
              </label>
          </div>
          {products?.map((product) => (
              <div key={product.id}>
                  <h4>
                      [ID: {product.id}] - {product.name}
                  </h4>
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
