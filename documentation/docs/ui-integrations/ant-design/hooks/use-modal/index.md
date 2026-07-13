---
title: "useModal Hook | Usage & Patterns in Refine v5"
display_title: "useModal"
sidebar_label: "useModal"
description: "Implement Use Modal in Refine v5. Learn the key steps. Learn integrate enterprise UI, components for polished admin UIs. Hands-on examples included."
---

The `useModal` hook helps you manage the [Ant Design Modal](https://ant.design/components/modal) component.

```ts
const { show, close, modalProps } = useModal();
```

You can use the `show` and `close` props to control the `modal` visibility. You have to descturt `modalProps` to the `<Modal/>` component.

## Usage

Let's see an example:

```tsx title="src/pages/posts/list.tsx"
// highlight-start
import { useModal } from "@refinedev/antd";
import { Modal, Button } from "antd";
// highlight-end

export const PostList: React.FC = () => {
  // highlight-next-line
  const { show, modalProps } = useModal();

  return (
    <>
      // highlight-start
      <Button onClick={show}>Show Modal</Button>
      <Modal {...modalProps}>
        <p>Modal Content</p>
      </Modal>
      // highlight-end
    </>
  );
};
```

<br />

Here, we show a button somewhere on the page and use `show` on it's `onClick` callback to trigger opening of the `<Modal>`. When the user clicks on the button, the `<Modal>` appears.

## API Reference

### Properties

<PropsTable module="@refinedev/antd/useModal"  />

### Return Value

| Key        | Description                                 | Type         |
| ---------- | ------------------------------------------- | ------------ |
| show       | Returns the visibility state of the Modal   | `() => void` |
| close      | A function that can open the modal          | `() => void` |
| modalProps | Specify a function that can close the modal | `() => void` |
