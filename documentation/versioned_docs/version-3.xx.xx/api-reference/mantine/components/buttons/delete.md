---
id: delete-button
title: Delete
swizzle: true
---

```tsx live shared
const { default: routerProvider } = RefineReactRouterV6;
setRefineProps({
  routerProvider,
  notificationProvider: RefineMantine.useNotificationProvider,
  Layout: RefineMantine.Layout,
  Sider: () => null,
  catchAll: <RefineMantine.ErrorComponent />,
});

const Wrapper = ({ children }) => {
  return (
    <RefineMantine.MantineProvider
      theme={RefineMantine.LightTheme}
      withNormalizeCSS
      withGlobalStyles
    >
      <RefineMantine.Global
        styles={{ body: { WebkitFontSmoothing: "auto" } }}
      />
      <RefineMantine.NotificationsProvider position="top-right">
        {children}
      </RefineMantine.NotificationsProvider>
    </RefineMantine.MantineProvider>
  );
};
```

`<DeleteButton>` uses Mantine [`<Button>`](https://mantine.dev/core/button) and [`<Popconfirm>`](https://mantine.dev/core/popover/) components.
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
import { List, Table, Pagination, DeleteButton } from "@pankod/refine-mantine";
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
            <DeleteButton size="xs" recordItemId={getValue() as number} />
            // highlight-end
          );
        },
      },
    ],
    [],
  );

  const {
    getHeaderGroups,
    getRowModel,
    refineCore: { setCurrent, pageCount, current },
  } = useTable({
    columns,
  });

  return (
    <List>
      <Table>
        <thead>
          {getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
      <br />
      <Pagination
        position="right"
        total={pageCount}
        page={current}
        onChange={setCurrent}
      />
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
import { DeleteButton } from "@pankod/refine-mantine";

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
import { DeleteButton } from "@pankod/refine-mantine";

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
import { DeleteButton } from "@pankod/refine-mantine";

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

[Refer to the mutation mode docs for further information. &#8594](/core/docs/3.xx.xx/advanced-tutorials/mutation-mode)

```tsx live url=http://localhost:3000 previewHeight=200px
setInitialRoutes(["/"]);
import { Refine } from "@pankod/refine-core";
import dataProvider from "@pankod/refine-simple-rest";

// visible-block-start
import { DeleteButton } from "@pankod/refine-mantine";

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

### `hideText`

It is used to show and not show the text of the button. When `true`, only the button icon is visible.

```tsx live url=http://localhost:3000 previewHeight=200px
setInitialRoutes(["/"]);
import { Refine } from "@pankod/refine-core";
import dataProvider from "@pankod/refine-simple-rest";

// visible-block-start
import { DeleteButton } from "@pankod/refine-mantine";

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
import { DeleteButton } from "@pankod/refine-mantine";

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
import { DeleteButton } from "@pankod/refine-mantine";

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
      await new Promise((resolve) => setTimeout(resolve, 500));

      return {
        data: {},
      };
    },
  };

  return (
    <Refine
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

<PropsTable module="@pankod/refine-mantine/DeleteButton" />
