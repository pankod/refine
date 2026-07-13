---
id: theme
title: Theme
---

```tsx live shared
import { useNavigation, useRouterContext } from "@pankod/refine-core";
import {
  List,
  Create,
  Edit,
  Table,
  Pagination,
  EditButton,
  useForm,
  TextInput,
} from "@pankod/refine-mantine";
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
          return <EditButton hideText recordItemId={getValue() as number} />;
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

const PostEdit: React.FC = () => {
  const { saveButtonProps, getInputProps } = useForm({
    initialValues: {
      title: "",
    },
    validate: {
      title: (value) => (value.length < 2 ? "Too short title" : null),
    },
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <form>
        <TextInput
          mt={8}
          label="Title"
          placeholder="Title"
          {...getInputProps("title")}
        />
      </form>
    </Edit>
  );
};

const PostCreate: React.FC = () => {
  const { saveButtonProps, getInputProps } = useForm({
    initialValues: {
      title: "",
    },
    validate: {
      title: (value) => (value.length < 2 ? "Too short title" : null),
    },
  });

  return (
    <Create saveButtonProps={saveButtonProps}>
      <form>
        <TextInput
          mt={8}
          label="Title"
          placeholder="Title"
          {...getInputProps("title")}
        />
      </form>
    </Create>
  );
};

interface IPost {
  id: number;
  title: string;
}
```

Mantine theme is an object where your application's colors, fonts, spacing, border-radius and other design tokens are stored. You can either create your own theme object or use themes that provide from **refine**. There are two types of themes: [`LightTheme`](https://github.com/refinedev/refine/blob/v3/packages/mantine/src/theme/index.ts) and [`DarkTheme`](https://github.com/refinedev/refine/blob/v3/packages/mantine/src/theme/index.ts). `LightTheme` tend to have dark text on a light background, while `DarkTheme` have light text on a dark background. Theme provides a way to your app's design to meet them.

[Refer to the Mantine documentation for more information about theme object. &#8594](https://mantine.dev/theming/theme-object/)

## Theme customization

`<MantineProvider/>` component can be used to change theme. It is not required if you decide to use the default theme. You can also use `LightTheme` and `DarkTheme` provided by **refine**.

```tsx live url=http://localhost:3000 previewHeight=420px
setInitialRoutes(["/posts"]);

// visible-block-start
import { Refine } from "@pankod/refine-core";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";
import {
  Layout,
  MantineProvider,
  Global,
  NotificationsProvider,
  useNotificationProvider,
  // highlight-next-line
  DarkTheme,
} from "@pankod/refine-mantine";

import { PostCreate, PostEdit, PostList } from "./pages";

const App = () => {
  return (
    // highlight-next-line
    <MantineProvider theme={DarkTheme} withNormalizeCSS withGlobalStyles>
      <Global styles={{ body: { WebkitFontSmoothing: "auto" } }} />
      <NotificationsProvider position="top-right">
        <Refine
          routerProvider={routerProvider}
          dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
          notificationProvider={useNotificationProvider}
          Layout={Layout}
          resources={[
            {
              name: "posts",
              list: PostList,
              edit: PostEdit,
              create: PostCreate,
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

[Refer to the `<MantineProvider/>` documentation for more information. &#8594](https://mantine.dev/theming/mantine-provider/)

### Overriding the refine themes

You can override or extend the default refine themes. You can also create your own theme. Let's see how to do this.

```tsx live url=http://localhost:3000 previewHeight=420px
setInitialRoutes(["/posts"]);

// visible-block-start
import { Refine } from "@pankod/refine-core";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";
import {
  Layout,
  MantineProvider,
  Global,
  NotificationsProvider,
  useNotificationProvider,
  // highlight-next-line
  LightTheme,
} from "@pankod/refine-mantine";

import { PostCreate, PostEdit, PostList } from "./pages";

const App = () => {
  return (
    <MantineProvider
      // highlight-start
      theme={{
        ...LightTheme,
        colors: {
          primary: [
            "#ECF9F8",
            "#C9EEEC",
            "#A6E2E1",
            "#84D7D5",
            "#61CCC9",
            "#3EC1BD",
            "#329A97",
            "#257471",
            "#194D4B",
            "#0C2726",
          ],
        },
      }}
      // highlight-end
      withNormalizeCSS
      withGlobalStyles
    >
      <Global styles={{ body: { WebkitFontSmoothing: "auto" } }} />
      <NotificationsProvider position="top-right">
        <Refine
          routerProvider={routerProvider}
          dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
          notificationProvider={useNotificationProvider}
          Layout={Layout}
          resources={[
            {
              name: "posts",
              list: PostList,
              edit: PostEdit,
              create: PostCreate,
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

[Refer to the Mantine colors documentation for more information. &#8594](https://mantine.dev/theming/colors/)

## Theme switching

You can switch between themes as Mantine mentioned in its documentation. You can see an example of using local storage to store the theme below.

```tsx live url=http://localhost:3000 previewHeight=420px
setInitialRoutes(["/posts"]);

const IconSun = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon icon-tabler icon-tabler-sun"
    width={18}
    height={18}
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke="currentColor"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
    <circle cx={12} cy={12} r={4}></circle>
    <path d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7"></path>
  </svg>
);

const IconMoonStars = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon icon-tabler icon-tabler-moon-stars"
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
    <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z"></path>
    <path d="M17 4a2 2 0 0 0 2 2a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2a2 2 0 0 0 2 -2"></path>
    <path d="M19 11h2m-1 -1v2"></path>
  </svg>
);

// visible-block-start
import { Refine } from "@pankod/refine-core";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";
import {
  Layout,
  MantineProvider,
  Global,
  NotificationsProvider,
  useNotificationProvider,
  MantineHeader,
  Group,
  ActionIcon,
  // highlight-start
  ColorSchemeProvider,
  ColorScheme,
  LightTheme,
  DarkTheme,
  useLocalStorage,
  useMantineColorScheme,
  // highlight-end
} from "@pankod/refine-mantine";
import { IconSun, IconMoonStars } from "@tabler/icons";

import { PostCreate, PostEdit, PostList } from "./pages";

// highlight-start
const Header = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  return (
    <MantineHeader height={50} p="xs">
      <Group position="right">
        <ActionIcon
          variant="outline"
          color={dark ? "yellow" : "primary"}
          onClick={() => toggleColorScheme()}
          title="Toggle color scheme"
        >
          {dark ? <IconSun /> : <IconMoonStars />}
        </ActionIcon>
      </Group>
    </MantineHeader>
  );
};
// highlight-end

const App = () => {
  // highlight-start
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: "light",
    getInitialValueInEffect: true,
  });
  // highlight-end

  // highlight-start
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
  // highlight-end

  return (
    // highlight-start
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
      // highlight-end
    >
      <MantineProvider
        // highlight-next-line
        theme={colorScheme === "dark" ? DarkTheme : LightTheme}
        withNormalizeCSS
        withGlobalStyles
      >
        <Global styles={{ body: { WebkitFontSmoothing: "auto" } }} />
        <NotificationsProvider position="top-right">
          <Refine
            routerProvider={routerProvider}
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            notificationProvider={useNotificationProvider}
            Layout={Layout}
            // highlight-next-line
            Header={Header}
            resources={[
              {
                name: "posts",
                list: PostList,
                edit: PostEdit,
                create: PostCreate,
              },
            ]}
          />
        </NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
};
// visible-block-end
render(<App />);
```

[Refer to the Mantine dark theme documentation for more information. &#8594](https://mantine.dev/guides/dark-theme)
