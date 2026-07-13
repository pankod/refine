```tsx live url=http://localhost:3000 previewHeight=300px
setInitialRoutes(["/posts/create"]);
// visible-block-start
import { useSelect } from "@refinedev/antd";
import { Select, Button } from "antd";

interface ICategory {
  id: number;
  title: string;
}

const PostCreate: React.FC = () => {
  const [order, setOrder] = React.useState<"asc" | "desc">("asc");

  const { selectProps } = useSelect<ICategory>({
    resource: "categories",
    // highlight-start
    sorters: [
      {
        field: "title",
        order,
      },
    ],
    // highlight-end
  });

  return (
    <>
      <Select
        placeholder={`Ordered Categories: ${order}`}
        style={{ width: 300 }}
        {...selectProps}
      />
      <Button onClick={() => setOrder(order === "asc" ? "desc" : "asc")}>
        Toggle Order
      </Button>
    </>
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
