---
title: "useBack Hook | Options, Patterns & Edge Cases in Refine v5"
display_title: "useBack"
sidebar_label: "useBack"
description: "Build Use Back in Refine v5. Learn the key steps. Explore best practices for usage and history for real-world React admin panels. Learn with code examples."
---

`useBack` is a hook that leverages the `back` method of the [`routerProvider`][routerprovider] to perform the "go back" operation in the history stack.

## Usage

```tsx
import { useBack } from "@refinedev/core";

const MyComponent = () => {
  const back = useBack();

  return <Button onClick={() => back()}>Go Back</Button>;
};
```

[routerprovider]: /core/docs/routing/router-provider
