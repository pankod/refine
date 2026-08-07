---
id: create
title: Create
swizzle: true
---

`<Create>` provides us a layout to display the page. It does not contain any logic but adds extra functionalities like action buttons and giving titles to the page.

We'll show what `<Create>` does using properties with examples.

```tsx live hideCode url=http://localhost:3000/posts/create
// visible-block-start
import React from "react";
import {
  Create,
  useAutocomplete,
  TextField,
  Autocomplete,
  Box,
} from "@pankod/refine-mui";
import { useForm, Controller } from "@pankod/refine-react-hook-form";

const SampleCreate = () => {
  const {
    saveButtonProps,
    refineCore: { formLoading },
    register,
    control,
    formState: { errors },
  } = useForm();

  const { autocompleteProps: categoryAutocompleteProps } = useAutocomplete({
    resource: "categories",
  });

  return (
    <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column" }}
        autoComplete="off"
      >
        <TextField
          {...register("title", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.title}
          helperText={(errors as any)?.title?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label="Title"
          name="title"
        />
        <TextField
          {...register("content", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.content}
          helperText={(errors as any)?.content?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          multiline
          label="Content"
          name="content"
        />
        <Controller
          control={control}
          name="category"
          rules={{ required: "This field is required" }}
          // eslint-disable-next-line
          defaultValue={null as any}
          render={({ field }) => (
            <Autocomplete
              {...categoryAutocompleteProps}
              {...field}
              onChange={(_, value) => {
                field.onChange(value);
              }}
              getOptionLabel={(item) => {
                return (
                  categoryAutocompleteProps?.options?.find(
                    (p) => p?.id?.toString() === item?.id?.toString(),
                  )?.title ?? ""
                );
              }}
              isOptionEqualToValue={(option, value) =>
                value === undefined ||
                option?.id?.toString() === (value?.id ?? value)?.toString()
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Category"
                  margin="normal"
                  variant="outlined"
                  error={!!(errors as any)?.category?.id}
                  helperText={(errors as any)?.category?.id?.message}
                  required
                />
              )}
            />
          )}
        />
      </Box>
    </Create>
  );
};
// visible-block-end

render(
  <RefineMuiDemo
    initialRoutes={["/samples/create"]}
    resources={[{ name: "samples", create: SampleCreate, list: SampleList }]}
  />,
);
```

:::info-tip Swizzle
You can swizzle this component to customize it with the [**refine CLI**](/core/docs/3.xx.xx/packages/documentation/cli)
:::

## Properties

### `title`

It allows adding title inside the `<Create>` component. if you don't pass title props it uses "Create" prefix and singular resource name by default. For example, for the `/posts/create` resource, it will be "Create post".

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/create
// visible-block-start
import { Create, Typography } from "@pankod/refine-mui";

const CreatePage: React.FC = () => {
  return (
    <Create
      // highlight-next-line
      title={<Typography variant="h5">Custom Title</Typography>}
    >
      <span>Rest of your page here</span>
    </Create>
  );
};
// visible-block-end

render(
  <RefineMuiDemo
    initialRoutes={["/posts/create"]}
    resources={[
      {
        name: "posts",
        list: () => (
          <div>
            <p>This page is empty.</p>
            <RefineMui.CreateButton />
          </div>
        ),
        create: CreatePage,
      },
    ]}
  />,
);
```

### `resource`

The `<Create>` component reads the `resource` information from the route by default. This default behavior will not work on custom pages. If you want to use the `<Create>` component in a custom page, you can use the `resource` prop.

[Refer to the custom pages documentation for detailed usage. &#8594](/core/docs/3.xx.xx/advanced-tutorials/custom-pages)

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/custom
// handle initial routes in new way
setInitialRoutes(["/custom"]);

// visible-block-start
import { Refine } from "@pankod/refine-core";
import { Create, Layout } from "@pankod/refine-mui";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

const CustomPage: React.FC = () => {
  return (
    /* highlight-next-line */
    <Create resource="posts">
      <span>Rest of your page here</span>
    </Create>
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

### `saveButtonProps`

`<Create>` component has a default button that submits the form. If you want to customize this button you can use the `saveButtonProps` property like the code below.

[Refer to the `<SaveButton>` documentation for detailed usage. &#8594](/core/docs/3.xx.xx/api-reference/mui/components/buttons/save)

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/create
// visible-block-start
import { Create } from "@pankod/refine-mui";

const PostCreate: React.FC = () => {
  return (
    /* highlight-next-line */
    <Create saveButtonProps={{ size: "small" }}>
      <span>Rest of your page here</span>
    </Create>
  );
};
// visible-block-end

render(
  <RefineMuiDemo
    initialRoutes={["/posts/create"]}
    resources={[
      {
        name: "posts",
        list: () => (
          <div>
            <p>This page is empty.</p>
            <RefineMui.CreateButton />
          </div>
        ),
        create: PostCreate,
      },
    ]}
  />,
);
```

### `goBack`

To customize the back button or to disable it, you can use the `goBack` property.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/create
// visible-block-start
import { Create, Button } from "@pankod/refine-mui";
import { useNavigation } from "@pankod/refine-core";

const BackButton = () => {
  const { goBack } = useNavigation();

  return <Button onClick={() => goBack()}>BACK!</Button>;
};

const PostCreate: React.FC = () => {
  return (
    <Create
      // highlight-next-line
      goBack={<BackButton />}
    >
      <span>Rest of your page here</span>
    </Create>
  );
};
// visible-block-end

render(
  <RefineMuiDemo
    initialRoutes={["/posts", "/posts/create"]}
    resources={[
      {
        name: "posts",
        list: () => (
          <div>
            <p>This page is empty.</p>
            <RefineMui.CreateButton />
          </div>
        ),
        create: PostCreate,
      },
    ]}
  />,
);
```

### `isLoading`

To toggle the loading state of the `<Create/>` component, you can use the `isLoading` property.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/create
// visible-block-start
import { Create } from "@pankod/refine-mui";

const PostCreate: React.FC = () => {
  const [loading, setLoading] = React.useState(true);

  return (
    <Create
      // highlight-next-line
      isLoading={loading}
    >
      <span>Rest of your page here</span>
    </Create>
  );
};
// visible-block-end

render(
  <RefineMuiDemo
    initialRoutes={["/posts", "/posts/create"]}
    resources={[
      {
        name: "posts",
        list: () => (
          <div>
            <p>This page is empty.</p>
            <RefineMui.CreateButton />
          </div>
        ),
        create: PostCreate,
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

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/create
// visible-block-start
import { Create, Breadcrumb } from "@pankod/refine-mui";

const PostCreate: React.FC = () => {
  return (
    <Create
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
    </Create>
  );
};
// visible-block-end

render(
  <RefineMuiDemo
    initialRoutes={["/posts", "/posts/create"]}
    resources={[
      {
        name: "posts",
        list: () => (
          <div>
            <p>This page is empty.</p>
            <RefineMui.CreateButton />
          </div>
        ),
        create: PostCreate,
      },
    ]}
  />,
);
```

### `wrapperProps`

If you want to customize the wrapper of the `<Create/>` component, you can use the `wrapperProps` property.

[Refer to the `Card` documentation from Material UI for detailed usage. &#8594](https://mui.com/material-ui/api/card/)

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/create
// visible-block-start
import { Create } from "@pankod/refine-mui";

const PostCreate: React.FC = () => {
  const [loading, setLoading] = React.useState(true);

  return (
    <Create
      // highlight-start
      wrapperProps={{
        sx: {
          backgroundColor: "lightsteelblue",
        },
      }}
      // highlight-end
    >
      <span>Rest of your page here</span>
    </Create>
  );
};
// visible-block-end

render(
  <RefineMuiDemo
    initialRoutes={["/posts", "/posts/create"]}
    resources={[
      {
        name: "posts",
        list: () => (
          <div>
            <p>This page is empty.</p>
            <RefineMui.CreateButton />
          </div>
        ),
        create: PostCreate,
      },
    ]}
  />,
);
```

### `headerProps`

If you want to customize the header of the `<Create/>` component, you can use the `headerProps` property.

[Refer to the `CardHeader` documentation from Material UI for detailed usage. &#8594](https://mui.com/material-ui/api/card-header/)

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/create
// visible-block-start
import { Create } from "@pankod/refine-mui";

const PostCreate: React.FC = () => {
  const [loading, setLoading] = React.useState(true);

  return (
    <Create
      // highlight-start
      headerProps={{
        sx: {
          backgroundColor: "lightsteelblue",
        },
      }}
      // highlight-end
    >
      <span>Rest of your page here</span>
    </Create>
  );
};
// visible-block-end

render(
  <RefineMuiDemo
    initialRoutes={["/posts", "/posts/create"]}
    resources={[
      {
        name: "posts",
        list: () => (
          <div>
            <p>This page is empty.</p>
            <RefineMui.CreateButton />
          </div>
        ),
        create: PostCreate,
      },
    ]}
  />,
);
```

### `contentProps`

If you want to customize the content of the `<Create/>` component, you can use the `contentProps` property.

[Refer to the `CardContent` documentation from Material UI for detailed usage. &#8594](https://mui.com/material-ui/api/card-content/)

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/create
// visible-block-start
import { Create } from "@pankod/refine-mui";

const PostCreate: React.FC = () => {
  const [loading, setLoading] = React.useState(true);

  return (
    <Create
      // highlight-start
      contentProps={{
        sx: {
          backgroundColor: "lightsteelblue",
        },
      }}
      // highlight-end
    >
      <span>Rest of your page here</span>
    </Create>
  );
};
// visible-block-end

render(
  <RefineMuiDemo
    initialRoutes={["/posts", "/posts/create"]}
    resources={[
      {
        name: "posts",
        list: () => (
          <div>
            <p>This page is empty.</p>
            <RefineMui.CreateButton />
          </div>
        ),
        create: PostCreate,
      },
    ]}
  />,
);
```

### `headerButtons`

You can customize the buttons at the header by using the `headerButtons` property. It accepts `React.ReactNode` or a render function `({ defaultButtons }) => React.ReactNode` which you can use to keep the existing buttons and add your own.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/create
// visible-block-start
import { Create, Button } from "@pankod/refine-mui";

const PostCreate: React.FC = () => {
  const [loading, setLoading] = React.useState(true);

  return (
    <Create
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
    </Create>
  );
};
// visible-block-end

render(
  <RefineMuiDemo
    initialRoutes={["/posts", "/posts/create"]}
    resources={[
      {
        name: "posts",
        list: () => (
          <div>
            <p>This page is empty.</p>
            <RefineMui.CreateButton />
          </div>
        ),
        create: PostCreate,
      },
    ]}
  />,
);
```

### `headerButtonProps`

You can customize the wrapper element of the buttons at the header by using the `headerButtonProps` property.

[Refer to the `Box` documentation from Material UI for detailed usage. &#8594](https://mui.com/material-ui/api/box/)

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/create
// visible-block-start
import { Create, Button } from "@pankod/refine-mui";

const PostCreate: React.FC = () => {
  const [loading, setLoading] = React.useState(true);

  return (
    <Create
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
    </Create>
  );
};
// visible-block-end

render(
  <RefineMuiDemo
    initialRoutes={["/posts", "/posts/create"]}
    resources={[
      {
        name: "posts",
        list: () => (
          <div>
            <p>This page is empty.</p>
            <RefineMui.CreateButton />
          </div>
        ),
        create: PostCreate,
      },
    ]}
  />,
);
```

### `footerButtons`

You can customize the buttons at the footer by using the `footerButtons` property. It accepts `React.ReactNode` or a render function `({ defaultButtons }) => React.ReactNode` which you can use to keep the existing buttons and add your own.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/create
// visible-block-start
import { Create, Button } from "@pankod/refine-mui";

const PostCreate: React.FC = () => {
  const [loading, setLoading] = React.useState(true);

  return (
    <Create
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
    </Create>
  );
};
// visible-block-end

render(
  <RefineMuiDemo
    initialRoutes={["/posts", "/posts/create"]}
    resources={[
      {
        name: "posts",
        list: () => (
          <div>
            <p>This page is empty.</p>
            <RefineMui.CreateButton />
          </div>
        ),
        create: PostCreate,
      },
    ]}
  />,
);
```

### `footerButtonProps`

You can customize the wrapper element of the buttons at the footer by using the `footerButtonProps` property.

[Refer to the `CardActions` documentation from Material UI for detailed usage. &#8594](https://mui.com/material-ui/api/card-actions/)

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/create
// visible-block-start
import { Create, Button } from "@pankod/refine-mui";

const PostCreate: React.FC = () => {
  const [loading, setLoading] = React.useState(true);

  return (
    <Create
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
    </Create>
  );
};
// visible-block-end

render(
  <RefineMuiDemo
    initialRoutes={["/posts", "/posts/create"]}
    resources={[
      {
        name: "posts",
        list: () => (
          <div>
            <p>This page is empty.</p>
            <RefineMui.CreateButton />
          </div>
        ),
        create: PostCreate,
      },
    ]}
  />,
);
```

### ~~`actionButtons`~~

:::caution Deprecated
Use `headerButtons` or `footerButtons` instead.
:::

`<Create>` uses the Material UI [`<CardActions>`](https://mui.com/material-ui/api/card-actions/#main-content) component. The children of the [`<CardActions>`](https://mui.com/material-ui/api/card-actions/#main-content) component shows [`<SaveButton>`](/core/docs/3.xx.xx/api-reference/mui/components/buttons/save) and [`<DeleteButton>`](/core/docs/3.xx.xx/api-reference/mui/components/buttons/delete) based on your resource definition in the`resources` property you pass to `<Refine>`. If you want to use other things instead of these buttons, you can use the `actionButton` property like the code below.

```tsx title="src/pages/posts/create.tsx"
// highlight-next-line
import { Create, Button } from "@pankod/refine-mui";

export const CreatePage: React.FC = () => {
  return (
    <Create
      // highlight-start
      actionButtons={
        <>
          <Button>Custom Button 1</Button>
          <Button>Custom Button 2</Button>
        </>
      }
      // highlight-end
    >
      ...
    </Create>
  );
};
```

### ~~`cardProps`~~

:::caution Deprecated
Use `wrapperProps` instead.
:::

`<Create>` uses the Material UI [`<Card>`](https://mui.com/material-ui/react-card/#main-content) components so you can customize with the props of `cardProps`.

### ~~`cardHeaderProps`~~

:::caution Deprecated
Use `headerProps` instead.
:::

`<Create>` uses the Material UI [`<CardHeader>`](https://mui.com/material-ui/api/card-header/) components so you can customize with the props of `cardHeaderProps`.

```tsx
// highlight-next-line
import { Create, Typography } from "@pankod/refine-mui";

export const CreatePage: React.FC = () => {
  return (
    <Create
      // highlight-start
      cardHeaderProps={{
        title: <Typography variant="h5">Custom Title</Typography>,
      }}
      // highlight-end
    >
      ...
    </Create>
  );
};
```

### ~~`cardContentProps`~~

:::caution Deprecated
Use `contentProps` instead.
:::

`<Create>` uses the Material UI [`<CardContent>`](https://mui.com/material-ui/api/card-content/) components so you can customize with the props of `cardContentProps`.

### ~~`cardActionsProps`~~

:::caution Deprecated
Use `headerButtonProps` and `footerButtonProps` instead.
:::

`<Create>` uses the Material UI [`<CardActions>`](https://mui.com/material-ui/api/card-actions/) components so you can customize with the props of `cardActionsProps`.

## API Reference

### Properties

<PropsTable module="@pankod/refine-mui/Create" goBack-default="`<ArrowLeft />`"/>

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
