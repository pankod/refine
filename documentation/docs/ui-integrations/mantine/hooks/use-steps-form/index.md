---
title: "useStepsForm Hook | Best Practices for Usage & Patterns | Refine v5"
display_title: "useStepsForm"
sidebar_label: "useStepsForm"
description: "Secure Use Steps Form in Refine v5. Learn best practices. Learn integration patterns for values for polished admin UIs. Learn with code examples."
---

```tsx live shared
import { useTable } from "@refinedev/react-table";
import { Column, ColumnDef, flexRender } from "@tanstack/react-table";
import React from "react";

import {
  Box as MantineBox,
  Code as MantineCode,
  Group as MantineGroup,
  Pagination as MantinePagination,
  ScrollArea as MantineScrollArea,
  Select as MantineSelect,
  Space as MantineSpace,
  Stepper as MantineStepper,
  Table as MantineTable,
  Textarea as MantineTextarea,
  TextInput as MantineTextInput,
} from "@mantine/core";
import { GetManyResponse, useMany } from "@refinedev/core";
import {
  Button as MantineButton,
  Create as MantineCreate,
  DeleteButton as MantineDeleteButton,
  Edit as MantineEdit,
  EditButton as MantineEditButton,
  List as MantineList,
  useStepsForm as MantineUseStepsForm,
} from "@refinedev/mantine";

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
    reactTable: { getHeaderGroups, getRowModel, setOptions },
    refineCore: { setCurrentPage, pageCount, currentPage, result },
  } = useTable({
    columns,
  });

  const categoryIds = result?.data?.map((item) => item.category.id) ?? [];
  const { result: categoriesData } = useMany<ICategory>({
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
          page={currentPage}
          onChange={setCurrentPage}
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

The `useStepsForm` hook is extended from [`useForm`][use-form-refine-mantine] from the [`@refinedev/mantine`](https://github.com/refinedev/refine/tree/main/packages/mantine) package. This means that you can use all the functionalities of [`useForm`][use-form-refine-mantine] in your `useStepsForm`.

## Usage

We will show two examples, one for creating and one for editing a post. Let's see how `useStepsForm` is used in both.

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
import {
  Button,
  Code,
  Group,
  Select,
  Space,
  Stepper,
  Textarea,
  TextInput,
} from "@mantine/core";
import { HttpError } from "@refinedev/core";
import { Create, SaveButton, useStepsForm } from "@refinedev/mantine";
import React from "react";

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

render(
  <ReactRouter.BrowserRouter>
    <RefineMantineDemo
      resources={[
        {
          name: "posts",
          list: "/posts",
          create: "/posts/create",
          edit: "/posts/edit/:id",
        },
      ]}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route
          path="/posts"
          element={
            <div style={{ padding: 16 }}>
              <ReactRouter.Outlet />
            </div>
          }
        >
          <ReactRouter.Route index element={<PostList />} />
          <ReactRouter.Route path="create" element={<PostCreatePage />} />
          <ReactRouter.Route path="edit/:id" element={<PostEdit />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMantineDemo>
  </ReactRouter.BrowserRouter>,
);
```

</TabItem>

<TabItem value="edit">

Here is the final result of the form: We will explain the code in following sections.

```tsx live url=http://localhost:3000/posts/edit/123 previewHeight=420px hideCode
setInitialRoutes(["/posts/edit/123"]);

// visible-block-start
import {
  Button,
  Code,
  Group,
  Select,
  Space,
  Stepper,
  Textarea,
  TextInput,
} from "@mantine/core";
import { HttpError } from "@refinedev/core";
import { Edit, SaveButton, useStepsForm } from "@refinedev/mantine";
import React from "react";

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

render(
  <ReactRouter.BrowserRouter>
    <RefineMantineDemo
      resources={[
        {
          name: "posts",
          list: "/posts",
          create: "/posts/create",
          edit: "/posts/edit/:id",
        },
      ]}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route
          path="/posts"
          element={
            <div style={{ padding: 16 }}>
              <ReactRouter.Outlet />
            </div>
          }
        >
          <ReactRouter.Route index element={<PostList />} />
          <ReactRouter.Route path="create" element={<PostCreate />} />
          <ReactRouter.Route path="edit/:id" element={<PostEditPage />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMantineDemo>
  </ReactRouter.BrowserRouter>,
);
```

</TabItem>

</Tabs>

In this example we're going to build a Post `"create"` form. To creating a multi-step form, we will use [`<Stepper/>`](https://mantine.dev/core/stepper/) component from Mantine. To handle the state of both the form and the steps, we will use `useStepsForm` hook.

To show your form inputs step by step, first import and use `useStepsForm` hook in your page:

```tsx
import { HttpError } from "@refinedev/core";
import { Create } from "@refinedev/mantine";
import React from "react";

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
import { HttpError } from "@refinedev/core";
import { Create } from "@refinedev/mantine";
import React from "react";

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

### refineCoreProps

All [`useForm`](/core/docs/ui-integrations/ant-design/hooks/use-form/) properties also available in `useStepsForm`. You can find descriptions on [`useForm`](/core/docs/ui-integrations/ant-design/hooks/use-form/#properties) docs.

```tsx
const stepsForm = useStepsForm({
  refineCoreProps: {
    action: "edit",
    resource: "posts",
    id: "1",
  },
});
```

### stepsProps

#### defaultStep

Sets the default starting step number. Counting starts from `0`.

```tsx
const stepsForm = useStepsForm({
  stepsProps: {
    defaultStep: 0,
  },
});
```

#### isBackValidate

When is `true`, validates a form fields when the user navigates to a previous step. It is `false` by default.

```tsx
const stepsForm = useStepsForm({
  stepsProps: {
    isBackValidate: true,
  },
});
```

### overtimeOptions

If you want loading overtime for the request, you can pass the `overtimeOptions` prop to the this hook. It is useful when you want to show a loading indicator when the request takes too long.

`interval` is the time interval in milliseconds while `onInterval` is the function that will be called on each interval.

Return `overtime` object from this hook. `elapsedTime` is the elapsed time in milliseconds. It becomes `undefined` when the request is completed.

```tsx
const { overtime } = useStepsForm({
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

By default the `autoSave` feature does not invalidate queries. However, you can use the `invalidateOnUnmount` prop to invalidate queries upon unmount.

It also supports `onMutationSuccess` and `onMutationError` callback functions. You can use `isAutoSave` parameter to determine whether the mutation is triggered by `autoSave` or not.

`autoSave` feature operates exclusively in `edit` mode. Users can take advantage of this feature while editing data, as changes are automatically saved in editing mode. However, when creating new data, manual saving is still required.

`onMutationSuccess` and `onMutationError` callbacks will be called after the mutation is successful or failed.

#### enabled

To enable the `autoSave` feature, set the `enabled` parameter to `true`. Default is `false`.

```tsx
useStepsForm({
  refineCoreProps: {
    autoSave: {
      enabled: true,
    },
  },
});
```

#### debounce

`debounce` sets the debounce time for the `autoSave` prop. Default is `1000` milliseconds.

```tsx
useStepsForm({
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

This prop is useful when you want to invalidate the `list`, `many` and `detail` queries from the current resource when the hook is unmounted. By default, it invalidates the `list`, `many` and `detail` queries associated with the current resource. Also, You can use the `invalidates` prop to select which queries to invalidate. Default is `false`.

```tsx
useStepsForm({
  refineCoreProps: {
    autoSave: {
      enabled: true,
      // highlight-next-line
      invalidateOnUnmount: true,
    },
  },
});
```

## Return Values

All [`useForm`](/core/docs/ui-integrations/mantine/hooks/use-form/) return values also available in `useStepsForm`. You can find descriptions on [`useForm`](/core/docs/ui-integrations/mantine/hooks/use-form/#return-values) docs.

### steps

The props needed by the `<Stepper>` component.

#### currentStep

Current step, counting from `0`.

#### gotoStep

Is a function that allows you to programmatically change the current step of a form.
It takes in one argument, step, which is a number representing the index of the step you want to navigate to.

### overtime

`overtime` object is returned from this hook. `elapsedTime` is the elapsed time in milliseconds. It becomes `undefined` when the request is completed.

```tsx
const { overtime } = useStepsForm();

console.log(overtime.elapsedTime); // undefined, 1000, 2000, 3000 4000, ...
```

### autoSaveProps

If `autoSave` is enabled, this hook returns `autoSaveProps` object with `data`, `error`, and `status` properties from mutation.

## FAQ

### How can I change the form data before submitting it to the API?

You may need to modify the form data before it is sent to the API.

For example, Let's send the values we received from the user in two separate inputs, `name` and `surname`, to the API as `fullName`.

```tsx title="pages/user/create.tsx"
import { useStepsForm } from "@refinedev/mantine";
import React from "react";

const UserCreate: React.FC = () => {
  const {
    saveButtonProps,
    getInputProps,
    values,
    steps: { currentStep, gotoStep },
  } = useStepsForm({
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

  // ...
};
```

## API Reference

### Properties

<PropsTable module="@refinedev/mantine/useStepsForm"
refineCoreProps-type="[`UseFormCoreProps<TData, TError, TVariables>`](/core/docs/data/hooks/use-form/#properties)"
refineCoreProps-description="Configuration object for the core of the [useForm](/core/docs/data/hooks/use-form/)"
stepsProps-description="Configuration object for the steps. `defaultStep`: Allows you to set the initial step. `isBackValidate`: Whether to validation the current step when going back."
stepsProps-default="`defaultStep = 0` `isBackValidate = false`"
 />

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

| Property                                  | Description                                                     | Type                                                                                                                                    |
| ----------------------------------------- | --------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| steps                                     | Relevant state and method to control the steps                  | [`StepsReturnValues`](#steps)                                                                                                           |
| refineCore                                | The return values of the [`useForm`][use-form-core] in the core | [`UseFormReturnValues`](/core/docs/data/hooks/use-form/#return-values)                                                                  |
| `@mantine/form`'s `useForm` return values | See [useForm][use-form-refine-mantine] documentation            |
| overtime                                  | Overtime loading props                                          | `{ elapsedTime?: number }`                                                                                                              |
| autoSaveProps                             | Auto save props                                                 | `{ data: UpdateResponse<TData>` \| `undefined, error: HttpError` \| `null, status: "loading"` \| `"error"` \| `"idle"` \| `"success" }` |

## Example

<CodeSandboxExample path="form-mantine-use-steps-form" />

[use-form-refine-mantine]: /core/docs/ui-integrations/mantine/hooks/use-form
[use-form-core]: /core/docs/data/hooks/use-form/
[baserecord]: /core/docs/core/interface-references#baserecord
[httperror]: /core/docs/core/interface-references#httperror
