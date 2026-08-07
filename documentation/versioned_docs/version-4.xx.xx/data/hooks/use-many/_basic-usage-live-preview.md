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
import { useMany, HttpError } from "@refinedev/core";

interface IProduct {
  id: number;
  name: string;
  material: string;
}

const ProductList: React.FC = () => {
  const [ids, setIds] = useState([1, 2, 3]);

  const { data, isLoading, isError } = useMany<IProduct, HttpError>({
    resource: "products",
    ids,
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
      {products.map((product) => (
        <ul key={product.id}>
          <li key={product.id}>
            {product.id} - {product.name}{" "}
            <button
              onClick={() =>
                setIds((prev) => prev.filter((id) => id !== product.id))
              }
            >
              remove
            </button>
          </li>
        </ul>
      ))}

      <button
        onClick={() => {
          setIds((prev) => [...prev, Math.floor(Math.random() * 150) + 1]);
        }}
      >
        Add new product
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
