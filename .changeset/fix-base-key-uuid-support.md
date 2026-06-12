---
"@refinedev/core": patch
---

Extend BaseKey to include number[] to support UUID representations.

Some OpenAPI code generators represent UUID fields as number[] (byte arrays)
in TypeScript. Previously, users working with such types had to cast their ID
values to satisfy the BaseKey constraint, which reduces type safety.

Adding number[] to the union allows these use cases without any type casts.
Existing code using string or number IDs is unaffected.

Fixes #7403.
