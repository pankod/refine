---
title: "Appwrite Integration for Refine v4 | Backend Guide"
display_title: "Appwrite"
sidebar_label: "Appwrite"
description: "Integrate Appwrite with Refine v4. Set up the data provider for authentication, database management, and file storage in your React apps."
source: https://github.com/refinedev/refine/tree/main/packages/appwrite
swizzle: true
---

```tsx live shared
import { Appwrite } from "@refinedev/appwrite";
const APPWRITE_URL = "https://refine.appwrite.org/v1";
const APPWRITE_PROJECT = "61c4368b4e349";
const appwriteClient = new Appwrite();
appwriteClient.setEndpoint(APPWRITE_URL).setProject(APPWRITE_PROJECT);

window.__refineAuthStatus = false;

const authProvider = {
  login: () => {
    window.__refineAuthStatus = true;
    return {
      success: true,
      redirectTo: "/",
    };
  },
  register: async () => {
    return {
      success: true,
    };
  },
  forgotPassword: async () => {
    return {
      success: true,
    };
  },
  updatePassword: async () => {
    return {
      success: true,
    };
  },
  logout: async () => {
    window.__refineAuthStatus = false;
    return {
      success: true,
      redirectTo: "/",
    };
  },
  check: async () => {
    return {
      authenticated: window.__refineAuthStatus ? true : false,
      redirectTo: window.__refineAuthStatus ? undefined : "/login",
    };
  },
  onError: async (error) => {
    console.error(error);
    return { error };
  },
  getPermissions: async () => null,
  getIdentity: async () => null,
};

import {
  useMany as CoreUseMany,
  useShow as RefineCoreUseShow,
  useOne as RefineCoreUseOne,
} from "@refinedev/core";
import {
  List as RefineAntdList,
  TextField as RefineAntdTextField,
  useTable as RefineAntdUseTable,
  EditButton as RefineAntdEditButton,
  ShowButton as RefineAntdShowButton,
  getDefaultSortOrder as RefineAntdGetDefaultSortOrder,
  useForm as RefineAntdUseForm,
  useSelect as RefineAntdUseSelect,
  Create as RefineAntdCreate,
  Show as RefineAntdShow,
} from "@refinedev/antd";
import {
  Table as AntdTable,
  Space as AntdSpace,
  Form as AntdForm,
  Select as AntdSelect,
  Input as AntdInput,
  Typography as AntdTypography,
} from "antd";

const PostList: React.FC = () => {
  const { tableProps, sorter } = RefineAntdUseTable<IPost>({
    sorters: {
      initial: [
        {
          field: "$id",
          order: "asc",
        },
      ],
    },
  });

  const categoryIds =
    tableProps?.dataSource?.map((item) => item.categoryId) ?? [];
  const { data, isLoading } = CoreUseMany<ICategory>({
    resource: "61c43adc284ac",
    ids: categoryIds,
    queryOptions: {
      enabled: categoryIds.length > 0,
    },
  });

  return (
    <RefineAntdList>
      <AntdTable {...tableProps} rowKey="id">
        <AntdTable.Column
          dataIndex="id"
          title="ID"
          sorter
          defaultSortOrder={RefineAntdGetDefaultSortOrder("id", sorter)}
        />
        <AntdTable.Column dataIndex="title" title="Title" sorter />
        <AntdTable.Column
          dataIndex="categoryId"
          title="Category"
          render={(value) => {
            if (isLoading) {
              return <RefineAntdTextField value="Loading..." />;
            }

            return (
              <RefineAntdTextField
                value={data?.data.find((item) => item.id === value)?.title}
              />
            );
          }}
        />
        <AntdTable.Column<IPost>
          title="Actions"
          dataIndex="actions"
          render={(_, record) => (
            <AntdSpace>
              <RefineAntdEditButton
                hideText
                size="small"
                recordItemId={record.id}
              />
              <RefineAntdShowButton
                hideText
                size="small"
                recordItemId={record.id}
              />
            </AntdSpace>
          )}
        />
      </AntdTable>
    </RefineAntdList>
  );
};

const PostCreate: React.FC = () => {
  const { formProps, saveButtonProps } = RefineAntdUseForm<IPost>();

  const { selectProps: categorySelectProps } = RefineAntdUseSelect<ICategory>({
    resource: "61bc4afa9ee2c",
    optionLabel: "title",
    optionValue: "id",
  });

  return (
    <RefineAntdCreate saveButtonProps={saveButtonProps}>
      <AntdForm {...formProps} layout="vertical">
        <AntdForm.Item
          label="Title"
          name="title"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <AntdInput />
        </AntdForm.Item>
        <AntdForm.Item
          label="Category"
          name="categoryId"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <AntdSelect {...categorySelectProps} />
        </AntdForm.Item>
        <AntdForm.Item
          label="Content"
          name="content"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <AntdInput.TextArea />
        </AntdForm.Item>
      </AntdForm>
    </RefineAntdCreate>
  );
};

const PostEdit: React.FC = () => {
  const { formProps, saveButtonProps, query } = RefineAntdUseForm<IPost>();

  const postData = query?.data?.data;
  const { selectProps: categorySelectProps } = RefineAntdUseSelect<ICategory>({
    defaultValue: postData?.categoryId,
    resource: "61c43adc284ac",
    optionLabel: "title",
    optionValue: "id",
  });

  return (
    <RefineAntdCreate saveButtonProps={saveButtonProps}>
      <AntdForm {...formProps} layout="vertical">
        <AntdForm.Item
          label="Title"
          name="title"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <AntdInput />
        </AntdForm.Item>
        <AntdForm.Item
          label="Category"
          name="categoryId"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <AntdSelect {...categorySelectProps} />
        </AntdForm.Item>
        <AntdForm.Item
          label="Content"
          name="content"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <AntdInput.TextArea />
        </AntdForm.Item>
      </AntdForm>
    </RefineAntdCreate>
  );
};

const PostShow: React.FC = () => {
  const { queryResult } = RefineCoreUseShow<IPost>();
  const { data, isLoading } = queryResult;
  const record = data?.data;

  const { data: categoryData, isLoading: categoryIsLoading } =
    RefineCoreUseOne<ICategory>({
      resource: "categories",
      id: record?.category?.id || "",
      queryOptions: {
        enabled: !!record,
      },
    });

  return (
    <RefineAntdShow isLoading={isLoading}>
      <AntdTypography.Title level={5}>Id</AntdTypography.Title>
      <AntdTypography.Text>{record?.id}</AntdTypography.Text>

      <AntdTypography.Title level={5}>
        AntdTypography.Title
      </AntdTypography.Title>
      <AntdTypography.Text>{record?.title}</AntdTypography.Text>

      <AntdTypography.Title level={5}>Category</AntdTypography.Title>
      <AntdTypography.Text>
        {categoryIsLoading ? "Loading..." : categoryData?.data.title}
      </AntdTypography.Text>

      <AntdTypography.Title level={5}>Content</AntdTypography.Title>
      <AntdTypography.Text>{record?.content}</AntdTypography.Text>
    </RefineAntdShow>
  );
};
```

Refine provides a data provider for [Appwrite](https://appwrite.io/), a backend as a service platform, to build CRUD applications.

:::simple Good to know

- `@refinedev/appwrite` requires Appwrite version >= 1.0
- To learn more about data fetching in Refine, check out the [Data Fetching](/core/docs/guides-concepts/data-fetching) guide.
- To learn more about realtime features of Refine, check out the [Realtime](/core/docs/guides-concepts/realtime) guide.
- Example below uses `@refinedev/antd` as the UI library but Refine is UI agnostic and you can use any UI library you want.

:::

## Installation

<InstallPackagesCommand args="@refinedev/appwrite"/>

## Usage

First, we'll create our Appwrite client and use it in our `dataProvider`, `authProvider` and `liveProvider`.

import Usage from "./usage.tsx";

<Usage />

## Create Collections

We created two collections on Appwrite Database as `posts` and `categories` and added a relation between them.

<Tabs>

<TabItem value="category" label="Category Collection">

`Category Collection`:

- Title: text

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/guides-and-concepts/data-provider/appwrite/category.png" alt="category" />

</TabItem>

<TabItem value="post" label="Post Collection">

`Post Collection`:

- Title: text
- CategoryId: text
- Content: text
- Images: wildcard

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/guides-and-concepts/data-provider/appwrite/posts.png" alt="posts" />

</TabItem>

<TabItem value="auth" label="Authentication">

Then we need to create an appwrite user to be able to login with Refine.

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/guides-and-concepts/data-provider/appwrite/user.png" alt="user" />

</TabItem>

</Tabs>

### Permissions

In order to list posts and categories, you need to give read and write permission by Appwrite.

Example: `Post Collection Permissions`

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/guides-and-concepts/data-provider/appwrite/permission.png" alt="permission" />
<br/>

We indicate that the read and write permission is open to everyone by giving the "\*" parameter.

:::simple Related resources

- Check out Appwrite's [Permissions](https://appwrite.io/docs/permissions) documentation for detailed information.
- Check out how you can use permissions when [creating posts](#create-page) with Refine

:::

## Login page​

Before creating CRUD pages, let's create a login page. For this we use the [`AuthPage`](/core/docs/ui-integrations/ant-design/components/auth-page) component. This component returns ready-to-use authentication pages for `login`, `register`, `forgot password` and `update password` actions.

Below we see its implementation in the `App.tsx` file:

```tsx live hideCode url=http://localhost:5173
setInitialRoutes(["/"]);
// visible-block-start
// src/App.tsx

import { Refine, Authenticated } from "@refinedev/core";
import routerProvider, {
  CatchAllNavigate,
  NavigateToResource,
} from "@refinedev/react-router";
import { BrowserRouter, Routes, Route, Outlet } from "react-router";
import { dataProvider, liveProvider } from "@refinedev/appwrite";
import {
  ThemedLayoutV2,
  RefineThemes,
  useNotificationProvider,
  List,
  EditButton,
  ShowButton,
  useTable,
  AuthPage,
  ErrorComponent,
} from "@refinedev/antd";
import { ConfigProvider, Layout, Table, Space } from "antd";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ConfigProvider theme={RefineThemes.Blue}>
        <Refine
          dataProvider={dataProvider(appwriteClient, {
            databaseId: "default",
          })}
          liveProvider={liveProvider(appwriteClient, {
            databaseId: "default",
          })}
          authProvider={authProvider}
          routerProvider={routerProvider}
          resources={[
            {
              name: "61c43ad33b857",
              list: "/posts",
              create: "/posts/create",
              edit: "/posts/edit/:id",
              show: "/posts/show/:id",
              meta: {
                label: "Post",
              },
            },
          ]}
          notificationProvider={useNotificationProvider}
          options={{
            liveMode: "auto",
            syncWithLocation: true,
            warnWhenUnsavedChanges: true,
          }}
        >
          <Routes>
            <Route
              element={
                <Authenticated fallback={<CatchAllNavigate to="/login" />}>
                  <ThemedLayoutV2>
                    <Outlet />
                  </ThemedLayoutV2>
                </Authenticated>
              }
            >
              <Route
                index
                element={<NavigateToResource resource="61c43ad33b857" />}
              />

              <Route path="/posts">
                <Route index element={<PostList />} />
                <Route path="create" element={<PostCreate />} />
                <Route path="edit/:id" element={<PostEdit />} />
                <Route path="show/:id" element={<PostShow />} />
              </Route>
            </Route>

            {/* highlight-start */}
            <Route
              element={
                <Authenticated fallback={<Outlet />}>
                  <NavigateToResource resource="61c43ad33b857" />
                </Authenticated>
              }
            >
              <Route
                path="/login"
                element={
                  <AuthPage
                    type="login"
                    formProps={{
                      initialValues: {
                        email: "demo@refine.dev",
                        password: "demodemo",
                      },
                    }}
                  />
                }
              />
            </Route>

            <Route
              element={
                <Authenticated>
                  <ThemedLayoutV2>
                    <Outlet />
                  </ThemedLayoutV2>
                </Authenticated>
              }
            >
              <Route path="*" element={<ErrorComponent />} />
            </Route>
            {/* highlight-end */}
          </Routes>
        </Refine>
      </ConfigProvider>
    </BrowserRouter>
  );
};
// visible-block-end
render(<App />);
```

Now we can login with the user we created by Appwrite. We can then list, create and edit posts.

## List Page

:::tip

When defining your resources, `name` must match the Appwrite Collection ID. You can change the label with the resource meta.

```tsx
export const App = () => (
  <Refine
    // ...
    resources={[
      {
        //highlight-start
        name: "61bc3660648a6",
        //highlight-end
        meta: {
          //highlight-start
          label: "Post",
          //highlight-end
        },
      },
    ]}
  />
);
```

:::

Now that we've created our collections, we can create and list documents. Let's list the posts and categories that we have created by Appwrite with Refine.

<details>
<summary>Show Code</summary>
<p>

```tsx
import { useMany } from "@refinedev/core";
import {
  List,
  TextField,
  useTable,
  EditButton,
  ShowButton,
  getDefaultSortOrder,
} from "@refinedev/antd";
import { Table, Space } from "antd";

import { IPost, ICategory } from "interfaces";

export const PostsList: React.FC = () => {
  const { tableProps, sorter } = useTable<IPost>({
    sorters: {
      initial: [
        {
          field: "$id",
          order: "asc",
        },
      ],
    },
  });

  const categoryIds =
    tableProps?.dataSource?.map((item) => item.categoryId) ?? [];
  const { data, isLoading } = useMany<ICategory>({
    resource: "61bc4afa9ee2c",
    ids: categoryIds,
    queryOptions: {
      enabled: categoryIds.length > 0,
    },
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column
          dataIndex="id"
          title="ID"
          sorter
          defaultSortOrder={getDefaultSortOrder("id", sorter)}
        />
        <Table.Column dataIndex="title" title="Title" sorter />
        <Table.Column
          dataIndex="categoryId"
          title="Category"
          render={(value) => {
            if (isLoading) {
              return <TextField value="Loading..." />;
            }

            return (
              <TextField
                value={data?.data.find((item) => item.id === value)?.title}
              />
            );
          }}
        />
        <Table.Column<IPost>
          title="Actions"
          dataIndex="actions"
          render={(_, record) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.id} />
              <ShowButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
```

</p>
</details>

```tsx live previewOnly url=http://localhost:5173
setInitialRoutes(["/"]);

import { Refine, Authenticated } from "@refinedev/core";
import routerProvider, {
  CatchAllNavigate,
  NavigateToResource,
} from "@refinedev/react-router";
import { BrowserRouter, Routes, Route, Outlet } from "react-router";
import { dataProvider, liveProvider } from "@refinedev/appwrite";
import {
  ThemedLayoutV2,
  RefineThemes,
  useNotificationProvider,
  List,
  EditButton,
  ShowButton,
  useTable,
  AuthPage,
  ErrorComponent,
} from "@refinedev/antd";
import { ConfigProvider, Layout, Table, Space } from "antd";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ConfigProvider theme={RefineThemes.Blue}>
        <Refine
          dataProvider={dataProvider(appwriteClient, {
            databaseId: "default",
          })}
          liveProvider={liveProvider(appwriteClient, {
            databaseId: "default",
          })}
          authProvider={{
            ...authProvider,
            check: async () => ({
              authenticated: true,
            }),
          }}
          routerProvider={routerProvider}
          resources={[
            {
              name: "61c43ad33b857",
              list: "/posts",
              create: "/posts/create",
              edit: "/posts/edit/:id",
              show: "/posts/show/:id",
              meta: {
                label: "Post",
              },
            },
          ]}
          notificationProvider={useNotificationProvider}
          options={{
            liveMode: "auto",
            syncWithLocation: true,
            warnWhenUnsavedChanges: true,
          }}
        >
          <Routes>
            <Route
              element={
                <Authenticated fallback={<CatchAllNavigate to="/login" />}>
                  <ThemedLayoutV2>
                    <Outlet />
                  </ThemedLayoutV2>
                </Authenticated>
              }
            >
              <Route
                index
                element={<NavigateToResource resource="61c43ad33b857" />}
              />

              <Route path="/posts">
                <Route index element={<PostList />} />
                <Route path="create" element={<PostCreate />} />
                <Route path="edit/:id" element={<PostEdit />} />
                <Route path="show/:id" element={<PostShow />} />
              </Route>
            </Route>

            <Route
              element={
                <Authenticated fallback={<Outlet />}>
                  <NavigateToResource resource="61c43ad33b857" />
                </Authenticated>
              }
            >
              <Route
                path="/login"
                element={
                  <AuthPage
                    type="login"
                    formProps={{
                      initialValues: {
                        email: "demo@refine.dev",
                        password: "demodemo",
                      },
                    }}
                  />
                }
              />
            </Route>

            <Route
              element={
                <Authenticated>
                  <ThemedLayoutV2>
                    <Outlet />
                  </ThemedLayoutV2>
                </Authenticated>
              }
            >
              <Route path="*" element={<ErrorComponent />} />
            </Route>
          </Routes>
        </Refine>
      </ConfigProvider>
    </BrowserRouter>
  );
};
render(<App />);
```

## Create Page

We can now create posts and set categories from our Refine UI.

<details>
<summary>Show Code</summary>
<p>

```tsx
import { useState } from "react";

import { Create, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Select, Upload } from "antd";
import { RcFile } from "antd/lib/upload/interface";

import MDEditor from "@uiw/react-md-editor";

import { IPost, ICategory } from "interfaces";
import { storage, normalizeFile } from "utility";

export const PostsCreate: React.FC = () => {
  const { formProps, saveButtonProps } = useForm<IPost>();

  const { selectProps: categorySelectProps } = useSelect<ICategory>({
    resource: "61bc4afa9ee2c",
    optionLabel: "title",
    optionValue: "id",
  });

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
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
        <Form.Item
          label="Category"
          name="categoryId"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select {...categorySelectProps} />
        </Form.Item>
        <Form.Item
          label="Content"
          name="content"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <MDEditor data-color-mode="light" />
        </Form.Item>
        <Form.Item label="Images">
          <Form.Item
            name="images"
            valuePropName="fileList"
            normalize={normalizeFile}
            noStyle
          >
            <Upload.Dragger
              name="file"
              listType="picture"
              multiple
              customRequest={async ({ file, onError, onSuccess }) => {
                try {
                  const rcFile = file as RcFile;

                  const { $id } = await storage.createFile(
                    "default",
                    rcFile.name,
                    rcFile,
                  );

                  const url = storage.getFileView("default", $id);

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
  );
};
```

</p>
</details>

```tsx live previewOnly url=http://localhost:5173
setInitialRoutes(["/posts/create"]);

import { Refine, Authenticated } from "@refinedev/core";
import routerProvider, {
  CatchAllNavigate,
  NavigateToResource,
} from "@refinedev/react-router";
import { BrowserRouter, Routes, Route, Outlet } from "react-router";
import { dataProvider, liveProvider } from "@refinedev/appwrite";
import {
  ThemedLayoutV2,
  RefineThemes,
  useNotificationProvider,
  List,
  EditButton,
  ShowButton,
  useTable,
  AuthPage,
  ErrorComponent,
} from "@refinedev/antd";
import { ConfigProvider, Layout, Table, Space } from "antd";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ConfigProvider theme={RefineThemes.Blue}>
        <Refine
          dataProvider={dataProvider(appwriteClient, {
            databaseId: "default",
          })}
          liveProvider={liveProvider(appwriteClient, {
            databaseId: "default",
          })}
          authProvider={{
            ...authProvider,
            check: async () => ({
              authenticated: true,
            }),
          }}
          routerProvider={routerProvider}
          resources={[
            {
              name: "61c43ad33b857",
              list: "/posts",
              create: "/posts/create",
              edit: "/posts/edit/:id",
              show: "/posts/show/:id",
              meta: {
                label: "Post",
              },
            },
          ]}
          notificationProvider={useNotificationProvider}
          options={{
            liveMode: "auto",
            syncWithLocation: true,
            warnWhenUnsavedChanges: true,
          }}
        >
          <Routes>
            <Route
              element={
                <Authenticated fallback={<CatchAllNavigate to="/login" />}>
                  <ThemedLayoutV2>
                    <Outlet />
                  </ThemedLayoutV2>
                </Authenticated>
              }
            >
              <Route
                index
                element={<NavigateToResource resource="61c43ad33b857" />}
              />

              <Route path="/posts">
                <Route index element={<PostList />} />
                <Route path="create" element={<PostCreate />} />
                <Route path="edit/:id" element={<PostEdit />} />
                <Route path="show/:id" element={<PostShow />} />
              </Route>
            </Route>

            <Route
              element={
                <Authenticated fallback={<Outlet />}>
                  <NavigateToResource resource="61c43ad33b857" />
                </Authenticated>
              }
            >
              <Route
                path="/login"
                element={
                  <AuthPage
                    type="login"
                    formProps={{
                      initialValues: {
                        email: "demo@refine.dev",
                        password: "demodemo",
                      },
                    }}
                  />
                }
              />
            </Route>

            <Route
              element={
                <Authenticated>
                  <ThemedLayoutV2>
                    <Outlet />
                  </ThemedLayoutV2>
                </Authenticated>
              }
            >
              <Route path="*" element={<ErrorComponent />} />
            </Route>
          </Routes>
        </Refine>
      </ConfigProvider>
    </BrowserRouter>
  );
};
render(<App />);
```

:::tip

By default, Read Access and Write Access are public when creating documents via Refine. If you want to restrict [permissions](https://appwrite.io/docs/permissions#permission-types) and only allow specific users, you need to specify it in meta.

```tsx title="edit.tsx"
import { Permission, Role } from "@refinedev/appwrite";
const { formProps, saveButtonProps } = useForm<IPost>({
  meta: {
    writePermissions: [Permission.read(Role.any())],
    readPermissions: [Permission.read(Role.any())],
  },
});
```

:::

## Edit Page

You can edit the posts and categories we have created update your data.

<details>
<summary>Show Code</summary>
<p>

```tsx
import React from "react";

import { Edit, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Select, Upload } from "antd";
import { RcFile } from "antd/lib/upload/interface";

import MDEditor from "@uiw/react-md-editor";

import { IPost, ICategory } from "interfaces";
import { storage, normalizeFile } from "utility";

export const PostsEdit: React.FC = () => {
  const { formProps, saveButtonProps, queryResult } = useForm<IPost>();

  const postData = queryResult?.data?.data;
  const { selectProps: categorySelectProps } = useSelect<ICategory>({
    resource: "61bc4afa9ee2c",
    defaultValue: postData?.categoryId,
    optionLabel: "title",
    optionValue: "id",
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
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
        <Form.Item
          label="Category"
          name="categoryId"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select {...categorySelectProps} />
        </Form.Item>
        <Form.Item
          label="Content"
          name="content"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <MDEditor data-color-mode="light" />
        </Form.Item>
        <Form.Item label="Images">
          <Form.Item
            name="images"
            valuePropName="fileList"
            normalize={normalizeFile}
            noStyle
          >
            <Upload.Dragger
              name="file"
              listType="picture"
              multiple
              customRequest={async ({ file, onError, onSuccess }) => {
                try {
                  const rcFile = file as RcFile;

                  const { $id } = await storage.createFile(
                    "default",
                    rcFile.name,
                    rcFile,
                  );

                  const url = storage.getFileView("default", $id);

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
    </Edit>
  );
};
```

</p>
</details>

```tsx live previewOnly url=http://localhost:5173
setInitialRoutes(["/posts/edit/61c4697ab9ff9"]);

import { Refine, Authenticated } from "@refinedev/core";
import routerProvider, {
  CatchAllNavigate,
  NavigateToResource,
} from "@refinedev/react-router";
import { BrowserRouter, Routes, Route, Outlet } from "react-router";
import { dataProvider, liveProvider } from "@refinedev/appwrite";
import {
  ThemedLayoutV2,
  RefineThemes,
  useNotificationProvider,
  List,
  EditButton,
  ShowButton,
  useTable,
  AuthPage,
  ErrorComponent,
} from "@refinedev/antd";
import { ConfigProvider, Layout, Table, Space } from "antd";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ConfigProvider theme={RefineThemes.Blue}>
        <Refine
          dataProvider={dataProvider(appwriteClient, {
            databaseId: "default",
          })}
          liveProvider={liveProvider(appwriteClient, {
            databaseId: "default",
          })}
          authProvider={{
            ...authProvider,
            check: async () => ({
              authenticated: true,
            }),
          }}
          routerProvider={routerProvider}
          resources={[
            {
              name: "61c43ad33b857",
              list: "/posts",
              create: "/posts/create",
              edit: "/posts/edit/:id",
              show: "/posts/show/:id",
              meta: {
                label: "Post",
              },
            },
          ]}
          notificationProvider={useNotificationProvider}
          options={{
            liveMode: "auto",
            syncWithLocation: true,
            warnWhenUnsavedChanges: true,
          }}
        >
          <Routes>
            <Route
              element={
                <Authenticated fallback={<CatchAllNavigate to="/login" />}>
                  <ThemedLayoutV2>
                    <Outlet />
                  </ThemedLayoutV2>
                </Authenticated>
              }
            >
              <Route
                index
                element={<NavigateToResource resource="61c43ad33b857" />}
              />

              <Route path="/posts">
                <Route index element={<PostList />} />
                <Route path="create" element={<PostCreate />} />
                <Route path="edit/:id" element={<PostEdit />} />
                <Route path="show/:id" element={<PostShow />} />
              </Route>
            </Route>

            <Route
              element={
                <Authenticated fallback={<Outlet />}>
                  <NavigateToResource resource="61c43ad33b857" />
                </Authenticated>
              }
            >
              <Route
                path="/login"
                element={
                  <AuthPage
                    type="login"
                    formProps={{
                      initialValues: {
                        email: "demo@refine.dev",
                        password: "demodemo",
                      },
                    }}
                  />
                }
              />
            </Route>

            <Route
              element={
                <Authenticated>
                  <ThemedLayoutV2>
                    <Outlet />
                  </ThemedLayoutV2>
                </Authenticated>
              }
            >
              <Route path="*" element={<ErrorComponent />} />
            </Route>
          </Routes>
        </Refine>
      </ConfigProvider>
    </BrowserRouter>
  );
};
render(<App />);
```

## Example

:::simple

Username: `demo@refine.dev`

Password: `demodemo`

:::

<CodeSandboxExample path="data-provider-appwrite" />
