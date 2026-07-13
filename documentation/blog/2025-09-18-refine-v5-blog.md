---
title: Refine CORE v5 is here!
description: Refine CORE v5 brings React 19 support, TanStack Query v5, cleaner APIs, and automatic migration with codemods.
slug: refine-v5-announcement
authors: ozgur
category: "Announcement"
tags: []
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2025/2025-10-18-refine-v5-blog/refine-v5-blog-1.png
hide_table_of_contents: false
---

We're excited to announce that **Refine v5** is now officially released!

This major release focuses on modernization and developer experience improvements. We've upgraded to React 19 and TanStack Query v5, cleaned up deprecated APIs, and restructured our hook interfaces for better consistency.

We've been listening to community feedback and addressing the most common pain points developers face. This release is about making Refine more predictable and easier to work with.

## What's new in v5?

**Refine v5** is all about modernization, performance, and making your life as a developer easier. We've upgraded to React 19 and TanStack Query v5, cleaned up deprecated APIs, and completely restructured our hook interfaces to be way more consistent and type-safe.

### React 19 Ready

We've upgraded to **React 19** to keep you at the cutting edge of React development. React 19 brings improved performance, better error handling, and enhanced developer experience - and Refine v5 still works great with React 18 too, so you can upgrade when you're ready.

React 19 introduces some really cool improvements in server-side rendering, concurrent features, and overall performance. With Refine v5, you can take advantage of better hydration performance, improved server components support, and enhanced concurrent rendering patterns.

```tsx
// Refine v5 works seamlessly with both React 18 and 19
import React from "react";
import { Refine } from "@refinedev/core";

function App() {
  return (
    <Refine
      dataProvider={dataProvider}
      authProvider={authProvider}
      resources={resources}
    />
  );
}
```

This compatibility means your applications are future-ready and can adopt the latest React ecosystem improvements whenever you want.

### TanStack Query v5

The upgrade to **TanStack Query v5** brings significant performance improvements and modern async state management. Your data fetching is now faster and more reliable than ever.

TanStack Query v5 includes optimized query execution patterns, more efficient memory management, and better handling of concurrent requests. What this means for you is faster application performance, especially for data-heavy CRUD applications where Refine really shines.

The new version also gives you enhanced error handling with more granular control over error states and retry logic. Plus, the improved TypeScript support means better type inference and more accurate autocomplete suggestions.

### Clean, Consistent Hook APIs

We've restructured all hook return types to be more consistent and predictable. No more confusion about nested properties!

Before, you'd often run into confusing nested property access patterns and inconsistent return shapes across different hooks. In v4, getting to your data sometimes meant figuring out whether you needed `data?.data` or just `data`, and query state properties were all mixed up with result data.

```tsx
// Before v5
const { data, isLoading, isError } = useList();
const posts = data?.data; // Nested access 😕

// v5 - Much cleaner!
const {
  result: { data },
  query: { isLoading, isError },
} = useList();
const posts = data; // Direct access with better types! ✨
```

This change groups query state (`isLoading`, `isError`, `refetch`) and result data (`data`, `total`) logically, making the API much more predictable across all hooks. It also makes TypeScript way better at helping you out with intellisense and error detection.

### Coordinated Ecosystem Release

All Refine packages have been updated together, ensuring maximum compatibility:

| Package                | v4 → v5           |
| ---------------------- | ----------------- |
| `@refinedev/core`      | 4.x.x → **5.x.x** |
| `@refinedev/antd`      | 5.x.x → **6.x.x** |
| `@refinedev/mui`       | 6.x.x → **7.x.x** |
| `@refinedev/mantine`   | 2.x.x → **3.x.x** |
| `@refinedev/chakra-ui` | 2.x.x → **3.x.x** |

This coordinated release strategy ensures that when you upgrade to Refine v5, all your UI integrations, router packages, and additional utilities are guaranteed to work together without compatibility issues.

## ✨ Migrating your project automatically with refine-codemod

Here's the magic part - **you don't need to update anything manually!** Our codemod handles the entire migration automatically:

```bash
npx @refinedev/codemod@latest refine4-to-refine5
```

That's it! The codemod will:

- Update all your hook usages to the new consistent APIs
- Fix deprecated API calls and replace them with modern alternatives
- Update imports and configurations to work with v5
- Handle all the breaking changes so you don't have to worry about them

Most projects can be migrated in just a few minutes with minimal manual intervention required. While the codemod covers most migration scenarios, some complex patterns may require manual attention - but don't worry, we've documented these cases thoroughly in our migration guide.

## Performance improvements

Refine v5 comes with bundle size optimizations and faster runtime performance. We've removed all deprecated APIs and legacy code, optimized tree-shaking, and reduced unnecessary re-renders throughout the framework.

### Bundle Size Optimizations

The removal of legacy code and deprecated APIs has resulted in significant bundle size improvements. By eliminating compatibility layers and redundant code paths, Refine v5 delivers smaller bundles that load faster and consume less memory.

Tree-shaking capabilities have also been improved, ensuring that unused parts of the framework don't contribute to your final bundle size. This is particularly beneficial for applications that only use a subset of Refine's features.

### Runtime Performance

Runtime performance has been improved through several optimizations in the core framework. The simplified hook APIs reduce computational overhead during component rendering, and the updated data management patterns provide more efficient state updates.

The integration with TanStack Query v5 brings additional performance benefits through improved caching strategies and more efficient query execution. These improvements are particularly noticeable in data-intensive applications that perform frequent API operations.

## Why upgrade to Refine v5?

**Future-ready:** React 19 and TanStack Query v5 support means your apps are built on the most modern foundation available.

**Better DX:** Consistent hook APIs, improved TypeScript support, and cleaner code structure make development more enjoyable.

**Faster apps:** Smaller bundles, better performance, and enhanced caching strategies improve user experience.

### Future-Proofing Your Applications

React 19 compatibility means your applications are ready for the latest React ecosystem improvements. As React continues to evolve with better server-side rendering, enhanced concurrent features, and improved performance, Refine v5 positions your applications to take advantage of these improvements right away.

The upgrade to TanStack Query v5 means your data management layer is built on the most modern and performant foundation available. This gives you better caching strategies, enhanced error handling, and improved TypeScript support that will benefit your application both now and in the future.

## Get started

Ready to upgrade? Our automated migration makes it super easy:

1. Run the codemod: `npx @refinedev/codemod@latest refine4-to-refine5`
2. Check our [migration guide](/core/docs/migration-guide/4x-to-5x/) for any edge cases

For detailed technical information, see our [complete migration guide](/core/docs/migration-guide/4x-to-5x/).

## Conclusion

Refine v5 brings modern React compatibility, better performance, and an improved developer experience while keeping all the flexibility that makes Refine great for building data-intensive applications.

With React 19 and TanStack Query v5 support, plus our restructured APIs, your applications are built on the most modern foundation available. And thanks to our automated migration tooling, upgrading is quick and painless for most projects.

We're grateful to our amazing community for all the feedback that made this release possible. Your input drives everything we do, and we're excited to see what you'll build with Refine v5!

If you love Refine, please [give us a star on GitHub](https://github.com/refinedev/refine) ⭐

Join our [Discord community](https://discord.gg/refine) for support and to share your experiences!
