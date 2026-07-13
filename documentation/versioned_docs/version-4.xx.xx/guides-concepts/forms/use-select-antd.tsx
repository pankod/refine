import { Sandpack } from "@site/src/components/sandpack";
import React from "react";

export default function UseSelectAntd() {
  return (
    <Sandpack
      // showNavigator
      dependencies={{
        "@refinedev/core": "latest",
        "@refinedev/simple-rest": "latest",
        "@refinedev/react-hook-form": "latest",
        "@refinedev/antd": "latest",
        antd: "latest",
      }}
      startRoute="/"
      files={{
        "/App.tsx": {
          code: AppTsxCode,
        },
        "/edit-page.tsx": {
          code: EditPageTsxCode,
          active: true,
        },
      }}
    />
  );
}

const AppTsxCode = /* tsx */ `
import React from "react";
import { Refine } from "@refinedev/core";
import { useNotificationProvider, RefineThemes } from "@refinedev/antd";
import dataProvider from "@refinedev/simple-rest";
import { ConfigProvider, App as AntdApp } from "antd";
import "@refinedev/antd/dist/reset.css";
import { EditPage } from "./edit-page";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
    return (
        <ConfigProvider theme={RefineThemes.Blue}>
            <AntdApp>
                <Refine
                    dataProvider={dataProvider(API_URL)}
                    resources={[
                        {
                            name: "posts",
                            list: "/posts",
                            show: "/posts/show/:id",
                            create: "/posts/create",
                            edit: "/posts/edit/:id",
                            meta: {
                                canDelete: true,
                            },
                        },
                    ]}
                    notificationProvider={useNotificationProvider}
                    options={{
                        syncWithLocation: true,
                        warnWhenUnsavedChanges: true,
                    }}
                >
                    <EditPage />
                </Refine>
            </AntdApp>
        </ConfigProvider>
    );
};

export default App;
`.trim();

const EditPageTsxCode = `
import { useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Select, Button, Row, Col } from "antd";

export const EditPage: React.FC = () => {
    const {
        formProps,
        saveButtonProps,
        query: productResult,
    } = useForm<IProduct>({
        resource: "products",
        id: 1,
        action: "edit",
    });
    const product = productResult?.data?.data;

    const { selectProps: categorySelectProps, queryResult: categoriesResult } =
        useSelect<ICategory>({
            resource: "categories",
            defaultValue: product?.category.id,
        });
    const categories = categoriesResult?.data?.data;

    // find category of product by id from categories
    const categoryOfProduct = categories?.find(
        (category) => Number(category.id) === Number(product?.category.id),
    );

    return (
        <>
            <Row
                justify="center"
                style={{
                    paddingTop: 24,
                    paddingBottom: 24,
                }}
            >
                <Col
                    style={{
                        textAlign: "center",
                    }}
                >
                    <h2>{\`Edit "\${product?.name}" Product\`}</h2>
                    <h2>{\`Category: \${categoryOfProduct?.title}\`}</h2>
                </Col>
            </Row>
            <Row justify="center">
                <Col span={12}>
                    <Form {...formProps} layout="vertical">
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Category"
                            name={["category", "id"]}
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Select {...categorySelectProps} />
                        </Form.Item>
                        <Button type="primary" {...saveButtonProps}>
                            Save
                        </Button>
                    </Form>
                </Col>
            </Row>
        </>
    );
};

interface ICategory {
    id: number;
    title: string;
}

interface IProduct {
    id: number;
    name: string;
    category: { id: number };
}



`.trim();
