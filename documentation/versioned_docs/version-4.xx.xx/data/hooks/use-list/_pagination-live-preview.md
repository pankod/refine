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
import { useList, HttpError } from "@refinedev/core";

interface IProduct {
  id: number;
  name: string;
  material: string;
}

const ProductList: React.FC = () => {
  //highlight-start
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  //highlight-end

  const { data, isLoading, isError } = useList<IProduct, HttpError>({
    resource: "products",
    //highlight-start
    pagination: {
      current,
      pageSize,
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
      <button onClick={() => setCurrent((prev) => prev - 1)}>{"<"}</button>
      <span> page: {current} </span>
      <button onClick={() => setCurrent((prev) => prev + 1)}>{">"}</button>
      <span> per page: </span>
      <select
        value={pageSize}
        onChange={(e) => setPageSize(Number(e.target.value))}
      >
        {[5, 10, 20].map((size) => (
          <option key={size} value={size}>
            {size}
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
