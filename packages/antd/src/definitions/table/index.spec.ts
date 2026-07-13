import {
  getDefaultSortOrder,
  getDefaultFilter,
  mapAntdSorterToCrudSorting,
  mapAntdFilterToCrudFilter,
} from "./";
import type { CrudSorting, CrudFilters } from "@refinedev/core";

describe("definitions/table", () => {
  it("getDefaultSortOrder", () => {
    const sorter: CrudSorting = [
      {
        field: "title",
        order: "asc",
      },
      {
        field: "view",
        order: "desc",
      },
    ];

    expect(getDefaultSortOrder("title", sorter)).toEqual("ascend");
  });

  it("getDefaultFilter", () => {
    const filters: CrudFilters = [
      {
        field: "title",
        operator: "contains",
        value: "test",
      },
    ];
    expect(getDefaultFilter("title", filters, "contains")).toEqual("test");
  });

  it("getDefaultFilter empty array", () => {
    const filters: CrudFilters = [
      {
        field: "title",
        operator: "contains",
        value: undefined,
      },
    ];
    expect(getDefaultFilter("title", filters, "contains")).toEqual([]);
  });

  it("getDefaultFilter default operator", () => {
    const filters: CrudFilters = [
      {
        field: "title",
        operator: "eq",
        value: "test",
      },
    ];
    expect(getDefaultFilter("title", filters)).toEqual("test");
  });

  it("mapAntdSorterToCrudSorting", () => {
    expect(
      mapAntdSorterToCrudSorting({
        field: "title",
        order: "descend",
      }),
    ).toMatchInlineSnapshot(`
            [
              {
                "field": "title",
                "order": "desc",
              },
            ]
        `);
  });

  it("mapAntdSorterToCrudSorting with sorting priority", () => {
    expect(
      mapAntdSorterToCrudSorting([
        {
          field: "id",
          order: "descend",
          column: {
            sorter: {
              multiple: 2,
            },
          },
        },
        {
          field: "title",
          order: "descend",
          column: {
            sorter: {
              multiple: 1,
            },
          },
        },
      ]),
    ).toMatchInlineSnapshot(`
            [
              {
                "field": "title",
                "order": "desc",
              },
              {
                "field": "id",
                "order": "desc",
              },
            ]
        `);
  });

  it("mapAntdSorterToCrudSorting for array and columnKey", () => {
    expect(
      mapAntdSorterToCrudSorting([
        {
          columnKey: "title",
          field: "title",
          order: "descend",
        },
      ]),
    ).toMatchInlineSnapshot(`
            [
              {
                "field": "title",
                "order": "desc",
              },
            ]
        `);
  });

  it("mapAntdSorterToCrudSorting for nested columnKey and field", () => {
    expect(
      mapAntdSorterToCrudSorting([
        {
          columnKey: "category.title",
          field: "title",
          order: "ascend",
          column: {
            sorter: {
              multiple: 1,
            },
          },
        },
        {
          field: ["version", "title"],
          order: "descend",
          column: {
            sorter: {
              multiple: 2,
            },
          },
        },
      ]),
    ).toMatchInlineSnapshot(`
            [
              {
                "field": "category.title",
                "order": "asc",
              },
              {
                "field": "version.title",
                "order": "desc",
              },
            ]
        `);
  });

  it("mapAntdFilterToCrudFilter", () => {
    expect(
      mapAntdFilterToCrudFilter(
        {
          foo: ["bar", "baz"],
        },
        [],
      ),
    ).toMatchInlineSnapshot(`
            [
              {
                "field": "foo",
                "operator": "in",
                "value": [
                  "bar",
                  "baz",
                ],
              },
            ]
        `);
  });

  it("mapAntdFilterToCrudFilter with non array", () => {
    expect(
      mapAntdFilterToCrudFilter(
        {
          foo: "bar",
        },
        [],
      ),
    ).toMatchInlineSnapshot(`
            [
              {
                "field": "foo",
                "operator": "eq",
                "value": "bar",
              },
            ]
        `);
  });

  it("mapAntdFilterToCrudFilter with value 0", () => {
    expect(
      mapAntdFilterToCrudFilter(
        {
          foo: [0],
        },
        [],
      ),
    ).toMatchInlineSnapshot(`
            [
              {
                "field": "foo",
                "operator": "in",
                "value": [
                  0,
                ],
              },
            ]
        `);
  });

  it("mapAntdFilterToCrudFilter with in operator and null value", () => {
    expect(
      mapAntdFilterToCrudFilter(
        {
          foo: null,
        },
        [
          {
            field: "foo",
            operator: "in",
            value: ["1"],
          },
        ],
      ),
    ).toMatchInlineSnapshot(`
            [
              {
                "field": "foo",
                "operator": "in",
                "value": null,
              },
            ]
        `);
  });

  it("mapAntdFilterToCrudFilter with eq operator and null value", () => {
    expect(
      mapAntdFilterToCrudFilter(
        {
          foo: null,
        },
        [
          {
            field: "foo",
            operator: "eq",
            value: "1",
          },
        ],
      ),
    ).toMatchInlineSnapshot(`
            [
              {
                "field": "foo",
                "operator": "eq",
                "value": null,
              },
            ]
        `);
  });

  it("mapAntdFilterToCrudFilter with map initial filter to restore operator in no data on previous filters", () => {
    expect(
      mapAntdFilterToCrudFilter(
        {
          foo: "Test",
        },
        [],
        [{ field: "foo", operator: "contains", value: "" }],
      ),
    ).toMatchInlineSnapshot(`
            [
              {
                "field": "foo",
                "operator": "contains",
                "value": "Test",
              },
            ]
        `);
  });
});
