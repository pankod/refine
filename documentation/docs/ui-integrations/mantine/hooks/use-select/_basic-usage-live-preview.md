```tsx live url=http://localhost:3000 previewHeight=300px
setInitialRoutes(["/posts/create"]);
// visible-block-start
import { useSelect } from "@refinedev/mantine";
import { Select } from "@mantine/core";

interface ICategory {
  id: number;
  title: string;
}

const ProductCreate: React.FC = () => {
  const { selectProps } = useSelect<ICategory>({
    resource: "categories",
  });

  return (
    <Select
      label="Category"
      placeholder="Select a category"
      withinPortal
      {...selectProps}
    />
  );
};
// visible-block-end
render(
  <ReactRouter.BrowserRouter>
    <RefineMantineDemo
      resources={[
        {
          name: "posts",
          create: "/posts/create",
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
          <ReactRouter.Route path="create" element={<ProductCreate />} />
        </ReactRouter.Route>
      </ReactRouter.Routes>
    </RefineMantineDemo>
  </ReactRouter.BrowserRouter>,
);
```
