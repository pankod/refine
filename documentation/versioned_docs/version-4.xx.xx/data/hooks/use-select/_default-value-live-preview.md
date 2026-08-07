```tsx live url=http://localhost:3000/categories previewHeight=200px hideCode
setInitialRoutes(["/categories"]);
// visible-block-start
import { useSelect } from "@refinedev/core";

interface ICategory {
  id: number;
  title: string;
}

const Categories: React.FC = () => {
  const { options } = useSelect<ICategory>({
    resource: "categories",
    // highlight-next-line
    defaultValue: 3,
  });

  return (
    <label>
      Select a category:
      <select>
        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.value}-{option.label}
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
        <ReactRouter.Route path="/categories" element={<Categories />} />
      </ReactRouter.Routes>
    </RefineHeadlessDemo>
  </ReactRouter.BrowserRouter>,
);
```
