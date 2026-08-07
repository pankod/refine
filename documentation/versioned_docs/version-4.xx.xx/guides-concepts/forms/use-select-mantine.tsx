import { Sandpack } from "@site/src/components/sandpack";
import React from "react";

export default function UseSelectMantine() {
  return (
    <Sandpack
      // showNavigator
      dependencies={{
        "@refinedev/core": "latest",
        "@refinedev/simple-rest": "latest",
        "@refinedev/react-hook-form": "latest",
        "@refinedev/mantine": "^2.28.21",
        "@mantine/core": "^5.10.4",
        "@mantine/notifications": "^5.10.4",
        "@emotion/react": "^11.8.2",
        "@mantine/form": "^5.10.4",
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
import { useNotificationProvider, RefineThemes } from "@refinedev/mantine";
import { NotificationsProvider } from "@mantine/notifications";
import { MantineProvider, Global } from "@mantine/core";
import dataProvider from "@refinedev/simple-rest";
import { EditPage } from "./edit-page";

const App: React.FC = () => {
    return (
        <MantineProvider
            theme={RefineThemes.Blue}
            withNormalizeCSS
            withGlobalStyles
        >
            <Global styles={{ body: { WebkitFontSmoothing: "auto" } }} />
            <NotificationsProvider position="top-right">
                <Refine
                    dataProvider={dataProvider(
                        "https://api.fake-rest.refine.dev",
                    )}
                    notificationProvider={useNotificationProvider}
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
                    options={{
                        syncWithLocation: true,
                        warnWhenUnsavedChanges: true,
                    }}
                >
                    <EditPage />
                </Refine>
            </NotificationsProvider>
        </MantineProvider>
    );
};

export default App;
`.trim();

const EditPageTsxCode = `
import React from "react";
import { useForm, useSelect } from "@refinedev/mantine";
import { Flex, Button, Select, TextInput, Text, Grid } from "@mantine/core";

export const EditPage: React.FC = () => {
    const {
        saveButtonProps,
        getInputProps,
        refineCore: { query: productQuery },
    } = useForm<IProduct>({
        initialValues: {
            name: "",
            category: {
                id: "",
            },
        },
        refineCoreProps: {
            resource: "products",
            id: 1,
            action: "edit",
        },
    });
    const product = productQuery?.data?.data;

    const { selectProps, queryResult: categoriesQueryResult } =
        useSelect<ICategory>({
            resource: "categories",
            defaultValue: product?.category.id,
        });
    const categories = categoriesQueryResult?.data?.data;

    // find category of product by id from categories
    const categoryOfProduct = categories?.find(
        (category) => Number(category.id) === Number(product?.category.id),
    );

    return (
        <Flex
            align="center"
            direction="column"
            style={{
                paddingTop: 24,
            }}
        >
            <Grid>
                <Grid.Col
                    style={{
                        textAlign: "center",
                    }}
                >
                    <Text>{\`Edit "$\{product?.name}" Product\`}</Text>
                    <Text>{\`Category: $\{categoryOfProduct?.title}\`}</Text>
                </Grid.Col>
                <Grid.Col>
                    <form>
                        <TextInput
                            mt={8}
                            id="name"
                            label="Name"
                            placeholder="Name"
                            {...getInputProps("name")}
                        />
                        <Select
                            mt={8}
                            id="categoryId"
                            label="Category"
                            placeholder="Pick one"
                            {...getInputProps("category.id")}
                            {...selectProps}
                        />
                        <Button
                            mt={8}
                            variant="outline"
                            color="blue"
                            {...saveButtonProps}
                        >
                            Save
                        </Button>
                    </form>
                </Grid.Col>
            </Grid>
        </Flex>
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
