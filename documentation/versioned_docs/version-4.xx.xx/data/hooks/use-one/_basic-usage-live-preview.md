```css live shared
body {
  padding: 4px;
  background: white;
}
```

```tsx live url=http://localhost:3000/products previewHeight=300px
setInitialRoutes(["/products"]);
// visible-block-start
import { useState } from "react";
import { useOne, HttpError } from "@refinedev/core";

interface IProduct {
  id: number;
  name: string;
  material: string;
}

const ProductList: React.FC = () => {
  const [id, setId] = useState(1);

  const { data, isLoading, isError } = useOne<IProduct, HttpError>({
    resource: "products",
    id,
  });

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

      <br />

      <button onClick={() => setId((prev) => prev - 1)} disabled={id === 1}>
        {"<"} Prev Product
      </button>
      <button onClick={() => setId((prev) => prev + 1)}>
        Next Product {">"}
      </button>
    </div>
  );
};

// visible-block-end
setRefineProps({
  resources: [
    {
      name: "products",
      list: "/products",
    },
  ],
});
render(
  <ReactRouter.BrowserRouter>
    <RefineHeadlessDemo>
      <ReactRouter.Routes>
        <ReactRouter.Route path="/products" element={<ProductList />} />
      </ReactRouter.Routes>
    </RefineHeadlessDemo>
  </ReactRouter.BrowserRouter>,
);
```
