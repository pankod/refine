---
id: multi-level-menu
title: "Multi Level Menu Tutorial | Navigation in Refine v5"
display_title: "Multi Level Menu"
description: "Integrate Multi Level Menu in Refine v5. Learn best practices. Explore production tips for navigation, sidebar for production-ready workflows."
sidebar_label: Multi Level Menu
---

This document is related to how to create a multi-level menu for **Refine** applications.

### What is Multi-level Menu?

The multi-level menu is a great way to organize your sider menu items. You can create groups and sub menus to keep your menu items organized. This makes it easy to find the menu items you are looking for.

## Usage

To do this, it is necessary to create an object array with the following [resources properties](/core/docs/core/interface-references#resourceprops):

```tsx title="src/App.tsx"
        <Refine
           ...
            resources={[
                {
                    // highlight-start
                    name: "CMS",
                    // highlight-end
                },
                {
                    // highlight-start
                    name: "posts",
                    meta: { parent: "CMS" },
                    // highlight-end
                    list: "/posts",
                },
                {
                    // highlight-start
                    name: "category",
                    meta: { parent: "CMS", canDelete: true },
                    // highlight-end
                    list: "/categories",
                },
            ]}
        />
```

:::tip

The `meta.parent` you give in the resource objects must be strictly equal to the resource name you want to group under.

:::

### Headless

If you want to create your multi-level menu without any UI framework integration, [`useMenu`](/core/docs/core/hooks/utilities/use-menu/) hook gives your resources.

```tsx title="src/components/layout/sider/index.tsx"
//highlight-next-line
import { useMenu } from "@refinedev/core";

export const Sider: React.FC = () => {
  //highlight-next-line
  const { menuItems, selectedKey, defaultOpenKeys } = useMenu();

  // Here create your Sider to your UI choice
};
```

```tsx title="example output"

// console.log(menuItems);
[
    {
        name: "CMS",
        key: "CMS",
        ...
        children: [
            {
                name: "posts",
                key: "CMS/posts",
                route: "/posts",
                ...
                children: [],
            },
            {
                name: "category",
                key: "CMS/category",
                route: "/category",
                ...
                children: [],
            },
        ],
    },
];
```

<br/>

### Ant Design

The Sider component allows you to create the groups you want in the sider menu. By default, the sider will group menu items by their top-level heading. However, you can also add sub menu items to each group via `meta.parent`.

This gives you more control over the side menu and allows you to customize it to better suit your needs.

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/guides-and-concepts/multi-level-menu/multi-level-menu.png" alt="multiLevelMenu" />
<br />

<br/>

## Example

You can review the example to examine the multi-level menu concept in more detail.

<CodeSandboxExample path="multi-level-menu" />
