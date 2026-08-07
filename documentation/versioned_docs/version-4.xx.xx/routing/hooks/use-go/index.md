---
title: "useGo Hook | Programmatic Navigation in Refine v4"
display_title: "useGo"
sidebar_label: "useGo"
description: "Navigate between pages with ease. Master the useGo hook to trigger route changes for resources and custom actions in your app."
---

`useGo` is a hook that leverages the `go` method of the [`routerProvider`][routerprovider] to perform navigation operations.

## Usage

### With path

```tsx
import { useGo } from "@refinedev/core";

const MyComponent = () => {
  const go = useGo();

  return (
    <Button
      onClick={() => {
        go({
          to: "/posts",
          query: {
            filters: [
              {
                field: "title",
                operator: "contains",
                value: "Refine",
              },
            ],
          },
          type: "push",
        });
      }}
    >
      Go Posts With Default Filters
    </Button>
  );
};
```

### With resource

`to` accepts an object with the following shape to navigate to a resource:

```tsx
type ToWithResource = {
  resource: string; // resource name or identifier
  id?: BaseKey; // required when `action` is `"edit"`, `"show"`, or `"clone"`.
  action: "list" | "create" | "edit" | "show" | "clone"; // action name
  meta?: Record<string, unknown>; // meta data to be used when composing the path (use if you have additional path parameters)
};
```

`useGo` will convert the resource object into the path defined in the resources array within the `<Refine />` component.

```tsx
import { useGo } from "@refinedev/core";

const MyComponent = () => {
    const go = useGo();

    return (
        <Button
            onClick={() => {
                go({
                    to:  {
                        resource: "posts", // resource name or identifier
                        action: "edit",
                        id: "1",
                    }
                    query: {
                         foo: "bar",
                    },
                    type: "push",
                });
            }}
        >
            Go Posts With Default Filters
        </Button>
    );
};
```

## Parameters

### to

The `to` parameter is the path you want to navigate to. If left empty, it will navigate to the current path, which is useful for updating the query parameters.

Also, you can pass a `resource` object to the `to` parameter. The `routerProvider` will convert the resource object to the path.

### query

The `query` parameter is the query parameters you want to add to the path. It is an object which the `routerProvider` will convert to the query string.

### type

The `type` parameter is the type of navigation you want to perform. It can be one of the following:

- `push`: It adds a new entry to the history stack.
- `replace`: It replaces the current entry on the history stack.
- `path`: Returns the navigation path for the given config. Doesn't mutate the history stack.

### hash

The `hash` parameter is the hash you want to add to the path.

### options.keepQuery

The `options.keepQuery` parameter is a boolean that determines whether the current query parameters should be kept or not. If it is `true`, the current query parameters will be merged with the new query parameters. If it is `false`, the current query parameters will be ignored.

### options.keepHash

The `options.keepHash` parameter is a boolean that determines whether the current hash should be kept or not. If it is `true`, the current hash will be kept in the URL. If it is `false`, the current hash will be ignored.

## Return Value

`useGo` does not return any value except for the `path` type, which returns the navigation path for the given config without mutating the history stack.

[routerprovider]: /core/docs/routing/router-provider
[basekey]: /core/docs/core/interface-references#basekey
