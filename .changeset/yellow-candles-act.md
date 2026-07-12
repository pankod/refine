---
"@refinedev/react-hook-form": major
---

Fix issue where useFieldArray values drop during form remount on SPA navigation by replacing custom microtask syncing with native form reset. Fixes #7401.
