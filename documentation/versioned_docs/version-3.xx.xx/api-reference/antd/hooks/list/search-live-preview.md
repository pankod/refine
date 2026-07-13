```tsx live url=http://localhost:3000/products previewHeight=420px
setInitialRoutes(["/products"]);

// visible-block-start
import {
    Typography,
    AntdList,
    useSimpleList,
    Form,
    Input,
    Button,
} from "@pankod/refine-antd";
import { HttpError } from "@pankod/refine-core";

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
            <AntdList {...listProps} renderItem={renderItem} />
        </div>
    );
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
