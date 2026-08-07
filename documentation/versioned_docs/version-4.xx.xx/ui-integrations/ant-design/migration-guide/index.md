---
title: "Ant Design Migration Guide | Upgrading to Refine v4"
display_title: "Migration Guide"
sidebar_label: "Migration Guide"
description: "Official guide for upgrading your Ant Design integration from Refine v3 to v4. Documentation on breaking changes and new UI features."
---

Ant Design released a new major version, v5. This document will help you upgrade from antd 4.x version to antd 5.x version.

Ant Design removed `less` and adopted `CSS-in-JS` for better support of dynamic themes. So now, the bottom layer uses [`@ant-design/cssinjs`](https://github.com/ant-design/cssinjs) instead of `less` as a solution.

Some components were removed or renamed, and some APIs are changed.

Some of the changes are:

- `<PageHeader>` component moved into `@ant-design/pro-components`. Refine is using `<PageHeader>` in `<List>`, `<Create>`, `<Edit>`, `<Show>` components and added as a dependency. You don't need to install `@ant-design/pro-components` package manually.
- `<Comment>` component moved into `@ant-design/compatible`.
- `moment.js` is replaced with `day.js`.
- `less` is removed from `antd` package.

> For more information, please refer to [Ant Design's own migration guide](https://ant.design/docs/react/migration-v5).

:::info A little more clarification

| Refine package                                                   | Ant Design version |
| ---------------------------------------------------------------- | ------------------ |
| &#64;pankod/refine-antd&#64;3.x.x                                | antd&#64;4.x.x     |
| &#64;pankod/refine-antd&#64;4.x.x, &#64;refinedev/antd&#64;5.x.x | antd&#64;5.x.x     |

:::

## Updating the packages

[`@refinedev/antd`](https://github.com/refinedev/refine/tree/main/packages/antd) must be updated to `4.x.x`

<Tabs
defaultValue="refine-cli"
values={[
{label: 'Refine CLI', value: 'refine-cli'},
{label: 'Manual', value: 'manual'},
]}>

<TabItem value="refine-cli">

⚡️ You can easily update Refine packages with the Refine CLI [`update`](/core/docs/packages/cli/#update) command.

```bash
npm run refine update
```

> [How to add Refine CLI to an existing project?](/core/docs/packages/cli/#how-to-add-to-an-existing-project)

</TabItem>

<TabItem value="manual">

```bash
npm i @refinedev/antd@latest
```

</TabItem>

</Tabs>

## 🪄 Migrating your project automatically with Codemod ✨ (recommended)

`@refinedev/codemod` package handles the breaking changes for your project automatically, migrating your [`@refinedev/antd`](https://github.com/refinedev/refine/tree/main/packages/antd) version from 3.x.x to 4.x.x. without any manual steps

Just `cd` into root folder of your project (where `package.json` is contained) and run this command:

```sh
npx @refinedev/codemod antd4-to-antd5
```

And it's done. Now your project uses `@refinedev/antd@4.x.x`.

> 🚨 The Customized or swizzled [components](#customized-sider) and [.less](#less-users) files cannot be migrated automatically. You need to migrate them manually.

## Migrating your project manually

### Updating Imports

- CSS files are no longer included in package. Since CSS-in-JS supports importing on demand, the original `styles/antd.less` has also been abandoned. If you need to reset some basic styles, please import `@refinedev/antd/dist/reset.css`

```diff title="App.tsx"
- import "@refinedev/antd/dist/styles.min.css";
+ import "@refinedev/antd/dist/reset.css";
```

### Updating Props

`actionButtons` and `pageHeaderProps` props was deprecated on `@refinedev/antd@3.x.x` and has been removed on `@refinedev/antd@4.x.x` from `<List>`, `<Create>`, `<Edit>`, `<Show>` component due to inconsistency with all UI packages. Use the `headerButtons` and `headerProps` props instead.

```diff title="List.tsx"
- <List actionButtons={actionButtons} pageHeaderProps={pageHeaderProps}>
+ <List headerButtons={actionButtons} headerProps={pageHeaderProps}>
```

```diff title="Create.tsx"
- <Create actionButtons={actionButtons} pageHeaderProps={pageHeaderProps}>
+ <Create headerButtons={actionButtons} headerProps={pageHeaderProps}>
```

```diff title="Show.tsx"
- <Show actionButtons={actionButtons} pageHeaderProps={pageHeaderProps}>
+ <Show headerButtons={actionButtons} headerProps={pageHeaderProps}>
```

```diff title="Edit.tsx"
- <Edit actionButtons={actionButtons} pageHeaderProps={pageHeaderProps}>
+ <Edit headerButtons={actionButtons} headerProps={pageHeaderProps}>
```

### Customized `<Sider>`

If you have customized or `swizzled` the `<Sider>` component, there may be a color mismatch issue.
You can give theme dark to the `<Menu>` component in the `<Sider>` component.

```diff title="Sider.tsx"
    <AntdLayout.Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(collapsed: boolean): void => setCollapsed(collapsed)}
      collapsedWidth={isMobile ? 0 : 80}
      breakpoint='lg'
      style={isMobile ? antLayoutSiderMobile : antLayoutSider}>
      <RenderToTitle collapsed={collapsed} />
      <Menu
+       theme='dark'
        selectedKeys={[selectedKey]}
        defaultOpenKeys={defaultOpenKeys}
        mode='inline'
        onClick={() => {
          if (!breakpoint.lg) {
            setCollapsed(true)
          }
        }}>
        {renderSider()}
      </Menu>
    </AntdLayout.Sider>
```

### Customized `<Header>`

:::caution

If you have customized or `swizzled` the `<Header>` component, there may be a color mismatch issue.

:::

You can remove constant background color in `<Header>` component:

```diff title="Header.tsx"
   <AntdLayout.Header
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: '0px 24px',
        height: '64px',
-       backgroundColor: '#FFF',
      }}>
```

### LESS Users

Ant Design removed `less`, uses and recommends `CSS-in-JS` instead. You need to manually migrate your `.less` files to `CSS-in-JS`. [Ant Design's documentation for `less` migration.](https://ant.design/docs/react/migration-v5#less-migration)

## Known Issues

### Compile errors

Some users reported ([issue#1](https://discord.com/channels/837692625737613362/1056236230641209396/1056236230641209396), [issue#2](https://discord.com/channels/837692625737613362/1056592183702061177/1056592183702061177)) compile errors after upgrading from `@refinedev/antd@3.x.x` to `@refinedev/antd@4.x.x`. They also provided solutions.

#### Solution 1

1. remove `node_modules` folder
2. remove `package-lock.json` file
3. `npm install`

#### Solution 2

```bash
npm install react@latest react-dom@latest
```
