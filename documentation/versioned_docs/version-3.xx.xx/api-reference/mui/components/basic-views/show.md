---
id: show
title: Show
swizzle: true
---

`<Show>` provides us a layout for displaying the page. It does not contain any logic but adds extra functionalities like a refresh button or giving title to the page.

We will show what `<Show>` does using properties with examples.

```tsx live hideCode url=http://localhost:3000/posts/show/123
// visible-block-start
import React from "react";
import { useShow, useOne } from "@pankod/refine-core";
import {
  Show,
  Stack,
  Typography,
  NumberField,
  TextFieldComponent as TextField,
  MarkdownField,
  DateField,
} from "@pankod/refine-mui";

const SampleShow = () => {
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  const { data: categoryData, isLoading: categoryIsLoading } = useOne({
    resource: "categories",
    id: record?.category?.id || "",
    queryOptions: {
      enabled: !!record,
    },
  });

  return (
    <Show isLoading={isLoading}>
      <Stack gap={1}>
        <Typography variant="body1" fontWeight="bold">
          Id
        </Typography>
        <NumberField value={record?.id ?? ""} />
        <Typography variant="body1" fontWeight="bold">
          Title
        </Typography>
        <TextField value={record?.title} />
        <Typography variant="body1" fontWeight="bold">
          Content
        </Typography>
        <MarkdownField value={record?.content} />
        <Typography variant="body1" fontWeight="bold">
          Category
        </Typography>
        {categoryIsLoading ? <>Loading...</> : <>{categoryData?.data?.title}</>}
        <Typography variant="body1" fontWeight="bold">
          Created At
        </Typography>
        <DateField value={record?.createdAt} />
      </Stack>
    </Show>
  );
};
// visible-block-end

render(
  <RefineMuiDemo
    initialRoutes={["/samples/show/123"]}
    resources={[{ name: "samples", show: SampleShow, list: SampleList }]}
  />,
);
```

:::info-tip Swizzle
You can swizzle this component to customize it with the [**refine CLI**](/core/docs/3.xx.xx/packages/documentation/cli)
:::

## Properties

### `title`

It allows adding title inside the `<Show>` component. if you don't pass title props it uses the "Show" prefix and the singular resource name by default. For example, for the "posts" resource, it will be "Show post".

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/create
// visible-block-start
import { Show, Typography } from "@pankod/refine-mui";

const ShowPage: React.FC = () => {
  return (
    <Show
      // highlight-next-line
      title={<Typography variant="h5">Custom Title</Typography>}
    >
      <span>Rest of your page here</span>
    </Show>
  );
};
// visible-block-end

render(
  <RefineMuiDemo
    initialRoutes={["/posts/show/123"]}
    resources={[
      {
        name: "posts",
        list: () => (
          <div>
            <p>This page is empty.</p>
            <RefineMui.ShowButton recordItemId="123" />
          </div>
        ),
        show: ShowPage,
      },
    ]}
  />,
);
```

### `resource`

The `<Show>` component reads the `resource` information from the route by default. This default behavior will not work on custom pages. If you want to use the `<Show>` component in a custom page, you can use the `resource` property.

[Refer to the custom pages documentation for detailed usage. &#8594](/core/docs/3.xx.xx/advanced-tutorials/custom-pages)

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/custom
// handle initial routes in new way
setInitialRoutes(["/custom"]);

// visible-block-start
import { Refine } from "@pankod/refine-core";
import { Show, Layout } from "@pankod/refine-mui";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

const CustomPage: React.FC = () => {
  return (
    /* highlight-next-line */
    <Show resource="posts" recordItemId={123}>
      <span>Rest of your page here</span>
    </Show>
  );
};

const App: React.FC = () => {
  return (
    <Refine
      routerProvider={{
        ...routerProvider,
        // highlight-start
        routes: [
          {
            element: <CustomPage />,
            path: "/custom",
          },
        ],
        // highlight-end
      }}
      Layout={Layout}
      dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
      resources={[{ name: "posts" }]}
    />
  );
};
// visible-block-end

render(
  <Wrapper>
    <App />
  </Wrapper>,
);
```

### `canDelete` and `canEdit`

`canDelete` and `canEdit` allows us to add the delete and edit buttons inside the `<Show>` component. If the resource has `canDelete` or `canEdit` property refine adds the buttons by default.

When clicked on, delete button executes the [`useDelete`](/core/docs/3.xx.xx/api-reference/core/hooks/data/useDelete/) method provided by the [`dataProvider`](/core/docs/3.xx.xx/api-reference/core/providers/data-provider) and the edit button redirects the user to the record edit page.

Refer to the [`<DeleteButton>`](/core/docs/3.xx.xx/api-reference/mui/components/buttons/delete) and the [`<EditButton>`](/core/docs/3.xx.xx/api-reference/mui/components/buttons/edit) documentation for detailed usage.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/show/123
const { default: simpleRest } = RefineSimpleRest;

const dataProvider = simpleRest("https://api.fake-rest.refine.dev");

const customDataProvider = {
  ...dataProvider,
  deleteOne: async ({ resource, id, variables }) => {
    return {
      data: {},
    };
  },
};

const authProvider = {
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  checkAuth: () => Promise.resolve(),
  checkError: () => Promise.resolve(),
  getPermissions: () => Promise.resolve("admin"),
  getUserIdentity: () => Promise.resolve(),
};

// visible-block-start
import { Show } from "@pankod/refine-mui";
import { usePermissions } from "@pankod/refine-core";

const PostShow: React.FC = () => {
  const { data: permissionsData } = usePermissions();
  return (
    <Show
      /* highlight-start */
      canDelete={permissionsData?.includes("admin")}
      canEdit={
        permissionsData?.includes("editor") ||
        permissionsData?.includes("admin")
      }
      /* highlight-end */
    >
      <p>Rest of your page here</p>
    </Show>
  );
};
// visible-block-end

render(
  <RefineMuiDemo
    authProvider={authProvider}
    dataProvider={customDataProvider}
    initialRoutes={["/posts/show/123"]}
    Layout={RefineMui.Layout}
    resources={[
      {
        name: "posts",
        list: () => (
          <div>
            <p>This page is empty.</p>
            <RefineMui.ShowButton recordItemId="123" />
          </div>
        ),
        show: PostShow,
      },
    ]}
  />,
);
```

[Refer to the `usePermission` documentation for detailed usage. &#8594](/core/docs/3.xx.xx/api-reference/core/hooks/auth/usePermissions)

### `recordItemId`

`<Show>` component reads the `id` information from the route by default. `recordItemId` is used when it cannot read from the URL (when used on a custom page, modal or drawer).

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/custom
// handle initial routes in new way
setInitialRoutes(["/custom"]);

// visible-block-start
import { Refine } from "@pankod/refine-core";
import { List, Layout } from "@pankod/refine-mui";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

const CustomPage: React.FC = () => {
  return (
    /* highlight-next-line */
    <List resource="posts" recordItemId={123}>
      <span>Rest of your page here</span>
    </List>
  );
};

const App: React.FC = () => {
  return (
    <Refine
      routerProvider={{
        ...routerProvider,
        routes: [
          {
            element: <CustomPage />,
            path: "/custom",
          },
        ],
      }}
      Layout={Layout}
      dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
      resources={[{ name: "posts" }]}
    />
  );
};
// visible-block-end

render(
  <Wrapper>
    <App />
  </Wrapper>,
);
```

:::note
`<Show>` component needs the `id` information for [`<RefreshButton>`](/core/docs/3.xx.xx/api-reference/mui/components/buttons/refresh) to work properly.
:::

:::caution
The `<Show>` component needs the `id` information for work properly, so if you use the `<Show>` component in custom pages, you should pass the `recordItemId` property.
:::

### `dataProviderName`

If not specified, Refine will use the default data provider. If you have multiple data providers and want to use a different one, you can use the `dataProviderName` property.

```tsx
import { Refine } from "@pankod/refine-core";
import { Show } from "@pankod/refine-mui";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

// highlight-start
const PostShow = () => {
  return <Show dataProviderName="other">...</Show>;
};
// highlight-end

export const App: React.FC = () => {
  return (
    <Refine
      routerProvider={routerProvider}
      // highlight-start
      dataProvider={{
        default: dataProvider("https://api.fake-rest.refine.dev/"),
        other: dataProvider("https://other-api.fake-rest.refine.dev/"),
      }}
      // highlight-end
      resources={[{ name: "posts", show: PostShow }]}
    />
  );
};
```

### `goBack`

To customize the back button or to disable it, you can use the `goBack` property.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/show/123
// visible-block-start
import { Show, Button } from "@pankod/refine-mui";
import { useNavigation } from "@pankod/refine-core";

const BackButton = () => {
  const { goBack } = useNavigation();

  return <Button onClick={() => goBack()}>BACK!</Button>;
};

const PostShow: React.FC = () => {
  return (
    <Show
      // highlight-next-line
      goBack={<BackButton />}
    >
      <span>Rest of your page here</span>
    </Show>
  );
};
// visible-block-end

render(
  <RefineMuiDemo
    initialRoutes={["/posts", "/posts/show/123"]}
    resources={[
      {
        name: "posts",
        list: () => (
          <div>
            <p>This page is empty.</p>
            <RefineMui.ShowButton recordItemId={123} />
          </div>
        ),
        show: PostShow,
      },
    ]}
  />,
);
```

### `isLoading`

To toggle the loading state of the `<Show/>` component, you can use the `isLoading` property.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/show/123
// visible-block-start
import { Show } from "@pankod/refine-mui";

const PostShow: React.FC = () => {
  const [loading, setLoading] = React.useState(true);

  return (
    <Show
      // highlight-next-line
      isLoading={loading}
    >
      <span>Rest of your page here</span>
    </Show>
  );
};
// visible-block-end

render(
  <RefineMuiDemo
    initialRoutes={["/posts", "/posts/show/123"]}
    resources={[
      {
        name: "posts",
        list: () => (
          <div>
            <p>This page is empty.</p>
            <RefineMui.ShowButton recordItemId={123} />
          </div>
        ),
        show: PostShow,
      },
    ]}
  />,
);
```

### `breadcrumb`

To customize or disable the breadcrumb, you can use the `breadcrumb` property. By default it uses the `Breadcrumb` component from `@pankod/refine-mui` package.

[Refer to the `Breadcrumb` documentation for detailed usage. &#8594](/core/docs/3.xx.xx/api-reference/mui/components/breadcrumb)

:::tip
This feature can be managed globally via the `<Refine>` component's [options](/core/docs/3.xx.xx/api-reference/core/components/refine-config/#breadcrumb)
:::

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/show/123
// visible-block-start
import { Show, Breadcrumb } from "@pankod/refine-mui";

const PostShow: React.FC = () => {
  return (
    <Show
      // highlight-start
      breadcrumb={
        <div
          style={{
            padding: "3px 6px",
            border: "2px dashed cornflowerblue",
          }}
        >
          <Breadcrumb />
        </div>
      }
      // highlight-end
    >
      <span>Rest of your page here</span>
    </Show>
  );
};
// visible-block-end

render(
  <RefineMuiDemo
    initialRoutes={["/posts", "/posts/show/123"]}
    resources={[
      {
        name: "posts",
        list: () => (
          <div>
            <p>This page is empty.</p>
            <RefineMui.ShowButton recordItemId={123} />
          </div>
        ),
        show: PostShow,
      },
    ]}
  />,
);
```

### `wrapperProps`

If you want to customize the wrapper of the `<Show/>` component, you can use the `wrapperProps` property.

[Refer to the `Card` documentation from Material UI for detailed usage. &#8594](https://mui.com/material-ui/api/card/)

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/show/123
// visible-block-start
import { Show } from "@pankod/refine-mui";

const PostShow: React.FC = () => {
  const [loading, setLoading] = React.useState(true);

  return (
    <Show
      // highlight-start
      wrapperProps={{
        sx: {
          backgroundColor: "lightsteelblue",
        },
      }}
      // highlight-end
    >
      <span>Rest of your page here</span>
    </Show>
  );
};
// visible-block-end

render(
  <RefineMuiDemo
    initialRoutes={["/posts", "/posts/show/123"]}
    resources={[
      {
        name: "posts",
        list: () => (
          <div>
            <p>This page is empty.</p>
            <RefineMui.ShowButton recordItemId={123} />
          </div>
        ),
        show: PostShow,
      },
    ]}
  />,
);
```

### `headerProps`

If you want to customize the header of the `<Show/>` component, you can use the `headerProps` property.

[Refer to the `CardHeader` documentation from Material UI for detailed usage. &#8594](https://mui.com/material-ui/api/card-header/)

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/show/123
// visible-block-start
import { Show } from "@pankod/refine-mui";

const PostShow: React.FC = () => {
  const [loading, setLoading] = React.useState(true);

  return (
    <Show
      // highlight-start
      headerProps={{
        sx: {
          backgroundColor: "lightsteelblue",
        },
      }}
      // highlight-end
    >
      <span>Rest of your page here</span>
    </Show>
  );
};
// visible-block-end

render(
  <RefineMuiDemo
    initialRoutes={["/posts", "/posts/show/123"]}
    resources={[
      {
        name: "posts",
        list: () => (
          <div>
            <p>This page is empty.</p>
            <RefineMui.ShowButton recordItemId={123} />
          </div>
        ),
        show: PostShow,
      },
    ]}
  />,
);
```

### `contentProps`

If you want to customize the content of the `<Show/>` component, you can use the `contentProps` property.

[Refer to the `CardContent` documentation from Material UI for detailed usage. &#8594](https://mui.com/material-ui/api/card-content/)

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/show/123
// visible-block-start
import { Show } from "@pankod/refine-mui";

const PostShow: React.FC = () => {
  const [loading, setLoading] = React.useState(true);

  return (
    <Show
      // highlight-start
      contentProps={{
        sx: {
          backgroundColor: "lightsteelblue",
        },
      }}
      // highlight-end
    >
      <span>Rest of your page here</span>
    </Show>
  );
};
// visible-block-end

render(
  <RefineMuiDemo
    initialRoutes={["/posts", "/posts/show/123"]}
    resources={[
      {
        name: "posts",
        list: () => (
          <div>
            <p>This page is empty.</p>
            <RefineMui.ShowButton recordItemId={123} />
          </div>
        ),
        show: PostShow,
      },
    ]}
  />,
);
```

### `headerButtons`

You can customize the buttons at the header by using the `headerButtons` property. It accepts `React.ReactNode` or a render function `({ defaultButtons }) => React.ReactNode` which you can use to keep the existing buttons and add your own.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/show/123
// visible-block-start
import { Show, Button } from "@pankod/refine-mui";

const PostShow: React.FC = () => {
  const [loading, setLoading] = React.useState(true);

  return (
    <Show
      // highlight-start
      headerButtons={({ defaultButtons }) => (
        <>
          {defaultButtons}
          <Button type="primary">Custom Button</Button>
        </>
      )}
      // highlight-end
    >
      <span>Rest of your page here</span>
    </Show>
  );
};
// visible-block-end

render(
  <RefineMuiDemo
    initialRoutes={["/posts", "/posts/show/123"]}
    resources={[
      {
        name: "posts",
        list: () => (
          <div>
            <p>This page is empty.</p>
            <RefineMui.ShowButton recordItemId={123} />
          </div>
        ),
        show: PostShow,
      },
    ]}
  />,
);
```

### `headerButtonProps`

You can customize the wrapper element of the buttons at the header by using the `headerButtonProps` property.

[Refer to the `Box` documentation from Material UI for detailed usage. &#8594](https://mui.com/material-ui/api/box/)

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/show/123
// visible-block-start
import { Show, Button } from "@pankod/refine-mui";

const PostShow: React.FC = () => {
  const [loading, setLoading] = React.useState(true);

  return (
    <Show
      // highlight-start
      headerButtonProps={{
        sx: {
          backgroundColor: "lightsteelblue",
        },
      }}
      // highlight-end
      headerButtons={({ defaultButtons }) => (
        <>
          {defaultButtons}
          <Button type="primary">Custom Button</Button>
        </>
      )}
    >
      <span>Rest of your page here</span>
    </Show>
  );
};
// visible-block-end

render(
  <RefineMuiDemo
    initialRoutes={["/posts", "/posts/show/123"]}
    resources={[
      {
        name: "posts",
        list: () => (
          <div>
            <p>This page is empty.</p>
            <RefineMui.ShowButton recordItemId={123} />
          </div>
        ),
        show: PostShow,
      },
    ]}
  />,
);
```

### `footerButtons`

You can customize the buttons at the footer by using the `footerButtons` property. It accepts `React.ReactNode` or a render function `({ defaultButtons }) => React.ReactNode` which you can use to keep the existing buttons and add your own.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/show/123
// visible-block-start
import { Show, Button } from "@pankod/refine-mui";

const PostShow: React.FC = () => {
  const [loading, setLoading] = React.useState(true);

  return (
    <Show
      // highlight-start
      footerButtons={({ defaultButtons }) => (
        <>
          {defaultButtons}
          <Button type="primary">Custom Button</Button>
        </>
      )}
      // highlight-end
    >
      <span>Rest of your page here</span>
    </Show>
  );
};
// visible-block-end

render(
  <RefineMuiDemo
    initialRoutes={["/posts", "/posts/show/123"]}
    resources={[
      {
        name: "posts",
        list: () => (
          <div>
            <p>This page is empty.</p>
            <RefineMui.ShowButton recordItemId={123} />
          </div>
        ),
        show: PostShow,
      },
    ]}
  />,
);
```

### `footerButtonProps`

You can customize the wrapper element of the buttons at the footer by using the `footerButtonProps` property.

[Refer to the `CardActions` documentation from Material UI for detailed usage. &#8594](https://mui.com/material-ui/api/card-actions/)

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/show/123
// visible-block-start
import { Show, Button } from "@pankod/refine-mui";

const PostShow: React.FC = () => {
  const [loading, setLoading] = React.useState(true);

  return (
    <Show
      // highlight-start
      footerButtonProps={{
        sx: {
          backgroundColor: "lightsteelblue",
        },
      }}
      // highlight-end
      footerButtons={({ defaultButtons }) => (
        <>
          {defaultButtons}
          <Button type="primary">Custom Button</Button>
        </>
      )}
    >
      <span>Rest of your page here</span>
    </Show>
  );
};
// visible-block-end

render(
  <RefineMuiDemo
    initialRoutes={["/posts", "/posts/show/123"]}
    resources={[
      {
        name: "posts",
        list: () => (
          <div>
            <p>This page is empty.</p>
            <RefineMui.ShowButton recordItemId={123} />
          </div>
        ),
        show: PostShow,
      },
    ]}
  />,
);
```

### ~~`actionButtons`~~

:::caution Deprecated
Use `headerButtons` or `footerButtons` instead.
:::

`<Show>` uses the Material UI [`<CardActions>`](https://mui.com/material-ui/api/card-actions/#main-content) component. By default,The children of the [`<CardActions>`](https://mui.com/material-ui/api/card-actions/#main-content) component shows nothing in the `<Show>` component.

```tsx title="src/pages/posts/show.tsx"
// highlight-next-line
import { Show, Button } from "@pankod/refine-mui";

export const ShowPage: React.FC = () => {
  return (
    <Show
      // highlight-start
      actionButtons={
        <>
          <Button type="primary">Custom Button 1</Button>
          <Button type="default">Custom Button 2</Button>
        </>
      }
      // highlight-end
    >
      ...
    </Show>
  );
};
```

### ~~`cardProps`~~

:::caution Deprecated
Use `wrapperProps` instead.
:::

`<Show>` uses the Material UI [`<Card>`](https://mui.com/material-ui/react-card/#main-content) components so you can customize with the props of `cardProps`.

### ~~`cardHeaderProps`~~

:::caution Deprecated
Use `headerProps` instead.
:::

`<Show>` uses the Material UI [`<CardHeader>`](https://mui.com/material-ui/api/card-header/) components so you can customize with the props of `cardHeaderProps`.

```tsx title="src/pages/posts/show.tsx"
import { useShow } from "@pankod/refine-core";
// highlight-next-line
import { Show, Typography, Stack } from "@pankod/refine-mui";

export const ShowPage: React.FC = () => {
  const { queryResult } = useShow<IPost>();
  const { data, isLoading } = queryResult;
  const record = data?.data;

  return (
    <Show
      isLoading={isLoading}
      // highlight-start
      cardHeaderProps={{
        title: <Typography variant="h5">Custom Title</Typography>,
      }}
      // highlight-end
    >
      <Stack gap="10px">
        <Typography fontWeight="bold">Id</Typography>
        <Typography>{record?.id}</Typography>
        <Typography fontWeight="bold">Title</Typography>
        <Typography>{record?.title}</Typography>
      </Stack>
    </Show>
  );
};

interface IPost {
  id: number;
  title: string;
}
```

### ~~`cardContentProps`~~

:::caution Deprecated
Use `contentProps` instead.
:::

`<Show>` uses the Material UI [`<CardContent>`](https://mui.com/material-ui/api/card-content/) components so you can customize with the props of `cardContentProps`.

### ~~`cardActionsProps`~~

:::caution Deprecated
Use `headerButtonProps` and `footerButtonProps` instead.
:::

`<Show>` uses the Material UI [`<CardActions>`](https://mui.com/material-ui/api/card-actions/) components so you can customize with the props of `cardActionsProps`.

## API Reference

### Properties

<PropsTable module="@pankod/refine-mui/Show"
wrapperProps-type="[`CardProps`](https://mui.com/material-ui/api/card/#props)"
contentProps-type="[`CardContentProps`](https://mui.com/material-ui/api/card-content/#props)"
headerProps-type="[`CardHeaderProps`](https://mui.com/material-ui/api/card-header/#props)"
headerButtonProps-type="[`BoxProps`](https://mui.com/material-ui/api/box/#props)"
headerButtons-default="[`ListButton`](https://refine.dev/core/docs/api-reference/mui/components/buttons/list-button/), [`EditButton`](https://refine.dev/core/docs/api-reference/mui/components/buttons/edit-button/), [`DeleteButton`](https://refine.dev/core/docs/api-reference/mui/components/buttons/delete-button/), [`RefreshButton`](https://refine.dev/core/docs/api-reference/mui/components/buttons/refresh-button/)"
footerButtonProps-type="[`CardActionsProps`](https://mui.com/material-ui/api/card-actions/#props)"
breadcrumb-default="[`<Breadcrumb/>`](/core/docs/3.xx.xx/api-reference/mui/components/mui-breadcrumb/)"
goBack-default="`<ArrowLeft />`"
goBack-type="`ReactNode`"
/>

```tsx live shared
const SampleList = () => {
  const { dataGridProps } = RefineMui.useDataGrid();

  const { data: categoryData, isLoading: categoryIsLoading } =
    RefineCore.useMany({
      resource: "categories",
      ids: dataGridProps?.rows?.map((item: any) => item?.category?.id) ?? [],
      queryOptions: {
        enabled: !!dataGridProps?.rows,
      },
    });

  const columns = React.useMemo<GridColumns<any>>(
    () => [
      {
        field: "id",
        headerName: "Id",
        type: "number",
        minWidth: 50,
      },
      {
        field: "title",
        headerName: "Title",
        minWidth: 200,
      },
      {
        field: "category",
        headerName: "Category",
        valueGetter: ({ row }) => {
          const value = row?.category?.id;

          return value;
        },
        minWidth: 300,
        renderCell: function render({ value }) {
          return categoryIsLoading ? (
            <>Loading...</>
          ) : (
            categoryData?.data?.find((item) => item.id === value)?.title
          );
        },
      },
      {
        field: "createdAt",
        headerName: "Created At",
        minWidth: 250,
        renderCell: function render({ value }) {
          return <RefineMui.DateField value={value} />;
        },
      },
      {
        field: "actions",
        headerName: "Actions",
        renderCell: function render({ row }) {
          return (
            <>
              <RefineMui.ShowButton hideText recordItemId={row.id} />
            </>
          );
        },
        align: "center",
        headerAlign: "center",
        minWidth: 80,
      },
    ],
    [categoryData?.data],
  );

  return (
    <RefineMui.List>
      <RefineMui.DataGrid {...dataGridProps} columns={columns} autoHeight />
    </RefineMui.List>
  );
};

const Wrapper = ({ children }) => {
  return (
    <RefineMui.ThemeProvider theme={RefineMui.LightTheme}>
      <RefineMui.CssBaseline />
      <RefineMui.GlobalStyles
        styles={{ html: { WebkitFontSmoothing: "auto" } }}
      />
      {children}
    </RefineMui.ThemeProvider>
  );
};
```
