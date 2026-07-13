---
title: "Chakra UI Edit Component | UI Component in Refine v5"
display_title: "Edit"
sidebar_label: "Edit"
description: "Secure Edit in Refine v5. Learn best practices. Explore customization options for hide for polished admin UIs. Explore with code snippets."
swizzle: true
---

`<Edit>` provides us a layout for displaying the page. It does not contain any logic but adds extra functionalities like a refresh button.

We will show what `<Edit>` does using properties with examples.

```tsx live  previewHeight=480px hideCode  url=http://localhost:3000/posts/edit/123
setInitialRoutes(["/posts/edit/123"]);

// visible-block-start
import React from "react";
import { Edit } from "@refinedev/chakra-ui";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Box,
  Select,
} from "@chakra-ui/react";
import { useForm } from "@refinedev/react-hook-form";
import { useSelect } from "@refinedev/core";
import { Controller } from "react-hook-form";

const PostEdit: React.FC = () => {
  const {
    saveButtonProps,
    refineCore: { query },
    register,
    control,
    formState: { errors },
  } = useForm();

  const { options } = useSelect({
    resource: "categories",
    defaultValue: query?.data?.category?.id,
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Box component="form" autoComplete="off">
        <FormControl mb="3" isInvalid={!!errors?.id}>
          <FormLabel>Id</FormLabel>
          <Input
            disabled
            type="number"
            {...register("id", {
              required: "This field is required",
            })}
          />
          <FormErrorMessage>{`${errors?.id?.message}`}</FormErrorMessage>
        </FormControl>

        <FormControl mb="3" isInvalid={!!errors?.title}>
          <FormLabel>Title</FormLabel>
          <Input
            type="text"
            {...register("title", {
              required: "This field is required",
            })}
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
          <FormErrorMessage>{`${errors.status?.message}`}</FormErrorMessage>
        </FormControl>

        <FormControl mb="3" isInvalid={!!errors?.category}>
          <FormLabel>Category</FormLabel>
          <Controller
            control={control}
            name="category.id"
            rules={{ required: "This field is required" }}
            render={({ field }) => (
              <Select placeholder="Select category" {...field}>
                {options?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
            )}
          />
          <FormErrorMessage>{`${errors?.category?.message}`}</FormErrorMessage>
        </FormControl>
      </Box>
    </Edit>
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
          edit: "/posts/edit/:id",
        },
      ]}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route
          path="/posts"
          element={
            <div>
              <p>This page is empty.</p>
              <RefineChakra.EditButton recordItemId="123">
                Edit Item 123
              </RefineChakra.EditButton>
            </div>
          }
        />
        <ReactRouter.Route path="/posts/edit/:id" element={<PostEdit />} />
      </ReactRouter.Routes>
    </RefineChakraDemo>
  </ReactRouter.BrowserRouter>,
);
```

:::simple Good to know
You can swizzle this component with the [**Refine CLI**](/core/docs/packages/cli/) to customize it.
:::

## Properties

### title

`title` allows you to add a title inside the `<Edit>` component. If you don't pass title props, it uses the "Edit" prefix and the singular resource name by default. For example, for the "posts" resource, it will be "Edit post".

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/edit/123
setInitialRoutes(["/posts/edit/123"]);

// visible-block-start
import { Edit } from "@refinedev/chakra-ui";
import { Heading } from "@chakra-ui/react";

const PostEdit: React.FC = () => {
  return (
    /* highlight-next-line */
    <Edit title={<Heading size="lg">Custom Title</Heading>}>
      <p>Rest of your page here</p>
    </Edit>
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
          edit: "/posts/edit/:id",
        },
      ]}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route
          path="/posts"
          element={
            <div>
              <p>This page is empty.</p>
              <RefineChakra.EditButton recordItemId="123">
                Edit Item 123
              </RefineChakra.EditButton>
            </div>
          }
        />
        <ReactRouter.Route path="/posts/edit/:id" element={<PostEdit />} />
      </ReactRouter.Routes>
    </RefineChakraDemo>
  </ReactRouter.BrowserRouter>,
);
```

### resource

The `<Edit>` component reads the `resource` information from the route by default. If you want to use a custom resource for the `<Edit>` component, you can use the `resource` prop.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/custom/123
setInitialRoutes(["/custom/123"]);

// visible-block-start
import { Edit } from "@refinedev/chakra-ui";

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
    <RefineChakraDemo
      resources={[
        {
          name: "posts",
          list: "/posts",
          edit: "/posts/edit/:id",
        },
        {
          name: "custom",
          list: "/custom",
          edit: "/custom/edit/:id",
        },
      ]}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route
          path="/posts"
          element={
            <div>
              <p>This page is empty.</p>
              <RefineChakra.EditButton recordItemId="123">
                Edit Item 123
              </RefineChakra.EditButton>
            </div>
          }
        />
        <ReactRouter.Route path="/custom/:id" element={<CustomPage />} />
      </ReactRouter.Routes>
    </RefineChakraDemo>
  </ReactRouter.BrowserRouter>,
);
```

If you have multiple resources with the same name, you can pass the `identifier` instead of the `name` of the resource. It will only be used as the main matching key for the resource, data provider methods will still work with the `name` of the resource defined in the `<Refine/>` component.

> For more information, refer to the [`identifier` section of the `<Refine/>` component documentation &#8594](/core/docs/core/refine-component#identifier)

### saveButtonProps

The `<Edit>` component has a save button that submits the form by default. If you want to customize this button you can use the `saveButtonProps` property:

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/edit/123
setInitialRoutes(["/posts/edit/123"]);

// visible-block-start
import { Edit } from "@refinedev/chakra-ui";

const PostEdit: React.FC = () => {
  return (
    /* highlight-next-line */
    <Edit saveButtonProps={{ colorScheme: "red" }}>
      <p>Rest of your page here</p>
    </Edit>
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
          edit: "/posts/edit/:id",
        },
      ]}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route
          path="/posts"
          element={
            <div>
              <p>This page is empty.</p>
              <RefineChakra.EditButton recordItemId="123">
                Edit Item 123
              </RefineChakra.EditButton>
            </div>
          }
        />
        <ReactRouter.Route path="/posts/edit/:id" element={<PostEdit />} />
      </ReactRouter.Routes>
    </RefineChakraDemo>
  </ReactRouter.BrowserRouter>,
);
```

> For more information, refer to the [`<SaveButton>` documentation &#8594](/core/docs/ui-integrations/chakra-ui/components/buttons/save-button/)

### canDelete and deleteButtonProps

`canDelete` allows you to add a delete button inside the `<Edit>` component. If the resource has the `canDelete` property, Refine adds the delete button by default. If you want to customize this button you can use the `deleteButtonProps` property like the code below.

When clicked on, the delete button executes the `useDelete` method provided by the `dataProvider`.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/edit/123
setInitialRoutes(["/posts/edit/123"]);

// visible-block-start
import { Edit } from "@refinedev/chakra-ui";
import { usePermissions } from "@refinedev/core";

const PostEdit: React.FC = () => {
  const { data: permissionsData } = usePermissions();

  return (
    <Edit
      /* highlight-start */
      canDelete={permissionsData?.includes("admin")}
      deleteButtonProps={{ colorScheme: "red" }}
      /* highlight-end */
    >
      <p>Rest of your page here</p>
    </Edit>
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
          edit: "/posts/edit/:id",
        },
      ]}
      options={{
        auth: {
          getPermissions: () => Promise.resolve(["admin"]),
        },
      }}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route path="/posts/edit/:id" element={<PostEdit />} />
      </ReactRouter.Routes>
    </RefineChakraDemo>
  </ReactRouter.BrowserRouter>,
);
```

### recordItemId

The `<Edit>` component reads the `id` information from the route by default. `recordItemId` is used when it cannot read from the URL (when used on a custom page, modal or drawer).

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/edit/123
setInitialRoutes(["/posts/edit/123"]);

// visible-block-start
import { Edit } from "@refinedev/chakra-ui";
import { useModalForm } from "@refinedev/react-hook-form";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  ModalBody,
  Button,
} from "@chakra-ui/react";

const PostEdit: React.FC = () => {
  const {
    modal: { visible, close, show },
    id,
  } = useModalForm({
    refineCoreProps: { action: "edit" },
  });

  return (
    <div>
      <Button onClick={() => show()}>Edit Button</Button>
      <Modal isOpen={visible} onClose={close} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader>Edit Post</ModalHeader>
          <ModalBody>
            {/* highlight-next-line */}
            <Edit recordItemId={id}>
              <p>Rest of your page here</p>
            </Edit>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
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
          edit: "/posts/edit/:id",
        },
      ]}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route path="/posts/edit/:id" element={<PostEdit />} />
      </ReactRouter.Routes>
    </RefineChakraDemo>
  </ReactRouter.BrowserRouter>,
);
```

### mutationMode

Determines which mode mutation will have while executing `useDelete`.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/edit/123
setInitialRoutes(["/posts/edit/123"]);

// visible-block-start
import { Edit } from "@refinedev/chakra-ui";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
} from "@chakra-ui/react";
import { useForm } from "@refinedev/react-hook-form";

const PostEdit: React.FC = () => {
  const {
    saveButtonProps,
    register,
    formState: { errors },
  } = useForm();

  return (
    <Edit
      //highlight-next-line
      mutationMode="undoable"
      canDelete
      saveButtonProps={saveButtonProps}
    >
      <FormControl mb="3" isInvalid={!!errors?.title}>
        <FormLabel>Title</FormLabel>
        <Input
          id="title"
          type="text"
          {...register("title", { required: "Title is required" })}
        />
        <FormErrorMessage>{`${errors?.title?.message}`}</FormErrorMessage>
      </FormControl>
    </Edit>
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
          edit: "/posts/edit/:id",
        },
      ]}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route
          path="/posts"
          element={
            <div>
              <p>This page is empty.</p>
              <RefineChakra.EditButton recordItemId="123">
                Edit Item 123
              </RefineChakra.EditButton>
            </div>
          }
        />
        <ReactRouter.Route path="/posts/edit/:id" element={<PostEdit />} />
      </ReactRouter.Routes>
    </RefineChakraDemo>
  </ReactRouter.BrowserRouter>,
);
```

### dataProviderName

If not specified, Refine will use the default data provider. If you have multiple data providers and want to use a different one, you can use the `dataProviderName` property.

```tsx
import { Refine } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";

import { Edit } from "@refinedev/chakra-ui";

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

To customize the back button or to disable it, you can use the `goBack` property. You can pass `false` or `null` to hide the back button.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/edit/123
setInitialRoutes(["/posts/edit/123"]);

// visible-block-start
import { Edit } from "@refinedev/chakra-ui";
import { IconMoodSmile } from "@tabler/icons-react";

const PostEdit: React.FC = () => {
  return (
    /* highlight-next-line */
    <Edit goBack={<IconMoodSmile />}>
      <p>Rest of your page here</p>
    </Edit>
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
          edit: "/posts/edit/:id",
        },
      ]}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route
          path="/posts"
          element={
            <div>
              <p>This page is empty.</p>
              <RefineChakra.EditButton recordItemId="123">
                Edit Item 123
              </RefineChakra.EditButton>
            </div>
          }
        />
        <ReactRouter.Route path="/posts/edit/:id" element={<PostEdit />} />
      </ReactRouter.Routes>
    </RefineChakraDemo>
  </ReactRouter.BrowserRouter>,
);
```

### isLoading

To toggle the loading state of the `<Edit/>` component, you can use the `isLoading` property.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/edit/123
setInitialRoutes(["/posts/edit/123"]);

// visible-block-start
import { Edit } from "@refinedev/chakra-ui";

const PostEdit: React.FC = () => {
  return (
    /* highlight-next-line */
    <Edit isLoading={true}>
      <p>Rest of your page here</p>
    </Edit>
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
          edit: "/posts/edit/:id",
        },
      ]}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route path="/posts/edit/:id" element={<PostEdit />} />
      </ReactRouter.Routes>
    </RefineChakraDemo>
  </ReactRouter.BrowserRouter>,
);
```

### breadcrumb

To customize or disable the breadcrumb, you can use the `breadcrumb` property. By default it uses the `Breadcrumb` component from `@refinedev/chakra-ui` package.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/edit/123
setInitialRoutes(["/posts/edit/123"]);

// visible-block-start
import { Edit, Breadcrumb } from "@refinedev/chakra-ui";
import { Box } from "@chakra-ui/react";

const PostEdit: React.FC = () => {
  return (
    <Edit
      // highlight-start
      breadcrumb={
        <Box borderColor="blue" borderStyle="dashed" borderWidth="2px">
          <Breadcrumb />
        </Box>
      }
      // highlight-end
    >
      <p>Rest of your page here</p>
    </Edit>
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
          edit: "/posts/edit/:id",
        },
      ]}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route
          path="/posts"
          element={
            <div>
              <p>This page is empty.</p>
              <RefineChakra.EditButton recordItemId="123">
                Edit Item 123
              </RefineChakra.EditButton>
            </div>
          }
        />
        <ReactRouter.Route path="/posts/edit/:id" element={<PostEdit />} />
      </ReactRouter.Routes>
    </RefineChakraDemo>
  </ReactRouter.BrowserRouter>,
);
```

### headerProps

If you want to customize the header of the `<Edit/>` component, you can use the `headerProps` property.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/edit/123
setInitialRoutes(["/posts/edit/123"]);

// visible-block-start
import { Edit } from "@refinedev/chakra-ui";

const PostEdit: React.FC = () => {
  return (
    <Edit
      // highlight-start
      headerProps={{
        borderColor: "blue",
        borderStyle: "dashed",
        borderWidth: "2px",
      }}
      // highlight-end
    >
      <p>Rest of your page here</p>
    </Edit>
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
          edit: "/posts/edit/:id",
        },
      ]}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route path="/posts/edit/:id" element={<PostEdit />} />
      </ReactRouter.Routes>
    </RefineChakraDemo>
  </ReactRouter.BrowserRouter>,
);
```

### headerButtons

By default, the `<Edit/>` component has a [`<ListButton>`][list-button] and a [`<RefreshButton>`][refresh-button] at the header.

You can customize the buttons at the header by using the `headerButtons` property. It accepts `React.ReactNode` or a render function `({ defaultButtons, refreshButtonProps, listButtonProps }) => React.ReactNode` which you can use to keep the existing buttons and add your own.

:::simple Implementation Tips
If "list" resource is not defined, the [`<ListButton>`][list-button] will not render and `listButtonProps` will be `undefined`.
:::

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/edit/123
setInitialRoutes(["/posts/edit/123"]);

// visible-block-start
import { Edit } from "@refinedev/chakra-ui";
import { Button, HStack } from "@chakra-ui/react";

const PostEdit: React.FC = () => {
  return (
    <Edit
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
    </Edit>
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
          edit: "/posts/edit/:id",
        },
      ]}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route
          path="/posts"
          element={
            <div>
              <p>This page is empty.</p>
              <RefineChakra.EditButton recordItemId="123">
                Edit Item 123
              </RefineChakra.EditButton>
            </div>
          }
        />
        <ReactRouter.Route path="/posts/edit/:id" element={<PostEdit />} />
      </ReactRouter.Routes>
    </RefineChakraDemo>
  </ReactRouter.BrowserRouter>,
);
```

### headerButtonProps

You can customize the wrapper element of the buttons at the header by using the `headerButtonProps` property.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/edit/123
setInitialRoutes(["/posts/edit/123"]);

// visible-block-start
import { Edit } from "@refinedev/chakra-ui";
import { Button } from "@chakra-ui/react";

const PostEdit: React.FC = () => {
  return (
    <Edit
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
    </Edit>
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
          edit: "/posts/edit/:id",
        },
      ]}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route
          path="/posts"
          element={
            <div>
              <p>This page is empty.</p>
              <RefineChakra.EditButton recordItemId="123">
                Edit Item 123
              </RefineChakra.EditButton>
            </div>
          }
        />
        <ReactRouter.Route path="/posts/edit/:id" element={<PostEdit />} />
      </ReactRouter.Routes>
    </RefineChakraDemo>
  </ReactRouter.BrowserRouter>,
);
```

### footerButtons

By default, the `<Edit/>` component has a [`<SaveButton>`][save-button] and a [`<DeleteButton>`][delete-button] at the footer.

You can customize the buttons at the footer by using the `footerButtons` property. It accepts `React.ReactNode` or a render function `({ defaultButtons, saveButtonProps, deleteButtonProps }) => React.ReactNode` which you can use to keep the existing buttons and add your own.

:::simple Implementation Tips
If [`canDelete`](#candelete-and-deletebuttonprops) is `false`, the [`<DeleteButton>`][delete-button] will not render and `deleteButtonProps` will be `undefined`.
:::

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/edit/123
setInitialRoutes(["/posts/edit/123"]);

// visible-block-start
import { Edit } from "@refinedev/chakra-ui";
import { Button, HStack } from "@chakra-ui/react";

const PostEdit: React.FC = () => {
  return (
    <Edit
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
    </Edit>
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
          edit: "/posts/edit/:id",
        },
      ]}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route
          path="/posts"
          element={
            <div>
              <p>This page is empty.</p>
              <RefineChakra.EditButton recordItemId="123">
                Edit Item 123
              </RefineChakra.EditButton>
            </div>
          }
        />
        <ReactRouter.Route path="/posts/edit/:id" element={<PostEdit />} />
      </ReactRouter.Routes>
    </RefineChakraDemo>
  </ReactRouter.BrowserRouter>,
);
```

### footerButtonProps

You can customize the wrapper element of the buttons at the footer by using the `footerButtonProps` property.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/edit/123
setInitialRoutes(["/posts/edit/123"]);

// visible-block-start
import { Edit } from "@refinedev/chakra-ui";

const PostEdit: React.FC = () => {
  return (
    <Edit
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
    </Edit>
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
          edit: "/posts/edit/:id",
        },
      ]}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route
          path="/posts"
          element={
            <div>
              <p>This page is empty.</p>
              <RefineChakra.EditButton recordItemId="123">
                Edit Item 123
              </RefineChakra.EditButton>
            </div>
          }
        />
        <ReactRouter.Route path="/posts/edit/:id" element={<PostEdit />} />
      </ReactRouter.Routes>
    </RefineChakraDemo>
  </ReactRouter.BrowserRouter>,
);
```

### autoSaveProps

You can use the auto save feature of the `<Edit/>` component by using the `autoSaveProps` property.

```tsx live disableScroll previewHeight=420px url=http://localhost:3000/posts/edit/123
setInitialRoutes(["/posts/edit/123"]);

// visible-block-start
import { Edit } from "@refinedev/chakra-ui";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Select,
} from "@chakra-ui/react";
import { useForm } from "@refinedev/react-hook-form";
import { useSelect } from "@refinedev/core";

const PostEdit: React.FC = () => {
  const {
    refineCore: {
      formLoading,
      query,
      // highlight-next-line
      autoSaveProps,
    },
    saveButtonProps,
    register,
    formState: { errors },
    resetField,
  } = useForm<IPost>({
    // highlight-start
    refineCoreProps: {
      autoSave: {
        enabled: true,
      },
    },
    // highlight-end
  });

  const { options } = useSelect({
    resource: "categories",
    defaultValue: query?.data?.category?.id,
  });

  useEffect(() => {
    resetField("category.id");
  }, [options]);

  return (
    <Edit
      isLoading={formLoading}
      saveButtonProps={saveButtonProps}
      // highlight-next-line
      autoSaveProps={autoSaveProps}
    >
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
    </Edit>
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
          edit: "/posts/edit/:id",
        },
      ]}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route
          path="/posts"
          element={
            <div>
              <p>This page is empty.</p>
              <RefineChakra.EditButton recordItemId="123">
                Edit Item 123
              </RefineChakra.EditButton>
            </div>
          }
        />
        <ReactRouter.Route path="/posts/edit/:id" element={<PostEdit />} />
      </ReactRouter.Routes>
    </RefineChakraDemo>
  </ReactRouter.BrowserRouter>,
);
```

## API Reference

### Properties

<PropsTable module="@refinedev/chakra-ui/Edit" />

[list-button]: /core/docs/ui-integrations/chakra-ui/components/buttons/list-button
[refresh-button]: /core/docs/ui-integrations/chakra-ui/components/buttons/refresh-button
[save-button]: /core/docs/ui-integrations/chakra-ui/components/buttons/save-button
[delete-button]: /core/docs/ui-integrations/chakra-ui/components/buttons/delete-button
