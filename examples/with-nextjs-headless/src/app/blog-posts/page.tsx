"use client";

import {
  type BaseRecord,
  Link,
  useMany,
  useTranslation,
  useTable,
  useDelete,
} from "@refinedev/core";
import type { Category, BlogPost } from "@types";

export default function BlogPostList() {
  const { translate: t } = useTranslation();
  const {
    tableQuery,
    currentPage: current,
    pageSize,
    setPageSize,
    setCurrentPage: setCurrent,
  } = useTable<BlogPost>({
    syncWithLocation: true,
  });

  const { data, isLoading } = tableQuery;
  const records = data?.data ?? [];

  const {
    result: categoryData,
    query: { isLoading: categoryIsLoading },
  } = useMany<Category>({
    resource: "categories",
    ids: records?.map((item) => item?.category?.id).filter(Boolean) ?? [],
    queryOptions: {
      enabled: !!records,
    },
  });

  const { mutate: deleteBlogPost } = useDelete();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>{t("ID")}</th>
            <th>{t("blog_posts.fields.title")}</th>
            <th>{t("blog_posts.fields.content")}</th>
            <th>{t("blog_posts.fields.category")}</th>
            <th>{t("blog_posts.fields.status.title")}</th>
            <th>{t("blog_posts.fields.createdAt")}</th>
            <th>{t("table.actions")}</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record: BaseRecord) => {
            if (!record.id) {
              return null;
            }

            return (
              <tr key={record.id}>
                <td>{record.id}</td>
                <td>{record.title}</td>
                <td>
                  {record.content ? `${record.content.slice(0, 80)}...` : "-"}
                </td>
                <td>
                  {categoryIsLoading
                    ? "Loading..."
                    : categoryData?.data?.find(
                        (item) => item.id === record.category?.id,
                      )?.title}
                </td>
                <td>{t(`blog_posts.fields.status.${record.status}`)}</td>
                <td>
                  {record.createdAt &&
                    new Date(record.createdAt).toLocaleDateString()}
                </td>
                <td>
                  <Link
                    go={{
                      to: {
                        resource: "blog_posts",
                        action: "edit",
                        id: record.id,
                      },
                    }}
                  >
                    {t("buttons.edit")}
                  </Link>
                  {" | "}
                  <Link
                    go={{
                      to: {
                        resource: "blog_posts",
                        action: "show",
                        id: record.id,
                      },
                    }}
                  >
                    {t("buttons.show")}
                  </Link>
                  {" | "}
                  <button
                    type="button"
                    onClick={async () => {
                      const confirmed = window.confirm("Are you sure?");
                      if (confirmed && record.id) {
                        deleteBlogPost({
                          resource: "blog_posts",
                          id: record.id,
                        });
                      }
                    }}
                  >
                    {t("buttons.delete")}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div>
        <span>
          Page{" "}
          <select
            value={current}
            onChange={(e) => setCurrent(Number(e.target.value))}
          >
            {Array.from(
              { length: Math.ceil((data?.total ?? 0) / pageSize) },
              (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ),
            )}
          </select>
        </span>
        {" | "}
        <span>
          Show{" "}
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
          >
            {[10, 20, 30, 40, 50].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
          {" items per page"}
        </span>
      </div>
    </div>
  );
}
