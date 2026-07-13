---
id: useResourceWithRoute
title: useResourceWithRoute
---

`useResourceWithRoute` is used to get the resource object in resources array that you defined in `<Refine>` by route name.

The hook is used internal in **refine**. Normally you don't need this hook, but we export it as it may be useful for some use-cases.

```ts
import { useResourceWithRoute } from "@pankod/refine-core";

const resourceWithRoute = useResourceWithRoute();

const resource = resourceWithRoute("posts");
```

## API Reference

### Return value

| Description       | Type                                                                                                     |
| ----------------- | -------------------------------------------------------------------------------------------------------- |
| resourceWithRoute | [`(route: string) => IResourceItem`](/core/docs/3.xx.xx/api-reference/core/interfaces#resourceitemprops) |
