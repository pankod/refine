---
"@refinedev/core": minor
---

Converted `MetaQuery` and `GraphQLQueryOptions` from type aliases to interfaces.

This is structurally identical and fully backward compatible, but it unlocks TypeScript's [declaration merging](https://www.typescriptlang.org/docs/handbook/declaration-merging.html) for `MetaQuery`. Consumers can now extend it in their own apps to get autocompletion and type-checking for custom `meta` fields (e.g. `meta.queryParams` used by custom data providers) across every hook that accepts `meta`:

```ts
declare module "@refinedev/core" {
  interface MetaQuery {
    queryParams?: {
      _pull?: string;
      [key: string]: unknown;
    };
  }
}
```

Previously this was not possible because declaration merging only applies to interfaces, not type aliases.
