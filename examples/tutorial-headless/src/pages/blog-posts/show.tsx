import React from "react";
import {
  useShow,
  useNavigation,
  useOne,
  useResourceParams,
} from "@refinedev/core";

export const BlogPostShow = () => {
  const { edit, list } = useNavigation();
  const { id } = useResourceParams();
  const { query: queryResult } = useShow();
  const { data } = queryResult;

  const record = data?.data;

  const {
    result: categoryData,
    query: { isLoading: categoryIsLoading },
  } = useOne({
    resource: "categories",
    id: record?.category?.id || "",
    queryOptions: {
      enabled: !!record,
    },
  });

  return (
    <div style={{ padding: "16px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h1>Blog Post</h1>
        <div style={{ display: "flex", gap: "8px" }}>
          <button onClick={() => list("blog_posts")}>Blog Posts List</button>
          <button onClick={() => edit("blog_posts", id ?? "")}>Edit</button>
        </div>
      </div>
      <div>
        <div style={{ marginTop: "6px" }}>
          <h5>Id</h5>
          <div>{record?.id ?? ""}</div>
        </div>
        <div style={{ marginTop: "6px" }}>
          <h5>Title</h5>
          <div>{record?.title}</div>
        </div>
        <div style={{ marginTop: "6px" }}>
          <h5>Content</h5>
          <p>{record?.content}</p>
        </div>
        <div style={{ marginTop: "6px" }}>
          <h5>Category</h5>
          <div>
            {categoryIsLoading ? <>Loading...</> : <>{categoryData?.title}</>}
          </div>
        </div>
        <div style={{ marginTop: "6px" }}>
          <h5>Status</h5>
          <div>{record?.status}</div>
        </div>
        <div style={{ marginTop: "6px" }}>
          <h5>Created At</h5>
          <div>
            {new Date(record?.createdAt).toLocaleString(undefined, {
              timeZone: "UTC",
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
