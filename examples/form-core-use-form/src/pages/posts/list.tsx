import React, { useState } from "react";
import { useList, useNavigation } from "@refinedev/core";

import type { IPost } from "../../interfaces";

const PAGE_SIZE = 10;

export const PostList: React.FC = () => {
  const [page, setPage] = useState(1);
  const { edit, create, show, clone } = useNavigation();

  const { result: data } = useList<IPost>({
    resource: "posts",

    pagination: {
      currentPage: page,
      pageSize: PAGE_SIZE,
    },
  });

  const posts = data?.data || [];
  const toalCount = data?.total || 0;

  const pageCount = Math.ceil(toalCount / PAGE_SIZE);
  const hasNext = page * PAGE_SIZE < toalCount;
  const hasPrev = page > 1;

  return (
    <div>
      <div>
        <button onClick={() => create("posts")}>
          <span>Create Post</span>
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>
              <div>ID</div>
            </th>
            <th>
              <div>Title</div>
            </th>
            <th>
              <div>Content</div>
            </th>

            <th>
              <div>Action</div>
            </th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <td>{post.id}</td>
              <td>{post.title}</td>
              <td>{post.content}</td>
              <td>
                <div>
                  <button onClick={() => edit("posts", post.id)}>Edit</button>
                  <button onClick={() => show("posts", post.id)}>Show</button>
                  <button onClick={() => clone("posts", post.id)}>Clone</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <div>
          <button onClick={() => setPage(1)} disabled={!hasPrev}>
            First
          </button>
          <button
            onClick={() => setPage((prev) => prev - 1)}
            disabled={!hasPrev}
          >
            Prev
          </button>
          <button
            onClick={() => setPage((prev) => prev + 1)}
            disabled={!hasNext}
          >
            Next
          </button>
          <button onClick={() => setPage(pageCount)} disabled={!hasNext}>
            Last
          </button>
        </div>
        <span>
          Page{" "}
          <strong>
            {page} of {pageCount}
          </strong>
        </span>
        <span>
          Go to page:
          <input
            type="number"
            defaultValue={page + 1}
            onChange={(e) => {
              const value = e.target.value ? Number(e.target.value) : 1;
              setPage(value);
            }}
          />
        </span>
      </div>
    </div>
  );
};
