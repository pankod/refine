---
title: "Chakra UI Markdown Field Component | UI Component in Refine v5"
display_title: "Markdown"
sidebar_label: "Markdown"
description: "Set up Markdown Field in Refine v5. Learn best practices. Explore customization options for accessibility, components for polished admin UIs."
swizzle: true
---

This field lets you display markdown content. It supports [GitHub Flavored Markdown](https://github.github.com/gfm/).

:::simple Good to know

You can swizzle this component to customize it with the [**Refine CLI**](/core/docs/packages/cli/)

:::

## Usage

Let's see how we can use `<MarkdownField>` in a show page.

```tsx live url=http://localhost:3000/posts/show/123 previewHeight=420px hideCode
setInitialRoutes(["/posts", "/posts/show/123"]);

// visible-block-start
import { useShow } from "@refinedev/core";
import {
  Show,
  // highlight-next-line
  MarkdownField,
} from "@refinedev/chakra-ui";
import { Heading, Text } from "@chakra-ui/react";

const PostShow: React.FC = () => {
  const { query } = useShow<IPost>();
  const { data, isLoading } = query;
  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Heading as="h5" size="sm">
        Id
      </Heading>
      <Text mt={2}>{record?.id}</Text>
      <Heading as="h5" size="sm" mt={4}>
        Content
      </Heading>
      {/* highlight-next-line */}
      <MarkdownField value={record?.content} />
    </Show>
  );
};

interface IPost {
  id: number;
  content: string;
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
              <ChakraUI.VStack alignItems="flex-start">
                <ChakraUI.Text>This page is empty.</ChakraUI.Text>
                <RefineChakra.ShowButton colorScheme="black" recordItemId="123">
                  Show Item 123
                </RefineChakra.ShowButton>
              </ChakraUI.VStack>
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

<PropsTable module="@refinedev/chakra-ui/MarkdownField" value-description="Markdown data to render"/>
