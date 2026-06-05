---
"@refinedev/core": minor
---

feat: add `updateIdentity` method to auth provider and `useUpdateIdentity` hook

Added an optional `updateIdentity` method to the `AuthProvider` interface so consumers can natively update the current user's identity (e.g. username and/or email), following the same pattern as `updatePassword`.

A new `useUpdateIdentity` hook calls the `updateIdentity` method from the `authProvider` under the hood, mirroring `useUpdatePassword`'s behavior for redirects, notifications and error handling.

```tsx
import { useUpdateIdentity } from "@refinedev/core";

const { mutate: updateIdentity } = useUpdateIdentity();

updateIdentity({ name: "New Name", email: "new@email.com" });
```

The `updateIdentity` method is optional, so existing auth providers remain fully backwards-compatible.

[Resolves #6926](https://github.com/refinedev/refine/issues/6926)
