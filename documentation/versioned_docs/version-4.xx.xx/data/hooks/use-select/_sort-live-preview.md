```tsx live url=http://localhost:3000/categories previewHeight=200px hideCode
setInitialRoutes(["/categories"]);
// visible-block-start
import { useSelect } from "@refinedev/core";

interface ICategory {
  id: number;
  title: string;
}

const Categories: React.FC = () => {
  const [order, setOrder] = React.useState<"asc" | "desc">("asc");
  const { options } = useSelect<ICategory>({
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
      <label>
        Select a category:
        <select>
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <button onClick={() => setOrder(order === "asc" ? "desc" : "asc")}>
          Toggle
        </button>
      </label>
    </>
  );
};
// visible-block-end
setRefineProps({
  resources: [
    {
      name: "categories",
      list: "/categories",
    },
  ],
});
render(
  <ReactRouter.BrowserRouter>
    <RefineHeadlessDemo>
      <ReactRouter.Routes>
        <ReactRouter.Route path="/categories" element={<Categories />} />
      </ReactRouter.Routes>
    </RefineHeadlessDemo>
  </ReactRouter.BrowserRouter>,
);
```
