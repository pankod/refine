---
id: breadcrumb
title: Breadcrumb
swizzle: true
---

A breadcrumb displays the current location within a hierarchy. It allows going back to states higher up in the hierarchy. `<Breadcrumb>` component built with Ant Design's [Breadcrumb][antd-breadcrumb] components using the [`useBreadcrumb`](/core/docs/3.xx.xx/api-reference/core/hooks/useBreadcrumb) hook.

:::info-tip Swizzle
You can swizzle this component to customize it with the [**refine CLI**](/core/docs/3.xx.xx/packages/documentation/cli)
:::

```tsx live url=http://localhost:3000/posts/show/123 previewHeight=280px disableScroll
// visible-block-start
import { Show, Breadcrumb } from "@pankod/refine-antd";

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
    <RefineAntd.List>
      <p>Content of your list page...</p>
    </RefineAntd.List>
  );
};

render(
  <RefineAntdDemo
    initialRoutes={["/posts/show/123"]}
    resources={[
      {
        name: "posts",
        icon: (
          <RefineAntd.Icons.ProfileOutlined
            style={{ width: "18px", height: "18px" }}
          />
        ),
        show: PostShow,
        list: PostList,
      },
    ]}
  />,
);
```

## Properties

### `breadcrumbProps`

`<Breadcrumb>` component uses the Ant Design [Breadcrumb][antd-breadcrumb] component so it can be configured with the `breadcrumbProps` property.

```tsx
import { List, Breadcrumb } from "@pankod/refine-antd";

export const PostList: React.FC = () => {
  return (
    <List
      // highlight-next-line
      breadcrumb={<Breadcrumb breadcrumbProps={{ separator: "-" }} />}
    >
      ...
    </List>
  );
};
```

### `showHome`

If your application has a [DashboardPage](/core/docs/3.xx.xx/api-reference/core/components/refine-config#dashboardpage), the home button is shown to the top of the hierarchy by default. If you don't want to show the home button, you can set `showHome` to `false`.

```tsx
import { List, Breadcrumb } from "@pankod/refine-antd";

export const PostList: React.FC = () => {
  return (
    <List
      // highlight-next-line
      breadcrumb={<Breadcrumb showHome={false} />}
    >
      ...
    </List>
  );
};
```

### `hideIcons`

If you don't want to show the resource icons on the breadcrumb, you can set `hideIcons` to `true`.

```tsx
import { List, Breadcrumb } from "@pankod/refine-antd";

export const PostList: React.FC = () => {
  return (
    <List
      // highlight-next-line
      breadcrumb={<Breadcrumb hideIcons />}
    >
      ...
    </List>
  );
};
```

## API Reference

### Properties

<PropsTable module="@pankod/refine-antd/Breadcrumb"
breadcrumbProps-type="[BreadcrumbProps](https://ant.design/components/breadcrumb/#API)"
breadcrumbProps-description="Passes properties for [`<Breadcrumb>`](https://ant.design/components/breadcrumb/#Breadcrumb)"
/>

[antd-breadcrumb]: https://ant.design/components/breadcrumb
[antd-breadcrumb-props]: https://ant.design/components/breadcrumb/#Breadcrumb
