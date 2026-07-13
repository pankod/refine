---
id: breadcrumb
title: Breadcrumb
swizzle: true
---

```tsx live shared
const { default: routerProvider } = RefineReactRouterV6;
const { default: simpleRest } = RefineSimpleRest;
setRefineProps({
  routerProvider,
  dataProvider: simpleRest("https://api.fake-rest.refine.dev"),
  Layout: RefineMantine.Layout,
  Sider: () => null,
  DashboardPage: () => <p>Dashboard Page</p>,
  notificationProvider: RefineMantine.useNotificationProvider,
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

const PostIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon icon-tabler icon-tabler-list"
    width={18}
    height={18}
    viewBox="0 0 24 24"
    strokeWidth="2"
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
```

A breadcrumb displays the current location within a hierarchy. It allows going back to states higher up in the hierarchy. `<Breadcrumb>` component built with Mantine [Breadcrumb][mantine-breadcrumb] components using the [`useBreadcrumb`](/core/docs/3.xx.xx/api-reference/core/hooks/useBreadcrumb) hook.

:::info-tip Swizzle
You can swizzle this component to customize it with the [**refine CLI**](/core/docs/3.xx.xx/packages/documentation/cli)
:::

## Properties

### `breadcrumbProps`

`<Breadcrumb>` component uses the Mantine [Breadcrumb][mantine-breadcrumb] component so it can be configured with the `breadcrumbProps` property.

```tsx live url=http://localhost:3000/posts/show/123 previewHeight=280px
setInitialRoutes(["/posts/show/123"]);
import { Refine } from "@pankod/refine-core";
import { ShowButton } from "@pankod/refine-mantine";

// visible-block-start
import { Show, Breadcrumb } from "@pankod/refine-mantine";

const PostShow: React.FC = () => {
  return (
    <Show
      // highlight-next-line
      breadcrumb={<Breadcrumb breadcrumbProps={{ separator: "-" }} />}
    >
      <p>Rest of your page here</p>
    </Show>
  );
};
// visible-block-end

const App = () => {
  return (
    <Refine
      resources={[
        {
          name: "posts",
          show: PostShow,
          list: () => (
            <div>
              <p>This page is empty.</p>
              <ShowButton recordItemId="123">Show Item 123</ShowButton>
            </div>
          ),
          icon: PostIcon,
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

### `showHome`

If your application has a [DashboardPage](/core/docs/3.xx.xx/api-reference/core/components/refine-config#dashboardpage), the home button is shown to the top of the hierarchy by default. If you don't want to show the home button, you can set `showHome` to `false`.

```tsx live url=http://localhost:3000/posts/show/123 previewHeight=280px
setInitialRoutes(["/posts/show/123"]);
import { Refine } from "@pankod/refine-core";
import { ShowButton } from "@pankod/refine-mantine";

// visible-block-start
import { Show, Breadcrumb } from "@pankod/refine-mantine";

const PostShow: React.FC = () => {
  return (
    <Show
      // highlight-next-line
      breadcrumb={<Breadcrumb showHome={false} />}
    >
      <p>Rest of your page here</p>
    </Show>
  );
};
// visible-block-end

const App = () => {
  return (
    <Refine
      resources={[
        {
          name: "posts",
          show: PostShow,
          list: () => (
            <div>
              <p>This page is empty.</p>
              <ShowButton recordItemId="123">Show Item 123</ShowButton>
            </div>
          ),
          icon: PostIcon,
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

### `hideIcons`

If you don't want to show the resource icons on the breadcrumb, you can set `hideIcons` to `true`.

```tsx live url=http://localhost:3000/posts/show/123 previewHeight=280px
setInitialRoutes(["/posts/show/123"]);
import { Refine } from "@pankod/refine-core";
import { ShowButton } from "@pankod/refine-mantine";

// visible-block-start
import { Show, Breadcrumb } from "@pankod/refine-mantine";

const PostShow: React.FC = () => {
  return (
    <Show
      // highlight-next-line
      breadcrumb={<Breadcrumb hideIcons />}
    >
      <p>Rest of your page here</p>
    </Show>
  );
};
// visible-block-end

const App = () => {
  return (
    <Refine
      resources={[
        {
          name: "posts",
          show: PostShow,
          list: () => (
            <div>
              <p>This page is empty.</p>
              <ShowButton recordItemId="123">Show Item 123</ShowButton>
            </div>
          ),
          icon: PostIcon,
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

<PropsTable module="@pankod/refine-mantine/Breadcrumb" />

[mantine-breadcrumb]: https://mantine.dev/core/breadcrumbs/
[source-code]: https://github.com/refinedev/refine/blob/v3/packages/mantine/src/components/breadcrumb/index.tsx
