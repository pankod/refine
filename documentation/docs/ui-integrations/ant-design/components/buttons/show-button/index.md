---
title: "Ant Design Show Button Component | Navigation UI in Refine v5"
display_title: "Show"
sidebar_label: "Show"
description: "Integrate Show Button in Refine v5. Learn best practices. Learn integration patterns for enterprise UI, components for polished admin UIs."
swizzle: true
---

`<ShowButton>` uses Ant Design's [`<Button>`](https://ant.design/components/button/) component and the`show` method from [`useNavigation`](/core/docs/routing/hooks/use-navigation/) under the hood.

It can be useful when redirecting the app to the show page with the record id route of resource.

:::simple Good to know

You can swizzle this component to customize it with the [**Refine CLI**](/core/docs/packages/cli/)

:::

## Usage

```tsx live previewHeight=360px
setInitialRoutes(["/posts"]);

// visible-block-start
import {
  List,
  useTable,
  // highlight-next-line
  ShowButton,
} from "@refinedev/antd";
import { Table } from "antd";

const PostList: React.FC = () => {
  const { tableProps } = useTable<IPost>();

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="ID" />
        <Table.Column dataIndex="title" title="Title" width="100%" />
        <Table.Column<IPost>
          title="Actions"
          dataIndex="actions"
          key="actions"
          render={(_, record) => (
            // highlight-next-line
            <ShowButton size="small" recordItemId={record.id} />
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

const PostShow = () => {
  const parsed = RefineCore.useParsed();
  return <pre>{JSON.stringify(parsed, null, 2)}</pre>;
};

render(
  <ReactRouter.BrowserRouter>
    <RefineAntdDemo
      resources={[
        {
          name: "posts",
          list: "/posts",
          show: "/posts/show/:id",
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
          <ReactRouter.Route path="show/:id" element={<PostShow />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineAntdDemo>
  </ReactRouter.BrowserRouter>,
);
```

## Properties

### recordItemId

`recordItemId` is used to append the record id to the end of the route path. By default, the `recordItemId` is inferred from the route params.

```tsx live previewHeight=120px
setInitialRoutes(["/posts"]);

// visible-block-start
import { ShowButton } from "@refinedev/antd";

const MyShowComponent = () => {
  return (
    <ShowButton
      resource="posts"
      // highlight-next-line
      recordItemId="123"
    />
  );
};

// visible-block-end

const PostShow = () => {
  const parsed = RefineCore.useParsed();
  return <pre>{JSON.stringify(parsed, null, 2)}</pre>;
};

render(
  <ReactRouter.BrowserRouter>
    <RefineAntdDemo
      resources={[
        {
          name: "posts",
          list: "/posts",
          show: "/posts/show/:id",
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
          <ReactRouter.Route index element={<MyShowComponent />} />
          <ReactRouter.Route path="show/:id" element={<PostShow />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineAntdDemo>
  </ReactRouter.BrowserRouter>,
);
```

Clicking the button will trigger the `show` method of [`useNavigation`](/core/docs/routing/hooks/use-navigation/) and then redirect the app to the `show` action path of the resource, filling the necessary parameters in the route.

### resource

The redirection endpoint is defined by the `resource`'s `show` action path. By default, `<ShowButton>` uses the inferred resource from the route.

```tsx live previewHeight=120px
setInitialRoutes(["/categories"]);

// visible-block-start
import { ShowButton } from "@refinedev/antd";

const MyShowComponent = () => {
  return (
    <ShowButton
      // highlight-next-line
      resource="categories"
      recordItemId="123"
    />
  );
};

// visible-block-end

const CategoryShow = () => {
  const parsed = RefineCore.useParsed();
  return <pre>{JSON.stringify(parsed, null, 2)}</pre>;
};

render(
  <ReactRouter.BrowserRouter>
    <RefineAntdDemo
      resources={[
        {
          name: "posts",
          list: "/posts",
          show: "/posts/show/:id",
        },
        {
          name: "categories",
          list: "/categories",
          show: "/categories/show/:id",
        },
      ]}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route
          path="/categories"
          element={
            <div style={{ padding: 16 }}>
              <ReactRouter.Outlet />
            </div>
          }
        >
          <ReactRouter.Route index element={<MyShowComponent />} />
          <ReactRouter.Route
            path="/categories/show/:id"
            element={<CategoryShow />}
          />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineAntdDemo>
  </ReactRouter.BrowserRouter>,
);
```

Clicking the button will trigger the `show` method of [`useNavigation`](/core/docs/routing/hooks/use-navigation/) and then redirect the app to the `show` action path of the resource, filling the necessary parameters in the route.

If you have multiple resources with the same name, you can pass the `identifier` instead of the `name` of the resource. It will only be used as the main matching key for the resource, data provider methods will still work with the `name` of the resource defined in the `<Refine/>` component.

> For more information, refer to the [`identifier` of the `<Refine/>` component documentation &#8594](/core/docs/core/refine-component#identifier)

### meta

It is used to pass additional parameters to the `show` method of [`useNavigation`](/core/docs/routing/hooks/use-navigation/). By default, existing parameters in the route are used by the `show` method. You can pass additional parameters or override the existing ones using the `meta` prop.

If the `show` action route is defined by the pattern: `/posts/:authorId/show/:id`, the `meta` prop can be used as follows:

```tsx
const MyComponent = () => {
  return <ShowButton meta={{ authorId: "10" }} />;
};
```

### hideText

`hideText` is used to hide the text of the button. When its `true`, only the button icon will be visible.

```tsx live previewHeight=120px
setInitialRoutes(["/posts"]);

// visible-block-start
import { ShowButton } from "@refinedev/antd";

const MyShowComponent = () => {
  return (
    <ShowButton
      // highlight-next-line
      hideText={true}
      resource="posts"
      recordItemId="123"
    />
  );
};

// visible-block-end

const PostShow = () => {
  const parsed = RefineCore.useParsed();
  return <pre>{JSON.stringify(parsed, null, 2)}</pre>;
};

render(
  <ReactRouter.BrowserRouter>
    <RefineAntdDemo
      resources={[
        {
          name: "posts",
          list: "/posts",
          show: "/posts/show/:id",
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
          <ReactRouter.Route index element={<MyShowComponent />} />
          <ReactRouter.Route path="show/:id" element={<PostShow />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineAntdDemo>
  </ReactRouter.BrowserRouter>,
);
```

### accessControl

This prop can be used to skip the access control check with its `enabled` property or to hide the button when the user does not have the permission to access the resource with its `hideIfUnauthorized` property. However, this only works when an [`accessControlProvider`](/core/docs/authorization/access-control-provider/) is provided to [`<Refine/>`](/core/docs/core/refine-component/)

```tsx
import { ShowButton } from "@refinedev/antd";

export const MyListComponent = () => {
  return (
    <ShowButton
      accessControl={{
        enabled: true,
        hideIfUnauthorized: true,
      }}
    />
  );
};
```

## API Reference

### Properties

<PropsTable module="@refinedev/antd/ShowButton" />

:::simple External Props

It also accepts all props of Ant Design [Button](https://ant.design/components/button/#API).

:::
