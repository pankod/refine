import { Sandpack } from "@site/src/components/sandpack";
import React from "react";

export default function Relationship() {
  return (
    <Sandpack
      dependencies={{
        "@refinedev/core": "latest",
        "@refinedev/simple-rest": "latest",
      }}
      startRoute="/"
      files={{
        "/App.tsx": {
          code: AppTsxCode,
          hidden: false,
        },
        "/home-page.tsx": {
          code: HomePageTsxCode,
          hidden: false,
          active: true,
        },
      }}
    />
  );
}

const AppTsxCode = `
import React from "react";
import { Refine } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";
import { HomePage } from "./home-page.tsx";


const API_URL = "https://api.fake-rest.refine.dev";


export default function App() {
    return (
        <Refine
          dataProvider={dataProvider(API_URL)}
        >
            <HomePage />
        </Refine>
    );
}

`.trim();

export const HomePageTsxCode = `
import React from "react";
import { useTable, HttpError, useMany } from "@refinedev/core";

export const HomePage: React.FC = () => {
    const { tableQuery } = useTable<IPost, HttpError>({
        resource: "posts",
    });
    const posts = tableQuery?.data?.data ?? [];

    const categoryIds = posts.map((item) => item.category.id);
    const { data: categoriesData, isLoading } = useMany<ICategory>({
        resource: "categories",
        ids: categoryIds,
        queryOptions: {
            enabled: categoryIds.length > 0,
        },
    });

    if (tableQuery?.isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Posts</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Category</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map((post) => (
                        <tr key={post.id}>
                            <td>{post.id}</td>
                            <td>{post.title}</td>
                            <td>
                                {isLoading ? (
                                    <div>Loading...</div>
                                ) : (
                                    categoriesData?.data.find(
                                        (item) => item.id === post.category.id,
                                    )?.title
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

interface IPost {
    id: number;
    title: string;
    category: {
        id: number;
    };
}

interface ICategory {
    id: number;
    title: string;
}

`.trim();
