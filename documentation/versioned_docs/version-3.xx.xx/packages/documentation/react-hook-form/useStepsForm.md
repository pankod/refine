---
id: useStepsForm
title: useStepsForm
---

```css live shared
body {
  background: white;
}
```

```tsx live shared
import { useTable, useNavigation, useMany } from "@pankod/refine-core";
import {
  useSelect as useSelectShared,
  HttpError as httpErrorShared,
} from "@pankod/refine-core";
import { useStepsForm as useStepsFormShared } from "@pankod/refine-react-hook-form";

interface ICategory {
  id: number;
  title: string;
}

interface IPost {
  id: number;
  title: string;
  content: string;
  status: "published" | "draft" | "rejected";
  category: {
    id: ICategory["id"];
  };
}

const stepTitlesShared = ["Title", "Status", "Category and content"];

const PostList: React.FC = () => {
  const { tableQueryResult } = useTable<IPost>({
    initialSorter: [
      {
        field: "id",
        order: "desc",
      },
    ],
  });
  const { edit, create } = useNavigation();

  const categoryIds =
    tableQueryResult?.data?.data.map((item) => item.category.id) ?? [];
  const { data, isLoading } = useMany<ICategory>({
    resource: "categories",
    ids: categoryIds,
    queryOptions: {
      enabled: categoryIds.length > 0,
    },
  });

  return (
    <div>
      <button onClick={() => create("posts")}>Create Post</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Category</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tableQueryResult.data?.data.map((post) => (
            <tr key={post.id}>
              <td>{post.id}</td>
              <td>{post.title}</td>
              <td>
                {isLoading
                  ? "Loading"
                  : data?.data.find((item) => item.id == post.category.id)
                      ?.title}
              </td>
              <td>{post.status}</td>
              <td>
                <button onClick={() => edit("posts", post.id)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const PostCreate: React.FC = () => {
  const {
    refineCore: { onFinish, formLoading },
    register,
    handleSubmit,
    formState: { errors },
    steps: { currentStep, gotoStep },
  } = useStepsFormShared<IPost, HttpError, IPost>();

  const { options } = useSelectShared({
    resource: "categories",
  });

  const renderFormByStep = (step: number) => {
    switch (step) {
      case 0:
        return (
          <>
            <label>Title: </label>
            <input
              {...register("title", {
                required: "This field is required",
              })}
            />
            {errors.title && <span>{errors.title.message}</span>}
          </>
        );
      case 1:
        return (
          <>
            <label>Status: </label>
            <select {...register("status")}>
              <option value="published">published</option>
              <option value="draft">draft</option>
              <option value="rejected">rejected</option>
            </select>
          </>
        );
      case 2:
        return (
          <>
            <label>Category: </label>
            <select
              {...register("category.id", {
                required: "This field is required",
              })}
            >
              {options?.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
            {errors.category && <span>{errors.category.message}</span>}
            <br />
            <br />
            <label>Content: </label>
            <textarea
              {...register("content", {
                required: "This field is required",
              })}
              rows={10}
              cols={50}
            />
            {errors.content && <span>{errors.content.message}</span>}
          </>
        );
    }
  };

  if (formLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", gap: 36 }}>
        {stepTitlesShared.map((title, index) => (
          <button
            key={index}
            onClick={() => gotoStep(index)}
            style={{
              backgroundColor: currentStep === index ? "lightgray" : "initial",
            }}
          >
            {index + 1} - {title}
          </button>
        ))}
      </div>
      <form autoComplete="off">{renderFormByStep(currentStep)}</form>
      <div style={{ display: "flex", gap: 8 }}>
        {currentStep > 0 && (
          <button
            onClick={() => {
              gotoStep(currentStep - 1);
            }}
          >
            Previous
          </button>
        )}
        {currentStep < stepTitlesShared.length - 1 && (
          <button
            onClick={() => {
              gotoStep(currentStep + 1);
            }}
          >
            Next
          </button>
        )}
        {currentStep === stepTitlesShared.length - 1 && (
          <button onClick={handleSubmit(onFinish)}>Save</button>
        )}
      </div>
    </div>
  );
};

const PostEdit: React.FC = () => {
  const {
    refineCore: { onFinish, formLoading, queryResult },
    register,
    handleSubmit,
    formState: { errors },
    steps: { currentStep, gotoStep },
  } = useStepsFormShared<IPost, HttpError, IPost>();

  const { options } = useSelectShared({
    resource: "categories",
    defaultValue: queryResult?.data?.data.category.id,
  });

  const renderFormByStep = (step: number) => {
    switch (step) {
      case 0:
        return (
          <>
            <label>Title: </label>
            <input
              {...register("title", {
                required: "This field is required",
              })}
            />
            {errors.title && <span>{errors.title.message}</span>}
          </>
        );
      case 1:
        return (
          <>
            <label>Status: </label>
            <select {...register("status")}>
              <option value="published">published</option>
              <option value="draft">draft</option>
              <option value="rejected">rejected</option>
            </select>
          </>
        );
      case 2:
        return (
          <>
            <label>Category: </label>
            <select
              {...register("category.id", {
                required: "This field is required",
              })}
              defaultValue={queryResult?.data?.data.category.id}
            >
              {options?.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
            {errors.category && <span>{errors.category.message}</span>}
            <br />
            <br />
            <label>Content: </label>
            <textarea
              {...register("content", {
                required: "This field is required",
              })}
              rows={10}
              cols={50}
            />
            {errors.content && <span>{errors.content.message}</span>}
          </>
        );
    }
  };

  if (formLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", gap: 36 }}>
        {stepTitlesShared.map((title, index) => (
          <button
            key={index}
            onClick={() => gotoStep(index)}
            style={{
              backgroundColor: currentStep === index ? "lightgray" : "initial",
            }}
          >
            {index + 1} - {title}
          </button>
        ))}
      </div>
      <form autoComplete="off">{renderFormByStep(currentStep)}</form>
      <div style={{ display: "flex", gap: 8 }}>
        {currentStep > 0 && (
          <button
            onClick={() => {
              gotoStep(currentStep - 1);
            }}
          >
            Previous
          </button>
        )}
        {currentStep < stepTitlesShared.length - 1 && (
          <button
            onClick={() => {
              gotoStep(currentStep + 1);
            }}
          >
            Next
          </button>
        )}
        {currentStep === stepTitlesShared.length - 1 && (
          <button onClick={handleSubmit(onFinish)}>Save</button>
        )}
      </div>
    </div>
  );
};
```

`useStepsForm` allows you to manage a form with multiple steps. It provides features such as which step is currently active, the ability to go to a specific step and validation when changing steps etc.

:::info
`useStepsForm` hook is extended from [`useForm`][refine-react-hook-form-use-form] from the [`@pankod/refine-react-hook-form`][@pankod/refine-react-hook-form] package. This means you can use all the features of [`useForm`][refine-react-hook-form-use-form].
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
import { useSelect, HttpError } from "@pankod/refine-core";
import { useStepsForm } from "@pankod/refine-react-hook-form";

const stepTitles = ["Title", "Status", "Category and content"];

const PostCreatePage: React.FC = () => {
  const {
    refineCore: { onFinish, formLoading },
    register,
    handleSubmit,
    formState: { errors },
    steps: { currentStep, gotoStep },
  } = useStepsForm<IPost, HttpError, IPost>();

  const { options } = useSelect<ICategory, HttpError>({
    resource: "categories",
  });

  const renderFormByStep = (step: number) => {
    switch (step) {
      case 0:
        return (
          <>
            <label>Title: </label>
            <input
              {...register("title", {
                required: "This field is required",
              })}
            />
            {errors.title && <span>{errors.title.message}</span>}
          </>
        );
      case 1:
        return (
          <>
            <label>Status: </label>
            <select {...register("status")}>
              <option value="published">published</option>
              <option value="draft">draft</option>
              <option value="rejected">rejected</option>
            </select>
          </>
        );
      case 2:
        return (
          <>
            <label>Category: </label>
            <select
              {...register("category.id", {
                required: "This field is required",
              })}
            >
              {options?.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
            {errors.category && <span>{errors.category.message}</span>}
            <br />
            <br />
            <label>Content: </label>
            <textarea
              {...register("content", {
                required: "This field is required",
              })}
              rows={10}
              cols={50}
            />
            {errors.content && <span>{errors.content.message}</span>}
          </>
        );
    }
  };

  if (formLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", gap: 36 }}>
        {stepTitles.map((title, index) => (
          <button
            key={index}
            onClick={() => gotoStep(index)}
            style={{
              backgroundColor: currentStep === index ? "lightgray" : "initial",
            }}
          >
            {index + 1} - {title}
          </button>
        ))}
      </div>
      <form autoComplete="off">{renderFormByStep(currentStep)}</form>
      <div style={{ display: "flex", gap: 8 }}>
        {currentStep > 0 && (
          <button
            onClick={() => {
              gotoStep(currentStep - 1);
            }}
          >
            Previous
          </button>
        )}
        {currentStep < stepTitles.length - 1 && (
          <button
            onClick={() => {
              gotoStep(currentStep + 1);
            }}
          >
            Next
          </button>
        )}
        {currentStep === stepTitles.length - 1 && (
          <button onClick={handleSubmit(onFinish)}>Save</button>
        )}
      </div>
    </div>
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
  category: {
    id: ICategory["id"];
  };
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

render(<RefineHeadlessDemo />);
```

</TabItem>

<TabItem value="edit">

Here is the final result of the form: We will explain the code in following sections.

```tsx live url=http://localhost:3000/posts/edit/123 previewHeight=420px hideCode
setInitialRoutes(["/posts/edit/123"]);

// visible-block-start
import { useSelect, HttpError } from "@pankod/refine-core";
import { useStepsForm } from "@pankod/refine-react-hook-form";

const stepTitles = ["Title", "Status", "Category and content"];

const PostEditPage: React.FC = () => {
  const {
    refineCore: { onFinish, formLoading, queryResult },
    register,
    handleSubmit,
    formState: { errors },
    steps: { currentStep, gotoStep },
  } = useStepsForm<IPost, HttpError, IPost>();

  const { options } = useSelect<ICategory, HttpError>({
    resource: "categories",
    defaultValue: queryResult?.data?.data.category.id,
  });

  const renderFormByStep = (step: number) => {
    switch (step) {
      case 0:
        return (
          <>
            <label>Title: </label>
            <input
              {...register("title", {
                required: "This field is required",
              })}
            />
            {errors.title && <span>{errors.title.message}</span>}
          </>
        );
      case 1:
        return (
          <>
            <label>Status: </label>
            <select {...register("status")}>
              <option value="published">published</option>
              <option value="draft">draft</option>
              <option value="rejected">rejected</option>
            </select>
          </>
        );
      case 2:
        return (
          <>
            <label>Category: </label>
            <select
              {...register("category.id", {
                required: "This field is required",
              })}
              defaultValue={queryResult?.data?.data.category.id}
            >
              {options?.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
            {errors.category && <span>{errors.category.message}</span>}
            <br />
            <br />
            <label>Content: </label>
            <textarea
              {...register("content", {
                required: "This field is required",
              })}
              rows={10}
              cols={50}
            />
            {errors.content && <span>{errors.content.message}</span>}
          </>
        );
    }
  };

  if (formLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", gap: 36 }}>
        {stepTitles.map((title, index) => (
          <button
            key={index}
            onClick={() => gotoStep(index)}
            style={{
              backgroundColor: currentStep === index ? "lightgray" : "initial",
            }}
          >
            {index + 1} - {title}
          </button>
        ))}
      </div>
      <form autoComplete="off">{renderFormByStep(currentStep)}</form>
      <div style={{ display: "flex", gap: 8 }}>
        {currentStep > 0 && (
          <button
            onClick={() => {
              gotoStep(currentStep - 1);
            }}
          >
            Previous
          </button>
        )}
        {currentStep < stepTitles.length - 1 && (
          <button
            onClick={() => {
              gotoStep(currentStep + 1);
            }}
          >
            Next
          </button>
        )}
        {currentStep === stepTitles.length - 1 && (
          <button onClick={handleSubmit(onFinish)}>Save</button>
        )}
      </div>
    </div>
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
  category: {
    id: ICategory["id"];
  };
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

render(<RefineHeadlessDemo />);
```

</TabItem>

</Tabs>

In this example we're going to build a Post `"create"` form. We also added a relational category field to expand our example.

To split your `<input/>` components under a `<form/>` component, first import and use `useStepsForm` hook in your page:

```tsx
import { HttpError, useSelect } from "@pankod/refine-core";
import { useStepsForm } from "@pankod/refine-react-hook-form";

const PostCreate = () => {
  const {
    refineCore: { onFinish, formLoading },
    register,
    handleSubmit,
    formState: { errors },
    steps: { currentStep, gotoStep },
  } = useStepsForm<IPost, HttpError, IPost>();

  return <div>...</div>;
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
  category: {
    id: ICategory["id"];
  };
}
```

`useStepsForm` is generic over the type form data to help you type check your code.

This hook returns a set of useful values to render steps form. Given current value, you should have a way to render your form items conditionally with this index value.

Here, we're going to use a `switch` statement to render the form items based on the `currentStep`.

```tsx
import { HttpError, useSelect } from "@pankod/refine-core";
import { useStepsForm } from "@pankod/refine-react-hook-form";

const PostCreate = () => {
  const {
    refineCore: { onFinish, formLoading },
    register,
    handleSubmit,
    formState: { errors },
    steps: { currentStep, gotoStep },
  } = useStepsForm<IPost, HttpError, IPost>();

  const { options } = useSelect<ICategory, HttpError>({
    resource: "categories",
  });

  // highlight-start
  const renderFormByStep = (step: number) => {
    switch (step) {
      case 0:
        return (
          <>
            <label>Title: </label>
            <input
              {...register("title", {
                required: "This field is required",
              })}
            />
            {errors.title && <span>{errors.title.message}</span>}
          </>
        );
      case 1:
        return (
          <>
            <label>Status: </label>
            <select {...register("status")}>
              <option value="published">published</option>
              <option value="draft">draft</option>
              <option value="rejected">rejected</option>
            </select>
          </>
        );
      case 2:
        return (
          <>
            <label>Category: </label>
            <select
              {...register("category.id", {
                required: "This field is required",
              })}
            >
              {options?.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
            {errors.category && <span>{errors.category.message}</span>}
            <br />
            <br />
            <label>Content: </label>
            <textarea
              {...register("content", {
                required: "This field is required",
              })}
              rows={10}
              cols={50}
            />
            {errors.content && <span>{errors.content.message}</span>}
          </>
        );
    }
  };
  // highlight-end

  return <div>...</div>;
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
  category: {
    id: ICategory["id"];
  };
}
```

:::tip
Since `category` is a relational data, we use `useSelect` to fetch its data.

[Refer to `useSelect` documentation for detailed usage. &#8594](/core/docs/3.xx.xx/api-reference/antd/hooks/field/useSelect/)

:::

Now, we can use `renderFormByStep` function to render the form items based on the `currentStep` and `gotoStep` function to navigate between steps.

```tsx
import { HttpError, useSelect } from "@pankod/refine-core";
import { useStepsForm } from "@pankod/refine-react-hook-form";

const PostCreate = () => {
  const {
    refineCore: { onFinish, formLoading },
    register,
    handleSubmit,
    formState: { errors },
    steps: { currentStep, gotoStep },
  } = useStepsForm<IPost, HttpError, IPost>();

  const { options } = useSelect<ICategory, HttpError>({
    resource: "categories",
  });

  const renderFormByStep = (step: number) => {
    switch (step) {
      case 0:
        return (
          <>
            <label>Title: </label>
            <input
              {...register("title", {
                required: "This field is required",
              })}
            />
            {errors.title && <span>{errors.title.message}</span>}
          </>
        );
      case 1:
        return (
          <>
            <label>Status: </label>
            <select {...register("status")}>
              <option value="published">published</option>
              <option value="draft">draft</option>
              <option value="rejected">rejected</option>
            </select>
          </>
        );
      case 2:
        return (
          <>
            <label>Category: </label>
            <select
              {...register("category.id", {
                required: "This field is required",
              })}
            >
              {options?.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
            {errors.category && <span>{errors.category.message}</span>}
            <br />
            <br />
            <label>Content: </label>
            <textarea
              {...register("content", {
                required: "This field is required",
              })}
              rows={10}
              cols={50}
            />
            {errors.content && <span>{errors.content.message}</span>}
          </>
        );
    }
  };

  // highlight-start
  if (formLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", gap: 36 }}>
        {stepTitles.map((title, index) => (
          <button
            key={index}
            onClick={() => gotoStep(index)}
            style={{
              backgroundColor: currentStep === index ? "lightgray" : "initial",
            }}
          >
            {index + 1} - {title}
          </button>
        ))}
      </div>
      <form autoComplete="off">{renderFormByStep(currentStep)}</form>
      <div style={{ display: "flex", gap: 8 }}>
        {currentStep > 0 && (
          <button
            onClick={() => {
              gotoStep(currentStep - 1);
            }}
          >
            Previous
          </button>
        )}
        {currentStep < stepTitles.length - 1 && (
          <button
            onClick={() => {
              gotoStep(currentStep + 1);
            }}
          >
            Next
          </button>
        )}
        {currentStep === stepTitles.length - 1 && (
          <button onClick={handleSubmit(onFinish)}>Save</button>
        )}
      </div>
    </div>
  );
  // highlight-end
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
  category: {
    id: ICategory["id"];
  };
}
```

## Properties

### `refineCoreProps`

All [`useForm`](/core/docs/3.xx.xx/api-reference/antd/hooks/form/useForm) properties also available in `useStepsForm`. You can find descriptions on [`useForm`](/core/docs/3.xx.xx/api-reference/antd/hooks/form/useForm/#return-values) docs.

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

The props needed by the manage state steps.

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
All [`useForm`](/core/docs/3.xx.xx/packages/documentation/react-hook-form/useForm/) return values also available in `useStepsForm`. You can find descriptions on [`useForm`](/core/docs/3.xx.xx/packages/documentation/react-hook-form/useForm/#return-values) docs.
:::

### `steps`

The return values needed by the manage state steps.

#### `currenStep`

Current step, counting from `0`.

#### `gotoStep`

Is a function that allows you to programmatically change the current step of a form.
It takes in one argument, step, which is a number representing the index of the step you want to navigate to.

## API Reference

### Properties

<PropsTable module="@pankod/refine-react-hook-form/useStepsForm" />

> `*`: These properties have default values in `RefineContext` and can also be set on the **<[Refine](/core/docs/3.xx.xx/api-reference/core/components/refine-config)>** component.

:::tip External Props
It also accepts all props of [useForm](https://react-hook-form.com/api/useform) hook available in the [React Hook Form](https://react-hook-form.com/).
:::

### Return values

| Property                      | Description                                                     | Type                                                                                       |
| ----------------------------- | --------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| steps                         | Relevant state and method to control the steps                  | [`StepsReturnValues`](#steps)                                                              |
| refineCore                    | The return values of the [`useForm`][use-form-core] in the core | [`UseFormReturnValues`](/core/docs/3.xx.xx/api-reference/core/hooks/useForm#return-values) |
| React Hook Form Return Values | See [React Hook Form][react-hook-form-use-form] documentation   |

## Example

<CodeSandboxExample path="form-react-hook-form-use-steps-form" />

[@pankod/refine-react-hook-form]: https://github.com/refinedev/refine/tree/v3/packages/react-hook-form
[refine-react-hook-form-use-form]: /core/docs/3.xx.xx/packages/documentation/react-hook-form/useForm
[react-hook-form-use-form]: https://react-hook-form.com/api/useform
[use-form-core]: /core/docs/3.xx.xx/api-reference/core/hooks/useForm

```

```
