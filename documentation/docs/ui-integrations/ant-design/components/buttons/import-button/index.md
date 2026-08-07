---
title: "Ant Design Import Button Component | Data Tools in Refine v5"
display_title: "Import"
sidebar_label: "Import"
description: "Learn to integrate Import Button in Refine v5. Learn integrate properties and hide for polished admin UIs. Explore with code snippets."
swizzle: true
---

`<ImportButton>` is compatible with the [`useImport`][useimport] hook and is meant to be used as it's upload button.

It uses Ant Design's [`<Button>`][button] and [`<Upload>`][upload] components. It wraps a [`<Button>`][button] component with an [`<Upload>`][upload] component and accepts properties for [`<Button>`][button] and [`<Upload>`][upload] components separately.

:::simple Good to know

You can swizzle this component to customize it with the [**Refine CLI**](/core/docs/packages/cli/)

:::

## Usage

```tsx live previewHeight=360px
setInitialRoutes(["/posts"]);

// visible-block-start
import {
  List,
  useTable,
  // highlight-start
  useImport,
  ImportButton,
  // highlight-end
} from "@refinedev/antd";
import { Table } from "antd";

const PostList: React.FC = () => {
  const { tableProps } = useTable<IPost>();

  // highlight-next-line
  const importProps = useImport<IPostFile>();

  return (
    <List
      headerButtons={
        // highlight-next-line
        <ImportButton {...importProps} />
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

interface IPostFile {
  title: string;
  categoryId: number;
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
import { ImportButton, useImport } from "@refinedev/antd";

const MyImportComponent = () => {
  const importProps = useImport();

  return (
    <ImportButton
      {...importProps}
      // highlight-next-line
      hideText
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
          <ReactRouter.Route index element={<MyImportComponent />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineAntdDemo>
  </ReactRouter.BrowserRouter>,
);
```

## API Reference

### Properties

<PropsTable module="@refinedev/antd/ImportButton" />

[useimport]: /core/docs/ui-integrations/ant-design/hooks/use-import
[button]: https://ant.design/components/button/
[upload]: https://ant.design/components/upload/
