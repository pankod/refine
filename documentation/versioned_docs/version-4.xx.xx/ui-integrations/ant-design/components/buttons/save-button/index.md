---
title: "Ant Design Save Button | Refine v4 Form Actions"
display_title: "Save"
sidebar_label: "Save"
description: "Master form submissions with the Save Button. Learn about loading states and success/error handling in Refine v4 with Ant Design components."
swizzle: true
---

`<SaveButton>` uses Ant Design's [`<Button>`](https://ant.design/components/button/) component. It uses it for presantation purposes only. Some of the hooks that Refine has adds features to this button.

:::simple Good to know

You can swizzle this component to customize it with the [**Refine CLI**](/core/docs/packages/list-of-packages)

:::

## Usage

Let's add logic to the `<SaveButton>` component with the `saveButtonProps` returned by the [`useForm`](/core/docs/ui-integrations/ant-design/hooks/use-form) hook:

```tsx live previewHeight=360px
setInitialRoutes(["/posts/edit/123"]);

// visible-block-start
import { Edit, useForm } from "@refinedev/antd";
import { Form, Input } from "antd";

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
  <ReactRouter.BrowserRouter>
    <RefineAntdDemo
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
          <ReactRouter.Route index element={<div>List page here...</div>} />
          <ReactRouter.Route path="edit/:id" element={<PostEdit />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineAntdDemo>
  </ReactRouter.BrowserRouter>,
);
```

The [`useForm`](/core/docs/ui-integrations/ant-design/hooks/use-form) hook exposes `saveButtonProps` to be passed to the `<SaveButton>` component which includes submitting the form action, button loading, and disable states.

## Properties

### hideText

`hideText` is used to hide the text of the button. When its `true`, only the button icon will be visible.

```tsx live previewHeight=120px
setInitialRoutes(["/posts"]);

// visible-block-start
import { SaveButton } from "@refinedev/antd";

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
  <ReactRouter.BrowserRouter>
    <RefineAntdDemo
      resources={[
        {
          name: "posts",
          list: "/posts",
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
          <ReactRouter.Route index element={<MySaveComponent />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineAntdDemo>
  </ReactRouter.BrowserRouter>,
);
```

## API Reference

### Properties

<PropsTable module="@refinedev/antd/SaveButton" />

:::simple External Props

`<SaveButton>` also accepts all props of Ant Design's [Button](https://ant.design/components/button/#API) component.

:::
