---
title: "Ant Design Tag Field Component | UI Component in Refine v5"
display_title: "Tag"
sidebar_label: "Tag"
description: "Integrate Tag Field in Refine v5. Learn best practices. Explore customization options for Ant Design for polished admin UIs. Explore with code snippets."
swizzle: true
---

This field lets you display a value in a tag. It uses Ant Design's [`<Tag>`](https://ant.design/components/tag/) component.

:::simple Good to know

You can swizzle this component to customize it with the [**Refine CLI**](/core/docs/packages/cli/)

:::

## Usage

Let's see how we can use it in a basic list page:

```tsx live previewHeight=280px url=http://localhost:3000/posts
setInitialRoutes(["/posts"]);

// visible-block-start
import { List, TagField, useTable } from "@refinedev/antd";
import { Table } from "antd";

const PostList: React.FC = () => {
  const { tableProps } = useTable<IPost>();

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="title" title="Title" />
        <Table.Column
          dataIndex="status"
          title="Status"
          render={(value: string) => <TagField value={value} />}
        />
      </Table>
    </List>
  );
};

interface IPost {
  id: number;
  title: string;
  status: "published" | "draft" | "rejected";
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

<PropsTable module="@refinedev/antd/TagField" value-description="Tag content" />

:::simple External Props

This field also accepts all props of Ant Design's [Tag](https://ant.design/components/tag/#API) component.

:::
