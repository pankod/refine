---
id: useGetIdentity
title: useGetIdentity
siderbar_label: useGetIdentity
description: useGetIdentity data hook from refine is a modified version of react-query's useQuery for retrieving user data
---

`useGetIdentity` calls the `getUserIdentity` method from the [`authProvider`](/core/docs/3.xx.xx/api-reference/core/providers/auth-provider) under the hood.

It returns the result of `react-query`'s `useQuery` which includes many properties, some of which being `isSuccess` and `isError`. Data that is resolved from the `getUserIdentity` will be returned as the `data` in the query result.

## Usage

`useGetIdentity` can be useful when you want to get the user information anywhere in your code.

Let's say that you want to show the user's name.

We have a logic in [`authProvider`](/core/docs/3.xx.xx/api-reference/core/providers/auth-provider)'s `getUserIdentity` method like below.

```tsx
const authProvider: AuthProvider = {
  ...
    // highlight-start
    getUserIdentity: () =>
            Promise.resolve({
                id: 1,
                fullName: "Jane Doe",
            }),
  // highlight-end
  ...
};
```

<br/>

You can access identity data like below.

```tsx
// highlight-next-line
import { useGetIdentity } from "@pankod/refine-core";

export const User: React.FC = () => {
  // highlight-next-line
  const { data: identity } = useGetIdentity<{ id: number; fullName: string }>();

  return <span>{identity?.fullName}</span>;
};
```

:::caution
This hook can only be used if the `authProvider` is provided.
:::
