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
    const [order, setOrder] = useState<"asc" | "desc">("asc");

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
            sort: [
                {
                    field: "name",
                    order,
                },
            ],
        },
        //highlight-end
    });

    if (isLoading) {
        return <p>Loading</p>;
    }
    if (isError) {
        return <p>Something went wrong</p>;
    }

    const allPages = [].concat(...(data?.pages ?? []).map((page) => page.data));

    return (
        <div>
            {/* highlight-start */}
            <button
                onClick={() =>
                    setOrder((prev) => (prev === "asc" ? "desc" : "asc"))
                }
            >
                toggle sort
            </button>
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
