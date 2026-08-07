---
title: "useModal Hook | Managing Dialog States in Refine v4"
display_title: "useModal"
sidebar_label: "useModal"
description: "Simplify modal management. Use the useModal hook to handle show/hide states and data fetching for popups in your Refine v4 project."
source: packages/core/src/hooks/modal/useModal/index.tsx
---

`useModal` hook allows you to manage a modal. Since it is designed as headless, it returns the `show` and `close` functions and the `visible` state. It expects you to handle the UI.

```ts
const { show, close, visible } = useModal();
```

You can use the `visible` state to show or hide the modal. The `show` and `close` functions' only use is changing the `visible` state. You can use this hook anywhere.

## Usage

Let's see an example:

```tsx title="src/pages/posts/list.tsx"
import {
  // highlight-next-line
  useModal,
} from "@refinedev/core";

export const PostList: React.FC = () => {
  // highlight-next-line
  const { visible, show, close } = useModal();

  return (
    <>
      // highlight-start
      <button onClick={show}>Show Modal</button>
      {visible && (
        <YourModalComponent>
          <p>Dummy Modal Content</p>
          <button onClick={close}>Close Modal</button>
        </YourModalComponent>
      )}
      // highlight-end
    </>
  );
};
```

Here, we show a button somewhere on the page and use `show` on its `onClick` callback to trigger the opening of the `<YourModalComponent>`. When the user clicks on the button, the `<YourModalComponent>` appears.

To demonstrate the `close` function, we created a `<button>` that uses it in its `onClick` property to close `<YourModalComponent>`

## Properties

### defaultVisible

`defaultVisible` is a boolean value that determines whether the modal is visible by default. By default, it is `false`.

```tsx
useModal({
  defaultVisible: true,
});
```

## Return Values

### visible

Visible state of the modal.

### show

A function that can change the `visible` state to `true`.

### close

A function that can change the `visible` state to `false`.

## API Reference

### Properties

<PropsTable module="@refinedev/core/useModal"  />

### Return Value

| Key     | Description                               | Type         |
| ------- | ----------------------------------------- | ------------ |
| visible | Returns the `visible` state of the modal. | `boolean`    |
| show    | A function that can open the modal.       | `() => void` |
| close   | A function that can close the modal.      | `() => void` |

## Example

<CodeSandboxExample path="core-use-modal" />

[modal]: https://ant.design/components/modal/#API
