---
id: clone-button
title: Clone
swizzle: true
---

`<CloneButton>` Material UI [`<Button>`](https://mui.com/material-ui/react-button/) component. It uses the `clone` method from [useNavigation](/core/docs/3.xx.xx/api-reference/core/hooks/navigation/useNavigation) under the hood.
It can be useful when redirecting the app to the create page with the record id route of resource.

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
  CloneButton,
} from "@pankod/refine-mui";

const columns: GridColumns = [
  { field: "id", headerName: "ID", type: "number" },
  { field: "title", headerName: "Title", minWidth: 400, flex: 1 },
  {
    field: "actions",
    headerName: "Actions",
    renderCell: function render({ row }) {
      // highlight-next-line
      return <CloneButton size="small" recordItemId={row.id} />;
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
        create: () => (
          <RefineMui.Create>Rest of the page here...</RefineMui.Create>
        ),
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
import { CloneButton } from "@pankod/refine-mui";

const MyCloneComponent = () => {
  return <CloneButton resourceNameOrRouteName="posts" recordItemId="1" />;
};

// visible-block-end

const ClonedPage = () => {
  const params = useRouterContext().useParams();
  return <div>{JSON.stringify(params)}</div>;
};

render(
  <RefineMuiDemo
    initialRoutes={["/"]}
    resources={[
      {
        name: "posts",
        create: ClonedPage,
      },
    ]}
    DashboardPage={MyCloneComponent}
  />,
);
```

Clicking the button will trigger the `clone` method of [`useNavigation`](/core/docs/3.xx.xx/api-reference/core/hooks/navigation/useNavigation) and then redirect the app to `/posts/clone/1`.

:::note
**`<CloneButton>`** component reads the id information from the route by default.
:::

### `resourceNameOrRouteName`

It is used to redirect the app to the `/clone` endpoint of the given resource name. By default, the app redirects to a URL with `/clone` defined by the name property of the resource object.

```tsx live disableScroll previewHeight=120px
const { useRouterContext } = RefineCore;

// visible-block-start
import { CloneButton } from "@pankod/refine-mui";

const MyCloneComponent = () => {
  return <CloneButton resourceNameOrRouteName="categories" recordItemId="2" />;
};

// visible-block-end

const ClonedPage = () => {
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
        create: ClonedPage,
      },
    ]}
    DashboardPage={MyCloneComponent}
  />,
);
```

Clicking the button will trigger the `clone` method of [`useNavigation`](/core/docs/3.xx.xx/api-reference/core/hooks/navigation/useNavigation) and then redirect the app to `/categories/clone/2`.

### `hideText`

It is used to show and not show the text of the button. When `true`, only the button icon is visible.

```tsx live disableScroll previewHeight=120px
const { useRouterContext } = RefineCore;

// visible-block-start
import { CloneButton } from "@pankod/refine-mui";

const MyCloneComponent = () => {
  return (
    <CloneButton
      // highlight-next-line
      hideText={true}
    />
  );
};

// visible-block-end

const ClonedPage = () => {
  const params = useRouterContext().useParams();
  return <div>{JSON.stringify(params)}</div>;
};

render(
  <RefineMuiDemo
    initialRoutes={["/"]}
    resources={[
      {
        name: "posts",
        list: MyCloneComponent,
        create: ClonedPage,
      },
    ]}
  />,
);
```

### `accessControl`

This prop can be used to skip access control check with its `enabled` property or to hide the button when the user does not have the permission to access the resource with `hideIfUnauthorized` property. This is relevant only when an [`accessControlProvider`](/core/docs/3.xx.xx/api-reference/core/providers/accessControl-provider) is provided to [`<Refine/>`](/core/docs/3.xx.xx/api-reference/core/components/refine-config)

```tsx
import { CloneButton } from "@pankod/refine-mui";

export const MyCloneComponent = () => {
  return (
    <CloneButton accessControl={{ enabled: true, hideIfUnauthorized: true }} />
  );
};
```

## API Reference

<PropsTable module="@pankod/refine-mui/CloneButton" />

:::tip External Props
It also accepts all props of Material UI [Button](https://mui.com/material-ui/react-button/).
:::
