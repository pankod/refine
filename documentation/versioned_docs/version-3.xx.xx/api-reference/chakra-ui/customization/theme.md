---
id: theme
title: Theme
---

```tsx live shared
import { useNavigation, useRouterContext } from "@pankod/refine-core";
import {
  List,
  Edit,
  Create,
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  EditButton,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@pankod/refine-chakra-ui";
import { useTable, ColumnDef, flexRender } from "@pankod/refine-react-table";
import { useForm } from "@pankod/refine-react-hook-form";

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

  const { getHeaderGroups, getRowModel } = useTable({
    columns,
    refineCoreProps: {
      initialPageSize: 5,
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

The theme object is where you define your application's color palette, type scale, font stacks, breakpoints, border radius values, and more. You can either create your own theme object or use theme that provide from **refine**. You can find more information about theme in Chakra UI documentation.

[Refer to the Chakra UI documentation for more information about theme. &#8594](https://chakra-ui.com/docs/styled-system/customize-theme)

## Theme customization

`<ChakraProvider/>` component can be used to change theme and other global settings. It is not required if you decide to use the default theme. You can also use `refineTheme` provided by **refine**.

```tsx live url=http://localhost:3000 previewHeight=450px
setInitialRoutes(["/posts"]);

// visible-block-start
import { Refine } from "@pankod/refine-core";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";
import {
  ChakraProvider,
  ErrorComponent,
  Layout,
  ReadyPage,
  useNotificationProvider,
  // highlight-start
  refineTheme,
  extendTheme,
  // highlight-end
} from "@pankod/refine-chakra-ui";

import { PostCreate, PostEdit, PostList } from "./pages";

const App = () => {
  // highlight-start
  const customTheme = extendTheme({
    ...refineTheme,
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
      <Refine
        routerProvider={routerProvider}
        dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
        notificationProvider={notificationProvider()}
        ReadyPage={ReadyPage}
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
    </ChakraProvider>
  );
};
// visible-block-end
render(<App />);
```

:::info

[Refer to the `refineTheme` object in the source code to see the default theme values.. &#8594](https://github.com/refinedev/refine/blob/v3/packages/chakra-ui/src/theme/index.ts)

:::

## Theme switching

Chakra UI comes with built-in support for managing color mode in your apps. You can manage the color mode on refine applications such as Chakra UI applications.

:::tip

Chakra stores the color mode in `localStorage` and appends a className to the body to ensure the color mode is persistent.
:::

[Refer to the Chakra UI documentation for more information about color mode. &#8594](https://chakra-ui.com/docs/styled-system/color-mode)

```tsx live url=http://localhost:3000 previewHeight=500px
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
  ChakraProvider,
  ErrorComponent,
  Layout,
  ReadyPage,
  useNotificationProvider,
  Box,
  IconButton,
  Icon,
  // highlight-start
  useColorMode,
  refineTheme,
  extendTheme,
  // highlight-end
} from "@pankod/refine-chakra-ui";
import { IconSun, IconMoonStars } from "@tabler/icons";

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
    ...refineTheme,
    config: {
      initialColorMode: "dark",
      useSystemColorMode: false,
    },
  });
  // highlight-end

  return (
    // highlight-next-line
    <ChakraProvider theme={customTheme}>
      <Refine
        routerProvider={routerProvider}
        dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
        notificationProvider={notificationProvider()}
        ReadyPage={ReadyPage}
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
    </ChakraProvider>
  );
};
// visible-block-end
render(<App />);
```
