---
"@refinedev/chakra-ui": patch
"@refinedev/mantine": patch
---

Add logout confirmation dialog support to Chakra UI and Mantine siders. When `options.logout.confirm` is `true` in `<Refine>` options, clicking logout shows a `window.confirm` dialog before executing logout, consistent with the MUI sider implementation.
