---
title: "Chakra UI List Component | UI Component in Refine v5"
display_title: "List"
sidebar_label: "List"
description: "Implement List in Refine v5. Learn the key steps. Explore customization options for accessibility, components for polished admin UIs. Learn with code examples."
swizzle: true
---

`<List>` provides us a layout to display the page. It does not contain any logic and just adds extra functionalities like a create button or giving the page titles.

We will show what `<List>` does using properties with examples.

```tsx live url=http://localhost:3000/posts previewHeight=420px hideCode
setInitialRoutes(["/posts"]);

// visible-block-start
import { List, DateField } from "@refinedev/chakra-ui";
import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from "@chakra-ui/react";
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
        id: "status",
        header: "Status",
        accessorKey: "status",
      },
      {
        id: "createdAt",
        header: "Created At",
        accessorKey: "createdAt",
        cell: function render({ getValue }) {
          return <DateField value={getValue() as string} format="LLL" />;
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
// visible-block-end

render(
  <ReactRouter.BrowserRouter>
    <RefineChakraDemo
      resources={[
        {
          name: "posts",
          list: "/posts",
        },
      ]}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route path="/posts" element={<PostList />} />
      </ReactRouter.Routes>
    </RefineChakraDemo>
  </ReactRouter.BrowserRouter>,
);
```

:::simple Good to know

You can swizzle this component to customize it with the [**Refine CLI**](/core/docs/packages/cli/)

:::

## Properties

### title

It allows adding a title for the `<List>` component. if you don't pass title props, it uses plural form of resource name by default.

```tsx live url=http://localhost:3000/posts previewHeight=280px
setInitialRoutes(["/posts"]);
import { Refine } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";

// visible-block-start
import { List } from "@refinedev/chakra-ui";
import { Heading } from "@chakra-ui/react";

const PostList: React.FC = () => {
  return (
    /* highlight-next-line */
    <List title={<Heading size="lg">Custom Title</Heading>}>
      <p>Rest of your page here</p>
    </List>
  );
};
// visible-block-end

render(
  <ReactRouter.BrowserRouter>
    <RefineChakraDemo
      dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
      resources={[
        {
          name: "posts",
          list: "/posts",
        },
      ]}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route path="/posts" element={<PostList />} />
      </ReactRouter.Routes>
    </RefineChakraDemo>
  </ReactRouter.BrowserRouter>,
);
```

### resource

`<List>` component reads the `resource` information from the route by default. If you want to use a custom resource for the `<List>` component, you can use the `resource` prop.

```tsx live url=http://localhost:3000/custom previewHeight=280px
setInitialRoutes(["/custom"]);

// visible-block-start
import { List } from "@refinedev/chakra-ui";

const CustomPage: React.FC = () => {
  return (
    <List resource="categories">
      <p>Rest of your page here</p>
    </List>
  );
};
// visible-block-end

render(
  <ReactRouter.BrowserRouter>
    <RefineChakraDemo
      resources={[
        {
          name: "categories",
          list: "/categories",
        },
      ]}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route path="/custom" element={<CustomPage />} />
      </ReactRouter.Routes>
    </RefineChakraDemo>
  </ReactRouter.BrowserRouter>,
);
```

If you have multiple resources with the same name, you can pass the `identifier` instead of the `name` of the resource. It will only be used as the main matching key for the resource, data provider methods will still work with the `name` of the resource defined in the `<Refine/>` component.

> For more information, refer to the [`identifier` section of the `<Refine/>` component documentation &#8594](/core/docs/core/refine-component#identifier)

### canCreate and createButtonProps

`canCreate` allows us to add the create button inside the `<List>` component. If resource is passed a create component, Refine adds the create button by default. If you want to customize this button you can use `createButtonProps` property like the code below.

Create button redirects to the create page of the resource according to the value it reads from the URL.

```tsx live url=http://localhost:3000/posts previewHeight=280px
setInitialRoutes(["/posts"]);
import { Refine } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";

// visible-block-start
import { List } from "@refinedev/chakra-ui";
import { usePermissions } from "@refinedev/core";

const PostList: React.FC = () => {
  const { data: permissionsData } = usePermissions();
  return (
    <List
      /* highlight-start */
      canCreate={permissionsData?.includes("admin")}
      createButtonProps={{ colorScheme: "red", variant: "solid" }}
      /* highlight-end */
    >
      <p>Rest of your page here</p>
    </List>
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
      return {
        data: {},
      };
    },
  };

  const authProvider = {
    login: async () => {
      return {
        success: true,
        redirectTo: "/",
      };
    },
    register: async () => {
      return {
        success: true,
      };
    },
    forgotPassword: async () => {
      return {
        success: true,
      };
    },
    updatePassword: async () => {
      return {
        success: true,
      };
    },
    logout: async () => {
      return {
        success: true,
        redirectTo: "/",
      };
    },
    check: async () => ({
      authenticated: true,
    }),
    onError: async (error) => {
      console.error(error);
      return { error };
    },
    getPermissions: async () => ["admin"],
    getIdentity: async () => null,
  };

  return (
    <ReactRouter.BrowserRouter>
      <RefineChakraDemo
        dataProvider={customDataProvider}
        authProvider={authProvider}
        resources={[
          {
            name: "posts",
            list: "/posts",
            create: "/posts/create",
          },
        ]}
      >
        <ReactRouter.Routes>
          <ReactRouter.Route path="/posts" element={<PostList />} />
        </ReactRouter.Routes>
      </RefineChakraDemo>
    </ReactRouter.BrowserRouter>
  );
};
render(<App />);
```

### breadcrumb <GlobalConfigBadge id="core/refine-component/#breadcrumb" />

To customize or disable the breadcrumb, you can use the `breadcrumb` property. By default it uses the `Breadcrumb` component from `@refinedev/chakra-ui` package.

```tsx live url=http://localhost:3000/posts previewHeight=280px
setInitialRoutes(["/posts"]);
import { Refine } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";

// visible-block-start
import { List } from "@refinedev/chakra-ui";
import { Box } from "@chakra-ui/react";

const CustomBreadcrumb: React.FC = () => {
  return (
    <Box borderColor="blue" borderStyle="dashed" borderWidth="2px" p="2">
      My Custom Breadcrumb
    </Box>
  );
};

const PostList: React.FC = () => {
  return (
    <List
      // highlight-start
      breadcrumb={<CustomBreadcrumb />}
      // highlight-end
    >
      <p>Rest of your page here</p>
    </List>
  );
};
// visible-block-end

const App = () => {
  return (
    <ReactRouter.BrowserRouter>
      <RefineChakraDemo
        dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
        resources={[
          {
            name: "posts",
            list: "/posts",
          },
        ]}
      >
        <ReactRouter.Routes>
          <ReactRouter.Route path="/posts" element={<PostList />} />
        </ReactRouter.Routes>
      </RefineChakraDemo>
    </ReactRouter.BrowserRouter>
  );
};
render(<App />);
```

> For more information, refer to the [`Breadcrumb` documentation &#8594](/core/docs/ui-integrations/chakra-ui/components/breadcrumb/)

### wrapperProps

If you want to customize the wrapper of the `<List/>` component, you can use the `wrapperProps` property. For `@refinedev/chakra-ui` wrapper element is `<Box>`s and `wrapperProps` can get every attribute that `<Box>` can get.

```tsx live url=http://localhost:3000/posts previewHeight=280px
setInitialRoutes(["/posts"]);
import { Refine } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";

// visible-block-start
import { List } from "@refinedev/chakra-ui";

const PostList: React.FC = () => {
  return (
    <List
      // highlight-start
      wrapperProps={{
        borderColor: "blue",
        borderStyle: "dashed",
        borderWidth: "2px",
        p: "2",
      }}
      // highlight-end
    >
      <p>Rest of your page here</p>
    </List>
  );
};
// visible-block-end

const App = () => {
  return (
    <ReactRouter.BrowserRouter>
      <RefineChakraDemo
        dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
        resources={[
          {
            name: "posts",
            list: "/posts",
          },
        ]}
      >
        <ReactRouter.Routes>
          <ReactRouter.Route path="/posts" element={<PostList />} />
        </ReactRouter.Routes>
      </RefineChakraDemo>
    </ReactRouter.BrowserRouter>
  );
};
render(<App />);
```

> For more information, refer to the [`Box` documentation from Chakra UI &#8594](https://www.chakra-ui.com/docs/components/box#usage)

### headerProps

If you want to customize the header of the `<List/>` component, you can use the `headerProps` property.

```tsx live url=http://localhost:3000/posts previewHeight=280px
setInitialRoutes(["/posts"]);
import { Refine } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";

// visible-block-start
import { List } from "@refinedev/chakra-ui";

const PostList: React.FC = () => {
  return (
    <List
      // highlight-start
      headerProps={{
        borderColor: "blue",
        borderStyle: "dashed",
        borderWidth: "2px",
        p: "2",
      }}
      // highlight-end
    >
      <p>Rest of your page here</p>
    </List>
  );
};
// visible-block-end

const App = () => {
  return (
    <ReactRouter.BrowserRouter>
      <RefineChakraDemo
        dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
        resources={[
          {
            name: "posts",
            list: "/posts",
          },
        ]}
      >
        <ReactRouter.Routes>
          <ReactRouter.Route path="/posts" element={<PostList />} />
        </ReactRouter.Routes>
      </RefineChakraDemo>
    </ReactRouter.BrowserRouter>
  );
};
render(<App />);
```

> For more information, refer to the [`Box` documentation from Chakra UI &#8594](https://www.chakra-ui.com/docs/components/box#usage)

### contentProps

If you want to customize the content of the `<List/>` component, you can use the `contentProps` property.

```tsx live url=http://localhost:3000/posts previewHeight=280px
setInitialRoutes(["/posts"]);
import { Refine } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";

// visible-block-start
import { List } from "@refinedev/chakra-ui";

const PostList: React.FC = () => {
  return (
    <List
      // highlight-start
      contentProps={{
        borderColor: "blue",
        borderStyle: "dashed",
        borderWidth: "2px",
        padding: 2,
      }}
      // highlight-end
    >
      <p>Rest of your page here</p>
    </List>
  );
};
// visible-block-end

const App = () => {
  return (
    <ReactRouter.BrowserRouter>
      <RefineChakraDemo
        dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
        resources={[
          {
            name: "posts",
            list: "/posts",
          },
        ]}
      >
        <ReactRouter.Routes>
          <ReactRouter.Route path="/posts" element={<PostList />} />
        </ReactRouter.Routes>
      </RefineChakraDemo>
    </ReactRouter.BrowserRouter>
  );
};
render(<App />);
```

> For more information, refer to the [`Box` documentation from Chakra UI &#8594](https://www.chakra-ui.com/docs/components/box#usage)

### headerButtons

By default, the `<List/>` component has a [`<CreateButton>`][create-button] at the header.

You can customize the buttons at the header by using the `headerButtons` property. It accepts `React.ReactNode` or a render function `({ defaultButtons, createButtonProps}) => React.ReactNode` which you can use to keep the existing buttons and add your own.

:::simple Implementation Tips

If "create" resource is not defined or [`canCreate`](#cancreate-and-createbuttonprops) is `false`, the [`<CreateButton>`][create-button] will not render and `createButtonProps` will be `undefined`.

:::

```tsx live url=http://localhost:3000/posts previewHeight=280px
setInitialRoutes(["/posts"]);
import { Refine } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";

// visible-block-start
import { List } from "@refinedev/chakra-ui";
import { Button } from "@chakra-ui/react";

const PostList: React.FC = () => {
  return (
    <List
      // highlight-start
      headerButtons={({ defaultButtons }) => (
        <>
          {defaultButtons}
          <Button colorScheme="red" variant="solid">
            Custom Button
          </Button>
        </>
      )}
      // highlight-end
    >
      <p>Rest of your page here</p>
    </List>
  );
};
// visible-block-end

const App = () => {
  return (
    <ReactRouter.BrowserRouter>
      <RefineChakraDemo
        dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
        resources={[
          {
            name: "posts",
            list: "/posts",
          },
        ]}
      >
        <ReactRouter.Routes>
          <ReactRouter.Route path="/posts" element={<PostList />} />
        </ReactRouter.Routes>
      </RefineChakraDemo>
    </ReactRouter.BrowserRouter>
  );
};
render(<App />);
```

Or, instead of using the `defaultButtons`, you can create your own buttons. If you want, you can use `createButtonProps` to utilize the default values of the [`<CreateButton>`][create-button] component.

```tsx live url=http://localhost:3000/posts previewHeight=280px
setInitialRoutes(["/posts"]);
import { Refine } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";

// visible-block-start
import { List } from "@refinedev/chakra-ui";
import { Button, CreateButton } from "@chakra-ui/react";

const PostList: React.FC = () => {
  return (
    <List
      // highlight-start
      headerButtons={({ createButtonProps }) => (
        <>
          {createButtonProps && (
            <CreateButton {...createButtonProps} meta={{ foo: "bar" }} />
          )}
          <Button colorScheme="red" variant="solid">
            Custom Button
          </Button>
        </>
      )}
      // highlight-end
    >
      <p>Rest of your page here</p>
    </List>
  );
};
// visible-block-end

const App = () => {
  return (
    <ReactRouter.BrowserRouter>
      <RefineChakraDemo
        dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
        resources={[
          {
            name: "posts",
            list: "/posts",
          },
        ]}
      >
        <ReactRouter.Routes>
          <ReactRouter.Route path="/posts" element={<PostList />} />
        </ReactRouter.Routes>
      </RefineChakraDemo>
    </ReactRouter.BrowserRouter>
  );
};
render(<App />);
```

### headerButtonProps

You can customize the wrapper element of the buttons at the header by using the `headerButtonProps` property.

```tsx live url=http://localhost:3000/posts previewHeight=280px
setInitialRoutes(["/posts"]);
import { Refine } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";

// visible-block-start
import { List } from "@refinedev/chakra-ui";
import { Button } from "@chakra-ui/react";

const PostList: React.FC = () => {
  return (
    <List
      // highlight-start
      headerButtonProps={{
        borderColor: "blue",
        borderStyle: "dashed",
        borderWidth: "2px",
        p: "2",
      }}
      // highlight-end
      headerButtons={
        <Button colorScheme="red" variant="solid">
          Custom Button
        </Button>
      }
    >
      <p>Rest of your page here</p>
    </List>
  );
};
// visible-block-end

const App = () => {
  return (
    <ReactRouter.BrowserRouter>
      <RefineChakraDemo
        dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
        resources={[
          {
            name: "posts",
            list: "/posts",
          },
        ]}
      >
        <ReactRouter.Routes>
          <ReactRouter.Route path="/posts" element={<PostList />} />
        </ReactRouter.Routes>
      </RefineChakraDemo>
    </ReactRouter.BrowserRouter>
  );
};
render(<App />);
```

> For more information, refer to the [`Box` documentation from Chakra UI &#8594](https://www.chakra-ui.com/docs/components/box#usage)

## API Reference

### Props

<PropsTable module="@refinedev/chakra-ui/List" title-default="`<Title order={3}>{resource.name}</Title>`" />

[create-button]: /core/docs/ui-integrations/chakra-ui/components/buttons/create-button
