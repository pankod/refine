```css live shared
body {
  padding: 4px;
  background: white;
}
```

```tsx live url=http://localhost:3000/products/show/1 previewHeight=300px
setInitialRoutes(["/products/show/123"]);
// visible-block-start
import { useShow } from "@refinedev/core";

interface IProduct {
  id: number;
  name: string;
  material: string;
}

const ProductShow: React.FC = () => {
  const { query } = useShow<IProduct>();

  const { data, isFetching, isError, refetch } = query;
  const product = data?.data;

  if (isFetching) {
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
      <button onClick={refetch}>Refresh</button>
    </div>
  );
};

// visible-block-end
setRefineProps({
  resources: [
    {
      name: "products",
      show: "/products/show/:id",
    },
  ],
});
render(
  <ReactRouter.BrowserRouter>
    <RefineHeadlessDemo>
      <ReactRouter.Routes>
        <ReactRouter.Route
          path="/products/show/:id"
          element={<ProductShow />}
        />
      </ReactRouter.Routes>
    </RefineHeadlessDemo>
  </ReactRouter.BrowserRouter>,
);
```
