---
title: "useDrawerForm Hook | Mantine & Refine v4 Forms"
display_title: "useDrawerForm"
sidebar_label: "useDrawerForm"
description: "Documentation for building side-drawer forms in Mantine. Learn how to manage create and edit states using the useDrawerForm hook."
---

The [`useModalForm`][use-modal-form-refine-mantine] hook allows you to manage a form within a `<Modal>` as well as a `<Drawer>`. It provides some useful methods to handle the form `<Modal>` or form `<Drawer>`.

We will use [`useModalForm`][use-modal-form-refine-mantine] hook as a `useDrawerForm` to manage a form within a `<Drawer>`.

The `useDrawerForm` hook is extended from the [`useForm`][use-form-refine-mantine] hook from the [`@refinedev/mantine`](https://github.com/refinedev/refine/tree/main/packages/mantine) package. This means that you can use all the features of [`useForm`][use-form-refine-mantine] hook.

## Usage

We will show two examples, one for creating and one for editing a post. Let's see how `useDrawerForm` is used in both.

<Tabs
defaultValue="create"
values={[
{label: 'create', value: 'create'},
{label: 'edit', value: 'edit'},
]}>

<TabItem value="create">

In this example, we will show you how to `"create"` a record with `useDrawerForm`:

```tsx live url=http://localhost:3000/posts
setInitialRoutes(["/posts"]);

// visible-block-start
import {
  Box,
  Drawer,
  Group,
  Pagination,
  ScrollArea,
  Select,
  Table,
  TextInput,
} from "@mantine/core";
import {
  List,
  SaveButton,
  // highlight-next-line
  useModalForm as useDrawerForm,
} from "@refinedev/mantine";
import { useTable } from "@refinedev/react-table";
import { ColumnDef, flexRender } from "@tanstack/react-table";
import React from "react";

const PostList: React.FC = () => {
  // highlight-start
  const {
    getInputProps,
    saveButtonProps,
    modal: { show, close, title, visible },
  } = useDrawerForm({
    refineCoreProps: { action: "create" },
    initialValues: {
      title: "",
      status: "",
      content: "",
    },
    validate: {
      title: (value) => (value.length < 2 ? "Too short title" : null),
      status: (value) => (value.length <= 0 ? "Status is required" : null),
    },
  });
  // highlight-end

  const columns = React.useMemo<ColumnDef<IPost>[]>(
    () => [
      {
        id: "id",
        header: "ID",
        accessorKey: "id",
      },
      {
        id: "title",
        header: "Title",
        accessorKey: "title",
        meta: {
          filterOperator: "contains",
        },
      },
      {
        id: "status",
        header: "Status",
        accessorKey: "status",
        meta: {
          filterElement: function render(props: FilterElementProps) {
            return (
              <Select
                defaultValue="published"
                data={[
                  { label: "Published", value: "published" },
                  { label: "Draft", value: "draft" },
                  { label: "Rejected", value: "rejected" },
                ]}
                {...props}
              />
            );
          },
          filterOperator: "eq",
        },
      },
    ],
    [],
  );

  const {
    getHeaderGroups,
    getRowModel,
    setOptions,
    refineCore: {
      setCurrent,
      pageCount,
      current,
      tableQuery: { data: tableData },
    },
  } = useTable({
    columns,
  });

  return (
    <>
      {/* highlight-start */}
      <Drawer
        opened={visible}
        onClose={close}
        title={title}
        padding="xl"
        size="xl"
        position="right"
      >
        <TextInput
          mt={8}
          label="Title"
          placeholder="Title"
          {...getInputProps("title")}
        />
        <Select
          mt={8}
          label="Status"
          placeholder="Pick one"
          data={[
            { label: "Published", value: "published" },
            { label: "Draft", value: "draft" },
            { label: "Rejected", value: "rejected" },
          ]}
          {...getInputProps("status")}
        />
        <Box mt={8} sx={{ display: "flex", justifyContent: "flex-end" }}>
          <SaveButton {...saveButtonProps} />
        </Box>
      </Drawer>
      {/* highlight-end */}
      <ScrollArea>
        {/* highlight-next-line */}
        <List createButtonProps={{ onClick: () => show() }}>
          <Table highlightOnHover>
            <thead>
              {getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <th key={header.id}>
                        {!header.isPlaceholder && (
                          <Group spacing="xs" noWrap>
                            <Box>
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext(),
                              )}
                            </Box>
                          </Group>
                        )}
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>
            <tbody>
              {getRowModel().rows.map((row) => {
                return (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <td key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <br />
          <Pagination
            position="right"
            total={pageCount}
            page={current}
            onChange={setCurrent}
          />
        </List>
      </ScrollArea>
    </>
  );
};

interface IPost {
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

render(<RefineMantineDemo />);
```

</TabItem>

<TabItem value="edit">

In this example, we will show you how to `"edit"` a record with `useDrawerForm`:

```tsx live url=http://localhost:3000/posts
setInitialRoutes(["/posts"]);

// visible-block-start
import {
  Box,
  Drawer,
  Group,
  Pagination,
  ScrollArea,
  Select,
  Table,
  TextInput,
} from "@mantine/core";
import {
  EditButton,
  List,
  SaveButton,
  // highlight-next-line
  useModalForm as useDrawerForm,
} from "@refinedev/mantine";
import { useTable } from "@refinedev/react-table";
import { ColumnDef, flexRender } from "@tanstack/react-table";
import React from "react";

const PostList: React.FC = () => {
  // highlight-start
  const {
    getInputProps,
    saveButtonProps,
    modal: { show, close, title, visible },
  } = useDrawerForm({
    refineCoreProps: { action: "edit" },
    initialValues: {
      title: "",
      status: "",
      content: "",
    },
    validate: {
      title: (value) => (value.length < 2 ? "Too short title" : null),
      status: (value) => (value.length <= 0 ? "Status is required" : null),
    },
  });
  // highlight-end

  const columns = React.useMemo<ColumnDef<IPost>[]>(
    () => [
      {
        id: "id",
        header: "ID",
        accessorKey: "id",
      },
      {
        id: "title",
        header: "Title",
        accessorKey: "title",
        meta: {
          filterOperator: "contains",
        },
      },
      {
        id: "status",
        header: "Status",
        accessorKey: "status",
        meta: {
          filterElement: function render(props: FilterElementProps) {
            return (
              <Select
                defaultValue="published"
                data={[
                  { label: "Published", value: "published" },
                  { label: "Draft", value: "draft" },
                  { label: "Rejected", value: "rejected" },
                ]}
                {...props}
              />
            );
          },
          filterOperator: "eq",
        },
      },
      {
        id: "actions",
        header: "Actions",
        accessorKey: "id",
        enableColumnFilter: false,
        enableSorting: false,
        cell: function render({ getValue }) {
          return (
            <Group spacing="xs" noWrap>
              {/* highlight-start */}
              <EditButton hideText onClick={() => show(getValue() as number)} />
              {/* highlight-end */}
            </Group>
          );
        },
      },
    ],
    [],
  );

  const {
    getHeaderGroups,
    getRowModel,
    setOptions,
    refineCore: {
      setCurrent,
      pageCount,
      current,
      tableQuery: { data: tableData },
    },
  } = useTable({
    columns,
  });

  return (
    <>
      {/* highlight-start */}
      <Drawer
        opened={visible}
        onClose={close}
        title={title}
        padding="xl"
        size="xl"
        position="right"
      >
        <TextInput
          mt={8}
          label="Title"
          placeholder="Title"
          {...getInputProps("title")}
        />
        <Select
          mt={8}
          label="Status"
          placeholder="Pick one"
          data={[
            { label: "Published", value: "published" },
            { label: "Draft", value: "draft" },
            { label: "Rejected", value: "rejected" },
          ]}
          {...getInputProps("status")}
        />
        <Box mt={8} sx={{ display: "flex", justifyContent: "flex-end" }}>
          <SaveButton {...saveButtonProps} />
        </Box>
      </Drawer>
      {/* highlight-end */}
      <ScrollArea>
        <List>
          <Table highlightOnHover>
            <thead>
              {getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <th key={header.id}>
                        {!header.isPlaceholder && (
                          <Group spacing="xs" noWrap>
                            <Box>
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext(),
                              )}
                            </Box>
                          </Group>
                        )}
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>
            <tbody>
              {getRowModel().rows.map((row) => {
                return (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <td key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <br />
          <Pagination
            position="right"
            total={pageCount}
            page={current}
            onChange={setCurrent}
          />
        </List>
      </ScrollArea>
    </>
  );
};

interface IPost {
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

render(<RefineMantineDemo />);
```

Refine doesn't automatically add a `<EditButton/>` to the each record in `<PostList>` which opens `"edit"` form in `<Drawer>` when clicked.

So, we have to put the `<EditButton/>` on our list. In that way, `"edit"` form in `<Drawer>` can fetch data by the record `id`.

```tsx
const columns = React.useMemo<ColumnDef<IPost>[]>(
  () => [
    // --
    {
      id: "actions",
      header: "Actions",
      accessorKey: "id",
      enableColumnFilter: false,
      enableSorting: false,
      cell: function render({ getValue }) {
        return (
          <Group spacing="xs" noWrap>
            <EditButton hideText onClick={() => show(getValue() as number)} />
          </Group>
        );
      },
    },
  ],
  [],
);

const table = useTable({
  columns,
});
```

Don't forget to pass the record `"id"` to `show` to fetch the record data. This is necessary for both `"edit"` and `"clone"` forms.

</TabItem>

</Tabs>

## Properties

### refineCoreProps

All [`useForm`](/core/docs/ui-integrations/ant-design/hooks/use-form) properties are also available in `useStepsForm`. You can find descriptions on the [`useForm`](/core/docs/ui-integrations/ant-design/hooks/use-form#properties) documentation.

```tsx
const drawerForm = useDrawerForm({
  refineCoreProps: {
    action: "edit",
    resource: "posts",
    id: "1",
  },
});
```

### initialValues

Default values for the form. Use this to pre-populate the form with data that needs to be displayed. This property is only available in `"create"` action.

```tsx
const drawerForm = useDrawerForm({
  initialValues: {
    title: "Hello World",
  },
});
```

### defaultVisible

When `true`, drawer will be visible by default. It is `false` by default.

```tsx
const drawerForm = useDrawerForm({
  modalProps: {
    defaultVisible: true,
  },
});
```

### autoSubmitClose

When `true`, drawer will be closed after successful submit. It is `true` by default.

```tsx
const drawerForm = useDrawerForm({
  modalProps: {
    autoSubmitClose: false,
  },
});
```

### autoResetForm

When `true`, form will be reset after successful submit. It is `true` by default.

```tsx
const drawerForm = useDrawerForm({
  modalProps: {
    autoResetForm: false,
  },
});
```

### syncWithLocation

When `true`, the drawers visibility state and the `id` of the record will be synced with the URL. It is `false` by default.

This property can also be set as an object `{ key: string; syncId?: boolean }` to customize the key of the URL query parameter. `id` will be synced with the URL only if `syncId` is `true`.

```tsx
const drawerForm = useDrawerForm({
  syncWithLocation: { key: "my-modal", syncId: true },
});
```

### overtimeOptions

If you want loading overtime for the request, you can pass the `overtimeOptions` prop to the this hook. It is useful when you want to show a loading indicator when the request takes too long.
`interval` is the time interval in milliseconds while `onInterval` is the function that will be called on each interval. `elapsedTime` is the elapsed time in milliseconds.

Return the `overtime` object from this hook. It becomes `undefined` when the request is completed.

```tsx
const { overtime } = useDrawerForm({
  //...
  overtimeOptions: {
    interval: 1000,
    onInterval(elapsedInterval) {
      console.log(elapsedInterval);
    },
  },
});

console.log(overtime.elapsedTime); // undefined, 1000, 2000, 3000 4000, ...

// You can use it like this:
{
  elapsedTime >= 4000 && <div>this takes a bit longer than expected</div>;
}
```

### autoSave

If you want to save the form automatically after some delay when user edits the form, you can pass true to `autoSave.enabled` prop.

By default the `autoSave` feature does not invalidate queries. However, you can use the `invalidateOnUnmount` and `invalidateOnClose` props to invalidate queries upon unmount or close.

It also supports `onMutationSuccess` and `onMutationError` callback functions. You can use `isAutoSave` parameter to determine whether the mutation is triggered by `autoSave` or not.

`autoSave` feature operates exclusively in `edit` mode. Users can take advantage of this feature while editing data, as changes are automatically saved in editing mode. However, when creating new data, manual saving is still required.

`onMutationSuccess` and `onMutationError` callbacks will be called after the mutation is successful or failed.

#### enabled

To enable the `autoSave` feature, set the `enabled` parameter to `true`. Default value is `false`.

```tsx
useDrawerForm({
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
useDrawerForm({
  refineCoreProps: {
    autoSave: {
      enabled: true,
      // highlight-next-line
      debounce: 2000,
    },
  },
});
```

#### invalidateOnUnmount

This prop is useful when you want to invalidate the `list`, `many` and `detail` queries from the current resource when the hook is unmounted. By default, it invalidates the `list`, `many` and `detail` queries associated with the current resource. Also, You can use the `invalidates` prop to select which queries to invalidate. Default value is `false`.

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

This prop is useful when you want to invalidate the `list`, `many` and `detail` queries from the current resource when the drawer is closed. By default, it invalidates the `list`, `many` and `detail` queries associated with the current resource. Also, You can use the `invalidates` prop to select which queries to invalidate. Default value is `false`.

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

All [`useForm`][use-form-refine-mantine] return values are also available in `useDrawerForm`. You can find descriptions on the [`useForm`](/core/docs/ui-integrations/ant-design/hooks/use-form#return-values) documentation.

All [`mantine useForm`](https://mantine.dev/form/use-form/) return values also available in `useDrawerForm`. You can find descriptions on [`mantine`](https://mantine.dev/form/use-form/) docs.

### visible

Current visibility state of the drawer.

```tsx
const drawerForm = useDrawerForm({
  defaultVisible: true,
});

console.log(drawerForm.modal.visible); // true
```

### title

Title of the drawer. Based on resource and action values

```tsx
const {
  modal: { title },
} = useDrawerForm({
  refineCoreProps: {
    resource: "posts",
    action: "create",
  },
});

console.log(title); // "Create Post"
```

### close

`close` is a function that can close the drawer. It's useful when you want to close the drawer manually.

```tsx
const {
  getInputProps,
  modal: { close, visible, title },
} = useDrawerForm();

return (
  <Drawer opened={visible} onClose={close} title={title}>
    <TextInput
      mt={8}
      label="Title"
      placeholder="Title"
      {...getInputProps("title")}
    />
    <Box mt={8} sx={{ display: "flex", justifyContent: "flex-end" }}>
      <SaveButton {...saveButtonProps} />
      <Button onClick={close}>Cancel</Button>
    </Box>
  </Drawer>
);
```

### submit

`submit` is a function that can submit the form. It's useful when you want to submit the form manually.

```tsx
const {
  modal: { submit },
} = useDrawerForm();

// ---

return (
  <Drawer opened={visible} onClose={close} title={title}>
    <TextInput
      mt={8}
      label="Title"
      placeholder="Title"
      {...getInputProps("title")}
    />
    <Box mt={8} sx={{ display: "flex", justifyContent: "flex-end" }}>
      <Button onClick={submit}>Save</Button>
    </Box>
  </Drawer>
);
```

### show

`shows` is a function that can show the drawer.

```tsx
const {
  getInputProps,
  modal: { close, visible, title, show },
} = useDrawerForm();

const onFinishHandler = (values) => {
  onFinish(values);
  show();
};

return (
  <>
    <Button onClick={}>Show Modal</Button>
    <Drawer opened={visible} onClose={close} title={title}>
      <TextInput
        mt={8}
        label="Title"
        placeholder="Title"
        {...getInputProps("title")}
      />
      <Box mt={8} sx={{ display: "flex", justifyContent: "flex-end" }}>
        <SaveButton {...saveButtonProps} />
      </Box>
    </Drawer>
  </>
);
```

### saveButtonProps

`saveButtonProps` contains all the props needed by the "submit" button within the drawer (disabled,loading etc.). You can manually pass these props to your custom button.

```tsx
const { getInputProps, modal, saveButtonProps } = useDrawerForm();

return (
  <Drawer {...modal}>
    <TextInput
      mt={8}
      label="Title"
      placeholder="Title"
      {...getInputProps("title")}
    />
    <Box mt={8} sx={{ display: "flex", justifyContent: "flex-end" }}>
      <Button
        {...saveButtonProps}
        onClick={(e) => {
          // -- your custom logic
          saveButtonProps.onClick(e);
        }}
      />
    </Box>
  </Drawer>
);
```

### overtime

`overtime` object is returned from this hook. `elapsedTime` is the elapsed time in milliseconds. It becomes `undefined` when the request is completed.

```tsx
const { overtime } = useDrawerForm();

console.log(overtime.elapsedTime); // undefined, 1000, 2000, 3000 4000, ...
```

### autoSaveProps

If `autoSave` is enabled, this hook returns `autoSaveProps` object with `data`, `error`, and `status` properties from mutation.

## FAQ

### How can I change the form data before submitting it to the API?

You may need to modify the form data before it is sent to the API.

For example, Let's send the values we received from the user in two separate inputs, `name` and `surname`, to the API, as `fullName`.

```tsx title="pages/user/create.tsx"
import { Drawer, TextInput } from "@mantine/core";
import { useDrawerForm } from "@refinedev/mantine";
import React from "react";

const UserCreate: React.FC = () => {
  const {
    getInputProps,
    saveButtonProps,
    modal: { show, close, title, visible },
  } = useDrawerForm({
    refineCoreProps: { action: "create" },
    initialValues: {
      name: "",
      surname: "",
    },
    // highlight-start
    transformValues: (values) => ({
      fullName: `${values.name} ${values.surname}`,
    }),
    // highlight-end
  });

  return (
    <Drawer opened={visible} onClose={close} title={title}>
      <TextInput
        mt={8}
        label="Name"
        placeholder="Name"
        {...getInputProps("name")}
      />
      <TextInput
        mt={8}
        label="Surname"
        placeholder="Surname"
        {...getInputProps("surname")}
      />
      <Box mt={8} sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          {...saveButtonProps}
          onClick={(e) => {
            // -- your custom logic
            saveButtonProps.onClick(e);
          }}
        />
      </Box>
    </Drawer>
  );
};
```

## API Reference

### Properties

| Property                               | Description                                                         | Type                                                         |
| -------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------ |
| modalProps                             | Configuration object for the modal or drawer                        | [`ModalPropsType`](#modalpropstype)                          |
| refineCoreProps                        | Configuration object for the core of the [`useForm`][use-form-core] | [`UseFormProps`](/core/docs/data/hooks/use-form/#properties) |
| `@mantine/form`'s `useForm` properties | See [useForm][use-form-refine-mantine] documentation                |

<br />

> - #### ModalPropsType
>
> | Property        | Description                                                   | Type      | Default |
> | --------------- | ------------------------------------------------------------- | --------- | ------- |
> | defaultVisible  | Initial visibility state of the modal                         | `boolean` | `false` |
> | autoSubmitClose | Whether the form should be submitted when the modal is closed | `boolean` | `true`  |
> | autoResetForm   | Whether the form should be reset when the form is submitted   | `boolean` | `true`  |

### Type Parameters

| Property       | Description                                                                                                                                                         | Type                       | Default                    |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- | -------------------------- |
| TQueryFnData   | Result data returned by the query function. Extends [`BaseRecord`][baserecord]                                                                                      | [`BaseRecord`][baserecord] | [`BaseRecord`][baserecord] |
| TError         | Custom error object that extends [`HttpError`][httperror]                                                                                                           | [`HttpError`][httperror]   | [`HttpError`][httperror]   |
| TVariables     | Form values for mutation function                                                                                                                                   | `{}`                       | `Record<string, unknown>`  |
| TTransformed   | Form values after transformation for mutation function                                                                                                              | `{}`                       | `TVariables`               |
| TData          | Result data returned by the `select` function. Extends [`BaseRecord`][baserecord]. If not specified, the value of `TQueryFnData` will be used as the default value. | [`BaseRecord`][baserecord] | `TQueryFnData`             |
| TResponse      | Result data returned by the mutation function. Extends [`BaseRecord`][baserecord]. If not specified, the value of `TData` will be used as the default value.        | [`BaseRecord`][baserecord] | `TData`                    |
| TResponseError | Custom error object that extends [`HttpError`][httperror]. If not specified, the value of `TError` will be used as the default value.                               | [`HttpError`][httperror]   | `TError`                   |

### Return values

| Property                                  | Description                                                     | Type                                                                   |
| ----------------------------------------- | --------------------------------------------------------------- | ---------------------------------------------------------------------- |
| modal                                     | Relevant states and methods to control the modal or drawer      | [`ModalReturnValues`](#modalreturnvalues)                              |
| refineCore                                | The return values of the [`useForm`][use-form-core] in the core | [`UseFormReturnValues`](/core/docs/data/hooks/use-form/#return-values) |
| `@mantine/form`'s `useForm` return values | See [useForm][use-form-refine-mantine] documentation            |
| overtime                                  | Overtime loading props                                          | `{ elapsedTime?: number }`                                             |

<br />

> - #### ModalReturnValues
>
> | Property        | Description                                    | Type                                                                             |
> | --------------- | ---------------------------------------------- | -------------------------------------------------------------------------------- |
> | visible         | State of modal visibility                      | `boolean`                                                                        |
> | show            | Sets the visible state to true                 | `(id?: BaseKey) => void`                                                         |
> | close           | Sets the visible state to false                | `() => void`                                                                     |
> | submit          | Submits the form                               | `(values: TVariables) => void`                                                   |
> | title           | Modal title based on resource and action value | `string`                                                                         |
> | saveButtonProps | Props for a submit button                      | `{ disabled: boolean, onClick: (e: React.FormEvent<HTMLFormElement>) => void; }` |

## Example

<CodeSandboxExample path="form-mantine-use-drawer-form" />

[use-form-refine-mantine]: /core/docs/ui-integrations/mantine/hooks/use-form
[use-form-core]: /core/docs/data/hooks/use-form/
[use-modal-form-refine-mantine]: /core/docs/ui-integrations/mantine/hooks/use-modal-form
[baserecord]: /core/docs/core/interface-references#baserecord
[httperror]: /core/docs/core/interface-references#httperror
