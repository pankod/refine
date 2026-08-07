---
title: "usePublish Hook | Options, Patterns & Edge Cases in Refine v5"
display_title: "usePublish"
sidebar_label: "usePublish"
description: "Implement Use Publish in Refine v5. Learn the key steps. Explore best practices for events and event for real-world React admin panels."
source: packages/core/src/hooks/live/usePublish/index.ts
---

`usePublish` returns the [`publish`][live-provider-publish] method from [`liveProvider`][live-provider]. It is useful when you want to publish a custom event.

Refine uses this hook internally in mutation hooks to `publish` events after successful mutations. You can refer to the `liveProvider`'s [Publish Events from Hooks](/core/docs/realtime/live-provider#publish-events-from-hooks) section for more information.

## Usage

```tsx
import { usePublish } from "@refinedev/core";

const publish = usePublish();

publish({
  channel: "custom-channel-name",
  type: "custom-event-name",
  payload: {
    ids: [1, 2, 3],
    "custom-property": "custom-property-value",
  },
  date: new Date(),
});
```

:::caution

This method is used to publish an event on the client side. Beware that publishing events on the client side is not recommended and the best practice is to publish events from the server side. You can refer [Publish Events from API](/core/docs/realtime/live-provider#publish-events-from-api) to see which events should be published from the server.

:::

## Publish Properties

`usePublish` will be passed to the [publish][live-provider-publish] method from the [liveProvider][live-provider] as a parameter. Following properties of this method can be used when publishing an event.

> For more information, refer to the [LiveEvent interface&#8594][live-event]

### channel <PropTag required/>

The channel name to publish the event.

### type <PropTag required/>

The event name to publish.

### payload <PropTag required/>

The payload to publish.

### date <PropTag required/>

The date of the event.

[live-provider]: /core/docs/realtime/live-provider
[live-provider-publish]: /core/docs/realtime/live-provider#publish
[live-event]: /core/docs/core/interface-references#liveevent
