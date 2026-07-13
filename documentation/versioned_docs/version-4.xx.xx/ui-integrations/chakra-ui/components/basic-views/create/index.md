---
title: "Chakra UI Create View | Refine v4 CRUD Pages"
display_title: "Create"
sidebar_label: "Create"
description: "Official guide to building 'Create' pages with Chakra UI. Documentation on integrating forms and layouts in your Refine v4 application."
swizzle: true
---

`<Create>` provides us a layout to display the page. It does not contain any logic and just adds extra functionalities like action buttons and being able to give titles to the page.

We will show what `<Create>` does using properties with examples.

```tsx live previewHeight=420px hideCode url=http://localhost:3000/posts/create
setInitialRoutes(["/posts/create"]);

// visible-block-start
import { Create } from "@refinedev/chakra-ui";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Select,
} from "@chakra-ui/react";
import { useSelect } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";

const PostCreate: React.FC = () => {
  const {
    refineCore: { formLoading },
    saveButtonProps,
    register,
    formState: { errors },
  } = useForm();

  const { options } = useSelect({
    resource: "categories",
  });

  return (
    <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <FormControl mb="3" isInvalid={!!errors?.title}>
        <FormLabel>Title</FormLabel>
        <Input
          id="title"
          type="text"
          {...register("title", { required: "Title is required" })}
        />
        <FormErrorMessage>{`${errors?.title?.message}`}</FormErrorMessage>
      </FormControl>
      <FormControl mb="3" isInvalid={!!errors?.status}>
        <FormLabel>Status</FormLabel>
        <Select
          id="content"
          placeholder="Select Post Status"
          {...register("status", {
            required: "Status is required",
          })}
        >
          <option>published</option>
          <option>draft</option>
          <option>rejected</option>
        </Select>
        <FormErrorMessage>{`${errors?.status?.message}`}</FormErrorMessage>
      </FormControl>
      <FormControl mb="3" isInvalid={!!errors?.category}>
        <FormLabel>Category</FormLabel>
        <Select
          id="categoryId"
          placeholder="Select Category"
          {...register("category.id", {
            required: "Category is required",
          })}
        >
          {options?.map((option) => (
            <option value={option.value} key={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
        <FormErrorMessage>{`${errors?.category?.message}`}</FormErrorMessage>
      </FormControl>
    </Create>
  );
};
// visible-block-end

render(
  <ReactRouter.BrowserRouter>
    <RefineChakraDemo
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
            <div>
              <p>This page is empty.</p>
              <RefineChakra.CreateButton>Create Post</RefineChakra.CreateButton>
            </div>
          }
        />
        <ReactRouter.Route path="/posts/create" element={<PostCreate />} />
      </ReactRouter.Routes>
    </RefineChakraDemo>
  </ReactRouter.BrowserRouter>,
);
```

:::simple Good to know

You can swizzle this component with the [**Refine CLI**](/core/docs/packages/list-of-packages) to customize it.

:::

## Properties

### title

`title` allows you to add a title inside the `<Create>` component. If you don't pass title props, it uses the "Create" prefix and the singular resource name by default. For example, for the "posts" resource, it will be "Create post".

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/create
setInitialRoutes(["/posts/create"]);

// visible-block-start
import { Create } from "@refinedev/chakra-ui";
import { Heading } from "@chakra-ui/react";

const PostCreate: React.FC = () => {
  return (
    /* highlight-next-line */
    <Create title={<Heading size="lg">Custom Title</Heading>}>
      <p>Rest of your page here</p>
    </Create>
  );
};
// visible-block-end

render(
  <ReactRouter.BrowserRouter>
    <RefineChakraDemo
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
            <div>
              <p>This page is empty.</p>
              <RefineChakra.CreateButton>Create Post</RefineChakra.CreateButton>
            </div>
          }
        />
        <ReactRouter.Route path="/posts/create" element={<PostCreate />} />
      </ReactRouter.Routes>
    </RefineChakraDemo>
  </ReactRouter.BrowserRouter>,
);
```

### saveButtonProps

The `<Create>` component has a save button that submits the form by default. If you want to customize this button you can use the `saveButtonProps` property:

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/create
setInitialRoutes(["/posts/create"]);

// visible-block-start
import { Create } from "@refinedev/chakra-ui";

const PostCreate: React.FC = () => {
  return (
    /* highlight-next-line */
    <Create saveButtonProps={{ colorScheme: "red" }}>
      <p>Rest of your page here</p>
    </Create>
  );
};
// visible-block-end

render(
  <ReactRouter.BrowserRouter>
    <RefineChakraDemo
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
            <div>
              <p>This page is empty.</p>
              <RefineChakra.CreateButton>Create Post</RefineChakra.CreateButton>
            </div>
          }
        />
        <ReactRouter.Route path="/posts/create" element={<PostCreate />} />
      </ReactRouter.Routes>
    </RefineChakraDemo>
  </ReactRouter.BrowserRouter>,
);
```

### resource

The `<Create>` component reads the `resource` information from the route by default. If you want to use a custom resource for the `<Create>` component, you can use the `resource` prop.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/custom
setInitialRoutes(["/custom"]);

// visible-block-start
import { Create } from "@refinedev/chakra-ui";

const CustomPage: React.FC = () => {
  return (
    /* highlight-next-line */
    <Create resource="posts">
      <p>Rest of your page here</p>
    </Create>
  );
};
// visible-block-end

render(
  <ReactRouter.BrowserRouter>
    <RefineChakraDemo
      resources={[
        {
          name: "posts",
          list: "/posts",
          create: "/posts/create",
        },
        {
          name: "custom",
          list: "/custom",
          create: "/custom/create",
        },
      ]}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route path="/custom" element={<CustomPage />} />
      </ReactRouter.Routes>
    </RefineChakraDemo>
  </ReactRouter.BrowserRouter>,
);
```

### goBack

To customize the back button or to disable it, you can use the `goBack` property.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/create
setInitialRoutes(["/posts/create"]);

// visible-block-start
import { Create } from "@refinedev/chakra-ui";
import { IconMoodSmile } from "@tabler/icons-react";

const PostCreate: React.FC = () => {
  return (
    /* highlight-next-line */
    <Create goBack={<IconMoodSmile />}>
      <p>Rest of your page here</p>
    </Create>
  );
};
// visible-block-end

render(
  <ReactRouter.BrowserRouter>
    <RefineChakraDemo
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
            <div>
              <p>This page is empty.</p>
              <RefineChakra.CreateButton>Create Post</RefineChakra.CreateButton>
            </div>
          }
        />
        <ReactRouter.Route path="/posts/create" element={<PostCreate />} />
      </ReactRouter.Routes>
    </RefineChakraDemo>
  </ReactRouter.BrowserRouter>,
);
```

### isLoading

To toggle the loading state of the `<Create/>` component, you can use the `isLoading` property.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/create
setInitialRoutes(["/posts/create"]);

// visible-block-start
import { Create } from "@refinedev/chakra-ui";

const PostCreate: React.FC = () => {
  return (
    /* highlight-next-line */
    <Create isLoading={true}>
      <p>Rest of your page here</p>
    </Create>
  );
};
// visible-block-end

render(
  <ReactRouter.BrowserRouter>
    <RefineChakraDemo
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
            <div>
              <p>This page is empty.</p>
              <RefineChakra.CreateButton>Create Post</RefineChakra.CreateButton>
            </div>
          }
        />
        <ReactRouter.Route path="/posts/create" element={<PostCreate />} />
      </ReactRouter.Routes>
    </RefineChakraDemo>
  </ReactRouter.BrowserRouter>,
);
```

### breadcrumb

To customize or disable the breadcrumb, you can use the `breadcrumb` property. By default it uses the `Breadcrumb` component from `@refinedev/chakra-ui` package.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/create
setInitialRoutes(["/posts/create"]);

// visible-block-start
import { Create, Breadcrumb } from "@refinedev/chakra-ui";
import { Box } from "@chakra-ui/react";

const PostCreate: React.FC = () => {
  return (
    <Create
      // highlight-start
      breadcrumb={
        <Box borderColor="blue" borderStyle="dashed" borderWidth="2px">
          <Breadcrumb />
        </Box>
      }
      // highlight-end
    >
      <p>Rest of your page here</p>
    </Create>
  );
};
// visible-block-end

render(
  <ReactRouter.BrowserRouter>
    <RefineChakraDemo
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
            <div>
              <p>This page is empty.</p>
              <RefineChakra.CreateButton>Create Post</RefineChakra.CreateButton>
            </div>
          }
        />
        <ReactRouter.Route path="/posts/create" element={<PostCreate />} />
      </ReactRouter.Routes>
    </RefineChakraDemo>
  </ReactRouter.BrowserRouter>,
);
```

### wrapperProps

If you want to customize the wrapper of the `<Create/>` component, you can use the `wrapperProps` property. For `@refinedev/chakra-ui` wrapper element is `<Card>`s and `wrapperProps` can get every attribute that `<Box>` can get.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/create
setInitialRoutes(["/posts/create"]);

// visible-block-start
import { Create } from "@refinedev/chakra-ui";

const PostCreate: React.FC = () => {
  return (
    <Create
      // highlight-start
      wrapperProps={{
        borderColor: "blue",
        borderStyle: "dashed",
        borderWidth: "2px",
      }}
      // highlight-end
    >
      <p>Rest of your page here</p>
    </Create>
  );
};
// visible-block-end

render(
  <ReactRouter.BrowserRouter>
    <RefineChakraDemo
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
            <div>
              <p>This page is empty.</p>
              <RefineChakra.CreateButton>Create Post</RefineChakra.CreateButton>
            </div>
          }
        />
        <ReactRouter.Route path="/posts/create" element={<PostCreate />} />
      </ReactRouter.Routes>
    </RefineChakraDemo>
  </ReactRouter.BrowserRouter>,
);
```

### headerProps

If you want to customize the header of the `<Create/>` component, you can use the `headerProps` property.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/create
setInitialRoutes(["/posts/create"]);

// visible-block-start
import { Create } from "@refinedev/chakra-ui";

const PostCreate: React.FC = () => {
  return (
    <Create
      // highlight-start
      headerProps={{
        borderColor: "blue",
        borderStyle: "dashed",
        borderWidth: "2px",
      }}
      // highlight-end
    >
      <p>Rest of your page here</p>
    </Create>
  );
};
// visible-block-end

render(
  <ReactRouter.BrowserRouter>
    <RefineChakraDemo
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
            <div>
              <p>This page is empty.</p>
              <RefineChakra.CreateButton>Create Post</RefineChakra.CreateButton>
            </div>
          }
        />
        <ReactRouter.Route path="/posts/create" element={<PostCreate />} />
      </ReactRouter.Routes>
    </RefineChakraDemo>
  </ReactRouter.BrowserRouter>,
);
```

### headerButtons

You can customize the buttons at the header by using the `headerButtons` property. It accepts `React.ReactNode` or a render function `({ defaultButtons }) => React.ReactNode` which you can use to keep the existing buttons and add your own.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/create
setInitialRoutes(["/posts/create"]);

// visible-block-start
import { Create } from "@refinedev/chakra-ui";
import { Button, HStack } from "@chakra-ui/react";

const PostCreate: React.FC = () => {
  return (
    <Create
      // highlight-start
      headerButtons={({ defaultButtons }) => (
        <HStack>
          {defaultButtons}
          <Button colorScheme="red">Custom Button</Button>
        </HStack>
      )}
      // highlight-end
    >
      <p>Rest of your page here</p>
    </Create>
  );
};
// visible-block-end

render(
  <ReactRouter.BrowserRouter>
    <RefineChakraDemo
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
            <div>
              <p>This page is empty.</p>
              <RefineChakra.CreateButton>Create Post</RefineChakra.CreateButton>
            </div>
          }
        />
        <ReactRouter.Route path="/posts/create" element={<PostCreate />} />
      </ReactRouter.Routes>
    </RefineChakraDemo>
  </ReactRouter.BrowserRouter>,
);
```

### headerButtonProps

You can customize the wrapper element of the buttons at the header by using the `headerButtonProps` property.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/create
setInitialRoutes(["/posts/create"]);

// visible-block-start
import { Create } from "@refinedev/chakra-ui";
import { Button } from "@chakra-ui/react";

const PostCreate: React.FC = () => {
  return (
    <Create
      // highlight-start
      headerButtonProps={{
        borderColor: "blue",
        borderStyle: "dashed",
        borderWidth: "2px",
        p: "2",
      }}
      // highlight-end
      headerButtons={
        <Button colorScheme="green" variant="outline">
          Custom Button
        </Button>
      }
    >
      <p>Rest of your page here</p>
    </Create>
  );
};
// visible-block-end

render(
  <ReactRouter.BrowserRouter>
    <RefineChakraDemo
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
            <div>
              <p>This page is empty.</p>
              <RefineChakra.CreateButton>Create Post</RefineChakra.CreateButton>
            </div>
          }
        />
        <ReactRouter.Route path="/posts/create" element={<PostCreate />} />
      </ReactRouter.Routes>
    </RefineChakraDemo>
  </ReactRouter.BrowserRouter>,
);
```

### footerButtons

By default, the `<Create/>` component has a [`<SaveButton>`][save-button] at the footer.

You can customize the buttons at the footer by using the `footerButtons` property. It accepts `React.ReactNode` or a render function `({ defaultButtons, saveButtonProps }) => React.ReactNode` which you can use to keep the existing buttons and add your own.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/create
setInitialRoutes(["/posts/create"]);

// visible-block-start
import { Create } from "@refinedev/chakra-ui";
import { Button, HStack } from "@chakra-ui/react";

const PostCreate: React.FC = () => {
  return (
    <Create
      // highlight-start
      footerButtons={({ defaultButtons }) => (
        <HStack borderColor="blue" borderStyle="dashed" borderWidth="2px" p="2">
          {defaultButtons}
          <Button colorScheme="red" variant="solid">
            Custom Button
          </Button>
        </HStack>
      )}
      // highlight-end
    >
      <p>Rest of your page here</p>
    </Create>
  );
};
// visible-block-end

render(
  <ReactRouter.BrowserRouter>
    <RefineChakraDemo
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
            <div>
              <p>This page is empty.</p>
              <RefineChakra.CreateButton>Create Post</RefineChakra.CreateButton>
            </div>
          }
        />
        <ReactRouter.Route path="/posts/create" element={<PostCreate />} />
      </ReactRouter.Routes>
    </RefineChakraDemo>
  </ReactRouter.BrowserRouter>,
);
```

### footerButtonProps

You can customize the wrapper element of the buttons at the footer by using the `footerButtonProps` property.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/create
setInitialRoutes(["/posts/create"]);

// visible-block-start
import { Create } from "@refinedev/chakra-ui";

const PostCreate: React.FC = () => {
  return (
    <Create
      // highlight-start
      footerButtonProps={{
        float: "right",
        borderColor: "blue",
        borderStyle: "dashed",
        borderWidth: "2px",
        p: "2",
      }}
      // highlight-end
    >
      <p>Rest of your page here</p>
    </Create>
  );
};
// visible-block-end

render(
  <ReactRouter.BrowserRouter>
    <RefineChakraDemo
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
            <div>
              <p>This page is empty.</p>
              <RefineChakra.CreateButton>Create Post</RefineChakra.CreateButton>
            </div>
          }
        />
        <ReactRouter.Route path="/posts/create" element={<PostCreate />} />
      </ReactRouter.Routes>
    </RefineChakraDemo>
  </ReactRouter.BrowserRouter>,
);
```

## API Reference

### Properties

<PropsTable module="@refinedev/chakra-ui/Create" />

[save-button]: /core/docs/ui-integrations/chakra-ui/components/buttons/save-button
