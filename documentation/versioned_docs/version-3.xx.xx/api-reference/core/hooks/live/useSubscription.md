---
id: useSubscription
title: useSubscription
source: packages/core/src/hooks/live/useSubscription/index.ts
---

`useSubscription` calls the [`subscribe`][live-provider-subscribe] method from [`liveProvider`][live-provider] when mounted. It is useful when you want to subscribe to a Realtime channel.

:::info-tip
**refine** use this hook internally in data hooks to `subscribe` Realtime data. You can refer liveProvider's [Supported Hooks Subscriptions][supported-hooks-subscription] section for more information.
:::

## Usage

```tsx
import { useSubscription } from "@pankod/refine-core";

useSubscription({
    channel: "channel-name",
    types: ["event-name", "another-event-name"]
    onLiveEvent: (event) => {},
});

```

### Properties

Will be passed to the [subscribe][live-provider-subscribe] method from the [liveProvider][live-provider] as a parameter. You can use these properties from the [`liveProvider`][live-provider]'s [`subscribe`][live-provider-subscribe] method and use them to subscribe to a channel.

### channel <PropTag required/>

Channel name to subscribe.

### onLiveEvent <PropTag required/>

Callback that is run when new events from subscription arrive.

### types

> Default: `["*"]`

Type of events to subscribe. `"\*"` means all events.

### enabled

> Default: `true`

### params

You can pass any additional parameters to the [`liveProvider`][live-provider]'s [`subscribe`][live-provider-subscribe] method.

Hooks that use `useSubscription` internally, send the query's parameters(pagination, metaData, sort, filters, etc.) information along with this prop.

[Refer to LiveProvider's "Supported Hooks Subscription" section for which hooks are using `useSubscription` internally &#8594][supported-hooks-subscription]

## API Reference

### Properties

<PropsTable module="@pankod/refine-core/useSubscription"  />

[live-provider]: /core/docs/3.xx.xx/api-reference/core/providers/live-provider
[live-provider-subscribe]: /core/docs/3.xx.xx/api-reference/core/providers/live-provider/#subscribe
[supported-hooks-subscription]: /core/docs/3.xx.xx/api-reference/core/providers/live-provider/#supported-hooks-subscription
