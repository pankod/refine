import { type ColumnDef, ColumnFilter } from "@tanstack/react-table";
import { crudFiltersToColumnFilters } from ".";
import type { CrudFilter } from "@refinedev/core";

describe("crudFiltersToColumnFilters", () => {
  it("should return with ColumnFilter type", () => {
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

    const crudFilters: CrudFilter[] = [
      { field: "name", value: "John", operator: "eq" },
      { field: "age", value: 30, operator: "eq" },
    ];

    const columnFilters = crudFiltersToColumnFilters({
      columns,
      crudFilters,
    });

    expect(columnFilters).toEqual([
      { id: "name", value: "John", operator: "eq" },
      { id: "age", value: 30, operator: "eq" },
    ]);
  });

  it("should work with conditional filters", () => {
    const columns: ColumnDef<any, any>[] = [
      {
        id: "name",
        header: "Name",
        accessorKey: "name",
      },
      {
        id: "age",
        header: "Age",
        accessorKey: "age",
      },
    ];

    const crudFilters: CrudFilter[] = [
      {
        operator: "and",
        key: "name",
        value: [
          { field: "name", value: "John", operator: "eq" },
          { field: "name", value: "Doe", operator: "eq" },
        ],
      },
      {
        operator: "and",
        key: "age",
        value: [
          { field: "age", value: 30, operator: "eq" },
          { field: "age", value: 40, operator: "eq" },
        ],
      },
    ];

    const columnFilters = crudFiltersToColumnFilters({
      columns,
      crudFilters,
    });

    expect(columnFilters).toEqual([
      {
        id: "name",
        value: [
          { field: "name", value: "John", operator: "eq" },
          { field: "name", value: "Doe", operator: "eq" },
        ],
        operator: "and",
      },
      {
        id: "age",
        value: [
          { field: "age", value: 30, operator: "eq" },
          { field: "age", value: 40, operator: "eq" },
        ],
        operator: "and",
      },
    ]);
  });

  it("should respect custom filterKey", () => {
    const columns: ColumnDef<any, any>[] = [
      {
        id: "name",
        header: "Name",
        accessorKey: "name",
        meta: {
          filterKey: "nameFilter",
        },
      },
      {
        id: "age",
        header: "Age",
        accessorKey: "age",
        meta: {
          filterKey: "ageFilter",
        },
      },
    ];

    const crudFilters: CrudFilter[] = [
      {
        operator: "and",
        key: "nameFilter",
        value: [
          { field: "name", value: "John", operator: "eq" },
          { field: "name", value: "Doe", operator: "eq" },
        ],
      },
      {
        operator: "and",
        key: "ageFilter",
        value: [
          { field: "age", value: 30, operator: "eq" },
          { field: "age", value: 40, operator: "eq" },
        ],
      },
    ];

    const columnFilters = crudFiltersToColumnFilters({
      columns,
      crudFilters,
    });

    expect(columnFilters).toEqual([
      {
        id: "name",
        value: [
          { field: "name", value: "John", operator: "eq" },
          { field: "name", value: "Doe", operator: "eq" },
        ],
        operator: "and",
      },
      {
        id: "age",
        value: [
          { field: "age", value: 30, operator: "eq" },
          { field: "age", value: 40, operator: "eq" },
        ],
        operator: "and",
      },
    ]);
  });
});
