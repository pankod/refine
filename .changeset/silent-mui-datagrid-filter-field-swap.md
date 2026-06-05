---
"@refinedev/mui": patch
---

fix(mui): clear stale filter value when a DataGrid filter row's field is swapped

In `useDataGrid`, when the user changes the column on an existing row in the MUI X DataGrid filter panel, MUI keeps the previously entered `value`. That value is meaningless under the new field (enums, foreign-key references, booleans, etc.) and was forwarded to the data provider as a `CrudFilter`, producing invalid queries.

`onFilterModelChange` now compares the incoming filter model against the previous one when the item count is unchanged. Rows are matched by `GridFilterItem.id` (falling back to position when an id is absent) so single-step row swaps and reorders aren't misread as field changes. If a row's `field` changed but its `value` was carried over, the value is cleared before the model is translated to a `CrudFilter`. The cached previous model is also reset when filters are replaced out-of-band via `search()`. Add/remove row paths are untouched.
