---
title: "Ant Design DateField | Refine v4 Format Guide"
display_title: "Date"
sidebar_label: "Date"
description: "Learn how to format and display date values using Ant Design. Official documentation for the DateField component in Refine v4 React apps."
swizzle: true
---

This field is used to display dates. It uses the [`Day.js`](https://day.js.org/docs/en/display/format) to display date format.

:::simple Good to know

You can swizzle this component to customize it with the [**Refine CLI**](/core/docs/packages/list-of-packages)

:::

## Usage

Let's see how we can use `<DateField>` with the example in the post list:

```tsx live previewHeight=280px url=http://localhost:3000/posts
setInitialRoutes(["/posts"]);

// visible-block-start
import { List, useTable, DateField } from "@refinedev/antd";
import { Table } from "antd";

const PostList: React.FC = () => {
  const { tableProps } = useTable<IPost>();

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="ID" />
        <Table.Column dataIndex="title" title="Title" />
        <Table.Column
          dataIndex="createdAt"
          title="Created At"
          // highlight-next-line
          render={(value) => <DateField value={value} />}
        />
      </Table>
    </List>
  );
};

interface IPost {
  id: number;
  title: string;
  createdAt: string;
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

<PropsTable module="@refinedev/antd/DateField" format-default="`L`"/>

:::simple External Props

This field also accepts all props of Ant Design's [Text](https://ant.design/components/typography/#Typography.Text) component.

:::
