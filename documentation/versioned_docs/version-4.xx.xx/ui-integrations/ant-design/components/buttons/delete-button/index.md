---
title: "Ant Design Delete Button | Refine v4 Security"
display_title: "Delete"
sidebar_label: "Delete"
description: "Implement safe record deletion with confirmation dialogs. Guide to using the Ant Design Delete Button in your Refine v4 CRUD applications."
swizzle: true
---

`<DeleteButton>` uses Ant Design's [`<Button>`](https://ant.design/components/button/) and [`<Popconfirm>`](https://ant.design/components/popconfirm/) components.

When you try to delete something, a pop-up shows up and asks for confirmation. When confirmed it executes the [`useDelete`](/core/docs/data/hooks/use-delete) method provided by your [`dataProvider`](/core/docs/data/data-provider).

:::simple Good to know

You can swizzle this component to customize it with the [**Refine CLI**](/core/docs/packages/list-of-packages)

:::

## Usage

```tsx live previewHeight=360px
setInitialRoutes(["/posts"]);

// visible-block-start
import {
  List,
  useTable,
  // highlight-next-line
  DeleteButton,
} from "@refinedev/antd";
import { Table } from "antd";

const PostList = () => {
  const { tableProps } = useTable<IPost>();

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="ID" />
        <Table.Column dataIndex="title" title="Title" width="50%" />
        <Table.Column<IPost>
          title="Actions"
          dataIndex="actions"
          key="actions"
          render={(_, record) => (
            // highlight-next-line
            <DeleteButton size="small" recordItemId={record.id} />
          )}
          width="50%"
        />
      </Table>
    </List>
  );
};

interface IPost {
  id: number;
  title: string;
}
// visible-block-end

render(
  <ReactRouter.BrowserRouter>
    <RefineAntdDemo
      resources={[
        {
          name: "posts",
          list: "/posts",
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
      </ReactRouter.Routes>
    </RefineAntdDemo>
  </ReactRouter.BrowserRouter>,
);
```

## Properties

### recordItemId

`recordItemId` allows us to manage which record will be deleted. By default, the `recordItemId` is inferred from the route params.

```tsx live disableScroll previewHeight=120px
setInitialRoutes(["/posts"]);

// visible-block-start
import { DeleteButton } from "@refinedev/antd";

const MyDeleteComponent = () => {
  return (
    <DeleteButton
      resource="posts"
      // highlight-next-line
      recordItemId="123"
    />
  );
};

// visible-block-end

render(
  <ReactRouter.BrowserRouter>
    <RefineAntdDemo
      resources={[
        {
          name: "posts",
          list: "/posts",
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
          <ReactRouter.Route index element={<MyDeleteComponent />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineAntdDemo>
  </ReactRouter.BrowserRouter>,
);
```

Clicking the button will trigger the [`useDelete`](/core/docs/data/hooks/use-delete) method and then the record whose resource is "posts" and whose id is "123" will be deleted.

### resource

`resource` allows us to manage which resource's record is going to be deleted. By default, the `resource` is inferred from the route params.

```tsx live disableScroll previewHeight=120px
setInitialRoutes(["/categories"]);

// visible-block-start
import { DeleteButton } from "@refinedev/antd";

const MyDeleteComponent = () => {
  return <DeleteButton resource="categories" recordItemId="123" />;
};

// visible-block-end

render(
  <ReactRouter.BrowserRouter>
    <RefineAntdDemo
      resources={[
        {
          name: "posts",
          list: "/posts",
        },
        {
          name: "categories",
          list: "/categories",
        },
      ]}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route path="/categories" element={<MyDeleteComponent />} />
      </ReactRouter.Routes>
    </RefineAntdDemo>
  </ReactRouter.BrowserRouter>,
);
```

Clicking the button will trigger the [`useDelete`](/core/docs/data/hooks/use-delete) method and then the record whose resource is "categories" and whose id is "123" will be deleted.

If you have multiple resources with the same name, you can pass the `identifier` instead of the `name` of the resource. It will only be used as the main matching key for the resource, data provider methods will still work with the `name` of the resource defined in the `<Refine/>` component.

> For more information, refer to the [`identifier` section of the `<Refine/>` component documentation &#8594](/core/docs/core/refine-component#identifier)

### onSuccess

`onSuccess` can be used if you want to do something based on the results returned after the delete request.

For example, let's `console.log` after deletion:

```tsx live disableScroll previewHeight=120px
setInitialRoutes(["/posts"]);

// visible-block-start
import { DeleteButton } from "@refinedev/antd";

const MyDeleteComponent = () => {
  return (
    <DeleteButton
      resource="posts"
      recordItemId="1"
      onSuccess={(value) => {
        console.log(value);
      }}
    />
  );
};
// visible-block-end

const App = () => {
  const simpleRestDataProvider = dataProvider(
    "https://api.fake-rest.refine.dev",
  );

  const customDataProvider = {
    ...simpleRestDataProvider,
    deleteOne: async ({ resource, id, variables }) => {
      await new Promise((resolve) => setTimeout(resolve, 500));

      return {
        message: "You have successfully deleted the record",
      };
    },
  };

  return (
    <ReactRouter.BrowserRouter>
      <RefineAntdDemo
        dataProvider={customDataProvider}
        resources={[
          {
            name: "posts",
            list: "/posts",
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
            <ReactRouter.Route index element={<MyDeleteComponent />} />
          </ReactRouter.Route>
        </ReactRouter.Routes>
      </RefineAntdDemo>
    </ReactRouter.BrowserRouter>
  );
};

render(<App />);
```

### mutationMode

Determines which mode mutation will have while executing `<DeleteButton>`.

> For more information, refer to the [mutation mode documentation &#8594](/core/docs/advanced-tutorials/mutation-mode)

```tsx live disableScroll previewHeight=360px
setInitialRoutes(["/posts"]);

// visible-block-start
import { List, DeleteButton, useTable } from "@refinedev/antd";
import { Table } from "antd";

const PostList = () => {
  const { tableProps } = useTable<IPost>();

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="ID" />
        <Table.Column dataIndex="title" title="Title" />
        <Table.Column<IPost>
          title="Actions"
          dataIndex="actions"
          render={(_, record) => (
            <DeleteButton
              size="small"
              recordItemId={record.id}
              // highlight-next-line
              mutationMode="undoable"
            />
          )}
        />
      </Table>
    </List>
  );
};

interface IPost {
  id: number;
  title: string;
}
// visible-block-end

render(
  <ReactRouter.BrowserRouter>
    <RefineAntdDemo
      resources={[
        {
          name: "posts",
          list: "/posts",
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
      </ReactRouter.Routes>
    </RefineAntdDemo>
  </ReactRouter.BrowserRouter>,
);
```

### hideText

It is used to show and not show the text of the button. When `true`, only the button icon is visible.

```tsx live disableScroll previewHeight=120px
setInitialRoutes(["/posts"]);

// visible-block-start
import { DeleteButton } from "@refinedev/antd";

const MyDeleteComponent = () => {
  return (
    <DeleteButton
      // highlight-next-line
      hideText={true}
      recordItemId="123"
    />
  );
};

// visible-block-end

render(
  <ReactRouter.BrowserRouter>
    <RefineAntdDemo
      resources={[
        {
          name: "posts",
          list: "/posts",
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
          <ReactRouter.Route index element={<MyDeleteComponent />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineAntdDemo>
  </ReactRouter.BrowserRouter>,
);
```

### accessControl

This prop can be used to skip access control check with its `enabled` property or to hide the button when the user does not have the permission to access the resource with `hideIfUnauthorized` property. This is relevant only when an [`accessControlProvider`](/core/docs/authorization/access-control-provider) is provided to [`<Refine/>`](/core/docs/core/refine-component)

```tsx
import { DeleteButton } from "@refinedev/antd";

export const MyListComponent = () => {
  return (
    <DeleteButton
      accessControl={{
        enabled: true,
        hideIfUnauthorized: true,
      }}
    />
  );
};
```

### ~~resourceNameOrRouteName~~ <PropTag deprecated />

Use `resource` prop instead.

## API Reference

### Properties

<PropsTable module="@refinedev/antd/DeleteButton" />

:::simple External Props

It also accepts all props of Ant Design [Button](https://ant.design/components/button/#API).

:::
