---
title: "Ant Design Breadcrumb | Refine v4 Navigation"
display_title: "Breadcrumb"
sidebar_label: "Breadcrumb"
description: "Automatically generate dynamic breadcrumbs for your admin panel. Guide to using the Ant Design Breadcrumb component with Refine v4's routing logic."
swizzle: true
---

A breadcrumb displays the current location within a hierarchy. It allows going back to states higher up in the hierarchy. The `<Breadcrumb>` component was built with Ant Design's [Breadcrumb][antd-breadcrumb] components using the [`useBreadcrumb`](/core/docs/core/hooks/utilities/use-breadcrumb) hook.

```tsx live url=http://localhost:3000/posts/show/123 previewHeight=280px disableScroll
// visible-block-start
import { BrowserRouter } from "react-router";
import {
  ConfigProvider,
  RefineThemes,
  Show,
  // highlight-next-line
  Breadcrumb,
} from "@refinedev/antd";

//highlight-start
const PostIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon icon-tabler icon-tabler-list"
    width={18}
    height={18}
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke="currentColor"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
    <line x1={9} y1={6} x2={20} y2={6}></line>
    <line x1={9} y1={12} x2={20} y2={12}></line>
    <line x1={9} y1={18} x2={20} y2={18}></line>
    <line x1={5} y1={6} x2={5} y2="6.01"></line>
    <line x1={5} y1={12} x2={5} y2="12.01"></line>
    <line x1={5} y1={18} x2={5} y2="18.01"></line>
  </svg>
);
//highlight-end

const PostShow: React.FC = () => {
  return (
    <Show
      // highlight-next-line
      breadcrumb={<Breadcrumb />}
    >
      <p>Content of your show page...</p>
    </Show>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <ConfigProvider theme={RefineThemes.Blue}>
        <Refine
          //...
          resources={[
            {
              name: "posts",
              list: "/posts",
              show: "/posts/show/:id",
              // highlight-next-line
              meta: { icon: PostIcon },
            },
          ]}
        >
          //...
        </Refine>
      </ConfigProvider>
    </BrowserRouter>
  );
};
// visible-block-end

const PostList = () => {
  return (
    <RefineAntd.List>
      <p>Content of your list page...</p>
      <RefineAntd.ShowButton recordItemId="123" resource="posts">
        Show Post 123
      </RefineAntd.ShowButton>
    </RefineAntd.List>
  );
};

setInitialRoutes(["/posts/show/123"]);

render(
  <ReactRouter.BrowserRouter>
    <RefineAntdDemo
      resources={[
        {
          name: "posts",
          meta: { icon: PostIcon },
          show: "/posts/show/:id",
          list: "/posts",
        },
      ]}
    >
      <RefineAntd.Layout>
        <ReactRouter.Routes>
          <ReactRouter.Route path="/posts" element={<PostList />} />
          <ReactRouter.Route path="/posts/show/:id" element={<PostShow />} />
        </ReactRouter.Routes>
      </RefineAntd.Layout>
    </RefineAntdDemo>
  </ReactRouter.BrowserRouter>,
);
```

:::simple Good to know

- You can swizzle this component to customize it with the [**Refine CLI**](/core/docs/packages/list-of-packages)

- In the earlier versions of Refine, `<Refine>` component had accepted `DashboardPage`, which could be used to add an index page to your app. With the changes in the `routerProvider` API of Refine however, `DashboardPage` is deprecated. You can now define an index route yourself manually by your router package.

- In earlier versions, the home icon in the `Breadcrumb` was created by the `DashboardPage`, now it is rendered if you define a an action route as `/` in any one of your resources. It will be rendered with the home icon regardless of the current route. You can also hide the home icon by setting `showHome` to `false`.

:::

### breadcrumbProps

The `<Breadcrumb>` component uses the Ant Design [Breadcrumb][antd-breadcrumb] component so it can be configured with the `breadcrumbProps` property.

```tsx
import { List, Breadcrumb } from "@refinedev/antd";

export const PostList: React.FC = () => {
  return (
    <List
      // highlight-next-line
      breadcrumb={<Breadcrumb breadcrumbProps={{ separator: "-" }} />}
    >
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

If your routes has additional parameters in their paths, you can pass the `meta` property to the `<Breadcrumb>` component to use them while creating the paths and filling the parameters in the paths. By default, the existing URL parameters are used. You can use `meta` to override them or add new ones.

```tsx
import { List, Breadcrumb } from "@refinedev/antd";

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
import { List, Breadcrumb } from "@refinedev/antd";

export const PostList: React.FC = () => {
  return (
    <List
      // highlight-next-line
      breadcrumb={<Breadcrumb hideIcons />}
    >
      ...
    </List>
  );
};
```

## API Reference

### Properties

<PropsTable module="@refinedev/antd/Breadcrumb"
breadcrumbProps-type="[BreadcrumbProps](https://ant.design/components/breadcrumb/#API)"
breadcrumbProps-description="Passes properties for [`<Breadcrumb>`](https://ant.design/components/breadcrumb/#Breadcrumb)"
/>

[antd-breadcrumb]: https://ant.design/components/breadcrumb
