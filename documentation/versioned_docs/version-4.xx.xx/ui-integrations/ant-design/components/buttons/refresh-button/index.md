---
title: "Ant Design Refresh Button | Refine v4 Data Sync"
display_title: "Refresh"
sidebar_label: "Refresh"
description: "Trigger manual data invalidation with the Refresh Button. Documentation on keeping your Ant Design views up-to-date in Refine v4 applications."
swizzle: true
---

`<RefreshButton>` uses Ant Design's [`<Button>`](https://ant.design/components/button/) component to update the data shown on the page via the [`useInvalidate`][use-invalidate] hook.

:::simple Good to know

You can swizzle this component to customize it with the [**Refine CLI**](/core/docs/packages/list-of-packages)

:::

## Usage

```tsx live previewHeight=360px
setInitialRoutes(["/posts/show/123"]);

// visible-block-start
import { useShow } from "@refinedev/core";
import {
  // highlight-next-line
  RefreshButton,
  Show,
} from "@refinedev/antd";
import { Typography } from "antd";

const { Title, Text } = Typography;

const PostShow: React.FC = () => {
  const { queryResult } = useShow<IPost>();
  const { data, isLoading } = queryResult;
  const record = data?.data;

  return (
    <Show
      isLoading={isLoading}
      // highlight-next-line
      headerButtons={<RefreshButton />}
    >
      <Title level={5}>Id</Title>
      <Text>{record?.id}</Text>

      <Title level={5}>Title</Title>
      <Text>{record?.title}</Text>
    </Show>
  );
};

interface IPost {
  id: string;
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
          <ReactRouter.Route index element={<div>List page here...</div>} />
          <ReactRouter.Route path="show/:id" element={<PostShow />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineAntdDemo>
  </ReactRouter.BrowserRouter>,
);
```

## Properties

### recordItemId

`recordItemId` allows us to manage which data is going to be refreshed. By default, the `recordItemId` is inferred from the route params.

```tsx live previewHeight=120px
setInitialRoutes(["/posts"]);

// visible-block-start
import { RefreshButton } from "@refinedev/antd";

const MyRefreshComponent = () => {
  return (
    <RefreshButton
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
          <ReactRouter.Route index element={<MyRefreshComponent />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineAntdDemo>
  </ReactRouter.BrowserRouter>,
);
```

Clicking the button will trigger the [`useInvalidate`][use-invalidate] hook and then fetch the record whose resource is "post" and whose id is "123".

### resource

`resource` allows us to manage which resource is going to be refreshed. By default, the `resource` is inferred from the route params.

```tsx live previewHeight=120px
setInitialRoutes(["/categories"]);

// visible-block-start
import { RefreshButton } from "@refinedev/antd";

const MyRefreshComponent = () => {
  return (
    <RefreshButton
      // highlight-next-line
      resource="categories"
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
        {
          name: "categories",
          list: "/categories",
        },
      ]}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route
          path="/categories"
          element={
            <div style={{ padding: "16px" }}>
              <MyRefreshComponent />
            </div>
          }
        />
      </ReactRouter.Routes>
    </RefineAntdDemo>
  </ReactRouter.BrowserRouter>,
);
```

Clicking the button will trigger the [`useInvalidate`][use-invalidate] hook and then fetches the record whose resource is "categories" and whose id is "2".

If you have multiple resources with the same name, you can pass the `identifier` instead of the `name` of the resource. It will only be used as the main matching key for the resource, data provider methods will still work with the `name` of the resource defined in the `<Refine/>` component.

> For more information, refer to the [`identifier` of the `<Refine/>` component documentation &#8594](/core/docs/core/refine-component#identifier)

### hideText

`hideText` is used to hide the text of the button. When its `true`, only the button icon will be visible.

```tsx live previewHeight=120px
setInitialRoutes(["/posts"]);

// visible-block-start
import { RefreshButton } from "@refinedev/antd";

const MyRefreshComponent = () => {
  return (
    <RefreshButton
      // highlight-next-line
      hideText
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
          <ReactRouter.Route index element={<MyRefreshComponent />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineAntdDemo>
  </ReactRouter.BrowserRouter>,
);
```

### ~~resourceNameOrRouteName~~ <PropTag deprecated />

Use `resource` prop instead.

## API Reference

### Properties

<PropsTable module="@refinedev/antd/RefreshButton" />

:::simple External Props

It also accepts all props of Ant Design [Button](https://ant.design/components/button/#API).

:::

[use-invalidate]: /core/docs/data/hooks/use-invalidate
