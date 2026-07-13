---
title: "useLink Hook | Custom Link Logic in Refine v4"
display_title: "useLink"
sidebar_label: "useLink"
description: "Create custom navigation components. Learn how to use the useLink hook to build branded or specialized links within your Refine project."
---

`useLink` is a hook that returns [`<Link />`](/core/docs/routing/components/link/) component. It is used to navigate to different pages in your application.

:::simple Good to know

- It's recommended to use the `<Link />` component from the `@refinedev/core` package instead of this hook. This hook is used mostly for internal purposes and is only exposed for customization needs.

:::

## Usage

```tsx
import { useLink } from "@refinedev/core";

const MyComponent = () => {
  const Link = useLink();

  return (
    <>
      <Link to="/posts">Posts</Link>
      {/* or */}
      <Link
        go={{
          to: {
            resource: "posts",
            action: "list",
          },
        }}
      >
        Posts
      </Link>
    </>
  );
};
```
