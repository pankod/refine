---
title: "MUI Markdown Field Component | UI Component in Refine v5"
display_title: "Markdown"
sidebar_label: "Markdown"
description: "Build Markdown Field in Refine v5. Learn the key steps. Explore customization options for Material Design, components for polished admin UIs."
swizzle: true
---

This field lets you display markdown content. It supports [GitHub Flavored Markdown](https://github.github.com/gfm/).

:::simple Good to know

You can swizzle this component with the [**Refine CLI**](/core/docs/packages/cli/) to customize it.

:::

## Usage

Let's see how we can use `<MarkdownField>` in a show page.

```tsx live hideCode url=http://localhost:3000/posts/show/123
setInitialRoutes(["/posts/show/123"]);

// visible-block-start
import React from "react";
import { useShow } from "@refinedev/core";
import {
  Show,
  TextFieldComponent as TextField,
  // highlight-next-line
  MarkdownField,
} from "@refinedev/mui";
import { Stack, Typography } from "@mui/material";

const PostShow: React.FC = () => {
  const {
    query: { data, isLoading },
  } = useShow();
  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Stack gap={1}>
        <Typography variant="body1" fontWeight="bold">
          Title
        </Typography>
        <TextField value={record?.title} />
        <Typography variant="body1" fontWeight="bold">
          Content
        </Typography>
        {/* highlight-next-line */}
        <MarkdownField value={record?.content} />
      </Stack>
    </Show>
  );
};
// visible-block-end

render(
  <ReactRouter.BrowserRouter>
    <RefineMuiDemo
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
                <RefineMui.ShowButton recordItemId="123">
                  Show Item 123
                </RefineMui.ShowButton>
              </div>
            }
          />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMuiDemo>
  </ReactRouter.BrowserRouter>,
);
```

## API Reference

### Properties

<PropsTable module="@refinedev/antd/MarkdownField" value-description="Markdown data to render"/>

## Example

<CodeSandboxExample path="input-custom" />
