---
id: access-control
title: "Access Control Tutorial | Best Practices in Refine v5"
display_title: "Access Control"
description: "Secure Access Control in Refine v5. Learn best practices. Learn advanced patterns for RBAC, ABAC for production-ready workflows. Explore with code snippets."
sidebar_label: Access Control
---

```tsx live shared
import {
  newModel as CasbinNewModel,
  StringAdapter as CasbinStringAdapter,
  newEnforcer as CasbinNewEnforcer,
} from "casbin";

const model = CasbinNewModel(`
[request_definition]
r = sub, obj, act

[policy_definition]
p = sub, obj, act, eft

[role_definition]
g = _, _

[policy_effect]
e = some(where (p.eft == allow)) && !some(where (p.eft == deny))

[matchers]
m = g(r.sub, p.sub) && keyMatch(r.obj, p.obj) && regexMatch(r.act, p.act)
`);

import {
  Create as AntdCreate,
  List as AntdList,
  useForm as useAntdForm,
  useTable as useAntdTable,
  EditButton as AntdEditButton,
  ShowButton as AntdShowButton,
  EmailField as AntdEmailField,
  NumberField as AntdNumberField,
} from "@refinedev/antd";
import {
  Table as AntdTable,
  Edit as AntdEdit,
  Form as AntdForm,
  Input as AntdInput,
  Space as AntdSpace,
  Layout as AntdLayout,
  Radio as AntdRadio,
} from "antd";

interface IPost {
  id: number;
  title: string;
  content: string;
}

const PostList = () => {
  const { tableProps } = useAntdTable();

  return (
    <AntdList>
      <AntdTable {...tableProps} rowKey="id">
        <AntdTable.Column dataIndex="id" title="ID" />
        <AntdTable.Column dataIndex="title" title="Title" />
        <AntdTable.Column dataIndex="status" title="Status" />
        <AntdTable.Column
          title="Actions"
          dataIndex="actions"
          render={(_, record) => (
            <AntdSpace>
              <AntdEditButton hideText size="small" recordItemId={record.id} />
              <AntdShowButton hideText size="small" recordItemId={record.id} />
            </AntdSpace>
          )}
        />
      </AntdTable>
    </AntdList>
  );
};

const PostCreate = () => {
  const { formProps, saveButtonProps } = useAntdForm();

  return (
    <AntdCreate saveButtonProps={saveButtonProps}>
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
    </AntdCreate>
  );
};

const CategoryList = () => {
  const { tableProps } = useAntdTable();

  return (
    <AntdList>
      <AntdTable {...tableProps} rowKey="id">
        <AntdTable.Column dataIndex="id" title="ID" />
        <AntdTable.Column dataIndex="title" title="Title" />
        <AntdTable.Column
          title="Actions"
          dataIndex="actions"
          render={(_, record) => (
            <AntdSpace>
              <AntdEditButton hideText size="small" recordItemId={record.id} />
              <AntdShowButton hideText size="small" recordItemId={record.id} />
            </AntdSpace>
          )}
        />
      </AntdTable>
    </AntdList>
  );
};

const CategoryCreate = () => {
  const { formProps, saveButtonProps } = useAntdForm();

  return (
    <AntdCreate saveButtonProps={saveButtonProps}>
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
      </AntdForm>
    </AntdCreate>
  );
};

const UserList = () => {
  const { tableProps } = useAntdTable();

  return (
    <AntdList>
      <AntdTable {...tableProps} rowKey="id">
        <AntdTable.Column dataIndex="firstName" title="First Name" />
        <AntdTable.Column dataIndex="lastName" title="Last Name" />
        <AntdTable.Column
          dataIndex="email"
          title="Email"
          render={(value) => <AntdEmailField value={value} />}
        />
        <AntdTable.Column
          title="Actions"
          dataIndex="actions"
          render={(_, record) => (
            <AntdSpace>
              <AntdEditButton hideText size="small" recordItemId={record.id} />
              <AntdShowButton hideText size="small" recordItemId={record.id} />
            </AntdSpace>
          )}
        />
      </AntdTable>
    </AntdList>
  );
};

const UserCreate = () => {
  const { formProps, saveButtonProps } = useAntdForm();

  return (
    <AntdCreate saveButtonProps={saveButtonProps}>
      <AntdForm {...formProps} layout="vertical">
        <AntdForm.Item
          label="First Name"
          name="firstName"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <AntdInput />
        </AntdForm.Item>
        <AntdForm.Item
          label="Last Name"
          name="lastName"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <AntdInput />
        </AntdForm.Item>
        <AntdForm.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <AntdInput />
        </AntdForm.Item>
      </AntdForm>
    </AntdCreate>
  );
};

const Header = ({ role }) => {
  return (
    <AntdLayout.Header
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "48px",
        backgroundColor: "#FFF",
      }}
    >
      <AntdRadio.Group value={role}>
        <AntdRadio.Button value="admin">Admin</AntdRadio.Button>
        <AntdRadio.Button value="editor">Editor</AntdRadio.Button>
      </AntdRadio.Group>
    </AntdLayout.Header>
  );
};
```

## Introduction

Access control is a broad topic where there are lots of advanced solutions that provide a different sets of features. **Refine** is deliberately agnostic for its own API to be able to integrate different methods (RBAC, ABAC, ACL, etc.) and different libraries ([Casbin](https://casbin.org/), [CASL](https://casl.js.org/v5/en/), [Cerbos](https://cerbos.dev/), [AccessControl.js](https://onury.io/accesscontrol/)). `can` method would be the entry point for those solutions.

[Refer to the Access Control Provider documentation for detailed information. &#8594](/core/docs/authorization/access-control-provider/)

**Refine** provides an agnostic API via the `accessControlProvider` to manage access control throughout your app.

An `accessControlProvider` must implement only one async method named `can` to be used to check if the desired access will be granted.

We will be using **[Casbin](https://casbin.org/)** in this guide for users with different roles who have different access rights for parts of the app.

## Installation

We need to install Casbin.

<InstallPackagesCommand args="casbin"/>

:::caution

To make this example more visual, we used the [`@refinedev/antd`](https://github.com/refinedev/refine/tree/main/packages/antd) package. If you are using Refine headless, you need to provide the components, hooks, or helpers imported from the [`@refinedev/antd`](https://github.com/refinedev/refine/tree/main/packages/antd) package.

:::

## Setup

The app will have three resources: **posts**, **users**, and **categories** with CRUD pages(list, create, edit, and show).

[You can refer to CodeSandbox to see how they are implemented &#8594](#example)

`App.tsx` will look like this before we begin implementing access control:

```tsx title="src/App.tsx"
import { Refine } from "@refinedev/core";
import { ThemedLayout, ErrorComponent, RefineThemes } from "@refinedev/antd";
import dataProvider from "@refinedev/simple-rest";
import routerProvider from "@refinedev/react-router";

import { BrowserRouter, Routes, Route, Outlet } from "react-router";

import { ConfigProvider } from "antd";
import "@refinedev/antd/dist/reset.css";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ConfigProvider theme={RefineThemes.Blue}>
        <Refine
          routerProvider={routerProvider}
          dataProvider={dataProvider(API_URL)}
          resources={[
            {
              name: "posts",
              list: "/posts",
              create: "/posts/create",
              edit: "/posts/edit/:id",
              show: "/posts/show/:id",
              meta: {
                canDelete: true,
              },
            },
            {
              name: "users",
              list: "/users",
              create: "/users/create",
              edit: "/users/edit/:id",
              show: "/users/show/:id",
            },
            {
              name: "categories",
              list: "/categories",
              create: "/categories/create",
              edit: "/categories/edit/:id",
              show: "/categories/show/:id",
            },
          ]}
        >
          <Routes>
            <Route
              element={
                <ThemedLayout>
                  <Outlet />
                </ThemedLayout>
              }
            >
              <Route path="posts">
                <Route index element={<PostList />} />
                <Route path="create" element={<PostCreate />} />
                <Route path="show/:id" element={<PostShow />} />
                <Route path="edit/:id" element={<PostEdit />} />
              </Route>
              <Route path="users">
                <Route index element={<UserList />} />
                <Route path="create" element={<UserCreate />} />
                <Route path="show/:id" element={<UserShow />} />
                <Route path="edit/:id" element={<UserEdit />} />
              </Route>
              <Route path="categories">
                <Route index element={<CategoryList />} />
                <Route path="create" element={<CategoryCreate />} />
                <Route path="show/:id" element={<CategoryShow />} />
                <Route path="edit/:id" element={<CategoryEdit />} />
              </Route>
            </Route>
            <Route path="*" element={<ErrorComponent />} />
          </Routes>
        </Refine>
      </ConfigProvider>
    </BrowserRouter>
  );
};

export default App;
```

## Adding Policy and Model

The way **[Casbin](https://casbin.org/)** works is that access rights are checked according to policies that are defined based on a model. You can find further information about how models and policies work [here](https://casbin.org/docs/how-it-works).

Let's add a model and a policy for a role **editor** that have **list** access for **posts** resource.

```ts title="src/accessControl.ts"
import { newModel, StringAdapter } from "casbin";

export const model = newModel(`
[request_definition]
r = sub, obj, act

[policy_definition]
p = sub, obj, act

[role_definition]
g = _, _

[policy_effect]
e = some(where (p.eft == allow))

[matchers]
m = g(r.sub, p.sub) && keyMatch(r.obj, p.obj) && regexMatch(r.act, p.act)
`);

export const adapter = new StringAdapter(`
p, editor, posts, list
`);
```

:::tip

You can can find more examples in [Casbin documentation](https://casbin.org/docs/supported-models) or play with lots of examples in [Casbin editor](https://casbin.org/editor)

:::

## Adding `accessControlProvider`

Now we will implement the `can` method for `accessControlProvider` to integrate our policy.

```tsx title="src/App.tsx"
// ...
// highlight-next-line
import { newEnforcer } from "casbin";

// highlight-next-line
import { model, adapter } from "./accessControl";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Refine
        // highlight-start
        accessControlProvider={{
          can: async ({ resource, action }) => {
            const enforcer = await newEnforcer(model, adapter);
            const can = await enforcer.enforce("editor", resource, action);

            return { can };
          },
        }}
        // highlight-end
        //...
      >
        {/* ... */}
      </Refine>
    </BrowserRouter>
  );
};

export default App;
```

Whenever a part of the app checks for access control, Refine passes `resource`, `action`, and `params` parameters to `can` and then we can use these parameters to integrate our specific access control solution which is **Casbin** in this case.

Our model provides that user with role **editor** have access for **list** action on **posts** resource. Even though we have two other resources, since our policy doesn't include them, they will not appear on the sidebar menu. Also in the list page of `posts`, buttons for **create**, **edit** and **show** buttons will be disabled since they are not included in the policy.

```tsx live previewOnly url=http://localhost:5173/posts previewHeight=420px
setInitialRoutes(["/posts"]);
import React from "react";
import { Create, useForm } from "@refinedev/antd";
import { Form, Input } from "antd";

const adapter = new CasbinStringAdapter(`
p, editor, posts, list
`);

render(
  <ReactRouter.BrowserRouter>
    <RefineAntdDemo
      accessControlProvider={{
        can: async ({ resource, action }) => {
          const enforcer = await CasbinNewEnforcer(model, adapter);
          const can = await enforcer.enforce("editor", resource, action);

          return { can };
        },
      }}
      resources={[
        {
          name: "posts",
          list: "/posts",
          create: "/posts/create",
        },
      ]}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route
          path="/posts"
          element={
            <div style={{ padding: 16 }}>
              <ReactRouter.Outlet />
            </div>
          }
        >
          <ReactRouter.Route index element={<PostList />} />
        </ReactRouter.Route>
        <ReactRouter.Route path="/posts/create" element={<PostCreate />} />
      </ReactRouter.Routes>
    </RefineAntdDemo>
  </ReactRouter.BrowserRouter>,
);
```

## Adding Different Roles

We can provide different access rights to a different types of users for different parts of the app. We can do that by adding policies for the different roles.

```ts
export const adapter = new MemoryAdapter(`
p, admin, posts, (list)|(create)
p, admin, users, (list)|(create)
p, admin, categories, (list)|(create)

p, editor, posts, (list)|(create)
p, editor, categories, list
`);
```

- **admin** will have access to **list** and **create** for every resource
- **editor** will have access to **list** and **create** for **posts**
- **editor** won't have any access for **users**
- **editor** will have only **list** access for **categories**

We can demonstrate the effect of different roles by changing the `role` dynamically. Let's implement a switch in the header for selecting either **admin** or **editor** role to see the effect on the app.

```tsx title="src/App.tsx"
// highlight-next-line
import { Header } from "components/header";

const App: React.FC = () => {
  // highlight-start
  import { CanAccess } from "@refinedev/core";
  const role = localStorage.getItem("role") ?? "admin";
  // highlight-end

  return (
    <BrowserRouter>
      <Refine
        // highlight-start
        accessControlProvider={{
          can: async ({ resource, action }) => {
            const enforcer = await newEnforcer(model, adapter);
            // highlight-next-line
            const can = await enforcer.enforce(role, resource, action);

            return {
              can,
            };
          },
        }}
        // highlight-end
        //...
      >
        <Routes>
          <Route
            element={
              // highlight-start
              <ThemedLayout Header={() => <Header role={role} />}>
                <CanAccess>
                  <Outlet />
                </CanAccess>
              </ThemedLayout>
              // highlight-end
            }
          >
            {/* ... */}
          </Route>
        </Routes>
        {/* ... */}
      </Refine>
    </BrowserRouter>
  );
};

export default App;
```

<details>
<summary>Header Component</summary>

```tsx title="src/components/header.tsx"
import { Layout, Radio } from "antd";

interface HeaderProps {
  role: string;
}

export const Header: React.FC<HeaderProps> = ({ role }) => {
  return (
    <Layout.Header
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "48px",
        backgroundColor: "#FFF",
      }}
    >
      <Radio.Group
        value={role}
        onChange={(event) => {
          localStorage.setItem("role", event.target.value);
          location.reload();
        }}
      >
        <Radio.Button value="admin">Admin</Radio.Button>
        <Radio.Button value="editor">Editor</Radio.Button>
      </Radio.Group>
    </Layout.Header>
  );
};
```

</details>
<br/>

Now, let's see how the application will appear when logging in as an `admin` or `editor`.

<Tabs
defaultValue="admin"
values={[ {label: 'admin', value: 'admin'}, {label: 'editor', value: 'editor'} ]}>

<TabItem value="admin">

```tsx live previewOnly url=http://localhost:5173 previewHeight=660px
setInitialRoutes(["/posts"]);
import { useState } from "react";
import { Refine } from "@refinedev/core";
import { ThemedLayout, RefineThemes } from "@refinedev/antd";
import { ConfigProvider, Layout } from "antd";
import routerProvider from "@refinedev/react-router";
import { BrowserRouter, Routes, Route, Outlet } from "react-router";

import dataProvider from "@refinedev/simple-rest";
const API_URL = "https://api.fake-rest.refine.dev";

const adapter = new CasbinStringAdapter(`
p, admin, posts, (list)|(create)
p, admin, users, (list)|(create)
p, admin, categories, (list)|(create)

p, editor, posts, (list)|(create)
p, editor, categories, list
`);

const App: React.FC = () => {
  const role = "admin";

  return (
    <BrowserRouter>
      <ConfigProvider theme={RefineThemes.Blue}>
        <Refine
          routerProvider={routerProvider}
          dataProvider={dataProvider(API_URL)}
          resources={[
            {
              name: "posts",
              list: "/posts",
              create: "/posts/create",
            },
            {
              name: "categories",
              list: "/categories",
              create: "/categories/create",
            },
            {
              name: "users",
              list: "/users",
              create: "/users/create",
            },
          ]}
          accessControlProvider={{
            can: async ({ resource, action }) => {
              const enforcer = await CasbinNewEnforcer(model, adapter);
              const can = await enforcer.enforce(role, resource, action);

              return { can };
            },
          }}
        >
          <Routes>
            <Route
              element={
                <ThemedLayout
                // Header={() => <Header role={role} />}
                >
                  <Outlet />
                </ThemedLayout>
              }
            >
              <Route path="posts">
                <Route index element={<PostList />} />
                <Route path="create" element={<PostCreate />} />
              </Route>
              <Route path="categories">
                <Route index element={<CategoryList />} />
                <Route path="create" element={<CategoryCreate />} />
              </Route>
              <Route path="users">
                <Route index element={<UserList />} />
                <Route path="create" element={<UserCreate />} />
              </Route>
            </Route>
          </Routes>
        </Refine>
      </ConfigProvider>
    </BrowserRouter>
  );
};

render(<App />);
```

</TabItem>

<TabItem value="editor">

```tsx live previewOnly url=http://localhost:5173 previewHeight=660px
setInitialRoutes(["/posts"]);
import { useState } from "react";
import { Refine } from "@refinedev/core";
import { ThemedLayout, RefineThemes } from "@refinedev/antd";
import { ConfigProvider, Layout } from "antd";
import routerProvider from "@refinedev/react-router";
import { BrowserRouter, Routes, Route, Outlet } from "react-router";

import dataProvider from "@refinedev/simple-rest";
const API_URL = "https://api.fake-rest.refine.dev";

const adapter = new CasbinStringAdapter(`
p, admin, posts, (list)|(create)
p, admin, users, (list)|(create)
p, admin, categories, (list)|(create)

p, editor, posts, (list)|(create)
p, editor, categories, list
`);

const App: React.FC = () => {
  const role = "editor";

  return (
    <BrowserRouter>
      <ConfigProvider theme={RefineThemes.Blue}>
        <Refine
          routerProvider={routerProvider}
          dataProvider={dataProvider(API_URL)}
          resources={[
            {
              name: "posts",
              list: "/posts",
              create: "/posts/create",
            },
            {
              name: "categories",
              list: "/categories",
              create: "/categories/create",
            },
            {
              name: "users",
              list: "/users",
              create: "/users/create",
            },
          ]}
          accessControlProvider={{
            can: async ({ resource, action }) => {
              const enforcer = await CasbinNewEnforcer(model, adapter);
              const can = await enforcer.enforce(role, resource, action);

              return { can };
            },
          }}
        >
          <Routes>
            <Route
              element={
                <ThemedLayout
                // Header={() => <Header role={role} />}
                >
                  <Outlet />
                </ThemedLayout>
              }
            >
              <Route path="posts">
                <Route index element={<PostList />} />
                <Route path="create" element={<PostCreate />} />
              </Route>
              <Route path="categories">
                <Route index element={<CategoryList />} />
                <Route path="create" element={<CategoryCreate />} />
              </Route>
              <Route path="users">
                <Route index element={<UserList />} />
                <Route path="create" element={<UserCreate />} />
              </Route>
            </Route>
          </Routes>
        </Refine>
      </ConfigProvider>
    </BrowserRouter>
  );
};

render(<App />);
```

</TabItem>
</Tabs>

## Handling access with params

### ID Based Access

Let's update our policies to handle **id** based access control points like **edit**, **show** pages, and **delete** button.

```ts
export const adapter = new MemoryAdapter(`
p, admin, posts, (list)|(create)
// highlight-next-line
p, admin, posts/*, (edit)|(show)|(delete)

p, admin, users, (list)|(create)
// highlight-next-line
p, admin, users/*, (edit)|(show)|(delete)

p, admin, categories, (list)|(create)
// highlight-next-line
p, admin, categories/*, (edit)|(show)|(delete)

p, editor, posts, (list)|(create)
// highlight-next-line
p, editor, posts/*, (edit)|(show)

p, editor, categories, list
`);
```

- **admin** will have **edit**, **show** and **delete** access for every resource
- **editor** will have **edit** and **show** access for **posts**

:::tip

`*` is a wildcard. Specific ids can be targeted too. For example If you want **editor** role to have **delete** access for **post** with **id** `5`, you can add this policy:

```ts
export const adapter = new MemoryAdapter(`
p, editor, posts/5, delete
`);
```

:::

We must handle id based access controls in the `can` method. **id** parameter will be accessible in `params`.

```tsx title="src/App.tsx"
const App: React.FC = () => {
  return (
    <Refine
      //...
      accessControlProvider={{
        // highlight-start
        can: async ({ resource, action, params }) => {
          const enforcer = await newEnforcer(model, adapter);

          if (action === "delete" || action === "edit" || action === "show") {
            const can = await enforcer.enforce(
              role,
              `${resource}/${params?.id}`,
              action,
            );

            return { can };
          }
          // highlight-end

          const can = await enforcer.enforce(role, resource, action);

          return { can };
        },
      }}
    >
      {/* ... */}
    </Refine>
  );
};

export default App;
```

### Field Based Access

We can also check access control for specific areas in our app like a certain field of a table. This can be achieved by adding a special action for the custom access control point in our policies.

For example, we may want to **deny** **editor** roles to access **hit** field in the **posts** resource without denying the **admin** role. This can be done with [RBAC with deny-override](https://casbin.org/docs/supported-models) model.

```ts
export const model = newModel(`
[request_definition]
r = sub, obj, act

[policy_definition]
// highlight-next-line
p = sub, obj, act, eft

[role_definition]
g = _, _

[policy_effect]
// highlight-next-line
e = some(where (p.eft == allow)) && !some(where (p.eft == deny))

[matchers]
m = g(r.sub, p.sub) && keyMatch(r.obj, p.obj) && regexMatch(r.act, p.act)
`);

export const adapter = new MemoryAdapter(`
p, admin, posts, (list)|(create)
p, admin, posts/*, (edit)|(show)|(delete)
// highlight-next-line
p, admin, posts/*, field

p, admin, users, (list)|(create)
p, admin, users/*, (edit)|(show)|(delete)

p, admin, categories, (list)|(create)
p, admin, categories/*, (edit)|(show)|(delete)

p, editor, posts, (list)|(create)
p, editor, posts/*, (edit)|(show)
// highlight-next-line
p, editor, posts/hit, field, deny

p, editor, categories, list
`);
```

- **admin** have **field** access for every field of **posts**
- **editor** won't have **field** access for **hit** field of **posts**

Then we must handle the **field** action in the `can` method:

```tsx title="src/App.tsx"
const App: React.FC = () => {
  return (
    <Refine
      //...
      accessControlProvider={{
        can: async ({ resource, action, params }) => {
          const enforcer = await newEnforcer(model, adapter);

          if (action === "delete" || action === "edit" || action === "show") {
            const can = await enforcer.enforce(
              role,
              `${resource}/${params?.id}`,
              action,
            );

            return { can };
          }

          // highlight-start
          if (action === "field") {
            const can = await enforcer.enforce(
              role,
              `${resource}/${params?.field}`,
              action,
            );
            return { can };
          }
          // highlight-end

          const can = await enforcer.enforce(role, resource, action);

          return { can };
        },
      }}
    >
      {/* ... */}
    </Refine>
  );
};

export default App;
```

Then it can be used with [`useCan`](/core/docs/authorization/hooks/use-can/) in the related area:

```tsx title="src/pages/posts/list.tsx"
import {
  // ...
  useCan,
} from "@refinedev/core";

export const PostList: React.FC = () => {
  // highlight-start
  const { data: canAccess } = useCan({
    resource: "posts",
    action: "field",
    params: { field: "hit" },
  });
  // highlight-end

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        // highlight-start
        {canAccess?.can && (
          <Table.Column
            dataIndex="hit"
            title="Hit"
            render={(value: number) => (
              <NumberField value={value} options={{ notation: "compact" }} />
            )}
          />
        )}
        // highlight-end
      </Table>
    </List>
  );
};
```

:::tip

[`<CanAccess />`](/core/docs/authorization/components/can-access/) can be used too to check access control in custom places in your app.

:::

<br/>

Now, let's see how the application will appear when logging in as an `admin` or `editor`.

<Tabs
defaultValue="admin"
values={[ {label: 'admin', value: 'admin'}, {label: 'editor', value: 'editor'} ]}>

<TabItem value="admin">

```tsx live previewOnly url=http://localhost:5173 previewHeight=660px
setInitialRoutes(["/posts"]);
import { useState } from "react";
import { Refine, useCan } from "@refinedev/core";
import { ThemedLayout, RefineThemes } from "@refinedev/antd";
import { ConfigProvider, Layout } from "antd";
import routerProvider from "@refinedev/react-router";
import { BrowserRouter, Routes, Route, Outlet } from "react-router";

import dataProvider from "@refinedev/simple-rest";
const API_URL = "https://api.fake-rest.refine.dev";

const adapter = new CasbinStringAdapter(`
p, admin, posts, (list)|(create)
p, admin, posts/*, (edit)|(show)|(delete)
p, admin, posts/*, field

p, admin, users, (list)|(create)
p, admin, users/*, (edit)|(show)|(delete)

p, admin, categories, (list)|(create)
p, admin, categories/*, (edit)|(show)|(delete)

p, editor, posts, (list)|(create)
p, editor, posts/*, (edit)|(show)
p, editor, posts/hit, field, deny

p, editor, categories, list
`);

const PostListWithHit = () => {
  const { tableProps } = useAntdTable();
  const { data: canAccess } = useCan({
    resource: "posts",
    action: "field",
    params: { field: "hit" },
  });

  return (
    <AntdList>
      <AntdTable {...tableProps} rowKey="id">
        <AntdTable.Column dataIndex="id" title="ID" />
        <AntdTable.Column dataIndex="title" title="Title" />
        <AntdTable.Column dataIndex="status" title="Status" />
        {canAccess?.can && (
          <AntdTable.Column
            dataIndex="hit"
            title="Hit"
            render={(value: number) => (
              <AntdNumberField
                value={value}
                options={{ notation: "compact" }}
              />
            )}
          />
        )}
        <AntdTable.Column
          title="Actions"
          dataIndex="actions"
          render={(_, record) => (
            <AntdSpace>
              <AntdEditButton hideText size="small" recordItemId={record.id} />
              <AntdShowButton hideText size="small" recordItemId={record.id} />
            </AntdSpace>
          )}
        />
      </AntdTable>
    </AntdList>
  );
};

const App: React.FC = () => {
  const role = "admin";

  return (
    <BrowserRouter>
      <ConfigProvider theme={RefineThemes.Blue}>
        <Refine
          routerProvider={routerProvider}
          dataProvider={dataProvider(API_URL)}
          resources={[
            {
              name: "posts",
              list: "/posts",
              create: "/posts/create",
            },
            {
              name: "categories",
              list: "/categories",
              create: "/categories/create",
            },
            {
              name: "users",
              list: "/users",
              create: "/users/create",
            },
          ]}
          accessControlProvider={{
            can: async ({ resource, action, params }) => {
              const enforcer = await CasbinNewEnforcer(model, adapter);

              if (
                action === "delete" ||
                action === "edit" ||
                action === "show"
              ) {
                const can = await enforcer.enforce(
                  role,
                  `${resource}/${params?.id}`,
                  action,
                );

                return { can };
              }

              if (action === "field") {
                const can = await enforcer.enforce(
                  role,
                  `${resource}/${params?.field}`,
                  action,
                );
                return { can };
              }

              const can = await enforcer.enforce(role, resource, action);

              return { can };
            },
          }}
        >
          <Routes>
            <Route
              element={
                <ThemedLayout
                // Header={() => <Header role={role} />}
                >
                  <Outlet />
                </ThemedLayout>
              }
            >
              <Route path="posts">
                <Route index element={<PostListWithHit />} />
                <Route path="create" element={<PostCreate />} />
              </Route>
              <Route path="categories">
                <Route index element={<CategoryList />} />
                <Route path="create" element={<CategoryCreate />} />
              </Route>
              <Route path="users">
                <Route index element={<UserList />} />
                <Route path="create" element={<UserCreate />} />
              </Route>
            </Route>
          </Routes>
        </Refine>
      </ConfigProvider>
    </BrowserRouter>
  );
};

render(<App />);
```

</TabItem>

<TabItem value="editor">

```tsx live previewOnly url=http://localhost:5173 previewHeight=660px
setInitialRoutes(["/posts"]);
import { useState } from "react";
import { Refine, useCan } from "@refinedev/core";
import { ThemedLayout, RefineThemes } from "@refinedev/antd";
import { ConfigProvider, Layout } from "antd";
import routerProvider from "@refinedev/react-router";
import { BrowserRouter, Routes, Route, Outlet } from "react-router";

import dataProvider from "@refinedev/simple-rest";
const API_URL = "https://api.fake-rest.refine.dev";

const adapter = new CasbinStringAdapter(`
p, admin, posts, (list)|(create)
p, admin, users, (list)|(create)
p, admin, categories, (list)|(create)

p, editor, posts, (list)|(create)
p, editor, categories, list
`);

const PostListWithHit = () => {
  const { tableProps } = useAntdTable();
  const { data: canAccess } = useCan({
    resource: "posts",
    action: "field",
    params: { field: "hit" },
  });

  return (
    <AntdList>
      <AntdTable {...tableProps} rowKey="id">
        <AntdTable.Column dataIndex="id" title="ID" />
        <AntdTable.Column dataIndex="title" title="Title" />
        <AntdTable.Column dataIndex="status" title="Status" />
        {canAccess?.can && (
          <AntdTable.Column
            dataIndex="hit"
            title="Hit"
            render={(value: number) => (
              <AntdNumberField
                value={value}
                options={{ notation: "compact" }}
              />
            )}
          />
        )}
        <AntdTable.Column
          title="Actions"
          dataIndex="actions"
          render={(_, record) => (
            <AntdSpace>
              <AntdEditButton hideText size="small" recordItemId={record.id} />
              <AntdShowButton hideText size="small" recordItemId={record.id} />
            </AntdSpace>
          )}
        />
      </AntdTable>
    </AntdList>
  );
};

const App: React.FC = () => {
  const role = "editor";

  return (
    <BrowserRouter>
      <ConfigProvider theme={RefineThemes.Blue}>
        <Refine
          routerProvider={routerProvider}
          dataProvider={dataProvider(API_URL)}
          resources={[
            {
              name: "posts",
              list: "/posts",
              create: "/posts/create",
            },
            {
              name: "categories",
              list: "/categories",
              create: "/categories/create",
            },
            {
              name: "users",
              list: "/users",
              create: "/users/create",
            },
          ]}
          accessControlProvider={{
            can: async ({ resource, action, params }) => {
              const enforcer = await CasbinNewEnforcer(model, adapter);

              if (
                action === "delete" ||
                action === "edit" ||
                action === "show"
              ) {
                const can = await enforcer.enforce(
                  role,
                  `${resource}/${params?.id}`,
                  action,
                );

                return { can };
              }

              if (action === "field") {
                const can = await enforcer.enforce(
                  role,
                  `${resource}/${params?.field}`,
                  action,
                );
                return { can };
              }

              const can = await enforcer.enforce(role, resource, action);

              return { can };
            },
          }}
        >
          <Routes>
            <Route
              element={
                <ThemedLayout
                // Header={() => <Header role={role} />}
                >
                  <Outlet />
                </ThemedLayout>
              }
            >
              <Route path="posts">
                <Route index element={<PostListWithHit />} />
                <Route path="create" element={<PostCreate />} />
              </Route>
              <Route path="categories">
                <Route index element={<CategoryList />} />
                <Route path="create" element={<CategoryCreate />} />
              </Route>
              <Route path="users">
                <Route index element={<UserList />} />
                <Route path="create" element={<UserCreate />} />
              </Route>
            </Route>
          </Routes>
        </Refine>
      </ConfigProvider>
    </BrowserRouter>
  );
};

render(<App />);
```

</TabItem>

</Tabs>

## Example

### Casbin

<CodeSandboxExample path="access-control-casbin" />

### Cerbos

<CodeSandboxExample path="access-control-cerbos" />
