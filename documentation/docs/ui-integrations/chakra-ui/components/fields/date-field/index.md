---
title: "Chakra UI Date Field Component | UI Component in Refine v5"
display_title: "Date"
sidebar_label: "Date"
description: "Implement Date Field in Refine v5. Learn the key steps. Explore customization options for locales for polished admin UIs. Learn with code examples."
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

This field is used to display dates. It uses [`Day.js`](https://day.js.org/docs/en/display/format) to display date format.

:::simple Good to know

You can swizzle this component to customize it with the [**Refine CLI**](/core/docs/packages/cli/)

:::

## Usage

Let's see how we can use `<DateField>` with the example in the post list.

```tsx live url=http://localhost:3000/posts previewHeight=420px hideCode
setInitialRoutes(["/posts"]);

// visible-block-start
import {
  List,
  // highlight-next-line
  DateField,
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
        id: "createdAt",
        header: "Created At",
        accessorKey: "createdAt",
        cell: function render({ getValue }) {
          return (
            // highlight-next-line
            <DateField format="LLL" value={getValue()} />
          );
        },
      },
    ],
    [],
  );

  const {
    reactTable: { getHeaderGroups, getRowModel },
  } = useTable({
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

## API Reference

### Properties

<PropsTable module="@refinedev/chakra-ui/DateField" format-default="`L`" />

:::simple External Props

It also accepts all props of Chakra UI's [Text](https://www.chakra-ui.com/docs/components/text#usage) component.

:::
