---
title: "Chakra UI FileField | Refine v4 Media Display"
display_title: "File"
sidebar_label: "File"
description: "Manage file links and downloads in Chakra UI. Official documentation for the FileField component in Refine v4 CRUD applications."
swizzle: true
---

```tsx live shared
const Wrapper = ({ children }) => {
  return (
    <ChakraUI.ChakraProvider theme={RefineChakra.refineTheme}>
      {children}
    </ChakraUI.ChakraProvider>
  );
};
```

This field is used to display files and it uses the [`<Link>`](https://www.chakra-ui.com/docs/components/link#usage) component of Chakra UI.

:::simple Good to know

You can swizzle this component to customize it with the [**Refine CLI**](/core/docs/packages/list-of-packages)

:::

## Usage

Let's see how we can use `<FileField>` with the example in the list page.

```tsx live url=http://localhost:3000/posts previewHeight=420px hideCode
setInitialRoutes(["/posts"]);

// visible-block-start
import {
  List,
  // highlight-next-line
  FileField,
} from "@refinedev/chakra-ui";
import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
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
      {
        id: "image",
        header: "Image",
        accessorKey: "image",
        cell: function render({ getValue }) {
          return (
            // highlight-next-line
            <FileField src={getValue()[0].url} target="_blank" />
          );
        },
      },
    ],
    [],
  );

  const { getHeaderGroups, getRowModel } = useTable({
    columns,
  });

  return (
    <List>
      <TableContainer>
        <Table variant="simple" whiteSpace="pre-line">
          <Thead>
            {getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <Th key={header.id}>
                      {!header.isPlaceholder &&
                        flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                    </Th>
                  );
                })}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {getRowModel().rows.map((row) => {
              return (
                <Tr key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <Td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </Td>
                    );
                  })}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </List>
  );
};

interface IPost {
  id: number;
  title: string;
  image: [{ url: string }];
}
// visible-block-end

render(
  <Wrapper>
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
    </ReactRouter.BrowserRouter>
  </Wrapper>,
);
```

:::tip

If you don't use `title` prop it will use `src` as `title`

:::

## API Reference

### Properties

<PropsTable module="@refinedev/chakra-ui/FileField" />
