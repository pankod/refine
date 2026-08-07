---
title: "Ant Design Image Field Component | UI Component in Refine v5"
display_title: "Image"
sidebar_label: "Image"
description: "Build Image Field in Refine v5. Learn the key steps. Explore customization options for Ant Design for polished admin UIs. Hands-on examples included."
swizzle: true
---

This field is used to display images and uses [`<Image>`](https://ant.design/components/image/#header) from Ant Design.

:::simple Good to know

You can swizzle this component to customize it with the [**Refine CLI**](/core/docs/packages/cli/)

:::

## Usage

Let's see how we can use `<ImageField>` with the example in the edit page:

```tsx live previewHeight=280px url=http://localhost:3000/posts
setInitialRoutes(["/posts"]);

// visible-block-start
import {
  List,
  useTable,
  // highlight-next-line
  ImageField,
} from "@refinedev/antd";
import { Table } from "antd";

const PostList: React.FC = () => {
  const { tableProps } = useTable<IPost>();

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="ID" />
        <Table.Column dataIndex="title" title="Title" />
        <Table.Column<IPost>
          title="Image"
          dataIndex="image"
          render={(_, record) => (
            // highlight-start
            <ImageField
              value={record.image[0].url}
              title={record.image[0].name}
              width={200}
            />
            // highlight-end
          )}
          width="50%"
        />
      </Table>
    </List>
  );
};

interface IPost {
  id: number;
  title: string;
  image: [
    {
      url: string;
    },
  ];
}
// visible-block-end

render(
  <ReactRouter.BrowserRouter>
    <RefineAntdDemo
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
              <PostList />
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

<PropsTable module="@refinedev/antd/ImageField" value-description="Image path"/>

:::simple External Props

It also accepts all props of Ant Design [Image](https://ant.design/components/image/#API).

:::
