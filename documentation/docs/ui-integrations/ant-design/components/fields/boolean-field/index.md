---
title: "Ant Design Boolean Field Component | UI Component in Refine v5"
display_title: "Boolean"
sidebar_label: "Boolean"
description: "Integrate Boolean Field in Refine v5. Learn best practices. Learn integration patterns for enterprise UI, components for polished admin UIs."
swizzle: true
---

This field is used to display boolean values. It uses the [`<Tooltip>`](https://ant.design/components/tooltip/#header) values from Ant Design.

:::simple Good to know

You can swizzle this component to customize it with the [**Refine CLI**](/core/docs/packages/cli/)

:::

## Usage

Let's see how we can use `<BooleanField>` with the example in the post list:

```tsx live previewHeight=280px url=http://localhost:3000/posts
setInitialRoutes(["/posts"]);

// visible-block-start
import {
  List,
  useTable,
  // highlight-next-line
  BooleanField,
} from "@refinedev/antd";
import { Table } from "antd";

const PostList: React.FC = () => {
  const { tableProps } = useTable<IPost>();

  const TrueIcon = () => <span>✅</span>;
  const FalseIcon = () => <span>❌</span>;

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="ID" />
        <Table.Column dataIndex="title" title="Title" />
        <Table.Column
          dataIndex="status"
          title="Published"
          render={(value) => (
            // highlight-start
            <BooleanField
              value={value === "published"}
              trueIcon={<TrueIcon />}
              falseIcon={<FalseIcon />}
              valueLabelTrue="published"
              valueLabelFalse="unpublished"
            />
            // highlight-end
          )}
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

<PropsTable module="@refinedev/antd/BooleanField"
title-description="The text shown in the tooltip"
title-default="`value` ? `valueLabelTrue` : `valueLabelFalse`"
trueIcon-default="[`<CheckOutlined />`](https://ant.design/components/icon/)"
falseIcon-default="[`<CloseOutlined />`](https://ant.design/components/icon/)"
/>

:::simple External Props

This field also accepts all props of Ant Design's [Tooltip](https://ant.design/components/tooltip/#API) component.

:::
