---
id: clone-button
title: Clone
swizzle: true
---

```tsx live shared
const { default: routerProvider } = RefineReactRouterV6;
const { default: simpleRest } = RefineSimpleRest;
setRefineProps({
  routerProvider,
  dataProvider: simpleRest("https://api.fake-rest.refine.dev"),
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

const ClonePage = () => {
  const { list } = RefineCore.useNavigation();
  const params = RefineCore.useRouterContext().useParams();

  return (
    <div>
      <RefineMantine.Text italic color="dimmed" size="sm">
        URL Parameters:
      </RefineMantine.Text>
      <RefineMantine.Code>{JSON.stringify(params)}</RefineMantine.Code>
      <RefineMantine.Space h="md" />
      <RefineMantine.Button
        size="xs"
        variant="outline"
        onClick={() => list("posts")}
      >
        Go back
      </RefineMantine.Button>
    </div>
  );
};
```

`<CloneButton>` uses Mantine's [`<Button>`](https://mantine.dev/core/button) component. It uses the `clone` method from [useNavigation](/core/docs/3.xx.xx/api-reference/core/hooks/navigation/useNavigation) under the hood.
It can be useful when redirecting the app to the create page with the record id route of resource.

:::info-tip Swizzle
You can swizzle this component to customize it with the [**refine CLI**](/core/docs/3.xx.xx/packages/documentation/cli)
:::

## Usage

```tsx live url=http://localhost:3000 previewHeight=420px hideCode
setInitialRoutes(["/posts"]);
import { Refine } from "@pankod/refine-core";

// visible-block-start
import { List, Table, Pagination, CloneButton } from "@pankod/refine-mantine";
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
            <CloneButton size="xs" recordItemId={getValue() as number} />
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

  //hide-start
  List.defaultProps = {
    headerButtons: <></>,
  };
  //hide-end

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
      resources={[
        {
          name: "posts",
          list: PostList,
          create: ClonePage,
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

`recordItemId` is used to append the record id to the end of the route path.

```tsx live url=http://localhost:3000 previewHeight=200px
setInitialRoutes(["/"]);
import { Refine } from "@pankod/refine-core";

// visible-block-start
import { CloneButton } from "@pankod/refine-mantine";

const MyCloneComponent = () => {
  return <CloneButton recordItemId="123" />;
};
// visible-block-end

const App = () => {
  return (
    <Refine
      resources={[
        {
          name: "posts",
          create: ClonePage,
          list: MyCloneComponent,
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

Clicking the button will trigger the `clone` method of [`useNavigation`](/core/docs/3.xx.xx/api-reference/core/hooks/navigation/useNavigation) and then redirect the app to `/posts/clone/123`.

:::note
**`<CloneButton>`** component reads the id information from the route by default.
:::

### `resourceNameOrRouteName`

It is used to redirect the app to the `/clone` endpoint of the given resource name. By default, the app redirects to a URL with `/clone` defined by the name property of the resource object.

```tsx live url=http://localhost:3000 previewHeight=200px
setInitialRoutes(["/"]);

import { Refine } from "@pankod/refine-core";

// visible-block-start
import { CloneButton } from "@pankod/refine-mantine";

const MyCloneComponent = () => {
  return <CloneButton resourceNameOrRouteName="categories" recordItemId="2" />;
};
// visible-block-end

const App = () => {
  return (
    <Refine
      resources={[
        {
          name: "posts",
          list: MyCloneComponent,
        },
        {
          name: "categories",
          create: ClonePage,
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

Clicking the button will trigger the `clone` method of [`useNavigation`](/core/docs/3.xx.xx/api-reference/core/hooks/navigation/useNavigation) and then redirect the app to `/categories/clone/2`.

### `hideText`

It is used to show and not show the text of the button. When `true`, only the button icon is visible.

```tsx live url=http://localhost:3000 previewHeight=200px
setInitialRoutes(["/"]);

import { Refine } from "@pankod/refine-core";

// visible-block-start
import { CloneButton } from "@pankod/refine-mantine";

const MyCloneComponent = () => {
  return <CloneButton hideText />;
};
// visible-block-end

const App = () => {
  return (
    <Refine
      resources={[
        {
          name: "posts",
          list: MyCloneComponent,
          create: ClonePage,
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
import { CloneButton } from "@pankod/refine-mantine";

export const MyListComponent = () => {
  return (
    <CloneButton accessControl={{ enabled: true, hideIfUnauthorized: true }} />
  );
};
```

## API Reference

### Properties

<PropsTable module="@pankod/refine-mantine/CloneButton" />
