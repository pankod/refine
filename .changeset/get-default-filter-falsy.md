---
"@refinedev/core": patch
---

fix(core): preserve falsy values in `getDefaultFilter`

`getDefaultFilter` used `filter.value || []`, which replaced valid falsy filter values (`0`, `false`, `""`) with an empty array. As a result, default values for numeric/boolean/empty-string filters were lost when populating form controls. Switched to `filter.value ?? []` so only `undefined`/`null` fall back to `[]`.
