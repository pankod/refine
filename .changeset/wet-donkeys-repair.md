---
"@refinedev/core": patch
"@refinedev/antd": patch
"@refinedev/mantine": patch
---

fix: notification `type` is not correctly rendered in `@refinedev/antd` and `@refinedev/mantine`

- `@refinedev/antd`: `notificationProvider` now calls the `notification.success` / `notification.error` / `notification.info` / `notification.warning` shortcut methods instead of passing an unsupported `type` option to `notification.open()`, which silently dropped icon/color styling.
- `@refinedev/mantine`: `notificationProvider` now maps each notification `type` to its own color and icon instead of collapsing every non-`"success"` type into red/error styling.
- `@refinedev/core`: widened `OpenNotificationParams.type` to `"success" | "error" | "progress" | "info" | "warning"` and made it optional, so a plain/neutral notification can be shown without a `@ts-expect-error` workaround. Resolves #6326.

Resolves #7477
