```tsx live url=http://localhost:3000/products previewHeight=200px hideCode
setInitialRoutes(["/posts/create"]);
// visible-block-start
import { useSelect } from "@pankod/refine-core";

interface ICategory {
    id: number;
    title: string;
}

const ProductCreate: React.FC = () => {
    const [order, setOrder] = React.useState<"asc" | "desc">("asc");
    const { options } = useSelect<ICategory>({
        resource: "categories",
        // highlight-start
        sort: [
            {
                field: "title",
                order,
            }
        ]
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
                <button onClick={() => setOrder(order === "asc" ? "desc" : "asc")}>Toggle</button>
            </label>            
        </>
        
    );
};
// visible-block-end
setRefineProps({
    resources: [
        {
            name: "posts",
            create: ProductCreate,
        },
    ],
});
render(<RefineHeadlessDemo />);
```