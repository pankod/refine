---
id: usePublish
title: usePublish
source: packages/core/src/hooks/live/usePublish/index.ts
---

`usePublish` returns the [`publish`][live-provider-publish] method from [`liveProvider`][live-provider]. It is useful when you want to publish a custom event.

:::info-tip
**refine** use this hook internally in mutation hooks to `publish` events after successful mutation. You can refer liveProvider's [Publish Events from Hooks](/core/docs/3.xx.xx/api-reference/core/providers/live-provider/#publish-events-from-hooks) section for more information.
:::

## Usage

```tsx
import { usePublish } from "@pankod/refine-core";

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
This method is used to publish an event on the client side. Beware that publishing events on the client side is not recommended and the best practice is to publish events from the server side. You can refer [Publish Events from API](/core/docs/3.xx.xx/api-reference/core/providers/live-provider/#publish-events-from-api) to see which events must be published from the server.

:::

## Publish Properties

Will be passed to the [publish][live-provider-publish] method from the [liveProvider][live-provider] as a parameter. You can use these properties from the [`liveProvider`][live-provider]'s [`publish`][live-provider-publish] method and use them to publish an event.

> Refer to [LiveEvent][live-event] interface for type of properties.

### channel <PropTag required/>

The channel name to publish the event.

### type <PropTag required/>

The event name to publish.

### payload <PropTag required/>

The payload to publish.

### date <PropTag required/>

The date of the event.

[live-provider]: /core/docs/3.xx.xx/api-reference/core/providers/live-provider
[live-provider-publish]: /core/docs/3.xx.xx/api-reference/core/providers/live-provider/#publish
[live-event]: /core/docs/3.xx.xx/api-reference/core/interfaceReferences/#liveevent
