import useQueryAndResultFieldsInCustomHooksTransform from "./use-query-and-result-fields-in-useCustom-hook";
import jscodeshift, { type JSCodeshift } from "jscodeshift";

const transform = (source: string) => {
  const j: JSCodeshift = jscodeshift.withParser("tsx");
  const root = j(source);

  return useQueryAndResultFieldsInCustomHooksTransform(j, root);
};

describe("use-query-and-result-fields-in-useCustom-hook", () => {
  it("should rename data to result in useCustom", () => {
    const source = `
      import { useCustom } from "@refinedev/core";
      const { data } = useCustom({
        url: "remoteUrl",
        method: "get",
      });
    `;
    const expected = `
      import { useCustom } from "@refinedev/core";
      const { result: data } = useCustom({
        url: "remoteUrl",
        method: "get",
      });
    `;
    expect(transform(source).trim()).toBe(expected.trim());
  });

  it("should rename renamed data from useCustom", () => {
    const source = `
      import { useCustom } from "@refinedev/core";
      const { data: customData } = useCustom({
        url: "remoteUrl",
        method: "get",
      });
    `;
    const expected = `
      import { useCustom } from "@refinedev/core";
      const { result: customData } = useCustom({
        url: "remoteUrl",
        method: "get",
      });
    `;
    expect(transform(source).trim()).toBe(expected.trim());
  });

  it("should use query field", () => {
    const source = `
      import { useCustom } from "@refinedev/core";
      const { data, isLoading } = useCustom({
        url: "remoteUrl",
        method: "get",
      });
    `;

    const expected = `
      import { useCustom } from "@refinedev/core";
      const {
        query: {
          isLoading
        },

        result: data
      } = useCustom({
        url: "remoteUrl",
        method: "get",
      });
    `;

    expect(transform(source).trim()).toBe(expected.trim());
  });

  it("should handle multiple query fields", () => {
    const source = `
      import { useCustom } from "@refinedev/core";
      const { data, isLoading, error, isFetching, isError } = useCustom({
        url: "remoteUrl",
        method: "get",
      });
    `;

    const expected = `
      import { useCustom } from "@refinedev/core";
      const {
        query: {
          isLoading,
          error,
          isFetching,
          isError
        },

        result: data
      } = useCustom({
        url: "remoteUrl",
        method: "get",
      });
    `;

    expect(transform(source.trim())).toBe(expected.trim());
  });

  it("should handle all supported query fields", () => {
    const source = `
      import { useCustom } from "@refinedev/core";
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
      } = useCustom({
        url: "remoteUrl",
        method: "get",
      });
    `;

    const expected = `
      import { useCustom } from "@refinedev/core";
      const {
        query: {
          isLoading,
          error,
          refetch,
          status,
          isSuccess,
          isStale,
          fetchStatus
        },

        result: data,
        failureCount
      } = useCustom({
        url: "remoteUrl",
        method: "get",
      });
    `;

    expect(transform(source).trim()).toBe(expected.trim());
  });

  it("should handle renamed query fields", () => {
    const source = `
      import { useCustom } from "@refinedev/core";
      const { data: customData, isLoading: loading, error: err } = useCustom({
        url: "remoteUrl",
        method: "get",
      });
    `;

    const expected = `
      import { useCustom } from "@refinedev/core";
      const {
        query: {
          isLoading: loading,
          error: err
        },

        result: customData
      } = useCustom({
        url: "remoteUrl",
        method: "get",
      });
    `;

    expect(transform(source).trim()).toBe(expected.trim());
  });

  it("should preserve overtime and other non-query/result properties", () => {
    const source = `
      import { useCustom } from "@refinedev/core";
      const {
        data,
        isLoading,
        overtime,
      } = useCustom({
        url: "remoteUrl",
        method: "get",
      });
    `;

    const expected = `
      import { useCustom } from "@refinedev/core";
      const {
        query: {
          isLoading
        },

        result: data,
        overtime
      } = useCustom({
        url: "remoteUrl",
        method: "get",
      });
    `;

    expect(transform(source).trim()).toBe(expected.trim());
  });

  it("should not transform variable assignment (non-destructuring)", () => {
    const source = `
      import { useCustom } from "@refinedev/core";
      const customQuery = useCustom({
        url: "remoteUrl",
        method: "get",
      });
      `;

    const expected = `
      import { useCustom } from "@refinedev/core";
      const customQuery = useCustom({
        url: "remoteUrl",
        method: "get",
      });
    `;

    expect(transform(source).trim()).toBe(expected.trim());
  });

  it("should not transform variable assignment with useCustom prefix", () => {
    const source = `
      import { useCustom } from "@refinedev/core";
      const useCustomResponse = useCustom({
        url: "remoteUrl",
        method: "get",
      });
      `;

    const expected = `
      import { useCustom } from "@refinedev/core";
      const useCustomResponse = useCustom({
        url: "remoteUrl",
        method: "get",
      });
    `;

    expect(transform(source).trim()).toBe(expected.trim());
  });
});
