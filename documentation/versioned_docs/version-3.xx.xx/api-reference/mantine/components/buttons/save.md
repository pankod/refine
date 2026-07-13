---
id: save-button
title: Save
swizzle: true
---

```tsx live shared
const { default: routerProvider } = RefineReactRouterV6;
const { default: simpleRest } = RefineSimpleRest;
setRefineProps({
  routerProvider,
  dataProvider: simpleRest("https://api.fake-rest.refine.dev"),
  notificationProvider: RefineMantine.useNotificationProvider,
  Layout: RefineMantine.Layout,
  Sider: () => null,
  catchAll: <RefineMantine.ErrorComponent />,
});

const Wrapper = ({ children }) => {
  return (
    <RefineMantine.MantineProvider
      theme={RefineMantine.LightTheme}
      withNormalizeCSS
      withGlobalStyles
    >
      <RefineMantine.Global
        styles={{ body: { WebkitFontSmoothing: "auto" } }}
      />
      <RefineMantine.NotificationsProvider position="top-right">
        {children}
      </RefineMantine.NotificationsProvider>
    </RefineMantine.MantineProvider>
  );
};
```

`<SaveButton>` uses Mantine [`<Button>`](https://mantine.dev/core/button) component. It uses it for presantation purposes only. Some of the hooks that **refine** has adds features to this button.

:::info-tip Swizzle
You can swizzle this component to customize it with the [**refine CLI**](/core/docs/3.xx.xx/packages/documentation/cli)
:::

## Usage

For example, let's add logic to the `<SaveButton>` component with the `saveButtonProps` returned by the [`useForm`](/core/docs/3.xx.xx/api-reference/mantine/hooks/form/useForm) hook.

```tsx live url=http://localhost:3000/posts/edit/123 previewHeight=420px hideCode
setInitialRoutes(["/posts/edit/123"]);
import { Refine } from "@pankod/refine-core";
import { EditButton } from "@pankod/refine-mantine";

// visible-block-start
import {
  Edit,
  Select,
  TextInput,
  useForm,
  useSelect,
} from "@pankod/refine-mantine";

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
    refineCoreProps: {
      warnWhenUnsavedChanges: true,
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

const App = () => {
  return (
    <Refine
      resources={[
        {
          name: "posts",
          edit: PostEdit,
          list: () => (
            <div>
              <p>This page is empty.</p>
              <EditButton recordItemId="123">Edit Item 123</EditButton>
            </div>
          ),
        },
      ]}
    />
  );
};
render(
  <Wrapper>
    <App />
  </Wrapper>,
);

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
```

## Properties

### `hideText`

It is used to show and not show the text of the button. When `true`, only the button icon is visible.

```tsx live url=http://localhost:3000 previewHeight=200px
setInitialRoutes(["/"]);

import { Refine } from "@pankod/refine-core";

// visible-block-start
import { SaveButton } from "@pankod/refine-mantine";

const MySaveComponent = () => {
  return <SaveButton hideText />;
};
// visible-block-end

const App = () => {
  return (
    <Refine
      resources={[
        {
          name: "posts",
          list: MySaveComponent,
        },
      ]}
    />
  );
};

render(
  <Wrapper>
    <App />
  </Wrapper>,
);
```

## API Reference

### Properties

<PropsTable module="@pankod/refine-mantine/SaveButton" />
