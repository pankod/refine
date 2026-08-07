---
title: "Chakra UI Export Button | Refine v4 Data Tools"
display_title: "Export"
sidebar_label: "Export"
description: "Add CSV export functionality to your Chakra UI tables. Documentation on implementing the Export Button for efficient data management."
swizzle: true
---

`<ExportButton>` is an Chakra UI [`<Button>`](https://www.chakra-ui.com/docs/components/button#usage) with a default export icon and a default text with "Export". It only has presentational value.

```tsx live previewHeight=360px hideCode
setInitialRoutes(["/posts"]);

// visible-block-start
import { useExport } from "@refinedev/core";
import { List, ExportButton } from "@refinedev/chakra-ui";
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

  const { triggerExport, isLoading: exportLoading } = useExport<IPost>({
    mapData: (item) => {
      return {
        id: item.id,
        post_title: item.title,
      };
    },
    pageSize: 10,
    maxItemCount: 50,
  });

  return (
    <List
      headerButtons={
        <ExportButton loading={exportLoading} onClick={triggerExport} />
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

It is used to show and hide the text of the button. When `true`, only the button icon is shown.

```tsx live previewHeight=120px
setInitialRoutes(["/posts"]);

// visible-block-start
import { ExportButton } from "@refinedev/chakra-ui";
import { useExport } from "@refinedev/core";

const MyExportComponent = () => {
  const { triggerExport, isLoading } = useExport({
    mapData: (item) => {
      return {
        id: item.id,
        title: item.title,
      };
    },
  });

  return (
    <ExportButton
      colorScheme="blue"
      hideText={true}
      loading={isLoading}
      onClick={triggerExport}
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
          <ReactRouter.Route index element={<MyExportComponent />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineChakraDemo>
  </ReactRouter.BrowserRouter>,
);
```

### `loading`

It is used to show a loading state on the button when the export process is in progress.

```tsx live previewHeight=120px
setInitialRoutes(["/posts"]);

// visible-block-start
import { ExportButton } from "@refinedev/chakra-ui";
import { useExport } from "@refinedev/core";

const MyExportComponent = () => {
  const { triggerExport, isLoading } = useExport({
    mapData: (item) => {
      return {
        id: item.id,
        title: item.title,
      };
    },
  });

  return (
    <ExportButton
      colorScheme="blue"
      loading={isLoading}
      onClick={triggerExport}
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
          <ReactRouter.Route index element={<MyExportComponent />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineChakraDemo>
  </ReactRouter.BrowserRouter>,
);
```

## API Reference

### Properties

<PropsTable module="@refinedev/chakra-ui/ExportButton" />

:::simple External Props

It also accepts all props of Chakra UI [Button](https://chakra-ui.com/docs/components/button#props).

:::
