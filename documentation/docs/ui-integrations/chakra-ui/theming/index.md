---
title: "Theming Guide | Accessibility UI in Refine v5"
display_title: "Theming"
sidebar_label: "Theming"
description: "Integrate Theming in Refine v5. Learn best practices. Learn integration patterns for accessibility, components for polished admin UIs. Learn with code examples."
---

```tsx live shared
import { List, Edit, Create, EditButton } from "@refinedev/chakra-ui";
import {
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useTable } from "@refinedev/react-table";
import { ColumnDef, flexRender } from "@tanstack/react-table";
import { useForm } from "@refinedev/react-hook-form";

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
  } = useTable({
    columns,
    refineCoreProps: {
      pagination: { pageSize: 5 },
    },
  });

  return (
    <List>
      <TableContainer whiteSpace="pre-line">
        <Table variant="simple">
          <Thead>
            {getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Th key={header.id}>
                    {!header.isPlaceholder && (
                      <Text>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                      </Text>
                    )}
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {getRowModel().rows.map((row) => (
              <Tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <Td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </List>
  );
};

const PostEdit: React.FC = () => {
  const {
    refineCore: { formLoading },
    saveButtonProps,
    register,
    formState: { errors },
  } = useForm<IPost>();

  return (
    <Edit isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <FormControl mb="3" isInvalid={!!errors?.title}>
        <FormLabel>Title</FormLabel>
        <Input {...register("title", { required: "Title is required" })} />
        <FormErrorMessage>{`${errors.title?.message}`}</FormErrorMessage>
      </FormControl>
    </Edit>
  );
};

const PostCreate = () => {
  const {
    refineCore: { formLoading },
    saveButtonProps,
    register,
    formState: { errors },
  } = useForm<IPost>();

  return (
    <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <FormControl mb="3" isInvalid={!!errors?.title}>
        <FormLabel>Title</FormLabel>
        <Input {...register("title", { required: "Title is required" })} />
        <FormErrorMessage>{`${errors.title?.message}`}</FormErrorMessage>
      </FormControl>
    </Create>
  );
};

interface IPost {
  id: number;
  title: string;
}
```

The theme object is where you define your application's color palette, type scale, font stacks, breakpoints, border radius values, and more. You can either create your own theme object or use theme that provide from Refine. You can find more information about theme in Chakra UI documentation.

> For more information, refer to the [Chakra UI documentation &#8594](https://chakra-ui.com/docs/styled-system/customize-theme)

## Predefined Themes

[`RefineThemes`](https://github.com/refinedev/refine/blob/main/packages/chakra-ui/src/theme/index.ts#L92) has predefined themes for you. You can use them by importing them from the `@refinedev/chakra-ui` package. It is not required if you decide to use the default Chakra UI theme.

```ts
const { Blue, Purple, Magenta, Red, Orange, Yellow } = RefineThemes;
```

```tsx
import { Refine } from "@refinedev/core";
import { ThemedLayout, RefineThemes } from "@refinedev/chakra-ui";

import { ChakraProvider } from "@chakra-ui/react";

const App: React.FC = () => {
  return (
    <ChakraProvider theme={RefineThemes.Blue}>
      <Refine
      /* ... */
      >
        <ThemedLayout>{/* ... */}</ThemedLayout>
      </Refine>
    </ChakraProvider>
  );
};
```

You can see how themes change the look of the application in [this example &#8594](/core/docs/examples/themes/refine-themes-chakra-ui/)

If you want to use `<ThemedLayout>` you have to wrap your application with the `<ChakraProvider>` component and should give `theme` prop to it.

You can use `RefineThemes` provided by Refine or you can create your own theme object.

> For more information, please refer to the [Chakra UI documentation &#8594](https://chakra-ui.com/docs/styled-system/customize-theme)

## Theme customization

`<ChakraProvider/>` component can be used to change the theme and other global settings. It is not required if you decide to use the default theme. You can also use `RefineThemes` provided by Refine.

```tsx live url=http://localhost:3000 previewHeight=450px
setInitialRoutes(["/posts"]);

// visible-block-start
import { Refine } from "@refinedev/core";
import routerProvider from "@refinedev/react-router";
import dataProvider from "@refinedev/simple-rest";
import {
  ErrorComponent,
  ThemedLayout,
  useNotificationProvider,
  // highlight-next-line
  RefineThemes,
} from "@refinedev/chakra-ui";
import {
  ChakraProvider,
  // highlight-next-line
  extendTheme,
} from "@chakra-ui/react";

import { BrowserRouter, Routes, Route, Outlet } from "react-router";

import { PostCreate, PostEdit, PostList } from "./pages";

const App = () => {
  // highlight-start
  const customTheme = extendTheme({
    ...RefineThemes.Blue,
    colors: {
      sider: {
        background: "#4A5568",
        collapseButton: "#1a202c",
      },
    },
  });
  // highlight-end

  return (
    // highlight-next-line
    <ChakraProvider theme={customTheme}>
      <BrowserRouter>
        <Refine
          routerProvider={routerProvider}
          dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
          notificationProvider={notificationProvider()}
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
    </ChakraProvider>
  );
};
// visible-block-end
render(<App />);
```

[Refer to the `refineTheme` object in the source code to see the default theme values &#8594](https://github.com/refinedev/refine/blob/main/packages/chakra-ui/src/theme/index.ts)

## Theme switching

Chakra UI comes with built-in support for managing color mode in your apps. You can manage the color mode on Refine applications such as Chakra UI applications.

Chakra stores the color mode in `localStorage` and appends a className to the body to ensure the color mode is persistent.

> For more information, refer to the [Chakra UI documentation &#8594](https://chakra-ui.com/docs/styled-system/color-mode)

```tsx live url=http://localhost:3000 previewHeight=500px
setInitialRoutes(["/posts"]);

// visible-block-start
import { Refine } from "@refinedev/core";
import routerProvider from "@refinedev/react-router";
import dataProvider from "@refinedev/simple-rest";
import {
  ErrorComponent,
  ThemedLayout,
  useNotificationProvider,
  // highlight-next-line
  RefineThemes,
} from "@refinedev/chakra-ui";
import {
  ChakraProvider,
  Box,
  IconButton,
  Icon,
  // highlight-start
  useColorMode,
  extendTheme,
  // highlight-end
} from "@chakra-ui/react";
import { IconSun, IconMoonStars } from "@tabler/icons-react";

import { BrowserRouter, Routes, Route, Outlet } from "react-router";

import { PostCreate, PostEdit, PostList } from "./pages";

// highlight-start
const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Box
      py="2"
      px="4"
      display="flex"
      justifyContent="flex-end"
      w="full"
      bg="chakra-body-bg"
    >
      <IconButton
        variant="ghost"
        aria-label="Toggle theme"
        onClick={toggleColorMode}
      >
        <Icon
          as={colorMode === "light" ? IconMoonStars : IconSun}
          w="18px"
          h="18px"
        />
      </IconButton>
    </Box>
  );
};
// highlight-end

const App = () => {
  // highlight-start
  const customTheme = extendTheme({
    ...RefineThemes.Blue,
    config: {
      initialColorMode: "dark",
      useSystemColorMode: false,
    },
  });
  // highlight-end

  return (
    // highlight-next-line
    <ChakraProvider theme={customTheme}>
      <BrowserRouter>
        <Refine
          routerProvider={routerProvider}
          dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
          notificationProvider={notificationProvider()}
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
                // highlight-next-line
                <ThemedLayout Header={Header}>
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
    </ChakraProvider>
  );
};
// visible-block-end
render(<App />);
```

If you want to customize the default layout elements provided with `@refinedev/chakra-ui` package, check out the [Custom Layout](/core/docs/advanced-tutorials/custom-layout/) tutorial.
