---
title: "useBack Hook | Navigate Backwards in Refine v4"
display_title: "useBack"
sidebar_label: "useBack"
description: 'Implement "Go Back" functionality easily. Learn how to use the useBack hook for intuitive navigation history management in React.'
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
