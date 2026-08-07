```css live shared
body {
  padding: 4px;
  background: white;
}
```

```tsx live url=http://localhost:3000/products previewHeight=300px
setInitialRoutes(["/products"]);

// visible-block-start
import { useList, HttpError } from "@refinedev/core";

interface IProduct {
  id: number;
  name: string;
  material: string;
}

const ProductList: React.FC = () => {
  const { data, isLoading, isError } = useList<IProduct, HttpError>({
    resource: "products",
  });

  const products = data?.data ?? [];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Something went wrong!</div>;
  }

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <h4>
            {product.name} - ({product.material})
          </h4>
        </li>
      ))}
    </ul>
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
