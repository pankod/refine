---
id: useModal
title: useModal
---

The `useModal` hook helps you manage the [Ant Desing Modal](https://ant.design/components/modal) component.

```ts
const { show, close, modalProps } = useModal();
```

You can use the `show` and `close` props to control the `modal` visibility. You have to descturt `modalProps` to the `<Modal/>` component.

## Usage

Let's see an example:

```tsx title="src/pages/posts/list.tsx"
import {
    // highlight-start
    useModal,
    Modal,
    Button
} from "@pankod/refine-antd";

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

Here, we show a button somewhere on the page and use `show` on it's onClick callback to trigger opening of the `<Modal>`. When the user clicks on the button, the `<Modal>` appears.

## API Reference

### Properties

<PropsTable module="@pankod/refine-antd/useModal"  />

### Return Value

| Key        | Description                                 | Type         |
| ---------- | ------------------------------------------- | ------------ |
| show       | Returns the visibility state of the Modal   | `() => void` |
| close      | A function that can open the modal          | `() => void` |
| modalProps | Specify a function that can close the modal | `() => void` |


[modal]: https://ant.design/components/modal/#API
