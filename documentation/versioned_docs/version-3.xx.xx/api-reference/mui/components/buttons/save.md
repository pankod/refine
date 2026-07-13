---
id: save-button
title: Save
swizzle: true
---

`<SaveButton>` uses Material UI [`<Button>`](https://mui.com/material-ui/react-button/) component. It uses it for presantation purposes only. Some of the hooks that **refine** has adds features to this button.

:::info-tip Swizzle
You can swizzle this component to customize it with the [**refine CLI**](/core/docs/3.xx.xx/packages/documentation/cli)
:::

## Usage

For example, let's add logic to the `<SaveButton>` component with the `saveButtonProps` returned by the [`useForm`](/core/docs/3.xx.xx/api-reference/core/hooks/useForm) hook.

```tsx live url=http://localhost:3000/posts previewHeight=340px
// visible-block-start
import { useForm } from "@pankod/refine-react-hook-form";
import { Edit, Box, TextField } from "@pankod/refine-mui";

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
  <RefineMuiDemo
    initialRoutes={["/posts/edit/123"]}
    resources={[
      {
        name: "posts",
        edit: PostEdit,
      },
    ]}
  />,
);
```

The `useForm` hook exposes `saveButtonProps` to be passed to `<SaveButton>` component which includes submitting the form action, button loading, and disable states.

## Properties

### `hideText`

It is used to show and not show the text of the button. When `true`, only the button icon is visible.

```tsx live disableScroll previewHeight=120px
const { useRouterContext } = RefineCore;

// visible-block-start
import { SaveButton } from "@pankod/refine-mui";

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
  <RefineMuiDemo
    initialRoutes={["/"]}
    resources={[
      {
        name: "posts",
        list: MySaveComponent,
      },
    ]}
    DashboardPage={MySaveComponent}
  />,
);
```

## API Reference

### Properties

<PropsTable module="@pankod/refine-mui/SaveButton" />

:::tip External Props
It also accepts all props of Material UI [Button](https://mui.com/material-ui/api/button/).
:::
