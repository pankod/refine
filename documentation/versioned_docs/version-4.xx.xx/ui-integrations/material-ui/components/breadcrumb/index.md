---
title: "MUI Breadcrumb Component | Refine v4 Navigation"
display_title: "Breadcrumb"
sidebar_label: "Breadcrumb"
description: "Documentation on dynamic breadcrumbs with Material UI. Learn how to enhance your app's navigation using Refine v4's internal routing system."
swizzle: true
---

A breadcrumb displays the current location within a hierarchy. It allows going back to states higher up in the hierarchy. `<Breadcrumb>` component built with Material UI [Breadcrumb][mui-breadcrumb] components using the [`useBreadcrumb`](/core/docs/core/hooks/utilities/use-breadcrumb) hook.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/show/123
setInitialRoutes(["/posts/show/123"]);

// visible-block-start
import { Show, Breadcrumb } from "@refinedev/mui";

const PostShow: React.FC = () => {
  return (
    <Show
      // highlight-next-line
      breadcrumb={<Breadcrumb showHome={false} />}
    >
      <p>Content of your show page...</p>
    </Show>
  );
};
// visible-block-end

const PostList = () => {
  return (
    <RefineMui.List>
      <p>Content of your list page...</p>
    </RefineMui.List>
  );
};

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
          <ReactRouter.Route index element={<PostList />} />
        </ReactRouter.Route>
        <ReactRouter.Route
          path="/posts/show/:id"
          element={
            <div style={{ padding: 16 }}>
              <ReactRouter.Outlet />
            </div>
          }
        >
          <ReactRouter.Route index element={<PostShow />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMuiDemo>
  </ReactRouter.BrowserRouter>,
);
```

:::simple Good to know

- You can swizzle this component with the [**Refine CLI**](/core/docs/packages/list-of-packages) to customize it.

- In earlier versions of Refine, `<Refine>` component had accepted `DashboardPage` which could be used to add an index page to your app. With the changes in `routerProvider` API of Refine, `DashboardPage` is deprecated. You can now define an index route yourself manually by your router package.

- In earlier versions, the home icon in the `Breadcrumb` was created by the `DashboardPage`, now it is rendered if you define a an action route as `/` in any one of your resources. It will be rendered with the home icon regardless of the current route. You can also hide the home icon by setting `showHome` to `false`.

:::

## Properties

### breadcrumbProps

`<Breadcrumb>` component uses the Material UI's [Breadcrumb][mui-breadcrumb] component so it can be configured with the `breadcrumbProps` property.

```tsx
import { List, Breadcrumb } from "@refinedev/mui";

export const PostList: React.FC = () => {
  return (
    <List breadcrumb={<Breadcrumb breadcrumbProps={{ separator: "-" }} />}>
      ...
    </List>
  );
};
```

### showHome

If you have a page with route `/`, it will be used as the root of the hierarchy and shown in the `Breadcrumb` with a home icon. To hide the root item, set `showHome` to `false.`

```tsx
import { List, Breadcrumb } from "@refinedev/antd";

export const PostList: React.FC = () => {
  return (
    <List
      // highlight-next-line
      breadcrumb={<Breadcrumb showHome={true} />}
    >
      ...
    </List>
  );
};
```

### meta

If your routes has additional parameters in their paths, you can pass the `meta` property to the `<Breadcrumb>` component to use them while creating the paths and filling the parameters in the paths. By default, existing URL parameters are used. You can use `meta` to override them or add new ones.

```tsx
import { List, Breadcrumb } from "@refinedev/mui";

export const PostList: React.FC = () => {
  return (
    <List
      // highlight-next-line
      breadcrumb={<Breadcrumb meta={{ authorId: "123" }} />}
    >
      ...
    </List>
  );
};
```

### hideIcons

If you don't want to show the resource icons on the breadcrumb, you can set `hideIcons` to `true`.

```tsx
import { List, Breadcrumb } from "@refinedev/mui";

export const PostList: React.FC = () => {
    return (
        <List breadcrumb={<Breadcrumb hideIcons />}>...</List>;
    );
};
```

## API Reference

### Properties

<PropsTable module="@refinedev/mui/Breadcrumb"
breadcrumbProps-type="[BreadcrumbProps](https://mui.com/material-ui/react-breadcrumbs/#main-content)"
breadcrumbProps-description="Passes properties for [`<Breadcrumb>`](https://mui.com/material-ui/react-breadcrumbs/#api)"
/>

[mui-breadcrumb]: https://mui.com/material-ui/react-breadcrumbs/#main-content
