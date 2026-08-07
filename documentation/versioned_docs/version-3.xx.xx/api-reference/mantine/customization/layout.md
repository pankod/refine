---
id: layout
title: Layout
swizzle: true
---

You can create custom layouts using [`<Refine>`][refine] and [`<LayoutWrapper>`][layoutwrapper] components.

Both of these components can accept the listed props for customization. [`<Refine>`][refine] being for global customization and the [`<LayoutWrapper>`][layoutwrapper] being for local.

- [`Layout`][layout]
- [`Sider`][sider]
- [`Footer`][footer]
- [`Header`][header]
- [`OffLayoutArea`][offlayoutarea]
- [`Title`][title]

:::info-tip Swizzle
You can swizzle this component to customize it with the [**refine CLI**](/core/docs/3.xx.xx/packages/documentation/cli)
:::

## Creating a Custom Layout

Let's start with creating a `<CustomLayout/>` component using `LayoutProps` from `@pankod/refine-core` with the following code:

```tsx live url=http://localhost:3000 previewHeight=420px
setInitialRoutes(["/posts"]);
import { useNavigation } from "@pankod/refine-core";
import { List, Text, Code, Table, Pagination } from "@pankod/refine-mantine";
import { useTable, ColumnDef, flexRender } from "@pankod/refine-react-table";

const PostList: React.FC = () => {
  const columns = React.useMemo<ColumnDef[]>(
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

  const {
    getHeaderGroups,
    getRowModel,
    refineCore: { setCurrent, pageCount, current },
  } = useTable({
    columns,
    refineCoreProps: {
      initialPageSize: 5,
    },
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

const DummyListPage = () => {
  const { list } = useNavigation();
  const params = RefineCore.useRouterContext().useParams();

  return (
    <List>
      <Text italic color="dimmed" size="sm">
        URL Parameters:
      </Text>
      <Code>{JSON.stringify(params)}</Code>
    </List>
  );
};

const IconList = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon icon-tabler icon-tabler-list"
    width={18}
    height={18}
    viewBox="0 0 24 24"
    stroke-width={2}
    stroke="currentColor"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
    <line x1={9} y1={6} x2={20} y2={6}></line>
    <line x1={9} y1={12} x2={20} y2={12}></line>
    <line x1={9} y1={18} x2={20} y2={18}></line>
    <line x1={5} y1={6} x2={5} y2="6.01"></line>
    <line x1={5} y1={12} x2={5} y2="12.01"></line>
    <line x1={5} y1={18} x2={5} y2="18.01"></line>
  </svg>
);

const IconCategory = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon icon-tabler icon-tabler-category"
    width={18}
    height={18}
    viewBox="0 0 24 24"
    stroke-width={2}
    stroke="currentColor"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
    <path d="M4 4h6v6h-6z"></path>
    <path d="M14 4h6v6h-6z"></path>
    <path d="M4 14h6v6h-6z"></path>
    <circle cx={17} cy={17} r={3}></circle>
  </svg>
);

const IconUsers = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon icon-tabler icon-tabler-users"
    width={18}
    height={18}
    viewBox="0 0 24 24"
    stroke-width={2}
    stroke="currentColor"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
    <circle cx={9} cy={7} r={4}></circle>
    <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    <path d="M21 21v-2a4 4 0 0 0 -3 -3.85"></path>
  </svg>
);

// visible-block-start
// highlight-start
import {
  Refine,
  LayoutProps,
  useMenu,
  useRouterContext,
} from "@pankod/refine-core";
// highlight-end
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";
import {
  MantineProvider,
  Global,
  NotificationsProvider,
  useNotificationProvider,
  LightTheme,
  // highlight-start
  Box,
  MantineHeader,
  Group,
  NavLink,
  // highlight-end
} from "@pankod/refine-mantine";
import { IconList, IconCategory, IconUsers } from "@tabler/icons";

import { PostList } from "./pages/posts";

// highlight-start
const CustomLayout: React.FC<LayoutProps> = ({ children }) => {
  const { menuItems, selectedKey } = useMenu();
  const { Link } = useRouterContext();

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <MantineHeader height={50} p="xs">
        <Group>
          {menuItems.map(({ route, label, icon }) => (
            <Box key={route}>
              <NavLink
                component={Link}
                to={route}
                label={label}
                icon={icon ?? <IconList />}
                active={route === selectedKey}
              />
            </Box>
          ))}
        </Group>
      </MantineHeader>
      <Box>{children}</Box>
    </Box>
  );
};
// highlight-end

const App = () => {
  return (
    <MantineProvider theme={LightTheme} withNormalizeCSS withGlobalStyles>
      <Global styles={{ body: { WebkitFontSmoothing: "auto" } }} />
      <NotificationsProvider position="top-right">
        <Refine
          routerProvider={routerProvider}
          dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
          notificationProvider={useNotificationProvider}
          // highlight-next-line
          Layout={CustomLayout}
          resources={[
            {
              name: "posts",
              list: PostList,
            },
            {
              name: "categories",
              list: DummyListPage,
              icon: <IconCategory />,
            },
            {
              name: "users",
              list: DummyListPage,
              icon: <IconUsers />,
            },
          ]}
        />
      </NotificationsProvider>
    </MantineProvider>
  );
};
// visible-block-end
render(<App />);
```

We used [`useMenu`][usemenu] hook to get the list of current resources and print it. We also use `useRouterContext` hook to get the router context and use it to create a link.

:::info
This example demonstrated how to configure a global layout. To learn how to use global layout in custom pages and make local modifications per page, [refer to the `<LayoutWrapper>` docs. &#8594][layoutwrapper]
:::

[refine]: /core/docs/3.xx.xx/api-reference/core/components/refine-config
[layout]: /core/docs/3.xx.xx/api-reference/core/components/refine-config#layout
[sider]: /core/docs/3.xx.xx/api-reference/core/components/refine-config#sider
[footer]: /core/docs/3.xx.xx/api-reference/core/components/refine-config#footer
[header]: /core/docs/3.xx.xx/api-reference/core/components/refine-config#header
[offlayoutarea]: /core/docs/3.xx.xx/api-reference/core/components/refine-config#offlayoutarea
[title]: /core/docs/3.xx.xx/api-reference/core/components/refine-config#title
[layoutwrapper]: /core/docs/3.xx.xx/api-reference/core/components/layout-wrapper
[usemenu]: /core/docs/3.xx.xx/api-reference/core/hooks/ui/useMenu
