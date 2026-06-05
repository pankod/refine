---
"@refinedev/mui": minor
---

feat(mui): propagate DataGrid `quickFilterValues` to the data provider via `meta`

`useDataGrid` now forwards `quickFilterValues` and `quickFilterLogicOperator` from MUI's `GridFilterModel` through to the data provider's `getList` call via `meta`. Previously these fields on the filter model were ignored, so the toolbar's quick filter input had no effect in server-side filtering mode.

The values bypass `CrudFilters` (which map 1:1 to per-column `GridFilterItem`s) and are placed on `meta` instead, so the data provider can interpret them as a free-text search parameter — e.g. translating to a `q=` query string — or ignore them. The toolbar input is kept in sync via the returned `filterModel`, so it remains responsive as the user types while the server query stays debounced.

```ts
// dataProvider
getList: async ({ resource, filters, sorters, pagination, meta }) => {
  const params = new URLSearchParams();
  if (meta?.quickFilterValues?.length) {
    params.set("q", meta.quickFilterValues.join(" "));
    if (meta.quickFilterLogicOperator) {
      params.set("q_op", meta.quickFilterLogicOperator);
    }
  }
  // ...
};
```
