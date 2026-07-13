---
title: "Mantine List Button Component | Navigation UI in Refine v5"
display_title: "List"
sidebar_label: "List"
description: "Implement List Button in Refine v5. Learn the key steps. Explore customization options for hide for polished admin UIs. Hands-on examples included."
swizzle: true
---

```tsx live shared
import * as React from "react";

const ListPage = () => {
  const { show } = RefineCore.useNavigation();
  const params = RefineCore.useParsed();

  return (
    <div>
      <MantineCore.Text italic color="dimmed" size="sm">
        URL Parameters:
      </MantineCore.Text>
      <MantineCore.Code>{JSON.stringify(params, null, 2)}</MantineCore.Code>
      <MantineCore.Space h="md" />
      <MantineCore.Button
        size="xs"
        variant="outline"
        onClick={() => show("posts", "123")}
      >
        Go back
      </MantineCore.Button>
    </div>
  );
};
```

`<ListButton>` uses Mantine's [`<Button>`](https://mantine.dev/core/button) component. It uses the `list` method from [`useNavigation`](/core/docs/routing/hooks/use-navigation/) under the hood. It can be useful when redirecting the app to the list page route of resource.

:::simple Good to know

You can swizzle this component with the [**Refine CLI**](/core/docs/packages/cli/) to customize it.

:::

## Usage

```tsx live url=http://localhost:3000/posts/show/123 previewHeight=420px hideCode
setInitialRoutes(["/posts/show/123"]);
import * as React from "react";

// visible-block-start
import { useShow } from "@refinedev/core";
import {
  Show,
  MarkdownField,
  // highlight-next-line
  ListButton,
} from "@refinedev/mantine";
import { Title, Text } from "@mantine/core";

const PostShow: React.FC = () => {
  const { query } = useShow<IPost>();
  const { data, isLoading } = query;
  const record = data?.data;

  return (
    // highlight-next-line
    <Show headerButtons={<ListButton />} isLoading={isLoading}>
      <Title order={5}>Id</Title>
      <Text mt="sm">{record?.id}</Text>

      <Title mt="sm" order={5}>
        Title
      </Title>
      <Text mt="sm">{record?.title}</Text>

      <Title mt="sm" order={5}>
        Content
      </Title>
      <MarkdownField value={record?.content} />
    </Show>
  );
};

interface IPost {
  id: number;
  title: string;
  content: string;
}
// visible-block-end

render(
  <ReactRouter.BrowserRouter>
    <RefineMantineDemo
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
          <ReactRouter.Route index element={<ListPage />} />
          <ReactRouter.Route path="show/:id" element={<PostShow />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMantineDemo>
  </ReactRouter.BrowserRouter>,
);
```

## Properties

### resource

Redirection endpoint is defined by the `resource`'s `list` action path. By default, `<ListButton>` uses the inferred resource from the route.

```tsx live url=http://localhost:3000 previewHeight=200px
setInitialRoutes(["/posts"]);
import * as React from "react";

// visible-block-start
import { ListButton } from "@refinedev/mantine";

const MyListComponent = () => {
  return <ListButton resource="categories" />;
};
// visible-block-end

render(
  <ReactRouter.BrowserRouter>
    <RefineMantineDemo
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
          path="/posts"
          element={
            <div style={{ padding: 16 }}>
              <ReactRouter.Outlet />
            </div>
          }
        >
          <ReactRouter.Route index element={<MyListComponent />} />
        </ReactRouter.Route>
        <ReactRouter.Route
          path="/categories"
          element={
            <div style={{ padding: 16 }}>
              <ListPage />
            </div>
          }
        />
      </ReactRouter.Routes>
    </RefineMantineDemo>
  </ReactRouter.BrowserRouter>,
);
```

Clicking the button will trigger the `list` method of [`useNavigation`](/core/docs/routing/hooks/use-navigation/) and then redirect the app to the `list` action path of the resource, filling the necessary parameters in the route.

If you have multiple resources with the same name, you can pass the `identifier` instead of the `name` of the resource. It will only be used as the main matching key for the resource, data provider methods will still work with the `name` of the resource defined in the `<Refine/>` component.

> For more information, refer to the [`identifier` section of the `<Refine/>` component documentation &#8594](/core/docs/core/refine-component#identifier)

### hideText

`hideText` is used to show and not show the text of the button. When `true`, only the button icon is visible.

```tsx live url=http://localhost:3000 previewHeight=200px
setInitialRoutes(["/posts"]);
import * as React from "react";

// visible-block-start
import { ListButton } from "@refinedev/mantine";

const MyListComponent = () => {
  return <ListButton hideText />;
};
// visible-block-end

render(
  <ReactRouter.BrowserRouter>
    <RefineMantineDemo
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
          <ReactRouter.Route index element={<MyListComponent />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMantineDemo>
  </ReactRouter.BrowserRouter>,
);
```

### accessControl

This prop can be used to skip access control check with its `enabled` property or to hide the button when the user does not have the permission to access the resource with `hideIfUnauthorized` property. This is relevant only when an [`accessControlProvider`](/core/docs/authorization/access-control-provider/) is provided to [`<Refine/>`](/core/docs/core/refine-component/)

```tsx
import { ListButton } from "@refinedev/mantine";

export const MyListComponent = () => {
  return (
    <ListButton accessControl={{ enabled: true, hideIfUnauthorized: true }} />
  );
};
```

## API Reference

### Properties

<PropsTable module="@refinedev/mantine/ListButton" />
