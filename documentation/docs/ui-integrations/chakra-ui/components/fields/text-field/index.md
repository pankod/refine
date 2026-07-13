---
title: "Chakra UI Text Field Component | UI Component in Refine v5"
display_title: "Text"
sidebar_label: "Text"
description: "Learn to integrate Text Field in Refine v5. Learn integration patterns for accessibility, components for polished admin UIs. Real-world snippets included."
swizzle: true
---

This field lets you show basic text. It uses Chakra UI's [`<Text>`](https://www.chakra-ui.com/docs/components/text#usage) component.

:::simple Good to know

You can swizzle this component to customize it with the [**Refine CLI**](/core/docs/packages/cli/)

:::

## Usage

Let's see how to use it in a basic show page:

```tsx live url=http://localhost:3000/posts/show/123 previewHeight=420px hideCode
setInitialRoutes(["/posts", "/posts/show/123"]);

// visible-block-start
import { useShow } from "@refinedev/core";
import {
  Show,
  // highlight-next-line
  TextField,
} from "@refinedev/chakra-ui";
import { Heading } from "@chakra-ui/react";

const PostShow: React.FC = () => {
  const { query } = useShow<IPost>();
  const { data, isLoading } = query;
  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Heading as="h5" size="sm">
        Id
      </Heading>
      {/* highlight-next-line */}
      <TextField value={record?.id} />
      <Heading as="h5" size="sm">
        Title
      </Heading>
      {/* highlight-next-line */}
      <TextField value={record?.title} />
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
    <RefineChakraDemo
      resources={[
        {
          name: "posts",
          show: "/posts/show/:id",
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
          <ReactRouter.Route path="show/:id" element={<PostShow />} />
          <ReactRouter.Route
            index
            element={
              <RefineChakra.VStack alignItems="flex-start">
                <RefineChakra.Text>This page is empty.</RefineChakra.Text>
                <RefineChakra.ShowButton colorScheme="black" recordItemId="123">
                  Show Item 123
                </RefineChakra.ShowButton>
              </RefineChakra.VStack>
            }
          />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineChakraDemo>
  </ReactRouter.BrowserRouter>,
);
```

## API Reference

### Properties

<PropsTable module="@refinedev/chakra-ui/TextField" />

:::simple External Props

It also accepts all props of Chakra UI's [Text](https://www.chakra-ui.com/docs/components/text#usage) component.

:::
