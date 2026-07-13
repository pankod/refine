---
id: save-button
title: Save
swizzle: true
---

`<SaveButton>` uses Ant Design's [`<Button>`](https://ant.design/components/button/) component. It uses it for presantation purposes only. Some of the hooks that **refine** has adds features to this button.

:::info-tip Swizzle
You can swizzle this component to customize it with the [**refine CLI**](/core/docs/3.xx.xx/packages/documentation/cli)
:::

## Usage

For example, let's add logic to the `<SaveButton>` component with the `saveButtonProps` returned by the [`useForm`](/core/docs/3.xx.xx/api-reference/antd/hooks/form/useForm) hook.

```tsx live url=http://localhost:3000/posts/edit/123
// visible-block-start
import { Edit, Form, Input, useForm } from "@pankod/refine-antd";

const PostEdit: React.FC = () => {
  // highlight-next-line
  const { formProps, saveButtonProps } = useForm<IPost>();

  return (
    // highlight-next-line
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Title"
          name="title"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Edit>
  );
};

interface IPost {
  id: number;
  title: string;
}
// visible-block-end

render(
  <RefineAntdDemo
    initialRoutes={["/posts/edit/123"]}
    resources={[
      {
        name: "posts",
        edit: PostEdit,
        list: () => {
          return (
            <RefineAntd.List>
              <p>Your list page here</p>
            </RefineAntd.List>
          );
        },
      },
    ]}
  />,
);
```

The [`useForm`](/core/docs/3.xx.xx/api-reference/antd/hooks/form/useForm) hook exposes `saveButtonProps` to be passed to `<SaveButton>` component which includes submitting the form action, button loading, and disable states.

## Properties

### `hideText`

It is used to show and not show the text of the button. When `true`, only the button icon is visible.

```tsx live disableScroll previewHeight=120px
// visible-block-start
import { SaveButton } from "@pankod/refine-antd";

const MySaveComponent = () => {
  return (
    <SaveButton
      // highlight-next-line
      hideText
    />
  );
};
// visible-block-end

render(
  <RefineAntdDemo
    initialRoutes={["/"]}
    resources={[
      {
        name: "posts",
        list: MySaveComponent,
      },
    ]}
  />,
);
```

## API Reference

### Properties

<PropsTable module="@pankod/refine-antd/SaveButton" />

:::tip External Props
It also accepts all props of Ant Design [Button](https://ant.design/components/button/#API).
:::
