---
id: appwrite
title: Appwrite
---

## Introduction

**refine** and [Appwrite](https://appwrite.io/) work in harmony, offering you quick development options. You can use your data (API, Database) very simply by using **refine**'s Appwrite data provider.

:::info
[Appwrite](https://appwrite.io/) version >= 1.0 is required
:::

You can only focus on your UI as we can handle your data quickly and simply.

:::caution
This guide has been prepared assuming you know the basics of **refine**. If you haven't learned these basics yet, we recommend reading the [Tutorial](https://refine.dev/core/docs/).
:::

## Setup

<InstallPackagesCommand args="@pankod/refine-appwrite"/>

:::caution
To make this example more visual, we used the [`@pankod/refine-antd`](https://github.com/refinedev/refine/tree/v3/packages/refine-antd) package. If you are using Refine headless, you need to provide the components, hooks or helpers imported from the [`@pankod/refine-antd`](https://github.com/refinedev/refine/tree/v3/packages/refine-antd) package.
:::

## Usage

It is very simple to use and consists of two steps. First, define your Appwrite project id and then give it to the dataprovider.

### Creating Appwrite Client

```tsx title="appwriteClient.ts"
import { Appwrite, Account, Storage } from "@pankod/refine-appwrite";

const APPWRITE_URL = "http://YOUR_COOL_APPWRITE_API/v1";
//highlight-start
const APPWRITE_PROJECT = "YOUR_APPWRITE_PROJECT_ID";
//highlight-end

const appwriteClient = new Appwrite();

appwriteClient.setEndpoint(APPWRITE_URL).setProject(APPWRITE_PROJECT);

// for authentication
const account = new Account(appwriteClient);
// for file upload
const storage = new Storage(appwriteClient);

export { appwriteClient, account, storage };
```

### Creating Auth Provider

```tsx title="authProvider.ts"
import { AuthProvider } from "@pankod/refine-core";

import { account } from "./appwriteClient";

export const authProvider: AuthProvider = {
  login: async ({ email, password }) => {
    try {
      await account.createEmailSession(email, password);
      return Promise.resolve();
    } catch (e) {
      return Promise.reject();
    }
  },
  logout: async () => {
    await account.deleteSession("current");

    return "/";
  },
  checkError: () => Promise.resolve(),
  checkAuth: async () => {
    const session = await account.get();

    if (session) {
      return Promise.resolve();
    }

    return Promise.reject();
  },
  getPermissions: () => Promise.resolve(),
  getUserIdentity: async () => {
    const user = await account.get();

    if (user) {
      return user;
    }
  },
};
```

### Configure Refine Component

```tsx title="App.tsx"
import { Refine, AuthProvider } from "@pankod/refine-core";
import {
  Layout,
  ReadyPage,
  useNotificationProvider,
  ErrorComponent,
} from "@pankod/refine-antd";
import routerProvider from "@pankod/refine-react-router-v6";

//highlight-start
import { dataProvider, liveProvider } from "@pankod/refine-appwrite";
//highlight-end

//highlight-start
import { appwriteClient, account } from "./appwriteClient";
import authProvider from "./authProvider";
//highlight-end

const App: React.FC = () => {
  return (
    <Refine
      //highlight-start
      dataProvider={dataProvider(appwriteClient, {
        databaseId: "default",
      })}
      liveProvider={liveProvider(appwriteClient, {
        databaseId: "default",
      })}
      options={{ liveMode: "auto" }}
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

:::tip Live/Realtime 🚀
`@pankod/refine-appwrite` package supports Live/Realtime Provider natively 🚀

[Refer to the Live/Realtime Provider docs for detailed usage. →](/core/docs/3.xx.xx/api-reference/core/providers/live-provider/)
:::

## Create Collections

We created two collections on Appwrite Database as `posts` and `categories` and added a relation between them.

`Category Collection`:

- Title: text

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/guides-and-concepts/data-provider/appwrite/category.png" alt="category" />

<br/>

`Post Collection`:

- Title: text
- CategoryId: text
- Content: text
- Images: wilcard

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/guides-and-concepts/data-provider/appwrite/posts.png" alt="posts" />

<br/>

Then we need to create an appwrite user to be able to login with **refine**.

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/guides-and-concepts/data-provider/appwrite/user.png" alt="user" />

<br/>

### Permissions

In order to list posts and categories, you need to give read and write permission by Appwrite.

Example: `Post Collection Permissons`

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/guides-and-concepts/data-provider/appwrite/permission.png" alt="permission" />
<br/>

We indicate that the read and write permission is open to everyone by giving the "\*" parameter.

[Refer to the Appwrite Permissions documentation for detailed information.→](https://appwrite.io/docs/permissions)

[Check out how you can use permissions when creating posts with **refine** →](#create-page)

## Login page​

**refine** default login screen allows you to login with username. Appwrite allows login with email, therefore we need to override the login page.

<details>
<summary>Show Code</summary>
<p>

```tsx title="pages/login.tsx"
import React from "react";

import { useLogin } from "@pankod/refine-core";
import {
  Row,
  Col,
  AntdLayout,
  Card,
  Typography,
  Form,
  Input,
  Button,
  Checkbox,
} from "@pankod/refine-antd";

import "./styles.css";

const { Text, Title } = Typography;

export interface ILoginForm {
  username: string;
  password: string;
  remember: boolean;
}

export const Login: React.FC = () => {
  const [form] = Form.useForm<ILoginForm>();

  const { mutate: login } = useLogin<ILoginForm>();

  const CardTitle = (
    <Title level={3} className="title">
      Sign in your account
    </Title>
  );

  return (
    <AntdLayout className="layout">
      <Row
        justify="center"
        align="middle"
        style={{
          height: "100vh",
        }}
      >
        <Col xs={22}>
          <div className="container">
            <div className="imageContainer">
              <img src="./refine.svg" alt="Refine Logo" />
            </div>
            <Card title={CardTitle} headStyle={{ borderBottom: 0 }}>
              <Form<ILoginForm>
                layout="vertical"
                form={form}
                onFinish={(values) => {
                  login(values);
                }}
                requiredMark={false}
              >
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[{ required: true, type: "email" }]}
                >
                  <Input size="large" placeholder="Email" />
                </Form.Item>
                <Form.Item
                  name="password"
                  label="Password"
                  rules={[{ required: true }]}
                  style={{ marginBottom: "12px" }}
                >
                  <Input type="password" placeholder="●●●●●●●●" size="large" />
                </Form.Item>
                <div style={{ marginBottom: "12px" }}>
                  <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox
                      style={{
                        fontSize: "12px",
                      }}
                    >
                      Remember me
                    </Checkbox>
                  </Form.Item>

                  <a
                    style={{
                      float: "right",
                      fontSize: "12px",
                    }}
                    href="#"
                  >
                    Forgot password?
                  </a>
                </div>
                <Button type="primary" size="large" htmlType="submit" block>
                  Sign in
                </Button>
              </Form>
              <div style={{ marginTop: 8 }}>
                <Text style={{ fontSize: 12 }}>
                  Don’t have an account?{" "}
                  <a href="#" style={{ fontWeight: "bold" }}>
                    Sign up
                  </a>
                </Text>
              </div>
            </Card>
          </div>
        </Col>
      </Row>
    </AntdLayout>
  );
};
```

</p>
</details>

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/guides-and-concepts/data-provider/appwrite/login.png" alt="login" />

<br/>

Now we can login with the user we created by Appwrite. We can then list, create and edit posts.

:::tip
**refine** resource name must be the same as Appwrite Collection ID. You can change your label with resource options.

```tsx
const App: React.FC = () => {
  return (
    <Refine
      dataProvider={dataProvider(appwriteClient, {
        databaseId: "default",
      })}
      liveProvider={liveProvider(appwriteClient, {
        databaseId: "default",
      })}
      options={{ liveMode: "auto" }}
      authProvider={authProvider}
      routerProvider={routerProvider}
      Layout={Layout}
      ReadyPage={ReadyPage}
      notificationProvider={useNotificationProvider}
      catchAll={<ErrorComponent />}
      LoginPage={Login}
      resources={[
        {
          //highlight-start
          name: "61bc3660648a6",
          //highlight-end
          options: {
            //highlight-start
            label: "Post",
            //highlight-end
          },
        },
      ]}
    />
  );
};

export default App;
```

:::

## List Page

Now that we've created our collections, we can create and list documents. Let's list the posts and categories that we have created by Appwrite with **refine**.

<details>
<summary>Show Code</summary>
<p>

```tsx
import { useMany, IResourceComponentsProps } from "@pankod/refine-core";
import {
  List,
  Table,
  TextField,
  useTable,
  Space,
  EditButton,
  ShowButton,
  getDefaultSortOrder,
} from "@pankod/refine-antd";

import { IPost, ICategory } from "interfaces";

export const PostsList: React.FC<IResourceComponentsProps> = () => {
  const { tableProps, sorter } = useTable<IPost>({
    initialSorter: [
      {
        field: "$id",
        order: "asc",
      },
    ],
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

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/guides-and-concepts/data-provider/appwrite/list.png" alt="list" />

<br/>

## Create Page

We can now create posts and set categories from our **refine** UI.

<details>
<summary>Show Code</summary>
<p>

```tsx
import { useState } from "react";

import { IResourceComponentsProps } from "@pankod/refine-core";
import {
  Create,
  Form,
  Input,
  Select,
  Upload,
  useForm,
  useSelect,
  RcFile,
} from "@pankod/refine-antd";

import MDEditor from "@uiw/react-md-editor";

import { IPost, ICategory } from "interfaces";
import { storage, normalizeFile } from "utility";

export const PostsCreate: React.FC<IResourceComponentsProps> = () => {
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

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/guides-and-concepts/data-provider/appwrite/create.gif" alt="create" />

<br/>

:::tip
As we mentioned above, we need permissions to list or create documents in Appwrite. By default, Read Access and Write Access are public when creating documents from **refine** UI.

If you want to restrict [permissions](https://appwrite.io/docs/permissions#permission-types) and only allow specific users, you need to specify it in metaData.

```tsx
import { Permission, Role } from "@pankod/refine-appwrite";
const { formProps, saveButtonProps } = useForm<IPost>({
  metaData: {
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

import { IResourceComponentsProps } from "@pankod/refine-core";
import {
  Edit,
  Form,
  Input,
  RcFile,
  Select,
  Upload,
  useForm,
  useSelect,
} from "@pankod/refine-antd";

import MDEditor from "@uiw/react-md-editor";

import { IPost, ICategory } from "interfaces";
import { storage, normalizeFile } from "utility";

export const PostsEdit: React.FC<IResourceComponentsProps> = () => {
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

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/guides-and-concepts/data-provider/appwrite/edit.png" alt="edit" />

## Example

:::additional

Username: `demo@refine.dev`

Password: `demodemo`

:::

<CodeSandboxExample path="data-provider-appwrite" />
