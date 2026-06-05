---
"@refinedev/mui": patch
---

fix(mui): stabilize `filterModel` identity returned from `useDataGrid`

`useDataGrid` returned `dataGridProps.filterModel` as a freshly-allocated object on every render even when the underlying filter state was unchanged. Consumers feeding it into MUI X DataGrid (or to `useEffect` deps keyed on its identity) hit unnecessary work and could trigger effect loops in user code.

Wrapped the `filterModel` computation in `useMemo` keyed on `muiCrudFilters`, the permanent filters, and the column-type map — mirroring the existing memoization already used for `sortModel`. Behavior is otherwise unchanged: the value still updates whenever the underlying filter state or the DataGrid-reported column types actually change.
