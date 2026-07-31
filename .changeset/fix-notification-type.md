---
"@refinedev/antd": patch
"@refinedev/mantine": patch
---

fix(antd,mantine): respect notification type in notification providers

**@refinedev/antd**: Use `notification.success()` and `notification.error()` shortcut methods instead of `notification.open({ type })`, which does not render type-specific icons or colors in Ant Design.

**@refinedev/mantine**: Properly map notification types to distinct colors and icons — `success` renders with green/check, `error` renders with red/x — instead of treating all non-success types as error.

Fixes #7477
