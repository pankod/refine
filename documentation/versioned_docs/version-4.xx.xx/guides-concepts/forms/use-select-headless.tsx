import { Sandpack } from "@site/src/components/sandpack";
import React from "react";

export default function UseSelectHeadless() {
  return (
    <Sandpack
      // showNavigator
      dependencies={{
        "@refinedev/core": "latest",
        "@refinedev/simple-rest": "latest",
        "@refinedev/react-hook-form": "latest",
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
import dataProvider from "@refinedev/simple-rest";
import { EditPage } from "./edit-page";

const App: React.FC = () => {
    return (
        <Refine
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            resources={[
                {
                    name: "posts",
                },
            ]}
        >
            <EditPage />
        </Refine>
    );
};

export default App;
`.trim();

const EditPageTsxCode = `
import React from "react";
import { useForm } from "@refinedev/react-hook-form";
import { useSelect } from "@refinedev/core";

export const EditPage: React.FC = () => {
    const {
        refineCore: { onFinish, formLoading, query: productQuery },
        register,
        handleSubmit,
    } = useForm<IProduct>({
        refineCoreProps: {
            resource: "products",
            id: 1,
            action: "edit",
        },
    });
    const product = productQuery?.data?.data;

    const { options, queryResult: categoriesQueryResult } =
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
        <div>
            <div>
                <h2>{\`Edit "\${product?.name}" Product\`}</h2>
                <h2>{\`Category: \${categoryOfProduct?.title}\`}</h2>
            </div>
            <form onSubmit={handleSubmit(onFinish)}>
                <label>Name: </label>
                <input {...register("name", { required: true })} />
                <br />
                <label>Category: </label>
                <select
                    {...register("category.id", {
                        required: true,
                    })}
                    defaultValue={product?.category.id}
                >
                    {options?.map((category) => {
                        return (
                            <option key={category.value} value={category.value}>
                                {category.label}
                            </option>
                        );
                    })}
                </select>
                <br />
                <br />
                <input type="submit" value="Submit" />
                {formLoading && <p>Loading</p>}
            </form>
        </div>
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
