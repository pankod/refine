import renamePaginationCurrentToCurrentPage from "./rename-pagination-current-to-currentPage";
import jscodeshift, { type JSCodeshift } from "jscodeshift";

const transform = (source: string) => {
  const j: JSCodeshift = jscodeshift.withParser("tsx");
  const root = j(source);

  renamePaginationCurrentToCurrentPage(j, root);

  return root.toSource({
    quote: "double",
    trailingComma: true,
  });
};

describe("rename-pagination-current-to-currentPage", () => {
  it("should rename pagination.current to pagination.currentPage in useTable", () => {
    const source = `
      import { useTable } from "@refinedev/core";
      const { data } = useTable({
        resource: "posts",
        pagination: { current: 1, pageSize: 10 }
      });
    `;
    const expected = `
      import { useTable } from "@refinedev/core";
      const { data } = useTable({
        resource: "posts",
        pagination: { currentPage: 1, pageSize: 10 }
      });
    `;
    expect(transform(source).trim()).toBe(expected.trim());
  });

  it("should rename pagination.current to pagination.currentPage in useList", () => {
    const source = `
      import { useList } from "@refinedev/core";
      const { data } = useList({
        resource: "posts",
        pagination: { current: 2, pageSize: 5 }
      });
    `;
    const expected = `
      import { useList } from "@refinedev/core";
      const { data } = useList({
        resource: "posts",
        pagination: { currentPage: 2, pageSize: 5 }
      });
    `;
    expect(transform(source).trim()).toBe(expected.trim());
  });

  it("should rename pagination.current to pagination.currentPage in useDataGrid", () => {
    const source = `
      import { useDataGrid } from "@refinedev/mui";
      const { dataGridProps } = useDataGrid({
        resource: "posts",
        pagination: { current: 1, pageSize: 10 }
      });
    `;
    const expected = `
      import { useDataGrid } from "@refinedev/mui";
      const { dataGridProps } = useDataGrid({
        resource: "posts",
        pagination: { currentPage: 1, pageSize: 10 }
      });
    `;
    expect(transform(source).trim()).toBe(expected.trim());
  });

  it("should rename pagination.current to pagination.currentPage in useSimpleList", () => {
    const source = `
      import { useSimpleList } from "@refinedev/antd";
      const { listProps } = useSimpleList({
        resource: "posts",
        pagination: { current: 3, pageSize: 20 }
      });
    `;
    const expected = `
      import { useSimpleList } from "@refinedev/antd";
      const { listProps } = useSimpleList({
        resource: "posts",
        pagination: { currentPage: 3, pageSize: 20 }
      });
    `;
    expect(transform(source).trim()).toBe(expected.trim());
  });

  it("should rename pagination.current to pagination.currentPage in useSelect", () => {
    const source = `
      import { useSelect } from "@refinedev/core";
      const { options } = useSelect({
        resource: "categories",
        pagination: { current: 1, pageSize: 100 }
      });
    `;
    const expected = `
      import { useSelect } from "@refinedev/core";
      const { options } = useSelect({
        resource: "categories",
        pagination: { currentPage: 1, pageSize: 100 }
      });
    `;
    expect(transform(source).trim()).toBe(expected.trim());
  });

  it("should not transform if hook is from non-refine package", () => {
    const source = `
      import { useTable } from "other-library";
      const { data } = useTable({
        resource: "posts",
        pagination: { current: 1, pageSize: 10 }
      });
    `;
    const expected = `
      import { useTable } from "other-library";
      const { data } = useTable({
        resource: "posts",
        pagination: { current: 1, pageSize: 10 }
      });
    `;
    expect(transform(source).trim()).toBe(expected.trim());
  });

  it("should not transform if there is no pagination property", () => {
    const source = `
      import { useList } from "@refinedev/core";
      const { data } = useList({
        resource: "posts"
      });
    `;
    const expected = `
      import { useList } from "@refinedev/core";
      const { data } = useList({
        resource: "posts"
      });
    `;
    expect(transform(source).trim()).toBe(expected.trim());
  });

  it("should not transform if pagination has no current property", () => {
    const source = `
      import { useTable } from "@refinedev/core";
      const { data } = useTable({
        resource: "posts",
        pagination: { pageSize: 10 }
      });
    `;
    const expected = `
      import { useTable } from "@refinedev/core";
      const { data } = useTable({
        resource: "posts",
        pagination: { pageSize: 10 }
      });
    `;
    expect(transform(source).trim()).toBe(expected.trim());
  });

  it("should preserve other pagination properties", () => {
    const source = `
      import { useList } from "@refinedev/core";
      const { data } = useList({
        resource: "posts",
        pagination: { current: 1, pageSize: 10, showTotal: true, showQuickJumper: false }
      });
    `;
    const expected = `
      import { useList } from "@refinedev/core";
      const { data } = useList({
        resource: "posts",
        pagination: { currentPage: 1, pageSize: 10, showTotal: true, showQuickJumper: false }
      });
    `;
    expect(transform(source).trim()).toBe(expected.trim());
  });

  it("should handle nested objects and not transform other current properties", () => {
    const source = `
      import { useTable } from "@refinedev/core";
      const { data } = useTable({
        resource: "posts",
        pagination: { current: 1, pageSize: 10 },
        sorters: { current: "title" }
      });
    `;
    const expected = `
      import { useTable } from "@refinedev/core";
      const { data } = useTable({
        resource: "posts",
        pagination: { currentPage: 1, pageSize: 10 },
        sorters: { current: "title" }
      });
    `;
    expect(transform(source).trim()).toBe(expected.trim());
  });

  it("should work with react-table package", () => {
    const source = `
      import { useTable } from "@refinedev/react-table";
      const { getHeaderGroups } = useTable({
        resource: "posts",
        pagination: { current: 2, pageSize: 15 }
      });
    `;
    const expected = `
      import { useTable } from "@refinedev/react-table";
      const { getHeaderGroups } = useTable({
        resource: "posts",
        pagination: { currentPage: 2, pageSize: 15 }
      });
    `;
    expect(transform(source).trim()).toBe(expected.trim());
  });
});
