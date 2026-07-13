import type { CrudFilter, CrudSort } from "../../contexts/data/types";
import {
  compareFilters,
  compareSorters,
  getDefaultFilter,
  getDefaultSortOrder,
  parseTableParams,
  parseTableParamsFromQuery,
  stringifyTableParams,
  unionFilters,
  unionSorters,
} from "./";

describe("definitions/table", () => {
  it("getDefaultSortOrder", () => {
    const sorter: CrudSort[] = [
      {
        field: "title",
        order: "asc",
      },
      {
        field: "view",
        order: "desc",
      },
    ];

    expect(getDefaultSortOrder("title", sorter)).toEqual("asc");
    expect(getDefaultSortOrder("view", sorter)).toEqual("desc");
  });

  it("getDefaultSortOrder pass empty sorter", () => {
    expect(getDefaultSortOrder("title", undefined)).toEqual(undefined);
  });

  it("getDefaultSortOrder pass different column name", () => {
    expect(
      getDefaultSortOrder("title", [
        {
          field: "foo",
          order: "asc",
        },
      ]),
    ).toEqual(undefined);
  });

  it("getDefaultFilter", () => {
    const filters: CrudFilter[] = [
      {
        field: "title",
        operator: "contains",
        value: "test",
      },
    ];
    expect(getDefaultFilter("title", filters, "contains")).toEqual("test");
  });

  it("getDefaultFilter empty array", () => {
    const filters: CrudFilter[] = [
      {
        field: "title",
        operator: "contains",
        value: undefined,
      },
    ];
    expect(getDefaultFilter("title", filters, "contains")).toEqual([]);
  });

  it("getDefaultFilter default operator", () => {
    const filters: CrudFilter[] = [
      {
        field: "title",
        operator: "eq",
        value: "test",
      },
    ];
    expect(getDefaultFilter("title", filters)).toEqual("test");
  });

  it("stringify table params correctly", async () => {
    const pagination = {
      currentPage: 1,
      pageSize: 10,
    };

    const sorters: CrudSort[] = [
      {
        field: "id",
        order: "desc",
      },
      {
        field: "title",
        order: "desc",
      },
    ];

    const filters: CrudFilter[] = [
      {
        field: "categoryId",
        operator: "in",
        value: [1, 2],
      },
    ];

    const userDefinedQueryParam = {
      foo: "bar",
    };

    const url = stringifyTableParams({
      pagination,
      sorters,
      filters,
      ...userDefinedQueryParam,
    });
    expect(url).toMatchSnapshot();
  });

  it("stringify table single sort params correctly", async () => {
    const pagination = {
      currentPage: 1,
      pageSize: 10,
    };

    const sorters: CrudSort[] = [{ field: "id", order: "desc" }];
    const filters: CrudFilter[] = [
      {
        field: "categoryId",
        operator: "in",
        value: [1, 2],
      },
    ];

    const url = stringifyTableParams({ pagination, sorters, filters });
    expect(url).toMatchSnapshot();
  });

  it("parse table params with single sorter correctly", async () => {
    const url =
      "?currentPage=1&pageSize=10&sorter[0][field]=id&sorter[0][order]=desc&filters[0][operator]=in&filters[0][field]=categoryId&filters[0][value][0]=1&filters[0][value][1]=2";

    const { parsedCurrentPage, parsedPageSize, parsedSorter, parsedFilters } =
      parseTableParams(url);

    expect(parsedCurrentPage).toBe(1);
    expect(parsedPageSize).toBe(10);
    expect(parsedSorter).toStrictEqual([{ field: "id", order: "desc" }]);
    expect(parsedFilters).toStrictEqual([
      { field: "categoryId", operator: "in", value: ["1", "2"] },
    ]);
  });

  it("sorters should be prioritized over sorter", async () => {
    const pagination = {
      currentPage: 1,
      pageSize: 10,
    };

    const sorters: CrudSort[] = [{ field: "id", order: "desc" }];
    const sorter: CrudSort[] = [{ field: "id2", order: "asc" }];
    const filters: CrudFilter[] = [];

    const url = stringifyTableParams({
      pagination,
      sorters,
      sorter,
      filters,
    });

    expect(url).toMatchSnapshot();
  });

  it("parse table params with advanced query object", async () => {
    const query = {
      currentPage: 1,
      pageSize: 10,
      sorter: [
        { field: "id", order: "asc" },
        { field: "firstName", order: "desc" },
      ],
      filters: [
        { field: "id", operator: "eq", value: "1" },
        {
          operator: "or",
          value: [
            {
              field: "age",
              operator: "lt",
              value: "18",
            },
            {
              field: "age",
              operator: "gt",
              value: "20",
            },
          ],
        },
      ],
    };

    const { parsedCurrentPage, parsedPageSize, parsedSorter, parsedFilters } =
      parseTableParamsFromQuery(query);

    expect(parsedCurrentPage).toBe(1);
    expect(parsedPageSize).toBe(10);
    expect(parsedSorter).toStrictEqual([
      { field: "id", order: "asc" },
      { field: "firstName", order: "desc" },
    ]);
    expect(parsedFilters).toStrictEqual([
      { field: "id", operator: "eq", value: "1" },
      {
        operator: "or",
        value: [
          {
            field: "age",
            operator: "lt",
            value: "18",
          },
          {
            field: "age",
            operator: "gt",
            value: "20",
          },
        ],
      },
    ]);
  });

  it("unionFilters should override same filters", () => {
    expect(
      unionFilters(
        [
          {
            field: "foo",
            operator: "in",
            value: "permenant",
          },
        ],

        [
          {
            field: "foo",
            operator: "in",
            value: "crud",
          },
          {
            field: "bar",
            operator: "in",
            value: "crud",
          },
        ],
      ),
    ).toMatchInlineSnapshot(`
            [
              {
                "field": "foo",
                "operator": "in",
                "value": "permenant",
              },
              {
                "field": "bar",
                "operator": "in",
                "value": "crud",
              },
            ]
        `);
  });

  it("unionFilters should override even when filter value is null but should not keep it in the end result", () => {
    expect(
      unionFilters(
        [],
        [
          {
            field: "foo",
            operator: "in",
            value: null,
          },
          {
            field: "bar",
            operator: "in",
            value: undefined,
          },
          {
            field: "baz",
            operator: "in",
            value: "prev",
          },
        ],
      ),
    ).toMatchInlineSnapshot(`
            [
              {
                "field": "baz",
                "operator": "in",
                "value": "prev",
              },
            ]
        `);
  });

  it("compareFilters filters are the same if their field and operator are the same", () => {
    expect(
      compareFilters(
        {
          field: "foo",
          operator: "in",
          value: "left",
        },
        {
          field: "foo",
          operator: "in",
          value: "right",
        },
      ),
    ).toBe(true);

    expect(
      compareFilters(
        {
          field: "foo",
          operator: "in",
          value: "test",
        },
        {
          field: "foo",
          operator: "contains",
          value: "test",
        },
      ),
    ).toBe(false);
  });

  it("compareFilters return correct result when `or` is used", () => {
    expect(
      compareFilters(
        {
          operator: "or",
          value: [
            {
              field: "name",
              operator: "eq",
              value: "test",
            },
          ],
        },
        {
          operator: "or",
          value: [
            {
              field: "created_at",
              operator: "gte",
              value: "2022-01-01",
            },
          ],
        },
      ),
    ).toBe(true);

    expect(
      compareFilters(
        {
          operator: "or",
          value: [
            {
              field: "name",
              operator: "eq",
              value: "test",
            },
          ],
        },
        {
          field: "created_at",
          operator: "gte",
          value: "2022-01-01",
        },
      ),
    ).toBe(false);
  });

  it("unionFilters should override `or` filter", () => {
    const union = unionFilters(
      // permanent filters
      [],
      // new filters
      [
        {
          field: "other-field",
          operator: "in",
          value: "crud",
        },
        {
          operator: "or",
          value: [
            {
              field: "created_at",
              operator: "contains",
              value: "2022",
            },
          ],
        },
      ],
      // prev filters
      [
        {
          operator: "or",
          value: [
            {
              field: "name",
              operator: "eq",
              value: "test",
            },
          ],
        },
      ],
    );

    // does not include previous `or`
    expect(union).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          operator: "or",
          value: expect.arrayContaining([
            expect.objectContaining({
              field: "name",
              operator: "eq",
              value: "test",
            }),
          ]),
        }),
      ]),
    );

    // includes new `or` and new filters
    expect(union).toMatchObject([
      {
        field: "other-field",
        operator: "in",
        value: "crud",
      },
      {
        operator: "or",
        value: [
          {
            field: "created_at",
            operator: "contains",
            value: "2022",
          },
        ],
      },
    ]);
  });

  it("unionFilters should remove `or` filter if value is empty array", () => {
    const union = unionFilters(
      // permanent filters
      [],
      // new filters
      [
        {
          field: "other-field",
          operator: "in",
          value: "crud",
        },
        {
          operator: "or",
          value: [],
        },
      ],
      // prev filters
      [
        {
          operator: "or",
          value: [
            {
              field: "name",
              operator: "eq",
              value: "test",
            },
          ],
        },
      ],
    );

    expect(union).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          operator: "or",
        }),
      ]),
    );
  });

  it("unionFilters should keep `or` filter if it's untouched", () => {
    const union = unionFilters(
      // permanent filters
      [],
      // new filters
      [
        {
          field: "other-field",
          operator: "in",
          value: "crud",
        },
      ],
      // prev filters
      [
        {
          operator: "or",
          value: [
            {
              field: "name",
              operator: "eq",
              value: "test",
            },
          ],
        },
      ],
    );

    expect(union).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          operator: "or",
        }),
      ]),
    );
  });

  it("unionSorters should override same sorter", () => {
    expect(
      unionSorters(
        [
          {
            field: "foo",
            order: "asc",
          },
        ],

        [
          {
            field: "foo",
            order: "asc",
          },
          {
            field: "bar",
            order: "asc",
          },
        ],
      ),
    ).toMatchInlineSnapshot(`
            [
              {
                "field": "foo",
                "order": "asc",
              },
              {
                "field": "bar",
                "order": "asc",
              },
            ]
        `);
  });

  it("unionSorters should override even when sorter value is null but should not keep it in the end result", () => {
    expect(
      unionSorters(
        [],
        [
          {
            field: "bar",
            order: "asc",
          },
          {
            field: "foo",
            order: "asc",
          },
        ],
      ),
    ).toMatchInlineSnapshot(`
            [
              {
                "field": "bar",
                "order": "asc",
              },
              {
                "field": "foo",
                "order": "asc",
              },
            ]
        `);
  });

  it("compareSorters sorters are the same if their field are the same", () => {
    expect(
      compareSorters(
        {
          field: "foo",
          order: "asc",
        },
        {
          field: "foo",
          order: "asc",
        },
      ),
    ).toBe(true);

    expect(
      compareSorters(
        {
          field: "foo",
          order: "asc",
        },
        {
          field: "foo",
          order: "desc",
        },
      ),
    ).toBe(true);
  });

  it("parseTableParams default sorter and filters", () => {
    expect(parseTableParams("?currentPage=1&pageSize=10")).toStrictEqual({
      parsedCurrentPage: 1,
      parsedFilters: [],
      parsedPageSize: 10,
      parsedSorter: [],
    });
  });

  it("stringifyTableParams default pagination", () => {
    expect(
      stringifyTableParams({
        pagination: undefined,
        sorters: [],
        filters: [],
      }),
    ).toEqual("");
  });

  it("parseTableParams should handle deeply nested conditional filters", () => {
    const filters: CrudFilter[] = [
      {
        operator: "or",
        value: [
          {
            operator: "and",
            value: [
              { field: "isDismissed", operator: "eq", value: true },
              { field: "participation.id", operator: "nnull", value: "" },
            ],
          },
          {
            operator: "and",
            value: [{ field: "isDismissed", operator: "eq", value: false }],
          },
        ],
      },
    ];

    const url = stringifyTableParams({
      pagination: { currentPage: 1, pageSize: 10 },
      sorters: [],
      filters,
    });

    const { parsedFilters } = parseTableParams(`?${url}`);

    expect(parsedFilters).toHaveLength(1);
    expect(parsedFilters[0]).toHaveProperty("operator", "or");
    expect(parsedFilters[0]).toHaveProperty("value");

    const orValue = (parsedFilters[0] as any).value;
    expect(orValue).toHaveLength(2);

    expect(orValue[0]).toHaveProperty("operator", "and");
    expect(orValue[0].value).toHaveLength(2);
    expect(orValue[0].value[0]).toHaveProperty("field", "isDismissed");
    expect(orValue[0].value[0]).toHaveProperty("operator", "eq");
    expect(orValue[0].value[0]).toHaveProperty("value", "true");
    expect(orValue[0].value[1]).toHaveProperty("field", "participation.id");
    expect(orValue[0].value[1]).toHaveProperty("operator", "nnull");

    expect(orValue[1]).toHaveProperty("operator", "and");
    expect(orValue[1].value).toHaveLength(1);
    expect(orValue[1].value[0]).toHaveProperty("field", "isDismissed");
    expect(orValue[1].value[0]).toHaveProperty("operator", "eq");
    expect(orValue[1].value[0]).toHaveProperty("value", "false");

    const stringified = JSON.stringify(parsedFilters);
    expect(stringified).not.toContain("[field]");
    expect(stringified).not.toContain("[operator]");
    expect(stringified).not.toContain("[value]");
  });
});
