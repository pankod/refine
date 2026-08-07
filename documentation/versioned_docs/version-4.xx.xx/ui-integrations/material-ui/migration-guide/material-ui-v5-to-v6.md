---
title: "MUI v5 to v6 Migration | Refine v4 Upgrade Guide"
display_title: "Migration Guide for Material UI from v5 to v6"
description: "Official guide to upgrading Material UI from v5 to v6 in Refine v4. Learn about breaking changes, theme updates, and component fixes."
sidebar_label: Material UI v5 to v6
---

# Migration Guide for Material UI v6 and X Data Grid v7

Material UI has released major updates for the following packages:

- @mui/material@6
- @mui/icons-material@6
- @mui/system@6
- @mui/lab@6
- @mui/material-nextjs@6
- @mui/styled-engine-sc@6
- @mui/utils@6
- @mui/x-data-grid@7

This guide focuses on migrating Refine-related parts to the latest version.

:::simple Official Migration Guide

- [Material UI v6](https://mui.com/material-ui/migration/upgrade-to-v6/)
- [MUI X Data Grid v7](https://mui.com/x/migration/migration-data-grid-v6/)

:::

## Package Version Alignment

Note that [`@mui/x-*` packages](https://mui.com/x/introduction/) do not follow the same versioning strategy as other [`@mui/*`](https://mui.com/material-ui/getting-started/) packages. However, [`@refinedev/mui`](https://www.npmjs.com/package/@refinedev/mui) package versions has peer dependencies on `@mui/x-*` and other `@mui/*` packages. Please ensure following version alignment to avoid issues:

| @refinedev/mui | @mui/x-data-grid | @mui/material | @mui/system | @mui/lab | @mui/icons-material | @refinedev/inferencer |
| -------------- | ---------------- | ------------- | ----------- | -------- | ------------------- | --------------------- |
| 5.x.x          | 6.x.x            | 5.x.x         | 5.x.x       | 5.x.x    | 5.x.x               | 4.x.x                 |
| 6.x.x          | 7.x.x            | 6.x.x         | 6.x.x       | 6.x.x    | 6.x.x               | 5.x.x                 |

## Material UI Changes

For detailed information about Material UI changes, please refer to the [official Material UI v6 migration guide](https://mui.com/material-ui/migration/upgrade-to-v6/).

### Removed components

The following components has been deprecated since `@refinedev/mui@6` and removed in `@refinedev/mui@7`:

| Deprecated Component   | Replacement               | Documentation                                                                                                       |
| ---------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `useSiderVisible`      | `useThemedLayoutContext`  | [View Docs](https://github.com/refinedev/refine/blob/master/packages/mui/src/hooks/useThemedLayoutContext/index.ts) |
| `notificationProvider` | `useNotificationProvider` | [View Docs](/core/docs/ui-integrations/material-ui/introduction/#notifications)                                     |
| `notificationProvider` | `useNotificationProvider` | [View Docs](/core/docs/ui-integrations/material-ui/introduction/#notifications)                                     |
| `<Layout />`           | `<ThemedLayoutV2 />`      | [View Docs](/core/docs/ui-integrations/material-ui/components/themed-layout/#usage)                                 |
| `<ThemedLayout />`     | `<ThemedLayoutV2 />`      | [View Docs](/core/docs/ui-integrations/material-ui/components/themed-layout/#usage)                                 |
| `<Title />`            | `<ThemedTitleV2 />`       | [View Docs](/core/docs/ui-integrations/material-ui/components/themed-layout/#title)                                 |
| `<ThemedTitle />`      | `<ThemedTitleV2 />`       | [View Docs](/core/docs/ui-integrations/material-ui/components/themed-layout/#title)                                 |
| `<Sider />`            | `<ThemedSiderV2 />`       | [View Docs](/core/docs/ui-integrations/material-ui/components/themed-layout/#sider)                                 |
| `<ThemedSider />`      | `<ThemedSiderV2 />`       | [View Docs](/core/docs/ui-integrations/material-ui/components/themed-layout/#sider)                                 |
| `<Header />`           | `<ThemedHeaderV2 />`      | [View Docs](/core/docs/ui-integrations/material-ui/components/themed-layout/#header)                                |
| `<ThemedHeader />`     | `<ThemedHeaderV2 />`      | [View Docs](/core/docs/ui-integrations/material-ui/components/themed-layout/#header)                                |
| `<LoginPage />`        | `<ThemedLoginPage />`     | [View Docs](/core/docs/api-reference/mui/components/mui-auth-page)                                                  |
| `<WelcomePage />`      | `@refinedev/core`         |                                                                                                                     |
| `<ReadyPage />`        | no replacement            |                                                                                                                     |

Following deprecated types have been replaced with new types:

```diff
- RefineLayoutLayoutProps
- RefineThemedLayoutProps
+ RefineThemedLayoutV2Props

- RefineLayoutSiderProps
- RefineThemedLayoutSiderProps
+ RefineThemedLayoutV2SiderProps

- RefineLayoutHeaderProps
- RefineThemedLayoutHeaderProps
+ RefineThemedLayoutV2HeaderProps
```

## X Data Grid Changes

The [`@refinedev/mui@6`](https://www.npmjs.com/package/@refinedev/mui) package has no breaking changes except for updating to `@mui/x-data-grid@7`. However, `@mui/x-data-grid@7` includes some important changes you need to check.

For detailed information about Data Grid changes, please refer to the [official MUI X Migration Guide for Data Grid](https://mui.com/x/migration/migration-data-grid-v6/).

### Stying

In `@refinedev/mui@6`, the `useDataGrid` hook was returning the following `sx` object for styling the Data Grid but in `@mui/x-data-grid@7`, the `sx` object has been removed to use default styles from `@mui/x-data-grid@7`.

```tsx
import { darken, useTheme } from "@mui/material/styles";

const theme = useTheme();

const sx = {
  border: "none",
  "& .MuiDataGrid-columnHeaders": {
    background: darken(theme.palette.background.paper, 0.05),
    borderBottom: `1px solid ${darken(theme.palette.background.paper, 0.1)}`,
  },
  "& .MuiDataGrid-cell": {
    borderBottom: `1px solid ${darken(theme.palette.background.paper, 0.05)}`,
  },
};
```
