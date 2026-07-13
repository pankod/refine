import useQueryAndResultFieldsInListHooksTransform from "./use-query-and-result-fields-in-list-hooks";
import jscodeshift, { type JSCodeshift } from "jscodeshift";

const transform = (source: string) => {
  const j: JSCodeshift = jscodeshift.withParser("tsx");
  const root = j(source);

  return useQueryAndResultFieldsInListHooksTransform(j, root);
};

describe("use-query-and-result-fields-in-list-hooks", () => {
  it("should rename data to result in useList", () => {
    const source = `
      import { useList } from "@refinedev/core";
      const { data } = useList({
        resource: "posts",
        pagination: { currentPage: 2, pageSize: 5 }
      });
    `;
    const expected = `
      import { useList } from "@refinedev/core";
      const { result: data } = useList({
        resource: "posts",
        pagination: { currentPage: 2, pageSize: 5 }
      });
    `;
    expect(transform(source).trim()).toBe(expected.trim());
  });

  it("should rename renamed data from useList", () => {
    const source = `
      import { useList } from "@refinedev/core";
      const { data: stages } = useList<TaskStages>({
        resource: "taskStages",
        pagination: { currentPage: 1, pageSize: 10 }
      });
    `;
    const expected = `
      import { useList } from "@refinedev/core";
      const { result: stages } = useList<TaskStages>({
        resource: "taskStages",
        pagination: { currentPage: 1, pageSize: 10 }
      });
    `;
    expect(transform(source).trim()).toBe(expected.trim());
  });

  it("should rename data to result in useMany destructuring", () => {
    const source = `
      import { useMany } from "@refinedev/core";
      const { data } = useMany({
        resource: "posts",
        ids: [1, 2, 3]
      });
    `;
    const expected = `
      import { useMany } from "@refinedev/core";
      const { result: data } = useMany({
        resource: "posts",
        ids: [1, 2, 3]
      });
    `;
    expect(transform(source).trim()).toBe(expected.trim());
  });

  it("should rename renamed data from useMany", () => {
    const source = `
      import { useMany } from "@refinedev/core";
      const { data: posts } = useMany<Post>({
        resource: "posts",
        ids: [1, 2, 3]
      });
    `;
    const expected = `
      import { useMany } from "@refinedev/core";
      const { result: posts } = useMany<Post>({
        resource: "posts",
        ids: [1, 2, 3]
      });
    `;
    expect(transform(source).trim()).toBe(expected.trim());
  });

  it("should use query field", () => {
    const source = `
      import { useList } from "@refinedev/core";
      const { data, isLoading } = useList()
    `;

    const expected = `
      import { useList } from "@refinedev/core";
      const { result: data, query: {
            isLoading,
      } } = useList()
    `;

    expect(transform(source).trim()).toBe(expected.trim());
  });

  it("should handle multiple query fields", () => {
    const source = `
      import { useList } from "@refinedev/core";
      const { data, isLoading, error, isFetching, isError } = useList()
    `;

    const expected = `
      import { useList } from "@refinedev/core";
      const {
            result: data,

            query: {
                  isLoading,
                  error,
                  isFetching,
                  isError,
            },
      } = useList()
    `;

    expect(transform(source.trim())).toBe(expected.trim());
  });

  it("should handle all supported query fields", () => {
    const source = `
      import { useList } from "@refinedev/core";
      const {
        data,
        isLoading,
        error,
        refetch,
        status,
        isSuccess,
        isStale,
        fetchStatus,
        failureCount
      } = useList()
    `;

    const expected = `
      import { useList } from "@refinedev/core";
      const {
        result: data,

        query: {
          isLoading,
          error,
          refetch,
          status,
          isSuccess,
          isStale,
          fetchStatus,
          failureCount,
        },
      } = useList()
    `;

    expect(transform(source).trim()).toBe(expected.trim());
  });

  it("should handle renamed query fields", () => {
    const source = `
      import { useList } from "@refinedev/core";
      const { data: posts, isLoading: loading, error: err } = useList()
    `;

    const expected = `
      import { useList } from "@refinedev/core";
      const {
            result: posts,

            query: {
                  isLoading: loading,
                  error: err,
            },
      } = useList()
    `;

    expect(transform(source).trim()).toBe(expected.trim());
  });

  it("should work with useMany and query fields", () => {
    const source = `
      import { useMany } from "@refinedev/core";
      const { data, isLoading, error, isFetching } = useMany({
        resource: "posts",
        ids: [1, 2, 3]
      });
    `;

    const expected = `
      import { useMany } from "@refinedev/core";
      const {
        result: data,

        query: {
          isLoading,
          error,
          isFetching,
        },
      } = useMany({
        resource: "posts",
        ids: [1, 2, 3]
      });
    `;

    expect(transform(source).trim()).toBe(expected.trim());
  });

  it("should work if hook is assigned to a variable", () => {
    const source = `
      import { useList } from "@refinedev/core";
      const list = useList();
      `;

    const expected = `
      import { useList } from "@refinedev/core";
      const migratedList = useList();

      const list = {
            ...migratedList.result,
            ...migratedList.query,
            ...migratedList,
      };
    `;

    expect(transform(source).trim()).toBe(expected.trim());
  });

  it("should work if hook is assigned to a variable", () => {
    const source = `
      import { useList } from "@refinedev/core";
      const useListResponse = useList();
      `;

    const expected = `
      import { useList } from "@refinedev/core";
      const migratedUseListResponse = useList();

      const useListResponse = {
            ...migratedUseListResponse.result,
            ...migratedUseListResponse.query,
            ...migratedUseListResponse,
      };
    `;

    expect(transform(source).trim()).toBe(expected.trim());
  });
});
