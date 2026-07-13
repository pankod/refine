---
id: appwrite
title: Appwrite
---

## What is Multitenancy?

Multitenancy refers to a kind of architecture where a single instance of software runs on a server and serves multiple customers. In a multi-tenant environment, separate customers tap into the same hardware and data storage, creating a dedicated instance for each customer. Each tenant’s data is isolated and remains invisible to others, but is running on the same server.

## Introduction

In this guide, we will create an application with you in the logic of Multi Tenant(Multitenancy). We can say multi tenant application is separate and manage multiple contents independently from each other in a single application.

We will make a Cake House application using **refine** and [Appwrite](https://appwrite.io/). Our Cake House will consist of two separate stores and there will be special products for these stores. We will explain step by step how to manage these stores, products, and orders separately.

:::caution
This guide has been prepared to assume you know the basics of **refine**. If you haven't learned these basics yet, we recommend reading the [Tutorial](https://refine.dev/core/docs/).
:::

## Setup

<InstallPackagesCommand args="@pankod/refine-appwrite"/>

:::caution
To make this example more visual, we used the [`@pankod/refine-antd`](https://github.com/refinedev/refine/tree/v3/packages/refine-antd) package. If you are using Refine headless, you need to provide the components, hooks, or helpers imported from the [`@pankod/refine-antd`](https://github.com/refinedev/refine/tree/v3/packages/refine-antd) package.
:::

## Usage

```tsx
import { Refine } from "@pankod/refine-core";
import {
  Layout,
  ReadyPage,
  useNotificationProvider,
  ErrorComponent,
} from "@pankod/refine-antd";
import { dataProvider } from "@pankod/refine-appwrite";
import routerProvider from "@pankod/refine-react-router-v6";

import "@pankod/refine-antd/dist/reset.css";

import { appwriteClient } from "utility";
import { authProvider } from "./authProvider";

const App: React.FC = () => {
  return (
    <Refine
      //highlight-start
      dataProvider={dataProvider(appwriteClient)}
      authProvider={authProvider}
      //highlight-end
      routerProvider={routerProvider}
      Layout={Layout}
      ReadyPage={ReadyPage}
      notificationProvider={useNotificationProvider}
      catchAll={<ErrorComponent />}
    />
  );
};
```

## Create Collections

We need three collections for our Cake House application. Let's create these collections in the appwrite database.

:::info
[Check out how you can create collections with refine Appwrite guide →](#)
:::

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/guides-and-concepts/multi-tenant/appwrite/collections.png" alt="Collections" />
<br/>

`stores`

- Title: text

`products`

- Title: text
- Description: text
- Image: text
- StoreId: text

`orders`

- ProductId: text
- Customer Name: text
- Customer Address: text
- Status: text
- Quantitiy: numeric
- StoreId: text

Now that we have completed the setup and our collections, we can now log in with the **refine** and start the listing processes.

## Store Context

To view the products and orders of two different stores separately, we need to filter by `storeId`. We will use the `storeId` information in more than one place. For example, when creating a store-specific order.

For this reason, we will create a [React Context](https://en.reactjs.org/docs/context.html) and keep the `storeId` state information in it and send it to the relevant **refine** components.

```tsx
import { createContext, useState } from "react";

export const StoreContext = createContext<any[]>([]);

export const StoreProvider = (props: any) => {
  const [store, setStore] = useState("61cdb05132609");

  return <StoreContext.Provider value={[store, setStore]} {...props} />;
};
```

```tsx title="App.tsx"
import { Refine } from "@pankod/refine-core";
import { Layout, ReadyPage, useNotificationProvider, ErrorComponent } from "@pankod/refine-antd";
import { dataProvider } from "@pankod/refine-appwrite";
import routerProvider from "@pankod/refine-react-router-v6";

import "@pankod/refine-antd/dist/reset.css";

import { appwriteClient } from "utility";
import { authProvider } from "./authProvider";

import { StoreProvider } from "context/store";

const App: React.FC = () => {
    return (
          //highlight-start
        <StoreProvider>
            <Refine
                dataProvider={dataProvider(appwriteClient)}
                authProvider={authProvider}
                routerProvider={routerProvider}
                Layout={Layout}
                ReadyPage={ReadyPage}
                notificationProvider={useNotificationProvider}
                catchAll={<ErrorComponent />}
            />
        <StoreProvider>
         //highlight-end
    );
};
```

## Shop Select to Sider Component

We will create a select component in the Sider Menu where the user will select the stores. Let's create our select component first, then let's see how we can define it in the **refine** Sider.

```tsx title="scr/components/select/StoreSelect.tsx"
import { useContext } from "react";
import { Select, useSelect } from "@pankod/refine-antd";

import { StoreContext } from "context/store";
import { IStore } from "interfaces";


export const StoreSelect: React.FC = ({ onSelect }) => {
    //highlight-start
    const [store, setStore] = useContext(StoreContext);
    //highlight-end

    const { selectProps: storeSelectProps } = useSelect<IStore>({
        resource: "61cd62db95f92",
        optionLabel: "title",
        optionValue: "id",
    });

    //highlight-start
    const handleChange = (selectedValue: string) => {
        setStore(selectedValue);
    };
    //highlight-end

    return (
        <Select
            defaultValue={store}
            style={{ width: 130 }}
            onChange={handleChange}
            onSelect={() => false)}
        >
            {storeSelectProps.options?.map(({ value, label }) => (
                <Select.Option key={value} value={value}>
                    {label}
                </Select.Option>
            ))}
        </Select>
    );
};
```

Here we have created a select component. Then we fetch the store id and title we created in the Appwrite database with `useSelect`. Now we can place the store information we have in the state we created in the Store Context.

Let's define the select component in the **refine** Sider Menu. First, we need to customize the default Sider.

[Check out how you can customize Sider Menu →](https://refine.dev/docs/3.xx.xx/examples/customization/customSider/)

<details>
<summary>Show Code</summary>
<p>

```tsx title="src/components/sider/CustomSider.tsx"
import React, { useState } from "react";
import {
  useTitle,
  useMenu,
  ITreeMenu,
  CanAccess,
  useRouterContext,
} from "@pankod/refine-core";
import { AntdLayout, Menu, Grid, Icons } from "@pankod/refine-antd";
import { antLayoutSider, antLayoutSiderMobile } from "./styles";

import { StoreSelect } from "components/select";

export const CustomSider: React.FC = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const { Link } = useRouterContext();
  const Title = useTitle();
  const { SubMenu } = Menu;
  const { menuItems, selectedKey } = useMenu();
  const breakpoint = Grid.useBreakpoint();

  const isMobile =
    typeof breakpoint.lg === "undefined" ? false : !breakpoint.lg;

  const renderTreeView = (tree: ITreeMenu[], selectedKey: string) => {
    return tree.map((item: ITreeMenu) => {
      const { icon, label, route, name, children, parentName } = item;

      if (children.length > 0) {
        return (
          <SubMenu
            key={name}
            icon={icon ?? <Icons.UnorderedListOutlined />}
            title={label}
          >
            {renderTreeView(children, selectedKey)}
          </SubMenu>
        );
      }
      const isSelected = route === selectedKey;
      const isRoute = !(parentName !== undefined && children.length === 0);
      return (
        <CanAccess key={route} resource={name.toLowerCase()} action="list">
          <Menu.Item
            key={route}
            style={{
              fontWeight: isSelected ? "bold" : "normal",
            }}
            icon={icon ?? (isRoute && <Icons.UnorderedListOutlined />)}
          >
            <Link to={route}>{label}</Link>
            {!collapsed && isSelected && (
              <div className="ant-menu-tree-arrow" />
            )}
          </Menu.Item>
        </CanAccess>
      );
    });
  };

  return (
    <AntdLayout.Sider
      collapsible
      collapsedWidth={isMobile ? 0 : 80}
      collapsed={collapsed}
      breakpoint="lg"
      onCollapse={(collapsed: boolean): void => setCollapsed(collapsed)}
      style={isMobile ? antLayoutSiderMobile : antLayoutSider}
    >
      <Title collapsed={collapsed} />
      <Menu
        selectedKeys={[selectedKey]}
        mode="inline"
        onClick={() => {
          if (!breakpoint.lg) {
            setCollapsed(true);
          }
        }}
      >
        //highlight-start
        <Menu.Item key={"/"} icon={<Icons.AppstoreAddOutlined />}>
          <StoreSelect />
        </Menu.Item>
        //highlight-end
        {renderTreeView(menuItems, selectedKey)}
      </Menu>
    </AntdLayout.Sider>
  );
};
```

</p>
</details>

|             <img src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/guides-and-concepts/multi-tenant/appwrite/sider.png" alt="sider" />              |
| :----------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| _As you can see, you can now choose the store you want and create products and orders specifically for the store we have chosen according to the `storeId` information._ |

## Product List Page

Now we can list the products of the selected store according to the `storeId` information by filtering it. We can do this filtering by using the `permanetFilter` property within the **refine**'s `useSimpleList` hook.

We separate the products of different stores by using the `permanentFilter` with the `storeId` we get from the Store Context. So we can control more than single content in one application.

```tsx
//highlight-start
const [store] = useContext(StoreContext);
//highlight-end
const { listProps } = useSimpleList<IProduct>({
  //highlight-start
  permanentFilter: [{ field: "storeId", operator: "eq", value: store }],
  //highlight-end
});
```

<details>
<summary>Show Code</summary>
<p>

```tsx title="src/pages/ProductList.tsx"
import { useContext } from "react";
import { IResourceComponentsProps } from "@pankod/refine-core";
import {
  useSimpleList,
  AntdList,
  useModalForm,
  useDrawerForm,
  CreateButton,
  List,
} from "@pankod/refine";

import { IProduct } from "interfaces";
import { ProductItem } from "components/product";
import { StoreContext } from "context/store";

export const ProductList: React.FC<IResourceComponentsProps> = () => {
  //highlight-start
  const [store] = useContext(StoreContext);
  const { listProps } = useSimpleList<IProduct>({
    permanentFilter: [{ field: "storeId", operator: "eq", value: store }],
  });
  //highlight-end

  return (
    <>
      <List
        headerProps={{
          extra: <CreateButton onClick={() => createShow()} />,
        }}
      >
        <AntdList
          grid={{ gutter: 16, xs: 1 }}
          style={{
            justifyContent: "center",
          }}
          {...listProps}
          renderItem={(item) => (
            <AntdList.Item>
              <ProductItem item={item} editShow={editShow} />
            </AntdList.Item>
          )}
        />
      </List>
    </>
  );
};
```

</p>
</details>

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/guides-and-concepts/multi-tenant/appwrite/store-filter.gif" alt="Store Filter" />
<br/>

## Product Create Page

Now let's see how we can create store-specific products. Which store we choose in Sider, the product we will create will automatically be the product of the selected store.

By overriding the `onFinish` method of the `form` and sending the selected `storeId`, we specify which store it will be the product of.

```tsx
//highlight-start
const [store] = useContext(StoreContext);
// highlight-end

<Form
    {...formProps}
    ...
     //highlight-start
    onFinish={(values) => {
        return (
            formProps.onFinish?.({
                ...values,
                storeId: store,
            })
        );
    }}
    //highlight-end
>
...
```

<details>
<summary>Show Code</summary>
<p>

```tsx title="CreateProduct"
import { useContext } from "react";
import {
  Create,
  Drawer,
  DrawerProps,
  Form,
  FormProps,
  Input,
  ButtonProps,
  Upload,
  Grid,
  RcFile,
} from "@pankod/refine-antd";

import { appwriteClient, normalizeFile } from "utility";
import { StoreContext } from "context/store";

type CreateProductProps = {
  drawerProps: DrawerProps;
  formProps: FormProps;
  saveButtonProps: ButtonProps;
};

export const CreateProduct: React.FC<CreateProductProps> = ({
  drawerProps,
  formProps,
  saveButtonProps,
}) => {
  const breakpoint = Grid.useBreakpoint();
  //highlight-start
  const [store, setStore] = useContext(StoreContext);
  // highlight-end

  return (
    <Drawer
      {...drawerProps}
      width={breakpoint.sm ? "500px" : "100%"}
      bodyStyle={{ padding: 0 }}
    >
      <Create saveButtonProps={saveButtonProps}>
        <Form
          {...formProps}
          layout="vertical"
          initialValues={{
            isActive: true,
          }}
          //highlight-start
          onFinish={(values) => {
            return formProps.onFinish?.({
              ...values,
              storeId: store,
              image: JSON.stringify(values.image),
            });
          }}
          //highlight-end
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input />
          </Form.Item>

          <Form.Item label="Images">
            <Form.Item
              name="image"
              valuePropName="fileList"
              normalize={normalizeFile}
              noStyle
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Upload.Dragger
                name="file"
                listType="picture"
                multiple
                customRequest={async ({ file, onError, onSuccess }) => {
                  try {
                    const rcFile = file as RcFile;

                    const { $id } = await appwriteClient.storage.createFile(
                      "default",
                      rcFile.name,
                      rcFile,
                      ["role:all"],
                      ["role:all"],
                    );

                    const url = appwriteClient.storage.getFileView(
                      "default",
                      $id,
                    );

                    onSuccess?.({ url }, new XMLHttpRequest());
                  } catch (error) {
                    onError?.(new Error("Upload Error"));
                  }
                }}
              >
                <p className="ant-upload-text">
                  Drag &amp; drop a file in this area
                </p>
              </Upload.Dragger>
            </Form.Item>
          </Form.Item>
        </Form>
      </Create>
    </Drawer>
  );
};
```

</p>
</details>

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/guides-and-concepts/multi-tenant/appwrite/create.gif" alt="create" />
<br/>

## Bonus - Realtime Feature

**refine** lets you add Realtime support to your app via `liveProvider` prop for [`<Refine>`](/core/docs/3.xx.xx/api-reference/core/components/refine-config). It can be used to update and show data in Realtime throughout your app. **refine** remains agnostic in its API to allow different solutions([Ably](https://ably.com), [Socket.IO](https://socket.io/), [Mercure](https://mercure.rocks/), [supabase](https://supabase.com), etc.) to be integrated.

[Refer to the Live Provider documentation for detailed information. →](https://refine.dev/core/docs/core/providers/live-provider/)

Appwrite Realtime API support is out-of-the-box supported by **refine**, just add two lines to make your App Realtime.

```tsx
import { Refine } from "@pankod/refine-core";
import {
  Layout,
  ReadyPage,
  useNotificationProvider,
  ErrorComponent,
} from "@pankod/refine-antd";
import { dataProvider, liveProvider } from "@pankod/refine-appwrite";
import routerProvider from "@pankod/refine-react-router-v6";

import "@pankod/refine-antd/dist/reset.css";

import { appwriteClient } from "utility";
import { authProvider } from "./authProvider";

import { CustomSider } from "components/sider";
import { Login } from "pages/login";
import { ProductList } from "pages/products";
import { ProductShow } from "components/product";
import { StoreProvider } from "context/store";

function App() {
  return (
    <StoreProvider>
      <Refine
        routerProvider={routerProvider}
        //highlight-start
        liveProvider={liveProvider(appwriteClient)}
        options={{ liveMode: "auto" }}
        //highlight-end
        dataProvider={dataProvider(appwriteClient)}
        authProvider={authProvider}
        LoginPage={Login}
        Sider={CustomSider}
        resources={[
          {
            name: "61cb01b17ef57",
            list: ProductList,
            show: ProductShow,
            options: {
              label: "Products",
              route: "products",
            },
          },
        ]}
        Layout={Layout}
        ReadyPage={ReadyPage}
        notificationProvider={useNotificationProvider}
        catchAll={<ErrorComponent />}
      />
    </StoreProvider>
  );
}

export default App;
```

## Conclusion

In this guide and in our example app, we talked about how we can build Multitenancy apps with **refine**. Developing a Multitenancy application with **refine** is quite simple. By creating a context and with the hooks that **refine** provides, you can quickly and easily produce similar applications in this logic.

## Example

<CodeSandboxExample path="multi-tenancy-appwrite" />
