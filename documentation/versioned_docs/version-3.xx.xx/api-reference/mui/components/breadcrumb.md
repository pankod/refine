---
id: mui-breadcrumb
title: Breadcrumb
swizzle: true
---

A breadcrumb displays the current location within a hierarchy. It allows going back to states higher up in the hierarchy. `<Breadcrumb>` component built with Material UI [Breadcrumb][mui-breadcrumb] components using the [`useBreadcrumb`](/core/docs/3.xx.xx/api-reference/core/hooks/useBreadcrumb) hook.

:::info-tip Swizzle
You can swizzle this component to customize it with the [**refine CLI**](/core/docs/3.xx.xx/packages/documentation/cli)
:::

```tsx live url=http://localhost:3000/posts/show/123 previewHeight=280px disableScroll
// visible-block-start
import { Show, Breadcrumb } from "@pankod/refine-mui";

const PostShow: React.FC = () => {
  return (
    <Show
      // highlight-next-line
      breadcrumb={<Breadcrumb />}
    >
      <p>Content of your show page...</p>
    </Show>
  );
};
// visible-block-end

const PostList = () => {
  return (
    <RefineMui.List>
      <p>Content of your list page...</p>
    </RefineMui.List>
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

render(
  <RefineMuiDemo
    initialRoutes={["/posts/show/123"]}
    resources={[
      {
        name: "posts",
        icon: PostIcon,
        show: PostShow,
        list: PostList,
      },
    ]}
  />,
);
```

## Properties

### `breadcrumbProps`

`<Breadcrumb>` component uses the Material UI [Breadcrumb][mui-breadcrumb] component so it can be configured with the `breadcrumbProps` property.

```tsx
import { List, Breadcrumb } from "@pankod/refine-mui";

export const PostList: React.FC = () => {
  return (
    <List breadcrumb={<Breadcrumb breadcrumbProps={{ separator: "-" }} />}>
      ...
    </List>
  );
};
```

### `showHome`

If your application has a [DashboardPage](/core/docs/3.xx.xx/api-reference/core/components/refine-config#dashboardpage), the home button is shown to the top of the hierarchy by default. If you don't want to show the home button, you can set `showHome` to `false`.

```tsx
import { List, Breadcrumb } from "@pankod/refine-mui";

export const PostList: React.FC = () => {
  return <List breadcrumb={<Breadcrumb showHome={false} />}>...</List>;
};
```

### `hideIcons`

If you don't want to show the resource icons on the breadcrumb, you can set `hideIcons` to `true`.

```tsx
import { List, Breadcrumb } from "@pankod/refine-mui";

export const PostList: React.FC = () => {
    return (
        <List breadcrumb={<Breadcrumb hideIcons />}>...</List>;
    );
};
```

## API Reference

### Properties

<PropsTable module="@pankod/refine-mui/Breadcrumb"
breadcrumbProps-type="[BreadcrumbProps](https://mui.com/material-ui/react-breadcrumbs/#main-content)"
breadcrumbProps-description="Passes properties for [`<Breadcrumb>`](https://mui.com/material-ui/react-breadcrumbs/#api)"
/>

[mui-breadcrumb]: https://mui.com/material-ui/react-breadcrumbs/#main-content
[mui-breadcrumb-props]: https://mui.com/material-ui/react-breadcrumbs/#api
[source-code]: https://github.com/refinedev/refine/blob/v3/packages/mui/src/components/breadcrumb/index.tsx
