import transformFunction from "./use-query-and-result-fields-in-useOne-hook";
import jscodeshift, { type JSCodeshift } from "jscodeshift";

const transform = (source: string) => {
  const j: JSCodeshift = jscodeshift.withParser("tsx");
  const root = j(source);

  return transformFunction(j, root);
};

describe("use-query-and-result-fields-in-useOne-hook", () => {
  it("should handle result in useOne", () => {
    const source = `
      import { useOne } from "@refinedev/core";
      const { data } = useOne({
        id: 123
      });

      const post = data?.data ?? {};
    `;

    const expected = `
      import { useOne } from "@refinedev/core";
      const { result } = useOne({
        id: 123
      });

      const post = result ?? {};
    `;

    expect(transform(source).trim()).toBe(expected.trim());
  });

  it("should handle renamed result in useOne", () => {
    const source = `
      import { useOne } from "@refinedev/core";
      const { data: postData } = useOne({
        id: 123
      });

      const post = postData?.data ?? {};
    `;

    const expected = `
      import { useOne } from "@refinedev/core";
      const { result: postData } = useOne({
        id: 123
      });

      const post = postData ?? {};
    `;

    expect(transform(source).trim()).toBe(expected.trim());
  });

  it("should handle result with isLoading in useOne", () => {
    const source = `
      import { useOne } from "@refinedev/core";

      export const EditProduct = () => {
        const { 
          data, 
          isLoading,
          refetch,
          error,
          status,
          isSuccess,
          isStale,
          fetchStatus,
          failureCount
        } = useOne({ id: 123 });

        if (isLoading) {
          return <div>Loading...</div>;
        }

        return (
          <div>
            <div>Product name: {data?.data.name}</div>
            <div>Product price: {data?.data.price}</div>
          </div>
        );
      };
    `;

    const expected = `
      import { useOne } from "@refinedev/core";

      export const EditProduct = () => {
        const {
          result,

          query: {
            isLoading,
            refetch,
            error,
            status,
            isSuccess,
            isStale,
            fetchStatus,
            failureCount
          }
        } = useOne({ id: 123 });

        if (isLoading) {
          return <div>Loading...</div>;
        }

        return (
          <div>
            <div>Product name: {result?.name}</div>
            <div>Product price: {result?.price}</div>
          </div>
        );
      };
    `;

    expect(transform(source).trim()).toBe(expected.trim());
  });
});
