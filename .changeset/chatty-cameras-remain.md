---
"@refinedev/core": patch
---

fix(core): keep query context signal lazy when merging meta

`prepareQueryContext` was previously spread into new `meta` objects inside core data hooks. Because `signal` is exposed as a getter, object spread eagerly accessed it during merge and marked the query as abortable earlier than intended.

This keeps `signal` lazy by merging `meta` inside `prepareQueryContext` and preserving the getter on the returned object. The fix is applied across the affected hooks in `@refinedev/core`, and a regression test was added for the lazy `signal` behavior.

Resolves #7132
