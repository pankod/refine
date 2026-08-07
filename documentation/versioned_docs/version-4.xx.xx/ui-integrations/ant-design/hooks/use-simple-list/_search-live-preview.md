```tsx live url=http://localhost:3000/products previewHeight=420px
setInitialRoutes(["/products"]);

// visible-block-start
import { useSimpleList } from "@refinedev/antd";
import { Typography, List, Form, Input, Button } from "antd";
import { HttpError } from "@refinedev/core";

const { Text } = Typography;

interface IProduct {
  id: number;
  name: string;
  description: string;
  price: string;
}

interface ISearch {
  name: string;
  description: string;
}

const ProductList: React.FC = () => {
  const { listProps, searchFormProps } = useSimpleList<
    IProduct,
    HttpError,
    ISearch
  >({
    onSearch: (values) => {
      return [
        {
          field: "name",
          operator: "contains",
          value: values.name,
        },
        {
          field: "description",
          operator: "contains",
          value: values.description,
        },
      ];
    },
  });

  return (
    <div>
      <Form {...searchFormProps} layout="inline">
        <Form.Item name="name">
          <Input placeholder="Search by name" />
        </Form.Item>
        <Form.Item name="description">
          <Input placeholder="Search by description" />
        </Form.Item>
        <Button type="primary" onClick={searchFormProps.form?.submit}>
          Search
        </Button>
      </Form>
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
