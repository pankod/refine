---
"@refinedev/mui": patch
---

Fix breadcrumb link rendering in `LinkRouter` to prevent styling loss (underline, color, and sx props) by using MUI `MuiLink` instead of a plain span wrapper.
