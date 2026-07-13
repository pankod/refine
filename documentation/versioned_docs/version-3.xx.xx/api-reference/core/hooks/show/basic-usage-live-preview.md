```css live shared
body {
    padding: 4px;
    background: white;
}
```

```tsx live url=http://localhost:3000/products/show/1 previewHeight=300px
setInitialRoutes(["/products/show/1"]);
// visible-block-start
import { useShow } from "@pankod/refine-core";

interface IProduct {
    id: number;
    name: string;
    material: string;
}

const ProductShow: React.FC = () => {
    const { queryResult } = useShow<IProduct>();

    const { data, isLoading, isError } = queryResult;
    const product = data?.data;

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Something went wrong!</div>;
    }

    return (
        <div>
            <h3>Product Details</h3>
            <p>id: {product?.id}</p>
            <p>name: {product?.name}</p>
            <p>material: {product?.material}</p>
        </div>
    );
};

// visible-block-end
setRefineProps({
    resources: [
        {
            name: "products",
            show: ProductShow,
        },
    ],
});
render(<RefineHeadlessDemo />);
```
