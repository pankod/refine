---
id: create-button
title: Create
swizzle: true
---

`<CreateButton>` uses Material UI [`<Button>`](https://mui.com/material-ui/react-button/) component. It uses the `create` method from [`useNavigation`](/core/docs/3.xx.xx/api-reference/core/hooks/navigation/useNavigation) under the hood. It can be useful to redirect the app to the create page route of resource.

:::info-tip Swizzle
You can swizzle this component to customize it with the [**refine CLI**](/core/docs/3.xx.xx/packages/documentation/cli)
:::

## Usage

```tsx live url=http://localhost:3000/posts previewHeight=340px
const { Create } = RefineMui;
// visible-block-start
import {
  useDataGrid,
  DataGrid,
  GridColumns,
  List,
  // highlight-next-line
  CreateButton,
} from "@pankod/refine-mui";

const columns: GridColumns = [
  { field: "id", headerName: "ID", type: "number" },
  { field: "title", headerName: "Title", minWidth: 400, flex: 1 },
];

const PostsList: React.FC = () => {
  const { dataGridProps } = useDataGrid<IPost>();

  return (
    // highlight-next-line
    <List headerButtons={<CreateButton />}>
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
        create: () => <Create>Rest of the page here...</Create>,
      },
    ]}
  />,
);
```

## Properties

### `resourceNameOrRouteName`

It is used to redirect the app to the `/create` endpoint of the given resource name. By default, the app redirects to a URL with `/create` defined by the name property of resource object.

```tsx live disableScroll previewHeight=120px
const { useRouterContext } = RefineCore;

// visible-block-start
import { CreateButton } from "@pankod/refine-mui";

const MyCreateComponent = () => {
  return (
    <CreateButton
      // highlight-next-line
      resourceNameOrRouteName="categories"
    />
  );
};

// visible-block-end

const CreatePage = () => {
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
        create: CreatePage,
      },
    ]}
    DashboardPage={MyCreateComponent}
  />,
);
```

Clicking the button will trigger the `create` method of [`useNavigation`](/core/docs/3.xx.xx/api-reference/core/hooks/navigation/useNavigation) and then redirect to `/posts/create`.

### `hideText`

It is used to show and not show the text of the button. When `true`, only the button icon is visible.

```tsx live disableScroll previewHeight=120px
const { useRouterContext } = RefineCore;

// visible-block-start
import { CreateButton } from "@pankod/refine-mui";

const MyCreateComponent = () => {
  return (
    <CreateButton
      // highlight-next-line
      hideText={true}
    />
  );
};

// visible-block-end

const CreatePage = () => {
  const params = useRouterContext().useParams();
  return <div>{JSON.stringify(params)}</div>;
};

render(
  <RefineMuiDemo
    initialRoutes={["/"]}
    resources={[
      {
        name: "posts",
        list: MyCreateComponent,
        create: CreatePage,
      },
    ]}
  />,
);
```

### `accessControl`

This prop can be used to skip access control check with its `enabled` property or to hide the button when the user does not have the permission to access the resource with `hideIfUnauthorized` property. This is relevant only when an [`accessControlProvider`](/core/docs/3.xx.xx/api-reference/core/providers/accessControl-provider) is provided to [`<Refine/>`](/core/docs/3.xx.xx/api-reference/core/components/refine-config)

```tsx
import { CreateButton } from "@pankod/refine-mui";

export const MyListComponent = () => {
  return (
    <CreateButton accessControl={{ enabled: true, hideIfUnauthorized: true }} />
  );
};
```

## API Reference

### Properties

<PropsTable module="@pankod/refine-mui/CreateButton" />

:::tip External Props
It also accepts all props of Material UI [Button](https://mui.com/material-ui/react-button/).
:::
