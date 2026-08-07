---
id: sider
title: Sider
swizzle: true
---

There are 2 ways that will allow you to customize your `<Sider />` component if you need it.

You can access the `logout`, `dashboard`, `items` elements and `collapsed` state that we use in our default `Sider` component by using `render` properties. Customize it to your needs or you can create a custom `<Sider />` component and use it either by passing it to [`<Refine />`][refine] or using a [Custom Layout][customlayout].

:::info-tip Swizzle
You can swizzle this component to customize it with the [**refine CLI**](/core/docs/3.xx.xx/packages/documentation/cli)
:::

## Customize Sider by Using `render` property

```tsx live url=http://localhost:3000 previewHeight=420px
setInitialRoutes(["/posts"]);
import { Text, Code, Center, VStack } from "@pankod/refine-chakra-ui";

const DummyListPage = () => {
  const params = RefineCore.useRouterContext().useParams();

  return (
    <RefineChakra.List>
      <Text as="i" color="dimmed" fontSize="sm">
        URL Parameters:
      </Text>
      <br />
      <Code>{JSON.stringify(params)}</Code>
    </RefineChakra.List>
  );
};

const CustomPage = () => {
  const history = RefineCore.useRouterContext().useHistory();

  return (
    <VStack>
      <Text mt="2" as="i" color="dimmed" fontSize="sm">
        Custom Page
      </Text>
      <Center>
        <RefineChakra.Button
          size="sm"
          variant="outline"
          onClick={() => history.goBack()}
        >
          Go back
        </RefineChakra.Button>
      </Center>
    </VStack>
  );
};

const IconMoodSmile = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon icon-tabler icon-tabler-mood-smile"
    width={18}
    height={18}
    viewBox="0 0 24 24"
    stroke-width={2}
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

const IconList = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon icon-tabler icon-tabler-list"
    width={18}
    height={18}
    viewBox="0 0 24 24"
    stroke-width={2}
    stroke="currentColor"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
    <line x1={9} y1={6} x2={20} y2={6}></line>
    <line x1={9} y1={12} x2={20} y2={12}></line>
    <line x1={9} y1={18} x2={20} y2={18}></line>
    <line x1={5} y1={6} x2={5} y2="6.01"></line>
    <line x1={5} y1={12} x2={5} y2="12.01"></line>
    <line x1={5} y1={18} x2={5} y2="18.01"></line>
  </svg>
);

const IconCategory = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon icon-tabler icon-tabler-category"
    width={18}
    height={18}
    viewBox="0 0 24 24"
    stroke-width={2}
    stroke="currentColor"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
    <path d="M4 4h6v6h-6z"></path>
    <path d="M14 4h6v6h-6z"></path>
    <path d="M4 14h6v6h-6z"></path>
    <circle cx={17} cy={17} r={3}></circle>
  </svg>
);

const IconUsers = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon icon-tabler icon-tabler-users"
    width={18}
    height={18}
    viewBox="0 0 24 24"
    stroke-width={2}
    stroke="currentColor"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
    <circle cx={9} cy={7} r={4}></circle>
    <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    <path d="M21 21v-2a4 4 0 0 0 -3 -3.85"></path>
  </svg>
);

// visible-block-start
import { Refine } from "@pankod/refine-core";
//highlight-next-line
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";
import {
  ChakraProvider,
  ErrorComponent,
  Layout,
  ReadyPage,
  useNotificationProvider,
  refineTheme,
  // highlight-start
  Sider,
  Button,
  // highlight-end
} from "@pankod/refine-chakra-ui";
import {
  IconList,
  IconCategory,
  IconUsers,
  // highlight-next-line
  IconMoodSmile,
} from "@tabler/icons";

//highlight-next-line
const { Link } = routerProvider;

const App = () => {
  return (
    <ChakraProvider theme={refineTheme}>
      <Refine
        routerProvider={{
          ...routerProvider,
          routes: [{ path: "/custom-page", element: <CustomPage /> }],
        }}
        notificationProvider={notificationProvider()}
        dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
        Layout={Layout}
        // highlight-start
        Sider={() => (
          <Sider
            render={({ items }) => {
              return (
                <>
                  <Button
                    as={Link}
                    to="/custom-page"
                    variant="link"
                    color="white"
                    fontWeight="normal"
                    justifyContent="flex-start"
                    pl="6"
                    py="2"
                    leftIcon={<IconMoodSmile />}
                    _active={{
                      color: "none",
                      fontWeight: "bold",
                    }}
                    _hover={{ textDecoration: "none" }}
                  >
                    Custom Element
                  </Button>
                  {items}
                </>
              );
            }}
          />
        )}
        // highlight-end
        resources={[
          {
            name: "posts",
            list: DummyListPage,
          },
          {
            name: "categories",
            list: DummyListPage,
            icon: <IconCategory />,
          },
          {
            name: "users",
            list: DummyListPage,
            icon: <IconUsers />,
          },
        ]}
      />
    </ChakraProvider>
  );
};
// visible-block-end
render(<App />);
```

:::tip
The `Button` component gives you an implemention ready component compatible with Sider menu items. If you want to add anything else to your `Sider` component, you can use the `collapsed` state to manage your component.
:::

:::tip
[Refer to how the sider items are used in the default `Sider` component. &#8594](https://github.com/refinedev/refine/blob/v3/packages/chakra-ui/src/components/layout/sider/index.tsx#L68-L155)
:::

## Recreating the Default Sider Menu

You can also customize your Sider component by creating the `CustomSider` component.

When you examine the code of the example below, you will see the same code that we used for the `default sider` component. You can create a customized `CustomSider` component for yourself by following this code:

:::info-tip Swizzle
You can also run the `swizzle` command to export the source code of the default sider component. Refer to [**refine CLI**](/core/docs/3.xx.xx/packages/documentation/cli) for more information.
:::

```tsx title="CustomSider.tsx"
import {
  CanAccess,
  ITreeMenu,
  useIsExistAuthentication,
  useLogout,
  useMenu,
  useRefineContext,
  useRouterContext,
  useTitle,
  useTranslate,
} from "@pankod/refine-core";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  IconButton,
  Tooltip,
  TooltipProps,
  VStack,
  Sider as DefaultSider,
} from "@pankod/refine-chakra-ui";
import {
  IconList,
  IconChevronRight,
  IconChevronLeft,
  IconDashboard,
  IconLogout,
  IconMenu2,
} from "@tabler/icons";
import { RefineLayoutSiderProps } from "@pankod/refine-ui-types";

const defaultNavIcon = <IconList size={20} />;

export const Sider: React.FC<RefineLayoutSiderProps> = ({ render }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [opened, setOpened] = useState(false);

  const { Link } = useRouterContext();
  const { menuItems, selectedKey, defaultOpenKeys } = useMenu();
  const Title = useTitle();
  const isExistAuthentication = useIsExistAuthentication();
  const t = useTranslate();
  const { hasDashboard } = useRefineContext();
  const { mutate: mutateLogout } = useLogout();

  const RenderToTitle = Title ?? React.Fragment;

  const siderWidth = () => {
    if (collapsed) return "80px";
    return "200px";
  };

  const commonTooltipProps: Omit<TooltipProps, "children"> = {
    placement: "right",
    hasArrow: true,
    isDisabled: !collapsed || opened,
  };

  const renderTreeView = (tree: ITreeMenu[]) => {
    return tree.map((item) => {
      const { label, route, name, icon, children } = item;

      const isSelected = route === selectedKey;
      const isParent = children.length > 0;

      const linkProps = !isParent
        ? {
            as: Link,
            to: route,
          }
        : undefined;

      return (
        <CanAccess
          key={route}
          resource={name.toLowerCase()}
          action="list"
          params={{
            resource: item,
          }}
        >
          <Accordion
            defaultIndex={defaultOpenKeys.includes(route || "") ? 0 : -1}
            width="full"
            allowToggle
          >
            <AccordionItem border="none">
              <Tooltip label={label} {...commonTooltipProps}>
                <AccordionButton
                  pl={6}
                  pr={4}
                  pt={3}
                  pb={3}
                  as="div"
                  width="full"
                >
                  <Button
                    width="full"
                    variant="link"
                    color="white"
                    fontWeight="normal"
                    leftIcon={icon ?? (defaultNavIcon as any)}
                    rightIcon={isParent ? <AccordionIcon /> : undefined}
                    _active={{
                      color: "none",
                      fontWeight: isParent ? "normal" : "bold",
                    }}
                    _hover={{ textDecoration: "none" }}
                    isActive={isSelected}
                    {...linkProps}
                  >
                    {(!collapsed || opened) && (
                      <Box flexGrow={1} textAlign="left">
                        {label}
                      </Box>
                    )}
                  </Button>
                </AccordionButton>
              </Tooltip>

              {isParent && (
                <AccordionPanel p={0} pl={collapsed && !opened ? 0 : 4}>
                  <Accordion width="full" allowToggle>
                    {renderTreeView(children)}
                  </Accordion>
                </AccordionPanel>
              )}
            </AccordionItem>
          </Accordion>
        </CanAccess>
      );
    });
  };

  const items = renderTreeView(menuItems);

  const dashboard = hasDashboard ? (
    <CanAccess resource="dashboard" action="list">
      <Tooltip
        label={t("dashboard.title", "Dashboard")}
        {...commonTooltipProps}
      >
        <Button
          width="full"
          justifyContent={collapsed && !opened ? "center" : "flex-start"}
          pl={6}
          pr={4}
          pt={3}
          pb={3}
          fontWeight="normal"
          leftIcon={<IconDashboard size={20} />}
          variant="link"
          color="white"
          isActive={selectedKey === "/"}
          _active={{ color: "none", fontWeight: "bold" }}
          _hover={{ textDecoration: "none" }}
          as={Link}
          to="/"
        >
          {(!collapsed || opened) && t("dashboard.title", "Dashboard")}
        </Button>
      </Tooltip>
    </CanAccess>
  ) : null;

  const logout = isExistAuthentication && (
    <Tooltip label={t("buttons.logout", "Logout")} {...commonTooltipProps}>
      <Button
        width="full"
        justifyContent={collapsed && !opened ? "center" : "flex-start"}
        pl={6}
        pr={4}
        pt={3}
        pb={3}
        fontWeight="normal"
        leftIcon={<IconLogout size={20} />}
        variant="link"
        _active={{ color: "none" }}
        _hover={{ textDecoration: "none" }}
        color="white"
        onClick={() => mutateLogout()}
      >
        {(!collapsed || opened) && t("buttons.logout", "Logout")}
      </Button>
    </Tooltip>
  );

  const renderSider = () => {
    if (render) {
      return render({
        dashboard,
        logout,
        items,
        collapsed: false,
      });
    }
    return (
      <>
        {dashboard}
        {items}
        {logout}
      </>
    );
  };

  return (
    <>
      <Box
        position="fixed"
        top={16}
        left={0}
        zIndex={1200}
        display={["block", "block", "none", "none", "none"]}
      >
        <IconButton
          borderLeftRadius={0}
          bg="sider.background"
          color="white"
          _hover={{ bg: "sider.background" }}
          _active={{
            bg: "sider.background",
            transform: "translateY(1px)",
          }}
          aria-label="Open Menu"
          onClick={() => setOpened((prev) => !prev)}
        >
          <IconMenu2 />
        </IconButton>
      </Box>
      <Drawer placement="left" isOpen={opened} onClose={() => setOpened(false)}>
        <DrawerOverlay />
        <DrawerContent w="200px" maxW="200px" bg="sider.background">
          <Box display="flex" justifyContent="center" py={4}>
            <RenderToTitle collapsed={false} />
          </Box>
          <VStack mt={2} color="white" alignItems="start" flexGrow={1}>
            <Box width="full">{renderSider()}</Box>
          </VStack>
        </DrawerContent>
      </Drawer>

      <Box
        display={["none", "none", "flex"]}
        width={siderWidth()}
        transition="width 200ms ease, min-width 200ms ease"
        flexShrink={0}
      />
      <Box
        bg="sider.background"
        position="fixed"
        width={siderWidth()}
        top={0}
        h="100vh"
        display={["none", "none", "flex"]}
        flexDirection="column"
        transition="width 200ms ease, min-width 200ms ease"
      >
        <Box display="flex" justifyContent="center" py={4}>
          <RenderToTitle collapsed={collapsed} />
        </Box>
        <VStack mt={2} color="white" alignItems="start" flexGrow={1}>
          <Box width="full">{renderSider()}</Box>
        </VStack>
        <Button
          onClick={() => setCollapsed((prev) => !prev)}
          color="white"
          bg="sider.collapseButton"
          borderRadius={0}
          _hover={{ bg: "sider.collapseButton" }}
          _active={{
            bg: "sider.collapseButton",
            transform: "translateY(1px)",
          }}
        >
          {collapsed ? <IconChevronRight /> : <IconChevronLeft />}
        </Button>
      </Box>
    </>
  );
};
```

We will override the default sider and show the custom menu we implemented in its place by passing a custom component to `<Refine>`s `Sider` prop:

```tsx live url=http://localhost:3000 previewHeight=420px
setInitialRoutes(["/posts"]);

import { Code, Text, Sider as CustomSider } from "@pankod/refine-chakra-ui";

const DummyListPage = () => {
  const params = RefineCore.useRouterContext().useParams();

  return (
    <RefineChakra.List>
      <Text as="i" color="dimmed" fontSize="sm">
        URL Parameters:
      </Text>
      <br />
      <Code>{JSON.stringify(params)}</Code>
    </RefineChakra.List>
  );
};

const IconCategory = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon icon-tabler icon-tabler-category"
    width={18}
    height={18}
    viewBox="0 0 24 24"
    stroke-width={2}
    stroke="currentColor"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
    <path d="M4 4h6v6h-6z"></path>
    <path d="M14 4h6v6h-6z"></path>
    <path d="M4 14h6v6h-6z"></path>
    <circle cx={17} cy={17} r={3}></circle>
  </svg>
);

const IconUsers = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon icon-tabler icon-tabler-users"
    width={18}
    height={18}
    viewBox="0 0 24 24"
    stroke-width={2}
    stroke="currentColor"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
    <circle cx={9} cy={7} r={4}></circle>
    <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    <path d="M21 21v-2a4 4 0 0 0 -3 -3.85"></path>
  </svg>
);

// visible-block-start
import { Refine } from "@pankod/refine-core";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";
import {
  ChakraProvider,
  Layout,
  ReadyPage,
  useNotificationProvider,
  refineTheme,
} from "@pankod/refine-chakra-ui";
import { IconCategory, IconUsers } from "@tabler/icons";

//highlight-next-line
import { CustomSider } from "./components/customSider";

const App = () => {
  return (
    <ChakraProvider theme={refineTheme}>
      <Refine
        routerProvider={routerProvider}
        dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
        notificationProvider={notificationProvider()}
        ReadyPage={ReadyPage}
        Layout={Layout}
        // highlight-next-line
        Sider={CustomSider}
        resources={[
          {
            name: "posts",
            list: DummyListPage,
          },
          {
            name: "categories",
            list: DummyListPage,
            icon: <IconCategory />,
          },
          {
            name: "users",
            list: DummyListPage,
            icon: <IconUsers />,
          },
        ]}
      />
    </ChakraProvider>
  );
};
// visible-block-end

render(<App />);
```

<br />

`useMenu` hook is used to get style agnostic menu items. We render these items in the body of the sider. We create a recursive `renderTreeView` function to create menu items from the list of resources passed to `<Refine>`.

We get the `Title` component with the `useTitle` hook.

:::tip
If you want to create a multi-level menu, you can take a look at this [`multi-level menu`](/core/docs/3.xx.xx/examples/multi-level-menu) example and also [`here`](/core/docs/3.xx.xx/advanced-tutorials/multi-level-menu) is the guide.
:::

[refine]: /core/docs/3.xx.xx/api-reference/core/components/refine-config
[customlayout]: /core/docs/3.xx.xx/api-reference/chakra-ui/customization/layout
