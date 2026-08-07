```tsx live url=http://localhost:3000 previewHeight=300px
setInitialRoutes(["/posts/create"]);
// visible-block-start
import { Create, useSelect, useForm } from "@refinedev/antd";
import { Form, Select } from "antd";

interface ICategory {
  id: number;
  title: string;
}

const PostCreate: React.FC = () => {
  const { formProps, saveButtonProps } = useForm<ICategory>();

  const { selectProps } = useSelect<ICategory>({
    resource: "categories",
  });

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Category"
          placeholder="Select a category"
          name={["category", "id"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select {...selectProps} />
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
          create: "posts/create",
        },
      ]}
    >
      <ReactRouter.Routes>
        <ReactRouter.Route path="posts/create" element={<PostCreate />} />
      </ReactRouter.Routes>
    </RefineAntdDemo>
  </ReactRouter.BrowserRouter>,
);
```
