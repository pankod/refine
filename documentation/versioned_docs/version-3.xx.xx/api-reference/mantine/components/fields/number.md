---
id: number
title: Number
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

This field is used to display a number formatted according to the browser locale, right aligned. and uses [`Intl`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl) to display date format.

:::info-tip Swizzle
You can swizzle this component to customize it with the [**refine CLI**](/core/docs/3.xx.xx/packages/documentation/cli)
:::

## Usage

`<NumberField>` uses Intl.NumberFormat() if available, passing the locales and options props as arguments. This allows a perfect display of decimals, currencies, percentages, etc. See [Intl.NumberFormat documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat) for the options prop syntax.

If Intl is not available, `<NumberField>` outputs numbers as is (and ignores the locales and options props).

```tsx live url=http://localhost:3000 previewHeight=420px hideCode
setInitialRoutes(["/posts"]);
import { Refine } from "@pankod/refine-core";

// visible-block-start
import { List, Table, Pagination, NumberField } from "@pankod/refine-mantine";
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
        id: "hit",
        header: "Hit",
        accessorKey: "hit",
        cell: function render({ getValue }) {
          return (
            // highlight-start
            <NumberField
              value={getValue()}
              options={{
                notation: "compact",
              }}
            />
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
  hit: number;
}
// visible-block-end

const App = () => {
  return <Refine resources={[{ name: "posts", list: PostList }]} />;
};

render(
  <Wrapper>
    <App />
  </Wrapper>,
);
```

## API Reference

### Properties

<PropsTable module="@pankod/refine-mantine/NumberField" value-description="Number value" />

:::tip External Props
It also accepts all props of Mantine [Text](https://mantine.dev/core/text/?t=props).
:::
