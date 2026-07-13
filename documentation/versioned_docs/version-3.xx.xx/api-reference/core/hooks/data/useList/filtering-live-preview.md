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
import { useList, HttpError } from "@pankod/refine-core";

interface IProduct {
    id: number;
    name: string;
    material: string;
}

const ProductList: React.FC = () => {
    //highlight-next-line
    const [value, setValue] = useState("Cotton");

    const { data, isLoading, isError } = useList<IProduct, HttpError>({
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

    const products = data?.data ?? [];

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Something went wrong!</div>;
    }

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
                {products.map((product) => (
                    <li key={product.id}>
                        <h4>
                            {product.name} - ({product.material})
                        </h4>
                    </li>
                ))}
            </ul>
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
