---
id: useDrawerForm
title: useDrawerForm
---

[`useModalForm`][use-modal-form-refine-mantine] hook allows you to manage a form within a `<Modal>` as well as a `<Drawer>`. It provides some useful methods to handle the form `<Modal>` or form `<Drawer>`.

We will use [`useModalForm`][use-modal-form-refine-mantine] hook as a `useDrawerForm` to manage a form within a `<Drawer>`.

:::info
`useDrawerForm` hook is extended from [`useForm`][use-form-refine-mantine] hook from the [`@pankod/refine-mantine`](https://github.com/refinedev/refine/tree/v3/packages/mantine) package. This means that you can use all the features of [`useForm`][use-form-refine-mantine] hook.
:::

## Basic Usage

We'll show two examples, one for creating and one for editing a post. Let's see how `useDrawerForm` is used in both.

<Tabs
defaultValue="create"
values={[
{label: 'create', value: 'create'},
{label: 'edit', value: 'edit'},
]}>

<TabItem value="create">

In this example, we will show you how to `"create"` a record with `useDrawerForm`.

```tsx live url=http://localhost:3000/posts
setInitialRoutes(["/posts"]);

// visible-block-start
import React from "react";
import { IResourceComponentsProps } from "@pankod/refine-core";
import { useTable, ColumnDef, flexRender } from "@pankod/refine-react-table";
import { GetManyResponse, useMany } from "@pankod/refine-core";
import {
  Box,
  Group,
  List,
  ScrollArea,
  Table,
  Pagination,
  // highlight-next-line
  useModalForm as useDrawerForm,
  Drawer,
  Select,
  TextInput,
  SaveButton,
} from "@pankod/refine-mantine";

const PostList: React.FC<IResourceComponentsProps> = () => {
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
      tableQueryResult: { data: tableData },
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

In this example, we will show you how to `"edit"` a record with `useDrawerForm`.

```tsx live url=http://localhost:3000/posts
setInitialRoutes(["/posts"]);

// visible-block-start
import React from "react";
import { IResourceComponentsProps } from "@pankod/refine-core";
import { useTable, ColumnDef, flexRender } from "@pankod/refine-react-table";
import { GetManyResponse, useMany } from "@pankod/refine-core";
import {
  Box,
  Group,
  List,
  ScrollArea,
  Table,
  Pagination,
  // highlight-next-line
  useModalForm as useDrawerForm,
  Drawer,
  Select,
  TextInput,
  EditButton,
  SaveButton,
} from "@pankod/refine-mantine";

const PostList: React.FC<IResourceComponentsProps> = () => {
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
      tableQueryResult: { data: tableData },
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

:::caution
**refine** doesn't automatically add a `<EditButton/>` to the each record in `<PostList>` which opens `"edit"` form in `<Drawer>` when clicked.

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

:::

:::caution
Don't forget to pass the record `"id"` to `show` to fetch the record data. This is necessary for both `"edit"` and `"clone"` forms.
:::

</TabItem>

</Tabs>

## Properties

### `refineCoreProps`

All [`useForm`](/core/docs/3.xx.xx/api-reference/antd/hooks/form/useForm) properties also available in `useStepsForm`. You can find descriptions on [`useForm`](/core/docs/3.xx.xx/api-reference/antd/hooks/form/useForm/#properties) docs.

```tsx
const drawerForm = useDrawerForm({
  refineCoreProps: {
    action: "edit",
    resource: "posts",
    id: "1",
  },
});
```

### `initialValues`

> Only available in `"create"` form.

Default values for the form. Use this to pre-populate the form with data that needs to be displayed.

```tsx
const drawerForm = useDrawerForm({
  initialValues: {
    title: "Hello World",
  },
});
```

### `defaultVisible`

> Default: `false`

When `true`, drawer will be visible by default.

```tsx
const drawerForm = useDrawerForm({
  modalProps: {
    defaultVisible: true,
  },
});
```

### `autoSubmitClose`

> Default: `true`

When `true`, drawer will be closed after successful submit.

```tsx
const drawerForm = useDrawerForm({
  modalProps: {
    autoSubmitClose: false,
  },
});
```

### `autoResetForm`

> Default: `true`

When `true`, form will be reset after successful submit.

```tsx
const drawerForm = useDrawerForm({
  modalProps: {
    autoResetForm: false,
  },
});
```

## Return Values

:::tip
All [`useForm`][use-form-refine-mantine] return values also available in `useDrawerForm`. You can find descriptions on [`useForm`](/core/docs/3.xx.xx/api-reference/antd/hooks/form/useForm/#return-values) docs.

All [`mantine useForm`](https://mantine.dev/form/use-form/) return values also available in `useDrawerForm`. You can find descriptions on [`mantine`](https://mantine.dev/form/use-form/) docs.
:::

### `visible`

Current visibility state of the drawer.

```tsx
const drawerForm = useDrawerForm({
  defaultVisible: true,
});

console.log(drawerForm.modal.visible); // true
```

### `title`

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

### `close`

A function that can close the drawer. It's useful when you want to close the drawer manually.

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

### `submit`

A function that can submit the form. It's useful when you want to submit the form manually.

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

### `show`

A function that can show the drawer.

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

### `saveButtonProps`

It contains all the props needed by the "submit" button within the drawer (disabled,loading etc.). You can manually pass these props to your custom button.

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

## API Reference

### Properties

| Property                               | Description                                                         | Type                                                                             |
| -------------------------------------- | ------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| modalProps                             | Configuration object for the modal or drawer                        | [`ModalPropsType`](#modalpropstype)                                              |
| refineCoreProps                        | Configuration object for the core of the [`useForm`][use-form-core] | [`UseFormProps`](/core/docs/3.xx.xx/api-reference/core/hooks/useForm#properties) |
| `@mantine/form`'s `useForm` properties | See [useForm][use-form-refine-mantine] documentation                |

<br />

> - #### ModalPropsType
>
> | Property        | Description                                                   | Type      | Default |
> | --------------- | ------------------------------------------------------------- | --------- | ------- |
> | defaultVisible  | Initial visibility state of the modal                         | `boolean` | `false` |
> | autoSubmitClose | Whether the form should be submitted when the modal is closed | `boolean` | `true`  |
> | autoResetForm   | Whether the form should be reset when the form is submitted   | `boolean` | `true`  |

### Return values

| Property                                  | Description                                                     | Type                                                                                       |
| ----------------------------------------- | --------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| modal                                     | Relevant states and methods to control the modal or drawer      | [`ModalReturnValues`](#modalreturnvalues)                                                  |
| refineCore                                | The return values of the [`useForm`][use-form-core] in the core | [`UseFormReturnValues`](/core/docs/3.xx.xx/api-reference/core/hooks/useForm#return-values) |
| `@mantine/form`'s `useForm` return values | See [useForm][use-form-refine-mantine] documentation            |

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

[use-form-refine-mantine]: /core/docs/3.xx.xx/api-reference/mantine/hooks/form/useForm
[use-form-core]: /core/docs/3.xx.xx/api-reference/core/hooks/useForm
[use-modal-form-refine-mantine]: /core/docs/3.xx.xx/api-reference/mantine/hooks/form/useModalForm
