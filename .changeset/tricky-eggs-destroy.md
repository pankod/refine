---
"@refinedev/core": minor
---

Add generic type support to `useDataProvider` so custom data providers keep their assigned types when accessed through the hook.

This is a type-only improvement. Existing runtime behavior is unchanged, and consumers can opt into the stronger type by passing a generic argument when calling `useDataProvider`.
