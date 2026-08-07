---
id: useModalForm
title: useModalForm
---

```tsx live shared
type ModalPropsType = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Modal: React.FC<ModalPropsType> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <>
      <div className="overlay" onClick={onClose}></div>
      <div className="modal">
        <div className="modal-title">
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-content">{children}</div>
      </div>
    </>
  );
};
```

```css live shared
html,
body {
  background: white;
}

* {
  box-sizing: border-box;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1000;
}

.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  z-index: 1000;
  width: 500px;
  overflow-y: auto;
}

.modal .modal-title {
  display: flex;
  justify-content: flex-end;
  padding: 4px;
}

.modal .modal-content {
  padding: 0px 16px 16px 16px;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form .form-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.form input,
select,
textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
```

`useModalForm` hook allows you to manage a form within a modal. It provides some useful methods to handle the form modal.

:::info
`useModalForm` hook is extended from [`useForm`][refine-react-hook-form-use-form] from the [`@pankod/refine-react-hook-form`][@pankod/refine-react-hook-form] package. This means that you can use all the features of [`useForm`][refine-react-hook-form-use-form] hook.
:::

## Basic Usage

We'll show three examples, `"create"`, `"edit"` and `"clone"`. Let's see how `useModalForm` is used in all.

<Tabs
defaultValue="create"
values={[
{label: 'create', value: 'create'},
{label: 'edit', value: 'edit'},
{label: 'clone', value: 'clone'},
]}>

<TabItem value="create">

```tsx live url=http://localhost:3000/posts
setInitialRoutes(["/posts"]);

// visible-block-start
import React from "react";
import { HttpError, useTable } from "@pankod/refine-core";
import { useModalForm } from "@pankod/refine-react-hook-form";

import { Modal, PostsTable } from "@components";

const PostList = () => {
  const { tableQueryResult } = useTable<IPost>({
    initialSorter: [
      {
        field: "id",
        order: "desc",
      },
    ],
  });

  // highlight-start
  const {
    formState: { errors },
    refineCore: { onFinish, formLoading },
    modal: { visible, close, show },
    register,
    handleSubmit,
    saveButtonProps,
  } = useModalForm<IPost, HttpError, IPost>({
    refineCoreProps: { action: "create" },
  });
  // highlight-end

  const loading = tableQueryResult?.isLoading;

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* highlight-start */}
      <Modal isOpen={visible} onClose={close}>
        <form className="form" onSubmit={handleSubmit(onFinish)}>
          <div className="form-group">
            <label>Title: </label>
            <input
              {...register("title", {
                required: "This field is required",
              })}
            />
            {errors.title && <span>{errors.title.message}</span>}
          </div>
          <div className="form-group">
            <label>Status: </label>
            <select {...register("status")}>
              <option value="published">published</option>
              <option value="draft">draft</option>
              <option value="rejected">rejected</option>
            </select>
          </div>
          <button type="submit" {...saveButtonProps}>
            {formLoading ? "Loading" : "Save"}
          </button>
        </form>
      </Modal>
      <button onClick={() => show()}>Create Post</button>
      {/* highlight-end */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {tableQueryResult.data?.data.map((post) => (
            <tr key={post.id}>
              <td>{post.id}</td>
              <td>{post.title}</td>
              <td>{post.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export interface IPost {
  id: number;
  title: string;
  status: "published" | "draft" | "rejected";
}
// visible-block-end

setRefineProps({
  resources: [
    {
      name: "posts",
      list: PostList,
    },
  ],
});

render(<RefineHeadlessDemo />);
```

</TabItem>

<TabItem value="edit">

```tsx live url=http://localhost:3000/posts
setInitialRoutes(["/posts"]);

// visible-block-start
import React from "react";
import { HttpError, useTable } from "@pankod/refine-core";
import { useModalForm } from "@pankod/refine-react-hook-form";

import { Modal, PostsTable } from "@components";

const PostList = () => {
  const { tableQueryResult } = useTable<IPost>({
    initialSorter: [
      {
        field: "id",
        order: "desc",
      },
    ],
  });

  // highlight-start
  const {
    formState: { errors },
    refineCore: { onFinish, formLoading },
    modal: { visible, close, show },
    register,
    handleSubmit,
    saveButtonProps,
  } = useModalForm<IPost, HttpError, IPost>({
    refineCoreProps: { action: "edit" },
  });
  // highlight-end

  const loading = tableQueryResult?.isLoading;

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* highlight-start */}
      <Modal isOpen={visible} onClose={close}>
        <form className="form" onSubmit={handleSubmit(onFinish)}>
          <div className="form-group">
            <label>Title: </label>
            <input
              {...register("title", {
                required: "This field is required",
              })}
            />
            {errors.title && <span>{errors.title.message}</span>}
          </div>
          <div className="form-group">
            <label>Status: </label>
            <select {...register("status")}>
              <option value="published">published</option>
              <option value="draft">draft</option>
              <option value="rejected">rejected</option>
            </select>
          </div>
          <button type="submit" {...saveButtonProps}>
            {formLoading ? "Loading" : "Save"}
          </button>
        </form>
      </Modal>
      {/* highlight-end */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tableQueryResult.data?.data.map((post) => (
            <tr key={post.id}>
              <td>{post.id}</td>
              <td>{post.title}</td>
              <td>{post.status}</td>
              <td>
                {/* highlight-start */}
                <button onClick={() => show(post.id)}>Edit</button>
                {/* highlight-end */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export interface IPost {
  id: number;
  title: string;
  status: "published" | "draft" | "rejected";
}
// visible-block-end

setRefineProps({
  resources: [
    {
      name: "posts",
      list: PostList,
    },
  ],
});

render(<RefineHeadlessDemo />);
```

:::caution
**refine** doesn't automatically add a `<EditButton/>` to the each record in `<PostList>` which opens edit form in `<Modal>` when clicked.

So, we have to put the `<EditButton/>` on our list. In that way, `<Edit>` form in `<Modal>` can fetch data by the record `id`.

```tsx
<td>
  {/* highlight-start */}
  <button onClick={() => show(post.id)}>Edit</button>
  {/* highlight-end */}
</td>
```

:::

:::caution
Don't forget to pass the record `"id"` to `show` to fetch the record data. This is necessary for both `"edit"` and `"clone"` forms.
:::

</TabItem>

<TabItem value="clone">

```tsx live url=http://localhost:3000/posts
setInitialRoutes(["/posts"]);

// visible-block-start
import React from "react";
import { HttpError, useTable } from "@pankod/refine-core";
import { useModalForm } from "@pankod/refine-react-hook-form";

import { Modal, PostsTable } from "@components";

const PostList = () => {
  const { tableQueryResult } = useTable<IPost>({
    initialSorter: [
      {
        field: "id",
        order: "desc",
      },
    ],
  });

  // highlight-start
  const {
    formState: { errors },
    refineCore: { onFinish, formLoading },
    modal: { visible, close, show },
    register,
    handleSubmit,
    saveButtonProps,
  } = useModalForm<IPost, HttpError, IPost>({
    refineCoreProps: { action: "clone" },
  });
  // highlight-end

  const loading = tableQueryResult?.isLoading;

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* highlight-start */}
      <Modal isOpen={visible} onClose={close}>
        <form className="form" onSubmit={handleSubmit(onFinish)}>
          <div className="form-group">
            <label>Title: </label>
            <input
              {...register("title", {
                required: "This field is required",
              })}
            />
            {errors.title && <span>{errors.title.message}</span>}
          </div>
          <div className="form-group">
            <label>Status: </label>
            <select {...register("status")}>
              <option value="published">published</option>
              <option value="draft">draft</option>
              <option value="rejected">rejected</option>
            </select>
          </div>
          <button type="submit" {...saveButtonProps}>
            {formLoading ? "Loading" : "Save"}
          </button>
        </form>
      </Modal>
      {/* highlight-end */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tableQueryResult.data?.data.map((post) => (
            <tr key={post.id}>
              <td>{post.id}</td>
              <td>{post.title}</td>
              <td>{post.status}</td>
              <td>
                {/* highlight-start */}
                <button onClick={() => show(post.id)}>Clone</button>
                {/* highlight-end */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export interface IPost {
  id: number;
  title: string;
  status: "published" | "draft" | "rejected";
}
// visible-block-end

setRefineProps({
  resources: [
    {
      name: "posts",
      list: PostList,
    },
  ],
});

render(<RefineHeadlessDemo />);
```

:::caution
**refine** doesn't automatically add a `<CloneButton/>` to the each record in `<PostList>` which opens edit form in `<Modal>` when clicked.

So, we have to put the `<CloneButton/>` on our list. In that way, `<Clone>` form in `<Modal>` can fetch data by the record `id`.

```tsx
<td>
  {/* highlight-start */}
  <button onClick={() => show(post.id)}>clone</button>
  {/* highlight-end */}
</td>
```

:::

:::caution
Don't forget to pass the record `"id"` to `show` to fetch the record data. This is necessary for both `"edit"` and `"clone"` forms.
:::

</TabItem>

</Tabs>

<details>
  <summary>See Modal component</summary>
  <div>

```tsx title="src/components/Modal/index.tsx"
type ModalPropsType = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Modal: React.FC<ModalPropsType> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <>
      <div className="overlay" onClick={onClose}></div>
      <div className="modal">
        <div className="modal-title">
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-content">{children}</div>
      </div>
    </>
  );
};
```

  </div>
</details>

<details>
  <summary>See styles</summary>
  <div>

```css title="src/styles.css"
* {
  box-sizing: border-box;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1000;
}

.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  z-index: 1000;
  width: 500px;
  overflow-y: auto;
}

.modal .modal-title {
  display: flex;
  justify-content: flex-end;
  padding: 4px;
}

.modal .modal-content {
  padding: 0px 16px 16px 16px;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form .form-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.form input,
select,
textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
```

  </div>
</details>

## Properties

:::tip
All [`useForm`][refine-react-hook-form-use-form] props also available in `useModalForm`. You can find descriptions on [`useForm`](/core/docs/3.xx.xx/packages/documentation/react-hook-form/useForm/#properties) docs.

All [`React Hook Form useForm`][react-hook-form-use-form] props also available in `useModalForm`. You can find descriptions on [`React Hook Form`][react-hook-form-use-form] docs.
:::

### `defaultValues`

> Only available in `"create"` form.

Default values for the form. Use this to pre-populate the form with data that needs to be displayed.

```tsx
const modalForm = useModalForm({
  defaultValues: {
    title: "Hello World",
  },
});
```

### `defaultVisible`

> Default: `false`

When `true`, modal will be visible by default.

```tsx
const modalForm = useModalForm({
  modalProps: {
    defaultVisible: true,
  },
});
```

### `autoSubmitClose`

> Default: `true`

When `true`, modal will be closed after successful submit.

```tsx
const modalForm = useModalForm({
  modalProps: {
    autoSubmitClose: false,
  },
});
```

### `autoResetForm`

> Default: `true`

When `true`, form will be reset after successful submit.

```tsx
const modalForm = useModalForm({
  modalProps: {
    autoResetForm: false,
  },
});
```

### `warnWhenUnsavedChanges`

> Default: `false`

When you have unsaved changes and try to leave the current page, refine shows a confirmation modal box. To activate this feature.

You can also set this value in [`<Refine>`](/core/docs/3.xx.xx/api-reference/core/components/refine-config/#warnwhenunsavedchanges) component.

```tsx
const modalForm = useModalForm({
  warnWhenUnsavedChanges: true,
});
```

## Return Values

:::tip
All [`useForm`][refine-react-hook-form-use-form] return values also available in `useModalForm`. You can find descriptions on [`useForm`](/core/docs/3.xx.xx/packages/documentation/react-hook-form/useForm/#return-values) docs.

All [`React Hook Form useForm`][react-hook-form-use-form] return values also available in `useModalForm`. You can find descriptions on [`useForm`](/core/docs/3.xx.xx/packages/documentation/react-hook-form/useForm/#return-values) docs.
:::

### `visible`

Current visibility state of the modal.

```tsx
const modalForm = useModalForm({
  defaultVisible: true,
});

console.log(modalForm.modal.visible); // true
```

### `title`

Title of the modal. Based on resource and action values

```tsx
const {
  modal: { title },
} = useModalForm({
  refineCoreProps: {
    resource: "posts",
    action: "create",
  },
});

console.log(title); // "Create Post"
```

### `close`

A function that can close the modal. It's useful when you want to close the modal manually.

```tsx
const {
  getInputProps,
  handleSubmit,
  register,
  modal,
  refineCore: { onFinish },
} = useModalForm();

return (
  <>
    <button onClick={show}>Show Modal</button>
    <Modal {...modal}>
      <form onSubmit={handleSubmit(onFinish)}>
        <div>
          <label>Title: </label>
          <input {...register("title")} />
        </div>
        <div>
          <button type="submit" onClick={modal.close}>
            Cancel
          </button>
          <button type="submit" onClick={modal.submit}>
            Save
          </button>
        </div>
      </form>
    </Modal>
  </>
);
```

### `submit`

A function that can submit the form. It's useful when you want to submit the form manually.

```tsx
const {
  getInputProps,
  handleSubmit,
  register,
  modal,
  refineCore: { onFinish },
} = useModalForm();

// ---

return (
  <>
    <button onClick={show}>Show Modal</button>
    <Modal {...modal}>
      <form onSubmit={handleSubmit(onFinish)}>
        <div>
          <label>Title: </label>
          <input {...register("title")} />
        </div>
        <div>
          <button type="submit" onClick={modal.submit}>
            Save
          </button>
        </div>
      </form>
    </Modal>
  </>
);
```

### `show`

A function that can show the modal.

```tsx
const {
  saveButtonProps,
  handleSubmit,
  register,
  modal,
  refineCore: { onFinish, formLoading },
} = useModalForm();

return (
  <>
    <button onClick={show}>Show Modal</button>
    <Modal {...modal}>
      <form onSubmit={handleSubmit(onFinish)}>
        <div>
          <label>Title: </label>
          <input {...register("title")} />
        </div>
        <div>
          <button type="submit" {...saveButtonProps}>
            Save
          </button>
        </div>
      </form>
    </Modal>
  </>
);
```

### `saveButtonProps`

It contains all the props needed by the "submit" button within the modal (disabled,loading etc.). You can manually pass these props to your custom button.

```tsx
const {
  saveButtonProps,
  handleSubmit,
  register,
  modal,
  refineCore: { onFinish, formLoading },
} = useModalForm();

return (
  <>
    <button onClick={show}>Show Modal</button>
    <Modal {...modal}>
      <form onSubmit={handleSubmit(onFinish)}>
        <div>
          <label>Title: </label>
          <input {...register("title")} />
        </div>
        <div>
          <button
            type="submit"
            disabled={saveButtonProps.disabled}
            onClick={(e) => {
              // -- your custom logic
              saveButtonProps.onClick(e);
            }}
          >
            Save
          </button>
        </div>
      </form>
    </Modal>
  </>
);
```

## API Reference

### Properties

<PropsTable module="@pankod/refine-react-hook-form/useModalForm" />

> `*`: These properties have default values in `RefineContext` and can also be set on the **<[Refine](/core/docs/3.xx.xx/api-reference/core/components/refine-config)>** component.

:::tip External Props
It also accepts all props of [useForm](https://react-hook-form.com/api/useform) hook available in the [React Hook Form](https://react-hook-form.com/).
:::

### Return values

| Property                      | Description                                                     | Type                                                                                       |
| ----------------------------- | --------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| modal                         | Relevant states and methods to control the modal                | [`ModalReturnValues`](#modalreturnvalues)                                                  |
| refineCore                    | The return values of the [`useForm`][use-form-core] in the core | [`UseFormReturnValues`](/core/docs/3.xx.xx/api-reference/core/hooks/useForm#return-values) |
| React Hook Form Return Values | See [React Hook Form][react-hook-form-use-form] documentation   |

<br />

> - #### ModalReturnValues
>
> | Property        | Description                                    | Type                                                                     |
> | --------------- | ---------------------------------------------- | ------------------------------------------------------------------------ |
> | visible         | State of modal visibility                      | `boolean`                                                                |
> | show            | Sets the visible state to true                 | `(id?: BaseKey) => void`                                                 |
> | close           | Sets the visible state to false                | `() => void`                                                             |
> | submit          | Submits the form                               | `(values: TVariables) => void`                                           |
> | title           | Modal title based on resource and action value | `string`                                                                 |
> | saveButtonProps | Props for a submit button                      | `{ disabled: boolean, onClick: (e: React.BaseSyntheticEvent) => void; }` |

## Example

<CodeSandboxExample path="form-react-hook-form-use-modal-form" />

[@pankod/refine-react-hook-form]: https://github.com/refinedev/refine/tree/v3/packages/react-hook-form
[refine-react-hook-form-use-form]: /core/docs/3.xx.xx/packages/documentation/react-hook-form/useForm
[react-hook-form-use-form]: https://react-hook-form.com/api/useform
[use-form-core]: /core/docs/3.xx.xx/api-reference/core/hooks/useForm
