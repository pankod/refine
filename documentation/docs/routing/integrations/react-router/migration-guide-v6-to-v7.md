---
title: "Migration Guide V6 to V7 Migration Guide | Best Practices in Refine v5"
display_title: "Migration Guide from v6 to v7"
description: "Implement Migration Guide V6 To V7 in Refine v5. Learn the key steps. Explore best practices for SSR, navigation for real-world React admin panels."
sidebar_label: v6 to v7
---

In this guide, we will cover the breaking changes of `@refinedev/react-router-v6` and how to migrate your project to `@refinedev/react-router` with `react-router` v7.

> 🚨 Refine doesn't introduce any breaking changes besides the package name changes. However, we recommend you to read the [React Router v7 migration guide](https://reactrouter.com/upgrading/v6) for more detailed information about React Router v7 changes.

## Package Changes

We changed the package name from `@refinedev/react-router-v6` to `@refinedev/react-router` for consistency and to avoid confusion. Also `react-router-dom` is replaced with `react-router` in [version 7](https://reactrouter.com/upgrading/v6#upgrade-to-v7).

First, we need to uninstall old packages.

```bash
npm uninstall @refinedev/react-router-v6 react-router-dom react-router
```

Then, we need to install the new packages.

Note that `react-router-dom` is no longer needed, all react-router v7 components are imported from `react-router` package.

```bash
npm install @refinedev/react-router react-router
```

```diff

- "@refinedev/react-router-v6": "^4.6.0"
+ "@refinedev/react-router": "^1.0.1"

- "react-router-dom": "^6.8.1"
- "react-router": "^6.8.1"
+ "react-router": "^7.0.2"
```

Then is all set! You can start using `@refinedev/react-router` with `react-router` v7.

### Updating imports

Package imports are changed as follows:

```diff
 import routerProvider, { NavigateToResource, UnsavedChangesNotifier, DocumentTitleHandler }
- from "@refinedev/react-router-v6";
 import routerProvider, { NavigateToResource, UnsavedChangesNotifier, DocumentTitleHandler }
+ from "@refinedev/react-router";

-import { RouterProvider } from "react-router-dom";
+import { RouterProvider } from "react-router";
```

### 🪄 Updating imports automatically with refine-codemod ✨ (recommended)

Instead of manually updating the imports, you can use the `refine-codemod` to automatically update the imports in your project. Make sure your git working tree is clean though so you can revert if it doesn't work as expected.

For `@refinedev/react-router-v6` to `@refinedev/react-router`:

```bash
npx @refinedev/codemod@latest refine-react-router-v6-to-refine-react-router
```

For `react-router-dom` to `react-router`:

```bash
npx @refinedev/codemod@latest react-router-dom-to-react-router
```
