---
"@refinedev/antd": patch
"@refinedev/core": patch
"@refinedev/mantine": patch
---

fix: respect notification types in Ant Design and Mantine providers. #7477

Ant Design notifications now use the native type-specific APIs, Mantine maps
success, error, info, and warning to distinct colors and icons, and notification
types may be omitted for neutral notifications. Fixes #7477.
