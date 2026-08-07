---
id: edit
title: Edit
swizzle: true
---

`<Edit>` provides us a layout for displaying the page. It does not contain any logic but adds extra functionalities like a [`<RefreshButton>`](/core/docs/3.xx.xx/api-reference/mui/components/buttons/refresh).

We will show what `<Edit>` does using properties with examples.

```tsx live hideCode url=http://localhost:3000/posts/edit/123
// visible-block-start
import React from "react";
import {
  Edit,
  useAutocomplete,
  TextField,
  Autocomplete,
  Box,
} from "@pankod/refine-mui";
import { useForm, Controller } from "@pankod/refine-react-hook-form";

const SampleEdit = () => {
  const {
    saveButtonProps,
    refineCore: { queryResult },
    register,
    control,
    formState: { errors },
  } = useForm();

  const samplesData = queryResult?.data?.data;

  const { autocompleteProps: categoryAutocompleteProps } = useAutocomplete({
    resource: "categories",
    defaultValue: samplesData?.category?.id,
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column" }}
        autoComplete="off"
      >
        <TextField
          {...register("id", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.id}
          helperText={(errors as any)?.id?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="number"
          label="Id"
          name="id"
          disabled
        />
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
    </Edit>
  );
};
// visible-block-end

render(
  <RefineMuiDemo
    initialRoutes={["/samples/edit/123"]}
    resources={[{ name: "samples", edit: SampleEdit, list: SampleList }]}
  />,
);
```

:::info-tip Swizzle
You can swizzle this component to customize it with the [**refine CLI**](/core/docs/3.xx.xx/packages/documentation/cli)
:::

## Properties

### `title`

It allows adding title inside the `<Edit>` component. if you don't pass title props it uses "Edit" prefix and singular resource name by default. For example, for the `/posts/edit` resource, it will be "Edit post".

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/create
// visible-block-start
import { Edit, Typography } from "@pankod/refine-mui";

const EditPage: React.FC = () => {
  return (
    <Edit
      // highlight-next-line
      title={<Typography variant="h5">Custom Title</Typography>}
    >
      <span>Rest of your page here</span>
    </Edit>
  );
};
// visible-block-end

render(
  <RefineMuiDemo
    initialRoutes={["/posts/edit/123"]}
    resources={[
      {
        name: "posts",
        list: () => (
          <div>
            <p>This page is empty.</p>
            <RefineMui.EditButton recordItemId="123" />
          </div>
        ),
        edit: EditPage,
      },
    ]}
  />,
);
```

### `resource`

The `<Edit>` component reads the `resource` information from the route by default. This default behavior will not work on custom pages. If you want to use the `<Edit>` component in a custom page, you can use the `resource` prop.

[Refer to the custom pages documentation for detailed usage. &#8594](/core/docs/3.xx.xx/advanced-tutorials/custom-pages)

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/custom
// handle initial routes in new way
setInitialRoutes(["/custom"]);

// visible-block-start
import { Refine } from "@pankod/refine-core";
import { Edit, Layout } from "@pankod/refine-mui";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

const CustomPage: React.FC = () => {
  return (
    /* highlight-next-line */
    <Edit resource="posts" recordItemId={123}>
      <span>Rest of your page here</span>
    </Edit>
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

The `<Edit>` component has a save button by default. If you want to customize this button you can use the `saveButtonProps` property like the code below.

Clicking on the save button will submit your form.

[Refer to the `<SaveButton>` documentation for detailed usage. &#8594](/core/docs/3.xx.xx/api-reference/mui/components/buttons/save)

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/edit/123
// visible-block-start
import { Edit } from "@pankod/refine-mui";

const PostEdit: React.FC = () => {
  return (
    /* highlight-next-line */
    <Edit saveButtonProps={{ size: "small" }}>
      <span>Rest of your page here</span>
    </Edit>
  );
};
// visible-block-end

render(
  <RefineMuiDemo
    initialRoutes={["/posts/edit/123"]}
    resources={[
      {
        name: "posts",
        list: () => (
          <div>
            <p>This page is empty.</p>
            <RefineMui.EditButton recordItemId={123} />
          </div>
        ),
        edit: PostEdit,
      },
    ]}
  />,
);
```

### `canDelete` and `deleteButtonProps`

`canDelete` allows us to add the delete button inside the `<Edit>` component. If the resource has the `canDelete` property, refine adds the delete button by default. If you want to customize this button you can use the `deleteButtonProps` property like the code below.

When clicked on, the delete button executes the [`useDelete`](/core/docs/3.xx.xx/api-reference/core/hooks/data/useDelete/) method provided by the [`dataProvider`](/core/docs/3.xx.xx/api-reference/core/providers/data-provider).

[Refer to the `<DeleteButton>` documentation for detailed usage. &#8594](/core/docs/3.xx.xx/api-reference/mui/components/buttons/delete)

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/edit/123
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
import { Edit } from "@pankod/refine-mui";
import { usePermissions } from "@pankod/refine-core";

const PostEdit: React.FC = () => {
  const { data: permissionsData } = usePermissions();
  return (
    <Edit
      /* highlight-start */
      canDelete={permissionsData?.includes("admin")}
      deleteButtonProps={{ size: "small" }}
      /* highlight-end */
      saveButtonProps={{ size: "small" }}
    >
      <p>Rest of your page here</p>
    </Edit>
  );
};
// visible-block-end

render(
  <RefineMuiDemo
    authProvider={authProvider}
    dataProvider={customDataProvider}
    initialRoutes={["/posts/edit/123"]}
    Layout={RefineMui.Layout}
    resources={[
      {
        name: "posts",
        list: () => (
          <div>
            <p>This page is empty.</p>
            <RefineMui.EditButton recordItemId="123">
              Edit Item 123
            </RefineMui.EditButton>
          </div>
        ),
        edit: PostEdit,
      },
    ]}
  />,
);
```

[Refer to the `usePermission` documentation for detailed usage. &#8594](/core/docs/3.xx.xx/api-reference/core/hooks/auth/usePermissions)

### `recordItemId`

The `<Edit>` component reads the `id` information from the route by default. `recordItemId` is used when it cannot read from the URL(when used on a custom page, modal or drawer).

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/custom
// handle initial routes in new way
setInitialRoutes(["/custom"]);

// visible-block-start
import { Refine } from "@pankod/refine-core";
import { Edit, Layout } from "@pankod/refine-mui";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

const CustomPage: React.FC = () => {
  return (
    /* highlight-next-line */
    <Edit resource="posts" recordItemId={123}>
      <span>Rest of your page here</span>
    </Edit>
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
The `<Edit>` component needs the `id` information for the [`<RefreshButton>`](/core/docs/3.xx.xx/api-reference/mui/components/buttons/refresh) to work properly.
:::

### `mutationMode`

Determines which mode mutation will have while executing [`<DeleteButton>`](/core/docs/3.xx.xx/api-reference/mui/components/buttons/delete).

[Refer to the mutation mode docs for further information. &#8594](/core/docs/3.xx.xx/advanced-tutorials/mutation-mode)

```tsx live hideCode url=http://localhost:3000/posts/edit/123
// visible-block-start
import React from "react";
import {
  Edit,
  useAutocomplete,
  TextField,
  Autocomplete,
  Box,
} from "@pankod/refine-mui";
import { useForm, Controller } from "@pankod/refine-react-hook-form";

const SampleEdit = () => {
  const {
    saveButtonProps,
    refineCore: { queryResult },
    register,
    control,
    formState: { errors },
  } = useForm();

  const samplesData = queryResult?.data?.data;

  const { autocompleteProps: categoryAutocompleteProps } = useAutocomplete({
    resource: "categories",
    defaultValue: samplesData?.category?.id,
  });

  return (
    <Edit
      saveButtonProps={saveButtonProps}
      canDelete
      // highlight-next-line
      mutationMode="undoable"
    >
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column" }}
        autoComplete="off"
      >
        <TextField
          {...register("id", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.id}
          helperText={(errors as any)?.id?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="number"
          label="Id"
          name="id"
          disabled
        />
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
    </Edit>
  );
};
// visible-block-end

render(
  <RefineMuiDemo
    initialRoutes={["/samples/edit/123"]}
    resources={[{ name: "samples", edit: SampleEdit, list: SampleList }]}
  />,
);
```

### `dataProviderName`

If not specified, Refine will use the default data provider. If you have multiple data providers and want to use a different one, you can use the `dataProviderName` property.

```tsx
import { Refine } from "@pankod/refine-core";
import { Edit } from "@pankod/refine-mui";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

// highlight-start
const PostEdit = () => {
  return <Edit dataProviderName="other">...</Edit>;
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
      resources={[{ name: "posts", edit: PostEdit }]}
    />
  );
};
```

### `goBack`

To customize the back button or to disable it, you can use the `goBack` property.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/edit/123
// visible-block-start
import { Edit, Button } from "@pankod/refine-mui";
import { useNavigation } from "@pankod/refine-core";

const BackButton = () => {
  const { goBack } = useNavigation();

  return <Button onClick={() => goBack()}>BACK!</Button>;
};

const PostEdit: React.FC = () => {
  return (
    <Edit
      // highlight-next-line
      goBack={<BackButton />}
    >
      <span>Rest of your page here</span>
    </Edit>
  );
};
// visible-block-end

render(
  <RefineMuiDemo
    initialRoutes={["/posts", "/posts/edit/123"]}
    resources={[
      {
        name: "posts",
        list: () => (
          <div>
            <p>This page is empty.</p>
            <RefineMui.EditButton recordItemId={123} />
          </div>
        ),
        edit: PostEdit,
      },
    ]}
  />,
);
```

### `isLoading`

To toggle the loading state of the `<Edit/>` component, you can use the `isLoading` property.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/edit/123
// visible-block-start
import { Edit } from "@pankod/refine-mui";

const PostEdit: React.FC = () => {
  const [loading, setLoading] = React.useState(true);

  return (
    <Edit
      // highlight-next-line
      isLoading={loading}
    >
      <span>Rest of your page here</span>
    </Edit>
  );
};
// visible-block-end

render(
  <RefineMuiDemo
    initialRoutes={["/posts", "/posts/edit/123"]}
    resources={[
      {
        name: "posts",
        list: () => (
          <div>
            <p>This page is empty.</p>
            <RefineMui.EditButton recordItemId={123} />
          </div>
        ),
        edit: PostEdit,
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

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/edit/123
// visible-block-start
import { Edit, Breadcrumb } from "@pankod/refine-mui";

const PostEdit: React.FC = () => {
  return (
    <Edit
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
    </Edit>
  );
};
// visible-block-end

render(
  <RefineMuiDemo
    initialRoutes={["/posts", "/posts/edit/123"]}
    resources={[
      {
        name: "posts",
        list: () => (
          <div>
            <p>This page is empty.</p>
            <RefineMui.EditButton recordItemId={123} />
          </div>
        ),
        edit: PostEdit,
      },
    ]}
  />,
);
```

### `wrapperProps`

If you want to customize the wrapper of the `<Edit/>` component, you can use the `wrapperProps` property.

[Refer to the `Card` documentation from Material UI for detailed usage. &#8594](https://mui.com/material-ui/api/card/)

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/edit/123
// visible-block-start
import { Edit } from "@pankod/refine-mui";

const PostEdit: React.FC = () => {
  const [loading, setLoading] = React.useState(true);

  return (
    <Edit
      // highlight-start
      wrapperProps={{
        sx: {
          backgroundColor: "lightsteelblue",
        },
      }}
      // highlight-end
    >
      <span>Rest of your page here</span>
    </Edit>
  );
};
// visible-block-end

render(
  <RefineMuiDemo
    initialRoutes={["/posts", "/posts/edit/123"]}
    resources={[
      {
        name: "posts",
        list: () => (
          <div>
            <p>This page is empty.</p>
            <RefineMui.EditButton recordItemId={123} />
          </div>
        ),
        edit: PostEdit,
      },
    ]}
  />,
);
```

### `headerProps`

If you want to customize the header of the `<Edit/>` component, you can use the `headerProps` property.

[Refer to the `CardHeader` documentation from Material UI for detailed usage. &#8594](https://mui.com/material-ui/api/card-header/)

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/edit/123
// visible-block-start
import { Edit } from "@pankod/refine-mui";

const PostEdit: React.FC = () => {
  const [loading, setLoading] = React.useState(true);

  return (
    <Edit
      // highlight-start
      headerProps={{
        sx: {
          backgroundColor: "lightsteelblue",
        },
      }}
      // highlight-end
    >
      <span>Rest of your page here</span>
    </Edit>
  );
};
// visible-block-end

render(
  <RefineMuiDemo
    initialRoutes={["/posts", "/posts/edit/123"]}
    resources={[
      {
        name: "posts",
        list: () => (
          <div>
            <p>This page is empty.</p>
            <RefineMui.EditButton recordItemId={123} />
          </div>
        ),
        edit: PostEdit,
      },
    ]}
  />,
);
```

### `contentProps`

If you want to customize the content of the `<Edit/>` component, you can use the `contentProps` property.

[Refer to the `CardContent` documentation from Material UI for detailed usage. &#8594](https://mui.com/material-ui/api/card-content/)

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/edit/123
// visible-block-start
import { Edit } from "@pankod/refine-mui";

const PostEdit: React.FC = () => {
  const [loading, setLoading] = React.useState(true);

  return (
    <Edit
      // highlight-start
      contentProps={{
        sx: {
          backgroundColor: "lightsteelblue",
        },
      }}
      // highlight-end
    >
      <span>Rest of your page here</span>
    </Edit>
  );
};
// visible-block-end

render(
  <RefineMuiDemo
    initialRoutes={["/posts", "/posts/edit/123"]}
    resources={[
      {
        name: "posts",
        list: () => (
          <div>
            <p>This page is empty.</p>
            <RefineMui.EditButton recordItemId={123} />
          </div>
        ),
        edit: PostEdit,
      },
    ]}
  />,
);
```

### `headerButtons`

You can customize the buttons at the header by using the `headerButtons` property. It accepts `React.ReactNode` or a render function `({ defaultButtons }) => React.ReactNode` which you can use to keep the existing buttons and add your own.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/edit/123
// visible-block-start
import { Edit, Button } from "@pankod/refine-mui";

const PostEdit: React.FC = () => {
  const [loading, setLoading] = React.useState(true);

  return (
    <Edit
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
    </Edit>
  );
};
// visible-block-end

render(
  <RefineMuiDemo
    initialRoutes={["/posts", "/posts/edit/123"]}
    resources={[
      {
        name: "posts",
        list: () => (
          <div>
            <p>This page is empty.</p>
            <RefineMui.EditButton recordItemId={123} />
          </div>
        ),
        edit: PostEdit,
      },
    ]}
  />,
);
```

### `headerButtonProps`

You can customize the wrapper element of the buttons at the header by using the `headerButtonProps` property.

[Refer to the `Box` documentation from Material UI for detailed usage. &#8594](https://mui.com/material-ui/api/box/)

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/edit/123
// visible-block-start
import { Edit, Button } from "@pankod/refine-mui";

const PostEdit: React.FC = () => {
  const [loading, setLoading] = React.useState(true);

  return (
    <Edit
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
    </Edit>
  );
};
// visible-block-end

render(
  <RefineMuiDemo
    initialRoutes={["/posts", "/posts/edit/123"]}
    resources={[
      {
        name: "posts",
        list: () => (
          <div>
            <p>This page is empty.</p>
            <RefineMui.EditButton recordItemId={123} />
          </div>
        ),
        edit: PostEdit,
      },
    ]}
  />,
);
```

### `footerButtons`

You can customize the buttons at the footer by using the `footerButtons` property. It accepts `React.ReactNode` or a render function `({ defaultButtons }) => React.ReactNode` which you can use to keep the existing buttons and add your own.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/edit/123
// visible-block-start
import { Edit, Button } from "@pankod/refine-mui";

const PostEdit: React.FC = () => {
  const [loading, setLoading] = React.useState(true);

  return (
    <Edit
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
    </Edit>
  );
};
// visible-block-end

render(
  <RefineMuiDemo
    initialRoutes={["/posts", "/posts/edit/123"]}
    resources={[
      {
        name: "posts",
        list: () => (
          <div>
            <p>This page is empty.</p>
            <RefineMui.EditButton recordItemId={123} />
          </div>
        ),
        edit: PostEdit,
      },
    ]}
  />,
);
```

### `footerButtonProps`

You can customize the wrapper element of the buttons at the footer by using the `footerButtonProps` property.

[Refer to the `CardActions` documentation from Material UI for detailed usage. &#8594](https://mui.com/material-ui/api/card-actions/)

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/edit/123
// visible-block-start
import { Edit, Button } from "@pankod/refine-mui";

const PostEdit: React.FC = () => {
  const [loading, setLoading] = React.useState(true);

  return (
    <Edit
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
    </Edit>
  );
};
// visible-block-end

render(
  <RefineMuiDemo
    initialRoutes={["/posts", "/posts/edit/123"]}
    resources={[
      {
        name: "posts",
        list: () => (
          <div>
            <p>This page is empty.</p>
            <RefineMui.EditButton recordItemId={123} />
          </div>
        ),
        edit: PostEdit,
      },
    ]}
  />,
);
```

### ~~`actionButtons`~~

:::caution Deprecated
Use `headerButtons` or `footerButtons` instead.
:::

`<Edit>` uses the Material UI [`<CardActions>`](https://mui.com/material-ui/api/card-actions/#main-content) component. The children of the [`<CardActions>`](https://mui.com/material-ui/api/card-actions/#main-content) component shows [`<SaveButton>`](/core/docs/3.xx.xx/api-reference/mui/components/buttons/save) and [`<DeleteButton>`](/core/docs/3.xx.xx/api-reference/mui/components/buttons/delete) based on your resource definition in the`resources`property you pass to `<Refine>`. If you want to use other things instead of these buttons, you can use the `actionButton` property like the code below.

```tsx title="src/pages/posts/edit.tsx"
// highlight-next-line
import { Edit, Button } from "@pankod/refine-mui";

export const EditPage: React.FC = () => {
  return (
    <Edit
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
    </Edit>
  );
};
```

### ~~`cardProps`~~

:::caution Deprecated
Use `wrapperProps` instead.
:::

`<Edit>` uses the Material UI [`<Card>`](https://mui.com/material-ui/react-card/#main-content) components so you can customize with the props of `cardProps`.

### ~~`cardHeaderProps`~~

:::caution Deprecated
Use `headerProps` instead.
:::

`<Edit>` uses the Material UI [`<CardHeader>`](https://mui.com/material-ui/api/card-header/) components so you can customize with the props of `cardHeaderProps`.

```tsx title="src/pages/posts/edit.tsx"
// highlight-next-line
import { Edit, Typography } from "@pankod/refine-mui";

export const EditPage: React.FC = () => {
  return (
    <Edit
      //highlight-start
      cardHeaderProps={{
        title: <Typography variant="h5">Custom Title</Typography>,
      }}
      //highlight-end
    >
      ...
    </Edit>
  );
};
```

### ~~`cardContentProps`~~

:::caution Deprecated
Use `contentProps` instead.
:::

`<Edit>` uses the Material UI [`<CardContent>`](https://mui.com/material-ui/api/card-content/) components so you can customize with the props of `cardContentProps`.

### ~~`cardActionsProps`~~

:::caution Deprecated
Use `headerButtonProps` and `footerButtonProps` instead.
:::

`<Edit>` uses the Material UI [`<CardActions>`](https://mui.com/material-ui/api/card-actions/) components so you can customize with the props of `cardActionsProps`.

## API Reference

### Properties

<PropsTable module="@pankod/refine-mui/Edit"
wrapperProps-type="[`CardProps`](https://mui.com/material-ui/api/card/#props)"
contentProps-type="[`CardContentProps`](https://mui.com/material-ui/api/card-content/#props)"
headerProps-type="[`CardHeaderProps`](https://mui.com/material-ui/api/card-header/#props)"
headerButtons-default="[`ListButton`](https://refine.dev/core/docs/api-reference/mui/components/buttons/list-button/) and [`RefreshButton`](https://refine.dev/core/docs/api-reference/mui/components/buttons/refresh-button/)"
headerButtonProps-type="[`BoxProps`](https://mui.com/material-ui/api/box/#props)"
deleteButtonProps-type="[`DeleteButtonProps`](/core/docs/3.xx.xx/api-reference/mui/components/buttons/delete-button/)"
saveButtonProps-type="[`SaveButtonProps`](https://refine.dev/core/docs/api-reference/mui/components/buttons/save-button/)"
footerButtons-default="[`SaveButton`](https://refine.dev/core/docs/api-reference/mui/components/buttons/save-button/) and [`DeleteButton`](https://refine.dev/core/docs/api-reference/mui/components/buttons/delete-button/)"
footerButtonsProps-type="[`CardActionsProps`](https://mui.com/material-ui/api/card-actions/#props)"
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
              <RefineMui.EditButton hideText recordItemId={row.id} />
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
