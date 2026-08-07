---
id: mutation-mode
title: Mutation Mode
---

## Overview

Mutation mode determines which mode the mutation runs with. Mutations can run under three different modes: `pessimistic`, `optimistic` and `undoable`.
Each mode corresponds to a different type of user experience.

## Modes

We'll show usages of modes with editing a record examples.

### `pessimistic`

The mutation runs immediately. Redirection and UI updates are executed after the mutation returns successfuly.

<br />

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/guides-and-concepts/mutation-mode/pessimistic.gif" alt="pessimistic mode" />

<br />

> When the user clicks on save button, request to the API happens directly and after successful response, list page updates with newly edited record.

<br />

### `optimistic`

The mutation is applied locally, redirection and UI updates are executed immediately as if the mutation is succesful. If mutation returns with error, UI updates to show data prior to the mutation.

<br />

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/guides-and-concepts/mutation-mode/optimistic.gif" alt="optimistic mode" />

<br />

> When the user clicks on save button, request to the API happens directly and list page updates with edited data immediately without waiting API response.

<br />

### `undoable`

The mutation is applied locally, redirection and UI updates are executed immediately as if the mutation is succesful. Waits for a customizable amount of timeout period before mutation is applied. During the timeout, mutation can be cancelled from the notification with an undo button and UI will revert back accordingly.

<br />

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/guides-and-concepts/mutation-mode/undoable.gif" alt="undoable mode" />

<br />

> When the user clicks on save button, request isn't sent to API immediately however list page updates with edited data. It waits for a period of time while the user can cancel the mutation. If the mutation is cancelled, locally applied edit is undone.

## Usage

Mutation mode can be set application-wide in [`<Refine>`](/core/docs/3.xx.xx/api-reference/core/components/refine-config#mutationmode) component.

```tsx title="App.tsx"
<Refine
    ...
    options={{ mutationMode: "optimistic" }}
/>
```

> Its default value is `pessimistic`.

<br />

It can also be set in supported [data hooks](/core/docs/3.xx.xx/api-reference/core/hooks/data/useUpdate/) and [form hooks](/core/docs/3.xx.xx/api-reference/core/hooks/useForm#properties) for fine-grained configuration.

```tsx
import { useUpdate } from "@pankod/refine-core";

const { mutate } = useUpdate();

mutate({
  resource: "categories",
  id: "2",
  values: { title: "New Category Title" },
  // highlight-next-line
  mutationMode: "optimistic",
});
```

> Mutation mode passed to `<Refine>` will be overriden by the mutation mode passed to data or form hooks and components.

### Supported data hooks

- [`useUpdate` &#8594](/core/docs/3.xx.xx/api-reference/core/hooks/data/useUpdate/)
- [`useUpdateMany` &#8594](/core/docs/3.xx.xx/api-reference/core/hooks/data/useUpdateMany/)
- [`useDelete` &#8594](/core/docs/3.xx.xx/api-reference/core/hooks/data/useDelete/)
- [`useDeleteMany` &#8594](/core/docs/3.xx.xx/api-reference/core/hooks/data/useDeleteMany/)

<br />

## Example

<CodeSandboxExample path="mutation-mode" />
