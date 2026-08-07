---
title: "Ant Design MarkdownField | Refine v4 Content"
display_title: "Markdown"
sidebar_label: "Markdown"
description: "Render markdown content safely in your admin panel. Official guide to using the Ant Design MarkdownField component in your Refine v4 application."
swizzle: true
---

This field lets you display markdown content. It supports [GitHub Flavored Markdown](https://github.github.com/gfm/).

:::simple Good to know

You can swizzle this component to customize it with the [**Refine CLI**](/core/docs/packages/list-of-packages)

:::

## Usage

Let's see how we can use `<MarkdownField>` in a show page:

```tsx live previewHeight=280px url=http://localhost:3000/samples/show/123
setInitialRoutes(["/samples", "/samples/show/123"]);

// visible-block-start
import { useShow } from "@refinedev/core";
import {
  Show,
  // highlight-next-line
  MarkdownField,
} from "@refinedev/antd";
import { Typography } from "antd";

const { Title, Text } = Typography;

const SampleShow: React.FC = () => {
  const { queryResult } = useShow<IPost>();
  const { data, isLoading } = queryResult;
  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>Id</Title>
      <Text>{record?.id}</Text>

      <Title level={5}>Content</Title>

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
    <RefineAntdDemo
      resources={[
        {
          name: "samples",
          list: "/samples",
          show: "/samples/show/:id",
        },
      ]}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route
          path="/samples"
          element={
            <div style={{ padding: 16 }}>
              <div>
                <p>This page is empty.</p>
                <RefineAntd.ShowButton recordItemId="123">
                  Show Item 123
                </RefineAntd.ShowButton>
              </div>
            </div>
          }
        />
        <ReactRouter.Route
          path="/samples/show/:id"
          element={
            <div style={{ padding: 16 }}>
              <SampleShow />
            </div>
          }
        />
      </ReactRouter.Routes>
    </RefineAntdDemo>
  </ReactRouter.BrowserRouter>,
);
```

## API Reference

### Properties

<PropsTable module="@refinedev/antd/MarkdownField" value-description="Markdown data to render"/>

## Example

<CodeSandboxExample path="input-custom" />
