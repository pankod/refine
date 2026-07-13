---
title: "Theming Guide | React UI Library in Refine v5"
display_title: "Theme"
sidebar_label: "Theme"
description: "Build Theming in Refine v5. Learn the key steps. Learn integration patterns for React UI library, components for polished admin UIs. See practical code samples."
---

```tsx live shared
import { List, Create, Edit, EditButton, useForm } from "@refinedev/mantine";
import { Table, Pagination, TextInput } from "@mantine/core";
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
          return <EditButton hideText recordItemId={getValue() as number} />;
        },
      },
    ],
    [],
  );

  const {
    reactTable: { getHeaderGroups, getRowModel },
    refineCore: { setCurrentPage, pageCount, currentPage },
  } = useTable({
    columns,
    refineCoreProps: {
      pagination: { pageSize: 5 },
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
        page={currentPage}
        onChange={setCurrentPage}
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

Mantine theme is an object where your application's colors, fonts, spacing, border-radius and other design tokens are stored. You can either create your own theme object or use themes that provide from Refine. Theme provides a way to your app's design to meet them.

> For more information, refer to the [Mantine documentation &#8594](https://mantine.dev/theming/theme-object/)

## Predefined Themes

If you don't want to use the default Mantine theme, [`RefineThemes`](https://github.com/refinedev/refine/blob/main/packages/mantine/src/theme/index.ts#L186) has predefined themes for you. You can import predefined themes from the `@refinedev/mantine` package.

```ts
const { Blue, Purple, Magenta, Red, Orange, Yellow } = RefineThemes;
```

```tsx
import { Refine } from "@refinedev/core";
import { ThemedLayout, RefineThemes } from "@refinedev/mantine";

import { MantineProvider } from "@mantine/core";

const App: React.FC = () => {
  return (
    <MantineProvider theme={RefineThemes.Blue}>
      <Refine
      /* ... */
      >
        <ThemedLayout>{/* ... */}</ThemedLayout>
      </Refine>
    </MantineProvider>
  );
};
```

[You can see how themes change the look of the application in this example.](/core/docs/examples/themes/refine-themes-mantine/)

## Theme customization

`<MantineProvider/>` component can be used to change the theme. It is not required if you decide to use the default theme. You can also use `RefineThemes` provided by Refine.

```tsx live url=http://localhost:3000 previewHeight=420px
setInitialRoutes(["/posts"]);

// visible-block-start
import { Refine } from "@refinedev/core";
import routerProvider from "@refinedev/react-router";
import dataProvider from "@refinedev/simple-rest";
import {
  ThemedLayout,
  useNotificationProvider,
  ErrorComponent,
  // highlight-next-line
  RefineThemes,
} from "@refinedev/mantine";
import { MantineProvider, Global } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";

import { BrowserRouter, Routes, Route, Outlet } from "react-router";

import { PostCreate, PostEdit, PostList } from "./pages";

const App = () => {
  return (
    <MantineProvider
      // highlight-next-line
      theme={RefineThemes.Blue}
      withNormalizeCSS
      withGlobalStyles
    >
      <Global styles={{ body: { WebkitFontSmoothing: "auto" } }} />
      <NotificationsProvider position="top-right">
        <BrowserRouter>
          <Refine
            routerProvider={routerProvider}
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            notificationProvider={useNotificationProvider}
            resources={[
              {
                name: "posts",
                list: "/posts",
                edit: "/posts/edit/:id",
                create: "/posts/create",
              },
            ]}
          >
            <Routes>
              <Route
                element={
                  <ThemedLayout>
                    <Outlet />
                  </ThemedLayout>
                }
              >
                <Route path="posts">
                  <Route index element={<PostList />} />
                  <Route path="create" element={<PostCreate />} />
                  <Route path="edit/:id" element={<PostEdit />} />
                </Route>
                <Route path="*" element={<ErrorComponent />} />
              </Route>
            </Routes>
          </Refine>
        </BrowserRouter>
      </NotificationsProvider>
    </MantineProvider>
  );
};
// visible-block-end
render(<App />);
```

> For more information, refer to the [`<MantineProvider/>` documentation &#8594](https://mantine.dev/theming/mantine-provider/)

### Overriding the Refine themes

You can override or extend the default Refine themes. You can also create your own theme. Let's see how you can do this:

```tsx live url=http://localhost:3000 previewHeight=420px
setInitialRoutes(["/posts"]);

// visible-block-start
import { Refine } from "@refinedev/core";
import routerProvider from "@refinedev/react-router";
import dataProvider from "@refinedev/simple-rest";
import {
  ThemedLayout,
  useNotificationProvider,
  ErrorComponent,
  // highlight-next-line
  RefineThemes,
} from "@refinedev/mantine";
import { MantineProvider, Global } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";

import { BrowserRouter, Routes, Route, Outlet } from "react-router";

import { PostCreate, PostEdit, PostList } from "./pages";

const App = () => {
  return (
    <MantineProvider
      // highlight-start
      theme={{
        ...RefineThemes.Blue,
        colors: {
          brand: [
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
        globalStyles: (theme: MantineTheme) => ({
          body: {
            backgroundColor: "#84D7D5",
          },
        }),
      }}
      // highlight-end
      withNormalizeCSS
      withGlobalStyles
    >
      <Global styles={{ body: { WebkitFontSmoothing: "auto" } }} />
      <NotificationsProvider position="top-right">
        <BrowserRouter>
          <Refine
            routerProvider={routerProvider}
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            notificationProvider={useNotificationProvider}
            resources={[
              {
                name: "posts",
                list: "/posts",
                edit: "/posts/edit/:id",
                create: "/posts/create",
              },
            ]}
          >
            <Routes>
              <Route
                element={
                  <ThemedLayout>
                    <Outlet />
                  </ThemedLayout>
                }
              >
                <Route path="posts">
                  <Route index element={<PostList />} />
                  <Route path="create" element={<PostCreate />} />
                  <Route path="edit/:id" element={<PostEdit />} />
                </Route>
                <Route path="*" element={<ErrorComponent />} />
              </Route>
            </Routes>
          </Refine>
        </BrowserRouter>
      </NotificationsProvider>
    </MantineProvider>
  );
};
// visible-block-end
render(<App />);
```

> For more information, refer to the [Mantine colors documentation &#8594](https://mantine.dev/theming/colors/)

## Theme switching

You can switch between themes as Mantine mentioned in its documentation. You can see an example of using local storage to store the theme below.

```tsx live url=http://localhost:3000 previewHeight=420px
setInitialRoutes(["/posts"]);

// visible-block-start
import { Refine } from "@refinedev/core";
import routerProvider from "@refinedev/react-router";
import dataProvider from "@refinedev/simple-rest";
import {
  ThemedLayout,
  ErrorComponent,
  useNotificationProvider,
  RefineThemes,
} from "@refinedev/mantine";
// highlight-start
import { NotificationsProvider } from "@mantine/notifications";
import {
  MantineProvider,
  Global,
  useMantineColorScheme,
  Header as MantineHeader,
  Group,
  ActionIcon,
  ColorScheme,
  ColorSchemeProvider,
} from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
// highlight-end

import { BrowserRouter, Routes, Route, Outlet } from "react-router";

import { IconSun, IconMoonStars } from "@tabler/icons-react";

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
        theme={{
          ...RefineThemes.Blue,
          colorScheme: colorScheme,
        }}
        withNormalizeCSS
        withGlobalStyles
      >
        <Global styles={{ body: { WebkitFontSmoothing: "auto" } }} />
        <NotificationsProvider position="top-right">
          <BrowserRouter>
            <Refine
              routerProvider={routerProvider}
              dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
              notificationProvider={useNotificationProvider}
              resources={[
                {
                  name: "posts",
                  list: "/posts",
                  edit: "/posts/edit/:id",
                  create: "/posts/create",
                },
              ]}
            >
              <Routes>
                <Route
                  element={
                    <ThemedLayout
                      // highlight-next-line
                      Header={Header}
                    >
                      <Outlet />
                    </ThemedLayout>
                  }
                >
                  <Route path="posts">
                    <Route index element={<PostList />} />
                    <Route path="create" element={<PostCreate />} />
                    <Route path="edit/:id" element={<PostEdit />} />
                  </Route>
                  <Route path="*" element={<ErrorComponent />} />
                </Route>
              </Routes>
            </Refine>
          </BrowserRouter>
        </NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
};
// visible-block-end
render(<App />);
```

> For more information, refer to the [Mantine dark theme documentation &#8594](https://mantine.dev/guides/dark-theme)

If you want to customize the default layout elements provided with `@refinedev/mantine` package, check out the [Custom ThemedLayout](/core/docs/advanced-tutorials/custom-layout/) tutorial.
