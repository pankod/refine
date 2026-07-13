---
title: "Chakra UI Edit Button | Refine v4 Action Buttons"
display_title: "Edit"
sidebar_label: "Edit"
description: "Learn how to use the Edit Button component to navigate to resource update pages. Pre-styled Chakra UI button documentation for Refine v4."
swizzle: true
---

`<EditButton>` uses Chakra UI's [`<Button>`](https://www.chakra-ui.com/docs/components/button#usage) component. It uses the `edit` method from [`useNavigation`](/core/docs/routing/hooks/use-navigation) under the hood. It can be useful when redirecting the app to the edit page with the record id route of resource.

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
  EditButton,
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
            // highlight-start
            <EditButton recordItemId={getValue() as number} />
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

interface IPost {
  id: number;
  title: string;
}
// visible-block-end

const EditPage = () => {
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
          edit: "/posts/edit/:id",
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
          <ReactRouter.Route path="edit/:id" element={<EditPage />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineChakraDemo>
  </ReactRouter.BrowserRouter>,
);
```

## Properties

### recordItemId

`recordItemId` is used to append the record id to the end of the route path.

```tsx live previewHeight=160px
setInitialRoutes(["/posts"]);

// visible-block-start
import { EditButton } from "@refinedev/chakra-ui";

const MyEditComponent = () => {
  return <EditButton recordItemId="123" />;
};
// visible-block-end

const EditPage = () => {
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
          edit: "/posts/edit/:id",
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
          <ReactRouter.Route index element={<MyEditComponent />} />
          <ReactRouter.Route path="edit/:id" element={<EditPage />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineChakraDemo>
  </ReactRouter.BrowserRouter>,
);
```

### resource

`resource` is used to redirect the app to the `edit` action path of the given resource name. By default, the app redirects to the inferred resource's `edit` action path.

```tsx live previewHeight=160px
setInitialRoutes(["/categories"]);

// visible-block-start
import { EditButton } from "@refinedev/chakra-ui";

const MyEditComponent = () => {
  return <EditButton resource="categories" recordItemId="123" />;
};
// visible-block-end

const CategoryEdit = () => {
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
          edit: "/posts/edit/:id",
        },
        {
          name: "categories",
          list: "/categories",
          edit: "/categories/edit/:id",
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
          <ReactRouter.Route index element={<MyEditComponent />} />
          <ReactRouter.Route path="edit/:id" element={<CategoryEdit />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineChakraDemo>
  </ReactRouter.BrowserRouter>,
);
```

Clicking the button will trigger the `edit` method of [`useNavigation`](/core/docs/routing/hooks/use-navigation) and then redirect the app to the `edit` action path of the resource, filling the necessary parameters in the route.

If you have multiple resources with the same name, you can pass the `identifier` instead of the `name` of the resource. It will only be used as the main matching key for the resource, data provider methods will still work with the `name` of the resource defined in the `<Refine/>` component.

> For more information, refer to the [`identifier` section of the `<Refine/>` component documentation &#8594](/core/docs/core/refine-component#identifier)

### meta

It is used to pass additional parameters to the `edit` method of [`useNavigation`](/core/docs/routing/hooks/use-navigation). By default, existing parameters in the route are used by the `edit` method. You can pass additional parameters or override the existing ones using the `meta` prop.

If the `edit` action route is defined by the pattern: `/posts/:authorId/edit/:id`, the `meta` prop can be used as follows:

```tsx
const MyComponent = () => {
  return <EditButton meta={{ authorId: "10" }} />;
};
```

### hideText

It is used to show and not show the text of the button. When `true`, only the button icon is visible.

```tsx live previewHeight=160px
setInitialRoutes(["/posts"]);

// visible-block-start
import { EditButton } from "@refinedev/chakra-ui";

const MyEditComponent = () => {
  return (
    <EditButton
      // highlight-next-line
      hideText={true}
      recordItemId="123"
    />
  );
};
// visible-block-end

const EditPage = () => {
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
          edit: "/posts/edit/:id",
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
          <ReactRouter.Route index element={<MyEditComponent />} />
          <ReactRouter.Route path="edit/:id" element={<EditPage />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineChakraDemo>
  </ReactRouter.BrowserRouter>,
);
```

### accessControl

This prop can be used to skip access control check with its `enabled` property or to hide the button when the user does not have the permission to access the resource with `hideIfUnauthorized` property. This is relevant only when an [`accessControlProvider`](/core/docs/authorization/access-control-provider) is provided to [`<Refine/>`](/core/docs/core/refine-component)

```tsx
import { EditButton } from "@refinedev/chakra-ui";

export const MyListComponent = () => {
  return (
    <EditButton
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

<PropsTable module="@refinedev/chakra-ui/EditButton" />

:::simple External Props

It also accepts all props of Chakra UI [Button](https://chakra-ui.com/docs/components/button#props).

:::
