---
title: "Ant Design Number Field Component | UI Component in Refine v5"
display_title: "Number"
sidebar_label: "Number"
description: "Learn to integrate Number Field in Refine v5. Learn integrate enterprise UI, components for polished admin UIs. Real-world snippets included."
swizzle: true
---

This field is used to display a number formatted according to the browser locale, right aligned. and uses [`Intl`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl) to display date format.

:::simple Good to know

You can swizzle this component to customize it with the [**Refine CLI**](/core/docs/packages/cli/)

:::

## Usage

`<NumberField>` uses `Intl.NumberFormat()` if available, passing the locales and options props as arguments. This allows a perfect display of decimals, currencies, percentages, etc. See the [Intl.NumberFormat documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat) for the options prop syntax.

If Intl is not available, `<NumberField>` outputs numbers as is (and ignores the locales and options props).

```tsx live previewHeight=280px url=http://localhost:3000/posts
setInitialRoutes(["/posts"]);

// visible-block-start
import {
  List,
  // highlight-next-line
  NumberField,
  useTable,
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
          key="hit"
          title="Hit"
          dataIndex="hit"
          render={(value) => (
            // highlight-start
            <NumberField
              value={value}
              options={{
                notation: "compact",
              }}
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
  hit: number;
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

<PropsTable module="@refinedev/antd/NumberField" value-description="Number value" />

:::simple External Props

This field also accepts all props of Ant Design's [Text](https://ant.design/components/typography/#Typography.Text) component.

:::
