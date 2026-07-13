---
id: delete-button
title: Delete
swizzle: true
---

`<DeleteButton>` uses Material UI [`<LoadingButton>`](https://mui.com/material-ui/api/loading-button/#main-content) and [`<Dialog>`](https://mui.com/material-ui/react-dialog/) components.
When you try to delete something, a pop-up shows up and asks for confirmation. When confirmed it executes the [`useDelete`](/core/docs/3.xx.xx/api-reference/core/hooks/data/useDelete/) method provided by your [`dataProvider`](/core/docs/3.xx.xx/api-reference/core/providers/data-provider).

:::info-tip Swizzle
You can swizzle this component to customize it with the [**refine CLI**](/core/docs/3.xx.xx/packages/documentation/cli)
:::

## Usage

```tsx live url=http://localhost:3000/posts previewHeight=340px
const { Create } = RefineMui;
import dataProvider from "@pankod/refine-simple-rest";
// visible-block-start
import {
  useDataGrid,
  DataGrid,
  GridColumns,
  List,
  // highlight-next-line
  DeleteButton,
} from "@pankod/refine-mui";

const columns: GridColumns = [
  { field: "id", headerName: "ID", type: "number" },
  { field: "title", headerName: "Title", minWidth: 400, flex: 1 },
  {
    field: "actions",
    headerName: "Actions",
    renderCell: function render({ row }) {
      // highlight-next-line
      return <DeleteButton size="small" recordItemId={row.id} />;
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

const simpleRestDataProvider = dataProvider("https://api.fake-rest.refine.dev");

const customDataProvider = {
  ...simpleRestDataProvider,
  deleteOne: async ({ resource, id, variables }) => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    return {
      message: "You have successfully deleted the record",
    };
  },
};

render(
  <RefineMuiDemo
    dataProvider={customDataProvider}
    resources={[
      {
        name: "posts",
        list: PostsList,
      },
    ]}
  />,
);
```

## Properties

### `recordItemId`

`recordItemId` allows us to manage which record will be deleted.

```tsx live disableScroll previewHeight=200px
const { useRouterContext } = RefineCore;

import dataProvider from "@pankod/refine-simple-rest";

// visible-block-start
import { DeleteButton } from "@pankod/refine-mui";

const MyDeleteComponent = () => {
  return <DeleteButton resourceNameOrRouteName="posts" recordItemId="1" />;
};

// visible-block-end

const simpleRestDataProvider = dataProvider("https://api.fake-rest.refine.dev");

const customDataProvider = {
  ...simpleRestDataProvider,
  deleteOne: async ({ resource, id, variables }) => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    return {
      message: "You have successfully deleted the record",
    };
  },
};

render(
  <RefineMuiDemo
    initialRoutes={["/"]}
    dataProvider={customDataProvider}
    resources={[
      {
        name: "posts",
      },
    ]}
    DashboardPage={MyDeleteComponent}
  />,
);
```

Clicking the button will trigger the [`useDelete`](/core/docs/3.xx.xx/api-reference/core/hooks/data/useDelete/) method and then the record whose resource is `post` and whose id is `1` gets deleted.

:::note
**`<DeleteButton>`** component reads the id information from the route by default.
:::

### `resourceNameOrRouteName`

`resourceNameOrRouteName` allows us to manage which resource's record is going to be deleted.

```tsx live disableScroll previewHeight=200px
const { useRouterContext } = RefineCore;
import dataProvider from "@pankod/refine-simple-rest";

// visible-block-start
import { DeleteButton } from "@pankod/refine-mui";

const MyDeleteComponent = () => {
  return <DeleteButton resourceNameOrRouteName="categories" recordItemId="2" />;
};
// visible-block-end
const simpleRestDataProvider = dataProvider("https://api.fake-rest.refine.dev");

const customDataProvider = {
  ...simpleRestDataProvider,
  deleteOne: async ({ resource, id, variables }) => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    return {
      message: "You have successfully deleted the record",
    };
  },
};

render(
  <RefineMuiDemo
    initialRoutes={["/"]}
    dataProvider={customDataProvider}
    resources={[
      {
        name: "posts",
      },
      {
        name: "categories",
      },
    ]}
    DashboardPage={MyDeleteComponent}
  />,
);
```

### `onSuccess`

`onSuccess` can be used if you want to do anything on the result returned after the delete request.

For example, let's `console.log` after deletion:

```tsx live disableScroll previewHeight=200px
const { useRouterContext } = RefineCore;
import dataProvider from "@pankod/refine-simple-rest";

// visible-block-start
import { DeleteButton } from "@pankod/refine-mui";

const MyDeleteComponent = () => {
  return (
    <DeleteButton
      resourceNameOrRouteName="posts"
      recordItemId="1"
      onSuccess={(value) => {
        console.log(value);
      }}
    />
  );
};
// visible-block-end
const simpleRestDataProvider = dataProvider("https://api.fake-rest.refine.dev");

const customDataProvider = {
  ...simpleRestDataProvider,
  deleteOne: async ({ resource, id, variables }) => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    return {
      message: "You have successfully deleted the record",
    };
  },
};

render(
  <RefineMuiDemo
    initialRoutes={["/"]}
    dataProvider={customDataProvider}
    resources={[
      {
        name: "posts",
      },
    ]}
    DashboardPage={MyDeleteComponent}
  />,
);
```

### `mutationMode`

Determines which mode mutation will have while executing `<DeleteButton>`.

[Refer to the mutation mode docs for further information. &#8594](/core/docs/3.xx.xx/advanced-tutorials/mutation-mode)

```tsx
import { useTable } from "@pankod/refine-core";

import {
  List,
  Table,
  // highlight-next-line
  DeleteButton,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@pankod/refine-mui";

export const PostList: React.FC = () => {
  const { tableQueryResult } = useTable<IPost>();

  const { data } = tableQueryResult;

  return (
    <List>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Title</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.data.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell align="center">
                <DeleteButton
                  recordItemId={row.id}
                  // highlight-next-line
                  mutationMode="undoable"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </List>
  );
};

interface IPost {
  id: number;
  title: string;
}
```

### `hideText`

It is used to show and not show the text of the button. When `true`, only the button icon is visible.

```tsx live disableScroll previewHeight=200px
const { useRouterContext } = RefineCore;
import dataProvider from "@pankod/refine-simple-rest";

// visible-block-start
import { DeleteButton } from "@pankod/refine-mui";

const MyDeleteComponent = () => {
  return (
    <DeleteButton
      // highlight-next-line
      hideText={true}
    />
  );
};
// visible-block-end
const simpleRestDataProvider = dataProvider("https://api.fake-rest.refine.dev");

const customDataProvider = {
  ...simpleRestDataProvider,
  deleteOne: async ({ resource, id, variables }) => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    return {
      message: "You have successfully deleted the record",
    };
  },
};

render(
  <RefineMuiDemo
    initialRoutes={["/"]}
    dataProvider={customDataProvider}
    resources={[
      {
        name: "posts",
        list: MyDeleteComponent,
      },
    ]}
  />,
);
```

### `accessControl`

This prop can be used to skip access control check with its `enabled` property or to hide the button when the user does not have the permission to access the resource with `hideIfUnauthorized` property. This is relevant only when an [`accessControlProvider`](/core/docs/3.xx.xx/api-reference/core/providers/accessControl-provider) is provided to [`<Refine/>`](/core/docs/3.xx.xx/api-reference/core/components/refine-config)

```tsx
import { DeleteButton } from "@pankod/refine-mui";

export const MyListComponent = () => {
  return (
    <DeleteButton accessControl={{ enabled: true, hideIfUnauthorized: true }} />
  );
};
```

## How to override confirm texts?

You can change the text that appears when you confirm a transaction with `confirmTitle` prop, as well as what ok and cancel buttons text look like with `confirmOkText` and `confirmCancelText` props.

```tsx live disableScroll previewHeight=200px
const { useRouterContext } = RefineCore;
import dataProvider from "@pankod/refine-simple-rest";

// visible-block-start
import { DeleteButton } from "@pankod/refine-mui";

const MyDeleteComponent = () => {
  return (
    <DeleteButton
      // highlight-start
      confirmTitle="Title"
      confirmOkText="Ok Text"
      confirmCancelText="Delete Text"
      // highlight-end
    />
  );
};
// visible-block-end

const simpleRestDataProvider = dataProvider("https://api.fake-rest.refine.dev");

const customDataProvider = {
  ...simpleRestDataProvider,
  deleteOne: async ({ resource, id, variables }) => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    return {
      message: "You have successfully deleted the record",
    };
  },
};

render(
  <RefineMuiDemo
    initialRoutes={["/"]}
    dataProvider={customDataProvider}
    resources={[
      {
        name: "posts",
        list: MyDeleteComponent,
      },
    ]}
  />,
);
```

## API Reference

### Props

<PropsTable module="@pankod/refine-mui/DeleteButton" />

:::tip External Props
It also accepts all props of Material UI [Button](https://mui.com/material-ui/react-button/).
:::
