---
id: show-button
title: Show
swizzle: true
---

`<ShowButton>` uses Material UI [`<Button>`](https://ant.design/components/button/) component. It uses the `show` method from [`useNavigation`](/core/docs/3.xx.xx/api-reference/core/hooks/navigation/useNavigation) under the hood. It can be useful when redirecting the app to the show page with the record id route of resource.

:::info-tip Swizzle
You can swizzle this component to customize it with the [**refine CLI**](/core/docs/3.xx.xx/packages/documentation/cli)
:::

## Usage

```tsx live url=http://localhost:3000/posts previewHeight=340px
// visible-block-start
import {
  useDataGrid,
  DataGrid,
  GridColumns,
  List,
  // highlight-next-line
  ShowButton,
} from "@pankod/refine-mui";

const columns: GridColumns = [
  { field: "id", headerName: "ID", type: "number" },
  { field: "title", headerName: "Title", minWidth: 400, flex: 1 },
  {
    field: "actions",
    headerName: "Actions",
    renderCell: function render({ row }) {
      // highlight-next-line
      return <ShowButton size="small" recordItemId={row.id} />;
    },
    align: "center",
    headerAlign: "center",
    minWidth: 80,
  },
];

const PostsList: React.FC = () => {
  const { dataGridProps } = useDataGrid<IPost>();

  return (
    <List>
      <DataGrid {...dataGridProps} columns={columns} autoHeight />
    </List>
  );
};

interface IPost {
  id: number;
  title: string;
}
// visible-block-end

render(
  <RefineMuiDemo
    resources={[
      {
        name: "posts",
        list: PostsList,
        show: () => <RefineMui.Show>Rest of the page here...</RefineMui.Show>,
      },
    ]}
  />,
);
```

## Properties

### `recordItemId`

`recordItemId` is used to append the record id to the end of the route path.

```tsx live disableScroll previewHeight=120px
const { useRouterContext } = RefineCore;
// visible-block-start
import { ShowButton } from "@pankod/refine-mui";

const MyShowComponent = () => {
  return (
    <ShowButton
      resourceNameOrRouteName="posts"
      // highlight-next-line
      recordItemId="1"
    />
  );
};

// visible-block-end

const ShowPage = () => {
  const params = useRouterContext().useParams();
  return <div>{JSON.stringify(params)}</div>;
};

render(
  <RefineMuiDemo
    initialRoutes={["/"]}
    resources={[
      {
        name: "posts",
        show: ShowPage,
      },
    ]}
    DashboardPage={MyShowComponent}
  />,
);
```

Clicking the button will trigger the `show` method of [`useNavigation`](/core/docs/3.xx.xx/api-reference/core/hooks/navigation/useNavigation) and then redirect the app to `/posts/show/1`.

:::note
`<ShowButton>` component reads the id information from the route by default.
:::

### `resourceNameOrRouteName`

Redirection endpoint(`resourceNameOrRouteName/show`) is defined by `resourceNameOrRouteName` property. By default, `<ShowButton>` uses `name` property of the resource object as an endpoint to redirect after clicking.

```tsx live disableScroll previewHeight=120px
const { useRouterContext } = RefineCore;

// visible-block-start
import { ShowButton } from "@pankod/refine-mui";

const MyShowComponent = () => {
  return (
    <ShowButton
      // highlight-next-line
      resourceNameOrRouteName="categories"
      recordItemId="2"
    />
  );
};

// visible-block-end

const ShowPage = () => {
  const params = useRouterContext().useParams();
  return <div>{JSON.stringify(params)}</div>;
};

render(
  <RefineMuiDemo
    initialRoutes={["/"]}
    resources={[
      {
        name: "posts",
      },
      {
        name: "categories",
        show: ShowPage,
      },
    ]}
    DashboardPage={MyShowComponent}
  />,
);
```

Clicking the button will trigger the `show` method of [`useNavigation`](/core/docs/3.xx.xx/api-reference/core/hooks/navigation/useNavigation) and then redirect the app to `/categories/show/2`.

### `hideText`

It is used to show and not show the text of the button. When `true`, only the button icon is visible.

```tsx live disableScroll previewHeight=120px
const { useRouterContext } = RefineCore;

// visible-block-start
import { ShowButton } from "@pankod/refine-mui";

const MyShowComponent = () => {
  return (
    <ShowButton
      // highlight-next-line
      hideText={true}
    />
  );
};

// visible-block-end

const ShowPage = () => {
  const params = useRouterContext().useParams();
  return <div>{JSON.stringify(params)}</div>;
};

render(
  <RefineMuiDemo
    initialRoutes={["/"]}
    resources={[
      {
        name: "posts",
        list: MyShowComponent,
        show: ShowPage,
      },
    ]}
  />,
);
```

### `accessControl`

This prop can be used to skip access control check with its `enabled` property or to hide the button when the user does not have the permission to access the resource with `hideIfUnauthorized` property. This is relevant only when an [`accessControlProvider`](/core/docs/3.xx.xx/api-reference/core/providers/accessControl-provider) is provided to [`<Refine/>`](/core/docs/3.xx.xx/api-reference/core/components/refine-config)

```tsx
import { ShowButton } from "@pankod/refine-mui";

export const MyListComponent = () => {
  return (
    <ShowButton accessControl={{ enabled: true, hideIfUnauthorized: true }} />
  );
};
```

## API Reference

### Properties

<PropsTable module="@pankod/refine-mui/ShowButton" />

:::tip External Props
It also accepts all props of Material UI [Button](https://mui.com/material-ui/api/button/).
:::
