---
title: "Mantine Markdown Field Component | UI Component in Refine v5"
display_title: "Markdown"
sidebar_label: "Markdown"
description: "Build Markdown Field in Refine v5. Learn the key steps. Explore customization options for React UI library, components for polished admin UIs."
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
import { Show, MarkdownField } from "@refinedev/mantine";
import { Title, Text } from "@mantine/core";

const PostShow: React.FC = () => {
  const { result: post, query } = useShow<IPost>();
  const { data, isLoading } = query;

  return (
    <Show isLoading={isLoading}>
      <Title order={5}>Id</Title>
      <Text mt="sm">{post?.id}</Text>
      <Title mt="sm" order={5}>
        Content
      </Title>
      <MarkdownField value={post?.content} />
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
    <RefineMantineDemo
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
              <div>
                <p>This page is empty.</p>
                <RefineMantine.ShowButton recordItemId="123">
                  Show Item 123
                </RefineMantine.ShowButton>
              </div>
            }
          />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMantineDemo>
  </ReactRouter.BrowserRouter>,
);
```

## API Reference

### Properties

<PropsTable module="@refinedev/mantine/MarkdownField" value-description="Markdown data to render"/>
