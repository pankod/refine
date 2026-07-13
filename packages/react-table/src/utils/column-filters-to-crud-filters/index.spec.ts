import type { ColumnDef, ColumnFilter } from "@tanstack/react-table";
import { columnFiltersToCrudFilters } from ".";

describe("columnFiltersToCrudFilters", () => {
  it("should return with crud filters type", () => {
    const columns: ColumnDef<any, any>[] = [
      {
        id: "name",
        header: "Name",
        accessorKey: "name",
      },
      {
        header: "Age",
        accessorKey: "age",
      },
    ];

    const columnFilters: ColumnFilter[] = [
      { id: "name", value: "John" },
      { id: "age", value: 30 },
    ];

    const crudFilters = columnFiltersToCrudFilters({
      columns,
      columnFilters,
    });

    expect(crudFilters).toEqual([
      { field: "name", value: "John", operator: "eq" },
      { field: "age", value: 30, operator: "eq" },
    ]);
  });

  it("should set operator to 'in' if value is an array", () => {
    const columns: ColumnDef<any, any>[] = [
      {
        id: "name",
        header: "Name",
        accessorKey: "name",
      },
      {
        header: "Age",
        accessorKey: "age",
      },
    ];

    const columnFilters: ColumnFilter[] = [
      { id: "name", value: ["John", "Doe"] },
      { id: "age", value: 30 },
    ];

    const crudFilters = columnFiltersToCrudFilters({
      columns,
      columnFilters,
    });

    expect(crudFilters).toEqual([
      { field: "name", value: ["John", "Doe"], operator: "in" },
      { field: "age", value: 30, operator: "eq" },
    ]);
  });

  it("should respect filterOperator from column meta", () => {
    const columns: ColumnDef<any, any>[] = [
      {
        id: "name",
        header: "Name",
        accessorKey: "name",
        meta: {
          filterOperator: "contains",
        },
      },
      {
        header: "Age",
        accessorKey: "age",
      },
    ];

    const columnFilters: ColumnFilter[] = [
      { id: "name", value: "John" },
      { id: "age", value: 30 },
    ];

    const crudFilters = columnFiltersToCrudFilters({
      columns,
      columnFilters,
    });

    expect(crudFilters).toEqual([
      { field: "name", value: "John", operator: "contains" },
      { field: "age", value: 30, operator: "eq" },
    ]);
  });

  it("should transform and/or filters to conditional filters", () => {
    const columns: ColumnDef<any, any>[] = [
      {
        id: "name",
        header: "Name",
        accessorKey: "name",
        meta: {
          filterOperator: "or",
        },
      },
      {
        id: "age",
        header: "Age",
        accessorKey: "age",
        meta: {
          filterOperator: "and",
        },
      },
    ];

    const columnFilters: ColumnFilter[] = [
      {
        id: "name",
        value: [
          { field: "name", operator: "eq", value: "John" },
          { field: "name", operator: "eq", value: "Doe" },
        ],
      },

      {
        id: "age",
        value: [
          { field: "age", operator: "gte", value: 18 },
          { field: "age", operator: "lte", value: 65 },
        ],
      },
    ];

    const crudFilters = columnFiltersToCrudFilters({
      columns,
      columnFilters,
    });

    expect(crudFilters).toEqual([
      {
        key: "name",
        operator: "or",
        value: [
          { field: "name", operator: "eq", value: "John" },
          { field: "name", operator: "eq", value: "Doe" },
        ],
      },
      {
        key: "age",
        operator: "and",
        value: [
          { field: "age", operator: "gte", value: 18 },
          { field: "age", operator: "lte", value: 65 },
        ],
      },
    ]);
  });

  it("should respect custom filter key for conditional filters", () => {
    const columns: ColumnDef<any, any>[] = [
      {
        id: "name",
        header: "Name",
        accessorKey: "name",
        meta: {
          filterOperator: "or",
        },
      },
      {
        id: "age",
        header: "Age",
        accessorKey: "age",
        meta: {
          filterOperator: "and",
          filterKey: "customKey",
        },
      },
    ];

    const columnFilters: ColumnFilter[] = [
      {
        id: "name",
        value: [
          { field: "name", operator: "eq", value: "John" },
          { field: "name", operator: "eq", value: "Doe" },
        ],
      },

      {
        id: "age",
        value: [
          { field: "age", operator: "gte", value: 18 },
          { field: "age", operator: "lte", value: 65 },
        ],
      },
    ];

    const crudFilters = columnFiltersToCrudFilters({
      columns,
      columnFilters,
    });

    expect(crudFilters).toEqual([
      {
        key: "name",
        operator: "or",
        value: [
          { field: "name", operator: "eq", value: "John" },
          { field: "name", operator: "eq", value: "Doe" },
        ],
      },
      {
        key: "customKey",
        operator: "and",
        value: [
          { field: "age", operator: "gte", value: 18 },
          { field: "age", operator: "lte", value: 65 },
        ],
      },
    ]);
  });
});
