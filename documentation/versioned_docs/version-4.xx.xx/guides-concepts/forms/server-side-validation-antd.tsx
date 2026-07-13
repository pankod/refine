import { Sandpack } from "@site/src/components/sandpack";
import React from "react";

export default function ServerSideValidationAntd() {
  return (
    <Sandpack
      height={460}
      showOpenInCodeSandbox={false}
      dependencies={{
        "@refinedev/antd": "latest",
        "@refinedev/core": "latest",
        "@refinedev/simple-rest": "latest",
        "@refinedev/react-router": "latest",
        "react-router": "^7.0.2",
        antd: "^5.0.5",
      }}
      startRoute="/products/create"
      files={{
        "/App.tsx": {
          code: AppTsxCode,
          hidden: true,
        },
        "/data-provider.tsx": {
          code: DataProviderTsxCode,
          active: true,
        },
        "/create.tsx": {
          code: CreateTsxCode,
        },
      }}
    />
  );
}

const DataProviderTsxCode = /* jsx */ `
import type { HttpError } from "@refinedev/core";
import baseDataProvider from "@refinedev/simple-rest";

const dataProvider = {
    ...baseDataProvider("https://api.fake-rest.refine.dev"),
    create: async () => {
        // For demo purposes, we're hardcoding the error response.
        // In a real-world application, the error of the server should match the \`HttpError\` interface
        // or should be transformed to match it.
        return Promise.reject({
            message: "This is an error from the server",
            statusCode: 400,
            errors: {
                name: "Name should be at least 3 characters long",
                material: "Material should start with a capital letter",
                description: "Description should be at least 10 characters long",
            },
        } as HttpError);
    }
};

export default dataProvider;
`.trim();

const AppTsxCode = /* jsx */ `
import React from "react";

import { Refine, Authenticated } from "@refinedev/core";
import routerProvider, { NavigateToResource } from "@refinedev/react-router";
import { BrowserRouter, Route, Routes, Outlet, Navigate } from "react-router";

import { ErrorComponent, RefineThemes, ThemedLayoutV2, useNotificationProvider, AuthPage } from "@refinedev/antd";
import { App as AntdApp, ConfigProvider } from "antd";

import dataProvider from "./data-provider";

import "@refinedev/antd/dist/reset.css";

import { ProductShow } from "./show";
import { ProductCreate } from "./create";

export default function App() {
  return (
    <BrowserRouter>
      <ConfigProvider theme={RefineThemes.Blue}>
        <AntdApp>
          <Refine
            routerProvider={routerProvider}
            dataProvider={dataProvider}
            notificationProvider={useNotificationProvider}
            resources={[
              {
                name: "products",
                create: "/products/create"
              }
            ]}
            options={{ mutationMode: "pessimistic", syncWithLocation: true, redirect: { afterCreate: false } }}
          >
            <Routes>
                <Route
                    element={
                    <ThemedLayoutV2>
                        <Outlet />
                    </ThemedLayoutV2>
                    }
                >
                    <Route path="/products" element={<Outlet />}>
                        <Route path="create" element={<ProductCreate />} />
                    </Route>
                    <Route path="*" element={<ErrorComponent />} />
                </Route>
            </Routes>
          </Refine>
        </AntdApp>
      </ConfigProvider>
    </BrowserRouter>
  );
};
`.trim();

const CreateTsxCode = /* jsx */ `
import React from "react";
import { Typography, Form, Input, InputNumber } from "antd";
import { Create, useForm } from "@refinedev/antd";

const { Title } = Typography;
const { TextArea } = Input;

export const ProductCreate = () => {
  const { formProps, saveButtonProps } = useForm({ redirect: "show" });

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item  
            label="Name"
            name="name"
        >
            <Input />
        </Form.Item>
        <Form.Item
            label="Material"
            name="material"
        >
            <Input />
        </Form.Item>
        <Form.Item
            label="Description"
            name="description"
        >
            <TextArea rows={2} />
        </Form.Item>
      </Form>
    </Create>
  );
};
`.trim();
