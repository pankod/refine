---
title: "Ant Design Export Button Component | Data Tools in Refine v5"
display_title: "Export"
sidebar_label: "Export"
description: "Secure Export Button in Refine v5. Learn best practices. Explore customization options for hide and properties for polished admin UIs."
swizzle: true
---

`<ExportButton>` is an Ant Design [`<Button>`][button] with a default export icon and a "Export" text. It only has presentational value.

> For more information, refer to the [`useExport` documentation &#8594][useexport]

:::simple Good to know

You can swizzle this component to customize it with the [**Refine CLI**](/core/docs/packages/cli/)

:::

## Usage

You can use it like any other Ant Design [`<Button>`][button].

For example, you can use it with [useExport][useexport]:

```tsx live previewHeight=360px
setInitialRoutes(["/posts"]);

// visible-block-start
import { useExport } from "@refinedev/core";
import {
  List,
  useTable,
  // highlight-next-line
  ExportButton,
} from "@refinedev/antd";
import { Table } from "antd";

const PostList: React.FC = () => {
  const { tableProps } = useTable<IPost>();

  const { triggerExport, isLoading: exportLoading } = useExport<IPost>();

  return (
    <List
      headerButtons={
        // highlight-start
        <ExportButton onClick={triggerExport} loading={exportLoading} />
        // highlight-end
      }
    >
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="ID" />
        <Table.Column dataIndex="title" title="Title" />
      </Table>
    </List>
  );
};

interface IPost {
  id: number;
  title: string;
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
              <ReactRouter.Outlet />
            </div>
          }
        >
          <ReactRouter.Route index element={<PostList />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineAntdDemo>
  </ReactRouter.BrowserRouter>,
);
```

## Properties

### hideText

`hideText` is used to hide the text of the button. When its `true`, only the button icon will be visible.

```tsx live previewHeight=120px
setInitialRoutes(["/posts"]);

// visible-block-start
import { ExportButton } from "@refinedev/antd";

const MyExportComponent = () => {
  return (
    <ExportButton
      // highlight-next-line
      hideText={true}
    />
  );
};

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
              <ReactRouter.Outlet />
            </div>
          }
        >
          <ReactRouter.Route index element={<MyExportComponent />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineAntdDemo>
  </ReactRouter.BrowserRouter>,
);
```

## API Reference

### Properties

<PropsTable module="@refinedev/antd/ExportButton" />

:::simple External Props

It also accepts all props of Ant Design [Button](https://ant.design/components/button/#API).

:::

[button]: https://ant.design/components/button/
[useexport]: /core/docs/core/hooks/utilities/use-export
