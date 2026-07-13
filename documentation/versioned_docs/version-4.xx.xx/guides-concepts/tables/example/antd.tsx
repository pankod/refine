import { Sandpack } from "@site/src/components/sandpack";
import React from "react";

export default function BaseAntdTableExample() {
  return (
    <Sandpack
      dependencies={{
        "@refinedev/core": "latest",
        "@refinedev/simple-rest": "latest",
        "@refinedev/antd": "latest",
        antd: "latest",
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
import { ConfigProvider, App as AntdApp } from "antd";
import { ProductTable } from "./product-table.tsx";

const API_URL = "https://api.fake-rest.refine.dev";

export default function App() {
    return (
        <ConfigProvider>
          <AntdApp>
            <Refine dataProvider={dataProvider(API_URL)}>
                <ProductTable />
            </Refine>
          </AntdApp>
        </ConfigProvider>
    );
}

`.trim();

export const ProductTableTsxCode = `
import React from "react";
import { useTable, FilterDropdown } from "@refinedev/antd";
import { Table, Input } from "antd";

export const ProductTable: React.FC = () => {
    const { tableProps } = useTable<IProduct>({
        resource: "products",
        filters: {
            initial: [
                {
                    field: "name",
                    operator: "contains",
                    value: "",
                },
            ],
        },
    });

    return (
        <div style={{ padding: "4px" }}>
            <h2>Products</h2>
            <Table {...tableProps} rowKey="id">
                <Table.Column
                    dataIndex="id"
                    title="ID"
                    sorter={{ multiple: 2 }}
                />
                <Table.Column
                    dataIndex="name"
                    title="Name"
                    filterDropdown={(props) => (
                        <FilterDropdown {...props}>
                            <Input placeholder="Search by name" />
                        </FilterDropdown>
                    )}
                />
                <Table.Column
                    dataIndex="price"
                    title="Price"
                    sorter={{ multiple: 1 }}
                />
            </Table>
        </div>
    );
};

interface IProduct {
    id: number;
    name: string;
    price: string;
    material: string;
}


`.trim();
