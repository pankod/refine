---
title: "Chakra UI Create Button | Refine v4 UI Components"
display_title: "Create"
sidebar_label: "Create"
description: "Documentation for the Chakra UI Create Button. Learn how to trigger navigation to create pages with pre-styled accessible buttons."
swizzle: true
---

`<CreateButton>` uses Chakra UI's [`<Button>`](https://www.chakra-ui.com/docs/components/button#usage) component. It uses the `create` method from [`useNavigation`](/core/docs/routing/hooks/use-navigation) under the hood. It can be useful to redirect the app to the create page route of resource.

:::simple Good to know

You can swizzle this component to customize it with the [**Refine CLI**](/core/docs/packages/list-of-packages)

:::

## Usage

```tsx live previewHeight=360px hideCode
setInitialRoutes(["/posts"]);

// visible-block-start
import {
  List,
  // highlight-next-line
  CreateButton,
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
    ],
    [],
  );

  const { getHeaderGroups, getRowModel } = useTable({
    columns,
  });

  return (
    // highlight-next-line
    <List headerButtons={<CreateButton />}>
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
}
// visible-block-end

const CreatePage = () => {
  const { list } = RefineCore.useNavigation();
  const parsed = RefineCore.useParsed();
  return (
    <ChakraUI.VStack alignItems="flex-start">
      <ChakraUI.Text as="i" color="gray.700" fontSize="sm">
        URL Parameters:
      </ChakraUI.Text>
      <ChakraUI.Code>{JSON.stringify(parsed, null, 2)}</ChakraUI.Code>

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
          <ReactRouter.Route index element={<PostList />} />
          <ReactRouter.Route path="create" element={<CreatePage />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineChakraDemo>
  </ReactRouter.BrowserRouter>,
);
```

## Properties

### resource

`resource` is used to redirect the app to the `create` action path of the given resource name. By default, the app redirects to the inferred resource's `create` action path.

```tsx live previewHeight=160px
setInitialRoutes(["/categories"]);

// visible-block-start
import { CreateButton } from "@refinedev/chakra-ui";

const MyCreateComponent = () => {
  return <CreateButton colorScheme="blue" resource="categories" />;
};
// visible-block-end

const CategoryCreate = () => {
  const { list } = RefineCore.useNavigation();
  const parsed = RefineCore.useParsed();
  return (
    <ChakraUI.VStack alignItems="flex-start">
      <ChakraUI.Text as="i" color="gray.700" fontSize="sm">
        URL Parameters:
      </ChakraUI.Text>
      <ChakraUI.Code>{JSON.stringify(parsed, null, 2)}</ChakraUI.Code>

      <ChakraUI.Button
        size="sm"
        onClick={() => list("categories")}
        colorScheme="green"
      >
        Go back
      </ChakraUI.Button>
    </ChakraUI.VStack>
  );
};

render(
  <ReactRouter.BrowserRouter>
    <RefineChakraDemo
      resources={[
        {
          name: "posts",
          list: "/posts",
          create: "/posts/create",
        },
        {
          name: "categories",
          list: "/categories",
          create: "/categories/create",
        },
      ]}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route
          path="/categories"
          element={
            <div style={{ padding: 16 }}>
              <ReactRouter.Outlet />
            </div>
          }
        >
          <ReactRouter.Route index element={<MyCreateComponent />} />
          <ReactRouter.Route path="create" element={<CategoryCreate />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineChakraDemo>
  </ReactRouter.BrowserRouter>,
);
```

Clicking the button will trigger the `create` method of [`useNavigation`](/core/docs/routing/hooks/use-navigation) and then redirect the app to the `create` action path of the resource, filling the necessary parameters in the route.

If you have multiple resources with the same name, you can pass the `identifier` instead of the `name` of the resource. It will only be used as the main matching key for the resource, data provider methods will still work with the `name` of the resource defined in the `<Refine/>` component.

> For more information, refer to the [`identifier` section of the `<Refine/>` component documentation &#8594](/core/docs/core/refine-component#identifier)

### meta

It is used to pass additional parameters to the `create` method of [`useNavigation`](/core/docs/routing/hooks/use-navigation). By default, existing parameters in the route are used by the `create` method. You can pass additional parameters or override the existing ones using the `meta` prop.

If the `create` action route is defined by the pattern: `/posts/:authorId/create`, the `meta` prop can be used as follows:

```tsx
const MyComponent = () => {
  return <CreateButton meta={{ authorId: "10" }} />;
};
```

### hideText

It is used to show and not show the text of the button. When `true`, only the button icon is visible.

```tsx live previewHeight=120px
setInitialRoutes(["/posts"]);

// visible-block-start
import { CreateButton } from "@refinedev/chakra-ui";

const MyCreateComponent = () => {
  return (
    <CreateButton
      // highlight-next-line
      hideText={true}
    />
  );
};
// visible-block-end

const CreatePage = () => {
  const { list } = RefineCore.useNavigation();
  const parsed = RefineCore.useParsed();
  return (
    <ChakraUI.VStack alignItems="flex-start">
      <ChakraUI.Text as="i" color="gray.700" fontSize="sm">
        URL Parameters:
      </ChakraUI.Text>
      <ChakraUI.Code>{JSON.stringify(parsed, null, 2)}</ChakraUI.Code>

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
          <ReactRouter.Route index element={<MyCreateComponent />} />
          <ReactRouter.Route path="create" element={<CreatePage />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineChakraDemo>
  </ReactRouter.BrowserRouter>,
);
```

### accessControl

This prop can be used to skip access control check with its `enabled` property or to hide the button when the user does not have the permission to access the resource with `hideIfUnauthorized` property. This is relevant only when an [`accessControlProvider`](/core/docs/authorization/access-control-provider) is provided to [`<Refine/>`](/core/docs/core/refine-component)

```tsx
import { CreateButton } from "@refinedev/chakra-ui";

export const MyListComponent = () => {
  return (
    <CreateButton
      accessControl={{
        enabled: true,
        hideIfUnauthorized: true,
      }}
    />
  );
};
```

### ~~resourceNameOrRouteName~~ <PropTag deprecated />

Use `resource` prop instead.

## API Reference

### Properties

<PropsTable module="@refinedev/chakra-ui/CreateButton" />

:::simple External Props

It also accepts all props of Chakra UI [Button](https://chakra-ui.com/docs/components/button#props).

:::
