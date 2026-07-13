import React from "react";
import { useInfiniteList } from "@refinedev/core";

import type { IPost } from "../../interfaces";

export const PostList: React.FC = () => {
  const {
    query: { error, isLoading, fetchNextPage, isFetchingNextPage },

    result: { data, hasNextPage },
  } = useInfiniteList<IPost>({
    resource: "posts",
  });

  if (isLoading) {
    return <p>Loading</p>;
  }
  if (error) {
    return <p>Something went wrong</p>;
  }

  return (
    <div>
      <ul>
        {data?.pages.map((page) =>
          page.data.map(({ id, title, createdAt }) => (
            <li key={id} style={{ marginBottom: 10 }}>
              <i>{createdAt}</i>
              <br />
              {title}
            </li>
          )),
        )}
      </ul>

      <button
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
      >
        {isFetchingNextPage
          ? "Loading more..."
          : hasNextPage
            ? "Load More"
            : "Nothing more to load"}
      </button>
    </div>
  );
};
