---
"@refinedev/react-hook-form": patch
---

Fix useFieldArray fields being empty on second visit to an edit form.

When navigating away from an edit form and returning to it within a SPA, useFieldArray.fields
was empty on every visit after the first. The root cause was the field-by-field setValue approach
in the query data sync effect: syncedFieldsRef accumulated field paths across navigations,
preventing fields registered by useFieldArray from being populated on re-mount.

The fix replaces applyValuesToFields with reset(data, { keepDirtyValues: true }), which
re-initialises the entire form state including field arrays on each new query result, while
preserving any in-progress user edits via the keepDirtyValues option.

Fixes #7401.
