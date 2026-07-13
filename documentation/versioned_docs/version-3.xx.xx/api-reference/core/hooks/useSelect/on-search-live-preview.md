```tsx live url=http://localhost:3000/products previewHeight=200px hideCode
setInitialRoutes(["/posts/create"]);
// visible-block-start
import { useSelect } from "@pankod/refine-core";

interface ICategory {
    id: number;
    title: string;
}

const ProductCreate: React.FC = () => {
    const { options, onSearch } = useSelect<ICategory>({
        resource: "categories",
        // highlight-start
        onSearch: (value) => [
            {
                field: "title",
                operator: "contains",
                value,
            }
        ]
        // highlight-end
    });

    return (
        <>
            <p>
                Filter:
                <input onChange={(e) => onSearch(e.target.value)} />
            </p>

            <select>
                {options?.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
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