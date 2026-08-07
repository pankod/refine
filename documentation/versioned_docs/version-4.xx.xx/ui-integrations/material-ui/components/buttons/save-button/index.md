---
title: "MUI Save Button | Refine v4 Form Actions"
display_title: "Save"
sidebar_label: "Save"
description: "Master form submissions with the MUI Save Button. Documentation on handling loading states and form logic in Refine v4 with Material UI."
swizzle: true
---

`<SaveButton>` uses Material UI's [`<Button>`](https://mui.com/material-ui/react-button/) component. It uses it for presantation purposes only. Some of the hooks that Refine has adds features to this button.

:::simple Good to know

You can swizzle this component with the [**Refine CLI**](/core/docs/packages/list-of-packages) to customize it.

:::

## Usage

For example, let's add logic to the `<SaveButton>` component with the `saveButtonProps` returned by the [`useForm`](/core/docs/data/hooks/use-form) hook.

```tsx live url=http://localhost:3000/posts previewHeight=340px
setInitialRoutes(["/posts/edit/123"]);

// visible-block-start
import { useForm } from "@refinedev/react-hook-form";
import { Edit } from "@refinedev/mui";
import { Box, TextField } from "@mui/material";

const PostEdit: React.FC = () => {
  const {
    refineCore: { onFinish, formLoading },
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICategory>();

  return (
    <Edit
      isLoading={formLoading}
      // highlight-next-line
      saveButtonProps={{ onClick: handleSubmit(onFinish) }}
    >
      <Box component="form">
        <TextField
          {...register("title", { required: true })}
          error={!!errors?.title}
          helperText={errors?.title?.message}
          margin="normal"
          required
          fullWidth
          id="title"
          label="Title"
          name="title"
          defaultValue={" "}
        />
      </Box>
    </Edit>
  );
};

interface ICategory {
  id: number;
  title: string;
}
// visible-block-end

render(
  <ReactRouter.BrowserRouter>
    <RefineMuiDemo
      resources={[
        {
          name: "posts",
          edit: PostEdit,
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

The `useForm` hook exposes `saveButtonProps` to be passed to `<SaveButton>` component which includes submitting the form action, button loading, and disable states.

## Properties

### hideText

`hideText` is used to show or hide the text of the button. When `true`, only the button icon is visible.

```tsx live disableScroll previewHeight=120px
setInitialRoutes(["/"]);

// visible-block-start
import { SaveButton } from "@refinedev/mui";

const MySaveComponent = () => {
  return (
    <SaveButton
      // highlight-next-line
      hideText={true}
    />
  );
};
// visible-block-end

render(
  <ReactRouter.BrowserRouter>
    <RefineMuiDemo
      resources={[
        {
          name: "posts",
          list: MySaveComponent,
        },
      ]}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route
          path="/"
          element={
            <div style={{ padding: 16 }}>
              <MySaveComponent />
            </div>
          }
        />
      </ReactRouter.Routes>
    </RefineMuiDemo>
  </ReactRouter.BrowserRouter>,
);
```

## API Reference

### Properties

<PropsTable module="@refinedev/mui/SaveButton" />

:::simple External Props

It also accepts all props of Material UI [Button](https://mui.com/material-ui/api/button/).

:::
