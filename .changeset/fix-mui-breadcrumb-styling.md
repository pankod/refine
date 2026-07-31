---
"@refinedev/mui": patch
---

fix(mui): use MuiLink in Breadcrumb LinkRouter to respect styling props

The `LinkRouter` helper in the Breadcrumb component was spreading MUI `LinkProps` (sx, underline, color, variant) onto a plain `<span>` element, which silently ignored all styling. Replaced with `<MuiLink component="span">` so props are properly processed by MUI's styling system.

This was a regression from the v5 migration (commit 5d63ada, #6945).

Fixes #7462
