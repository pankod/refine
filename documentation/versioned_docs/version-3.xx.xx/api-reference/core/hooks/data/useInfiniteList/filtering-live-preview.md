```css live shared
body {
    padding: 4px;
    background: white;
}
```

```tsx live url=http://localhost:3000/products previewHeight=300px hideCode
setInitialRoutes(["/products"]);

// visible-block-start
import { useState } from "react";
import { useInfiniteList, HttpError } from "@pankod/refine-core";

interface IProduct {
    id: number;
    name: string;
    material: string;
}

const ProductList: React.FC = () => {
    //highlight-next-line
    const [value, setValue] = useState("Cotton");

    const {
        data,
        isLoading,
        isError,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage
    } = useInfiniteList<IProduct, HttpError>({
        resource: "products",
        //highlight-start
        config: {
            filters: [
                {
                    field: "material",
                    operator: "eq",
                    value,
                },
            ],
        },
        //highlight-end
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Something went wrong!</div>;
    }

    const allPages = [].concat(...(data?.pages ?? []).map((page) => page.data));

    return (
        <div>
            {/* highlight-start */}
            <span> material: </span>
            <select value={value} onChange={(e) => setValue(e.target.value)}>
                {["Cotton", "Bronze", "Plastic"].map((material) => (
                    <option key={material} value={material}>
                        {material}
                    </option>
                ))}
            </select>
            {/* highlight-end */}

            <ul>
                {allPages.map((product) => (
                    <li key={product.id}>
                        {product.name} - ({product.material})
                    </li>
                ))}
            </ul>

            {
                hasNextPage && (
                    <button
                        onClick={() => fetchNextPage()}
                        disabled={isFetchingNextPage}
                    >
                        {isFetchingNextPage ? "Loading more..." : "Load More" }
                    </button>
                )
            }
        </div>
    );
};

// visible-block-end

setRefineProps({
    resources: [
        {
            name: "products",
            list: ProductList,
        },
    ],
});

render(<RefineHeadlessDemo />);
```
