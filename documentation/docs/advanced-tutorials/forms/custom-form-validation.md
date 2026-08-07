---
id: custom-form-validation
title: "Custom Form Validation Tutorial | Best Practices in Refine v5"
display_title: "Custom Form Validation"
sidebar_label: "Custom Form Validation"
description: "Secure Custom Form Validation in Refine v5. Learn best practices. Explore production tips for validation, schemas for production-ready workflows."
---

In **Refine**, we can use the form validation that comes with `Ant Design` with the [rules](https://ant.design/components/form/#Rule) property of the [Form.Item](https://ant.design/components/form/#Form.Item) component.

```tsx
<Form>
  <Form.Item
    label="Title"
    name="title"
    // highlight-start
    rules={[
      {
        required: true,
      },
      {
        min: 5,
      },
    ]}
    // highlight-end
  >
    <Input />
  </Form.Item>
  ...
</Form>
```

In addition to pre-defined rules, we can also prepare **custom rules** with the validator function.

### Example

Now let's prepare a rule that checks if the titles of the posts are unique. We have an endpoint like the below. We will do the uniqueness check here.

```json title="https://api.fake-rest.refine.dev/posts-unique-check?title=Example"
{
  "isAvailable": true
}
```

```tsx live hideCode url=http://localhost:3000/posts/create
setInitialRoutes(["/posts/create"]);

// visible-block-start
import { useForm, Create, CreateButton } from "@refinedev/antd";
import { Form, Input } from "antd";
// highlight-next-line
import { useApiUrl, useCustom, HttpError } from "@refinedev/core";

// highlight-start
interface IPost {
  title: string;
}

interface PostUniqueCheckResponse {
  isAvailable: boolean;
}

interface PostUniqueCheckRequestQuery {
  title: string;
}
// highlight-end

const PostCreate: React.FC = () => {
  const { formProps, saveButtonProps } = useForm<IPost>({
    defaultFormValues: {
      title: "Test",
    },
  });

  // highlight-next-line
  const [title, setTitle] = useState("Test");

  // highlight-start
  const apiUrl = useApiUrl();
  const url = `${apiUrl}/posts-unique-check`;
  const { refetch } = useCustom<
    PostUniqueCheckResponse,
    HttpError,
    PostUniqueCheckRequestQuery
  >({
    url,
    method: "get",
    config: {
      query: {
        title,
      },
    },
    queryOptions: {
      enabled: false,
    },
  });
  // highlight-end

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Title"
          name="title"
          // highlight-start
          rules={[
            {
              required: true,
            },
            {
              validator: async (_, value) => {
                if (!value)
                  return Promise.reject(new Error("Please enter a title"));
                const { data } = await refetch();
                if (data && data.data.isAvailable) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("'title' must be unique"));
              },
            },
          ]}
          // highlight-end
        >
          <Input
            defaultValue="Test"
            // highlight-next-line
            onChange={(event) => setTitle(event.target.value)}
          />
        </Form.Item>
      </Form>
    </Create>
  );
};
// visible-block-end

render(
  <ReactRouter.BrowserRouter>
    <RefineAntdDemo
      resources={[
        {
          name: "posts",
          list: "/posts",
          create: "/posts/create",
        },
      ]}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route
          path="/posts"
          element={
            <div>
              <p>This page is empty.</p>
              <CreateButton />
            </div>
          }
        />
        <ReactRouter.Route path="/posts/create" element={<PostCreate />} />
      </ReactRouter.Routes>
    </RefineAntdDemo>
  </ReactRouter.BrowserRouter>,
);
```

:::danger important

Value must be kept in the state.

```tsx
<Input onChange={(event) => setTitle(event.target.value)} />
```

:::
