---
id: email
title: Email
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

This field is used to display email values. It uses the [`<Anchor>`](https://mantine.dev/core/anchor) component of Mantine.

:::info-tip Swizzle
You can swizzle this component to customize it with the [**refine CLI**](/core/docs/3.xx.xx/packages/documentation/cli)
:::

## Usage

Let's see how we can use `<EmailField>` with the example in the user list.

```tsx live url=http://localhost:3000/users previewHeight=420px hideCode
setInitialRoutes(["/users"]);
import { Refine } from "@pankod/refine-core";

// visible-block-start
import { List, Table, Pagination, EmailField } from "@pankod/refine-mantine";
import { useTable, ColumnDef, flexRender } from "@pankod/refine-react-table";

const UserList: React.FC = () => {
  const columns = React.useMemo<ColumnDef<IUser>[]>(
    () => [
      {
        id: "id",
        header: "ID",
        accessorKey: "id",
      },
      {
        id: "firstName",
        header: "First Name",
        accessorKey: "firstName",
      },
      {
        id: "lastName",
        header: "Last Name",
        accessorKey: "lastName",
      },
      {
        id: "email",
        header: "Email",
        accessorKey: "email",
        cell: function render({ getValue }) {
          return (
            // highlight-next-line
            <EmailField value={getValue()} />
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

interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}
// visible-block-end

const App = () => {
  return <Refine resources={[{ name: "users", list: UserList }]} />;
};

render(
  <Wrapper>
    <App />
  </Wrapper>,
);
```

:::tip
`<EmailField>` uses "mailto:" in the href prop of the [`<Anchor>`](https://mantine.dev/core/anchor) component. For this reason, clicking `<EmailField>` opens your device's default mail application.
:::

## API Reference

### Properties

<PropsTable module="@pankod/refine-mantine/EmailField" />

[Refer to the documentation for the rest of Anchor properties. &#8594](https://mantine.dev/core/anchor?t=props)
