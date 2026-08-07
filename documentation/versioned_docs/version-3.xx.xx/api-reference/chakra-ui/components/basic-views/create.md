---
id: create
title: Create
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
    <CreateButton colorScheme="black" />
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

`<Create>` provides us a layout to display the page. It does not contain any logic but adds extra functionalities like action buttons and giving titles to the page.

We'll show what `<Create>` does using properties with examples.

```tsx live url=http://localhost:3000/posts/create previewHeight=420px hideCode
setInitialRoutes(["/posts/create"]);
import { Refine } from "@pankod/refine-core";
import { CreateButton } from "@pankod/refine-chakra-ui";
import routerProvider from "@pankod/refine-react-router-v6";

// visible-block-start
import {
  Create,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
} from "@pankod/refine-chakra-ui";
import { useSelect } from "@pankod/refine-core";
import { useForm } from "@pankod/refine-react-hook-form";

const PostCreate: React.FC = () => {
  const {
    refineCore: { formLoading },
    saveButtonProps,
    register,
    formState: { errors },
  } = useForm<IPost>();

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
          id="categoryId"
          placeholder="Select Category"
          {...register("categoryId", {
            required: "Category is required",
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
    </Create>
  );
};
// visible-block-end

const App = () => {
  return (
    <Refine
      routerProvider={routerProvider}
      resources={[
        {
          name: "posts",
          create: PostCreate,
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

It allows adding title inside the `<Create>` component. if you don't pass title props it uses "Create" prefix and singular resource name by default. For example, for the `/posts/create` resource, it will be "Create post".

```tsx live url=http://localhost:3000/posts/create previewHeight=280px
setInitialRoutes(["/posts/create"]);
import { Refine } from "@pankod/refine-core";
import { CreateButton } from "@pankod/refine-chakra-ui";
import routerProvider from "@pankod/refine-react-router-v6";

// visible-block-start
import { Create, Heading } from "@pankod/refine-chakra-ui";

const PostCreate: React.FC = () => {
  return (
    /* highlight-next-line */
    <Create title={<Heading size="lg">Custom Title</Heading>}>
      <p>Rest of your page here</p>
    </Create>
  );
};
// visible-block-end

const App = () => {
  return (
    <Refine
      routerProvider={routerProvider}
      resources={[
        {
          name: "posts",
          create: PostCreate,
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

`<Create>` component has a default button that submits the form. If you want to customize this button you can use the `saveButtonProps` property like the code below.

[Refer to the `<SaveButton>` documentation for detailed usage. &#8594](/core/docs/3.xx.xx/api-reference/chakra-ui/components/buttons/save)

```tsx live url=http://localhost:3000/posts/create previewHeight=280px
setInitialRoutes(["/posts/create"]);
import { Refine } from "@pankod/refine-core";
import { CreateButton } from "@pankod/refine-chakra-ui";
import routerProvider from "@pankod/refine-react-router-v6";

// visible-block-start
import { Create } from "@pankod/refine-chakra-ui";

const PostCreate: React.FC = () => {
  return (
    /* highlight-next-line */
    <Create saveButtonProps={{ colorScheme: "red" }}>
      <p>Rest of your page here</p>
    </Create>
  );
};
// visible-block-end

const App = () => {
  return (
    <Refine
      routerProvider={routerProvider}
      resources={[
        {
          name: "posts",
          create: PostCreate,
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

### `resource`

The `<Create>` component reads the `resource` information from the route by default. This default behavior will not work on custom pages. If you want to use the `<Create>` component in a custom page, you can use the `resource` prop.

[Refer to the custom pages documentation for detailed usage. &#8594](/core/docs/3.xx.xx/advanced-tutorials/custom-pages)

```tsx live url=http://localhost:3000/custom previewHeight=280px
setInitialRoutes(["/custom"]);

// visible-block-start
import { Refine } from "@pankod/refine-core";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router-v6";
import { Layout, Create } from "@pankod/refine-chakra-ui";

const CustomPage: React.FC = () => {
  return (
    /* highlight-next-line */
    <Create resource="categories">
      <p>Rest of your page here</p>
    </Create>
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
            path: "/custom",
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

### `goBack`

To customize the back button or to disable it, you can use the `goBack` property. You can pass `false` or `null` to hide the back button.

```tsx live url=http://localhost:3000/posts/create previewHeight=280px
setInitialRoutes(["/posts/create"]);
import { Refine } from "@pankod/refine-core";
import { CreateButton } from "@pankod/refine-chakra-ui";
import routerProvider from "@pankod/refine-react-router-v6";

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
import { Create } from "@pankod/refine-chakra-ui";
/* highlight-next-line */
import { IconMoodSmile } from "@tabler/icons";

const PostCreate: React.FC = () => {
  return (
    /* highlight-next-line */
    <Create goBack={IconMoodSmile}>
      <p>Rest of your page here 2</p>
    </Create>
  );
};
// visible-block-end

const App = () => {
  return (
    <Refine
      routerProvider={routerProvider}
      resources={[
        {
          name: "posts",
          create: PostCreate,
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

To toggle the loading state of the `<Create/>` component, you can use the `isLoading` property.

```tsx live url=http://localhost:3000/posts/create previewHeight=280px
setInitialRoutes(["/posts/create"]);
import { Refine } from "@pankod/refine-core";
import { CreateButton } from "@pankod/refine-chakra-ui";
import routerProvider from "@pankod/refine-react-router-v6";

// visible-block-start
import { Create } from "@pankod/refine-chakra-ui";

const PostCreate: React.FC = () => {
  return (
    /* highlight-next-line */
    <Create isLoading={true}>
      <p>Rest of your page here</p>
    </Create>
  );
};
// visible-block-end

const App = () => {
  return (
    <Refine
      routerProvider={routerProvider}
      resources={[
        {
          name: "posts",
          create: PostCreate,
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

```tsx live url=http://localhost:3000/posts/create previewHeight=280px
setInitialRoutes(["/posts/create"]);
import { Refine } from "@pankod/refine-core";
import { CreateButton } from "@pankod/refine-chakra-ui";
import routerProvider from "@pankod/refine-react-router-v6";

// visible-block-start
import { Create, Breadcrumb, Box } from "@pankod/refine-chakra-ui";

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

const App = () => {
  return (
    <Refine
      routerProvider={routerProvider}
      resources={[
        {
          name: "posts",
          create: PostCreate,
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

If you want to customize the wrapper of the `<Create/>` component, you can use the `wrapperProps` property. For `@pankod/refine-chakra-ui` wrapper element is `<Card>`s and `wrapperProps` can get every attribute that `<Box>` can get.

[Refer to the `Box` documentation from Chakra UI for detailed usage. &#8594](https://chakra-ui.com/docs/components/box/usage)

```tsx live url=http://localhost:3000/posts/create previewHeight=280px
setInitialRoutes(["/posts/create"]);
import { Refine } from "@pankod/refine-core";
import { CreateButton } from "@pankod/refine-chakra-ui";
import routerProvider from "@pankod/refine-react-router-v6";

// visible-block-start
import { Create } from "@pankod/refine-chakra-ui";

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

const App = () => {
  return (
    <Refine
      routerProvider={routerProvider}
      resources={[
        {
          name: "posts",
          create: PostCreate,
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

If you want to customize the header of the `<Create/>` component, you can use the `headerProps` property.

[Refer to the `Box` documentation from Chakra UI for detailed usage. &#8594](https://chakra-ui.com/docs/components/box/usage)

```tsx live url=http://localhost:3000/posts/create previewHeight=280px
setInitialRoutes(["/posts/create"]);
import { Refine } from "@pankod/refine-core";
import { CreateButton } from "@pankod/refine-chakra-ui";
import routerProvider from "@pankod/refine-react-router-v6";

// visible-block-start
import { Create } from "@pankod/refine-chakra-ui";

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

const App = () => {
  return (
    <Refine
      routerProvider={routerProvider}
      resources={[
        {
          name: "posts",
          create: PostCreate,
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

If you want to customize the content of the `<Create/>` component, you can use the `contentProps` property.

[Refer to the `Box` documentation from Chakra UI for detailed usage. &#8594](https://chakra-ui.com/docs/components/box/usage)

```tsx live url=http://localhost:3000/posts/create previewHeight=320px
setInitialRoutes(["/posts/create"]);
import { Refine } from "@pankod/refine-core";
import { CreateButton } from "@pankod/refine-chakra-ui";
import routerProvider from "@pankod/refine-react-router-v6";

// visible-block-start
import { Create } from "@pankod/refine-chakra-ui";

const PostCreate: React.FC = () => {
  return (
    <Create
      // highlight-start
      contentProps={{
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

const App = () => {
  return (
    <Refine
      routerProvider={routerProvider}
      resources={[
        {
          name: "posts",
          create: PostCreate,
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

```tsx live url=http://localhost:3000/posts/create previewHeight=280px
setInitialRoutes(["/posts/create"]);
import { Refine } from "@pankod/refine-core";
import { CreateButton } from "@pankod/refine-chakra-ui";
import routerProvider from "@pankod/refine-react-router-v6";

// visible-block-start
import { Create, Button, Box } from "@pankod/refine-chakra-ui";

const PostCreate: React.FC = () => {
  return (
    <Create
      // highlight-start
      headerButtons={({ defaultButtons }) => (
        <Box borderColor="blue" borderStyle="dashed" borderWidth="2px" p="2">
          {defaultButtons}
          <Button colorScheme="red" variant="solid">
            Custom Button
          </Button>
        </Box>
      )}
      // highlight-end
    >
      <p>Rest of your page here</p>
    </Create>
  );
};
// visible-block-end

const App = () => {
  return (
    <Refine
      routerProvider={routerProvider}
      resources={[
        {
          name: "posts",
          create: PostCreate,
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

```tsx live url=http://localhost:3000/posts/create previewHeight=280px
setInitialRoutes(["/posts/create"]);
import { Refine } from "@pankod/refine-core";
import { CreateButton } from "@pankod/refine-chakra-ui";
import routerProvider from "@pankod/refine-react-router-v6";

// visible-block-start
import { Create, Button } from "@pankod/refine-chakra-ui";

const PostCreate: React.FC = () => {
  return (
    <Create
      // highlight-start
      headerButtonProps={{
        borderColor: "blue",
        borderStyle: "dashed",
        borderWidth: "2px",
      }}
      // highlight-end
      headerButtons={<Button type="primary">Custom Button</Button>}
    >
      <p>Rest of your page here</p>
    </Create>
  );
};
// visible-block-end

const App = () => {
  return (
    <Refine
      routerProvider={routerProvider}
      resources={[
        {
          name: "posts",
          create: PostCreate,
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

```tsx live url=http://localhost:3000/posts/create previewHeight=280px
setInitialRoutes(["/posts/create"]);
import { Refine } from "@pankod/refine-core";
import { CreateButton } from "@pankod/refine-chakra-ui";
import routerProvider from "@pankod/refine-react-router-v6";

// visible-block-start
import { Create, Button, HStack } from "@pankod/refine-chakra-ui";

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

const App = () => {
  return (
    <Refine
      routerProvider={routerProvider}
      resources={[
        {
          name: "posts",
          create: PostCreate,
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

[Refer to the `Box` documentation from Chakra UI for detailed usage. &#8594](https://chakra-ui.com/docs/components/box/usage)

```tsx live url=http://localhost:3000/posts/create previewHeight=280px
setInitialRoutes(["/posts/create"]);
import { Refine } from "@pankod/refine-core";
import { CreateButton } from "@pankod/refine-chakra-ui";
import routerProvider from "@pankod/refine-react-router-v6";

// visible-block-start
import { Create } from "@pankod/refine-chakra-ui";

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

const App = () => {
  return (
    <Refine
      routerProvider={routerProvider}
      resources={[
        {
          name: "posts",
          create: PostCreate,
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

<PropsTable module="@pankod/refine-chakra-ui/Create" goBack-default="`<IconArrowLeft />`" title-default="`<Title order={3}>Create {resource.name}</Title>`"/>
