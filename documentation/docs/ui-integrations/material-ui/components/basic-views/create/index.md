---
title: "MUI Create Component | UI Component in Refine v5"
display_title: "Create"
sidebar_label: "Create"
description: "Learn to integrate Create in Refine v5. Learn integrate hide for polished admin UIs. See practical code samples. Fast to follow."
swizzle: true
---

`<Create>` provides us a layout to display the page. It does not contain any logic and just adds extra functionalities like action buttons and giving titles to the page.

We will show what `<Create>` does using properties with examples.

```tsx live hideCode url=http://localhost:3000/posts/create
setInitialRoutes(["/posts/create"]);

// visible-block-start
import React from "react";
import { Create, useAutocomplete } from "@refinedev/mui";
import { Autocomplete, Box, TextField } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";
import { Breadcrumb } from "@refinedev/mui";
import { useState } from "react";

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
          slotProps={{
            InputLabelProps: { shrink: true },
          }}
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
          slotProps={{
            InputLabelProps: { shrink: true },
          }}
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
      <Breadcrumb />
    </Create>
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
          create: "/posts/create",
        },
        {
          name: "categories",
          list: "/categories",
          create: "/categories/create",
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
                <RefineMui.CreateButton />
              </div>
            }
          />
          <ReactRouter.Route path="create" element={<SampleCreate />} />
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

You can customize the title of the `<Create/>` component by using the `title` property.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/create
setInitialRoutes(["/posts/create"]);

// visible-block-start
import { Create } from "@refinedev/mui";

const PostCreate: React.FC = () => {
  return (
    <Create
      // highlight-next-line
      title="Custom Title"
    >
      <span>Rest of your page here</span>
    </Create>
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
          create: "/posts/create",
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
                <RefineMui.CreateButton />
              </div>
            }
          />
          <ReactRouter.Route path="create" element={<PostCreate />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMuiDemo>
  </ReactRouter.BrowserRouter>,
);
```

### resource

`resource` property determines which resource to use for the form. By default, it uses the resource from the route. If you want to use a different resource, you can use the `resource` property.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/create
setInitialRoutes(["/posts/create"]);

// visible-block-start
import { Create } from "@refinedev/mui";

const PostCreate: React.FC = () => {
  return (
    <Create
      // highlight-next-line
      resource="categories"
    >
      <span>Rest of your page here</span>
    </Create>
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
          create: "/posts/create",
        },
        {
          name: "categories",
          list: "/categories",
          create: "/categories/create",
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
                <RefineMui.CreateButton />
              </div>
            }
          />
          <ReactRouter.Route path="create" element={<PostCreate />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMuiDemo>
  </ReactRouter.BrowserRouter>,
);
```

### saveButtonProps

You can customize the save button by using the `saveButtonProps` property.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/create
setInitialRoutes(["/posts/create"]);

// visible-block-start
import { Create } from "@refinedev/mui";

const PostCreate: React.FC = () => {
  return (
    <Create
      // highlight-start
      saveButtonProps={{
        size: "large",
        variant: "contained",
        color: "secondary",
      }}
      // highlight-end
    >
      <span>Rest of your page here</span>
    </Create>
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
          create: "/posts/create",
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
                <RefineMui.CreateButton />
              </div>
            }
          />
          <ReactRouter.Route path="create" element={<PostCreate />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMuiDemo>
  </ReactRouter.BrowserRouter>,
);
```

> For more information, refer to the [`<SaveButton>` documentation &#8594](/core/docs/ui-integrations/material-ui/components/buttons/save-button/)

### goBack

`goBack` property determines whether to display a back button in the header. If you want to hide the back button, you can set `goBack` to `false`.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/create
setInitialRoutes(["/posts/create"]);

// visible-block-start
import { Create } from "@refinedev/mui";

const PostCreate: React.FC = () => {
  return (
    <Create
      // highlight-next-line
      goBack={false}
    >
      <span>Rest of your page here</span>
    </Create>
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
          create: "/posts/create",
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
                <RefineMui.CreateButton />
              </div>
            }
          />
          <ReactRouter.Route path="create" element={<PostCreate />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMuiDemo>
  </ReactRouter.BrowserRouter>,
);
```

### isLoading

To show a loading state, you can use the `isLoading` property.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/create
setInitialRoutes(["/posts/create"]);

// visible-block-start
import { Create } from "@refinedev/mui";
import { useState } from "react";

const PostCreate: React.FC = () => {
  const [loading, setLoading] = useState(true);

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
  <ReactRouter.BrowserRouter>
    <RefineMuiDemo
      resources={[
        {
          name: "posts",
          list: "/posts",
          create: "/posts/create",
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
                <RefineMui.CreateButton />
              </div>
            }
          />
          <ReactRouter.Route path="create" element={<PostCreate />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMuiDemo>
  </ReactRouter.BrowserRouter>,
);
```

### breadcrumb

To customize or disable the breadcrumb, you can use the `breadcrumb` property. By default, it uses the `Breadcrumb` component from `@refinedev/mui` package.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/create
setInitialRoutes(["/posts/create"]);

// visible-block-start
import { Create } from "@refinedev/mui";
import { Breadcrumb } from "@refinedev/mui";

const PostCreate: React.FC = () => {
  return (
    <Create
      // highlight-start
      breadcrumb={
        <div
          style={{
            padding: "3px 6px",
            border: "2px dashed #888",
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
  <ReactRouter.BrowserRouter>
    <RefineMuiDemo
      resources={[
        {
          name: "posts",
          list: "/posts",
          create: "/posts/create",
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
                <RefineMui.CreateButton />
              </div>
            }
          />
          <ReactRouter.Route path="create" element={<PostCreate />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMuiDemo>
  </ReactRouter.BrowserRouter>,
);
```

> For more information, refer to the [`Breadcrumb` documentation &#8594](/core/docs/ui-integrations/material-ui/components/breadcrumb/)

### wrapperProps

If you want to customize the wrapper of the `<Create/>` component, you can use the `wrapperProps` property.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/create
setInitialRoutes(["/posts/create"]);

// visible-block-start
import { Create } from "@refinedev/mui";

const PostCreate: React.FC = () => {
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
  <ReactRouter.BrowserRouter>
    <RefineMuiDemo
      resources={[
        {
          name: "posts",
          list: "/posts",
          create: "/posts/create",
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
                <RefineMui.CreateButton />
              </div>
            }
          />
          <ReactRouter.Route path="create" element={<PostCreate />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMuiDemo>
  </ReactRouter.BrowserRouter>,
);
```

> For more information, refer to the [`Card` documentation from Material UI &#8594](https://mui.com/material-ui/api/card/)

### headerProps

If you want to customize the header of the `<Create/>` component, you can use the `headerProps` property.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/create
setInitialRoutes(["/posts/create"]);

// visible-block-start
import { Create } from "@refinedev/mui";

const PostCreate: React.FC = () => {
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
  <ReactRouter.BrowserRouter>
    <RefineMuiDemo
      resources={[
        {
          name: "posts",
          list: "/posts",
          create: "/posts/create",
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
                <RefineMui.CreateButton />
              </div>
            }
          />
          <ReactRouter.Route path="create" element={<PostCreate />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMuiDemo>
  </ReactRouter.BrowserRouter>,
);
```

> For more information, refer to the [`CardHeader` documentation from Material UI &#8594](https://mui.com/material-ui/api/card-header/)

### contentProps

If you want to customize the content of the `<Create/>` component, you can use the `contentProps` property.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/create
setInitialRoutes(["/posts/create"]);

// visible-block-start
import { Create } from "@refinedev/mui";

const PostCreate: React.FC = () => {
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
  <ReactRouter.BrowserRouter>
    <RefineMuiDemo
      resources={[
        {
          name: "posts",
          list: "/posts",
          create: "/posts/create",
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
                <RefineMui.CreateButton />
              </div>
            }
          />
          <ReactRouter.Route path="create" element={<PostCreate />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMuiDemo>
  </ReactRouter.BrowserRouter>,
);
```

> For more information, refer to the [`CardContent` documentation from Material UI &#8594](https://mui.com/material-ui/api/card-content/)

### headerButtons

You can customize the buttons at the header by using the `headerButtons` property. It accepts `false` or a function that returns `ReactNode`.

By default, the `<Create/>` component has a `list` button in the header.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/create
setInitialRoutes(["/posts/create"]);

// visible-block-start
import { Create } from "@refinedev/mui";
import { Button } from "@mui/material";

const PostCreate: React.FC = () => {
  return (
    <Create
      // highlight-start
      headerButtons={({ defaultButtons }) => (
        <>
          {defaultButtons}
          <Button
            variant="contained"
            onClick={() => {
              console.log("Custom button clicked");
            }}
          >
            Custom Button
          </Button>
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
  <ReactRouter.BrowserRouter>
    <RefineMuiDemo
      resources={[
        {
          name: "posts",
          list: "/posts",
          create: "/posts/create",
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
                <RefineMui.CreateButton />
              </div>
            }
          />
          <ReactRouter.Route path="create" element={<PostCreate />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMuiDemo>
  </ReactRouter.BrowserRouter>,
);
```

### headerButtonProps

You can customize the list button at the header by using the `headerButtonProps` property.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/create
setInitialRoutes(["/posts/create"]);

// visible-block-start
import { Create } from "@refinedev/mui";

const PostCreate: React.FC = () => {
  return (
    <Create
      // highlight-start
      headerButtonProps={{
        listButtonProps: {
          size: "large",
          variant: "contained",
          color: "secondary",
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
  <ReactRouter.BrowserRouter>
    <RefineMuiDemo
      resources={[
        {
          name: "posts",
          list: "/posts",
          create: "/posts/create",
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
                <RefineMui.CreateButton />
              </div>
            }
          />
          <ReactRouter.Route path="create" element={<PostCreate />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMuiDemo>
  </ReactRouter.BrowserRouter>,
);
```

### footerButtons

You can customize the buttons at the footer by using the `footerButtons` property. It accepts `false` or a function that returns `ReactNode`.

By default, the `<Create/>` component has a `save` button at the footer.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/create
setInitialRoutes(["/posts/create"]);

// visible-block-start
import { Create } from "@refinedev/mui";
import { Button } from "@mui/material";

const PostCreate: React.FC = () => {
  return (
    <Create
      // highlight-start
      footerButtons={({ defaultButtons }) => (
        <>
          {defaultButtons}
          <Button
            variant="contained"
            onClick={() => {
              console.log("Custom button clicked");
            }}
          >
            Custom Button
          </Button>
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
  <ReactRouter.BrowserRouter>
    <RefineMuiDemo
      resources={[
        {
          name: "posts",
          list: "/posts",
          create: "/posts/create",
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
                <RefineMui.CreateButton />
              </div>
            }
          />
          <ReactRouter.Route path="create" element={<PostCreate />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMuiDemo>
  </ReactRouter.BrowserRouter>,
);
```

### footerButtonProps

You can customize the save button at the footer by using the `footerButtonProps` property.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/create
setInitialRoutes(["/posts/create"]);

// visible-block-start
import { Create } from "@refinedev/mui";

const PostCreate: React.FC = () => {
  return (
    <Create
      // highlight-start
      footerButtonProps={{
        saveButtonProps: {
          size: "large",
          variant: "contained",
          color: "secondary",
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
  <ReactRouter.BrowserRouter>
    <RefineMuiDemo
      resources={[
        {
          name: "posts",
          list: "/posts",
          create: "/posts/create",
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
                <RefineMui.CreateButton />
              </div>
            }
          />
          <ReactRouter.Route path="create" element={<PostCreate />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMuiDemo>
  </ReactRouter.BrowserRouter>,
);
```

### footerProps

If you want to customize the footer of the `<Create/>` component, you can use the `footerProps` property.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/create
setInitialRoutes(["/posts/create"]);

// visible-block-start
import { Create } from "@refinedev/mui";

const PostCreate: React.FC = () => {
  return (
    <Create
      // highlight-start
      footerProps={{
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
  <ReactRouter.BrowserRouter>
    <RefineMuiDemo
      resources={[
        {
          name: "posts",
          list: "/posts",
          create: "/posts/create",
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
                <RefineMui.CreateButton />
              </div>
            }
          />
          <ReactRouter.Route path="create" element={<PostCreate />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMuiDemo>
  </ReactRouter.BrowserRouter>,
);
```

## API Reference

### Properties

<PropsTable module="@refinedev/mui/Create" goBack-default="`<ArrowLeft />`"/>

```tsx live shared
const SampleList = () => {
  const { dataGridProps } = RefineMui.useDataGrid();

  const {
    result: categoryData,
    query: { isLoading: categoryIsLoading },
  } = RefineCore.useMany({
    resource: "categories",
    ids: dataGridProps?.rows?.map((item: any) => item?.category?.id) ?? [],
    queryOptions: {
      enabled: !!dataGridProps?.rows,
    },
  });

  const columns = React.useMemo<GridColDef<any>[]>(
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
        display: "flex",
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
        display: "flex",
        renderCell: function render({ value }) {
          return <RefineMui.DateField value={value} />;
        },
      },
    ],
    [categoryData?.data],
  );

  return (
    <RefineMui.List>
      <MuiXDataGrid.DataGrid {...dataGridProps} columns={columns} />
    </RefineMui.List>
  );
};
```

[save-button]: /core/docs/ui-integrations/material-ui/components/buttons/save-button
