---
title: "useApiUrl Hook | Refine v4"
display_title: "useApiUrl"
sidebar_label: "useApiUrl"
description: "Learn how to access and manage the active API base URL dynamically in Refine v4 using the useApiUrl data hook."
source: packages/core/src/data/hooks/useApiUrl.ts
---

`useApiUrl` is a React hook that returns the API URL. It uses the `getApiUrl` method to get the API URL from the [`dataProvider`][data provider].

It is useful when you want to use the API URL in your custom hooks.

## Usage

`useApiUrl` hook will invoke the `getApiUrl` method from the current resource's `dataProvider` and return the result. If no resource can be inferred, it will return default data provider's URL.

```tsx
//highlight-next-line
import { useCustom, useApiUrl } from "@refinedev/core";

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

`useApiUrl` hook also accepts optional `dataProviderName` parameter to explicitly get specific `dataProvider`'s URL regardless of current resource's `dataProvider`.

```tsx
export const App: React.FC = () => {
    return (
        <Refine
            // highlight-start
            dataProvider={{
                default: dataProvider("https://api.fake-rest.refine.dev/"),
                other: dataProvider("https://other-api.fake-rest.refine.dev/"),
            }}
            // highlight-end
        >
            {/* ... */}
        </Refine>
    );
};
    ...
</Refine>


const apiUrl = useApiUrl("other");
//    ^ https://other-api.fake-rest.refine.dev/
```

## API Reference

### Return value

| Description | Type     |
| ----------- | -------- |
| API URL     | `string` |

[data provider]: /core/docs/data/data-provider
