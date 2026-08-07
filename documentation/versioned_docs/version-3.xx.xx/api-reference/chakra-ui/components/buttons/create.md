---
id: create-button
title: Create
swizzle: true
---

```tsx live shared
const { default: routerProvider } = RefineReactRouterV6;
const { default: simpleRest } = RefineSimpleRest;
setRefineProps({
  routerProvider,
  dataProvider: simpleRest("https://api.fake-rest.refine.dev"),
  Layout: RefineChakra.Layout,
  Sider: () => null,
  catchAll: <RefineChakra.ErrorComponent />,
});

const Wrapper = ({ children }) => {
  return (
    <RefineChakra.ChakraProvider theme={RefineChakra.refineTheme}>
      {children}
    </RefineChakra.ChakraProvider>
  );
};

const CreatePage = () => {
  const { list } = RefineCore.useNavigation();
  const params = RefineCore.useRouterContext().useParams();

  return (
    <RefineChakra.VStack alignItems="flex-start">
      <RefineChakra.Text as="i" color="gray.700" fontSize="sm">
        URL Parameters:
      </RefineChakra.Text>
      <RefineChakra.Code>{JSON.stringify(params)}</RefineChakra.Code>

      <RefineChakra.Button
        size="sm"
        onClick={() => list("posts")}
        colorScheme="green"
      >
        Go back
      </RefineChakra.Button>
    </RefineChakra.VStack>
  );
};
```

`<CreateButton>` uses UI's [`<Button>`](https://chakra-ui.com/docs/components/button/usage) component. It uses the `create` method from [`useNavigation`](/core/docs/3.xx.xx/api-reference/core/hooks/navigation/useNavigation) under the hood. It can be useful to redirect the app to the create page route of resource.

:::info-tip Swizzle
You can swizzle this component to customize it with the [**refine CLI**](/core/docs/3.xx.xx/packages/documentation/cli)
:::

## Usage

```tsx live url=http://localhost:3000 previewHeight=420px hideCode
setInitialRoutes(["/posts"]);
import { Refine } from "@pankod/refine-core";

// visible-block-start
import {
  List,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  // highlight-next-line
  CreateButton,
} from "@pankod/refine-chakra-ui";
import { useTable, ColumnDef, flexRender } from "@pankod/refine-react-table";

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

const App = () => {
  return (
    <Refine
      notificationProvider={RefineChakra.notificationProvider()}
      resources={[
        {
          name: "posts",
          list: PostList,
          create: CreatePage,
        },
      ]}
    />
  );
};
render(
  <Wrapper>
    <App />
  </Wrapper>,
);
```

## Properties

### `resourceNameOrRouteName`

It is used to redirect the app to the `/create` endpoint of the given resource name. By default, the app redirects to a URL with `/create` defined by the name property of resource object.

```tsx live url=http://localhost:3000 previewHeight=200px
setInitialRoutes(["/"]);

import { Refine } from "@pankod/refine-core";

// visible-block-start
import { CreateButton } from "@pankod/refine-chakra-ui";

const MyCreateComponent = () => {
  return (
    <CreateButton colorScheme="black" resourceNameOrRouteName="categories" />
  );
};
// visible-block-end

const App = () => {
  return (
    <Refine
      routerProvider={routerProvider}
      resources={[
        {
          name: "posts",
          list: MyCreateComponent,
        },
        {
          name: "categories",
          create: CreatePage,
        },
      ]}
    />
  );
};

render(
  <Wrapper>
    <App />
  </Wrapper>,
);
```

Clicking the button will trigger the `create` method of [`useNavigation`](/core/docs/3.xx.xx/api-reference/core/hooks/navigation/useNavigation) and then redirect to `/posts/create`.

### `hideText`

It is used to show and not show the text of the button. When `true`, only the button icon is visible.

```tsx live url=http://localhost:3000 previewHeight=200px
setInitialRoutes(["/"]);

import { Refine } from "@pankod/refine-core";

// visible-block-start
import { CreateButton } from "@pankod/refine-chakra-ui";

const MyCreateComponent = () => {
  return <CreateButton colorScheme="black" hideText />;
};
// visible-block-end

const App = () => {
  return (
    <Refine
      routerProvider={routerProvider}
      resources={[
        {
          name: "posts",
          list: MyCreateComponent,
          create: CreatePage,
        },
      ]}
    />
  );
};

render(
  <Wrapper>
    <App />
  </Wrapper>,
);
```

### `accessControl`

This prop can be used to skip access control check with its `enabled` property or to hide the button when the user does not have the permission to access the resource with `hideIfUnauthorized` property. This is relevant only when an [`accessControlProvider`](/core/docs/3.xx.xx/api-reference/core/providers/accessControl-provider) is provided to [`<Refine/>`](/core/docs/3.xx.xx/api-reference/core/components/refine-config)

```tsx
import { CreateButton } from "@pankod/refine-chakra-ui";

export const MyListComponent = () => {
  return (
    <CreateButton accessControl={{ enabled: true, hideIfUnauthorized: true }} />
  );
};
```

## API Reference

### Properties

<PropsTable module="@pankod/refine-chakra-ui/CloneButton" />
