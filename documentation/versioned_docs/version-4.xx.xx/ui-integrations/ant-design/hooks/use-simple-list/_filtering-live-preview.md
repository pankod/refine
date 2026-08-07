```tsx live url=http://localhost:3000/products previewHeight=420px
setInitialRoutes(["/products"]);

// visible-block-start
import { useSimpleList } from "@refinedev/antd";
import { Typography, List, Input } from "antd";

const { Text } = Typography;

interface IProduct {
  id: number;
  name: string;
  description: string;
  price: string;
}

const ProductList: React.FC = () => {
  const { listProps, setFilters } = useSimpleList<IProduct>({
    filters: {
      initial: [
        {
          field: "name",
          operator: "contains",
          value: "Awesome",
        },
      ],
    },
  });

  return (
    <div>
      <Input.Search
        placeholder="Search by name"
        onChange={(e) => {
          setFilters([
            {
              field: "name",
              operator: "contains",
              value: e.target.value,
            },
          ]);
        }}
      />
      <List {...listProps} renderItem={renderItem} />
    </div>
  );
};

const renderItem = (item: IProduct) => {
  const { id, name, description, price } = item;

  return (
    <List.Item actions={[<Text key={id}>{price}</Text>]}>
      <List.Item.Meta title={name} description={description} />
    </List.Item>
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

render(<RefineAntdDemo />);
```
