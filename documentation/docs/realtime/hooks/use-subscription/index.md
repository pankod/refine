---
title: "useSubscription Hook | Options, Patterns & Edge Cases in Refine v5"
display_title: "useSubscription"
sidebar_label: "useSubscription"
description: "Integrate Use Subscription in Refine v5. Learn best practices. Learn best practices for channel and properties for real-world React admin panels."
source: packages/core/src/hooks/live/useSubscription/index.ts
---

`useSubscription` calls the [`subscribe`][live-provider-subscribe] method from [`liveProvider`][live-provider] when mounted. It is useful when you want to subscribe to a Realtime channel.

Refine uses this hook internally in data hooks to `subscribe` Realtime data. You can refer liveProvider's [Integrated Hooks][integrated-hooks] section for more information.

## Usage

```tsx
import { useSubscription } from "@refinedev/core";

useSubscription({
    channel: "channel-name",
    types: ["event-name", "another-event-name"]
    onLiveEvent: (event) => {},
    dataProviderName: "default",
});

```

### Properties

`useSubscription` will be passed to the [subscribe][live-provider-subscribe] method from the [liveProvider][live-provider] as a parameter. You can use the following properties of this method while subscribing to a channel.

### channel <PropTag required/>

Channel name to subscribe to.

### onLiveEvent <PropTag required/>

Callback that is run when new events from the subscription arrive.

### types

Type of events to subscribe. `"\*"` means all events. By default, it subscribes to all events.

### enabled

You can disable the subscription by setting this prop to `false` and vice versa. By default, it is enabled.

### params

You can pass any additional parameters to the [`liveProvider`][live-provider]'s [`subscribe`][live-provider-subscribe] method.

Hooks that use `useSubscription` internally send the query's parameters' (pagination, meta, sort, filters, etc.) information along with this prop.

> For more information on which hooks use `useSubscription` internally, refer to the [LiveProvider's "Integrated Hooks" section&#8594][integrated-hooks]

### dataProviderName

You can pass the name of the data provider to use for the subscription. By default, it uses the `"default"` data provider.

## API Reference

### Properties

<PropsTable module="@refinedev/core/useSubscription"  />

[live-provider]: /core/docs/realtime/live-provider
[live-provider-subscribe]: /core/docs/realtime/live-provider#subscribe
[integrated-hooks]: /core/docs/realtime/live-provider#integrated-hooks
