---
"@refinedev/react-table": patch
---

fix(react-table): only reset the current page when filters or sorters actually change

The `columnFilters`/`sorting` sync effects in `useTable` reset `currentPage` to 1 on **every** effect re-run while a filter or sort was active — the `isEqual` guard covered `setFilters`/`setSorters` but not the page reset. Since the filters effect is keyed on `[columnFilters, columns]`, any change of the `columns` array identity re-fired it: with `syncWithLocation`, `useNavigation()`'s callbacks are recreated on every URL change (the router bindings' `go` depends on `useLocation()`), so columns memoized over them get a fresh identity right after the pagination click itself — the next page was fetched and immediately snapped back to page 1.

Both resets now live inside their `isEqual` guards: the page still resets when filters or sorters actually change, and deep links keep working (the existing `isFirstRender` guard already suppressed the mount pass).
