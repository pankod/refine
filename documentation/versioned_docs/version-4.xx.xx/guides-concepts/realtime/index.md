---
title: "Real-time Data Concepts | Live Updates in Refine"
display_title: "Realtime"
sidebar_label: "Realtime"
description: "Understand the architecture of live data. Learn how Refine v4 manages subscriptions and real-time syncing for React apps."
---

Realtime data is an important part of modern applications. Seeing the changes in the details page, without refreshing the page not only improves the user experience but also increases the productivity of the users by preventing accidental updates.

Refine handles realtime data operations through [Live Provider](/core/docs/realtime/live-provider) which provides a common interface for any integration. Once integrated, you'll get realtime updates across your app out of the box, without needing a further configuration.

Once a **Live Provider** is integrated, Refine takes care of the **invalidation**, **refetching** logic for your resources.

For example if a new record is created for `products` resource, a page where you use `useList` hook will automatically refetch the latest `products` data.

```tsx title="App.tsx"
import { Refine, LiveProvider } from "@refinedev/core";

import { liveProvider } from "./my-live-provider";

const App = () => {
  return (
    <Refine
      liveProvider={liveProvider}
      options={{ liveMode: "auto" }}
      onLiveEvent={(event) => {
        console.log(event);
      }}
    >
      {/* ... */}
    </Refine>
  );
};
```

```tsx title=my-page.tsx
import { useList } from "@refinedev/core";

const { data } = useList({
  resource: "products",
  // Can be configured per-hook basis.
  liveMode: "auto", // manual or off
});
```

## Supported Hooks

Refine hooks works out-of-the-box with **Live Provider**, means if the data these hooks consume is updated, they will automatically refetch.

See the [Integrated Hooks](/core/docs/realtime/live-provider#integrated-hooks) section for more information.

## Built-in Integrations

We have the following built-in integrations:

- **Ably** &#8594 [Source Code](https://github.com/refinedev/refine/blob/main/packages/ably/src/index.ts) - [Demo](https://codesandbox.io/embed/github/refinedev/refine/tree/main/examples/live-provider-ably/?view=preview&theme=dark&codemirror=1)
- **Supabase** &#8594 [Source Code](https://github.com/refinedev/refine/blob/main/packages/supabase/src/index.ts#L187)
- **Appwrite** &#8594 [Source Code](https://github.com/refinedev/refine/blob/main/packages/appwrite/src/index.ts#L252)
- **Hasura** &#8594 [Source Code](https://github.com/refinedev/refine/blob/main/packages/hasura/src/liveProvider/index.ts#L16)

## Live Provider

The **Live Provider** is an object that contains `subscribe`, `unsubscribe` and `publish` methods. These methods are utilized by Refine to subscribe, unsubscribe to a certain resource updates and publish updates.

A basic **Live Provider** looks like this:

```tsx title="live-provider.ts"
import { LiveProvider } from "@refinedev/core";

export const liveProvider: LiveProvider = {
  subscribe: async ({ callback, channel, types, meta, params }) => {
    console.log(callback); // a function that will be called when there is an update
    console.log(channel); // products, orders, etc.
    console.log(types); // created, updated, deleted, "*", etc.
    console.log(meta); // { fields: [], operation: "", queryContext: {}, variables: {} }

    const { resource, id, ids } = params;

    // subscribe to the resource updates
    const unsubscribe = MyWSClient.subscribe({ channel });

    // call the callback function when there is an update
    MyWSClient.on("message", (data) => callback(data));

    // return value will be passed to `unsubscribe` method.
    return { unsubscribe };
  },
  unsubscribe: async ({ unsubscribe }) => {
    // unsubscribe from the resource updates
    unsubscribe();
  },
  publish: async ({ channel, type, payload, date }) => {
    console.log(channel); // products, orders, etc.
    console.log(type); // created, updated, deleted, etc.
    console.log(payload); // { id: 1, name: "Product 1" }, { id: 2, name: "Product 2" }, etc.
    console.log(date); // new Date()

    // publish the data to the resource channel.
    MyWSClient.publish({ channel, type, payload, date });
  },
};
```

## Hooks

While most of the features already works out-of-the-box with **Live Provider**, you can also use the following hooks to subscribe, unsubscribe and publish updates for your custom use cases.

### useSubscription

The `useSubscription` hook can be used to subscribe to a certain resource updates. It calls **Live Provider**'s `subscribe` method with the given parameters.

```tsx
import { useSubscription } from "@refinedev/core";

useSubscription({
  resource: "products",
  types: ["created", "updated"],
  onLiveEvent: (event) => {
    console.log(event.channel); // products, orders, etc.
    console.log(event.type); // created, updated, deleted, etc.
    console.log(event.payload); // { id: 1, name: "Product 1" }, { id: 2, name: "Product 2" }, etc.
  },
});
```

### usePublish

While generally it's not recommended to publish updates from the frontend, you can use `usePublish` hook to publish updates to a certain resource. It calls **Live Provider**'s `publish` method with the given parameters.

```tsx
import { usePublish } from "@refinedev/core";

const publish = usePublish();

publish({
  channel: "products",
  type: "deleted",
  payload: { id: 1 },
  date: new Date(),
});
```

## Creating a live provider with Ably

We will build the **"Ably Live Provider"** of [`@refinedev/ably`](https://github.com/refinedev/refine/tree/main/packages/ably) from scratch to show the logic of how live provider methods interact with Ably.

### Implementing `subscribe` method

This method is used to subscribe to a Realtime channel. Refine subscribes to the related channels using subscribe method in supported hooks to be aware of the data changes.

```ts title="liveProvider.ts"
import { LiveProvider, LiveEvent } from "@refinedev/core";
import Ably from "ably/promises";
import { Types } from "ably";

export const liveProvider = (client: Ably.Realtime): LiveProvider => {
  return {
    subscribe: ({ channel, types, params, callback, meta }) => {
      console.log(channel); // products, orders, etc.
      console.log(types); // created, updated, deleted, "*", etc.
      console.log(params); // { id: 1 } or { ids: [1, 2, 3] }, etc.
      console.log(callback); // a function that will be called when there is an update
      console.log(meta); // { fields: [], operation: "", queryContext: {}, variables: {} }

      const channelInstance = client.channels.get(channel);

      const listener = function (message: MessageType) {
        if (types.includes("*") || types.includes(message.data.type)) {
          if (
            message.data.type !== "created" &&
            params?.ids !== undefined &&
            message.data?.payload?.ids !== undefined
          ) {
            if (
              params.ids.filter((value) =>
                message.data.payload.ids!.includes(value),
              ).length > 0
            ) {
              callback(message.data as LiveEvent);
            }
          } else {
            callback(message.data);
          }
        }
      };

      channelInstance.subscribe(listener);

      // returned value will be passed to `unsubscribe` method.
      // required for unsubscribing from the channel.
      return { channelInstance, listener };
    },
  };
};

interface MessageType extends Types.Message {
  data: LiveEvent;
}
```

Refine will use this subscribe method in the [`useSubscription`](/core/docs/realtime/hooks/use-subscription) hook.

```ts
import { useSubscription } from "@refinedev/core";

useSubscription({
  channel: "channel-name",
  onLiveEvent: (event) => {},
});
```

> For more information, refer to the [useSubscription documentation&#8594](/core/docs/realtime/hooks/use-subscription)

### Implementing `unsubscribe` method

This method is used to unsubscribe from a channel. The values returned from the `subscribe` method are passed to this method.

```ts title="liveProvider.ts"
export const liveProvider = (client: Ably.Realtime): LiveProvider => {
  return {
    unsubscribe: (payload: {
      channelInstance: Types.RealtimeChannelPromise;
      listener: () => void;
    }) => {
      const { channelInstance, listener } = payload;
      channelInstance.unsubscribe(listener);
    },
  };
};
```

:::caution

If you don't handle unsubscription, it could lead to memory leaks.

:::

### Implementing `publish` method

This method is used to publish an event on client side. Beware that publishing events on client side is not recommended and the best practice is to publish events from server side. You can refer [Publish Events from API](#publish-events-from-api) to see which events must be published from the server.

This `publish` is used in [related hooks](#publish-events-from-hooks). When `publish` is used, subscribers to these events are notified. You can also publish your custom events using [`usePublish`](/core/docs/realtime/hooks/use-publish).

```ts title="liveProvider.ts"
export const liveProvider = (client: Ably.Realtime): LiveProvider => {
  return {
    publish: ({ channel, type, payload, date, meta }: LiveEvent) => {
      const channelInstance = client.channels.get(channel);

      channelInstance.publish(type, event);
    },
  };
};
```

:::caution

If `publish` is used on client side you must handle the security of it by yourself.

:::

Refine will provide this publish method via the [`usePublish`](/core/docs/realtime/hooks/use-publish) hook.

```ts
import { usePublish } from "@refinedev/core";

const publish = usePublish();
```

### Usage

Now that we have created our live provider, we can use it in our application like below:

```tsx title="App.tsx"
import { Refine } from "@refinedev/core";
import Ably from "ably/promises";

import { liveProvider } from "./liveProvider";

const ablyClient = new Ably.Realtime("your-ably-token");

const App = () => {
  return <Refine liveProvider={liveProvider(ablyClient)}>{/*...*/}</Refine>;
};
```

## Creating a live provider with GraphQL subscriptions

In this section, we will create a live provider for GraphQL subscriptions from scratch. We will use [Hasura](https://hasura.io/) as an example, but the same logic can be applied to any GraphQL subscription provider.

`@refinedev/hasura` has a built-in live provider for Hasura subscriptions, but we will create our own from scratch to learn how it works.

Before diving into the code, let's see the difference between GraphQL queries and subscriptions.

**GraphQL queries**

```ts
// highlight-next-line
query GetPosts {
  posts {
    id
    title
    content
  }
}
```

**GraphQL subscriptions**

```ts
// highlight-next-line
subscription GetPosts {
  posts {
    id
    title
    content
  }
}
```

As you can see, the only difference between queries and subscriptions is the `subscription` keyword. This means that we can use the same logic for both queries and subscriptions. We already have a data provider for creating GraphQL queries, so we will use the same logic for GraphQL subscriptions.

### Implementing `subscribe` method

When you call the [`useList`](/core/docs/data/hooks/use-list), [`useOne`](/core/docs/data/hooks/use-one) or [`useMany`](/core/docs/data/hooks/use-many) hooks, they will call the `subscribe` method of the live provider.

Thus, we will be able to create subscription queries using the parameters of these hooks. After creating the subscription query, we will listen it using the [`graphql-ws`](https://github.com/enisdenjo/graphql-ws) client and return the unsubscribe method to use in the `unsubscribe` method of the live provider.

```ts title="liveProvider.ts"
import { LiveProvider } from "@refinedev/core";
import { Client } from "graphql-ws";

import {
  generateUseListSubscription,
  generateUseManySubscription,
  generateUseOneSubscription,
} from "../utils";

const subscriptions = {
  useList: generateUseListSubscription,
  useOne: generateUseOneSubscription,
  useMany: generateUseManySubscription,
};

export const liveProvider = (client: Client): LiveProvider => {
  return {
    subscribe: ({ callback, params, meta }) => {
      const {
        resource,
        pagination,
        sorters,
        filters,
        subscriptionType,
        id,
        ids,
      } = params ?? {};

      if (!meta) {
        throw new Error(
          "[useSubscription]: `meta` is required in `params` for graphql subscriptions",
        );
      }

      if (!subscriptionType) {
        throw new Error(
          "[useSubscription]: `subscriptionType` is required in `params` for graphql subscriptions",
        );
      }

      if (!resource) {
        throw new Error(
          "[useSubscription]: `resource` is required in `params` for graphql subscriptions",
        );
      }

      const generateSubscription = subscriptions[subscriptionType];

      const { query, variables, operation } = generateSubscription({
        ids,
        id,
        resource,
        filters,
        meta,
        pagination,
        sorters,
      });

      const onNext = (payload: { data: any }) => {
        callback(payload.data[operation]);
      };

      const unsubscribe = client.subscribe(
        {
          query,
          variables,
        },
        {
          next: onNext,
          error: () => null,
          complete: () => null,
        },
      );

      // Will be passed to `unsubscribe` method.
      return unsubscribe;
    },
  };
};
```

:::info

`generateUseListSubscription`, `generateUseOneSubscription` and `generateUseManySubscription` are helper functions that generate subscription queries. They are same as the methods in the data provider of `@refinedev/hasura`. You can check them out [here](https://github.com/refinedev/refine/tree/main/packages/hasura/src/utils).

:::

Refine hooks will create a subscription query using the parameters of the [useSubscription](/core/docs/realtime/hooks/use-subscription) hook and listen to it. When a live event is received, it will call the `onLiveEvent` method of the `useSubscription` hook.

```ts
import { useSubscription } from "@refinedev/core";

useSubscription({
  channel: "posts",
  enabled: true,
  onLiveEvent: (event) => {
    // called when a live event is received
    console.log(event);
  },
  params: {
    resource: "posts",
    pagination: {
      current: 1,
      pageSize: 10,
    },
    subscriptionType: "useList",
  },
  meta: {
    fields: [
      "id",
      "title",
      {
        category: ["title"],
      },
      "content",
      "category_id",
      "created_at",
    ],
  },
});
```

### Implementing `unsubscribe` method

We will call the `unsubscribe` method that we returned from the `subscribe` method to unsubscribe from the subscription query.

```ts title="liveProvider.ts"
import { LiveProvider } from "@refinedev/core";
import { Client } from "graphql-ws";

...

export const liveProvider = (client: Client): LiveProvider => {
    return {
        ...
        unsubscribe: (unsubscribe) => {
            unsubscribe();
        },
    };
};
```

### Usage

Now that we have created our live provider, we can use it in our application like below:

```tsx title="App.tsx"
import { Refine } from "@refinedev/core";
import { createClient } from "graphql-ws";

import { liveProvider } from "./liveProvider";

const gqlWebSocketClient = createClient({
  url: "YOUR_WS_URL",
});

const App: React.FC = () => {
  return (
    <Refine liveProvider={liveProvider(gqlWebSocketClient)}>
      {/* ... */}{" "}
    </Refine>
  );
};
```
