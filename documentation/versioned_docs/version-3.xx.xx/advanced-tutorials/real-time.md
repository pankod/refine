---
id: real-time
title: Live / Realtime
---

**refine** lets you add Realtime support to your app via the `liveProvider` prop for [`<Refine>`](/core/docs/3.xx.xx/api-reference/core/components/refine-config). It can be used to update and show data in Realtime throughout your app. **refine** remains agnostic in its API to allow different solutions([Ably](https://ably.com), [Socket.IO](https://socket.io/), [Mercure](https://mercure.rocks/), [supabase](https://supabase.com), etc.) to be integrated.

[Refer to the Live Provider documentation for detailed information. &#8594](/core/docs/3.xx.xx/api-reference/core/providers/live-provider)

We will be using [Ably](https://ably.com) in this guide to provide Realtime features.

## Installation

We need to install the Ably live provider package from **refine**.

<InstallPackagesCommand args="@pankod/refine-ably"/>

:::caution
To make this example more visual, we used the [`@pankod/refine-antd`](https://github.com/refinedev/refine/tree/v3/packages/refine-antd) package. If you are using Refine headless, you need to provide the components, hooks, or helpers imported from the [`@pankod/refine-antd`](https://github.com/refinedev/refine/tree/v3/packages/refine-antd) package.
:::

## Setup

Since we will need `apiKey` from Ably, you must first register and get the key from [Ably](https://ably.com).

The app will have one resource: **posts** with [CRUD pages(list, create, edit, and show) similar to base example](https://github.com/refinedev/refine/tree/v3/examples/base-antd/src/pages/posts).

[You can also refer to CodeSandbox to see the final state of the app &#8594](#example)

## Adding `liveProvider`

Firstly we create a Ably client for [`@pankod/refine-ably`](https://github.com/refinedev/refine/tree/v3/packages/ably) live provider.

```ts title="src/utility/ablyClient.ts"
import { Ably } from "@pankod/refine-ably";

export const ablyClient = new Ably.Realtime("your-api-key");
```

Then pass `liveProvider` from [`@pankod/refine-ably`](https://github.com/refinedev/refine/tree/v3/packages/ably) to `<Refine>`.

```tsx title="src/App.tsx"
import { Refine } from "@pankod/refine-core";
import {
  Layout,
  ReadyPage,
  useNotificationProvider,
  ErrorComponent,
} from "@pankod/refine-antd";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router-v6";

import "@pankod/refine-antd/dist/reset.css";

//highlight-next-line
import { liveProvider } from "@pankod/refine-ably";

//highlight-next-line
import { ablyClient } from "utility/ablyClient";
import { PostList, PostCreate, PostEdit, PostShow } from "pages/posts";

const App: React.FC = () => {
  return (
    <Refine
      routerProvider={routerProvider}
      dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
      Layout={Layout}
      ReadyPage={ReadyPage}
      notificationProvider={useNotificationProvider}
      catchAll={<ErrorComponent />}
      //highlight-start
      liveProvider={liveProvider(ablyClient)}
      options={{ liveMode: "auto" }}
      //highlight-end
      resources={[
        {
          name: "posts",
          list: PostList,
          create: PostCreate,
          edit: PostEdit,
          show: PostShow,
          canDelete: true,
        },
      ]}
    />
  );
};

export default App;
```

:::note

For live features to work automatically we added `liveMode: "auto"` in the `options` prop.

[Refer to the Live Provider documentation for detailed information. &#8594](/core/docs/3.xx.xx/api-reference/core/providers/live-provider#livemode)
:::

<br/>
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/guides-and-concepts/real-time/real-time.gif" alt="Realtime Demo" />

## Configuring `liveMode`

We may not want to make Realtime changes instantly in some cases. In these cases, we can use `manual` mode to prevent the data from changing instantly. Then we can handle the event manually.

For example in an edit page for a record, It would be better to handle Realtime data manually to prevent synchronization problems caused by multiple editing sources. We would not want the data changing while we are trying to edit a record.

We will be alerted about changes in an alert box on top of the form instead of changing the data instantly.

```tsx title="src/pages/posts/edit.tsx"
// ...

export const PostEdit: React.FC = () => {
  //highlight-start
  const [deprecated, setDeprecated] = useState<
    "deleted" | "updated" | undefined
  >();
  //highlight-end

  const { formProps, saveButtonProps, queryResult } = useForm<IPost>({
    //highlight-start
    liveMode: "manual",
    onLiveEvent: (event) => {
      if (event.type === "deleted" || event.type === "updated") {
        setDeprecated(event.type);
      }
    },
    //highlight-end
  });

  //highlight-start
  const handleRefresh = () => {
    queryResult?.refetch();
    setDeprecated(undefined);
  };
  //highlight-end

  // ...

  return (
    <Edit /* ... */>
      //highlight-start
      {deprecated === "deleted" && (
        <Alert
          message="This post is deleted."
          type="warning"
          style={{ marginBottom: 20 }}
          action={<ListButton size="small" />}
        />
      )}
      {deprecated === "updated" && (
        <Alert
          message="This post is updated. Refresh to see changes."
          type="warning"
          style={{ marginBottom: 20 }}
          action={<RefreshButton size="small" onClick={handleRefresh} />}
        />
      )}
      //highlight-end
      <Form {...formProps} layout="vertical">
        // ....
      </Form>
    </Edit>
  );
};
```

:::note

We can also implement a similar thing on the show page.

[Refer to the CodeSandbox example for detailed information. &#8594](#example)
:::

<br/>
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/guides-and-concepts/real-time/manual-mode.avif" alt="Manual Mode Demo" />

## Custom Subscriptions

You can subscribe to events emitted within **refine** in any place in your app with `useSubscription`.

For example, we can subscribe to **_create_** event for **_posts_** resource and we can show a badge for the number of events in the sider menu.

Firstly, let's implement a custom sider like in [this example](/core/docs/examples/customization/customSider).

<details>
<summary>Custom Sider Menu</summary>

```tsx title="src/components/sider.tsx"
import React, { useState } from "react";
import {
  useTitle,
  ITreeMenu,
  CanAccess,
  useRouterContext,
  useMenu,
} from "@pankod/refine-core";
import { AntdLayout, Menu, Grid, Icons } from "@pankod/refine-antd";
import { antLayoutSider, antLayoutSiderMobile } from "./styles";

export const CustomSider: React.FC = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const { Link } = useRouterContext();
  const Title = useTitle();
  const { menuItems, selectedKey } = useMenu();
  const breakpoint = Grid.useBreakpoint();

  const isMobile =
    typeof breakpoint.lg === "undefined" ? false : !breakpoint.lg;

  const renderTreeView = (tree: ITreeMenu[], selectedKey: string) => {
    return tree.map((item: ITreeMenu) => {
      const { icon, label, route, name, children, parentName } = item;

      if (children.length > 0) {
        return (
          <SubMenu
            key={route}
            icon={icon ?? <Icons.UnorderedListOutlined />}
            title={label}
          >
            {renderTreeView(children, selectedKey)}
          </SubMenu>
        );
      }
      const isSelected = route === selectedKey;
      const isRoute = !(parentName !== undefined && children.length === 0);
      return (
        <CanAccess key={route} resource={name.toLowerCase()} action="list">
          <Menu.Item
            key={route}
            style={{
              fontWeight: isSelected ? "bold" : "normal",
            }}
            icon={icon ?? (isRoute && <Icons.UnorderedListOutlined />)}
          >
            <Link to={route}>{label}</Link>
            {!collapsed && isSelected && <Icons.UnorderedListOutlined />}
          </Menu.Item>
        </CanAccess>
      );
    });
  };

  return (
    <AntdLayout.Sider
      collapsible
      collapsedWidth={isMobile ? 0 : 80}
      collapsed={collapsed}
      breakpoint="lg"
      onCollapse={(collapsed: boolean): void => setCollapsed(collapsed)}
      style={isMobile ? antLayoutSiderMobile : antLayoutSider}
    >
      <Title collapsed={collapsed} />
      <Menu
        selectedKeys={[selectedKey]}
        mode="inline"
        onClick={({ key }) => {
          if (!breakpoint.lg) {
            setCollapsed(true);
          }
        }}
      >
        {renderTreeView(menuItems, selectedKey)}
      </Menu>
    </AntdLayout.Sider>
  );
};
```

</details>

Now, let's add a badge for the number of create and update events for **_posts_** menu items.

```tsx
import React, { useState } from "react";
import {
  useTitle,
  ITreeMenu,
  CanAccess,
  useMenu,
  //highlight-start
  useSubscription,
  //highlight-end
} from "@pankod/refine-core";
import {
  AntdLayout,
  Menu,
  Grid,
  Icons,
  //highlight-start
  Badge,
  //highlight-end
} from "@pankod/refine-antd";
import { antLayoutSider, antLayoutSiderMobile } from "./styles";

export const CustomSider: React.FC = () => {
  const [subscriptionCount, setSubscriptionCount] = useState(0);
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const { Link } = useRouterContext();
  const Title = useTitle();
  const { menuItems, selectedKey } = useMenu();
  const breakpoint = Grid.useBreakpoint();

  const isMobile =
    typeof breakpoint.lg === "undefined" ? false : !breakpoint.lg;

  //highlight-start
  useSubscription({
    channel: "resources/posts",
    type: ["created", "updated"],
    onLiveEvent: () => setSubscriptionCount((prev) => prev + 1),
  });
  //highlight-end

  const renderTreeView = (tree: ITreeMenu[], selectedKey: string) => {
    return tree.map((item: ITreeMenu) => {
      const { icon, label, route, name, children, parentName } = item;

      if (children.length > 0) {
        return (
          <SubMenu
            key={name}
            icon={icon ?? <Icons.UnorderedListOutlined />}
            title={label}
          >
            {renderTreeView(children, selectedKey)}
          </SubMenu>
        );
      }
      const isSelected = route === selectedKey;
      const isRoute = !(parentName !== undefined && children.length === 0);
      return (
        <CanAccess key={route} resource={name.toLowerCase()} action="list">
          <Menu.Item
            key={route}
            style={{
              fontWeight: isSelected ? "bold" : "normal",
            }}
            icon={icon ?? (isRoute && <Icons.UnorderedListOutlined />)}
          >
            //highlight-start
            <div>
              <Link to={route}>{label}</Link>
              {label === "Posts" && (
                <Badge
                  size="small"
                  count={subscriptionCount}
                  offset={[2, -15]}
                />
              )}
            </div>
            //highlight-end
          </Menu.Item>
        </CanAccess>
      );
    });
  };

  return (
    <AntdLayout.Sider
      collapsible
      collapsedWidth={isMobile ? 0 : 80}
      collapsed={collapsed}
      breakpoint="lg"
      onCollapse={(collapsed: boolean): void => setCollapsed(collapsed)}
      style={isMobile ? antLayoutSiderMobile : antLayoutSider}
    >
      <Title collapsed={collapsed} />
      <Menu
        selectedKeys={[selectedKey]}
        mode="inline"
        onClick={() => {
          if (!breakpoint.lg) {
            setCollapsed(true);
          }

          //highlight-start
          if (key === "/posts") {
            setSubscriptionCount(0);
          }
          //highlight-end
        }}
      >
        {renderTreeView(menuItems, selectedKey)}
      </Menu>
    </AntdLayout.Sider>
  );
};
```

:::tip

You can subscribe to specific `ids` with `params`. For example, you can subscribe to **deleted** and **updated** events from **posts** resource with **id** `1` and `2`.

```tsx
useSubscription({
  channel: "resources/posts",
  type: ["deleted", "updated"],
  //highlight-start
  params: {
    ids: ["1", "2"],
  },
  //highlight-end
  onLiveEvent: () => setSubscriptionCount((prev) => prev + 1),
});
```

:::

<br/>
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/guides-and-concepts/real-time/custom-sider.gif" alt="Custom Sider Demo" />

## Example

<CodeSandboxExample path="live-provider-ably" />
