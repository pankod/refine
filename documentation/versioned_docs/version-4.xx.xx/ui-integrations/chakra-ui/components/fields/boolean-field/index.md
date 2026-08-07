---
title: "Chakra UI BooleanField | Refine v4 Data Display"
display_title: "Boolean"
sidebar_label: "Boolean"
description: "Display boolean values using Chakra UI icons and switches. Documentation on implementing BooleanField for clear data representation in Refine v4."
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

This field is used to display boolean values. It uses the [`<Tooltip>`](https://www.chakra-ui.com/docs/components/tooltip#usage) values from Chakra UI.

:::simple Good to know

You can swizzle this component to customize it with the [**Refine CLI**](/core/docs/packages/list-of-packages)

:::

## Usage

Let's see how we can use `<BooleanField>` with the example in the post list.

```tsx live url=http://localhost:3000/posts previewHeight=420px hideCode
setInitialRoutes(["/posts"]);

// visible-block-start
import {
  List,
  DateField,
  // highlight-next-line
  BooleanField,
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
import { IconX, IconCheck } from "@tabler/icons-react";

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
        id: "status",
        header: "Status",
        accessorKey: "status",
        cell: function render({ getValue }) {
          return (
            // highlight-start
            <BooleanField
              value={getValue() === "published"}
              trueIcon={<IconCheck />}
              falseIcon={<IconX />}
              valueLabelTrue="published"
              valueLabelFalse="unpublished"
            />
            // highlight-end
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

<PropsTable module="@refinedev/chakra-ui/BooleanField" title-description="The text shown in the tooltip" title-default="`value` ? `valueLabelTrue` : `valueLabelFalse`" trueIcon-default="[`<IconCheck />`](https://tabler-icons.io/i/check)" falseIcon-default="[`<IconX />`](https://tabler-icons.io/i/x)" />

:::simple External Props

It also accepts all props of Chakra UI [Tooltip](https://www.chakra-ui.com/docs/components/tooltip#usage).

:::
