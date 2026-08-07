---
title: "Ant Design List Button | Refine v4 Navigation"
display_title: "List"
sidebar_label: "List"
description: "Documentation for the List Button. Learn how to easily navigate back to resource collections from Create, Edit, or Show views in Refine v4."
swizzle: true
---

`<ListButton>` is using Ant Design's [`<Button>`](https://ant.design/components/button/) component and the `list` method from [`useNavigation`](/core/docs/routing/hooks/use-navigation) under the hood.

It can be useful when redirecting the app to the list page route of resource.

:::simple Good to know

You can swizzle this component to customize it with the [**Refine CLI**](/core/docs/packages/list-of-packages)

:::

## Usage

```tsx live previewHeight=360px
setInitialRoutes(["/posts/show/123"]);

// visible-block-start
import { useShow } from "@refinedev/core";
import {
  Show,
  // highlight-next-line
  ListButton,
} from "@refinedev/antd";
import { Typography } from "antd";

const { Title, Text } = Typography;

const PostShow: React.FC = () => {
  const { queryResult } = useShow<IPost>();
  const { data, isLoading } = queryResult;
  const record = data?.data;

  return (
    // highlight-next-line
    <Show headerButtons={<ListButton />} isLoading={isLoading}>
      <Title level={5}>Id</Title>
      <Text>{record?.id}</Text>

      <Title level={5}>Title</Title>
      <Text>{record?.title}</Text>
    </Show>
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
          <ReactRouter.Route
            index
            element={<div>Your list page here...</div>}
          />
          <ReactRouter.Route path="show/:id" element={<PostShow />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineAntdDemo>
  </ReactRouter.BrowserRouter>,
);
```

The button text is defined automatically by Refine based on the `resource` definition.

## Properties

### resource

The redirection endpoint is defined by the `resource`'s `list` action path. By default, `<ListButton>` uses the inferred resource from the route.

```tsx live previewHeight=120px
setInitialRoutes(["/"]);

// visible-block-start
import { ListButton } from "@refinedev/antd";

const MyListComponent = () => {
  return <ListButton resource="categories" />;
};

// visible-block-end

render(
  <ReactRouter.BrowserRouter>
    <RefineAntdDemo
      resources={[
        {
          name: "categories",
          list: "/categories",
        },
      ]}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route
          path="/"
          element={
            <div style={{ padding: 16 }}>
              <ReactRouter.Outlet />
            </div>
          }
        >
          <ReactRouter.Route index element={<MyListComponent />} />
          <ReactRouter.Route
            path="/categories"
            element={<div>Your list page here...</div>}
          />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineAntdDemo>
  </ReactRouter.BrowserRouter>,
);
```

Clicking the button will trigger the `list` method of [`useNavigation`](/core/docs/routing/hooks/use-navigation) and then redirect the app to the `list` action path of the resource, filling the necessary parameters in the route.

If you have multiple resources with the same name, you can pass the `identifier` instead of the `name` of the resource. It will only be used as the main matching key for the resource, data provider methods will still work with the `name` of the resource defined in the `<Refine/>` component.

> For more information, refer to the [`identifier` section of the `<Refine/>` component documentation &#8594](/core/docs/core/refine-component#identifier)

### meta

It is used to pass additional parameters to the `list` method of [`useNavigation`](/core/docs/routing/hooks/use-navigation). By default, existing parameters in the route are used by the `list` method. You can pass additional parameters or override the existing ones using the `meta` prop.

If the `list` action route is defined by the pattern: `/:authorId/posts`, the `meta` prop can be used as follows:

```tsx
const MyComponent = () => {
  return <ListButton meta={{ authorId: "10" }} />;
};
```

### hideText

`hideText` is used to hide the text of the button. When its `true`, only the button icon will be visible.

```tsx live previewHeight=120px
setInitialRoutes(["/"]);

// visible-block-start
import { ListButton } from "@refinedev/antd";

const MyListComponent = () => {
  return (
    <ListButton
      resource="posts"
      // highlight-next-line
      hideText={true}
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
          path="/"
          element={
            <div style={{ padding: 16 }}>
              <ReactRouter.Outlet />
            </div>
          }
        >
          <ReactRouter.Route index element={<MyListComponent />} />
          <ReactRouter.Route
            path="/posts"
            element={<div>Your list page here...</div>}
          />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineAntdDemo>
  </ReactRouter.BrowserRouter>,
);
```

### accessControl

This prop can be used to skip access control check with its `enabled` property or to hide the button when the user does not have the permission to access the resource with `hideIfUnauthorized` property. This is relevant only when an [`accessControlProvider`](/core/docs/authorization/access-control-provider) is provided to [`<Refine/>`](/core/docs/core/refine-component)

```tsx
import { ListButton } from "@refinedev/antd";

export const MyListComponent = () => {
  return (
    <ListButton
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

<PropsTable module="@refinedev/antd/ListButton" />

:::simple External Props

It also accepts all props of Ant Design [Button](https://ant.design/components/button/#API).

:::
