---
id: custom-layout
title: "Custom Layout Tutorial | Brand Your Refine v4 Dashboard"
display_title: "Custom Layout"
description: "Learn to build bespoke layouts in Refine v4. Customize sidebars, headers, and footers to create a unique user experience for your admin panel."
sidebar_label: Custom Layout
---

**Refine** supports any layout you want with no restrictions and also provides default layouts with its UI packages. You are free to use them or create your own with the help of **Refine**'s hooks and components. You can also use the [`swizzle`][cli] command to customize the default layouts and adapt them to your needs.

## Layout Elements

### Layout

`<Layout>` components are designed to wrap your pages and provide a dashboard-like layout. `<Layout>` accepts rest of the layout elements in props.

| Prop                              | Type        | Description                                     |
| --------------------------------- | ----------- | ----------------------------------------------- |
| [`Sider`](#sider)                 | `React.FC`  | Component to render menu aside                  |
| [`Header`](#header)               | `React.FC`  | Component to render at the top of the layout    |
| [`Title`](#title)                 | `React.FC`  | Component to render inside `<Sider>`            |
| [`Footer`](#footer)               | `React.FC`  | Component to render at the bottom of the layout |
| [`OffLayoutArea`](#offlayoutarea) | `React.FC`  | Component to render outside of the layout       |
| `children`                        | `ReactNode` | Page content.                                   |

### Sider

`<Sider>` components are designed to render menu items according to the resources you have defined in `<Refine>` components. [`useMenu`][usemenu] hook is used under the hood to generate menu items.

| Prop              | Type                                          | Description                                                               |
| ----------------- | --------------------------------------------- | ------------------------------------------------------------------------- |
| [`Title`](#title) | `React.FC`                                    | Component to render at the top                                            |
| `render`          | [`SiderRenderFunction`](#siderrenderfunction) | Function to render the menu items and other elements inside the `<Sider>` |
| `meta`            | `Record<string,any>`                          | Meta data to use when creating routes for the menu items                  |

### SiderRenderFunction

```tsx
type SiderRenderFunction = (props: {
  items: JSX.Element[];
  logout: React.ReactNode;
  dashboard: React.ReactNode;
  collapsed: boolean;
}) => React.ReactNode;
```

You can use the `render` prop to customize the render of the `<Sider>` without needing to swizzle the whole component.

```tsx title="Using Render Prop"
import { Sider } from "@refinedev/antd";

const CustomSider = () => {
  return (
    <Sider
      render={({ items, logout, collapsed }) => {
        return (
          <>
            <div>My Custom Element</div>
            {items}
            {logout}
          </>
        );
      }}
    />
  );
};
```

### Header

`<Header>` components are designed to render a header at the top of the layout.

### Title

`<Title>` components are designed to render a title inside the `<Sider>` component. By default, it renders the **Refine** logo with a link to the index page.

### Footer

`<Footer>` components are designed to render a footer at the bottom of the layout.

### OffLayoutArea

`<OffLayoutArea>` components are designed to render elements outside of the layout.

## Example

Here's an example of a custom layout, made with help of **Refine**'s hooks and components.

You can find more examples about custom layouts for different UI packages in the [examples](/core/templates/) section.

<CodeSandboxExample path="customization-top-menu-layout" />

[Refine]: /core/docs/core/refine-component
[cli]: /core/docs/packages/list-of-packages#swizzle
[usemenu]: /core/docs/core/hooks/utilities/use-menu
