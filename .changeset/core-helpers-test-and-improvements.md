---
"@refinedev/core": patch
---

refactor(core): improve helper implementations and expand unit test coverage

- Use `Array.includes` in `hasPermission` helper for direct semantic membership check
- Fix parameter spelling in `userFriendlySecond`
- Add comprehensive test suites for `humanizeString`, `flattenObjectKeys`, `hasPermission`, `handlePaginationParams`, `propertyPathToArray`, `userFriendlySeconds`, `importCSVMapper`, and `sanitizeResource` helpers
