---
"@refinedev/mui": patch
---

fix(mui): render `Breadcrumb` links as a MUI `Link` so styling is applied

The internal `LinkRouter` helper in `@refinedev/mui`'s `Breadcrumb` spread MUI `Link` props (`sx`, `underline`, `color`, `variant`) onto a bare native `<span>`, so none of them had any effect. As a result breadcrumb links weren't flex-aligned with their icons, got no hover underline, didn't inherit color, and lost their typography size.

`LinkRouter` now renders a real MUI `Link` (`component={LinkFromRouter}`), so the styling props are consumed by MUI while client-side routing via `to` is preserved. This also removes the previously-unused `Link as MuiLink` import that had been dead since the v5 migration.
