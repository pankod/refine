---
title: "Mantine List Component | UI Component in Refine v5"
display_title: "List"
sidebar_label: "List"
description: "Learn to integrate List in Refine v5. Learn integrate React UI library, components for polished admin UIs. Hands-on examples included."
swizzle: true
---

`<List>` provides us a layout to display the page. It does not contain any logic and just adds extra functionalities like a create button and being able to give titles to the page.

We will show what `<List>` does using properties with examples.

```tsx live url=http://localhost:3000/posts previewHeight=420px hideCode
setInitialRoutes(["/posts"]);

// visible-block-start
import { List, DateField } from "@refinedev/mantine";
import { Table, Pagination } from "@mantine/core";
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
// visible-block-end

render(
  <ReactRouter.BrowserRouter>
    <RefineMantineDemo
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
    </RefineMantineDemo>
  </ReactRouter.BrowserRouter>,
);
```

:::simple Good to know

You can swizzle this component with the [**Refine CLI**](/core/docs/packages/cli/) to customize it.

:::

## Properties

### title

`title` allows adding a title for the `<List>` component. If you don't pass title props, it uses plural form of resource name by default.

```tsx live url=http://localhost:3000/posts previewHeight=280px
setInitialRoutes(["/posts"]);

// visible-block-start
import { List } from "@refinedev/mantine";
import { Title } from "@mantine/core";

const PostList: React.FC = () => {
  return (
    // highlight-next-line
    <List title={<Title order={3}>Custom Title</Title>}>
      <p>Rest of your page here</p>
    </List>
  );
};
// visible-block-end

render(
  <ReactRouter.BrowserRouter>
    <RefineMantineDemo
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
    </RefineMantineDemo>
  </ReactRouter.BrowserRouter>,
);
```

### resource

`<List>` component reads the `resource` information from the route by default. If you want to use a custom resource for the `<List>` component, you can use the `resource` prop.

```tsx live url=http://localhost:3000/custom previewHeight=280px
setInitialRoutes(["/custom"]);

// visible-block-start
import { List } from "@refinedev/mantine";

const CustomPage: React.FC = () => {
  return (
    <List resource="categories">
      <p>Rest of your page here</p>
    </List>
  );
};
// visible-block-end

const App = () => {
  return (
    <RefineMantineDemo
      resources={[
        {
          name: "custom",
          list: "/custom",
        },
      ]}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route path="/custom" element={<CustomPage />} />
      </ReactRouter.Routes>
    </RefineMantineDemo>
  );
};

render(
  <ReactRouter.BrowserRouter>
    <App />
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

// visible-block-start
import { List } from "@refinedev/mantine";
import { usePermissions } from "@refinedev/core";

const PostList: React.FC = () => {
  const { data: permissionsData } = usePermissions();
  return (
    <List
      /* highlight-start */
      canCreate={permissionsData?.includes("admin")}
      /* highlight-end */
      createButtonProps={{ variant: "subtle" }}
    >
      <p>Rest of your page here</p>
    </List>
  );
};
// visible-block-end

const App = () => {
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
    <RefineMantineDemo
      resources={[
        {
          name: "posts",
          list: "/posts",
        },
      ]}
      authProvider={authProvider}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route path="/posts" element={<PostList />} />
      </ReactRouter.Routes>
    </RefineMantineDemo>
  );
};

render(
  <ReactRouter.BrowserRouter>
    <App />
  </ReactRouter.BrowserRouter>,
);
```

### breadcrumb <GlobalConfigBadge id="core/refine-component/#breadcrumb" />

To customize or disable the breadcrumb, you can use the `breadcrumb` property. By default it uses the `Breadcrumb` component from `@refinedev/mantine` package.

```tsx live url=http://localhost:3000/posts previewHeight=280px
setInitialRoutes(["/posts"]);

// visible-block-start
import { List } from "@refinedev/mantine";

const CustomBreadcrumb: React.FC = () => {
  return (
    <p
      style={{
        padding: "3px 6px",
        border: "2px dashed cornflowerblue",
      }}
    >
      My Custom Breadcrumb
    </p>
  );
};

const PostList: React.FC = () => {
  return (
    <List
      /* highlight-start */
      breadcrumb={<CustomBreadcrumb />}
      /* highlight-end */
    >
      <p>Rest of your page here</p>
    </List>
  );
};

// visible-block-end

const App = () => {
  return (
    <RefineMantineDemo
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
    </RefineMantineDemo>
  );
};

render(
  <ReactRouter.BrowserRouter>
    <App />
  </ReactRouter.BrowserRouter>,
);
```

> For more information, refer to the [`Breadcrumb` documentation &#8594](/core/docs/ui-integrations/mantine/components/breadcrumb/)

### wrapperProps

If you want to customize the wrapper of the `<List/>` component, you can use the `wrapperProps` property. For `@refinedev/mantine` wrapper element is `<Card>`s and `wrapperProps` can get every attribute that `<Card>` can get.

```tsx live url=http://localhost:3000/posts previewHeight=280px
setInitialRoutes(["/posts"]);

// visible-block-start
import { List } from "@refinedev/mantine";

const PostList: React.FC = () => {
  return (
    <List
      /* highlight-start */
      wrapperProps={{
        style: {
          border: "2px dashed cornflowerblue",
          padding: "16px",
        },
      }}
      /* highlight-end */
    >
      <p>Rest of your page here</p>
    </List>
  );
};
// visible-block-end

const App = () => {
  return (
    <RefineMantineDemo
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
    </RefineMantineDemo>
  );
};

render(
  <ReactRouter.BrowserRouter>
    <App />
  </ReactRouter.BrowserRouter>,
);
```

> For more information, refer to the [`Card` documentation from Mantine &#8594](https://mantine.dev/core/card/)

### headerProps

If you want to customize the header of the `<List/>` component, you can use the `headerProps` property.

```tsx live url=http://localhost:3000/posts previewHeight=280px
setInitialRoutes(["/posts"]);

// visible-block-start
import { List } from "@refinedev/mantine";

const PostList: React.FC = () => {
  return (
    <List
      /* highlight-start */
      headerProps={{
        style: {
          border: "2px dashed cornflowerblue",
          padding: "16px",
        },
      }}
      /* highlight-end */
    >
      <p>Rest of your page here</p>
    </List>
  );
};
// visible-block-end

const App = () => {
  return (
    <RefineMantineDemo
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
    </RefineMantineDemo>
  );
};

render(
  <ReactRouter.BrowserRouter>
    <App />
  </ReactRouter.BrowserRouter>,
);
```

> For more information, refer to the [`Group` documentation from Mantine &#8594](https://mantine.dev/core/group/)

### contentProps

If you want to customize the content of the `<List/>` component, you can use the `contentProps` property.

```tsx live url=http://localhost:3000/posts previewHeight=280px
setInitialRoutes(["/posts"]);

// visible-block-start
import { List } from "@refinedev/mantine";

const PostList: React.FC = () => {
  return (
    <List
      /* highlight-start */
      contentProps={{
        style: {
          border: "2px dashed cornflowerblue",
          padding: "16px",
        },
      }}
      /* highlight-end */
    >
      <p>Rest of your page here</p>
    </List>
  );
};
// visible-block-end

const App = () => {
  return (
    <RefineMantineDemo
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
    </RefineMantineDemo>
  );
};

render(
  <ReactRouter.BrowserRouter>
    <App />
  </ReactRouter.BrowserRouter>,
);
```

> For more information, refer to the [`Box` documentation from Mantine &#8594](https://mantine.dev/core/box/)

### headerButtons

By default, the `<List/>` component has a [`<CreateButton>`][create-button] at the header.

You can customize the buttons at the header by using the `headerButtons` property. It accepts `React.ReactNode` or a render function `({ defaultButtons, createButtonProps }) => React.ReactNode` which you can use to keep the existing buttons and add your own.

If "create" resource is not defined or [`canCreate`](#cancreate-and-createbuttonprops) is `false`, the [`<CreateButton>`][create-button] will not render and `createButtonProps` will be `undefined`.

```tsx live url=http://localhost:3000/posts previewHeight=280px
setInitialRoutes(["/posts"]);

// visible-block-start
import { List } from "@refinedev/mantine";
import { Button } from "@mantine/core";

const PostList: React.FC = () => {
  return (
    <List
      /* highlight-start */
      headerButtons={({ defaultButtons }) => (
        <>
          {defaultButtons}
          <Button variant="outline" type="primary">
            Custom Button
          </Button>
        </>
      )}
      /* highlight-end */
    >
      <p>Rest of your page here</p>
    </List>
  );
};
// visible-block-end

const App = () => {
  return (
    <RefineMantineDemo
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
    </RefineMantineDemo>
  );
};

render(
  <ReactRouter.BrowserRouter>
    <App />
  </ReactRouter.BrowserRouter>,
);
```

Or, instead of using the `defaultButtons`, you can create your own buttons. If you want, you can use `createButtonProps` to utilize the default values of the [`<CreateButton>`][create-button] component.

```tsx live url=http://localhost:3000/posts previewHeight=280px
setInitialRoutes(["/posts"]);

// visible-block-start
import { List, CreateButton } from "@refinedev/mantine";
import { Button } from "@mantine/core";

const PostList: React.FC = () => {
  return (
    <List
      /* highlight-start */
      headerButtons={({ createButtonProps }) => (
        <>
          {createButtonProps && (
            <CreateButton {...createButtonProps} meta={{ foo: "bar" }} />
          )}
          <Button variant="outline" type="primary">
            Custom Button
          </Button>
        </>
      )}
      /* highlight-end */
    >
      <p>Rest of your page here</p>
    </List>
  );
};
// visible-block-end

const App = () => {
  return (
    <RefineMantineDemo
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
    </RefineMantineDemo>
  );
};

render(
  <ReactRouter.BrowserRouter>
    <App />
  </ReactRouter.BrowserRouter>,
);
```

### headerButtonProps

You can customize the wrapper element of the buttons at the header by using the `headerButtonProps` property.

```tsx live url=http://localhost:3000/posts previewHeight=280px
setInitialRoutes(["/posts"]);

// visible-block-start
import { List } from "@refinedev/mantine";
import { Button } from "@mantine/core";

const PostList: React.FC = () => {
  return (
    <List
      /* highlight-start */
      headerButtonProps={{
        style: {
          border: "2px dashed cornflowerblue",
          padding: "16px",
        },
      }}
      /* highlight-end */
      headerButtons={
        <Button variant="outline" type="primary">
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
    <RefineMantineDemo
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
    </RefineMantineDemo>
  );
};

render(
  <ReactRouter.BrowserRouter>
    <App />
  </ReactRouter.BrowserRouter>,
);
```

> For more information, refer to the [`Group` documentation from Mantine &#8594](https://mantine.dev/core/group/)

## API Reference

### Props

<PropsTable module="@refinedev/mantine/List" title-default="`<Title order={3}>{resource.name}</Title>`" />

[create-button]: /core/docs/ui-integrations/mantine/components/buttons/create-button
