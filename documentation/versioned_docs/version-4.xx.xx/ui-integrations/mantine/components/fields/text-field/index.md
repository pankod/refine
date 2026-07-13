---
title: "Mantine TextField | Refine v4 Core Display"
display_title: "Text"
sidebar_label: "Text"
description: "Official guide to basic data display with Mantine. Learn how to use the TextField component for string values in Refine v4 views."
swizzle: true
---

This field lets you show basic text. It uses Mantine [`<Text>`](https://mantine.dev/core/text/) component.

:::simple Good to know

You can swizzle this component to customize it with the [**Refine CLI**](/core/docs/packages/list-of-packages)

:::

## Usage

Let's see how to use it in a basic show page:

```tsx live url=http://localhost:3000/posts/show/123 previewHeight=420px hideCode
setInitialRoutes(["/posts", "/posts/show/123"]);

// visible-block-start
import { useShow, useOne } from "@refinedev/core";
import { Show, TextField } from "@refinedev/mantine";
import { Title, Text } from "@mantine/core";

const PostShow: React.FC = () => {
  const { queryResult } = useShow<IPost>();
  const { data, isLoading } = queryResult;
  const record = data?.data;

  const { data: categoryData, isLoading: categoryIsLoading } =
    useOne<ICategory>({
      resource: "categories",
      id: record?.category?.id,
      queryOptions: {
        enabled: !!record,
      },
    });

  return (
    <Show isLoading={isLoading}>
      <Title order={5}>Id</Title>
      <Text mt="sm">{record?.id}</Text>

      <Title mt="sm" order={5}>
        Category
      </Title>
      {/* highlight-start */}
      <TextField
        value={categoryIsLoading ? "Loading..." : categoryData?.data?.title}
      />
      {/* highlight-end */}
    </Show>
  );
};

interface ICategory {
  id: number;
  title: string;
}

interface IPost {
  id: number;
  category: { id: number };
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

<PropsTable module="@refinedev/mantine/TextField" />

:::simple External Props

It also accepts all props of Mantine [Text](https://mantine.dev/core/text/?t=props).

:::
