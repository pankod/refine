---
id: delete-button
title: Delete
swizzle: true
---

```tsx live shared
const { default: routerProvider } = RefineReactRouterV6;
setRefineProps({
  routerProvider,
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
```

`<DeleteButton>` uses Chakra UI's [`<Button>`](https://chakra-ui.com/docs/components/button/usage) and [`<Popover>`](https://chakra-ui.com/docs/components/popover/usage) components.
When you try to delete something, a pop-up shows up and asks for confirmation. When confirmed it executes the [`useDelete`](/core/docs/3.xx.xx/api-reference/core/hooks/data/useDelete/) method provided by your [`dataProvider`](/core/docs/3.xx.xx/api-reference/core/providers/data-provider).

:::info-tip Swizzle
You can swizzle this component to customize it with the [**refine CLI**](/core/docs/3.xx.xx/packages/documentation/cli)
:::

## Usage

```tsx live url=http://localhost:3000 previewHeight=420px hideCode
setInitialRoutes(["/posts"]);
import { Refine } from "@pankod/refine-core";
import dataProvider from "@pankod/refine-simple-rest";

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
  DeleteButton,
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
      {
        id: "actions",
        header: "Actions",
        accessorKey: "id",
        cell: function render({ getValue }) {
          return (
            // highlight-start
            <DeleteButton recordItemId={getValue() as number} />
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

const App = () => {
  return (
    <Refine
      notificationProvider={RefineChakra.notificationProvider()}
      dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
      resources={[
        {
          name: "posts",
          list: PostList,
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

### `recordItemId`

`recordItemId` allows us to manage which record will be deleted.

```tsx live url=http://localhost:3000 previewHeight=200px
setInitialRoutes(["/"]);
import { Refine } from "@pankod/refine-core";
import dataProvider from "@pankod/refine-simple-rest";

// visible-block-start
import { DeleteButton } from "@pankod/refine-chakra-ui";

const MyDeleteComponent = () => {
  return <DeleteButton recordItemId="123" />;
};
// visible-block-end

const App = () => {
  const simpleRestDataProvider = dataProvider(
    "https://api.fake-rest.refine.dev",
  );

  const customDataProvider = {
    ...simpleRestDataProvider,
    deleteOne: async ({ resource, id, variables }) => {
      await new Promise((resolve) => setTimeout(resolve, 500));

      return {
        data: {},
      };
    },
  };

  return (
    <Refine
      notificationProvider={RefineChakra.notificationProvider()}
      dataProvider={customDataProvider}
      resources={[
        {
          name: "posts",
          list: MyDeleteComponent,
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

Clicking the button will trigger the [`useDelete`](/core/docs/3.xx.xx/api-reference/core/hooks/data/useDelete/) method and then the record whose resource is "post" and whose id is "123" gets deleted.

:::note
**`<DeleteButton>`** component reads the id information from the route by default.
:::

### `resourceNameOrRouteName`

`resourceNameOrRouteName` allows us to manage which resource's record is going to be deleted.

```tsx live url=http://localhost:3000 previewHeight=200px
setInitialRoutes(["/"]);

import { Refine } from "@pankod/refine-core";
import dataProvider from "@pankod/refine-simple-rest";

// visible-block-start
import { DeleteButton } from "@pankod/refine-chakra-ui";

const MyDeleteComponent = () => {
  return <DeleteButton resourceNameOrRouteName="categories" recordItemId="2" />;
};
// visible-block-end

const App = () => {
  const simpleRestDataProvider = dataProvider(
    "https://api.fake-rest.refine.dev",
  );

  const customDataProvider = {
    ...simpleRestDataProvider,
    deleteOne: async ({ resource, id, variables }) => {
      await new Promise((resolve) => setTimeout(resolve, 500));

      return {
        data: {},
      };
    },
  };

  return (
    <Refine
      notificationProvider={RefineChakra.notificationProvider()}
      dataProvider={customDataProvider}
      resources={[
        {
          name: "posts",
          list: MyDeleteComponent,
        },
        {
          name: "categories",
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

Clicking the button will trigger the [`useDelete`](/core/docs/3.xx.xx/api-reference/core/hooks/data/useDelete/) method and then the record whose resource is "categories" and whose id is "2" gets deleted.

:::note
**`<DeleteButton>`** component reads the resource name from the route by default.
:::

### `onSuccess`

`onSuccess` can be used if you want to do anything on the result returned after the delete request.

For example, let's `console.log` after deletion:

```tsx live url=http://localhost:3000 previewHeight=200px
setInitialRoutes(["/"]);
import { Refine } from "@pankod/refine-core";
import dataProvider from "@pankod/refine-simple-rest";

// visible-block-start
import { DeleteButton } from "@pankod/refine-chakra-ui";

const MyDeleteComponent = () => {
  return (
    <DeleteButton
      resourceNameOrRouteName="posts"
      recordItemId="1"
      onSuccess={(value) => {
        console.log(value);
      }}
    />
  );
};
// visible-block-end

const App = () => {
  const simpleRestDataProvider = dataProvider(
    "https://api.fake-rest.refine.dev",
  );

  const customDataProvider = {
    ...simpleRestDataProvider,
    deleteOne: async ({ resource, id, variables }) => {
      await new Promise((resolve) => setTimeout(resolve, 500));

      return {
        message: "You have successfully deleted the record",
      };
    },
  };

  return (
    <Refine
      notificationProvider={RefineChakra.notificationProvider()}
      dataProvider={customDataProvider}
      resources={[
        {
          name: "posts",
          list: MyDeleteComponent,
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

### `mutationMode`

Determines which mode mutation will have while executing `<DeleteButton>`.

[Refer to the mutation mode docs for further information. &#8594](/core/docs/3.xx.xx/advanced-tutorials/mutation-mode/)

```tsx live url=http://localhost:3000 previewHeight=200px
setInitialRoutes(["/"]);
import { Refine } from "@pankod/refine-core";
import dataProvider from "@pankod/refine-simple-rest";

// visible-block-start
import { DeleteButton } from "@pankod/refine-chakra-ui";

const MyDeleteComponent = () => {
  return <DeleteButton recordItemId="1" mutationMode="undoable" />;
};
// visible-block-end

const App = () => {
  const simpleRestDataProvider = dataProvider(
    "https://api.fake-rest.refine.dev",
  );

  const customDataProvider = {
    ...simpleRestDataProvider,
    deleteOne: async ({ resource, id, variables }) => {
      await new Promise((resolve) => setTimeout(resolve, 500));

      return {
        data: {},
      };
    },
  };

  return (
    <Refine
      notificationProvider={RefineChakra.notificationProvider()}
      dataProvider={customDataProvider}
      notificationProvider={RefineChakra.notificationProvider()}
      resources={[
        {
          name: "posts",
          list: MyDeleteComponent,
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

### `hideText`

It is used to show and not show the text of the button. When `true`, only the button icon is visible.

```tsx live url=http://localhost:3000 previewHeight=200px
setInitialRoutes(["/"]);
import { Refine } from "@pankod/refine-core";
import dataProvider from "@pankod/refine-simple-rest";

// visible-block-start
import { DeleteButton } from "@pankod/refine-chakra-ui";

const MyDeleteComponent = () => {
  return <DeleteButton recordItemId="1" hideText />;
};
// visible-block-end

const App = () => {
  const simpleRestDataProvider = dataProvider(
    "https://api.fake-rest.refine.dev",
  );

  const customDataProvider = {
    ...simpleRestDataProvider,
    deleteOne: async ({ resource, id, variables }) => {
      await new Promise((resolve) => setTimeout(resolve, 500));

      return {
        data: {},
      };
    },
  };

  return (
    <Refine
      notificationProvider={RefineChakra.notificationProvider()}
      dataProvider={customDataProvider}
      resources={[
        {
          name: "posts",
          list: MyDeleteComponent,
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
import { DeleteButton } from "@pankod/refine-chakra-ui";

export const MyListComponent = () => {
  return (
    <DeleteButton accessControl={{ enabled: true, hideIfUnauthorized: true }} />
  );
};
```

## How to override confirm texts?

You can change the text that appears when you confirm a transaction with `confirmTitle` prop, as well as what ok and cancel buttons text look like with `confirmOkText` and `confirmCancelText` props.

```tsx live url=http://localhost:3000 previewHeight=200px
setInitialRoutes(["/"]);
import { Refine } from "@pankod/refine-core";
import dataProvider from "@pankod/refine-simple-rest";

// visible-block-start
import { DeleteButton } from "@pankod/refine-chakra-ui";

const MyDeleteComponent = () => {
  return (
    <DeleteButton
      //hide-start
      recordItemId="1"
      //hide-end
      confirmTitle="Custom Title"
      confirmOkText="Ok Text"
      confirmCancelText="Delete Text"
    />
  );
};
// visible-block-end

const App = () => {
  const simpleRestDataProvider = dataProvider(
    "https://api.fake-rest.refine.dev",
  );

  const customDataProvider = {
    ...simpleRestDataProvider,
    deleteOne: async ({ resource, id, variables }) => {
      console.log("girdi");
      await new Promise((resolve) => setTimeout(resolve, 500));

      return {
        data: {},
      };
    },
  };

  return (
    <Refine
      notificationProvider={RefineChakra.notificationProvider()}
      dataProvider={customDataProvider}
      resources={[
        {
          name: "posts",
          list: MyDeleteComponent,
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

## API Reference

### Properties

<PropsTable module="@pankod/refine-chakra-ui/DeleteButton" />
