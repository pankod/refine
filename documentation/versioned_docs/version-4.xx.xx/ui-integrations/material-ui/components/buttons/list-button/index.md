---
title: "MUI List Button | Refine v4 UI Components"
display_title: "List"
sidebar_label: "List"
description: "Documentation for the Material UI List Button. Learn how to navigate back to resource collections from any view in your Refine v4 app."
swizzle: true
---

`<ListButton>` is using Material UI's [`<Button>`](https://ant.design/components/button/) component. It uses the `list` method from [`useNavigation`](/core/docs/routing/hooks/use-navigation) under the hood. It can be useful when redirecting the app to the list page route of resource.

:::simple Good to know

You can swizzle this component with the [**Refine CLI**](/core/docs/packages/list-of-packages) to customize it.

:::

```tsx live shared
const ListPage = () => {
  const parsed = RefineCore.useParsed();
  return <pre>{JSON.stringify(parsed, null, 2)}</pre>;
};
```

## Usage

```tsx live previewHeight=340px
setInitialRoutes(["/posts/create"]);

// visible-block-start
import { Create, ListButton } from "@refinedev/mui";

const PostCreate: React.FC = () => {
  return (
    <Create headerButtons={<ListButton />}>Rest of the page here...</Create>
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
          <ReactRouter.Route index element={<ListPage />} />
          <ReactRouter.Route path="create" element={<PostCreate />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMuiDemo>
  </ReactRouter.BrowserRouter>,
);
```

The button text is defined automatically by Refine based on the `resource` definition.

## Properties

### resource

Redirection endpoint is defined by the `resource`'s `list` action path. By default, `<ListButton>` uses the inferred resource from the route.

```tsx live disableScroll previewHeight=120px
// visible-block-start
setInitialRoutes(["/"]);
import { ListButton } from "@refinedev/mui";

const MyListComponent = () => {
  return <ListButton resource="categories" recordItemId="123" />;
};
// visible-block-end

render(
  <ReactRouter.BrowserRouter>
    <RefineMuiDemo
      resources={[
        {
          name: "categories",
          list: "/categories",
        },
      ]}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route path="/" element={<MyListComponent />} />
        <ReactRouter.Route path="/categories" element={<ListPage />} />
      </ReactRouter.Routes>
    </RefineMuiDemo>
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

`hideText` is used to show and hide the text of the button. When `true`, only the button icon is visible.

```tsx live disableScroll previewHeight=120px
// visible-block-start
import { ListButton } from "@refinedev/mui";
import { List } from "@refinedev/mui";

const MyListComponent = () => {
  return <ListButton resource="posts" hideText />;
};

// visible-block-end

render(
  <ReactRouter.BrowserRouter>
    <RefineMuiDemo
      initialRoutes={["/"]}
      resources={[
        {
          name: "posts",
          list: "/posts",
        },
      ]}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route path="/" element={<MyListComponent />} />
        <ReactRouter.Route path="/posts" element={<ListPage />} />
      </ReactRouter.Routes>
    </RefineMuiDemo>
  </ReactRouter.BrowserRouter>,
);
```

### accessControl

This prop can be used to skip access control check with its `enabled` property or to hide the button when the user does not have the permission to access the resource with `hideIfUnauthorized` property. This is relevant only when an [`accessControlProvider`](/core/docs/authorization/access-control-provider) is provided to [`<Refine/>`](/core/docs/core/refine-component)

```tsx
import { ListButton } from "@refinedev/mui";

export const MyListComponent = () => {
  return (
    <ListButton accessControl={{ enabled: true, hideIfUnauthorized: true }} />
  );
};
```

### ~~resourceNameOrRouteName~~ <PropTag deprecated />

Use `resource` prop instead.

## API Reference

### Properties

<PropsTable module="@refinedev/mui/ListButton" />

:::simple External Props

It also accepts all props of Material UI [Button](https://mui.com/material-ui/api/button/).

:::
