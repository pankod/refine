---
title: "Chakra UI Import Button | Refine v4 Bulk Data Import"
display_title: "Import"
sidebar_label: "Import"
description: "Learn how to add CSV import functionality to your Chakra UI admin panel. Official documentation for the Import Button in Refine v4."
swizzle: true
---

`<ImportButton>` is compatible with the [`useImport`][useimport] hook and is meant to be used as it's upload button.

It uses Chakra UI's [`<Button>`][button] component and native html [`<input>`][input] element. It wraps a [`<label>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label) with a [`<Button>`][button] component and [`<input>`][input] element and accepts its own properties separately.

```tsx live previewHeight=360px hideCode
setInitialRoutes(["/posts"]);

// visible-block-start
import { useImport, useNotification } from "@refinedev/core";
import { List, ImportButton } from "@refinedev/chakra-ui";
import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Box,
  Text,
} from "@chakra-ui/react";
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

  const { getHeaderGroups, getRowModel } = useTable({
    columns,
  });

  const { open } = useNotification();

  const { inputProps, isLoading } = useImport({
    onFinish: () => {
      open?.({
        message: "Import successfully completed",
        type: "success",
      });
    },
  });

  return (
    <List
      headerButtons={
        <ImportButton loading={isLoading} inputProps={inputProps} />
      }
    >
      <Box position="relative">
        <TableContainer whiteSpace="pre-line">
          <Table variant="simple">
            <Thead>
              {getHeaderGroups().map((headerGroup) => (
                <Tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <Th key={header.id}>
                      {!header.isPlaceholder &&
                        flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                    </Th>
                  ))}
                </Tr>
              ))}
            </Thead>
            <Tbody>
              {getRowModel().rows.map((row) => (
                <Tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <Td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </Td>
                  ))}
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          height="100%"
          pointerEvents="none"
          background="linear-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 90%, rgba(0, 0, 0, 0.1) 95%, rgba(0, 0, 0, 0.2) 100%)"
        />
        <Text
          position="absolute"
          bottom={2}
          left="50%"
          transform="translateX(-50%)"
          color="gray.700"
          fontSize="sm"
        >
          ✨ Live Preview
        </Text>
      </Box>
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
    <RefineChakraDemo
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
    </RefineChakraDemo>
  </ReactRouter.BrowserRouter>,
);
```

:::simple Good to know

You can swizzle this component to customize it with the [**Refine CLI**](/core/docs/packages/list-of-packages)

:::

## Properties

### `hideText`

`hideText` is used to show and not show the text of the button. When `true`, only the button icon is visible.

```tsx live previewHeight=120px
setInitialRoutes(["/posts"]);

// visible-block-start
import { ImportButton } from "@refinedev/chakra-ui";
import { useImport } from "@refinedev/core";

const MyImportComponent = () => {
  const { inputProps, isLoading } = useImport({
    onFinish: () => {
      console.log("Import completed");
    },
  });

  return (
    <ImportButton
      colorScheme="blue"
      hideText={true}
      loading={isLoading}
      inputProps={inputProps}
    />
  );
};
// visible-block-end

render(
  <ReactRouter.BrowserRouter>
    <RefineChakraDemo
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
    </RefineChakraDemo>
  </ReactRouter.BrowserRouter>,
);
```

### `loading`

It is used to show a loading state on the button when the import process is in progress.

```tsx live previewHeight=120px
setInitialRoutes(["/posts"]);

// visible-block-start
import { ImportButton } from "@refinedev/chakra-ui";
import { useImport } from "@refinedev/core";

const MyImportComponent = () => {
  const { inputProps, isLoading } = useImport({
    onFinish: () => {
      console.log("Import completed");
    },
  });

  return (
    <ImportButton
      colorScheme="black"
      loading={isLoading}
      inputProps={inputProps}
    />
  );
};
// visible-block-end

render(
  <ReactRouter.BrowserRouter>
    <RefineChakraDemo
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
    </RefineChakraDemo>
  </ReactRouter.BrowserRouter>,
);
```

## API Reference

### Properties

<PropsTable module="@refinedev/chakra-ui/ImportButton" />

:::simple External Props

It also accepts all props of Chakra UI [Button](https://chakra-ui.com/docs/components/button#props).

:::

[useimport]: /core/docs/core/hooks/utilities/use-import
[button]: https://www.chakra-ui.com/docs/components/button#usage
[input]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input
