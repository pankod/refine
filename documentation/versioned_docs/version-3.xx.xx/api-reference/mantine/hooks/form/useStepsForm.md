---
id: useStepsForm
title: useStepsForm
---

```tsx live shared
import React from "react";
import {
  useTable,
  ColumnDef,
  flexRender,
  Column,
} from "@pankod/refine-react-table";
import { GetManyResponse, useMany } from "@pankod/refine-core";
import {
  Button as MantineButton,
  Code as MantineCode,
  Edit as MantineEdit,
  Create as MantineCreate,
  List as MantineList,
  Group as MantineGroup,
  Select as MantineSelect,
  Stepper as MantineStepper,
  TextInput as MantineTextInput,
  useStepsForm as MantineUseStepsForm,
  useSelect as MantineUseSelect,
  DeleteButton as MantineDeleteButton,
  SaveButton as MantineSaveButton,
  Text as MantineText,
  Textarea as MantineTextarea,
  Space as MantineSpace,
  Pagination as MantinePagination,
  ScrollArea as MantineScrollArea,
  Table as MantineTable,
  Box as MantineBox,
  EditButton as MantineEditButton,
} from "@pankod/refine-mantine";

interface ICategory {
  id: number;
  title: string;
}

interface IPost {
  id: number;
  title: string;
  content: string;
  status: "published" | "draft" | "rejected";
  category: { id: number };
}

interface ColumnButtonProps {
  column: Column<any, any>; // eslint-disable-line
}

interface FilterElementProps {
  value: any; // eslint-disable-line
  onChange: (value: any) => void; // eslint-disable-line
}

const PostList: React.FC = () => {
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
        id: "category.id",
        header: "Category",
        enableColumnFilter: false,
        accessorKey: "category.id",
        cell: function render({ getValue, table }) {
          const meta = table.options.meta as {
            categoriesData: GetManyResponse<ICategory>;
          };
          const category = meta.categoriesData?.data.find(
            (item) => item.id === getValue(),
          );
          return category?.title ?? "Loading...";
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
            <MantineGroup spacing="xs" noWrap>
              <MantineEditButton hideText recordItemId={getValue() as number} />
              <MantineDeleteButton
                hideText
                recordItemId={getValue() as number}
              />
            </MantineGroup>
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

  const categoryIds = tableData?.data?.map((item) => item.category.id) ?? [];
  const { data: categoriesData } = useMany<ICategory>({
    resource: "categories",
    ids: categoryIds,
    queryOptions: {
      enabled: categoryIds.length > 0,
    },
  });

  setOptions((prev) => ({
    ...prev,
    meta: {
      ...prev.meta,
      categoriesData,
    },
  }));

  return (
    <MantineScrollArea>
      <MantineList>
        <MantineTable highlightOnHover>
          <thead>
            {getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th key={header.id}>
                      {!header.isPlaceholder && (
                        <MantineGroup spacing="xs" noWrap>
                          <MantineBox>
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                          </MantineBox>
                        </MantineGroup>
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
        </MantineTable>
        <br />
        <MantinePagination
          position="right"
          total={pageCount}
          page={current}
          onChange={setCurrent}
        />
      </MantineList>
    </MantineScrollArea>
  );
};

const PostCreate: React.FC = () => {
  const {
    saveButtonProps,
    getInputProps,
    values,
    steps: { currentStep, gotoStep },
  } = MantineUseStepsForm({
    initialValues: {
      title: "",
      status: "",
      slug: "",
      content: "",
    },
    validate: (values) => {
      if (currentStep === 0) {
        return {
          title: values.title ? null : "Title is required",
          slug: values.slug ? null : "Slug is required",
        };
      }

      if (currentStep === 1) {
        return {
          status: values.status ? null : "Status is required",
        };
      }

      return {};
    },
  });

  return (
    <MantineCreate
      footerButtons={
        <MantineGroup position="right" mt="xl">
          {currentStep !== 0 && (
            <MantineButton
              variant="default"
              onClick={() => gotoStep(currentStep - 1)}
            >
              Back
            </MantineButton>
          )}
          {currentStep !== 3 && (
            <MantineButton onClick={() => gotoStep(currentStep + 1)}>
              Next step
            </MantineButton>
          )}
          {currentStep === 2 && <SaveButton {...saveButtonProps} />}
        </MantineGroup>
      }
    >
      <MantineStepper
        active={currentStep}
        onStepClick={gotoStep}
        breakpoint="xs"
      >
        <MantineStepper.Step
          label="First Step"
          description="Title and Slug"
          allowStepSelect={currentStep > 0}
        >
          <MantineTextInput
            mt="md"
            label="Title"
            placeholder="Title"
            {...getInputProps("title")}
          />
          <MantineTextInput
            mt="md"
            label="Slug"
            placeholder="Slug"
            {...getInputProps("slug")}
          />
        </MantineStepper.Step>

        <MantineStepper.Step
          label="Second Step"
          description="Status"
          allowStepSelect={currentStep > 1}
        >
          <MantineSelect
            mt="md"
            label="Status"
            placeholder="Pick one"
            {...getInputProps("status")}
            data={[
              { label: "Published", value: "published" },
              { label: "Draft", value: "draft" },
              { label: "Rejected", value: "rejected" },
            ]}
          />
        </MantineStepper.Step>

        <MantineStepper.Step
          label="Final Step"
          description="Content"
          allowStepSelect={currentStep > 2}
        >
          <MantineTextarea
            label="Content"
            placeholder="Content"
            {...getInputProps("content")}
          />
        </MantineStepper.Step>

        <MantineStepper.Completed>
          Completed! Form values:
          <MantineSpace />
          <MantineCode mt="xl">{JSON.stringify(values, null, 2)}</MantineCode>
        </MantineStepper.Completed>
      </MantineStepper>
    </MantineCreate>
  );
};

const PostEdit: React.FC = () => {
  const {
    saveButtonProps,
    getInputProps,
    values,
    steps: { currentStep, gotoStep },
  } = MantineUseStepsForm({
    initialValues: {
      title: "",
      status: "",
      slug: "",
      content: "",
    },
    validate: (values) => {
      if (currentStep === 0) {
        return {
          title: values.title ? null : "Title is required",
          status: values.status ? null : "Status is required",
        };
      }

      if (currentStep === 1) {
        return {
          slug: values.slug ? null : "Slug is required",
        };
      }

      return {};
    },
  });

  return (
    <MantineEdit
      footerButtons={
        <MantineGroup position="right" mt="xl">
          {currentStep !== 0 && (
            <MantineButton
              variant="default"
              onClick={() => gotoStep(currentStep - 1)}
            >
              Back
            </MantineButton>
          )}
          {currentStep !== 3 && (
            <MantineButton onClick={() => gotoStep(currentStep + 1)}>
              Next step
            </MantineButton>
          )}
          {currentStep === 2 && <SaveButton {...saveButtonProps} />}
        </MantineGroup>
      }
    >
      <MantineStepper
        active={currentStep}
        onStepClick={gotoStep}
        breakpoint="xs"
      >
        <MantineStepper.Step
          label="First Step"
          description="Title and Slug"
          allowStepSelect={currentStep > 0}
        >
          <MantineTextInput
            mt="md"
            label="Title"
            placeholder="Title"
            {...getInputProps("title")}
          />
          <MantineTextInput
            mt="md"
            label="Slug"
            placeholder="Slug"
            {...getInputProps("slug")}
          />
        </MantineStepper.Step>

        <MantineStepper.Step
          label="Second Step"
          description="Status"
          allowStepSelect={currentStep > 1}
        >
          <MantineSelect
            mt="md"
            label="Status"
            placeholder="Pick one"
            {...getInputProps("status")}
            data={[
              { label: "Published", value: "published" },
              { label: "Draft", value: "draft" },
              { label: "Rejected", value: "rejected" },
            ]}
          />
        </MantineStepper.Step>

        <MantineStepper.Step
          label="Final Step"
          description="Content"
          allowStepSelect={currentStep > 2}
        >
          <MantineTextarea
            label="Content"
            placeholder="Content"
            {...getInputProps("content")}
          />
        </MantineStepper.Step>
        <MantineStepper.Completed>
          Completed! Form values:
          <MantineSpace />
          <MantineCode mt="xl">{JSON.stringify(values, null, 2)}</MantineCode>
        </MantineStepper.Completed>
      </MantineStepper>
    </MantineEdit>
  );
};
```

`useStepsForm` allows you to manage a form with multiple steps. It provides features such as which step is currently active, the ability to go to a specific step and validation when changing steps etc.

:::info
`useStepsForm` hook is extended from [`useForm`][use-form-refine-mantine] from the [`@pankod/refine-mantine`](https://github.com/refinedev/refine/tree/v3/packages/mantine) package. This means that you can use all the functionalities of [`useForm`][use-form-refine-mantine] in your `useStepsForm`.
:::

## Basic Usage

We'll show two examples, one for creating and one for editing a post. Let's see how `useStepsForm` is used in both.

<Tabs
defaultValue="create"
values={[
{label: 'create', value: 'create'},
{label: 'edit', value: 'edit'},
]}>

<TabItem value="create">

Here is the final result of the form: We will explain the code in following sections.

```tsx live url=http://localhost:3000/posts/create previewHeight=420px hideCode
setInitialRoutes(["/posts/create"]);

// visible-block-start
import React from "react";
import { HttpError } from "@pankod/refine-core";
import {
  Button,
  Code,
  Create,
  Group,
  Select,
  Stepper,
  TextInput,
  useStepsForm,
  SaveButton,
  Text,
  Space,
  Textarea,
} from "@pankod/refine-mantine";

type FormValues = Omit<IPost, "id">;

const PostCreatePage: React.FC = () => {
  const {
    saveButtonProps,
    getInputProps,
    values,
    steps: { currentStep, gotoStep },
  } = useStepsForm<IPost, HttpError, FormValues>({
    initialValues: {
      title: "",
      status: "",
      slug: "",
      content: "",
    },
    validate: (values) => {
      if (currentStep === 0) {
        return {
          title: values.title ? null : "Title is required",
          slug: values.slug ? null : "Slug is required",
        };
      }

      if (currentStep === 1) {
        return {
          status: values.status ? null : "Status is required",
        };
      }

      return {};
    },
  });

  return (
    <Create
      footerButtons={
        <Group position="right" mt="xl">
          {currentStep !== 0 && (
            <Button variant="default" onClick={() => gotoStep(currentStep - 1)}>
              Back
            </Button>
          )}
          {currentStep !== 3 && (
            <Button onClick={() => gotoStep(currentStep + 1)}>Next step</Button>
          )}
          {currentStep === 2 && <SaveButton {...saveButtonProps} />}
        </Group>
      }
    >
      <Stepper active={currentStep} onStepClick={gotoStep} breakpoint="xs">
        <Stepper.Step
          label="First Step"
          description="Title and Slug"
          allowStepSelect={currentStep > 0}
        >
          <TextInput
            mt="md"
            label="Title"
            placeholder="Title"
            {...getInputProps("title")}
          />
          <TextInput
            mt="md"
            label="Slug"
            placeholder="Slug"
            {...getInputProps("slug")}
          />
        </Stepper.Step>

        <Stepper.Step
          label="Second Step"
          description="Status"
          allowStepSelect={currentStep > 1}
        >
          <Select
            mt="md"
            label="Status"
            placeholder="Pick one"
            {...getInputProps("status")}
            data={[
              { label: "Published", value: "published" },
              { label: "Draft", value: "draft" },
              { label: "Rejected", value: "rejected" },
            ]}
          />
        </Stepper.Step>

        <Stepper.Step
          label="Final Step"
          description="Content"
          allowStepSelect={currentStep > 2}
        >
          <Textarea
            label="Content"
            placeholder="Content"
            {...getInputProps("content")}
          />
        </Stepper.Step>

        <Stepper.Completed>
          Completed! Form values:
          <Space />
          <Code mt="xl">{JSON.stringify(values, null, 2)}</Code>
        </Stepper.Completed>
      </Stepper>
    </Create>
  );
};
// visible-block-end

setRefineProps({
  resources: [
    {
      name: "posts",
      list: PostList,
      create: PostCreatePage,
      edit: PostEdit,
    },
  ],
});

render(<RefineMantineDemo />);
```

</TabItem>

<TabItem value="edit">

Here is the final result of the form: We will explain the code in following sections.

```tsx live url=http://localhost:3000/posts/edit/123 previewHeight=420px hideCode
setInitialRoutes(["/posts/edit/123"]);

// visible-block-start
import React from "react";
import { HttpError } from "@pankod/refine-core";
import {
  Edit,
  Button,
  Code,
  Group,
  Select,
  Stepper,
  TextInput,
  useStepsForm,
  SaveButton,
  Text,
  Space,
  Textarea,
} from "@pankod/refine-mantine";

type FormValues = Omit<IPost, "id">;

const PostEditPage: React.FC = () => {
  const {
    saveButtonProps,
    getInputProps,
    values,
    steps: { currentStep, gotoStep },
  } = useStepsForm<IPost, HttpError, FormValues>({
    initialValues: {
      title: "",
      status: "",
      slug: "",
      content: "",
    },
    validate: (values) => {
      if (currentStep === 0) {
        return {
          title: values.title ? null : "Title is required",
          slug: values.slug ? null : "Slug is required",
        };
      }

      if (currentStep === 1) {
        return {
          status: values.status ? null : "Status is required",
        };
      }

      return {};
    },
  });

  return (
    <Edit
      footerButtons={
        <Group position="right" mt="xl">
          {currentStep !== 0 && (
            <Button variant="default" onClick={() => gotoStep(currentStep - 1)}>
              Back
            </Button>
          )}
          {currentStep !== 3 && (
            <Button onClick={() => gotoStep(currentStep + 1)}>Next step</Button>
          )}
          {currentStep === 2 && <SaveButton {...saveButtonProps} />}
        </Group>
      }
    >
      <Stepper active={currentStep} onStepClick={gotoStep} breakpoint="xs">
        <Stepper.Step
          label="First Step"
          description="Title and Slug"
          allowStepSelect={currentStep > 0}
        >
          <TextInput
            mt="md"
            label="Title"
            placeholder="Title"
            {...getInputProps("title")}
          />
          <TextInput
            mt="md"
            label="Slug"
            placeholder="Slug"
            {...getInputProps("slug")}
          />
        </Stepper.Step>

        <Stepper.Step
          label="Second Step"
          description="Status"
          allowStepSelect={currentStep > 1}
        >
          <Select
            mt="md"
            label="Status"
            placeholder="Pick one"
            {...getInputProps("status")}
            data={[
              { label: "Published", value: "published" },
              { label: "Draft", value: "draft" },
              { label: "Rejected", value: "rejected" },
            ]}
          />
        </Stepper.Step>

        <Stepper.Step
          label="Final Step"
          description="Content"
          allowStepSelect={currentStep > 2}
        >
          <Textarea
            label="Content"
            placeholder="Content"
            {...getInputProps("content")}
          />
        </Stepper.Step>

        <Stepper.Completed>
          Completed! Form values:
          <Space />
          <Code mt="xl">{JSON.stringify(values, null, 2)}</Code>
        </Stepper.Completed>
      </Stepper>
    </Edit>
  );
};
// visible-block-end

setRefineProps({
  resources: [
    {
      name: "posts",
      list: PostList,
      create: PostCreate,
      edit: PostEditPage,
    },
  ],
});

render(<RefineMantineDemo />);
```

</TabItem>

</Tabs>

In this example we're going to build a Post `"create"` form. To creating a multi-step form, we will use [`<Stepper/>`](https://mantine.dev/core/stepper/) component from Mantine. To handle the state of both the form and the steps, we will use `useStepsForm` hook.

To show your form inputs step by step, first import and use `useStepsForm` hook in your page:

```tsx
import React from "react";
import { HttpError } from "@pankod/refine-core";
import { Create } from "@pankod/refine-mantine";

type FormValues = Omit<IPost, "id">;

const PostCreatePage: React.FC = () => {
  const {
    saveButtonProps,
    getInputProps,
    values,
    steps: { currentStep, gotoStep },
  } = useStepsForm<IPost, HttpError, FormValues>({
    initialValues: {
      title: "",
      status: "",
      slug: "",
      content: "",
    },
    validate: (values) => {
      if (currentStep === 0) {
        return {
          title: values.title ? null : "Title is required",
          slug: values.slug ? null : "Slug is required",
        };
      }

      if (currentStep === 1) {
        return {
          status: values.status ? null : "Status is required",
        };
      }

      return {};
    },
  });

  return <Create>create page</Create>;
};
```

`useStepsForm` is generic over the type form data to help you type check your code.

This hook returns a set of useful values to render [`<Stepper/>`](https://mantine.dev/core/stepper/). Given current value, you should have a way to render your form items conditionally with this index value.

Here, we're going to use a [`<Stepper/>`](https://mantine.dev/core/stepper/) component to render the form items based on the `currentStep` and we added `<Button>` to footer with `gotoStep` function to navigate between steps.

```tsx
import React from "react";
import { HttpError } from "@pankod/refine-core";
import { Create } from "@pankod/refine-mantine";

type FormValues = Omit<IPost, "id">;

const PostCreatePage: React.FC = () => {
  const {
    saveButtonProps,
    getInputProps,
    values,
    steps: { currentStep, gotoStep },
  } = useStepsForm<IPost, HttpError, FormValues>({
    initialValues: {
      title: "",
      status: "",
      slug: "",
      content: "",
    },
    validate: (values) => {
      if (currentStep === 0) {
        return {
          title: values.title ? null : "Title is required",
          slug: values.slug ? null : "Slug is required",
        };
      }

      if (currentStep === 1) {
        return {
          status: values.status ? null : "Status is required",
        };
      }

      return {};
    },
  });

  return (
    <Create
      //highlight-start
      footerButtons={
        <Group position="right" mt="xl">
          {currentStep !== 0 && (
            <Button variant="default" onClick={() => gotoStep(currentStep - 1)}>
              Back
            </Button>
          )}
          {currentStep !== 3 && (
            <Button onClick={() => gotoStep(currentStep + 1)}>Next step</Button>
          )}
          {currentStep === 2 && <SaveButton {...saveButtonProps} />}
        </Group>
      }
      // highlight-end
    >
      {/* highlight-start */}
      <Stepper active={currentStep} onStepClick={gotoStep} breakpoint="xs">
        <Stepper.Step
          label="First Step"
          description="Title and Slug"
          allowStepSelect={currentStep > 0}
        >
          <TextInput
            mt="md"
            label="Title"
            placeholder="Title"
            {...getInputProps("title")}
          />
          <TextInput
            mt="md"
            label="Slug"
            placeholder="Slug"
            {...getInputProps("slug")}
          />
        </Stepper.Step>

        <Stepper.Step
          label="Second Step"
          description="Status"
          allowStepSelect={currentStep > 1}
        >
          <Select
            mt="md"
            label="Status"
            placeholder="Pick one"
            {...getInputProps("status")}
            data={[
              { label: "Published", value: "published" },
              { label: "Draft", value: "draft" },
              { label: "Rejected", value: "rejected" },
            ]}
          />
        </Stepper.Step>

        <Stepper.Step
          label="Final Step"
          description="Content"
          allowStepSelect={currentStep > 2}
        >
          <Textarea
            label="Content"
            placeholder="Content"
            {...getInputProps("content")}
          />
        </Stepper.Step>

        <Stepper.Completed>
          Completed! Form values:
          <Space />
          <Code mt="xl">{JSON.stringify(values, null, 2)}</Code>
        </Stepper.Completed>
      </Stepper>
      {/* highlight-end */}
    </Create>
  );
};
```

## Properties

### `refineCoreProps`

All [`useForm`](/core/docs/3.xx.xx/api-reference/antd/hooks/form/useForm) properties also available in `useStepsForm`. You can find descriptions on [`useForm`](/core/docs/3.xx.xx/api-reference/antd/hooks/form/useForm/#properties) docs.

```tsx
const stepsForm = useStepsForm({
  refineCoreProps: {
    action: "edit",
    resource: "posts",
    id: "1",
  },
});
```

### `stepsProps`

#### `defaultStep`

> Default: `0`

Sets the default starting step number. Counting starts from `0`.

```tsx
const stepsForm = useStepsForm({
  stepsProps: {
    defaultStep: 0,
  },
});
```

#### `isBackValidate`

> Default: `false`

When is `true`, validates a form fields when the user navigates to a previous step.

```tsx
const stepsForm = useStepsForm({
  stepsProps: {
    isBackValidate: true,
  },
});
```

## Return Values

:::tip
All [`useForm`](/core/docs/3.xx.xx/api-reference/mantine/hooks/form/useForm) return values also available in `useStepsForm`. You can find descriptions on [`useForm`](/core/docs/3.xx.xx/api-reference/mantine/hooks/form/useForm#return-values) docs.
:::

### `steps`

The props needed by the `<Stepper>` component.

#### `currenStep`

Current step, counting from `0`.

#### `gotoStep`

Is a function that allows you to programmatically change the current step of a form.
It takes in one argument, step, which is a number representing the index of the step you want to navigate to.

## API Reference

### Properties

<PropsTable module="@pankod/refine-mantine/useStepsForm"
refineCoreProps-type="[`UseFormCoreProps<TData, TError, TVariables>`](/core/docs/3.xx.xx/api-reference/core/hooks/useForm/#properties)"
refineCoreProps-description="Configuration object for the core of the [useForm](/core/docs/3.xx.xx/api-reference/core/hooks/useForm/)"
stepsProps-description="Configuration object for the steps. `defaultStep`: Allows you to set the initial step. `isBackValidate`: Whether to validation the current step when going back."
stepsProps-default="`defaultStep = 0` `isBackValidate = false`"
 />

### Return values

| Property                                  | Description                                                     | Type                                                                                       |
| ----------------------------------------- | --------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| steps                                     | Relevant state and method to control the steps                  | [`StepsReturnValues`](#steps)                                                              |
| refineCore                                | The return values of the [`useForm`][use-form-core] in the core | [`UseFormReturnValues`](/core/docs/3.xx.xx/api-reference/core/hooks/useForm#return-values) |
| `@mantine/form`'s `useForm` return values | See [useForm][use-form-refine-mantine] documentation            |

## Example

<CodeSandboxExample path="form-mantine-use-steps-form" />

[use-form-refine-mantine]: /core/docs/3.xx.xx/api-reference/mantine/hooks/form/useForm
[use-form-core]: /core/docs/3.xx.xx/api-reference/core/hooks/useForm
