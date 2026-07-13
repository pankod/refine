---
title: "MUI Refresh Button | Refine v4 Data Sync"
display_title: "Refresh"
sidebar_label: "Refresh"
description: "Trigger manual data invalidation in Material UI views. Official documentation for using the Refresh Button to keep your UI updated in Refine v4."
swizzle: true
---

`<RefreshButton>` uses Material UI [`<Button>`](https://mui.com/material-ui/react-button/) component to update the data shown on the page via the [`useInvalidate`][use-invalidate] hook.

:::simple Good to know

You can swizzle this component with the [**Refine CLI**](/core/docs/packages/list-of-packages) to customize it.

:::

## Usage

```tsx live previewHeight=360px
setInitialRoutes(["/posts/show/123"]);

// visible-block-start
import { useShow } from "@refinedev/core";
// highlight-next-line
import { Show, RefreshButton } from "@refinedev/mui";
import { Typography, Stack } from "@mui/material";

const PostShow: React.FC = () => {
  const { queryResult } = useShow<IPost>();
  const { data, isLoading } = queryResult;
  const record = data?.data;

  return (
    <Show
      isLoading={isLoading}
      headerButtons={
        // highlight-start
        <RefreshButton />
        // highlight-end
      }
    >
      <Typography fontWeight="bold">Id</Typography>
      <Typography>{record?.id}</Typography>
      <Typography fontWeight="bold">Title</Typography>
      <Typography>{record?.title}</Typography>
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
    <RefineMuiDemo
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
    </RefineMuiDemo>
  </ReactRouter.BrowserRouter>,
);
```

## Properties

### recordItemId

`recordItemId` allows us to manage which data is going to be refreshed. By default, the `recordItemId` is inferred from the route params.

```tsx live previewHeight=120px
setInitialRoutes(["/posts"]);

// visible-block-start
import { RefreshButton } from "@refinedev/mui";

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
    <RefineMuiDemo
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
    </RefineMuiDemo>
  </ReactRouter.BrowserRouter>,
);
```

Clicking the button will trigger the [`useInvalidate`][use-invalidate] hook and then fetch the record whose resource is "post" and whose id is "123".

### resource

`resource` allows us to manage which resource is going to be refreshed. By default, the `resource` is inferred from the route params.

```tsx live previewHeight=120px
setInitialRoutes(["/categories"]);

// visible-block-start
import { RefreshButton } from "@refinedev/mui";

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
    <RefineMuiDemo
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
            <div style={{ padding: 16 }}>
              <MyRefreshComponent />
            </div>
          }
        />
      </ReactRouter.Routes>
    </RefineMuiDemo>
  </ReactRouter.BrowserRouter>,
);
```

Clicking the button will trigger the [`useInvalidate`][use-invalidate] hook and then fetches the record whose resource is "categories" and whose id is "2".

If you have multiple resources with the same name, you can pass the `identifier` instead of the `name` of the resource. It will only be used as the main matching key for the resource, data provider methods will still work with the `name` of the resource defined in the `<Refine/>` component.

> For more information, refer to the [`identifier` section of the `<Refine/>` component documentation &#8594](/core/docs/core/refine-component#identifier)

### hideText

`hideText` is used to show and hide the text of the button. When `true`, only the button icon is visible.

```tsx live previewHeight=120px
setInitialRoutes(["/posts"]);

// visible-block-start
import { RefreshButton } from "@refinedev/mui";

const MyRefreshComponent = () => {
  return (
    <RefreshButton
      resource="posts"
      recordItemId="123"
      // highlight-next-line
      hideText
    />
  );
};
// visible-block-end

render(
  <ReactRouter.BrowserRouter>
    <RefineMuiDemo
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
    </RefineMuiDemo>
  </ReactRouter.BrowserRouter>,
);
```

### ~~resourceNameOrRouteName~~ <PropTag deprecated />

Use the `resource` prop instead.

## API Reference

### Properties

<PropsTable module="@refinedev/mui/RefreshButton" />

:::simple External Props

It also accepts all props of Material UI [Button](https://mui.com/material-ui/api/button/).

:::

[use-invalidate]: /core/docs/data/hooks/use-invalidate
