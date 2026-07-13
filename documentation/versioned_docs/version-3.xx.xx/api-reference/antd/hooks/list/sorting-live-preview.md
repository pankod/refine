```tsx live url=http://localhost:3000/products previewHeight=420px
setInitialRoutes(["/products"]);

// visible-block-start
import { Typography, AntdList, useSimpleList } from "@pankod/refine-antd";

const { Text } = Typography;

interface IProduct {
    id: number;
    name: string;
    description: string;
    price: string;
}

const ProductList: React.FC = () => {
    const { listProps } = useSimpleList<IProduct>({
        // highlight-start
        initialSorter: [
            {
                field: "name",
                order: "desc",
            },
        ],
        // highlight-end
    });

    return <AntdList {...listProps} renderItem={renderItem} />;
};

const renderItem = (item: IProduct) => {
    const { id, name, description, price } = item;

    return (
        <AntdList.Item actions={[<Text key={id}>{price}</Text>]}>
            <AntdList.Item.Meta title={name} description={description} />
        </AntdList.Item>
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
