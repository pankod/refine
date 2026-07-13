---
title: "MUI Edit Component | UI Component in Refine v5"
display_title: "Edit"
sidebar_label: "Edit"
description: "Learn to integrate Edit in Refine v5. Explore customization options for hide for polished admin UIs. See practical code samples."
swizzle: true
---

`<Edit>` provides us a layout for displaying the page. It does not contain any logic and just adds extra functionalities like a [`<RefreshButton>`](/core/docs/ui-integrations/material-ui/components/buttons/refresh-button/).

We will show what `<Edit>` does using properties with examples.

```tsx live hideCode url=http://localhost:3000/posts/edit/123
setInitialRoutes(["/posts/edit/123"]);

// visible-block-start
import React from "react";
import { Edit, useAutocomplete } from "@refinedev/mui";
import { TextField, Autocomplete, Box } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";

const SampleEdit = () => {
  const {
    saveButtonProps,
    refineCore: { query },
    register,
    control,
    formState: { errors },
  } = useForm();

  const samplesData = query?.data?.data;

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
          slotProps={{
            InputLabelProps: { shrink: true },
          }}
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
          slotProps={{
            InputLabelProps: { shrink: true },
          }}
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
  <ReactRouter.BrowserRouter>
    <RefineMuiDemo
      resources={[
        {
          name: "posts",
          list: "/posts",
          edit: "/posts/edit/:id",
        },
      ]}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route
          path="/posts"
          element={
            <div style={{ padding: 16 }}>
              <ReactRouter.Outlet />
            </div>
          }
        >
          <ReactRouter.Route
            index
            element={
              <div>
                <p>This page is empty.</p>
                <RefineMui.EditButton recordItemId="123">
                  Edit Item 123
                </RefineMui.EditButton>
              </div>
            }
          />
          <ReactRouter.Route path="edit/:id" element={<SampleEdit />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMuiDemo>
  </ReactRouter.BrowserRouter>,
);
```

:::simple Good to know
You can swizzle this component with the [**Refine CLI**](/core/docs/packages/cli/) to customize it.
:::

## Properties

### title

`title` allows the addition of titles inside the `<Edit>` component. If you don't pass title props it uses "Edit" prefix and singular resource name by default. For example, for the `/posts/edit` resource, it will be "Edit post".

```tsx live disableScroll previewHeight=320px url=http://localhost:3000/posts/edit/123
setInitialRoutes(["/posts/edit/123"]);

// visible-block-start
import { Edit } from "@refinedev/mui";
import { Typography } from "@mui/material";

const PostEdit: React.FC = () => {
  return (
    /* highlight-next-line */
    <Edit title={<Typography variant="h5">Custom Title</Typography>}>
      <p>Rest of your page here</p>
    </Edit>
  );
};
// visible-block-end

render(
  <ReactRouter.BrowserRouter>
    <RefineMuiDemo
      resources={[
        {
          name: "posts",
          list: "/posts",
          edit: "/posts/edit/:id",
        },
      ]}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route
          path="/posts"
          element={
            <div style={{ padding: 16 }}>
              <ReactRouter.Outlet />
            </div>
          }
        >
          <ReactRouter.Route
            index
            element={
              <div>
                <p>This page is empty.</p>
                <RefineMui.EditButton recordItemId="123">
                  Edit Item 123
                </RefineMui.EditButton>
              </div>
            }
          />
          <ReactRouter.Route path="edit/:id" element={<PostEdit />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMuiDemo>
  </ReactRouter.BrowserRouter>,
);
```

### resource

The `<Edit>` component reads the `resource` information from the route by default. If you want to use a custom resource for the `<Edit>` component, you can use the `resource` prop.

```tsx live disableScroll previewHeight=320px url=http://localhost:3000/posts/edit/123
setInitialRoutes(["/posts/edit/123"]);

// visible-block-start
import { Edit } from "@refinedev/mui";

const CustomPage: React.FC = () => {
  return (
    /* highlight-next-line */
    <Edit resource="posts" recordItemId={123}>
      <p>Rest of your page here</p>
    </Edit>
  );
};
// visible-block-end

render(
  <ReactRouter.BrowserRouter>
    <RefineMuiDemo
      resources={[
        {
          name: "posts",
          list: "/posts",
          edit: "/posts/edit/:id",
        },
      ]}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route
          path="/posts"
          element={
            <div style={{ padding: 16 }}>
              <ReactRouter.Outlet />
            </div>
          }
        >
          <ReactRouter.Route
            index
            element={
              <div>
                <p>This page is empty.</p>
                <RefineMui.EditButton recordItemId="123">
                  Edit Item 123
                </RefineMui.EditButton>
              </div>
            }
          />
          <ReactRouter.Route path="edit/:id" element={<CustomPage />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMuiDemo>
  </ReactRouter.BrowserRouter>,
);
```

If you have multiple resources with the same name, you can pass the `identifier` instead of the `name` of the resource. It will only be used as the main matching key for the resource, data provider methods will still work with the `name` of the resource defined in the `<Refine/>` component.

> For more information, refer to the [`identifier` section of the `<Refine/>` component documentation &#8594](/core/docs/core/refine-component#identifier)

### saveButtonProps

The `<Edit>` component has a save button that submits the form by default. If you want to customize this button you can use the `saveButtonProps` property:

```tsx live disableScroll previewHeight=320px url=http://localhost:3000/posts/edit/123
setInitialRoutes(["/posts/edit/123"]);

// visible-block-start
import { Edit } from "@refinedev/mui";

const PostEdit: React.FC = () => {
  return (
    /* highlight-next-line */
    <Edit saveButtonProps={{ size: "small" }}>
      <p>Rest of your page here</p>
    </Edit>
  );
};
// visible-block-end

render(
  <ReactRouter.BrowserRouter>
    <RefineMuiDemo
      resources={[
        {
          name: "posts",
          list: "/posts",
          edit: "/posts/edit/:id",
        },
      ]}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route
          path="/posts"
          element={
            <div style={{ padding: 16 }}>
              <ReactRouter.Outlet />
            </div>
          }
        >
          <ReactRouter.Route
            index
            element={
              <div>
                <p>This page is empty.</p>
                <RefineMui.EditButton recordItemId="123">
                  Edit Item 123
                </RefineMui.EditButton>
              </div>
            }
          />
          <ReactRouter.Route path="/posts/edit/:id" element={<PostEdit />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMuiDemo>
  </ReactRouter.BrowserRouter>,
);
```

> For more information, refer to the [`<SaveButton>` documentation &#8594](/core/docs/ui-integrations/material-ui/components/buttons/save-button/)

### canDelete and deleteButtonProps

`canDelete` allows us to add the delete button inside the `<Edit>` component. If the resource has the `canDelete` property, Refine adds the delete button by default. If you want to customize this button you can use the `deleteButtonProps` property like the code below.

When clicked on, the delete button executes the [`useDelete`](/core/docs/data/hooks/use-delete/) method provided by the [`dataProvider`](/core/docs/data/data-provider/).

```tsx live disableScroll previewHeight=320px url=http://localhost:3000/posts/edit/123
setInitialRoutes(["/posts/edit/123"]);

// visible-block-start
import { Edit } from "@refinedev/mui";
import { usePermissions } from "@refinedev/core";

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
  <ReactRouter.BrowserRouter>
    <RefineMuiDemo
      resources={[
        {
          name: "posts",
          list: "/posts",
          edit: "/posts/edit/:id",
        },
      ]}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route
          path="/posts"
          element={
            <div style={{ padding: 16 }}>
              <ReactRouter.Outlet />
            </div>
          }
        >
          <ReactRouter.Route
            index
            element={
              <div>
                <p>This page is empty.</p>
                <RefineMui.EditButton recordItemId="123">
                  Edit Item 123
                </RefineMui.EditButton>
              </div>
            }
          />
          <ReactRouter.Route path="/posts/edit/:id" element={<PostEdit />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMuiDemo>
  </ReactRouter.BrowserRouter>,
);
```

### recordItemId

The `<Edit>` component reads the `id` information from the route by default. `recordItemId` is used when it cannot read from the URL, like when its used on a custom page, modal or drawer.

```tsx live disableScroll previewHeight=320px url=http://localhost:3000/posts/edit/123
setInitialRoutes(["/posts/edit/123"]);

// visible-block-start
import { Edit } from "@refinedev/mui";

const CustomPage: React.FC = () => {
  return (
    /* highlight-next-line */
    <Edit resource="posts" recordItemId={123}>
      <span>Rest of your page here</span>
    </Edit>
  );
};
// visible-block-end

render(
  <ReactRouter.BrowserRouter>
    <RefineMuiDemo
      resources={[
        {
          name: "posts",
          list: "/posts",
          edit: "/posts/edit/:id",
        },
      ]}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route
          path="/posts"
          element={
            <div style={{ padding: 16 }}>
              <ReactRouter.Outlet />
            </div>
          }
        >
          <ReactRouter.Route
            index
            element={
              <div>
                <p>This page is empty.</p>
                <RefineMui.EditButton recordItemId="123">
                  Edit Item 123
                </RefineMui.EditButton>
              </div>
            }
          />
          <ReactRouter.Route path="/posts/edit/:id" element={<CustomPage />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMuiDemo>
  </ReactRouter.BrowserRouter>,
);
```

### mutationMode

Determines which mode mutation will have while executing [`<DeleteButton>`](/core/docs/ui-integrations/material-ui/components/buttons/delete-button/).

```tsx live hideCode url=http://localhost:3000/posts/edit/123
setInitialRoutes(["/posts/edit/123"]);

// visible-block-start
import React from "react";
import { Edit, useAutocomplete } from "@refinedev/mui";
import { TextField, Autocomplete, Box } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";

const SampleEdit = () => {
  const {
    saveButtonProps,
    refineCore: { query },
    register,
    control,
    formState: { errors },
  } = useForm();

  const samplesData = query?.data?.data;

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
          slotProps={{
            InputLabelProps: { shrink: true },
          }}
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
          slotProps={{
            InputLabelProps: { shrink: true },
          }}
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
  <ReactRouter.BrowserRouter>
    <RefineMuiDemo
      resources={[
        {
          name: "posts",
          list: "/posts",
          edit: "/posts/edit/:id",
        },
      ]}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route
          path="/posts"
          element={
            <div style={{ padding: 16 }}>
              <ReactRouter.Outlet />
            </div>
          }
        >
          <ReactRouter.Route
            index
            element={
              <div>
                <p>This page is empty.</p>
                <RefineMui.EditButton recordItemId="123">
                  Edit Item 123
                </RefineMui.EditButton>
              </div>
            }
          />
          <ReactRouter.Route path="edit/:id" element={<SampleEdit />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMuiDemo>
  </ReactRouter.BrowserRouter>,
);
```

### dataProviderName

If not specified, Refine will use the default data provider. If you have multiple data providers and want to use a different one, you can use the `dataProviderName` property.

```tsx
import { Refine } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";

import { Edit } from "@refinedev/mui";

// highlight-start
const PostEdit = () => {
  return <Edit dataProviderName="other">...</Edit>;
};
// highlight-end

export const App: React.FC = () => {
  return (
    <Refine
      // highlight-start
      dataProvider={{
        default: dataProvider("https://api.fake-rest.refine.dev/"),
        other: dataProvider("https://other-api.fake-rest.refine.dev/"),
      }}
      // highlight-end
    >
      {/* ... */}
    </Refine>
  );
};
```

### goBack

To customize the back button or to disable it, you can use the `goBack` property.

```tsx live disableScroll previewHeight=320px url=http://localhost:3000/posts/edit/123
setInitialRoutes(["/posts/edit/123"]);

// visible-block-start
import { Edit } from "@refinedev/mui";
import { Button } from "@mui/material";
import { useBack } from "@refinedev/core";

const BackButton = () => {
  const goBack = useBack();

  return <Button onClick={goBack}>BACK!</Button>;
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
  <ReactRouter.BrowserRouter>
    <RefineMuiDemo
      resources={[
        {
          name: "posts",
          list: "/posts",
          edit: "/posts/edit/:id",
        },
      ]}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route
          path="/posts"
          element={
            <div style={{ padding: 16 }}>
              <ReactRouter.Outlet />
            </div>
          }
        >
          <ReactRouter.Route
            index
            element={
              <div>
                <p>This page is empty.</p>
                <RefineMui.EditButton recordItemId="123">
                  Edit Item 123
                </RefineMui.EditButton>
              </div>
            }
          />
          <ReactRouter.Route path="edit/:id" element={<PostEdit />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMuiDemo>
  </ReactRouter.BrowserRouter>,
);
```

### isLoading

To toggle the loading state of the `<Edit/>` component, you can use the `isLoading` property.

```tsx live disableScroll previewHeight=320px url=http://localhost:3000/posts/edit/123
setInitialRoutes(["/posts/edit/123"]);

// visible-block-start
import { Edit } from "@refinedev/mui";

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
  <ReactRouter.BrowserRouter>
    <RefineMuiDemo
      resources={[
        {
          name: "posts",
          list: "/posts",
          edit: "/posts/edit/:id",
        },
      ]}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route
          path="/posts"
          element={
            <div style={{ padding: 16 }}>
              <ReactRouter.Outlet />
            </div>
          }
        >
          <ReactRouter.Route
            index
            element={
              <div>
                <p>This page is empty.</p>
                <RefineMui.EditButton recordItemId="123">
                  Edit Item 123
                </RefineMui.EditButton>
              </div>
            }
          />
          <ReactRouter.Route path="edit/:id" element={<PostEdit />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMuiDemo>
  </ReactRouter.BrowserRouter>,
);
```

### breadcrumb

To customize or disable the breadcrumb, you can use the `breadcrumb` property. By default it uses the `Breadcrumb` component from `@refinedev/mui` package.

```tsx live disableScroll previewHeight=320px url=http://localhost:3000/posts/edit/123
setInitialRoutes(["/posts/edit/123"]);

// visible-block-start
import { Edit, Breadcrumb } from "@refinedev/mui";

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
  <ReactRouter.BrowserRouter>
    <RefineMuiDemo
      resources={[
        {
          name: "posts",
          list: "/posts",
          edit: "/posts/edit/:id",
        },
      ]}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route
          path="/posts"
          element={
            <div style={{ padding: 16 }}>
              <ReactRouter.Outlet />
            </div>
          }
        >
          <ReactRouter.Route
            index
            element={
              <div>
                <p>This page is empty.</p>
                <RefineMui.EditButton recordItemId="123">
                  Edit Item 123
                </RefineMui.EditButton>
              </div>
            }
          />
          <ReactRouter.Route path="edit/:id" element={<PostEdit />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMuiDemo>
  </ReactRouter.BrowserRouter>,
);
```

### wrapperProps

If you want to customize the wrapper of the `<Edit/>` component, you can use the `wrapperProps` property.

```tsx live disableScroll previewHeight=320px url=http://localhost:3000/posts/edit/123
setInitialRoutes(["/posts/edit/123"]);

// visible-block-start
import { Edit } from "@refinedev/mui";

const PostEdit: React.FC = () => {
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
  <ReactRouter.BrowserRouter>
    <RefineMuiDemo
      resources={[
        {
          name: "posts",
          list: "/posts",
          edit: "/posts/edit/:id",
        },
      ]}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route
          path="/posts"
          element={
            <div style={{ padding: 16 }}>
              <ReactRouter.Outlet />
            </div>
          }
        >
          <ReactRouter.Route
            index
            element={
              <div>
                <p>This page is empty.</p>
                <RefineMui.EditButton recordItemId="123">
                  Edit Item 123
                </RefineMui.EditButton>
              </div>
            }
          />
          <ReactRouter.Route path="edit/:id" element={<PostEdit />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMuiDemo>
  </ReactRouter.BrowserRouter>,
);
```

### headerProps

If you want to customize the header of the `<Edit/>` component, you can use the `headerProps` property.

```tsx live disableScroll previewHeight=320px url=http://localhost:3000/posts/edit/123
setInitialRoutes(["/posts/edit/123"]);

// visible-block-start
import { Edit } from "@refinedev/mui";

const PostEdit: React.FC = () => {
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
  <ReactRouter.BrowserRouter>
    <RefineMuiDemo
      resources={[
        {
          name: "posts",
          list: "/posts",
          edit: "/posts/edit/:id",
        },
      ]}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route
          path="/posts"
          element={
            <div style={{ padding: 16 }}>
              <ReactRouter.Outlet />
            </div>
          }
        >
          <ReactRouter.Route
            index
            element={
              <div>
                <p>This page is empty.</p>
                <RefineMui.EditButton recordItemId="123">
                  Edit Item 123
                </RefineMui.EditButton>
              </div>
            }
          />
          <ReactRouter.Route path="edit/:id" element={<PostEdit />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMuiDemo>
  </ReactRouter.BrowserRouter>,
);
```

### contentProps

If you want to customize the content of the `<Edit/>` component, you can use the `contentProps` property.

```tsx live disableScroll previewHeight=320px url=http://localhost:3000/posts/edit/123
setInitialRoutes(["/posts/edit/123"]);

// visible-block-start
import { Edit } from "@refinedev/mui";

const PostEdit: React.FC = () => {
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
  <ReactRouter.BrowserRouter>
    <RefineMuiDemo
      resources={[
        {
          name: "posts",
          list: "/posts",
          edit: "/posts/edit/:id",
        },
      ]}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route
          path="/posts"
          element={
            <div style={{ padding: 16 }}>
              <ReactRouter.Outlet />
            </div>
          }
        >
          <ReactRouter.Route
            index
            element={
              <div>
                <p>This page is empty.</p>
                <RefineMui.EditButton recordItemId="123">
                  Edit Item 123
                </RefineMui.EditButton>
              </div>
            }
          />
          <ReactRouter.Route path="edit/:id" element={<PostEdit />} />
        </ReactRouter.Route>{" "}
      </ReactRouter.Routes>
    </RefineMuiDemo>
  </ReactRouter.BrowserRouter>,
);
```

### headerButtons

By default, the `<Edit/>` component has a [`<ListButton>`][list-button] and a [`<RefreshButton>`][refresh-button] at the header.

You can customize the buttons at the header by using the `headerButtons` property. It accepts `React.ReactNode` or a render function `({ defaultButtons, refreshButtonProps, listButtonProps }) => React.ReactNode` which you can use to keep the existing buttons and add your own.

If "list" resource is not defined, the [`<ListButton>`][list-button] will not render and `listButtonProps` will be `undefined`.

```tsx live disableScroll previewHeight=320px url=http://localhost:3000/posts/edit/123
setInitialRoutes(["/posts/edit/123"]);

// visible-block-start
import { Edit } from "@refinedev/mui";
import { Button } from "@mui/material";

const PostEdit: React.FC = () => {
  return (
    <Edit
      // highlight-start
      headerButtons={({ defaultButtons }) => (
        <>
          {defaultButtons}
          <Button variant="contained">Custom Button</Button>
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
  <ReactRouter.BrowserRouter>
    <RefineMuiDemo
      resources={[
        {
          name: "posts",
          list: "/posts",
          edit: "/posts/edit/:id",
        },
      ]}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route
          path="/posts"
          element={
            <div style={{ padding: 16 }}>
              <ReactRouter.Outlet />
            </div>
          }
        >
          <ReactRouter.Route
            index
            element={
              <div>
                <p>This page is empty.</p>
                <RefineMui.EditButton recordItemId="123">
                  Edit Item 123
                </RefineMui.EditButton>
              </div>
            }
          />
          <ReactRouter.Route path="edit/:id" element={<PostEdit />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMuiDemo>
  </ReactRouter.BrowserRouter>,
);
```

Or, instead of using the `defaultButtons`, you can create your own buttons. If you want, you can use `refreshButtonProps` and `listButtonProps` to utilize the default values of the [`<ListButton>`][list-button] and [`<RefreshButton>`][refresh-button] components.

```tsx live disableScroll previewHeight=320px url=http://localhost:3000/posts/edit/123
setInitialRoutes(["/posts/edit/123"]);

// visible-block-start
import { Edit, ListButton, RefreshButton } from "@refinedev/mui";
import { Button } from "@mui/material";

const PostEdit: React.FC = () => {
  return (
    <Edit
      // highlight-start
      headerButtons={({ refreshButtonProps, listButtonProps }) => (
        <>
          <RefreshButton {...refreshButtonProps} meta={{ foo: "bar" }} />
          {listButtonProps && (
            <ListButton {...listButtonProps} meta={{ foo: "bar" }} />
          )}
          <Button variant="contained">Custom Button</Button>
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
  <ReactRouter.BrowserRouter>
    <RefineMuiDemo
      resources={[
        {
          name: "posts",
          list: "/posts",
          edit: "/posts/edit/:id",
        },
      ]}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route
          path="/posts"
          element={
            <div style={{ padding: 16 }}>
              <ReactRouter.Outlet />
            </div>
          }
        >
          <ReactRouter.Route path="edit/:id" element={<PostEdit />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMuiDemo>
  </ReactRouter.BrowserRouter>,
);
```

### headerButtonProps

You can customize the wrapper element of the buttons at the header by using the `headerButtonProps` property.

```tsx live disableScroll previewHeight=320px url=http://localhost:3000/posts/edit/123
setInitialRoutes(["/posts/edit/123"]);

// visible-block-start
import { Edit } from "@refinedev/mui";
import { Button } from "@mui/material";

const PostEdit: React.FC = () => {
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
  <ReactRouter.BrowserRouter>
    <RefineMuiDemo
      resources={[
        {
          name: "posts",
          list: "/posts",
          edit: "/posts/edit/:id",
        },
      ]}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route
          path="/posts"
          element={
            <div style={{ padding: 16 }}>
              <ReactRouter.Outlet />
            </div>
          }
        >
          <ReactRouter.Route
            index
            element={
              <div>
                <p>This page is empty.</p>
                <RefineMui.EditButton recordItemId="123">
                  Edit Item 123
                </RefineMui.EditButton>
              </div>
            }
          />
          <ReactRouter.Route path="edit/:id" element={<PostEdit />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMuiDemo>
  </ReactRouter.BrowserRouter>,
);
```

> For more information, refer to the [`Box` documentation from Material UI &#8594](https://mui.com/material-ui/api/box/)

### footerButtons

By default, the `<Edit/>` component has a [`<SaveButton>`][save-button] and a [`<DeleteButton>`][delete-button] at the footer.

You can customize the buttons at the footer by using the `footerButtons` property. It accepts `React.ReactNode` or a render function `({ defaultButtons, saveButtonProps, deleteButtonProps }) => React.ReactNode` which you can use to keep the existing buttons and add your own.

If [`canDelete`](#candelete-and-deletebuttonprops) is `false`, the [`<DeleteButton>`][delete-button] will not render and `deleteButtonProps` will be `undefined`.

```tsx live disableScroll previewHeight=320px url=http://localhost:3000/posts/edit/123
setInitialRoutes(["/posts/edit/123"]);

// visible-block-start
import { Edit } from "@refinedev/mui";
import { Button } from "@mui/material";

const PostEdit: React.FC = () => {
  return (
    <Edit
      // highlight-start
      footerButtons={({ defaultButtons }) => (
        <>
          {defaultButtons}
          <Button variant="contained">Custom Button</Button>
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
  <ReactRouter.BrowserRouter>
    <RefineMuiDemo
      resources={[
        {
          name: "posts",
          list: "/posts",
          edit: "/posts/edit/:id",
        },
      ]}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route
          path="/posts"
          element={
            <div style={{ padding: 16 }}>
              <ReactRouter.Outlet />
            </div>
          }
        >
          <ReactRouter.Route
            index
            element={
              <div>
                <p>This page is empty.</p>
                <RefineMui.EditButton recordItemId="123">
                  Edit Item 123
                </RefineMui.EditButton>
              </div>
            }
          />
          <ReactRouter.Route path="edit/:id" element={<PostEdit />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMuiDemo>
  </ReactRouter.BrowserRouter>,
);
```

Or, instead of using the `defaultButtons`, you can create your own buttons. If you want, you can use `saveButtonProps` and `deleteButtonProps` to utilize the default values of the [`<SaveButton>`][save-button] and [`<DeleteButton>`][delete-button] components.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/edit/123
setInitialRoutes(["/posts/edit/123"]);

// visible-block-start
import { Edit, SaveButton, DeleteButton } from "@refinedev/mui";
import { Button } from "@mui/material";

const PostEdit: React.FC = () => {
  const [loading, setLoading] = React.useState(true);

  return (
    <Edit
      // highlight-start
      footerButtons={({ saveButtonProps, deleteButtonProps }) => (
        <>
          <Button type="primary">Custom Button</Button>
          <SaveButton {...saveButtonProps} hideText />
          {deleteButtonProps && (
            <DeleteButton {...deleteButtonProps} hideText />
          )}
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
  <ReactRouter.BrowserRouter>
    <RefineMuiDemo
      initialRoutes={["/posts", "/posts/edit/123"]}
      resources={[
        {
          name: "posts",
          list: "/posts",
          edit: "/posts/edit/:id",
        },
      ]}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route
          path="/posts"
          element={
            <div style={{ padding: 16 }}>
              <ReactRouter.Outlet />
            </div>
          }
        >
          <ReactRouter.Route
            index
            element={
              <div>
                <p>This page is empty.</p>
                <RefineMui.EditButton recordItemId="123">
                  Edit Item 123
                </RefineMui.EditButton>
              </div>
            }
          />
          <ReactRouter.Route path="edit/:id" element={<PostEdit />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMuiDemo>
  </ReactRouter.BrowserRouter>,
);
```

### footerButtonProps

You can customize the wrapper element of the buttons at the footer by using the `footerButtonProps` property.

```tsx live disableScroll previewHeight=320px url=http://localhost:3000/posts/edit/123
setInitialRoutes(["/posts/edit/123"]);

// visible-block-start
import { Edit } from "@refinedev/mui";
import { Button } from "@mui/material";

const PostEdit: React.FC = () => {
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
          <Button variant="contained">Custom Button</Button>
        </>
      )}
    >
      <span>Rest of your page here</span>
    </Edit>
  );
};
// visible-block-end

render(
  <ReactRouter.BrowserRouter>
    <RefineMuiDemo
      resources={[
        {
          name: "posts",
          list: "/posts",
          edit: "/posts/edit/:id",
        },
      ]}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route
          path="/posts"
          element={
            <div style={{ padding: 16 }}>
              <ReactRouter.Outlet />
            </div>
          }
        >
          <ReactRouter.Route
            index
            element={
              <div>
                <p>This page is empty.</p>
                <RefineMui.EditButton recordItemId="123">
                  Edit Item 123
                </RefineMui.EditButton>
              </div>
            }
          />
          <ReactRouter.Route path="edit/:id" element={<PostEdit />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMuiDemo>
  </ReactRouter.BrowserRouter>,
);
```

### autoSaveProps

You can use the auto save feature of the `<Edit/>` component by using the `autoSaveProps` property.

```tsx live url=http://localhost:3000/posts/edit/123
setInitialRoutes(["/posts/edit/123"]);

// visible-block-start
import React from "react";
import { Edit, useAutocomplete } from "@refinedev/mui";
import { TextField, Autocomplete, Box } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";

const SampleEdit = () => {
  const {
    saveButtonProps,
    refineCore: {
      query,
      // highlight-next-line
      autoSaveProps,
    },
    register,
    control,
    formState: { errors },
  } = useForm({
    // highlight-start
    refineCoreProps: {
      autoSave: {
        enabled: true,
      },
    },
    // highlight-end
  });

  const samplesData = query?.data?.data;

  const { autocompleteProps: categoryAutocompleteProps } = useAutocomplete({
    resource: "categories",
    defaultValue: samplesData?.category?.id,
  });

  return (
    <Edit
      saveButtonProps={saveButtonProps}
      // highlight-next-line
      autoSaveProps={autoSaveProps}
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
          slotProps={{
            InputLabelProps: { shrink: true },
          }}
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
          slotProps={{
            InputLabelProps: { shrink: true },
          }}
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
  <ReactRouter.BrowserRouter>
    <RefineMuiDemo
      resources={[
        {
          name: "posts",
          list: "/posts",
          edit: "/posts/edit/:id",
        },
      ]}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route
          path="/posts"
          element={
            <div style={{ padding: 16 }}>
              <ReactRouter.Outlet />
            </div>
          }
        >
          <ReactRouter.Route
            index
            element={
              <div>
                <p>This page is empty.</p>
                <RefineMui.EditButton recordItemId="123">
                  Edit Item 123
                </RefineMui.EditButton>
              </div>
            }
          />
          <ReactRouter.Route path="edit/:id" element={<SampleEdit />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMuiDemo>
  </ReactRouter.BrowserRouter>,
);
```

## API Reference

### Properties

<PropsTable module="@refinedev/mui/Edit"
wrapperProps-type="[`CardProps`](https://mui.com/material-ui/api/card/#props)"
contentProps-type="[`CardContentProps`](https://mui.com/material-ui/api/card-content/#props)"
headerProps-type="[`CardHeaderProps`](https://mui.com/material-ui/api/card-header/#props)"
headerButtons-default="[`ListButton`](/core/docs/ui-integrations/material-ui/components/buttons/list-button/) and [`RefreshButton`](/core/docs/ui-integrations/material-ui/components/buttons/refresh-button/)"
headerButtonProps-type="[`BoxProps`](https://mui.com/material-ui/api/box/#props)"
deleteButtonProps-type="[`DeleteButtonProps`](/core/docs/ui-integrations/material-ui/components/buttons/delete-button/)"
saveButtonProps-type="[`SaveButtonProps`](/core/docs/ui-integrations/material-ui/components/buttons/save-button/)"
footerButtons-default="[`SaveButton`](/core/docs/ui-integrations/material-ui/components/buttons/save-button/) and [`DeleteButton`](/core/docs/ui-integrations/material-ui/components/buttons/delete-button/)"
footerButtonsProps-type="[`CardActionsProps`](https://mui.com/material-ui/api/card-actions/#props)"
breadcrumb-default="[`<Breadcrumb/>`](/core/docs/ui-integrations/material-ui/components/breadcrumb/)"
goBack-default="`<ArrowLeft />`"
goBack-type="`ReactNode`"
/>

[list-button]: /core/docs/ui-integrations/material-ui/components/buttons/list-button
[refresh-button]: /core/docs/ui-integrations/material-ui/components/buttons/refresh-button
[save-button]: /core/docs/ui-integrations/material-ui/components/buttons/save-button
[delete-button]: /core/docs/ui-integrations/material-ui/components/buttons/delete-button
