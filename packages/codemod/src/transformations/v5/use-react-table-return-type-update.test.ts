import transformFunction from "./use-react-table-return-type-update";
import jscodeshift, { type JSCodeshift } from "jscodeshift";

const transform = (source: string) => {
  const j: JSCodeshift = jscodeshift.withParser("tsx");
  const root = j(source);

  return transformFunction(j, root);
};

describe("use-table-return-type-update", () => {
  it("should transform spread destructuring to reactTable object", () => {
    const source = `
      import { useTable } from "@refinedev/react-table";

      const MyComponent = () => {
        const {
          refineCore,
          ...reactTableResult
        } = useTable({
          columns,
        });

        return <div>Content</div>;
      };
    `;

    const expected = `
      import { useTable } from "@refinedev/react-table";

      const MyComponent = () => {
        const {
          reactTable: {
            ...reactTableResult
          },

          refineCore
        } = useTable({
          columns,
        });

        return <div>Content</div>;
      };
    `;

    expect(transform(source).trim()).toBe(expected.trim());
  });

  it("should handle named destructured properties", () => {
    const source = `
      import { useTable } from "@refinedev/react-table";

      const MyComponent = () => {
        const {
          getHeaderGroups,
          getRowModel,
          refineCore,
        } = useTable({
          columns,
        });

        return <div>Content</div>;
      };
    `;

    const expected = `
      import { useTable } from "@refinedev/react-table";

      const MyComponent = () => {
        const {
          reactTable: {
            getHeaderGroups,
            getRowModel
          },

          refineCore
        } = useTable({
          columns,
        });

        return <div>Content</div>;
      };
    `;

    expect(transform(source).trim()).toBe(expected.trim());
  });

  it("should handle renamed destructured properties", () => {
    const source = `
      import { useTable } from "@refinedev/react-table";

      const MyComponent = () => {
        const {
          getHeaderGroups: headerGroups,
          getRowModel: rowModel,
          refineCore: coreResult,
        } = useTable({
          columns,
        });

        return <div>Content</div>;
      };
    `;

    const expected = `
      import { useTable } from "@refinedev/react-table";

      const MyComponent = () => {
        const {
          reactTable: {
            getHeaderGroups: headerGroups,
            getRowModel: rowModel
          },

          refineCore: coreResult
        } = useTable({
          columns,
        });

        return <div>Content</div>;
      };
    `;

    expect(transform(source).trim()).toBe(expected.trim());
  });

  it("should handle only refineCore property", () => {
    const source = `
      import { useTable } from "@refinedev/react-table";

      const MyComponent = () => {
        const {
          refineCore,
        } = useTable({
          columns,
        });

        return <div>Content</div>;
      };
    `;

    const expected = `
      import { useTable } from "@refinedev/react-table";

      const MyComponent = () => {
        const {
          refineCore,
        } = useTable({
          columns,
        });

        return <div>Content</div>;
      };
    `;

    expect(transform(source).trim()).toBe(expected.trim());
  });

  it("should not transform non-destructured usage", () => {
    const source = `
      import { useTable } from "@refinedev/react-table";

      const MyComponent = () => {
        const tableResult = useTable({
          columns,
        });

        return <div>{tableResult.refineCore.data}</div>;
      };
    `;

    const expected = `
      import { useTable } from "@refinedev/react-table";

      const MyComponent = () => {
        const tableResult = useTable({
          columns,
        });

        return <div>{tableResult.refineCore.data}</div>;
      };
    `;

    expect(transform(source).trim()).toBe(expected.trim());
  });

  it("should not transform useTable from other packages", () => {
    const source = `
      import { useTable } from "@refinedev/core";

      const MyComponent = () => {
        const {
          data,
          isLoading,
        } = useTable({
          resource: "posts",
        });

        return <div>Content</div>;
      };
    `;

    const expected = `
      import { useTable } from "@refinedev/core";

      const MyComponent = () => {
        const {
          data,
          isLoading,
        } = useTable({
          resource: "posts",
        });

        return <div>Content</div>;
      };
    `;

    expect(transform(source).trim()).toBe(expected.trim());
  });

  it("should handle TypeScript generic usage", () => {
    const source = `
      import { useTable } from "@refinedev/react-table";

      interface IPost {
        id: number;
        title: string;
      }

      const MyComponent = () => {
        const {
          getHeaderGroups,
          getRowModel,
          refineCore,
        } = useTable<IPost>({
          columns,
        });

        return <div>Content</div>;
      };
    `;

    const expected = `
      import { useTable } from "@refinedev/react-table";

      interface IPost {
        id: number;
        title: string;
      }

      const MyComponent = () => {
        const {
          reactTable: {
            getHeaderGroups,
            getRowModel
          },

          refineCore
        } = useTable<IPost>({
          columns,
        });

        return <div>Content</div>;
      };
    `;

    expect(transform(source).trim()).toBe(expected.trim());
  });

  it("should not transform already transformed code (idempotent)", () => {
    const source = `
      import { useTable } from "@refinedev/react-table";

      const MyComponent = () => {
        const {
          reactTable: {
            getHeaderGroups,
            getRowModel
          },
          refineCore
        } = useTable({
          columns,
        });

        return <div>Content</div>;
      };
    `;

    const expected = `
      import { useTable } from "@refinedev/react-table";

      const MyComponent = () => {
        const {
          reactTable: {
            getHeaderGroups,
            getRowModel
          },
          refineCore
        } = useTable({
          columns,
        });

        return <div>Content</div>;
      };
    `;

    expect(transform(source).trim()).toBe(expected.trim());
  });

  it("should not transform already transformed code with spread (idempotent)", () => {
    const source = `
      import { useTable } from "@refinedev/react-table";

      const MyComponent = () => {
        const {
          reactTable: {
            ...reactTableResult
          },
          refineCore
        } = useTable({
          columns,
        });

        return <div>Content</div>;
      };
    `;

    const expected = `
      import { useTable } from "@refinedev/react-table";

      const MyComponent = () => {
        const {
          reactTable: {
            ...reactTableResult
          },
          refineCore
        } = useTable({
          columns,
        });

        return <div>Content</div>;
      };
    `;

    expect(transform(source).trim()).toBe(expected.trim());
  });

  it("should not transform already transformed code with mixed properties (idempotent)", () => {
    const source = `
      import { useTable } from "@refinedev/react-table";

      const MyComponent = () => {
        const {
          reactTable: {
            getHeaderGroups,
            ...rest
          },
          refineCore: coreResult
        } = useTable({
          columns,
        });

        return <div>Content</div>;
      };
    `;

    const expected = `
      import { useTable } from "@refinedev/react-table";

      const MyComponent = () => {
        const {
          reactTable: {
            getHeaderGroups,
            ...rest
          },
          refineCore: coreResult
        } = useTable({
          columns,
        });

        return <div>Content</div>;
      };
    `;

    expect(transform(source).trim()).toBe(expected.trim());
  });
});
