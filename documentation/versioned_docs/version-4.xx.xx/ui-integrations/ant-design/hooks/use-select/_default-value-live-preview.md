```tsx live url=http://localhost:3000 previewHeight=300px
setInitialRoutes(["/posts/create"]);
// visible-block-start
import { useSelect } from "@refinedev/antd";
import { Select } from "antd";

interface ICategory {
  id: number;
  title: string;
}

const PostCreate: React.FC = () => {
  const { selectProps } = useSelect<ICategory>({
    resource: "categories",
    // highlight-next-line
    defaultValue: 11,
  });

  return (
    <Select
      placeholder="Select a category"
      style={{ width: 300 }}
      {...selectProps}
    />
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
