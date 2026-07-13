---
id: edit
title: Edit
swizzle: true
---

```tsx live shared
const { default: simpleRest } = RefineSimpleRest;
setRefineProps({
  dataProvider: simpleRest("https://api.fake-rest.refine.dev"),
  Layout: RefineChakra.Layout,
  Sider: () => null,
});

const Wrapper = ({ children }) => {
  return (
    <RefineChakra.ChakraProvider theme={RefineChakra.refineTheme}>
      {children}
    </RefineChakra.ChakraProvider>
  );
};

const DummyListPage = () => (
  <RefineChakra.VStack alignItems="flex-start">
    <RefineChakra.Text>This page is empty.</RefineChakra.Text>
    <EditButton colorScheme="black" recordItemId="123">
      Edit Item 123
    </EditButton>
  </RefineChakra.VStack>
);

interface ICategory {
  id: number;
  title: string;
}

interface IPost {
  id: number;
  title: string;
  content: string;
  status: "published" | "draft" | "rejected";
  category: { id: number };
}
```

`<Edit>` provides us a layout for displaying the page. It does not contain any logic but adds extra functionalities like a refresh button.

We will show what `<Edit>` does using properties with examples.

```tsx live url=http://localhost:3000/posts/edit/123 previewHeight=420px hideCode
setInitialRoutes(["/posts/edit/123"]);
import { Refine } from "@pankod/refine-core";
import { EditButton } from "@pankod/refine-chakra-ui";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

// visible-block-start
import {
  Edit,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
} from "@pankod/refine-chakra-ui";
import { useSelect } from "@pankod/refine-core";
import { useForm } from "@pankod/refine-react-hook-form";

const PostEdit: React.FC = () => {
  const {
    refineCore: { formLoading, queryResult },
    saveButtonProps,
    register,
    formState: { errors },
    resetField,
  } = useForm<IPost>();

  const { options } = useSelect({
    resource: "categories",

    defaultValue: queryResult?.data?.data.category.id,
    queryOptions: { enabled: !!queryResult?.data?.data.category.id },
  });

  useEffect(() => {
    resetField("category.id");
  }, [options]);

  return (
    <Edit isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <FormControl mb="3" isInvalid={!!errors?.title}>
        <FormLabel>Title</FormLabel>
        <Input
          id="title"
          type="text"
          {...register("title", { required: "Title is required" })}
        />
        <FormErrorMessage>{`${errors.title?.message}`}</FormErrorMessage>
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
      <FormControl mb="3" isInvalid={!!errors?.categoryId}>
        <FormLabel>Category</FormLabel>
        <Select
          id="ca"
          placeholder="Select Category"
          {...register("category.id", {
            required: true,
          })}
        >
          {options?.map((option) => (
            <option value={option.value} key={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
        <FormErrorMessage>{`${errors.categoryId?.message}`}</FormErrorMessage>
      </FormControl>
    </Edit>
  );
};
// visible-block-end

const App = () => {
  return (
    <Refine
      routerProvider={routerProvider}
      dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
      notificationProvider={RefineChakra.notificationProvider()}
      resources={[
        {
          name: "posts",
          edit: PostEdit,
          list: DummyListPage,
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

:::info-tip Swizzle
You can swizzle this component to customize it with the [**refine CLI**](/core/docs/3.xx.xx/packages/documentation/cli)
:::

## Properties

### `title`

It allows adding titles inside the `<Edit>` component. if you don't pass title props it uses the "Edit" prefix and singular resource name by default. For example, for the "posts" resource, it will be "Edit post".

```tsx live url=http://localhost:3000/posts/edit/123 previewHeight=280px
setInitialRoutes(["/posts/edit/123"]);
import { Refine } from "@pankod/refine-core";
import { EditButton } from "@pankod/refine-chakra-ui";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

// visible-block-start
import { Edit, Heading } from "@pankod/refine-chakra-ui";

const PostEdit: React.FC = () => {
  return (
    /* highlight-next-line */
    <Edit title={<Heading size="lg">Custom Title</Heading>}>
      <p>Rest of your page here</p>
    </Edit>
  );
};
// visible-block-end

const App = () => {
  return (
    <Refine
      routerProvider={routerProvider}
      dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
      resources={[
        {
          name: "posts",
          edit: PostEdit,
          list: DummyListPage,
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

### `saveButtonProps`

The `<Edit>` component has a save button by default. If you want to customize this button you can use the `saveButtonProps` property like the code below.

Clicking on the save button will submit your form.

[Refer to the `<SaveButton>` documentation for detailed usage. &#8594](/core/docs/3.xx.xx/api-reference/chakra-ui/components/buttons/save)

```tsx live url=http://localhost:3000/posts/edit/123 previewHeight=280px
setInitialRoutes(["/posts/edit/123"]);
import { Refine } from "@pankod/refine-core";
import { EditButton } from "@pankod/refine-chakra-ui";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

// visible-block-start
import { Edit } from "@pankod/refine-chakra-ui";

const PostEdit: React.FC = () => {
  return (
    /* highlight-next-line */
    <Edit saveButtonProps={{ colorScheme: "red" }}>
      <p>Rest of your page here</p>
    </Edit>
  );
};
// visible-block-end

const App = () => {
  return (
    <Refine
      routerProvider={routerProvider}
      dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
      resources={[
        {
          name: "posts",
          edit: PostEdit,
          list: DummyListPage,
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

### `canDelete` and `deleteButtonProps`

`canDelete` allows us to add the delete button inside the `<Edit>` component. If the resource has the `canDelete` property,refine adds the delete button by default. If you want to customize this button you can use the `deleteButtonProps` property like the code below.

When clicked on, the delete button executes the `useDelete` method provided by the `dataProvider`.

[Refer to the `<DeleteButton>` documentation for detailed usage. &#8594](/core/docs/3.xx.xx/api-reference/chakra-ui/components/buttons/delete)

```tsx live url=http://localhost:3000/posts/edit/123 previewHeight=280px
setInitialRoutes(["/posts/edit/123"]);
import { Refine } from "@pankod/refine-core";
import { EditButton } from "@pankod/refine-chakra-ui";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

// visible-block-start
import { Edit } from "@pankod/refine-chakra-ui";
import { usePermissions } from "@pankod/refine-core";

const PostEdit: React.FC = () => {
  const { data: permissionsData } = usePermissions();
  return (
    <Edit
      /* highlight-start */
      canDelete={permissionsData?.includes("admin")}
      deleteButtonProps={{ colorScheme: "orange" }}
      /* highlight-end */
    >
      <p>Rest of your page here</p>
    </Edit>
  );
};
// visible-block-end

const App = () => {
  const simpleRestDataProvider = dataProvider(
    "https://api.fake-rest.refine.dev",
  );

  const customDataProvider = {
    ...simpleRestDataProvider,
    deleteOne: async ({ resource, id, variables }) => {
      return {
        data: {},
      };
    },
  };

  const authProvider = {
    login: () => Promise.resolve(),
    logout: () => Promise.resolve(),
    checkAuth: () => Promise.resolve(),
    checkError: () => Promise.resolve(),
    getPermissions: () => Promise.resolve("admin"),
    getUserIdentity: () => Promise.resolve(),
  };

  return (
    <Refine
      routerProvider={routerProvider}
      dataProvider={customDataProvider}
      authProvider={authProvider}
      resources={[
        {
          name: "posts",
          edit: PostEdit,
          list: DummyListPage,
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

[Refer to the `usePermission` documentation for detailed usage. &#8594](/core/docs/3.xx.xx/api-reference/core/hooks/auth/usePermissions)

### `resource`

`<Edit>` component reads the `resource` information from the route by default. This default behavior will not work on custom pages. If you want to use the `<Edit>` component in a custom page, you can use the `resource` property.

[Refer to the custom pages documentation for detailed usage. &#8594](/core/docs/3.xx.xx/advanced-tutorials/custom-pages)

```tsx live url=http://localhost:3000/custom/23 previewHeight=280px
setInitialRoutes(["/custom/23"]);

// visible-block-start
import { Refine } from "@pankod/refine-core";
import { Layout, Edit } from "@pankod/refine-chakra-ui";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

const CustomPage: React.FC = () => {
  return (
    /* highlight-next-line */
    <Edit resource="categories">
      <p>Rest of your page here</p>
    </Edit>
  );
};

const App: React.FC = () => {
  return (
    <Refine
      routerProvider={{
        ...routerProvider,
        // highlight-start
        routes: [
          {
            element: <CustomPage />,
            path: "/custom/:id",
          },
        ],
        // highlight-end
      }}
      Layout={Layout}
      dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
      resources={[{ name: "posts" }]}
    />
  );
};
// visible-block-end

render(
  <Wrapper>
    <App />
  </Wrapper>,
);
```

### `recordItemId`

The `<Edit>` component reads the `id` information from the route by default. `recordItemId` is used when it cannot read from the URL(when used on a custom page, modal or drawer).

```tsx live url=http://localhost:3000/posts/edit/123 previewHeight=350px
setInitialRoutes(["/posts/edit/123"]);
import { Refine } from "@pankod/refine-core";
import { EditButton } from "@pankod/refine-chakra-ui";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

// visible-block-start
import { useModalForm } from "@pankod/refine-react-hook-form";
import {
  Edit,
  Modal,
  Button,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  ModalBody,
} from "@pankod/refine-chakra-ui";

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
          <ModalHeader>Edit</ModalHeader>

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

const App = () => {
  return (
    <Refine
      routerProvider={routerProvider}
      dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
      resources={[
        {
          name: "posts",
          edit: PostEdit,
          list: () => (
            <div>
              <p>This page is empty.</p>
              <EditButton recordItemId="23">Edit Item 23</EditButton>
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
```

:::note
The `<Edit>` component needs the `id` information for the `<RefreshButton>` to work properly.
:::

### `mutationMode`

Determines which mode mutation will have while executing `<DeleteButton>`.

[Refer to the mutation mode docs for further information. &#8594](/core/docs/3.xx.xx/advanced-tutorials/mutation-mode)

```tsx live url=http://localhost:3000/posts/edit/123 previewHeight=280px
setInitialRoutes(["/posts/edit/123"]);
import { Refine } from "@pankod/refine-core";
import { EditButton } from "@pankod/refine-chakra-ui";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

// visible-block-start
import {
  Edit,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@pankod/refine-chakra-ui";
import { useForm } from "@pankod/refine-react-hook-form";

const PostEdit: React.FC = () => {
  const {
    saveButtonProps,
    register,
    formState: { errors },
  } = useForm<IPost>();

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
        <FormErrorMessage>{`${errors.title?.message}`}</FormErrorMessage>
      </FormControl>
    </Edit>
  );
};
// visible-block-end

const App = () => {
  return (
    <Refine
      routerProvider={routerProvider}
      dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
      notificationProvider={RefineChakra.notificationProvider()}
      resources={[
        {
          name: "posts",
          edit: PostEdit,
          list: DummyListPage,
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

### `dataProviderName`

If not specified, Refine will use the default data provider. If you have multiple data providers and want to use a different one, you can use the `dataProviderName` property.

```tsx
import { Refine } from "@pankod/refine-core";
import { Edit } from "@pankod/refine-chakra-ui";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

// highlight-start
const PostEdit = () => {
  return <Edit dataProviderName="other">...</Edit>;
};
// highlight-end

export const App: React.FC = () => {
  return (
    <Refine
      routerProvider={routerProvider}
      // highlight-start
      dataProvider={{
        default: dataProvider("https://api.fake-rest.refine.dev/"),
        other: dataProvider("https://other-api.fake-rest.refine.dev/"),
      }}
      // highlight-end
      resources={[{ name: "posts", edit: PostEdit }]}
    />
  );
};
```

### `goBack`

To customize the back button or to disable it, you can use the `goBack` property. You can pass `false` or `null` to hide the back button.

```tsx live url=http://localhost:3000/posts/edit/123 previewHeight=280px
setInitialRoutes(["/posts/edit/123"]);
import { Refine } from "@pankod/refine-core";
import { EditButton } from "@pankod/refine-chakra-ui";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

const IconMoodSmile = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon icon-tabler icon-tabler-mood-smile"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke="currentColor"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
    <circle cx={12} cy={12} r={9}></circle>
    <line x1={9} y1={10} x2="9.01" y2={10}></line>
    <line x1={15} y1={10} x2="15.01" y2={10}></line>
    <path d="M9.5 15a3.5 3.5 0 0 0 5 0"></path>
  </svg>
);

// visible-block-start
import { Edit } from "@pankod/refine-chakra-ui";
/* highlight-next-line */
import { IconMoodSmile } from "@tabler/icons";

const PostEdit: React.FC = () => {
  return (
    /* highlight-next-line */
    <Edit goBack={IconMoodSmile}>
      <p>Rest of your page here 2</p>
    </Edit>
  );
};
// visible-block-end

const App = () => {
  return (
    <Refine
      routerProvider={routerProvider}
      dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
      resources={[
        {
          name: "posts",
          edit: PostEdit,
          list: DummyListPage,
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

### `isLoading`

To toggle the loading state of the `<Edit/>` component, you can use the `isLoading` property.

```tsx live url=http://localhost:3000/posts/edit/123 previewHeight=280px
setInitialRoutes(["/posts/edit/123"]);
import { Refine } from "@pankod/refine-core";
import { EditButton } from "@pankod/refine-chakra-ui";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

// visible-block-start
import { Edit } from "@pankod/refine-chakra-ui";

const PostEdit: React.FC = () => {
  return (
    /* highlight-next-line */
    <Edit isLoading={true}>
      <p>Rest of your page here</p>
    </Edit>
  );
};
// visible-block-end

const App = () => {
  return (
    <Refine
      routerProvider={routerProvider}
      dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
      resources={[
        {
          name: "posts",
          edit: PostEdit,
          list: DummyListPage,
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

### `breadcrumb`

To customize or disable the breadcrumb, you can use the `breadcrumb` property. By default it uses the `Breadcrumb` component from `@pankod/refine-chakra-ui` package.

[Refer to the `Breadcrumb` documentation for detailed usage. &#8594](/core/docs/3.xx.xx/api-reference/chakra-ui/components/breadcrumb)

:::tip
This feature can be managed globally via the `<Refine>` component's [options](/core/docs/3.xx.xx/api-reference/core/components/refine-config/#breadcrumb)
:::

```tsx live url=http://localhost:3000/posts/edit/123 previewHeight=280px
setInitialRoutes(["/posts/edit/123"]);
import { Refine } from "@pankod/refine-core";
import { EditButton } from "@pankod/refine-chakra-ui";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

// visible-block-start
import { Edit, Breadcrumb, Box } from "@pankod/refine-chakra-ui";

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

const App = () => {
  return (
    <Refine
      routerProvider={routerProvider}
      dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
      resources={[
        {
          name: "posts",
          edit: PostEdit,
          list: DummyListPage,
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

### `wrapperProps`

If you want to customize the wrapper of the `<Edit/>` component, you can use the `wrapperProps` property. For `@pankod/refine-chakra-ui` wrapper element is `<Card>`s and `wrapperProps` can get every attribute that `<Card>` can get.

[Refer to the `Box` documentation from Chakra UI for detailed usage. &#8594](https://chakra-ui.com/docs/components/box/usage)

```tsx live url=http://localhost:3000/posts/edit/123 previewHeight=280px
setInitialRoutes(["/posts/edit/123"]);
import { Refine } from "@pankod/refine-core";
import { EditButton } from "@pankod/refine-chakra-ui";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

// visible-block-start
import { Edit } from "@pankod/refine-chakra-ui";

const PostEdit: React.FC = () => {
  return (
    <Edit
      // highlight-start
      wrapperProps={{
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

const App = () => {
  return (
    <Refine
      routerProvider={routerProvider}
      dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
      resources={[
        {
          name: "posts",
          edit: PostEdit,
          list: DummyListPage,
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

### `headerProps`

If you want to customize the header of the `<Edit/>` component, you can use the `headerProps` property.

[Refer to the `Box` documentation from Chakra UI for detailed usage. &#8594](https://chakra-ui.com/docs/components/box/usage)

```tsx live url=http://localhost:3000/posts/edit/123 previewHeight=280px
setInitialRoutes(["/posts/edit/123"]);
import { Refine } from "@pankod/refine-core";
import { EditButton } from "@pankod/refine-chakra-ui";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

// visible-block-start
import { Edit } from "@pankod/refine-chakra-ui";

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

const App = () => {
  return (
    <Refine
      routerProvider={routerProvider}
      dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
      resources={[
        {
          name: "posts",
          edit: PostEdit,
          list: DummyListPage,
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

### `contentProps`

If you want to customize the content of the `<Edit/>` component, you can use the `contentProps` property.

[Refer to the `Box` documentation from Chakra UI for detailed usage. &#8594](https://chakra-ui.com/docs/components/box/usage)

```tsx live url=http://localhost:3000/posts/edit/123 previewHeight=280px
setInitialRoutes(["/posts/edit/123"]);
import { Refine } from "@pankod/refine-core";
import { EditButton } from "@pankod/refine-chakra-ui";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

// visible-block-start
import { Edit } from "@pankod/refine-chakra-ui";

const PostEdit: React.FC = () => {
  return (
    <Edit
      // highlight-start
      contentProps={{
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

const App = () => {
  return (
    <Refine
      routerProvider={routerProvider}
      dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
      resources={[
        {
          name: "posts",
          edit: PostEdit,
          list: DummyListPage,
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

### `headerButtons`

You can customize the buttons at the header by using the `headerButtons` property. It accepts `React.ReactNode` or a render function `({ defaultButtons }) => React.ReactNode` which you can use to keep the existing buttons and add your own.

```tsx live url=http://localhost:3000/posts/edit/123 previewHeight=280px
setInitialRoutes(["/posts/edit/123"]);
import { Refine } from "@pankod/refine-core";
import { EditButton } from "@pankod/refine-chakra-ui";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

// visible-block-start
import { Edit, Button, HStack, Box } from "@pankod/refine-chakra-ui";

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

const App = () => {
  return (
    <Refine
      routerProvider={routerProvider}
      dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
      resources={[
        {
          name: "posts",
          edit: PostEdit,
          list: DummyListPage,
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

### `headerButtonProps`

You can customize the wrapper element of the buttons at the header by using the `headerButtonProps` property.

[Refer to the `Box` documentation from Chakra UI for detailed usage. &#8594](https://chakra-ui.com/docs/components/box/usage)

```tsx live url=http://localhost:3000/posts/edit/123 previewHeight=280px
setInitialRoutes(["/posts/edit/123"]);
import { Refine } from "@pankod/refine-core";
import { EditButton } from "@pankod/refine-chakra-ui";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

// visible-block-start
import { Edit, Button } from "@pankod/refine-chakra-ui";

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
        <Button variant="outline" colorScheme="green">
          Custom Button
        </Button>
      }
    >
      <p>Rest of your page here</p>
    </Edit>
  );
};
// visible-block-end

const App = () => {
  return (
    <Refine
      routerProvider={routerProvider}
      dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
      resources={[
        {
          name: "posts",
          edit: PostEdit,
          list: DummyListPage,
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

### `footerButtons`

You can customize the buttons at the footer by using the `footerButtons` property. It accepts `React.ReactNode` or a render function `({ defaultButtons }) => React.ReactNode` which you can use to keep the existing buttons and add your own.

```tsx live url=http://localhost:3000/posts/edit/123 previewHeight=280px
setInitialRoutes(["/posts/edit/123"]);
import { Refine } from "@pankod/refine-core";
import { EditButton } from "@pankod/refine-chakra-ui";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

// visible-block-start
import { Edit, Button, HStack } from "@pankod/refine-chakra-ui";

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

const App = () => {
  return (
    <Refine
      routerProvider={routerProvider}
      dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
      resources={[
        {
          name: "posts",
          edit: PostEdit,
          list: DummyListPage,
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

### `footerButtonProps`

You can customize the wrapper element of the buttons at the footer by using the `footerButtonProps` property.

[Refer to the `Space` documentation from Ant Design for detailed usage. &#8594](https://ant.design/components/space/)

```tsx live url=http://localhost:3000/posts/edit/123 previewHeight=280px
setInitialRoutes(["/posts/edit/123"]);
import { Refine } from "@pankod/refine-core";
import { EditButton } from "@pankod/refine-chakra-ui";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

// visible-block-start
import { Edit } from "@pankod/refine-chakra-ui";

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

const App = () => {
  return (
    <Refine
      routerProvider={routerProvider}
      dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
      resources={[
        {
          name: "posts",
          edit: PostEdit,
          list: DummyListPage,
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

### Props

<PropsTable module="@pankod/refine-chakra-ui/Edit" goBack-default="`<IconArrowLeft />`" title-default="`<Title order={3}>Edit {resource.name}</Title>`" />
