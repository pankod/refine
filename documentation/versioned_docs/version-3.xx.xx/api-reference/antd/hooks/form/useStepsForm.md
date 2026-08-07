---
id: useStepsForm
title: useStepsForm
---

```tsx live shared
import { useMany } from "@pankod/refine-core";

import {
  List,
  Table,
  TextField,
  useTable,
  Space,
  EditButton,
  Select as AntdSelect,
  useStepsForm as useStepsFormAntd,
  useSelect as useSelectAntd,
  Input as AntdInput,
  Form as AntdForm,
  Steps as AntdSteps,
  SaveButton as AntdSaveButton,
  Edit as AntdEdit,
  Create as AntdCreate,
  Button as AntdButton,
} from "@pankod/refine-antd";

const PostList = () => {
  const { tableProps } = useTable<IPost>();

  const categoryIds =
    tableProps?.dataSource?.map((item) => item.category.id) ?? [];
  const { data, isLoading } = useMany({
    resource: "categories",
    ids: categoryIds,
    queryOptions: {
      enabled: categoryIds.length > 0,
    },
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="ID" />
        <Table.Column dataIndex="title" title="Title" />
        <Table.Column
          dataIndex={["category", "id"]}
          title="Category"
          render={(value) => {
            if (isLoading) {
              return <TextField value="Loading..." />;
            }

            return (
              <TextField
                value={data?.data.find((item) => item.id === value)?.title}
              />
            );
          }}
        />
        <Table.Column
          title="Actions"
          dataIndex="actions"
          render={(_, record) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};

const PostEdit = () => {
  const { current, gotoStep, stepsProps, formProps, saveButtonProps } =
    useStepsFormAntd();

  const { selectProps: categorySelectProps } = useSelectAntd({
    resource: "categories",
  });

  const formList = [
    <>
      <AntdForm.Item
        label="Title"
        name="title"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <AntdInput />
      </AntdForm.Item>
      <AntdForm.Item
        label="Category"
        name={["category", "id"]}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <AntdSelect {...categorySelectProps} />
      </AntdForm.Item>
      <AntdForm.Item
        label="Status"
        name="status"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <AntdSelect
          options={[
            {
              label: "Published",
              value: "published",
            },
            {
              label: "Draft",
              value: "draft",
            },
            {
              label: "Rejected",
              value: "rejected",
            },
          ]}
        />
      </AntdForm.Item>
    </>,
    <>
      <AntdForm.Item
        label="Content"
        name="content"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <AntdInput.TextArea />
      </AntdForm.Item>
    </>,
  ];

  return (
    <AntdEdit
      footerButtons={
        <>
          {current > 0 && (
            <AntdButton
              onClick={() => {
                gotoStep(current - 1);
              }}
            >
              Previous
            </AntdButton>
          )}
          {current < formList.length - 1 && (
            <AntdButton
              onClick={() => {
                gotoStep(current + 1);
              }}
            >
              Next
            </AntdButton>
          )}
          {current === formList.length - 1 && (
            <AntdSaveButton {...saveButtonProps} />
          )}
        </>
      }
    >
      <AntdSteps {...stepsProps}>
        <AntdSteps.Step title="About Post" />
        <AntdSteps.Step title="Content" />
      </AntdSteps>

      <AntdForm {...formProps} layout="vertical" style={{ marginTop: 30 }}>
        {formList[current]}
      </AntdForm>
    </AntdEdit>
  );
};

const PostCreate = () => {
  const { current, gotoStep, stepsProps, formProps, saveButtonProps } =
    useStepsFormAntd();

  const { selectProps: categorySelectProps } = useSelectAntd({
    resource: "categories",
  });

  const formList = [
    <>
      <AntdForm.Item
        label="Title"
        name="title"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <AntdInput />
      </AntdForm.Item>
      <AntdForm.Item
        label="Category"
        name={["category", "id"]}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <AntdSelect {...categorySelectProps} />
      </AntdForm.Item>
      <AntdForm.Item
        label="Status"
        name="status"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <AntdSelect
          options={[
            {
              label: "Published",
              value: "published",
            },
            {
              label: "Draft",
              value: "draft",
            },
            {
              label: "Rejected",
              value: "rejected",
            },
          ]}
        />
      </AntdForm.Item>
    </>,
    <>
      <AntdForm.Item
        label="Content"
        name="content"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <AntdInput.TextArea />
      </AntdForm.Item>
    </>,
  ];

  return (
    <AntdCreate
      footerButtons={
        <>
          {current > 0 && (
            <AntdButton
              onClick={() => {
                gotoStep(current - 1);
              }}
            >
              Previous
            </AntdButton>
          )}
          {current < formList.length - 1 && (
            <AntdButton
              onClick={() => {
                gotoStep(current + 1);
              }}
            >
              Next
            </AntdButton>
          )}
          {current === formList.length - 1 && (
            <AntdSaveButton {...saveButtonProps} />
          )}
        </>
      }
    >
      <AntdSteps {...stepsProps}>
        <AntdSteps.Step title="About Post" />
        <AntdSteps.Step title="Content" />
      </AntdSteps>

      <AntdForm {...formProps} layout="vertical" style={{ marginTop: 30 }}>
        {formList[current]}
      </AntdForm>
    </AntdCreate>
  );
};
```

`useStepsForm` hook allows you to split your form under an Ant Design based [Steps](https://ant.design/components/steps/) component and provides you with a few useful functionalities that will help you manage your form.

:::info
`useStepsForm` hook is extended from [`useForm`][antd-use-form] under the hood. This means that you can use all the functionalities of [`useForm`][antd-use-form] in your `useStepsForm`.
:::

## Basic Usage

We'll do two examples, one for creating and one for editing a post. Let's see how `useStepsForm` is used in both.

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
import { IResourceComponentsProps, HttpError } from "@pankod/refine-core";

import {
  Create,
  Form,
  Input,
  Select,
  Button,
  SaveButton,
  useSelect,
  useStepsForm,
  Steps,
} from "@pankod/refine-antd";

const { Step } = Steps;

const PostCreatePage: React.FC<IResourceComponentsProps> = () => {
  const { current, gotoStep, stepsProps, formProps, saveButtonProps } =
    useStepsForm<IPost, HttpError, IPost>();

  const { selectProps: categorySelectProps } = useSelect<ICategory, HttpError>({
    resource: "categories",
  });

  const formList = [
    <>
      <Form.Item
        label="Title"
        name="title"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Category"
        name={["category", "id"]}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select {...categorySelectProps} />
      </Form.Item>
      <Form.Item
        label="Status"
        name="status"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select
          options={[
            {
              label: "Published",
              value: "published",
            },
            {
              label: "Draft",
              value: "draft",
            },
            {
              label: "Rejected",
              value: "rejected",
            },
          ]}
        />
      </Form.Item>
    </>,
    <>
      <Form.Item
        label="Content"
        name="content"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input.TextArea />
      </Form.Item>
    </>,
  ];

  return (
    <Create
      footerButtons={
        <>
          {current > 0 && (
            <Button
              onClick={() => {
                gotoStep(current - 1);
              }}
            >
              Previous
            </Button>
          )}
          {current < formList.length - 1 && (
            <Button
              onClick={() => {
                gotoStep(current + 1);
              }}
            >
              Next
            </Button>
          )}
          {current === formList.length - 1 && (
            <SaveButton {...saveButtonProps} />
          )}
        </>
      }
    >
      <Steps {...stepsProps}>
        <Step title="About Post" />
        <Step title="Content" />
      </Steps>

      <Form {...formProps} layout="vertical" style={{ marginTop: 30 }}>
        {formList[current]}
      </Form>
    </Create>
  );
};

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

render(<RefineAntdDemo />);
```

</TabItem>

<TabItem value="edit">

Here is the final result of the form: We will explain the code in following sections.

```tsx live url=http://localhost:3000/posts/edit/123 previewHeight=420px hideCode
setInitialRoutes(["/posts/edit/123"]);

// visible-block-start
import React from "react";
import { IResourceComponentsProps, HttpError } from "@pankod/refine-core";

import {
  Edit,
  Form,
  Input,
  Select,
  Button,
  SaveButton,
  useSelect,
  useStepsForm,
  Steps,
} from "@pankod/refine-antd";

const { Step } = Steps;

const PostEditPage: React.FC<IResourceComponentsProps> = () => {
  const {
    current,
    gotoStep,
    stepsProps,
    formProps,
    saveButtonProps,
    queryResult,
  } = useStepsForm<IPost, HttpError, IPost>();

  const postData = queryResult?.data?.data;
  const { selectProps: categorySelectProps } = useSelect<ICategory, HttpError>({
    resource: "categories",
    defaultValue: postData?.category.id,
  });

  const formList = [
    <>
      <Form.Item
        label="Title"
        name="title"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Category"
        name={["category", "id"]}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select {...categorySelectProps} />
      </Form.Item>
      <Form.Item
        label="Status"
        name="status"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select
          options={[
            {
              label: "Published",
              value: "published",
            },
            {
              label: "Draft",
              value: "draft",
            },
            {
              label: "Rejected",
              value: "rejected",
            },
          ]}
        />
      </Form.Item>
    </>,
    <>
      <Form.Item
        label="Content"
        name="content"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input.TextArea />
      </Form.Item>
    </>,
  ];

  return (
    <Edit
      footerButtons={
        <>
          {current > 0 && (
            <Button
              onClick={() => {
                gotoStep(current - 1);
              }}
            >
              Previous
            </Button>
          )}
          {current < formList.length - 1 && (
            <Button
              onClick={() => {
                gotoStep(current + 1);
              }}
            >
              Next
            </Button>
          )}
          {current === formList.length - 1 && (
            <SaveButton {...saveButtonProps} />
          )}
        </>
      }
    >
      <Steps {...stepsProps}>
        <Step title="About Post" />
        <Step title="Content" />
      </Steps>
      <Form {...formProps} layout="vertical" style={{ marginTop: 30 }}>
        {formList[current]}
      </Form>
    </Edit>
  );
};

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

render(<RefineAntdDemo />);
```

</TabItem>

</Tabs>

For the sake of simplicity, in this example we're going to build a Post `"create"` form that consists of only a `title` and a relational `category` field.

To split your form items under a `<Steps>` component, first import and use `useStepsForm` hook in your page:

```tsx title="pages/posts/create.tsx"
import React from "react";
import { HttpError } from "@pankod/refine-core";
import { useStepsForm } from "@pankod/refine-antd";

export const PostCreate: React.FC = () => {
  const {
    current,
    gotoStep,
    stepsProps,
    formProps,
    saveButtonProps,
    queryResult,
  } = useStepsForm<IPost, HttpError, IPost>();

  return null;
};

interface ICategory {
  id: number;
}

interface IPost {
  id: number;
  title: string;
  status: "published" | "draft" | "rejected";
  category: {
    id: ICategory["id"];
  };
}
```

`useStepsForm` is generic over the type form data to help you type check your code.

This hook returns a set of useful values to render steps form. Given `current` value, you should have a way to render your form items conditionally with this index value. You can use an array to achieve this.

Here, each item of `formList` corresponds to one step in form:

```tsx title="pages/posts/create.tsx"
import React from "react";
import { HttpError } from "@pankod/refine-core";
import {
  useStepsForm,
  useSelect,
  Form,
  Input,
  Select,
} from "@pankod/refine-antd";

export const PostCreate: React.FC = () => {
  const { current, gotoStep, stepsProps, formProps, saveButtonProps } =
    useStepsForm<IPost, HttpError, IPost>();

  const { selectProps: categorySelectProps } = useSelect<ICategory, HttpError>({
    resource: "categories",
  });

  // highlight-start
  const formList = [
    <>
      <Form.Item
        label="Title"
        name="title"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
    </>,
    <>
      <Form.Item
        label="Category"
        name={["category", "id"]}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select {...categorySelectProps} />
      </Form.Item>
    </>,
  ];
  // highlight-end

  return null;
};

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
```

:::tip
Since `category` is a relational data, we use `useSelect` to fetch its data.

[Refer to `useSelect` documentation for detailed usage. &#8594](/core/docs/3.xx.xx/api-reference/antd/hooks/field/useSelect/)

:::

<br />

You should use `stepsProps` on `<Steps>` component, `formProps` on the `<Form>` component respectively. And as the last step, you should render the `<Steps>` component besides the form like this:

```tsx title="pages/posts/create.tsx"
import React from "react";
import { HttpError } from "@pankod/refine-core";
import {
  useStepsForm,
  useSelect,
  Form,
  Input,
  Select,
  // highlight-start
  Create,
  Steps,
  // highlight-end
} from "@pankod/refine-antd";

export const PostCreate: React.FC = () => {
  const {
    current,
    gotoStep,
    stepsProps,
    formProps,
    saveButtonProps,
    queryResult,
  } = useStepsForm<IPost, HttpError, IPost>();

  const { selectProps: categorySelectProps } = useSelect<ICategory, HttpError>({
    resource: "categories",
  });

  const formList = [
    <>
      <Form.Item
        label="Title"
        name="title"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
    </>,
    <>
      <Form.Item
        label="Category"
        name={["category", "id"]}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select {...categorySelectProps} />
      </Form.Item>
    </>,
  ];

  return (
    <Create saveButtonProps={saveButtonProps}>
      // highlight-start
      <Steps {...stepsProps}>
        <Step title="About Post" />
        <Step title="Content" />
      </Steps>
      <Form {...formProps} layout="vertical">
        {formList[current]}
      </Form>
      // highlight-end
    </Create>
  );
};

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
```

:::danger Important
Make sure to add as much `<Steps.Step>` components as the number of steps in the `formList` array.
:::

<br />

To help users navigate between steps in the form, you can use action buttons. Your navigation buttons should use the `gotoStep` function that was previously returned from the `useStepsForm` hook.

```tsx title="pages/posts/create.tsx"
import React from "react";
import { HttpError } from "@pankod/refine-core";
import {
  useStepsForm,
  useSelect,
  Form,
  Input,
  Select,
  Create,
  Steps,
  // highlight-start
  Button,
  SaveButton,
  // highlight-end
} from "@pankod/refine-antd";

export const PostCreate: React.FC = () => {
  const {
    current,
    gotoStep,
    stepsProps,
    formProps,
    saveButtonProps,
    queryResult,
    submit,
  } = useStepsForm<IPost, HttpError, IPost>();

  const { selectProps: categorySelectProps } = useSelect<ICategory, HttpError>({
    resource: "categories",
  });

  const formList = [
    <>
      <Form.Item
        label="Title"
        name="title"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
    </>,
    <>
      <Form.Item
        label="Category"
        name={["category", "id"]}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select {...categorySelectProps} />
      </Form.Item>
    </>,
  ];

  return (
    <Create
      // highlight-start
      footerButtons={
        <>
          {current > 0 && (
            <Button
              onClick={() => {
                gotoStep(current - 1);
              }}
            >
              Previous
            </Button>
          )}
          {current < formList.length - 1 && (
            <Button
              onClick={() => {
                gotoStep(current + 1);
              }}
            >
              Next
            </Button>
          )}
          {current === formList.length - 1 && (
            <SaveButton
              {...saveButtonProps}
              style={{ marginRight: 10 }}
              onClick={() => submit()}
            />
          )}
        </>
      }
      // highlight-end
    >
      <Steps {...stepsProps}>
        <Step title="About Post" />
        <Step title="Content" />
      </Steps>
      <Form {...formProps} layout="vertical">
        {formList[current]}
      </Form>
    </Create>
  );
};

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
```

<br/>

## Properties

:::tip
All [`useForm`](/core/docs/3.xx.xx/api-reference/antd/hooks/form/useForm) props also available in `useStepsForm`. You can find descriptions on [`useForm`](/core/docs/3.xx.xx/api-reference/antd/hooks/form/useForm/#properties) docs.
:::

### `defaultCurrent`

> Default: `0`

Sets the default starting step number. Counting starts from `0`.

```tsx
const stepsForm = useStepsForm({
  defaultCurrent: 2,
});
```

### `total`

Maximum number of steps. `<Steps>` cannot go beyond this number.

```tsx
const stepsForm = useStepsForm({
  total: 3,
});
```

### `isBackValidate`

> Default: `false`

When is `true`, validates a form fields when the user navigates to a previous step.

```tsx
const stepsForm = useStepsForm({
  isBackValidate: true,
});
```

<br/>

## Return Values

:::tip
All [`useForm`](/core/docs/3.xx.xx/api-reference/antd/hooks/form/useForm) return values also available in `useStepsForm`. You can find descriptions on [`useForm`](/core/docs/3.xx.xx/api-reference/antd/hooks/form/useForm/#return-values) docs.
:::

### `stepsProps`

The props needed by the `<Steps>` component.

#### `current`

Current step, counting from `0`.

#### `onChange`

Callback function that is trigger when the current step of the form changes. The function takes in one argument, `currentStep`, which is a number representing the index of the current step.

### `current`

Current step, counting from `0`.

### `gotoStep`

Is a function that allows you to programmatically change the current step of a form.
It takes in one argument, step, which is a number representing the index of the step you want to navigate to.

### `submit`

A function that can submit the form. It's useful when you want to submit the form manually.

### `defaultFormValuesLoading`

When `action` is `"edit"` or `"clone"`, `useStepsForm` will fetch the data from the API and set it as default values. This prop is `true` when the data is being fetched.

<br/>

## FAQ

### How can I change the form data before submitting it to the API?

You may need to modify the form data before it is sent to the API.

For example, Let's send the values we received from the user in two separate inputs, `name` and `surname`, to the API as `fullName`. We can do this by overriding the `submit` function.

```tsx title="pages/user/create.tsx"
// --
useStepsForm({
  submit: (formValues) => {
    // highlight-start
    const data = {
      fullName: `${formValues.name} ${formValues.surname}`,
      age: formValues.age,
      city: formValues.city,
    };
    onFinish(data as any);
    // highlight-end
  },
});
// --
```

<br/>

## API Reference

### Properties

<PropsTable module="@pankod/refine-antd/useStepsForm"/>

> `*`: These props have default values in `RefineContext` and can also be set on **<[Refine](/core/docs/3.xx.xx/api-reference/core/components/refine-config)>** component. `useModalForm` will use what is passed to `<Refine>` as default but a local value will override it.

> `**`: If not explicitly configured, default value of `redirect` depends on which `action` used. If `action` is `create`, `redirect`s default value is `edit` (created resources edit page). if `action` is `edit` instead, `redirect`s default value is `list`.

### Return Values

| Key                      | Description                                                  | Type                                                                               |
| ------------------------ | ------------------------------------------------------------ | ---------------------------------------------------------------------------------- |
| stepsProps               | Ant Design steps props                                       | [`StepsProps`](https://ant.design/components/steps/#API)                           |
| current                  | Current step, counting from 0.                               | `number`                                                                           |
| gotoStep                 | Go to the target step                                        | `(step: number) => void`                                                           |
| formProps                | Ant Design form props                                        | [`FormProps`](/core/docs/3.xx.xx/api-reference/antd/hooks/form/useForm/#formprops) |
| form                     | Ant Design form instance                                     | [`FormInstance<TVariables>`](https://ant.design/components/form/#FormInstance)     |
| defaultFormValuesLoading | DefaultFormValues loading status of form                     | `boolean`                                                                          |
| submit                   | Submit method, the parameter is the value of the form fields | `() => void`                                                                       |

### Type Parameters

| Property   | Desription                                                       | Default                    |
| ---------- | ---------------------------------------------------------------- | -------------------------- |
| TData      | Result data of the query that extends [`BaseRecord`][baserecord] | [`BaseRecord`][baserecord] |
| TError     | Custom error object that extends [`HttpError`][httperror]        | [`HttpError`][httperror]   |
| TVariables | Values for params.                                               | `{}`                       |

## Example

<CodeSandboxExample path="form-antd-use-steps-form" />

[baserecord]: /core/docs/3.xx.xx/api-reference/core/interfaces#baserecord
[httperror]: /core/docs/3.xx.xx/api-reference/core/interfaces#httperror
[antd-use-form]: /core/docs/3.xx.xx/api-reference/antd/hooks/form/useForm
