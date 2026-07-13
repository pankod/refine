---
title: "Chakra UI Clone Button Component | CRUD Actions in Refine v5"
display_title: "Clone"
sidebar_label: "Clone"
description: "Learn to integrate Clone Button in Refine v5. Learn integrate hide for polished admin UIs. Explore with code snippets. Built for production use."
swizzle: true
---

`<CloneButton>` uses Chakra UI's [`<Button>`](https://www.chakra-ui.com/docs/components/button#usage) component. It uses the `clone` method from [useNavigation](/core/docs/routing/hooks/use-navigation/) under the hood.

:::simple Good to know

You can swizzle this component to customize it with the [**Refine CLI**](/core/docs/packages/cli/)

:::

```tsx live shared
const ClonePage = () => {
  const { list } = RefineCore.useNavigation();
  const params = RefineCore.useParsed();

  return (
    <ChakraUI.VStack alignItems="flex-start">
      <ChakraUI.Text as="i" color="gray.700" fontSize="sm">
        URL Parameters:
      </ChakraUI.Text>
      <ChakraUI.Code>{JSON.stringify(params, null, 2)}</ChakraUI.Code>

      <ChakraUI.Button
        size="sm"
        onClick={() => list("posts")}
        colorScheme="green"
      >
        Go back
      </ChakraUI.Button>
    </ChakraUI.VStack>
  );
};
```

## Usage

```tsx live url=http://localhost:3000 previewHeight=420px hideCode
setInitialRoutes(["/posts"]);

//hide-start
List.defaultProps = {
  headerButtons: <></>,
};
//hide-end

// visible-block-start
import {
  List,
  //highlight-next-line
  CloneButton,
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
        id: "actions",
        header: "Actions",
        accessorKey: "id",
        cell: function render({ getValue }) {
          return (
            //highlight-start
            <CloneButton recordItemId={getValue() as number} />
            //highlight-end
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
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
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
          //highlight-start
          list: "/posts",
          clone: "/posts/clone/:id",
          //highlight-end
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
          <ReactRouter.Route path="/posts/clone/:id" element={<ClonePage />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineChakraDemo>
  </ReactRouter.BrowserRouter>,
);
```

## Properties

### recordItemId

`recordItemId` is used to append the record id to the end of the route path.

```tsx live url=http://localhost:3000 previewHeight=200px
setInitialRoutes(["/posts"]);

// visible-block-start
import { CloneButton } from "@refinedev/chakra-ui";

const MyCloneComponent = () => {
  //highlight-next-line
  return <CloneButton colorScheme="black" recordItemId="123" />;
};
// visible-block-end

render(
  <ReactRouter.BrowserRouter>
    <RefineChakraDemo
      resources={[
        {
          name: "posts",
          list: "/posts",
          clone: "/posts/clone/:id",
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
          <ReactRouter.Route index element={<MyCloneComponent />} />
          <ReactRouter.Route path="/posts/clone/:id" element={<ClonePage />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineChakraDemo>
  </ReactRouter.BrowserRouter>,
);
```

Clicking the button will trigger the `clone` method of [`useNavigation`](/core/docs/routing/hooks/use-navigation/) and then redirect the app to the `clone` action path of the resource, filling the necessary parameters in the route.

:::simple Good to know

**`<CloneButton>`** component reads the id information from the route by default.

:::

### resource

`resource` is used to redirect the app to the `clone` action of the given resource name. By default, the app redirects to the inferred resource's `clone` action path.

```tsx live url=http://localhost:3000 previewHeight=200px
setInitialRoutes(["/posts"]);

// visible-block-start
import { CloneButton } from "@refinedev/chakra-ui";

const MyCloneComponent = () => {
  //highlight-next-line
  return (
    <CloneButton colorScheme="black" resource="categories" recordItemId="2" />
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
        {
          //highlight-start
          name: "categories",
          list: "/categories",
          clone: "/categories/clone/:id",
          //highlight-end
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
          <ReactRouter.Route index element={<MyCloneComponent />} />
        </ReactRouter.Route>
        <ReactRouter.Route
          path="/categories/clone/:id"
          element={
            <div
              style={{
                padding: 16,
              }}
            >
              <ClonePage />
            </div>
          }
        />
      </ReactRouter.Routes>
    </RefineChakraDemo>
  </ReactRouter.BrowserRouter>,
);
```

If you have multiple resources with the same name, you can pass the `identifier` instead of the `name` of the resource. It will only be used as the main matching key for the resource, data provider methods will still work with the `name` of the resource defined in the `<Refine/>` component.

> For more information, refer to the [`identifier` section of the `<Refine/>` component documentation &#8594](/core/docs/core/refine-component#identifier)

### meta

It is used to pass additional parameters to the `clone` method of [`useNavigation`](/core/docs/routing/hooks/use-navigation/). By default, existing parameters in the route are used by the `clone` method. You can pass additional parameters or override the existing ones using the `meta` prop.

If the `clone` action route is defined by the pattern: `/posts/:authorId/clone/:id`, the `meta` prop can be used as follows:

```tsx
const MyComponent = () => {
  //highlight-next-line
  return <CloneButton meta={{ authorId: "10" }} />;
};
```

### hideText

It is used to show and not show the text of the button. When `true`, only the button icon is visible.

```tsx live url=http://localhost:3000 previewHeight=200px
setInitialRoutes(["/posts"]);

// visible-block-start
import { CloneButton } from "@refinedev/chakra-ui";

const MyCloneComponent = () => {
  //highlight-next-line
  return <CloneButton colorScheme="black" hideText recordItemId="123" />;
};
// visible-block-end

render(
  <ReactRouter.BrowserRouter>
    <RefineChakraDemo
      resources={[
        {
          name: "posts",
          list: "/posts",
          create: "/posts/create",
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
          <ReactRouter.Route index element={<MyCloneComponent />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineChakraDemo>
  </ReactRouter.BrowserRouter>,
);
```

### accessControl

The `accessControl` prop can be used to skip the access control check with its `enabled` property or to hide the button when the user does not have the permission to access the resource with `hideIfUnauthorized` property. This is relevant only when an [`accessControlProvider`](/core/docs/authorization/access-control-provider/) is provided to [`<Refine/>`](/core/docs/core/refine-component/)

```tsx
import { CloneButton } from "@refinedev/chakra-ui";

export const MyListComponent = () => {
  //highlight-next-line
  return (
    <CloneButton accessControl={{ enabled: true, hideIfUnauthorized: true }} />
  );
};
```

## API Reference

### Properties

<PropsTable module="@refinedev/chakra-ui/CloneButton" />

:::simple External Props

It also accepts all props of Chakra UI [Button](https://chakra-ui.com/docs/components/button#props).

:::
