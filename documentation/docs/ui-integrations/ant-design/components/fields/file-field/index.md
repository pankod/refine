---
title: "Ant Design File Field Component | UI Component in Refine v5"
display_title: "File"
sidebar_label: "File"
description: "Integrate File Field in Refine v5. Learn best practices. Learn integration patterns for Ant Design for polished admin UIs. Learn with code examples."
swizzle: true
---

This field is used to display files and uses [`<Typography.Link>`](https://ant.design/components/typography) from Ant Design.

:::simple Good to know

You can swizzle this component to customize it with the [**Refine CLI**](/core/docs/packages/cli/)

:::

## Usage

Let's see how we can use `<FileField>` with the example in the edit page:

```tsx live previewHeight=280px url=http://localhost:3000/posts
setInitialRoutes(["/posts"]);

// visible-block-start
import {
  List,
  useTable,
  // highlight-next-line
  FileField,
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
            // highlight-next-line
            <FileField src={record.image[0].url} />
          )}
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

:::simple Implementation Tips

If you don't use `title` prop it will use `src` as `title`

:::

## API Reference

### Properties

<PropsTable module="@refinedev/antd/FileField" />

:::simple External Props

This field also accepts all props of Ant Design's [Link](https://ant.design/components/typography/#How-to-use-Typography.Link-in-react-router) component.

:::
