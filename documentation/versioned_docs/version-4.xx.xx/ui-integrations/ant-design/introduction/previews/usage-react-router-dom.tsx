import React from "react";
import { Sandpack } from "@site/src/components/sandpack";

export default function UsageReactRouterDom() {
  return (
    <Sandpack
      showNavigator
      hidePreview
      showFiles
      dependencies={{
        "@refinedev/antd": "latest",
        "@refinedev/core": "latest",
        "@refinedev/simple-rest": "latest",
        "@refinedev/react-router": "latest",
        "react-router": "^7.0.2",
        antd: "^5.0.5",
      }}
      startRoute="/products"
      files={{
        "/App.tsx": {
          code: AppTsxCode,
          active: true,
        },
        "/pages/products/index.tsx": {
          code: ProductsTsxCode,
        },
        "/pages/products/list.tsx": {
          code: ListTsxCode,
        },
        "/pages/products/show.tsx": {
          code: ShowTsxCode,
        },
        "/pages/products/edit.tsx": {
          code: EditTsxCode,
        },
        "/pages/products/create.tsx": {
          code: CreateTsxCode,
        },
        "/auth-provider.tsx": {
          code: AuthProviderTsxCode,
          hidden: true,
        },
      }}
    />
  );
}

const AuthProviderTsxCode = /* jsx */ `
const authProvider = {
    login: async ({ username, password }) => {
      (window as any).authenticated = true;
      return { success: true };
    },
    check: async () => {
      // auto login at first time
      if (typeof (window as any).authenticated === "undefined") {
        (window as any).authenticated = true;
      }
      return { authenticated: Boolean((window as any).authenticated) };
    },
    logout: async () => {
      (window as any).authenticated = false;
      return { success: true };
    },
    register: async () => {
      return { success: true };
    },
    forgotPassword: async () => {
      return { success: true };
    },
    resetPassword: async () => {
      return { success: true };
    },
    getIdentity: async () => ({ id: 1, name: "John Doe", avatar: "https://i.pravatar.cc/300"})
};

export default authProvider;
`.trim();

const AppTsxCode = /* jsx */ `
import { Refine, Authenticated } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";
import routerProvider, { NavigateToResource } from "@refinedev/react-router";
import { BrowserRouter, Route, Routes, Outlet, Navigate } from "react-router";

import { ErrorComponent, RefineThemes, ThemedLayoutV2, useNotificationProvider, AuthPage } from "@refinedev/antd";
import { App as AntdApp, ConfigProvider } from "antd";

import authProvider from "./auth-provider";

import "@refinedev/antd/dist/reset.css";

import { ProductList, ProductShow, ProductEdit, ProductCreate } from "./pages/products";

export default function App() {
  return (
    <BrowserRouter>
      <ConfigProvider theme={RefineThemes.Blue}>
        <AntdApp>
          <Refine
            routerProvider={routerProvider}
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            authProvider={authProvider}
            notificationProvider={useNotificationProvider}
            resources={[
              {
                name: "products",
                list: "/products",
                show: "/products/:id",
                edit: "/products/:id/edit",
                create: "/products/create"
              }
            ]}
            options={{ syncWithLocation: true }}
          >
            <Routes>
              <Route element={<Authenticated fallback={<Navigate to="/login" />}><Outlet /></Authenticated>}>
                <Route
                  element={
                    <ThemedLayoutV2>
                      <Outlet />
                    </ThemedLayoutV2>
                  }
                >
                  <Route path="/products" element={<Outlet />}>
                      <Route index element={<ProductList />} />
                      <Route path="create" element={<ProductCreate />} />
                      <Route path=":id" element={<ProductShow />} />
                      <Route path=":id/edit" element={<ProductEdit />} />
                  </Route>
                  <Route path="*" element={<ErrorComponent />} />
                </Route>
              </Route>
              <Route element={<Authenticated fallback={<Outlet />}><NavigateToResource resource="products" /></Authenticated>}>
                <Route path="/login" element={<AuthPage type="login" />} />
                <Route path="/register" element={<AuthPage type="register" />} />
                <Route path="/forgot-password" element={<AuthPage type="forgotPassword" />} />
                <Route path="/reset-password" element={<AuthPage type="resetPassword" />} />
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

const ProductsTsxCode = /* jsx */ `
export * from "./list";
export * from "./show";
export * from "./edit";
export * from "./create";
`.trim();

const ListTsxCode = /* jsx */ `
import React from "react";
import { List, ShowButton, EditButton, useTable } from "@refinedev/antd";
import { Space, Table } from "antd";

export const ProductList = () => {
  const { tableProps } = useTable();

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="Id" />
        <Table.Column dataIndex="name" title="Name" />
        <Table.Column dataIndex="price" title="Price" />
        <Table.Column
          title="Actions"
          dataIndex="actions"
          render={(_, record: BaseRecord) => (
            <Space>
              <ShowButton hideText size="small" recordItemId={record.id} />
              <EditButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
`.trim();

const ShowTsxCode = /* jsx */ `
import React from "react";
import { useShow } from "@refinedev/core";
import { MarkdownField, NumberField, Show, TextField } from "@refinedev/antd";
import { Typography } from "antd";

const { Title } = Typography;

export const ProductShow = () => {
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>Id</Title>
      <NumberField value={record?.id ?? ""} />
      <Title level={5}>Name</Title>
      <TextField value={record?.name} />
      <Title level={5}>Material</Title>
      <TextField value={record?.material} />
      <Title level={5}>Description</Title>
      <MarkdownField value={record?.description} />
      <Title level={5}>Price</Title>
      <NumberField value={record?.price ?? ""} />
    </Show>
  );
};
`.trim();

const EditTsxCode = /* jsx */ `
import React from "react";
import { Typography, Form, Input, InputNumber } from "antd";
import { Edit, useForm } from "@refinedev/antd";

const { Title } = Typography;
const { TextArea } = Input;

export const ProductEdit = () => {
  const { formProps, saveButtonProps, formLoading } = useForm();

  return (
    <Edit saveButtonProps={saveButtonProps} isLoading={formLoading}>
      <Form {...formProps} layout="vertical">
          <Form.Item
              label="Name"
              name="name"
              rules={[
                  {
                      required: true,
                  },
              ]}
          >
              <Input />
          </Form.Item>
          <Form.Item
              label="Material"
              name="material"
              rules={[
                  {
                      required: true,
                  },
              ]}
          >
              <Input />
          </Form.Item>
          <Form.Item
              label="Description"
              name="description"
              rules={[
                  {
                      required: true,
                  },
              ]}
          >
              <TextArea rows={4} />
          </Form.Item>
          <Form.Item
              label="Price"
              name="price"
              rules={[
                  {
                      required: true,
                  },
              ]}
          >
              <InputNumber />
          </Form.Item>
      </Form>
  </Edit>
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
  const { formProps, saveButtonProps, formLoading } = useForm();

  return (
    <Create saveButtonProps={saveButtonProps} isLoading={formLoading}>
      <Form {...formProps} layout="vertical">
        <Form.Item
            label="Name"
            name="name"
            rules={[
                {
                    required: true,
                },
            ]}
        >
            <Input />
        </Form.Item>
        <Form.Item
            label="Material"
            name="material"
            rules={[
                {
                    required: true,
                },
            ]}
        >
            <Input />
        </Form.Item>
        <Form.Item
            label="Description"
            name="description"
            rules={[
                {
                    required: true,
                },
            ]}
        >
            <TextArea rows={4} />
        </Form.Item>
        <Form.Item
            label="Price"
            name="price"
            rules={[
                {
                    required: true,
                },
            ]}
        >
            <InputNumber />
        </Form.Item>
      </Form>
    </Create>
  );
};
`.trim();
