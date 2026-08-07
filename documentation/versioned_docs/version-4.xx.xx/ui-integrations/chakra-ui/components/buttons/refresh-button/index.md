---
title: "Chakra UI Refresh Button | Refine v4 Data Sync"
display_title: "Refresh"
sidebar_label: "Refresh"
description: "Trigger manual data updates in Chakra UI views. Official guide to using the Refresh Button for instant data invalidation in Refine v4."
swizzle: true
---

`<RefreshButton>` uses Chakra UI's [`<Button>`](https://www.chakra-ui.com/docs/components/button#usage) component to update the data shown on the page via the [`useInvalidate`][use-invalidate] hook.

:::simple Good to know

You can swizzle this component to customize it with the [**Refine CLI**](/core/docs/packages/list-of-packages)

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
  //highlight-next-line
  RefreshButton,
} from "@refinedev/chakra-ui";
import { Heading, Text, Spacer } from "@chakra-ui/react";

const PostShow: React.FC = () => {
  const { queryResult } = useShow<IPost>();
  const { data, isLoading } = queryResult;
  const record = data?.data;

  return (
    //highlight-next-line
    <Show headerButtons={<RefreshButton />} isLoading={isLoading}>
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
                <Text>This page is empty.</Text>
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

## Properties

### recordItemId

`recordItemId` allows us to manage which data is going to be refreshed. By default it will read the id information from the route.

```tsx live url=http://localhost:3000 previewHeight=200px
setInitialRoutes(["/posts"]);

// visible-block-start
import { RefreshButton } from "@refinedev/chakra-ui";

const MyRefreshComponent = () => {
  //highlight-next-line
  return (
    <RefreshButton colorScheme="black" resource="posts" recordItemId="123" />
  );
};
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
          <ReactRouter.Route index element={<MyRefreshComponent />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineChakraDemo>
  </ReactRouter.BrowserRouter>,
);
```

Clicking the button will trigger the [`useInvalidate`][use-invalidate] hook and then fetch the record whose resource is "post" and whose id is "123".

### resource

`resource` allows us to manage which resource is going to be refreshed. By default it will read the id information from the route.

```tsx live url=http://localhost:3000 previewHeight=200px
setInitialRoutes(["/posts"]);

// visible-block-start
import { RefreshButton } from "@refinedev/chakra-ui";

const MyRefreshComponent = () => {
  //highlight-next-line
  return (
    <RefreshButton colorScheme="black" resource="categories" recordItemId="2" />
  );
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
          //highlight-start
          name: "categories",
          list: "/categories",
          //highlight-end
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
    </RefineChakraDemo>
  </ReactRouter.BrowserRouter>,
);
```

Clicking the button will trigger the [`useInvalidate`][use-invalidate] hook and then fetches the record whose resource is "categories" and whose id is "2".

If you have multiple resources with the same name, you can pass the `identifier` instead of the `name` of the resource. It will only be used as the main matching key for the resource, data provider methods will still work with the `name` of the resource defined in the `<Refine/>` component.

> For more information, refer to the [`identifier` of the `<Refine/>` component documentation &#8594](/core/docs/core/refine-component#identifier)

### hideText

`hideText` is used to show and not show the text of the button. When `true`, only the button icon is visible.

```tsx live url=http://localhost:3000 previewHeight=200px
setInitialRoutes(["/posts"]);

// visible-block-start
import { RefreshButton } from "@refinedev/chakra-ui";

const MyRefreshComponent = () => {
  //highlight-next-line
  return <RefreshButton colorScheme="black" hideText recordItemId="123" />;
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
          <ReactRouter.Route index element={<MyRefreshComponent />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineChakraDemo>
  </ReactRouter.BrowserRouter>,
);
```

### ~~resourceNameOrRouteName~~ <PropTag deprecated />

Use `resource` prop instead.

## API Reference

### Properties

<PropsTable module="@refinedev/chakra-ui/RefreshButton" />

:::simple External Props

It also accepts all props of Chakra UI [Button](https://chakra-ui.com/docs/components/button#props).

:::

[use-invalidate]: /core/docs/data/hooks/use-invalidate
