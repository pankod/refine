import transformFunction from "./use-query-and-result-fields-in-useInfiniteList-hook";
import jscodeshift, { type JSCodeshift } from "jscodeshift";

const transform = (source: string) => {
  const j: JSCodeshift = jscodeshift.withParser("tsx");
  const root = j(source);

  return transformFunction(j, root);
};

describe("useInfiniteList-return-type-update", () => {
  it("should transform basic useInfiniteList destructuring", () => {
    const source = `
      import { useInfiniteList } from "@refinedev/core";

      const MyComponent = () => {
        const {
          data,
          error,
          hasNextPage,
          isLoading,
          fetchNextPage,
          isFetchingNextPage,
        } = useInfiniteList({
          resource: "posts"
        });

        return <div>Content</div>;
      };
    `;

    const expected = `
      import { useInfiniteList } from "@refinedev/core";

      const MyComponent = () => {
        const {
          query: {
            error,
            isLoading,
            fetchNextPage,
            isFetchingNextPage
          },

          result: {
            data,
            hasNextPage
          }
        } = useInfiniteList({
          resource: "posts"
        });

        return <div>Content</div>;
      };
    `;

    expect(transform(source).trim()).toBe(expected.trim());
  });

  it("should handle renamed destructured properties", () => {
    const source = `
      import { useInfiniteList } from "@refinedev/core";

      const MyComponent = () => {
        const {
          data: posts,
          isLoading: loading,
          hasNextPage,
        } = useInfiniteList({
          resource: "posts"
        });

        return <div>Content</div>;
      };
    `;

    const expected = `
      import { useInfiniteList } from "@refinedev/core";

      const MyComponent = () => {
        const {
          query: {
            isLoading: loading
          },

          result: {
            data: posts,
            hasNextPage
          }
        } = useInfiniteList({
          resource: "posts"
        });

        return <div>Content</div>;
      };
    `;

    expect(transform(source).trim()).toBe(expected.trim());
  });

  it("should preserve overtime and other non-query/result properties", () => {
    const source = `
      import { useInfiniteList } from "@refinedev/core";

      const MyComponent = () => {
        const {
          data,
          isLoading,
          overtime,
        } = useInfiniteList({
          resource: "posts"
        });

        return <div>Content</div>;
      };
    `;

    const expected = `
      import { useInfiniteList } from "@refinedev/core";

      const MyComponent = () => {
        const {
          query: {
            isLoading
          },

          result: {
            data
          },

          overtime
        } = useInfiniteList({
          resource: "posts"
        });

        return <div>Content</div>;
      };
    `;

    expect(transform(source).trim()).toBe(expected.trim());
  });

  it("should handle only query properties", () => {
    const source = `
      import { useInfiniteList } from "@refinedev/core";

      const MyComponent = () => {
        const {
          isLoading,
          error,
          fetchNextPage,
        } = useInfiniteList({
          resource: "posts"
        });

        return <div>Content</div>;
      };
    `;

    const expected = `
      import { useInfiniteList } from "@refinedev/core";

      const MyComponent = () => {
        const {
          query: {
            isLoading,
            error,
            fetchNextPage
          }
        } = useInfiniteList({
          resource: "posts"
        });

        return <div>Content</div>;
      };
    `;

    expect(transform(source).trim()).toBe(expected.trim());
  });

  it("should handle only result properties", () => {
    const source = `
      import { useInfiniteList } from "@refinedev/core";

      const MyComponent = () => {
        const {
          data,
          hasNextPage,
        } = useInfiniteList({
          resource: "posts"
        });

        return <div>Content</div>;
      };
    `;

    const expected = `
      import { useInfiniteList } from "@refinedev/core";

      const MyComponent = () => {
        const {
          result: {
            data,
            hasNextPage
          }
        } = useInfiniteList({
          resource: "posts"
        });

        return <div>Content</div>;
      };
    `;

    expect(transform(source).trim()).toBe(expected.trim());
  });

  it("should not transform non-destructured usage", () => {
    const source = `
      import { useInfiniteList } from "@refinedev/core";

      const MyComponent = () => {
        const queryResult = useInfiniteList({
          resource: "posts"
        });

        return <div>{queryResult.data}</div>;
      };
    `;

    const expected = `
      import { useInfiniteList } from "@refinedev/core";

      const MyComponent = () => {
        const queryResult = useInfiniteList({
          resource: "posts"
        });

        return <div>{queryResult.data}</div>;
      };
    `;

    expect(transform(source).trim()).toBe(expected.trim());
  });

  it("should handle TypeScript generic usage", () => {
    const source = `
      import { useInfiniteList } from "@refinedev/core";

      interface IPost {
        id: number;
        title: string;
      }

      const MyComponent = () => {
        const {
          data,
          hasNextPage,
          isLoading,
        } = useInfiniteList<IPost>({
          resource: "posts"
        });

        return <div>Content</div>;
      };
    `;

    const expected = `
      import { useInfiniteList } from "@refinedev/core";

      interface IPost {
        id: number;
        title: string;
      }

      const MyComponent = () => {
        const {
          query: {
            isLoading
          },

          result: {
            data,
            hasNextPage
          }
        } = useInfiniteList<IPost>({
          resource: "posts"
        });

        return <div>Content</div>;
      };
    `;

    expect(transform(source).trim()).toBe(expected.trim());
  });
});
