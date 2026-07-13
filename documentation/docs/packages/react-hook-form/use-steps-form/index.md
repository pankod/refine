---
title: "useStepsForm Hook | Usage & Patterns in Refine v5"
display_title: "useStepsForm"
sidebar_label: "useStepsForm"
description: "Secure Use Steps Form in Refine v5. Learn best practices. Learn best practices for values and data for real-world React admin panels."
---

```css live shared
body {
  background: white;
}
```

```tsx live shared
import {
  useMany,
  useNavigation,
  useSelect as useSelectShared,
  useTable,
} from "@refinedev/core";
import { useStepsForm as useStepsFormShared } from "@refinedev/react-hook-form";

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
  const { edit, create } = useNavigation();

  const categoryIds = result?.data.map((item) => item.category.id) ?? [];

  const { result: categoryResult, isLoading } = useMany<ICategory>({
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
          {result?.data.map((post) => (
            <tr key={post.id}>
              <td>{post.id}</td>
              <td>{post.title}</td>
              <td>
                {isLoading
                  ? "Loading"
                  : categoryResult?.data?.find(
                      (item) => item.id == post.category.id,
                    )?.title}
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
    refineCore: { onFinish, formLoading, query },
    register,
    handleSubmit,
    formState: { errors },
    steps: { currentStep, gotoStep },
  } = useStepsFormShared<IPost, HttpError, IPost>();

  const { options } = useSelectShared({
    resource: "categories",
    defaultValue: query?.data?.data.category.id,
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
              defaultValue={query?.data?.data.category.id}
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

`useStepsForm` hook is extended from [`useForm`][refine-react-hook-form-use-form] from the [`@refinedev/react-hook-form`][@refinedev/react-hook-form] package. This means you can use all the features of [`useForm`][refine-react-hook-form-use-form].

## Usage

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
import { HttpError, useSelect } from "@refinedev/core";
import { useStepsForm } from "@refinedev/react-hook-form";

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

render(
  <ReactRouter.BrowserRouter>
    <RefineHeadlessDemo
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
        <ReactRouter.Route path="/posts" element={<PostList />} />
        <ReactRouter.Route path="/posts/create" element={<PostCreate />} />
        <ReactRouter.Route path="/posts/edit/:id" element={<PostEdit />} />
      </ReactRouter.Routes>
    </RefineHeadlessDemo>
  </ReactRouter.BrowserRouter>,
);
```

</TabItem>

<TabItem value="edit">

Here is the final result of the form: We will explain the code in following sections.

```tsx live url=http://localhost:3000/posts/edit/123 previewHeight=420px hideCode
setInitialRoutes(["/posts/edit/123"]);

// visible-block-start
import { HttpError, useSelect } from "@refinedev/core";
import { useStepsForm } from "@refinedev/react-hook-form";

const stepTitles = ["Title", "Status", "Category and content"];

const PostEditPage: React.FC = () => {
  const {
    refineCore: { onFinish, formLoading, query },
    register,
    handleSubmit,
    formState: { errors },
    steps: { currentStep, gotoStep },
  } = useStepsForm<IPost, HttpError, IPost>();

  const { options } = useSelect<ICategory, HttpError>({
    resource: "categories",
    defaultValue: query?.data?.data.category.id,
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
              defaultValue={query?.data?.data.category.id}
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

render(
  <ReactRouter.BrowserRouter>
    <RefineHeadlessDemo
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
        <ReactRouter.Route path="/posts" element={<PostList />} />
        <ReactRouter.Route path="/posts/create" element={<PostCreate />} />
        <ReactRouter.Route path="/posts/edit/:id" element={<PostEdit />} />
      </ReactRouter.Routes>
    </RefineHeadlessDemo>
  </ReactRouter.BrowserRouter>,
);
```

</TabItem>

</Tabs>

In this example we're going to build a Post `"create"` form. We also added a relational category field to expand our example.

To split your `<input/>` components under a `<form/>` component, first import and use `useStepsForm` hook in your page:

```tsx
import { HttpError } from "@refinedev/core";
import { useStepsForm } from "@refinedev/react-hook-form";

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
import { HttpError, useSelect } from "@refinedev/core";
import { useStepsForm } from "@refinedev/react-hook-form";

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

:::simple Relational Data

Since `category` is a relational data, we use `useSelect` to fetch its data.

[Refer to `useSelect` documentation for detailed usage. &#8594](/core/docs/ui-integrations/ant-design/hooks/use-select/)

:::

Now, we can use `renderFormByStep` function to render the form items based on the `currentStep` and `gotoStep` function to navigate between steps.

```tsx
import { HttpError, useSelect } from "@refinedev/core";
import { useStepsForm } from "@refinedev/react-hook-form";

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

### refineCoreProps

All [`useForm`](/core/docs/ui-integrations/ant-design/hooks/use-form/) properties also available in `useStepsForm`. You can find descriptions on [`useForm`](/core/docs/ui-integrations/ant-design/hooks/use-form/#return-values) docs.

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

The props needed by the manage state steps.

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

When is `true`, validates a form fields when the user navigates to a previous step. Default is `false`.

```tsx
const stepsForm = useStepsForm({
  stepsProps: {
    isBackValidate: true,
  },
});
```

### autoSave

If you want to save the form automatically after some delay when user edits the form, you can pass true to `autoSave.enabled` prop.

By default the `autoSave` feature does not invalidate queries. However, you can use the `invalidateOnUnmount` prop to invalidate queries upon unmount.

It also supports `onMutationSuccess` and `onMutationError` callback functions. You can use `isAutoSave` parameter to determine whether the mutation is triggered by `autoSave` or not.

`autoSave` feature operates exclusively in `edit` mode. Users can take advantage of this feature while editing data, as changes are automatically saved in editing mode. However, when creating new data, manual saving is still required.

`onMutationSuccess` and `onMutationError` callbacks will be called after the mutation is successful or failed.

#### enabled

To enable the `autoSave` feature, set the `enabled` parameter to `true`. By default, it is set to `false`.

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

Set the debounce time for the `autoSave` prop. By default, it is set to `1000` milliseconds.

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

#### onFinish

If you want to modify the data before sending it to the server, you can use `onFinish` callback function.

```tsx
useStepsForm({
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

This prop is useful when you want to invalidate the `list`, `many` and `detail` queries from the current resource when the hook is unmounted. By default, it invalidates the `list`, `many` and `detail` queries associated with the current resource. Also, You can use the `invalidates` prop to select which queries to invalidate. By default, it is set to `false`.

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

All [`useForm`](/core/docs/packages/list-of-packages/) return values also available in `useStepsForm`. You can find descriptions on [`useForm`](/core/docs/packages/list-of-packages/#return-values) docs.

### steps

The return values needed by the manage state steps.

#### currentStep

Current step, counting from `0`.

#### gotoStep

Is a function that allows you to programmatically change the current step of a form.
It takes in one argument, step, which is a number representing the index of the step you want to navigate to.

## API Reference

### Properties

<PropsTable module="@refinedev/react-hook-form/useStepsForm" />

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
| steps                         | Relevant state and method to control the steps                  | [`StepsReturnValues`](#steps)                                          |
| refineCore                    | The return values of the [`useForm`][use-form-core] in the core | [`UseFormReturnValues`](/core/docs/data/hooks/use-form/#return-values) |
| React Hook Form Return Values | See [React Hook Form][react-hook-form-use-form] documentation   |

## Example

<CodeSandboxExample path="form-react-hook-form-use-steps-form" />

[@refinedev/react-hook-form]: https://github.com/refinedev/refine/tree/main/packages/react-hook-form
[refine-react-hook-form-use-form]: /core/docs/packages/list-of-packages
[react-hook-form-use-form]: https://react-hook-form.com/api/useform
[use-form-core]: /core/docs/data/hooks/use-form/
[baserecord]: /core/docs/core/interface-references#baserecord
[httperror]: /core/docs/core/interface-references#httperror
