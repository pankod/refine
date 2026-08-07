---
title: "Chakra UI List Button Component | Navigation UI in Refine v5"
display_title: "List"
sidebar_label: "List"
description: "Integrate List Button in Refine v5. Learn best practices. Learn integrate accessibility, components for polished admin UIs. Learn with code examples."
swizzle: true
---

`<ListButton>` is using Chakra UI's [`<Button>`](https://www.chakra-ui.com/docs/components/button#usage) component. It uses the `list` method from [`useNavigation`](/core/docs/routing/hooks/use-navigation/) under the hood. It can be useful when redirecting the app to the list page route of resource.

:::simple Good to know

You can swizzle this component to customize it with the [**Refine CLI**](/core/docs/packages/cli/)

:::

## Usage

```tsx live url=http://localhost:3000/posts/show/123 previewHeight=360px hideCode
setInitialRoutes(["/posts/show/123"]);

import { VStack } from "@chakra-ui/react";
import { ShowButton } from "@refinedev/chakra-ui";

// visible-block-start
import { useShow } from "@refinedev/core";
import {
  Show,
  MarkdownField,
  // highlight-next-line
  ListButton,
} from "@refinedev/chakra-ui";
import { Heading, Text, Spacer } from "@chakra-ui/react";

const PostShow: React.FC = () => {
  const { query } = useShow<IPost>();
  const { data, isLoading } = query;
  const record = data?.data;

  return (
    <Show
      // highlight-next-line
      headerButtons={<ListButton />}
      isLoading={isLoading}
    >
      <Heading as="h5" size="sm">
        Id
      </Heading>
      <Text mt={2}>{record?.id}</Text>

      <Heading as="h5" size="sm" mt={4}>
        Title
      </Heading>
      <Text mt={2}>{record?.title}</Text>

      <Heading as="h5" size="sm" mt={4}>
        Content
      </Heading>
      <Spacer mt={2} />
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
    <RefineChakraDemo
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
            element={
              <VStack alignItems="flex-start">
                <Text>This is the list page of posts.</Text>
                <ShowButton colorScheme="black" recordItemId="123">
                  Show Item 123
                </ShowButton>
              </VStack>
            }
          />
          <ReactRouter.Route path="show/:id" element={<PostShow />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineChakraDemo>
  </ReactRouter.BrowserRouter>,
);
```

The button text is defined automatically by Refine, based on the `resource` definition.

## Properties

### resource

Redirection endpoint is defined by the `resource`'s `list` action path. By default, `<ListButton>` uses the inferred resource from the route.

```tsx live url=http://localhost:3000 previewHeight=200px
setInitialRoutes(["/categories/show/123"]);

import { VStack, Text } from "@chakra-ui/react";
import { ShowButton } from "@refinedev/chakra-ui";

// visible-block-start
import { ListButton } from "@refinedev/chakra-ui";

const MyListComponent = () => {
  return <ListButton colorScheme="black" resource="categories" />;
};
// visible-block-end

render(
  <ReactRouter.BrowserRouter>
    <RefineChakraDemo
      resources={[
        {
          name: "posts",
          list: "/posts",
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
          path="/"
          element={
            <div style={{ padding: 16 }}>
              <ReactRouter.Outlet />
            </div>
          }
        >
          <ReactRouter.Route
            path="/categories"
            element={
              <VStack alignItems="flex-start">
                <Text>This is the list page of categories.</Text>
                <ShowButton
                  colorScheme="black"
                  recordItemId="123"
                  svgIconProps={{
                    style: {
                      display: "none",
                    },
                  }}
                >
                  Go back
                </ShowButton>
              </VStack>
            }
          />
          <ReactRouter.Route
            path="/categories/show/:id"
            element={<MyListComponent />}
          />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineChakraDemo>
  </ReactRouter.BrowserRouter>,
);
```

Clicking the button will trigger the `list` method of [`useNavigation`](/core/docs/routing/hooks/use-navigation/) and then redirect the app to the `list` action path of the resource, filling the necessary parameters in the route.

If you have multiple resources with the same name, you can pass the `identifier` instead of the `name` of the resource. It will only be used as the main matching key for the resource, data provider methods will still work with the `name` of the resource defined in the `<Refine/>` component.

> For more information, refer to the [`identifier` section of the `<Refine/>` component documentation &#8594](/core/docs/core/refine-component#identifier)

### meta

It is used to pass additional parameters to the `list` method of [`useNavigation`](/core/docs/routing/hooks/use-navigation/). By default, existing parameters in the route are used by the `list` method. You can pass additional parameters or override the existing ones using the `meta` prop.

If the `list` action route is defined by the pattern: `/:authorId/posts`, the `meta` prop can be used as follows:

```tsx
const MyComponent = () => {
  return <ListButton meta={{ authorId: "10" }} />;
};
```

### hideText

It is used to show and not show the text of the button. When `true`, only the button icon is visible.

```tsx live url=http://localhost:3000 previewHeight=120px
setInitialRoutes(["/posts"]);

// visible-block-start
import { ListButton } from "@refinedev/chakra-ui";

const MyListComponent = () => {
  return <ListButton colorScheme="black" hideText />;
};
// visible-block-end

render(
  <ReactRouter.BrowserRouter>
    <RefineChakraDemo
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
    </RefineChakraDemo>
  </ReactRouter.BrowserRouter>,
);
```

### accessControl

The `accessControl` prop can be used to skip the access control check with its `enabled` property or to hide the button when the user does not have the permission to access the resource with `hideIfUnauthorized` property. This is relevant only when an [`accessControlProvider`](/core/docs/authorization/access-control-provider/) is provided to [`<Refine/>`](/core/docs/core/refine-component/)

```tsx
import { ListButton } from "@refinedev/chakra-ui";

export const MyListComponent = () => {
  return (
    <ListButton accessControl={{ enabled: true, hideIfUnauthorized: true }} />
  );
};
```

## API Reference

### Properties

<PropsTable module="@refinedev/chakra-ui/ListButton" />

:::simple External Props

It also accepts all props of Chakra UI [Button](https://chakra-ui.com/docs/components/button#props).

:::
