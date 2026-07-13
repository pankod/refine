---
title: "useModalForm Hook | Options, Patterns & Edge Cases | Refine v5"
display_title: "useModalForm"
sidebar_label: "useModalForm"
description: "Build Use Modal Form in Refine v5. Learn the key steps. Learn best practices for values for real-world React admin panels. See practical code samples."
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

`useModalForm` hook is extended from [`useForm`][refine-react-hook-form-use-form] from the [`@refinedev/react-hook-form`][@refinedev/react-hook-form] package. This means that you can use all the features of [`useForm`][refine-react-hook-form-use-form] hook.

## Usage

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
import { HttpError, useTable } from "@refinedev/core";
import { useModalForm } from "@refinedev/react-hook-form";

import { Modal } from "@components";

const PostList = () => {
  const { result, tableQuery } = useTable<IPost>({
    sorters: {
      initial: [
        {
          field: "id",
          order: "desc",
        },
      ],
    },
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

  const loading = tableQuery?.isLoading;

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
          {result?.data?.map((post) => (
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

render(
  <ReactRouter.BrowserRouter>
    <RefineHeadlessDemo
      resources={[
        {
          name: "posts",
          list: "/posts",
        },
      ]}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route path="/posts" element={<PostList />} />
      </ReactRouter.Routes>
    </RefineHeadlessDemo>
  </ReactRouter.BrowserRouter>,
);
```

</TabItem>

<TabItem value="edit">

```tsx live url=http://localhost:3000/posts
setInitialRoutes(["/posts"]);

// visible-block-start
import { HttpError, useTable } from "@refinedev/core";
import { useModalForm } from "@refinedev/react-hook-form";

import { Modal } from "@components";

const PostList = () => {
  const { result, tableQuery } = useTable<IPost>({
    sorters: {
      initial: [
        {
          field: "id",
          order: "desc",
        },
      ],
    },
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

  const loading = tableQuery?.isLoading;

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
          {result?.data.map((post) => (
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

render(
  <ReactRouter.BrowserRouter>
    <RefineHeadlessDemo
      resources={[
        {
          name: "posts",
          list: "/posts",
        },
      ]}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route path="/posts" element={<PostList />} />
      </ReactRouter.Routes>
    </RefineHeadlessDemo>
  </ReactRouter.BrowserRouter>,
);
```

:::simple Implementation Tips

Refine doesn't automatically add a `<EditButton/>` to the each record in `<PostList>` which opens edit form in `<Modal>` when clicked.

So, we have to put the `<EditButton/>` on our list. In that way, `<Edit>` form in `<Modal>` can fetch data by the record `id`.

```tsx
<td>
  {/* highlight-start */}
  <button onClick={() => show(post.id)}>Edit</button>
  {/* highlight-end */}
</td>
```

Don't forget to pass the record `"id"` to `show` to fetch the record data. This is necessary for both `"edit"` and `"clone"` forms.

:::

</TabItem>

<TabItem value="clone">

```tsx live url=http://localhost:3000/posts
setInitialRoutes(["/posts"]);

// visible-block-start
import { HttpError, useTable } from "@refinedev/core";
import { useModalForm } from "@refinedev/react-hook-form";

import { Modal } from "@components";

const PostList = () => {
  const { result, tableQuery } = useTable<IPost>({
    sorters: {
      initial: [
        {
          field: "id",
          order: "desc",
        },
      ],
    },
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

  const loading = tableQuery?.isLoading;

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
          {result?.data.map((post) => (
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

render(
  <ReactRouter.BrowserRouter>
    <RefineHeadlessDemo
      resources={[
        {
          name: "posts",
          list: "/posts",
        },
      ]}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route path="/posts" element={<PostList />} />
      </ReactRouter.Routes>
    </RefineHeadlessDemo>
  </ReactRouter.BrowserRouter>,
);
```

:::simple Implementation Tips

Refine doesn't automatically add a `<CloneButton/>` to the each record in `<PostList>` which opens edit form in `<Modal>` when clicked.

So, we have to put the `<CloneButton/>` on our list. In that way, `<Clone>` form in `<Modal>` can fetch data by the record `id`.

```tsx
<td>
  {/* highlight-start */}
  <button onClick={() => show(post.id)}>clone</button>
  {/* highlight-end */}
</td>
```

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

All [`useForm`][refine-react-hook-form-use-form] props also available in `useModalForm`. You can find descriptions on [`useForm`](/core/docs/packages/list-of-packages#properties) docs.

All [`React Hook Form useForm`][react-hook-form-use-form] props also available in `useModalForm`. You can find descriptions on [`React Hook Form`][react-hook-form-use-form] docs.

### defaultValues

Default values for the form. Use this to pre-populate the form with data that needs to be displayed. This property is only available with `"create"` action.

```tsx
const modalForm = useModalForm({
  defaultValues: {
    title: "Hello World",
  },
});
```

### defaultVisible

When `true`, modal will be visible by default. Defaults to `false`.

```tsx
const modalForm = useModalForm({
  modalProps: {
    defaultVisible: true,
  },
});
```

### autoSubmitClose

When `true`, modal will be closed after successful submit. Defaults to `true`.

```tsx
const modalForm = useModalForm({
  modalProps: {
    autoSubmitClose: false,
  },
});
```

### autoResetForm

When `true`, form will be reset after successful submit. Defaults to `true`.

```tsx
const modalForm = useModalForm({
  modalProps: {
    autoResetForm: false,
  },
});
```

### autoResetFormWhenClose

When `true`, form will be reset when modal closes. Defaults to `true`.

```tsx
const modalForm = useModalForm({
  modalProps: {
    autoResetFormWhenClose: false,
  },
});
```

### warnWhenUnsavedChanges

When you have unsaved changes and try to leave the current page, Refine shows a confirmation modal box. To activate this feature. By default, this feature is disabled.

You can also set this value in [`<Refine>`](/core/docs/core/refine-component#warnwhenunsavedchanges) component.

```tsx
const modalForm = useModalForm({
  warnWhenUnsavedChanges: true,
});
```

### syncWithLocation

When `true`, the modals visibility state and the `id` of the record will be synced with the URL. By default, this feature is disabled.

This property can also be set as an object `{ key: string; syncId?: boolean }` to customize the key of the URL query parameter. `id` will be synced with the URL only if `syncId` is `true`.

```tsx
const modalForm = useModalForm({
  syncWithLocation: { key: "my-modal", syncId: true },
});
```

### autoSave

If you want to save the form automatically after some delay when user edits the form, you can pass true to `autoSave.enabled` prop.

By default the `autoSave` feature does not invalidate queries. However, you can use the `invalidateOnUnmount` and `invalidateOnClose` props to invalidate queries upon unmount or close.

It also supports `onMutationSuccess` and `onMutationError` callback functions. You can use `isAutoSave` parameter to determine whether the mutation is triggered by `autoSave` or not.

`autoSave` feature operates exclusively in `edit` mode. Users can take advantage of this feature while editing data, as changes are automatically saved in editing mode. However, when creating new data, manual saving is still required.

`onMutationSuccess` and `onMutationError` callbacks will be called after the mutation is successful or failed.

#### enabled

To enable the `autoSave` feature, set the `enabled` parameter to `true`. By default, it is set to `false`.

```tsx
useModalForm({
  refineCoreProps: {
    autoSave: {
      enabled: true,
    },
  },
});
```

#### debounce

Set the debounce time for the `autoSave` prop. Default value is `1000` milliseconds.

```tsx
useModalForm({
  refineCoreProps: {
    autoSave: {
      enabled: true,
      // highlight-next-line
      debounce: 2000,
    },
  },
});
```

#### onFinish

If you want to modify the data before sending it to the server, you can use `onFinish` callback function.

```tsx
useModalForm({
  refineCoreProps: {
    autoSave: {
      enabled: true,
      // highlight-start
      onFinish: (values) => {
        return {
          foo: "bar",
          ...values,
        };
      },
      // highlight-end
    },
  },
});
```

#### invalidateOnUnmount

This prop is useful when you want to invalidate the `list`, `many` and `detail` queries from the current resource when the hook is unmounted. By default, it invalidates the `list`, `many` and `detail` queries associated with the current resource. Also, You can use the `invalidates` prop to select which queries to invalidate. By default it is set to `false`.

```tsx
useDrawerForm({
  refineCoreProps: {
    autoSave: {
      enabled: true,
      // highlight-next-line
      invalidateOnUnmount: true,
    },
  },
});
```

#### invalidateOnClose

This prop is useful when you want to invalidate the `list`, `many` and `detail` queries from the current resource when the modal is closed. By default, it invalidates the `list`, `many` and `detail` queries associated with the current resource. Also, You can use the `invalidates` prop to select which queries to invalidate. By default it is set to `false`.

```tsx
useDrawerForm({
  refineCoreProps: {
    autoSave: {
      enabled: true,
      // highlight-next-line
      invalidateOnClose: true,
    },
  },
});
```

## Return Values

All [`useForm`][refine-react-hook-form-use-form] return values also available in `useModalForm`. You can find descriptions on [`useForm`](/core/docs/packages/list-of-packages#return-values) docs.

All [`React Hook Form useForm`][react-hook-form-use-form] return values also available in `useModalForm`. You can find descriptions on [`useForm`](/core/docs/packages/list-of-packages#return-values) docs.

### visible

Current visibility state of the modal.

```tsx
const modalForm = useModalForm({
  defaultVisible: true,
});

console.log(modalForm.modal.visible); // true
```

### title

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

### close

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

### submit

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

### show

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

### saveButtonProps

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

<PropsTable module="@refinedev/react-hook-form/useModalForm" />

:::simple External Props

It also accepts all props of [useForm](https://react-hook-form.com/api/useform) hook available in the [React Hook Form](https://react-hook-form.com/).

:::

### Type Parameters

| Property       | Description                                                                                                                                                         | Type                       | Default                    |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- | -------------------------- |
| TQueryFnData   | Result data returned by the query function. Extends [`BaseRecord`][baserecord]                                                                                      | [`BaseRecord`][baserecord] | [`BaseRecord`][baserecord] |
| TError         | Custom error object that extends [`HttpError`][httperror]                                                                                                           | [`HttpError`][httperror]   | [`HttpError`][httperror]   |
| TVariables     | Field Values for mutation function                                                                                                                                  | `{}`                       | `{}`                       |
| TContext       | Second generic type of the `useForm` of the React Hook Form.                                                                                                        | `{}`                       | `{}`                       |
| TData          | Result data returned by the `select` function. Extends [`BaseRecord`][baserecord]. If not specified, the value of `TQueryFnData` will be used as the default value. | [`BaseRecord`][baserecord] | `TQueryFnData`             |
| TResponse      | Result data returned by the mutation function. Extends [`BaseRecord`][baserecord]. If not specified, the value of `TData` will be used as the default value.        | [`BaseRecord`][baserecord] | `TData`                    |
| TResponseError | Custom error object that extends [`HttpError`][httperror]. If not specified, the value of `TError` will be used as the default value.                               | [`HttpError`][httperror]   | `TError`                   |

### Return values

| Property                      | Description                                                     | Type                                                                   |
| ----------------------------- | --------------------------------------------------------------- | ---------------------------------------------------------------------- |
| modal                         | Relevant states and methods to control the modal                | [`ModalReturnValues`](#modalreturnvalues)                              |
| refineCore                    | The return values of the [`useForm`][use-form-core] in the core | [`UseFormReturnValues`](/core/docs/data/hooks/use-form/#return-values) |
| React Hook Form Return Values | See [React Hook Form][react-hook-form-use-form] documentation   |

#### ModalReturnValues

| Property        | Description                                    | Type                                                                     |
| --------------- | ---------------------------------------------- | ------------------------------------------------------------------------ |
| visible         | State of modal visibility                      | `boolean`                                                                |
| show            | Sets the visible state to true                 | `(id?: BaseKey) => void`                                                 |
| close           | Sets the visible state to false                | `() => void`                                                             |
| submit          | Submits the form                               | `(values: TVariables) => void`                                           |
| title           | Modal title based on resource and action value | `string`                                                                 |
| saveButtonProps | Props for a submit button                      | `{ disabled: boolean, onClick: (e: React.BaseSyntheticEvent) => void; }` |

## Example

<CodeSandboxExample path="form-react-hook-form-use-modal-form" />

[@refinedev/react-hook-form]: https://github.com/refinedev/refine/tree/main/packages/react-hook-form
[refine-react-hook-form-use-form]: /core/docs/packages/list-of-packages
[react-hook-form-use-form]: https://react-hook-form.com/api/useform
[use-form-core]: /core/docs/data/hooks/use-form/
[baserecord]: /core/docs/core/interface-references#baserecord
[httperror]: /core/docs/core/interface-references#httperror
