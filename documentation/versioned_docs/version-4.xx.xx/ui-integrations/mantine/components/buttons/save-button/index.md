---
title: "Mantine Save Button | Refine v4 Form Actions"
display_title: "Save"
sidebar_label: "Save"
description: "Master form submissions with the Mantine Save Button. Documentation on handling loading states and save logic in Refine v4."
swizzle: true
---

```tsx live shared
import * as React from "react";

const EditPage = () => {
  const { list } = RefineCore.useNavigation();
  const params = RefineCore.useParsed();

  return (
    <div>
      <MantineCore.Text italic color="dimmed" size="sm">
        URL Parameters:
      </MantineCore.Text>
      <MantineCore.Code>{JSON.stringify(params, null, 2)}</MantineCore.Code>
      <MantineCore.Space h="md" />
      <MantineCore.Button
        size="xs"
        variant="outline"
        onClick={() => list("posts")}
      >
        Go back
      </MantineCore.Button>
    </div>
  );
};
```

`<SaveButton>` uses Mantine [`<Button>`](https://mantine.dev/core/button) component. It uses it for presentation purposes only. Some of the hooks that Refine has adds features to this button.

:::simple Good to know

You can swizzle this component with the [**Refine CLI**](/core/docs/packages/list-of-packages) to customize it.

:::

## Usage

For example, let's add logic to the `<SaveButton>` component with the `saveButtonProps` returned by the [`useForm`](/core/docs/ui-integrations/mantine/hooks/use-form) hook.

```tsx live url=http://localhost:3000/posts/edit/123 previewHeight=420px hideCode
setInitialRoutes(["/posts/edit/123"]);
import * as React from "react";

// visible-block-start
import { Edit, useForm, useSelect } from "@refinedev/mantine";
import { Select, TextInput } from "@mantine/core";

const PostEdit: React.FC = () => {
  const {
    // highlight-next-line
    saveButtonProps,
    getInputProps,
    refineCore: { queryResult },
  } = useForm<IPost>({
    initialValues: {
      title: "",
      status: "",
      category: {
        id: "",
      },
    },
    validate: {
      title: (value) => (value.length < 2 ? "Too short title" : null),
      status: (value) => (value.length <= 0 ? "Status is required" : null),
      category: {
        id: (value) => (value.length <= 0 ? "Category is required" : null),
      },
    },
  });

  const postData = queryResult?.data?.data;
  const { selectProps } = useSelect<ICategory>({
    resource: "categories",
    defaultValue: postData?.category.id,
  });

  return (
    // highlight-next-line
    <Edit saveButtonProps={saveButtonProps}>
      <form>
        <TextInput
          mt={8}
          label="Title"
          placeholder="Title"
          {...getInputProps("title")}
        />
        <Select
          mt={8}
          label="Status"
          placeholder="Pick one"
          {...getInputProps("status")}
          data={[
            { label: "Published", value: "published" },
            { label: "Draft", value: "draft" },
            { label: "Rejected", value: "rejected" },
          ]}
        />
        <Select
          mt={8}
          label="Category"
          placeholder="Pick one"
          {...getInputProps("category.id")}
          {...selectProps}
        />
      </form>
    </Edit>
  );
};
// visible-block-end

interface ICategory {
  id: number;
  title: string;
}

interface IPost {
  id: number;
  title: string;
  status: "published" | "draft" | "rejected";
  category: { id: number };
}

render(
  <ReactRouter.BrowserRouter>
    <RefineMantineDemo
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
                <MantineCore.Button
                  component={RefineCore.Link}
                  to="/posts/edit/123"
                  variant="light"
                >
                  Edit Item 123
                </MantineCore.Button>
              </div>
            }
          />
          <ReactRouter.Route path="edit/:id" element={<PostEdit />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMantineDemo>
  </ReactRouter.BrowserRouter>,
);
```

## Properties

### hideText

`hideText` is used to show and not show the text of the button. When `true`, only the button icon is visible.

```tsx live url=http://localhost:3000 previewHeight=200px
setInitialRoutes(["/posts"]);
import * as React from "react";

// visible-block-start
import { SaveButton } from "@refinedev/mantine";

const MySaveComponent = () => {
  return <SaveButton hideText />;
};
// visible-block-end

render(
  <ReactRouter.BrowserRouter>
    <RefineMantineDemo
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
    </RefineMantineDemo>
  </ReactRouter.BrowserRouter>,
);
```

## API Reference

### Properties

<PropsTable module="@refinedev/mantine/SaveButton" />
