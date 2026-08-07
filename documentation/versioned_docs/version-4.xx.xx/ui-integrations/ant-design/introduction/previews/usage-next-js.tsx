import React from "react";
import { Sandpack } from "@site/src/components/sandpack";

export default function UsageNextjs() {
  return (
    <Sandpack
      showNavigator
      hidePreview
      showFiles
      dependencies={{
        "@refinedev/antd": "latest",
        "@refinedev/core": "latest",
        "@refinedev/simple-rest": "latest",
        "@refinedev/nextjs-router": "latest",
        antd: "^5.0.5",
      }}
      // template="nextjs"
      startRoute="/products"
      files={{
        "/pages/_app.tsx": {
          code: AppTsxCode,
          active: true,
        },
        "/pages/products/index.tsx": {
          code: ListTsxCode,
        },
        "/pages/products/[id].tsx": {
          code: ShowTsxCode,
        },
        "/pages/products/[id]/edit.tsx": {
          code: EditTsxCode,
        },
        "/pages/products/create.tsx": {
          code: CreateTsxCode,
        },
        "/pages/login.tsx": {
          code: LoginTsxCode,
        },
        "/src/auth-provider.tsx": {
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

const LoginTsxCode = /* jsx */ `
import React from "react";
import { AuthPage } from "@refinedev/antd";
import authProvider from "../src/auth-provider";

import type { ExtendedNextPage } from "./_app";

const Login: ExtendedNextPage = () => {
  return <AuthPage type="login" />;
};

Login.noLayout = true;

export default Login;

/**
 * Same check can also be done via \`<Authenticated />\` component.
 * But we're using a server-side check for a better UX.
 */
export const getServerSideProps = async () => {
  const { authenticated } = await authProvider.check();

  if (authenticated) {
    return {
      redirect: {
        destination: "/products",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
`.trim();

const AppTsxCode = /* jsx */ `
import React from "react";

import { Refine } from "@refinedev/core";
import routerProvider from "@refinedev/nextjs-router/pages";
import dataProvider from "@refinedev/simple-rest";
import type { AppProps } from "next/app";

import { RefineThemes, ThemedLayoutV2, useNotificationProvider } from "@refinedev/antd";
import { App as AntdApp, ConfigProvider } from "antd";

import "@refinedev/antd/dist/reset.css";

import authProvider from "../src/auth-provider";

export type ExtendedNextPage = NextPage & {
  noLayout?: boolean;
};

type ExtendedAppProps = AppProps & {
  Component: ExtendedNextPage;
};

function App({ Component, pageProps }: ExtendedAppProps) {
  const renderComponent = () => {
      if (Component.noLayout) {
          return <Component {...pageProps} />;
      }

      return (
          <ThemedLayoutV2>
              <Component {...pageProps} />
          </ThemedLayoutV2>
      );
  }

  return (
    <ConfigProvider theme={RefineThemes.Blue}>
      <AntdApp>
        <Refine
          routerProvider={routerProvider}
          dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
          notificationProvider={useNotificationProvider}
          authProvider={authProvider}
          resources={[
            {
              name: "products",
              list: "/products",
              show: "/products/:id",
              edit: "/products/:id/edit",
              create: "/products/create"
            },
          ]}
          options={{ syncWithLocation: true }}
        >
          {renderComponent()}
        </Refine>
      </AntdApp>
    </ConfigProvider>
  );
}

export default App;
`.trim();

const ListTsxCode = /* jsx */ `
import React from "react";
import { List, ShowButton, EditButton, useTable } from "@refinedev/antd";
import { Space, Table } from "antd";

import authProvider from "../../src/auth-provider";

export default function ProductList() {
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

/**
 * Same check can also be done via \`<Authenticated />\` component.
 * But we're using a server-side check for a better UX.
 */
export const getServerSideProps = async () => {
  const { authenticated } = await authProvider.check();

  if (!authenticated) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
`.trim();

const ShowTsxCode = /* jsx */ `
import React from "react";
import { useShow } from "@refinedev/core";
import { MarkdownField, NumberField, Show, TextField } from "@refinedev/antd";
import { Typography } from "antd";

import authProvider from "../../src/auth-provider";

const { Title } = Typography;

export default function ProductShow() {
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

/**
 * Same check can also be done via \`<Authenticated />\` component.
 * But we're using a server-side check for a better UX.
 */
export const getServerSideProps = async () => {
  const { authenticated } = await authProvider.check();

  if (!authenticated) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
`.trim();

const EditTsxCode = /* jsx */ `
import React from "react";
import { Typography, Form, Input, InputNumber } from "antd";
import { Edit, useForm } from "@refinedev/antd";

import authProvider from "../../../src/auth-provider";

const { Title } = Typography;
const { TextArea } = Input;

export default function ProductEdit() {
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

/**
 * Same check can also be done via \`<Authenticated />\` component.
 * But we're using a server-side check for a better UX.
 */
export const getServerSideProps = async () => {
  const { authenticated } = await authProvider.check();

  if (!authenticated) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
`.trim();

const CreateTsxCode = /* jsx */ `
import React from "react";
import { Typography, Form, Input, InputNumber } from "antd";
import { Create, useForm } from "@refinedev/antd";

import authProvider from "../../src/auth-provider";

const { Title } = Typography;
const { TextArea } = Input;

export default function ProductCreate() {
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

/**
 * Same check can also be done via \`<Authenticated />\` component.
 * But we're using a server-side check for a better UX.
 */
export const getServerSideProps = async () => {
  const { authenticated } = await authProvider.check();

  if (!authenticated) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
`.trim();
