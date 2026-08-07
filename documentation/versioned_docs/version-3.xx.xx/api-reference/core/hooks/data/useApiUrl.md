---
id: useApiUrl
title: useApiUrl
source: packages/core/src/data/hooks/useApiUrl.ts
---

`useApiUrl` is a React hook that returns the API URL.

- It uses the `getApiUrl` method to get the API URL from the [`dataProvider`][data provider].

It is useful when you want to use the API URL in your custom hooks.

## Usage

The `useApiUrl` hook does not expect any parameter. It will run the `getApiUrl` method from the `dataProvider` and return the result.

```tsx
//highlight-next-line
import { useCustom, useApiUrl } from "@pankod/refine-core";

interface PostUniqueCheckResponse {
  isAvailable: boolean;
}

//highlight-next-line
const apiUrl = useApiUrl();

const { data, isLoading } = useCustom<PostUniqueCheckResponse>({
  //highlight-next-line
  url: `${apiUrl}/posts-unique-check`,
  method: "get",
  config: {
    query: {
      title: "Foo bar",
    },
  },
});
```

## API

### Return value

| Description | Type     |
| ----------- | -------- |
| API URL     | `string` |

[data provider]: /core/docs/3.xx.xx/api-reference/core/providers/data-provider
