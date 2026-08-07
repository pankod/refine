---
"@refinedev/react-hook-form": patch
---

Fix useFieldArray.fields empty on subsequent loads. The first data load now `reset()`s the form with only the registered subset of the record.
