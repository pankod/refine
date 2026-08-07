```tsx live url=http://localhost:3000/products previewHeight=420px
setInitialRoutes(["/products"]);

// visible-block-start
import { useSimpleList } from "@refinedev/antd";
import { Typography, List } from "antd";

const { Text } = Typography;

interface IProduct {
  id: number;
  name: string;
  description: string;
  price: string;
}

const ProductList: React.FC = () => {
  const { listProps } = useSimpleList<IProduct>();

  return <List {...listProps} renderItem={renderItem} />;
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
