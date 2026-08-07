import React from "react";
import { useInfiniteList } from "@refinedev/core";

export const CommitList: React.FC = () => {
  const {
    query: { error, isLoading, fetchNextPage, isFetchingNextPage },

    result: { data, hasNextPage },
  } = useInfiniteList({
    resource: "repos/refinedev/refine/commits",
    dataProviderName: "github",
    queryOptions: {
      getNextPageParam: ({ data }) => {
        // return the last commit date of the last page
        const lastCommit = data[data.length - 1];
        return lastCommit.commit.committer.date;
      },
    },
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
          page.data.map(({ sha, commit }) => (
            <li key={sha} style={{ marginBottom: 10 }}>
              <i>{commit.committer.date}</i>
              <br />
              {commit.message} - <b>{commit.committer.name}</b>
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
