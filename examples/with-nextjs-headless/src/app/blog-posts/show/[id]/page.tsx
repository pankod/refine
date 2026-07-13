"use client";

import { Link, useOne, useShow, useTranslation } from "@refinedev/core";
import type { BlogPost, Category } from "@types";

export default function BlogPostShow() {
  const { translate: t } = useTranslation();

  const { query } = useShow<BlogPost>();
  const { data, isLoading } = query;
  const record = data?.data;

  const {
    result: categoryData,
    query: { isLoading: categoryIsLoading },
  } = useOne<Category>({
    resource: "categories",
    id: record?.category?.id || "",
    queryOptions: {
      enabled: !!record,
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <br />
      <Link go={{ to: { resource: "blog_posts", action: "list" } }}>
        ← Go to list
      </Link>
      <br />
      <div>
        <h5>{t("ID")}</h5>
        <div>{record?.id}</div>
      </div>
      <div>
        <h5>{t("blog_posts.fields.title")}</h5>
        <div>{record?.title}</div>
      </div>
      <div>
        <h5>{t("blog_posts.fields.content")}</h5>
        <div>{record?.content}</div>
      </div>
      <div>
        <h5>{t("blog_posts.fields.category")}</h5>
        <div>{categoryIsLoading ? "Loading..." : categoryData?.title}</div>
      </div>
      <div>
        <h5>{t("blog_posts.fields.status.title")}</h5>
        <div>{record?.status}</div>
      </div>
      <div>
        <h5>{t("blog_posts.fields.createdAt")}</h5>
        <div>
          {record?.createdAt && new Date(record.createdAt).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}
