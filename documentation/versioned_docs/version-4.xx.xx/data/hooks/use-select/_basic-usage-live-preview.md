```tsx live url=http://localhost:3000/categories previewHeight=200px
setInitialRoutes(["/categories"]);
// visible-block-start
import { useSelect } from "@refinedev/core";

interface ICategory {
  id: number;
  title: string;
}

const Categpries: React.FC = () => {
  const { options } = useSelect<ICategory>({
    resource: "categories",
  });

  return (
    <label>
      Select a category:
      <select>
        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
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
        <ReactRouter.Route path="/categories" element={<Categpries />} />
      </ReactRouter.Routes>
    </RefineHeadlessDemo>
  </ReactRouter.BrowserRouter>,
);
```
