---
"@refinedev/react-hook-form": patch
---

Fix `useFieldArray` staying empty when query data is available before the field array mounts (e.g. cached React Query data with `formLoading`).
