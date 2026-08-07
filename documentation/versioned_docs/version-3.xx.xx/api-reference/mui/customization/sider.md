---
id: mui-custom-sider
title: Sider
swizzle: true
---

```tsx live shared
const Wrapper = ({ children }) => {
  return (
    <RefineMui.ThemeProvider theme={RefineMui.LightTheme}>
      <RefineMui.CssBaseline />
      <RefineMui.GlobalStyles
        styles={{ html: { WebkitFontSmoothing: "auto" } }}
      />
      {children}
    </RefineMui.ThemeProvider>
  );
};
```

You can access the `logout`, `dashboard`, `items` elements and `collapsed` state that we use in our default `Sider` component by using `render` properties. Customize it to your needs or you can create a custom `<Sider />` component and use it either by passing it to [`<Refine />`][refine] or using a [Custom Layout][muicustomlayout].

:::info-tip Swizzle
You can swizzle this component to customize it with the [**refine CLI**](/core/docs/3.xx.xx/packages/documentation/cli)
:::

## Customize Sider by Using `render` property

```tsx live
// visible-block-start
import { Refine } from "@pankod/refine-core";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";
import { Box, ListItemText, Sider } from "@pankod/refine-mui";

const PostList: React.FC = () => {
  return <div>PostList Page</div>;
};

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
  return (
    <Refine
      routerProvider={routerProvider}
      dataProvider={dataProvider(API_URL)}
      resources={[
        {
          name: "posts",
          list: PostList,
        },
      ]}
      Sider={Sider}
      Layout={({ children, Sider, Header, Footer, OffLayoutArea }) => (
        <Box display="flex" flexDirection="row">
          {/* highlight-start */}
          <Sider
            render={({ items }) => {
              return (
                <>
                  <ListItemText primary="Custom Element" />
                  {items}
                </>
              );
            }}
          />
          {/* highlight-end */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              minHeight: "100vh",
            }}
          >
            {Header && <Header />}
            <Box
              component="main"
              sx={{
                p: { xs: 1, md: 2, lg: 3 },
                flexGrow: 1,
                bgcolor: (theme) => theme.palette.background.default,
              }}
            >
              {children}
            </Box>
            {Footer && <Footer />}
          </Box>
          {OffLayoutArea && <OffLayoutArea />}
        </Box>
      )}
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

:::tip
You can also use the `collapsed` state to manage the component that you want to add to your `Sider` component.
:::

## Recreating the Default Sider Menu

You can also customize your Sider component by creating the `CustomSider` component.

When you examine the code of the live-preview example below, you will see the same code that we used for the `default sider` component. You can create a customized `CustomSider` component for yourself by following this code.

:::info-tip Swizzle
You can also run the `swizzle` command to export the source code of the default sider component. Refer to [**refine CLI**](/core/docs/3.xx.xx/packages/documentation/cli) for more information.
:::

```tsx title="src/components/CustomSider.tsx"
import React, { useState } from "react";
import {
  CanAccess,
  ITreeMenu,
  useIsExistAuthentication,
  useLogout,
  useTitle,
  useTranslate,
  useRouterContext,
  useMenu,
  useRefineContext,
} from "@pankod/refine-core";
import {
  Layout,
  Box,
  Drawer,
  MuiList,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Tooltip,
  Button,
  IconButton,
  Title as DefaultTitle,
} from "@pankod/refine-mui";
import type { RefineLayoutSiderProps } from "@pankod/refine-mui";

// We use @mui/icons-material for icons but you can use any icon library you want.
import {
  ListOutlined,
  Logout,
  ExpandLess,
  ExpandMore,
  ChevronLeft,
  ChevronRight,
  MenuRounded,
  Dashboard,
} from "@mui/icons-material";

const CustomSider: React.FC<RefineLayoutSiderProps> = ({ render }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [opened, setOpened] = useState(false);

  const drawerWidth = () => {
    if (collapsed) return 64;
    return 200;
  };

  const t = useTranslate();
  const { Link } = useRouterContext();
  const { hasDashboard } = useRefineContext();
  const translate = useTranslate();

  const { menuItems, selectedKey, defaultOpenKeys } = useMenu();
  const isExistAuthentication = useIsExistAuthentication();
  const { mutate: mutateLogout } = useLogout();
  const Title = useTitle();

  const [open, setOpen] = useState<{ [k: string]: any }>({});

  React.useEffect(() => {
    setOpen((previousOpen) => {
      const previousOpenKeys: string[] = Object.keys(previousOpen);
      const uniqueKeys = new Set([...previousOpenKeys, ...defaultOpenKeys]);
      const uniqueKeysRecord = Object.fromEntries(
        Array.from(uniqueKeys.values()).map((key) => [key, true]),
      );
      return uniqueKeysRecord;
    });
  }, [defaultOpenKeys]);

  const RenderToTitle = Title ?? DefaultTitle;

  const handleClick = (key: string) => {
    setOpen({ ...open, [key]: !open[key] });
  };

  const renderTreeView = (tree: ITreeMenu[], selectedKey: string) => {
    return tree.map((item: ITreeMenu) => {
      const { icon, label, route, name, children, parentName } = item;
      const isOpen = open[route || ""] || false;

      const isSelected = route === selectedKey;
      const isNested = !(parentName === undefined);

      if (children.length > 0) {
        return (
          <CanAccess
            key={route}
            resource={name.toLowerCase()}
            action="list"
            params={{
              resource: item,
            }}
          >
            <div key={route}>
              <Tooltip
                title={label ?? name}
                placement="right"
                disableHoverListener={!collapsed}
                arrow
              >
                <ListItemButton
                  onClick={() => {
                    if (collapsed) {
                      setCollapsed(false);
                      if (!isOpen) {
                        handleClick(route || "");
                      }
                    } else {
                      handleClick(route || "");
                    }
                  }}
                  sx={{
                    pl: isNested ? 4 : 2,
                    justifyContent: "center",
                    "&.Mui-selected": {
                      "&:hover": {
                        backgroundColor: "transparent",
                      },
                      backgroundColor: "transparent",
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      justifyContent: "center",
                      minWidth: 36,
                      color: "primary.contrastText",
                    }}
                  >
                    {icon ?? <ListOutlined />}
                  </ListItemIcon>
                  <ListItemText
                    primary={label}
                    primaryTypographyProps={{
                      noWrap: true,
                      fontSize: "14px",
                      fontWeight: isSelected ? "bold" : "normal",
                    }}
                  />
                  {!collapsed && (isOpen ? <ExpandLess /> : <ExpandMore />)}
                </ListItemButton>
              </Tooltip>
              {!collapsed && (
                <Collapse in={open[route || ""]} timeout="auto" unmountOnExit>
                  <MuiList component="div" disablePadding>
                    {renderTreeView(children, selectedKey)}
                  </MuiList>
                </Collapse>
              )}
            </div>
          </CanAccess>
        );
      }

      return (
        <CanAccess
          key={route}
          resource={name.toLowerCase()}
          action="list"
          params={{ resource: item }}
        >
          <Tooltip
            title={label ?? name}
            placement="right"
            disableHoverListener={!collapsed}
            arrow
          >
            <ListItemButton
              component={Link}
              to={route}
              selected={isSelected}
              onClick={() => {
                setOpened(false);
              }}
              sx={{
                pl: isNested ? 4 : 2,
                py: isNested ? 1.25 : 1,
                "&.Mui-selected": {
                  "&:hover": {
                    backgroundColor: "transparent",
                  },
                  backgroundColor: "transparent",
                },
                justifyContent: "center",
              }}
            >
              <ListItemIcon
                sx={{
                  justifyContent: "center",
                  minWidth: 36,
                  color: "primary.contrastText",
                }}
              >
                {icon ?? <ListOutlined />}
              </ListItemIcon>
              <ListItemText
                primary={label}
                primaryTypographyProps={{
                  noWrap: true,
                  fontSize: "14px",
                  fontWeight: isSelected ? "bold" : "normal",
                }}
              />
            </ListItemButton>
          </Tooltip>
        </CanAccess>
      );
    });
  };

  const dashboard = hasDashboard ? (
    <CanAccess resource="dashboard" action="list">
      <Tooltip
        title={translate("dashboard.title", "Dashboard")}
        placement="right"
        disableHoverListener={!collapsed}
        arrow
      >
        <ListItemButton
          component={Link}
          to="/"
          selected={selectedKey === "/"}
          onClick={() => {
            setOpened(false);
          }}
          sx={{
            pl: 2,
            py: 1,
            "&.Mui-selected": {
              "&:hover": {
                backgroundColor: "transparent",
              },
              backgroundColor: "transparent",
            },
            justifyContent: "center",
          }}
        >
          <ListItemIcon
            sx={{
              justifyContent: "center",
              minWidth: 36,
              color: "primary.contrastText",
            }}
          >
            <Dashboard />
          </ListItemIcon>
          <ListItemText
            primary={translate("dashboard.title", "Dashboard")}
            primaryTypographyProps={{
              noWrap: true,
              fontSize: "14px",
              fontWeight: selectedKey === "/" ? "bold" : "normal",
            }}
          />
        </ListItemButton>
      </Tooltip>
    </CanAccess>
  ) : null;

  const logout = isExistAuthentication && (
    <Tooltip
      title={t("buttons.logout", "Logout")}
      placement="right"
      disableHoverListener={!collapsed}
      arrow
    >
      <ListItemButton
        key="logout"
        onClick={() => mutateLogout()}
        sx={{ justifyContent: "center" }}
      >
        <ListItemIcon
          sx={{
            justifyContent: "center",
            minWidth: 36,
            color: "primary.contrastText",
          }}
        >
          <Logout />
        </ListItemIcon>
        <ListItemText
          primary={t("buttons.logout", "Logout")}
          primaryTypographyProps={{
            noWrap: true,
            fontSize: "14px",
          }}
        />
      </ListItemButton>
    </Tooltip>
  );

  const items = renderTreeView(menuItems, selectedKey);

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

  const drawer = (
    <MuiList disablePadding sx={{ mt: 1, color: "primary.contrastText" }}>
      {renderSider()}
    </MuiList>
  );

  return (
    <>
      <Box
        sx={{
          width: { xs: drawerWidth() },
          display: {
            xs: "none",
            md: "block",
          },
          transition: "width 0.3s ease",
        }}
      />
      <Box
        component="nav"
        sx={{
          position: "fixed",
          zIndex: 1101,
          width: { sm: drawerWidth() },
          display: "flex",
        }}
      >
        <Drawer
          variant="temporary"
          open={opened}
          onClose={() => setOpened(false)}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { sm: "block", md: "none" },
            "& .MuiDrawer-paper": {
              width: 256,
              bgcolor: "secondary.main",
            },
          }}
        >
          <Box
            sx={{
              height: 64,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <RenderToTitle collapsed={false} />
          </Box>
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          PaperProps={{ elevation: 1 }}
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              bgcolor: "secondary.main",
              overflow: "hidden",
              transition: "width 200ms cubic-bezier(0.4, 0, 0.6, 1) 0ms",
            },
          }}
          open
        >
          <Box
            sx={{
              height: 64,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <RenderToTitle collapsed={collapsed} />
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              overflowX: "hidden",
              overflowY: "auto",
            }}
          >
            {drawer}
          </Box>
          <Button
            sx={{
              background: "rgba(0,0,0,.5)",
              color: "primary.contrastText",
              textAlign: "center",
              borderRadius: 0,
              borderTop: "1px solid #ffffff1a",
            }}
            fullWidth
            size="large"
            onClick={() => setCollapsed((prev) => !prev)}
          >
            {collapsed ? <ChevronRight /> : <ChevronLeft />}
          </Button>
        </Drawer>
        <Box
          sx={{
            display: { xs: "block", md: "none" },
            position: "fixed",
            top: "64px",
            left: "0px",
            borderRadius: "0 6px 6px 0",
            bgcolor: "secondary.main",
            zIndex: 1199,
            width: "36px",
          }}
        >
          <IconButton
            sx={{ color: "#fff", width: "36px" }}
            onClick={() => setOpened((prev) => !prev)}
          >
            <MenuRounded />
          </IconButton>
        </Box>
      </Box>
    </>
  );
};
```

`useMenu` hook is used to get style agnostic menu items. We render these items in the body of the sider. We create a recursive `renderTreeView` function to create menu items from the list of resources passed to `<Refine>`. We get the `Title` component with the `useTitle` hook.

<br />

:::tip
If you want to create a multi-level menu, you can take a look at this [`multi-level menu`](/core/docs/3.xx.xx/examples/multi-level-menu) example and also [`here`](/core/docs/3.xx.xx/advanced-tutorials/multi-level-menu) is the guide.
:::

We can override the default sider and show the custom menu we implemented in its place by passing a custom component to `<Refine>`s `Sider` prop:

```tsx live previewHeight=420px
import {
  useDataGrid,
  DataGrid,
  GridColumns,
  List,
  Sider as CustomSider,
  TextField,
} from "@pankod/refine-mui";

const columns: GridColumns = [
  { field: "id", headerName: "ID", type: "number" },
  {
    field: "title",
    headerName: "Title",
    minWidth: 100,
    flex: 1,
  },
  {
    field: "slug",
    headerName: "Slug",
    minWidth: 100,
    flex: 1,
  },
];

const PostsList: React.FC = () => {
  const { dataGridProps } = useDataGrid<IPost>();

  return (
    <List>
      <DataGrid {...dataGridProps} columns={columns} autoHeight />
    </List>
  );
};

interface IPost {
  id: number;
  title: string;
}

// visible-block-start
import { Refine } from "@pankod/refine-core";
import { Layout } from "@pankod/refine-mui";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

import { PostsList } from "pages/posts";

// highlight-next-line
import { CustomSider } from "./components/CustomSider";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
  return (
    <Refine
      dataProvider={dataProvider(API_URL)}
      routerProvider={routerProvider}
      Layout={Layout}
      // highlight-next-line
      Sider={CustomSider}
      resources={[{ name: "posts", list: PostsList }]}
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

[refine]: /core/docs/3.xx.xx/api-reference/core/components/refine-config
[muicustomlayout]: /core/docs/3.xx.xx/api-reference/mui/customization/layout
