---
id: antd-custom-sider
title: Sider
swizzle: true
---

There are 2 ways that will allow you to customize your `<Sider />` component if you need it.

You can access the `logout`, `dashboard`, `items` elements and `collapsed` state that we use in our default `Sider` component by using `render` properties. Customize it to your needs or you can create a custom `<Sider />` component and use it either by passing it to [`<Refine />`][refine] or using a [Custom Layout][antdcustomlayout].

:::info-tip Swizzle
You can swizzle this component to customize it with the [**refine CLI**](/core/docs/3.xx.xx/packages/documentation/cli)
:::

## Customize Sider by Using `render` property

```tsx live previewHeight=360px hideCode disableScroll url=http://localhost:3000/posts
setInitialRoutes(["/posts"]);

const PostList: React.FC = () => {
  return <div>Post List</div>;
};

// visible-block-start
import { Refine } from "@pankod/refine-core";
import { AntdLayout, Menu, Sider } from "@pankod/refine-antd";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

import { PostList } from "./pages/posts";

const App: React.FC = () => {
  const API_URL = "https://api.fake-rest.refine.dev";

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
      Layout={({ children, Footer, Header, Sider, OffLayoutArea }) => {
        return (
          <AntdLayout style={{ minHeight: "100vh", flexDirection: "row" }}>
            {/* highlight-start */}
            <Sider
              render={({ items }) => {
                return (
                  <>
                    <Menu.Item
                      style={{
                        fontWeight: 700,
                      }}
                    >
                      Custom Element
                    </Menu.Item>
                    {items}
                  </>
                );
              }}
            />
            {/* highlight-end */}
            {Header && <Header />}
            <AntdLayout.Content>
              <div
                style={{
                  padding: 12,
                  minHeight: 360,
                }}
              >
                {children}
              </div>
              {OffLayoutArea && <OffLayoutArea />}
            </AntdLayout.Content>
            {Footer && <Footer />}
          </AntdLayout>
        );
      }}
    />
  );
};

// visible-block-end
render(<App />);
```

:::tip
The `Menu.Item` component gives you an implemention ready component compatible with Sider menu items. If you want to add anything else to your `Sider` component, you can use the `collapsed` state to manage your component.
:::

## Recreating the Default Sider Menu

You can also customize your Sider component by creating the `CustomSider` component.

When you examine the code of the live-preview example below, you will see the same code that we used for the `default sider` component. You can create a customized `CustomSider` component for yourself by following this code.

:::info-tip Swizzle
You can also run the `swizzle` command to export the source code of the default sider component. Refer to [**refine CLI**](/core/docs/3.xx.xx/packages/documentation/cli) for more information.
:::

```tsx live hideCode disableScroll url=http://localhost:3000/posts
setInitialRoutes(["/posts"]);
const PostList: React.FC = () => {
  return <div>Post List</div>;
};

// visible-block-start
import {
  Refine,
  useTranslate,
  useLogout,
  useTitle,
  CanAccess,
  ITreeMenu,
  useIsExistAuthentication,
  useRouterContext,
  useMenu,
  useRefineContext,
} from "@pankod/refine-core";
import {
  Layout,
  AntdLayout,
  Grid,
  Icons,
  Menu,
  Title as DefaultTitle,
} from "@pankod/refine-antd";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

import { PostList } from "./pages/posts";

const API_URL = "https://api.fake-rest.refine.dev";

export type SiderRenderProps = {
  items: JSX.Element[];
  logout: React.ReactNode;
  dashboard: React.ReactNode;
};

export type RefineLayoutSiderProps = {
  render?: (props: SiderRenderProps) => React.ReactNode;
};

const { DashboardOutlined, LogoutOutlined, UnorderedListOutlined } = Icons;

const CustomSider: React.FC<RefineLayoutSiderProps> = ({ render }) => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const isExistAuthentication = useIsExistAuthentication();
  const { Link } = useRouterContext();
  const { mutate: mutateLogout } = useLogout();
  const Title = useTitle();
  const translate = useTranslate();
  const { menuItems, selectedKey, defaultOpenKeys } = useMenu();
  const breakpoint = Grid.useBreakpoint();
  const { hasDashboard } = useRefineContext();

  const isMobile =
    typeof breakpoint.lg === "undefined" ? false : !breakpoint.lg;

  const RenderToTitle = Title ?? DefaultTitle;

  const renderTreeView = (tree: ITreeMenu[], selectedKey: string) => {
    return tree.map((item: ITreeMenu) => {
      const { icon, label, route, name, children, parentName } = item;

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
            <SubMenu
              key={route}
              icon={icon ?? <UnorderedListOutlined />}
              title={label}
            >
              {renderTreeView(children, selectedKey)}
            </SubMenu>
          </CanAccess>
        );
      }
      const isSelected = route === selectedKey;
      const isRoute = !(parentName !== undefined && children.length === 0);
      return (
        <CanAccess
          key={route}
          resource={name.toLowerCase()}
          action="list"
          params={{
            resource: item,
          }}
        >
          <Menu.Item
            key={route}
            style={{
              fontWeight: isSelected ? "bold" : "normal",
            }}
            icon={icon ?? (isRoute && <UnorderedListOutlined />)}
          >
            <Link to={route}>{label}</Link>
            {!collapsed && isSelected && (
              <div className="ant-menu-tree-arrow" />
            )}
          </Menu.Item>
        </CanAccess>
      );
    });
  };

  const logout = isExistAuthentication ? (
    <Menu.Item
      key="logout"
      onClick={() => mutateLogout()}
      icon={<LogoutOutlined />}
    >
      {translate("buttons.logout", "Logout")}
    </Menu.Item>
  ) : null;

  const dashboard = hasDashboard ? (
    <Menu.Item
      key="dashboard"
      style={{
        fontWeight: selectedKey === "/" ? "bold" : "normal",
      }}
      icon={<DashboardOutlined />}
    >
      <Link to="/">{translate("dashboard.title", "Dashboard")}</Link>
      {!collapsed && selectedKey === "/" && (
        <div className="ant-menu-tree-arrow" />
      )}
    </Menu.Item>
  ) : null;

  const items = renderTreeView(menuItems, selectedKey);

  const renderSider = () => {
    if (render) {
      return render({
        dashboard,
        items,
        logout,
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

  const antLayoutSider: CSSProperties = {
    position: "relative",
  };
  const antLayoutSiderMobile: CSSProperties = {
    position: "fixed",
    height: "100vh",
    zIndex: 999,
  };

  return (
    <AntdLayout.Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(collapsed: boolean): void => setCollapsed(collapsed)}
      collapsedWidth={isMobile ? 0 : 80}
      breakpoint="lg"
      style={isMobile ? antLayoutSiderMobile : antLayoutSider}
    >
      <RenderToTitle collapsed={collapsed} />
      <Menu
        selectedKeys={[selectedKey]}
        defaultOpenKeys={defaultOpenKeys}
        mode="inline"
        onClick={() => {
          if (!breakpoint.lg) {
            setCollapsed(true);
          }
        }}
      >
        {renderSider()}
      </Menu>
    </AntdLayout.Sider>
  );
};

const App: React.FC = () => {
  return (
    <Refine
      routerProvider={routerProvider}
      dataProvider={dataProvider(API_URL)}
      Layout={Layout}
      // highlight-next-line
      Sider={CustomSider}
      resources={[
        {
          name: "posts",
          list: PostList,
        },
      ]}
    />
  );
};

// visible-block-end

render(<App />);
```

<br />

:::tip
If you want to create a multi-level menu, you can take a look at this [`multi-level menu`](/core/docs/3.xx.xx/examples/multi-level-menu) example and also [`here`](/core/docs/3.xx.xx/advanced-tutorials/multi-level-menu) is the guide.
:::

`useLogout` provides the logout functionality.

:::caution
`useLogout` hook can only be used if the `authProvider` is provided.
[Refer to authProvider docs for more detailed information. &#8594](/core/docs/3.xx.xx/api-reference/core/providers/auth-provider)
[Refer to useLogout docs for more detailed information. &#8594](/core/docs/3.xx.xx/api-reference/core/hooks/auth/useLogout)
:::

:::tip
You can further customize the Sider and its appearance.
[Refer to Ant Design docs for more detailed information about Sider. &#8594](https://ant.design/components/layout/#Layout.Sider)
:::

[refine]: /core/docs/3.xx.xx/api-reference/core/components/refine-config
[antdcustomlayout]: /core/docs/3.xx.xx/api-reference/antd/customization/layout
