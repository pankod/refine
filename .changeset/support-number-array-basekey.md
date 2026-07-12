---
"@refinedev/core": patch
---

fix: support number array identifiers in `BaseKey` #7403

`BaseKey` now supports `number[]` identifiers for compatibility with generated API models that represent identifiers as arrays of numbers.

Fixes #7403
