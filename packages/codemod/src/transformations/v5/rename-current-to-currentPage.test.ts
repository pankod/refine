import renameCurrentToCurrentPage from "./rename-current-to-currentPage";
import jscodeshift, { type JSCodeshift } from "jscodeshift";

const transform = (source: string) => {
  const j: JSCodeshift = jscodeshift.withParser("tsx");
  const root = j(source);

  renameCurrentToCurrentPage(j, root);

  return root.toSource({
    quote: "double",
    trailingComma: true,
  });
};

describe("rename-current-to-currentPage", () => {
  it("should alias current and setCurrent from useTable when imported from @refinedev/react-table", () => {
    const source = `
      import { useTable } from "@refinedev/core";
      const { current, setCurrent } = useTable();
    `;
    const expected = `
      import { useTable } from "@refinedev/core";
      const { currentPage: current, setCurrentPage: setCurrent } = useTable();
    `;
    expect(transform(source).trim()).toBe(expected.trim());
  });

  it("should not alias if useTable is imported from another package", () => {
    const source = `
      import { useTable } from "some-other-lib";
      const { current, setCurrent } = useTable();
    `;
    const expected = `
      import { useTable } from "some-other-lib";
      const { current, setCurrent } = useTable();
    `;
    expect(transform(source).trim()).toBe(expected.trim());
  });

  it("should alias only current if setCurrent is not present and imported from @refinedev/react-table", () => {
    const source = `
      import { useTable } from "@refinedev/react-table";
      const { current } = useTable();
    `;
    const expected = `
      import { useTable } from "@refinedev/react-table";
      const { currentPage: current } = useTable();
    `;
    expect(transform(source).trim()).toBe(expected.trim());
  });

  it("should alias only setCurrent if current is not present and imported from @refinedev/react-table", () => {
    const source = `
      import { useTable } from "@refinedev/react-table";
      const { setCurrent } = useTable();
    `;
    const expected = `
      import { useTable } from "@refinedev/react-table";
      const { setCurrentPage: setCurrent } = useTable();
    `;
    expect(transform(source).trim()).toBe(expected.trim());
  });

  it("should not change unrelated destructuring", () => {
    const source = `
      import { useTable } from "@refinedev/react-table";
      const { pageSize, pagination } = useTable();
    `;
    const expected = `
      import { useTable } from "@refinedev/react-table";
      const { pageSize, pagination } = useTable();
    `;
    expect(transform(source).trim()).toBe(expected.trim());
  });

  it("should work with useDataGrid", () => {
    const source = `
      import { useDataGrid } from "@refinedev/mui";
      const { current, setCurrent } = useDataGrid();
    `;
    const expected = `
      import { useDataGrid } from "@refinedev/mui";
      const { currentPage: current, setCurrentPage: setCurrent } = useDataGrid();
    `;
    expect(transform(source).trim()).toBe(expected.trim());
  });

  it("should not alias useDataGrid if imported from another package", () => {
    const source = `
      import { useDataGrid } from "other-lib";
      const { current, setCurrent } = useDataGrid();
    `;
    const expected = `
      import { useDataGrid } from "other-lib";
      const { current, setCurrent } = useDataGrid();
    `;
    expect(transform(source).trim()).toBe(expected.trim());
  });

  it("should not alias useTable if imported from another package", () => {
    const source = `
      import { useTable } from "other-lib";
      const { current, setCurrent } = useTable();
    `;
    const expected = `
      import { useTable } from "other-lib";
      const { current, setCurrent } = useTable();
    `;
    expect(transform(source).trim()).toBe(expected.trim());
  });

  it("should work with useSimpleList from @refinedev/antd", () => {
    const source = `
      import { useSimpleList } from "@refinedev/antd";
      const { current, setCurrent } = useSimpleList();
    `;
    const expected = `
      import { useSimpleList } from "@refinedev/antd";
      const { currentPage: current, setCurrentPage: setCurrent } = useSimpleList();
    `;
    expect(transform(source).trim()).toBe(expected.trim());
  });

  it("should not alias useSimpleList if imported from another package", () => {
    const source = `
      import { useSimpleList } from "other-lib";
      const { current, setCurrent } = useSimpleList();
    `;
    const expected = `
      import { useSimpleList } from "other-lib";
      const { current, setCurrent } = useSimpleList();
    `;
    expect(transform(source).trim()).toBe(expected.trim());
  });

  it("should refactor refineCore.current to refineCore.currentPage", () => {
    const source = `
      import { useTable } from "@refinedev/react-table";
      const { setCurrent } = useTable();
    `;
    const expected = `
      import { useTable } from "@refinedev/react-table";
      const { setCurrentPage: setCurrent } = useTable();
    `;
    expect(transform(source).trim()).toBe(expected.trim());
  });

  it("should handle nested destructuring with refineCore", () => {
    const source = `
      import { useTable } from "@refinedev/react-table";
      const {
        refineCore: { setCurrent, current, pageCount }
      } = useTable();
    `;
    const expected = `
      import { useTable } from "@refinedev/react-table";
      const {
        refineCore: {
          setCurrentPage: setCurrent,
          currentPage: current,
          pageCount,
        }
      } = useTable();
    `;
    expect(transform(source).trim()).toBe(expected.trim());
  });

  it("should handle nested destructuring with only current", () => {
    const source = `
      import { useTable } from "@refinedev/core";
      const {
        refineCore: { current, pageCount }
      } = useTable();
    `;
    const expected = `
      import { useTable } from "@refinedev/core";
      const {
        refineCore: {
          currentPage: current,
          pageCount,
        }
      } = useTable();
    `;
    expect(transform(source).trim()).toBe(expected.trim());
  });

  it("should handle nested destructuring with only setCurrent", () => {
    const source = `
      import { useTable } from "@refinedev/react-table";
      const {
        refineCore: { setCurrent, pageCount }
      } = useTable();
    `;
    const expected = `
      import { useTable } from "@refinedev/react-table";
      const {
        refineCore: {
          setCurrentPage: setCurrent,
          pageCount,
        }
      } = useTable();
    `;
    expect(transform(source).trim()).toBe(expected.trim());
  });

  it("should handle mixed nested and flat destructuring", () => {
    const source = `
      import { useTable } from "@refinedev/react-table";
      const {
        getHeaderGroups,
        getRowModel,
        refineCore: { setCurrent, current, pageCount }
      } = useTable();
    `;
    const expected = `
      import { useTable } from "@refinedev/react-table";
      const {
        getHeaderGroups,
        getRowModel,
        refineCore: {
          setCurrentPage: setCurrent,
          currentPage: current,
          pageCount,
        }
      } = useTable();
    `;
    expect(transform(source).trim()).toBe(expected.trim());
  });

  it("should not transform nested destructuring from unsupported packages", () => {
    const source = `
      import { useTable } from "other-lib";
      const {
        refineCore: { setCurrent, current }
      } = useTable();
    `;
    const expected = `
      import { useTable } from "other-lib";
      const {
        refineCore: { setCurrent, current }
      } = useTable();
    `;
    expect(transform(source).trim()).toBe(expected.trim());
  });

  it("should work with antd useTable", () => {
    const source = `
      import { useTable } from "@refinedev/antd";

      const {
        tableProps,
        tableQuery: tableQueryResult,
        searchFormProps,
        filters,
        sorters,
        setCurrent,
        setPageSize,
        setFilters,
      } = useTable<
        GetFieldsFromList<CompaniesTableQuery>,
        HttpError,
        { name: string }
      >({
        resource: "companies"
      });`;

    const expected = `
      import { useTable } from "@refinedev/antd";

      const {
        tableProps,
        tableQuery: tableQueryResult,
        searchFormProps,
        filters,
        sorters,
        setCurrentPage: setCurrent,
        setPageSize,
        setFilters,
      } = useTable<
        GetFieldsFromList<CompaniesTableQuery>,
        HttpError,
        { name: string }
      >({
        resource: "companies"
      });`;

    expect(transform(source).trim()).toBe(expected.trim());
  });
});
