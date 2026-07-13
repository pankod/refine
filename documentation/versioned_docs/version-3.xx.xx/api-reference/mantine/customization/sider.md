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
import { Text, Code, Button, Box, Center } from "@pankod/refine-mantine";

const DummyListPage = () => {
  const params = RefineCore.useRouterContext().useParams();

  return (
    <RefineMantine.List>
      <Text italic color="dimmed" size="sm">
        URL Parameters:
      </Text>
      <Code>{JSON.stringify(params)}</Code>
    </RefineMantine.List>
  );
};

const CustomPage = () => {
  const history = RefineCore.useRouterContext().useHistory();

  return (
    <>
      <Text mt="sm" align="center" italic color="dimmed" size="sm">
        Custom Page
      </Text>
      <Center>
        <Button
          mt="sm"
          size="xs"
          variant="outline"
          onClick={() => history.goBack()}
        >
          Go back
        </Button>
      </Center>
    </>
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
  MantineProvider,
  Global,
  NotificationsProvider,
  useNotificationProvider,
  LightTheme,
  Layout,
  // highlight-start
  Sider,
  NavLink,
  // highlight-end
} from "@pankod/refine-mantine";
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
    <MantineProvider theme={LightTheme} withNormalizeCSS withGlobalStyles>
      <Global styles={{ body: { WebkitFontSmoothing: "auto" } }} />
      <NotificationsProvider position="top-right">
        <Refine
          routerProvider={{
            ...routerProvider,
            routes: [{ path: "/custom-page", element: <CustomPage /> }],
          }}
          notificationProvider={useNotificationProvider}
          dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
          Layout={Layout}
          // highlight-start
          Sider={() => (
            <Sider
              render={({ items }) => {
                return (
                  <>
                    <NavLink
                      component={Link}
                      to="/custom-page"
                      label="Custom Element"
                      icon={<IconMoodSmile />}
                      styles={{
                        root: {
                          display: "flex",
                          color: "white",
                          fontWeight: 500,
                          "&:hover": {
                            backgroundColor: "unset",
                          },
                        },
                      }}
                    />
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
      </NotificationsProvider>
    </MantineProvider>
  );
};
// visible-block-end
render(<App />);
```

:::tip
The `NavLink` component gives you an implemention ready component compatible with Sider menu items. If you want to add anything else to your `Sider` component, you can use the `collapsed` state to manage your component.
:::

:::tip
[Refer to how the `NavLink` component is used in the default `Sider` component. &#8594](https://github.com/pankod/refine/blob/v3/packages/mantine/src/components/layout/sider/index.tsx#L119-L132)
:::

## Recreating the Default Sider Menu

You can also customize your Sider component by creating the `CustomSider` component.

When you examine the code of the example below, you will see the same code that we used for the `default sider` component. You can create a customized `CustomSider` component for yourself by following this code:

:::info-tip Swizzle
You can also run the `swizzle` command to export the source code of the default sider component. Refer to [**refine CLI**](/core/docs/3.xx.xx/packages/documentation/cli) for more information.
:::

```tsx title="CustomSider.tsx"
import React, { useState } from "react";
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
  ActionIcon,
  Box,
  Drawer,
  Navbar,
  NavLink,
  NavLinkStylesNames,
  NavLinkStylesParams,
  ScrollArea,
  MediaQuery,
  Button,
  Tooltip,
  TooltipProps,
  Styles,
  Title as DefaultTitle,
} from "@pankod/refine-mantine";
import {
  IconList,
  IconMenu2,
  IconChevronRight,
  IconChevronLeft,
  IconLogout,
  IconDashboard,
} from "@tabler/icons";
import { RefineLayoutSiderProps } from "@pankod/refine-ui-types";

const defaultNavIcon = <IconList size={18} />;

const CustomSider: React.FC<RefineLayoutSiderProps> = ({ render }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [opened, setOpened] = useState(false);

  const { Link } = useRouterContext();
  const { defaultOpenKeys, menuItems, selectedKey } = useMenu();
  const Title = useTitle();
  const isExistAuthentication = useIsExistAuthentication();
  const t = useTranslate();
  const { hasDashboard } = useRefineContext();
  const { mutate: mutateLogout } = useLogout();

  const RenderToTitle = Title ?? DefaultTitle;

  const drawerWidth = () => {
    if (collapsed) return 80;
    return 200;
  };

  const commonNavLinkStyles: Styles<NavLinkStylesNames, NavLinkStylesParams> = {
    root: {
      display: "flex",
      color: "white",
      fontWeight: 500,
      "&:hover": {
        backgroundColor: "unset",
      },
      "&[data-active]": {
        backgroundColor: "#ffffff1a",
        color: "white",
        fontWeight: 700,
        "&:hover": {
          backgroundColor: "#ffffff1a",
        },
      },
      justifyContent: collapsed && !opened ? "center" : "flex-start",
    },
    icon: {
      marginRight: collapsed && !opened ? 0 : 12,
    },
    body: {
      display: collapsed && !opened ? "none" : "flex",
    },
  };

  const commonTooltipProps: Partial<TooltipProps> = {
    disabled: !collapsed || opened,
    position: "right",
    withinPortal: true,
    withArrow: true,
    arrowSize: 8,
    arrowOffset: 12,
    offset: 4,
  };

  const renderTreeView = (tree: ITreeMenu[], selectedKey: string) => {
    return tree.map((item) => {
      const { icon, label, route, name, children } = item;

      const isSelected = route === selectedKey;
      const isParent = children.length > 0;

      const additionalLinkProps = isParent
        ? {}
        : { component: Link, to: route };

      return (
        <CanAccess
          key={route}
          resource={name.toLowerCase()}
          action="list"
          params={{
            resource: item,
          }}
        >
          <Tooltip label={label} {...commonTooltipProps}>
            <NavLink
              key={route}
              label={collapsed && !opened ? null : label}
              icon={icon ?? defaultNavIcon}
              active={isSelected}
              childrenOffset={collapsed && !opened ? 0 : 12}
              defaultOpened={defaultOpenKeys.includes(route || "")}
              styles={commonNavLinkStyles}
              {...additionalLinkProps}
            >
              {isParent && renderTreeView(children, selectedKey)}
            </NavLink>
          </Tooltip>
        </CanAccess>
      );
    });
  };

  const items = renderTreeView(menuItems, selectedKey);

  const dashboard = hasDashboard ? (
    <CanAccess resource="dashboard" action="list">
      <Tooltip
        label={t("dashboard.title", "Dashboard")}
        {...commonTooltipProps}
      >
        <NavLink
          key="dashboard"
          label={
            collapsed && !opened ? null : t("dashboard.title", "Dashboard")
          }
          icon={<IconDashboard size={18} />}
          component={Link}
          to="/"
          active={selectedKey === "/"}
          styles={commonNavLinkStyles}
        />
      </Tooltip>
    </CanAccess>
  ) : null;

  const logout = isExistAuthentication && (
    <Tooltip label={t("buttons.logout", "Logout")} {...commonTooltipProps}>
      <NavLink
        key="logout"
        label={collapsed && !opened ? null : t("buttons.logout", "Logout")}
        icon={<IconLogout size={18} />}
        onClick={() => mutateLogout()}
        styles={commonNavLinkStyles}
      />
    </Tooltip>
  );

  const renderSider = () => {
    if (render) {
      return render({
        dashboard,
        logout,
        items,
        collapsed,
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
      <MediaQuery largerThan="md" styles={{ display: "none" }}>
        <Box sx={{ position: "fixed", top: 64, left: 0, zIndex: 1199 }}>
          <ActionIcon
            color="white"
            size={36}
            sx={{
              borderRadius: "0 6px 6px 0",
              backgroundColor: "#2A132E",
              color: "white",
              "&:hover": {
                backgroundColor: "#2A132E",
              },
            }}
            onClick={() => setOpened((prev) => !prev)}
          >
            <IconMenu2 />
          </ActionIcon>
        </Box>
      </MediaQuery>

      <MediaQuery largerThan="md" styles={{ display: "none" }}>
        <Drawer
          opened={opened}
          onClose={() => setOpened(false)}
          size={200}
          zIndex={1200}
          withCloseButton={false}
          styles={{
            drawer: {
              overflow: "hidden",
              backgroundColor: "#2A132E",
            },
          }}
        >
          <Navbar.Section px="xs">
            <RenderToTitle collapsed={false} />
          </Navbar.Section>
          <Navbar.Section grow component={ScrollArea} mx="-xs" px="xs">
            {renderSider()}
          </Navbar.Section>
        </Drawer>
      </MediaQuery>

      <MediaQuery smallerThan="md" styles={{ display: "none" }}>
        <Box
          sx={{
            width: drawerWidth(),
            transition: "width 200ms ease, min-width 200ms ease",
          }}
        />
      </MediaQuery>

      <MediaQuery smallerThan="md" styles={{ display: "none" }}>
        <Navbar
          width={{ base: drawerWidth() }}
          sx={{
            overflow: "hidden",
            transition: "width 200ms ease, min-width 200ms ease",
            backgroundColor: "#2A132E",
            position: "fixed",
            top: 0,
            height: "100vh",
          }}
        >
          <Navbar.Section px="xs">
            <RenderToTitle collapsed={collapsed} />
          </Navbar.Section>
          <Navbar.Section grow mt="sm" component={ScrollArea} mx="-xs" px="xs">
            {renderSider()}
          </Navbar.Section>
          <Navbar.Section>
            <Button
              sx={{
                background: "rgba(0,0,0,.5)",
                borderRadius: 0,
                borderTop: "1px solid #ffffff1a",
              }}
              size="md"
              variant="gradient"
              fullWidth
              onClick={() => setCollapsed((prev) => !prev)}
            >
              {collapsed ? <IconChevronRight /> : <IconChevronLeft />}
            </Button>
          </Navbar.Section>
        </Navbar>
      </MediaQuery>
    </>
  );
};
```

We will override the default sider and show the custom menu we implemented in its place by passing a custom component to `<Refine>`s `Sider` prop:

```tsx live url=http://localhost:3000 previewHeight=420px
setInitialRoutes(["/posts"]);
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
  Code,
  Text,
  ActionIcon,
  Box,
  Drawer,
  Navbar,
  NavLink,
  NavLinkStylesNames,
  NavLinkStylesParams,
  ScrollArea,
  MediaQuery,
  Button,
  Tooltip,
  TooltipProps,
  Styles,
  RefineTitle as DefaultTitle,
} from "@pankod/refine-mantine";

const DummyListPage = () => {
  const params = RefineCore.useRouterContext().useParams();

  return (
    <RefineMantine.List>
      <Text italic color="dimmed" size="sm">
        URL Parameters:
      </Text>
      <Code>{JSON.stringify(params)}</Code>
    </RefineMantine.List>
  );
};

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

const IconMenu2 = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon icon-tabler icon-tabler-menu-2"
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
    <line x1={4} y1={6} x2={20} y2={6}></line>
    <line x1={4} y1={12} x2={20} y2={12}></line>
    <line x1={4} y1={18} x2={20} y2={18}></line>
  </svg>
);

const IconChevronRight = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon icon-tabler icon-tabler-chevron-right"
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
    <polyline points="9 6 15 12 9 18"></polyline>
  </svg>
);

const IconChevronLeft = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon icon-tabler icon-tabler-chevron-left"
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
    <polyline points="15 6 9 12 15 18"></polyline>
  </svg>
);

const IconLogout = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon icon-tabler icon-tabler-logout"
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
    <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2"></path>
    <path d="M7 12h14l-3 -3m0 6l3 -3"></path>
  </svg>
);

const IconDashboard = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon icon-tabler icon-tabler-dashboard"
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
    <circle cx={12} cy={13} r={2}></circle>
    <line x1="13.45" y1="11.55" x2="15.5" y2="9.5"></line>
    <path d="M6.4 20a9 9 0 1 1 11.2 0z"></path>
  </svg>
);

const defaultNavIcon = <IconList size={18} />;

const CustomSider: React.FC<RefineLayoutSiderProps> = ({ render }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [opened, setOpened] = useState(false);

  const { Link } = useRouterContext();
  const { defaultOpenKeys, menuItems, selectedKey } = useMenu();
  const Title = useTitle();
  const isExistAuthentication = useIsExistAuthentication();
  const t = useTranslate();
  const { hasDashboard } = useRefineContext();
  const { mutate: mutateLogout } = useLogout();

  const RenderToTitle = Title ?? DefaultTitle;

  const drawerWidth = () => {
    if (collapsed) return 80;
    return 200;
  };

  const commonNavLinkStyles: Styles<NavLinkStylesNames, NavLinkStylesParams> = {
    root: {
      display: "flex",
      color: "white",
      fontWeight: 500,
      "&:hover": {
        backgroundColor: "unset",
      },
      "&[data-active]": {
        backgroundColor: "#ffffff1a",
        color: "white",
        fontWeight: 700,
        "&:hover": {
          backgroundColor: "#ffffff1a",
        },
      },
      justifyContent: collapsed && !opened ? "center" : "flex-start",
    },
    icon: {
      marginRight: collapsed && !opened ? 0 : 12,
    },
    body: {
      display: collapsed && !opened ? "none" : "flex",
    },
  };

  const commonTooltipProps: Partial<TooltipProps> = {
    disabled: !collapsed || opened,
    position: "right",
    withinPortal: true,
    withArrow: true,
    arrowSize: 8,
    arrowOffset: 12,
    offset: 4,
  };

  const renderTreeView = (tree: ITreeMenu[], selectedKey: string) => {
    return tree.map((item) => {
      const { icon, label, route, name, children } = item;

      const isSelected = route === selectedKey;
      const isParent = children.length > 0;

      const additionalLinkProps = isParent
        ? {}
        : { component: Link, to: route };

      return (
        <CanAccess
          key={route}
          resource={name.toLowerCase()}
          action="list"
          params={{
            resource: item,
          }}
        >
          <Tooltip label={label} {...commonTooltipProps}>
            <NavLink
              key={route}
              label={collapsed && !opened ? null : label}
              icon={icon ?? defaultNavIcon}
              active={isSelected}
              childrenOffset={collapsed && !opened ? 0 : 12}
              defaultOpened={defaultOpenKeys.includes(route || "")}
              styles={commonNavLinkStyles}
              {...additionalLinkProps}
            >
              {isParent && renderTreeView(children, selectedKey)}
            </NavLink>
          </Tooltip>
        </CanAccess>
      );
    });
  };

  const items = renderTreeView(menuItems, selectedKey);

  const dashboard = hasDashboard ? (
    <CanAccess resource="dashboard" action="list">
      <Tooltip
        label={t("dashboard.title", "Dashboard")}
        {...commonTooltipProps}
      >
        <NavLink
          key="dashboard"
          label={
            collapsed && !opened ? null : t("dashboard.title", "Dashboard")
          }
          icon={<IconDashboard size={18} />}
          component={Link}
          to="/"
          active={selectedKey === "/"}
          styles={commonNavLinkStyles}
        />
      </Tooltip>
    </CanAccess>
  ) : null;

  const logout = isExistAuthentication && (
    <Tooltip label={t("buttons.logout", "Logout")} {...commonTooltipProps}>
      <NavLink
        key="logout"
        label={collapsed && !opened ? null : t("buttons.logout", "Logout")}
        icon={<IconLogout size={18} />}
        onClick={() => mutateLogout()}
        styles={commonNavLinkStyles}
      />
    </Tooltip>
  );

  const renderSider = () => {
    if (render) {
      return render({
        dashboard,
        logout,
        items,
        collapsed,
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
      <MediaQuery largerThan="md" styles={{ display: "none" }}>
        <Box sx={{ position: "fixed", top: 64, left: 0, zIndex: 1199 }}>
          <ActionIcon
            color="white"
            size={36}
            sx={{
              borderRadius: "0 6px 6px 0",
              backgroundColor: "#2A132E",
              color: "white",
              "&:hover": {
                backgroundColor: "#2A132E",
              },
            }}
            onClick={() => setOpened((prev) => !prev)}
          >
            <IconMenu2 />
          </ActionIcon>
        </Box>
      </MediaQuery>

      <MediaQuery largerThan="md" styles={{ display: "none" }}>
        <Drawer
          opened={opened}
          onClose={() => setOpened(false)}
          size={200}
          zIndex={1200}
          withCloseButton={false}
          styles={{
            drawer: {
              overflow: "hidden",
              backgroundColor: "#2A132E",
            },
          }}
        >
          <Navbar.Section px="xs">
            <RenderToTitle collapsed={false} />
          </Navbar.Section>
          <Navbar.Section grow component={ScrollArea} mx="-xs" px="xs">
            {renderSider()}
          </Navbar.Section>
        </Drawer>
      </MediaQuery>

      <MediaQuery smallerThan="md" styles={{ display: "none" }}>
        <Box
          sx={{
            width: drawerWidth(),
            transition: "width 200ms ease, min-width 200ms ease",
          }}
        />
      </MediaQuery>

      <MediaQuery smallerThan="md" styles={{ display: "none" }}>
        <Navbar
          width={{ base: drawerWidth() }}
          sx={{
            overflow: "hidden",
            transition: "width 200ms ease, min-width 200ms ease",
            backgroundColor: "#2A132E",
            position: "fixed",
            top: 0,
            height: "100vh",
          }}
        >
          <Navbar.Section px="xs">
            <RenderToTitle collapsed={collapsed} />
          </Navbar.Section>
          <Navbar.Section grow mt="sm" component={ScrollArea} mx="-xs" px="xs">
            {renderSider()}
          </Navbar.Section>
          <Navbar.Section>
            <Button
              sx={{
                background: "rgba(0,0,0,.5)",
                borderRadius: 0,
                borderTop: "1px solid #ffffff1a",
              }}
              size="md"
              variant="gradient"
              fullWidth
              onClick={() => setCollapsed((prev) => !prev)}
            >
              {collapsed ? <IconChevronRight /> : <IconChevronLeft />}
            </Button>
          </Navbar.Section>
        </Navbar>
      </MediaQuery>
    </>
  );
};

// visible-block-start
import { Refine } from "@pankod/refine-core";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";
import {
  MantineProvider,
  Global,
  NotificationsProvider,
  useNotificationProvider,
  LightTheme,
  Layout,
} from "@pankod/refine-mantine";
import { IconCategory, IconUsers } from "@tabler/icons";

//highlight-next-line
import { CustomSider } from "./components/customSider";

const App = () => {
  return (
    <MantineProvider theme={LightTheme} withNormalizeCSS withGlobalStyles>
      <Global styles={{ body: { WebkitFontSmoothing: "auto" } }} />
      <NotificationsProvider position="top-right">
        <Refine
          routerProvider={routerProvider}
          dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
          notificationProvider={useNotificationProvider}
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
      </NotificationsProvider>
    </MantineProvider>
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
[customlayout]: /core/docs/3.xx.xx/api-reference/mantine/customization/layout
