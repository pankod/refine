---
title: "Mantine Import Button | Refine v4 CSV Import Guide"
display_title: "Import"
sidebar_label: "Import"
description: "Documentation for the Mantine Import Button. Learn how to add CSV import functionality to your Refine v4 admin panel with ease."
swizzle: true
---

```tsx live shared
import * as React from "react";

const ListPage = () => {
  const { list } = RefineCore.useNavigation();
  const params = RefineCore.useParsed();

  return (
    <div>
      <MantineCore.Text italic color="dimmed" size="sm">
        URL Parameters:
      </MantineCore.Text>
      <MantineCore.Code>{JSON.stringify(params, null, 2)}</MantineCore.Code>
      <MantineCore.Space h="md" />
      <MantineCore.Button
        size="xs"
        variant="outline"
        onClick={() => list("posts")}
      >
        Go back
      </MantineCore.Button>
    </div>
  );
};
```

`<ImportButton>` is compatible with the [`useImport`][useimport] hook and is meant to be used as its upload button.

It uses Mantine's [`<Button>`][button] component and native html [`<input>`][input] element. It wraps a [`<label>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label) with a [`<Button>`][button] component and [`<input>`][input] element and accepts its own properties separately.

:::simple Good to know

You can swizzle this component to customize it with the [**Refine CLI**](/core/docs/packages/list-of-packages)

:::

## Usage

```tsx live url=http://localhost:3000/posts previewHeight=420px hideCode
setInitialRoutes(["/posts"]);
import * as React from "react";

// visible-block-start
//highlight-next-line
import { useImport, useNotification } from "@refinedev/core";
import {
  List,
  //highlight-next-line
  ImportButton,
} from "@refinedev/mantine";
import { Table, Pagination } from "@mantine/core";
import { useTable } from "@refinedev/react-table";
import { ColumnDef, flexRender } from "@tanstack/react-table";

const PostList: React.FC = () => {
  const columns = React.useMemo<ColumnDef<IPost>[]>(
    () => [
      {
        id: "id",
        header: "ID",
        accessorKey: "id",
      },
      {
        id: "title",
        header: "Title",
        accessorKey: "title",
      },
    ],
    [],
  );

  const {
    getHeaderGroups,
    getRowModel,
    refineCore: { setCurrent, pageCount, current },
  } = useTable({
    columns,
  });

  //highlight-start
  const { open } = useNotification();

  const { inputProps, isLoading } = useImport({
    onFinish: () => {
      open?.({
        message: "Import successfully completed",
        type: "success",
      });
    },
  });
  //highlight-end

  return (
    <List
      headerButtons={
        // highlight-next-line
        <ImportButton loading={isLoading} inputProps={inputProps} />
      }
    >
      <Table>
        <thead>
          {getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
      <br />
      <Pagination
        position="right"
        total={pageCount}
        page={current}
        onChange={setCurrent}
      />
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
    <RefineMantineDemo
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
    </RefineMantineDemo>
  </ReactRouter.BrowserRouter>,
);
```

## Properties

### hideText

`hideText` is used to show and not show the text of the button. When `true`, only the button icon is visible.

```tsx live url=http://localhost:3000 previewHeight=200px
setInitialRoutes(["/posts"]);
import * as React from "react";

// visible-block-start
import { ImportButton } from "@refinedev/mantine";

const MyImportComponent = () => {
  return <ImportButton hideText />;
};
// visible-block-end

render(
  <ReactRouter.BrowserRouter>
    <RefineMantineDemo
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
    </RefineMantineDemo>
  </ReactRouter.BrowserRouter>,
);
```

## API Reference

### Properties

<PropsTable module="@refinedev/mantine/ImportButton" />

[useimport]: /core/docs/core/hooks/utilities/use-import
[button]: https://mantine.dev/core/button
[input]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input
