---
title: "useDrawer Hook | Usage & Patterns in Refine v5"
display_title: "useDrawer"
sidebar_label: "useDrawer"
description: "Explore how to use the useDrawer hook in Refine v5. Learn integrate Ant Design for polished admin UIs. Explore with code snippets."
---

The `useDrawer` hook helps you manage the [Ant Design Drawer](https://ant.design/components/drawer) component.

```ts
const { show, close, drawerProps } = useDrawer();
```

You can use the `show` and `close` props to control the `drawer` visibility. You have to descturt `drawerProps` to the `<Drawer/>` component.

## Usage

Let's see an example:

```tsx title="src/pages/posts/list.tsx"
// highlight-start
import { useDrawer } from "@refinedev/antd";
import { Drawer, Button } from "antd";
// highlight-end

export const PostList: React.FC = () => {
  // highlight-next-line
  const { show, drawerProps } = useDrawer();

  return (
    <>
      // highlight-start
      <Button onClick={show}>Show Drawer</Button>
      <Drawer {...drawerProps}>
        <p>Drawer Content</p>
      </Drawer>
      // highlight-end
    </>
  );
};
```

<br />

Here, we show a button somewhere on the page and use `show` on it's `onClick` callback to trigger opening of the `<Drawer>`. When the user clicks on the button, the `<Drawer>` appears.

## API Reference

### Properties

<PropsTable module="@refinedev/antd/useDrawer"  />

### Return Value

| Key         | Description                                  | Type         |
| ----------- | -------------------------------------------- | ------------ |
| show        | Returns the visibility state of the Drawer   | `() => void` |
| close       | A function that can open the drawer          | `() => void` |
| drawerProps | Specify a function that can close the drawer | `() => void` |
