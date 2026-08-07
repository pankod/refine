import type { GridFilterModel, GridSortModel } from "@mui/x-data-grid";
import { GridLogicOperator } from "@mui/x-data-grid";
import type { CrudFilters, CrudSorting } from "@refinedev/core";

import {
  transformCrudFiltersToFilterModel,
  transformCrudOperatorToMuiOperator,
  transformCrudSortingToSortModel,
  transformFilterModelToCrudFilters,
  transformMuiOperatorToCrudOperator,
  transformSortModelToCrudSorting,
} from ".";

describe("transformSortModelToCrudSorting", () => {
  it("Map grid sort model to crud sorting", () => {
    const gridSorter: GridSortModel = [
      { field: "title", sort: "asc" },
      { field: "view", sort: "desc" },
    ];

    const crudSorter: CrudSorting = [
      { field: "title", order: "asc" },
      { field: "view", order: "desc" },
    ];

    expect(transformSortModelToCrudSorting(gridSorter)).toEqual(crudSorter);
  });

  it("if sort direction is 'undefined', then use 'asc'", () => {
    const gridSorter: GridSortModel = [{ field: "title", sort: undefined }];

    const crudSorter: CrudSorting = [{ field: "title", order: "asc" }];

    expect(transformSortModelToCrudSorting(gridSorter)).toEqual(crudSorter);
  });

  it("if sort direction is 'null', then use 'asc'", () => {
    const gridSorter: GridSortModel = [{ field: "title", sort: null }];

    const crudSorter: CrudSorting = [{ field: "title", order: "asc" }];

    expect(transformSortModelToCrudSorting(gridSorter)).toEqual(crudSorter);
  });
});

describe("transformCrudSortingToSortModel", () => {
  it("Map crud sorting to grid sort model", () => {
    const crudSorter: CrudSorting = [
      { field: "title", order: "asc" },
      { field: "view", order: "desc" },
    ];

    const gridSorter: GridSortModel = [
      { field: "title", sort: "asc" },
      { field: "view", sort: "desc" },
    ];

    expect(transformCrudSortingToSortModel(crudSorter)).toEqual(gridSorter);
  });
});

describe("transformFilterModelToCrudFilters", () => {
  it("Map filter model to crud filters with 'or' operator", () => {
    const filterModel: GridFilterModel = {
      items: [
        {
          id: 1,
          field: "rating",
          operator: ">",
          value: 4,
        },
        {
          id: 2,
          field: "isAdmin",
          operator: "is",
          value: true,
        },
      ],
      logicOperator: GridLogicOperator.Or,
    };

    const crudFilters: CrudFilters = [
      {
        operator: "or",
        value: [
          {
            field: "rating",
            operator: "gt",
            value: 4,
          },
          {
            field: "isAdmin",
            operator: "eq",
            value: true,
          },
        ],
      },
    ];

    expect(transformFilterModelToCrudFilters(filterModel)).toEqual(crudFilters);
  });

  it("Map filter model to crud filters with 'and' operator", () => {
    const filterModel: GridFilterModel = {
      items: [
        {
          id: 1,
          field: "rating",

          operator: ">",
          value: 4,
        },
        {
          id: 2,
          field: "isAdmin",
          operator: "is",
          value: true,
        },
      ],
      logicOperator: GridLogicOperator.And,
    };

    const crudFilters: CrudFilters = [
      {
        field: "rating",
        operator: "gt",
        value: 4,
      },
      {
        field: "isAdmin",
        operator: "eq",
        value: true,
      },
    ];

    expect(transformFilterModelToCrudFilters(filterModel)).toEqual(crudFilters);
  });

  it("Map filter model to crud filters with undefined operator", () => {
    const filterModel: GridFilterModel = {
      items: [
        {
          id: 1,
          field: "rating",
          operator: ">",
          value: 4,
        },
        {
          id: 2,
          field: "isAdmin",
          operator: "is",
          value: true,
        },
      ],
    };

    const crudFilters: CrudFilters = [
      {
        field: "rating",
        operator: "gt",
        value: 4,
      },
      {
        field: "isAdmin",
        operator: "eq",
        value: true,
      },
    ];

    expect(transformFilterModelToCrudFilters(filterModel)).toEqual(crudFilters);
  });
});

describe("transformMuiOperatorToCrudOperators", () => {
  it("transform mui operator to crud operator", () => {
    expect(transformMuiOperatorToCrudOperator("equals")).toEqual("eq");
    expect(transformMuiOperatorToCrudOperator("is")).toEqual("eq");
    expect(transformMuiOperatorToCrudOperator("=")).toEqual("eq");
    expect(transformMuiOperatorToCrudOperator("!=")).toEqual("ne");
    expect(transformMuiOperatorToCrudOperator("not")).toEqual("ne");
    expect(transformMuiOperatorToCrudOperator("doesNotEqual")).toEqual("ne");
    expect(transformMuiOperatorToCrudOperator("isAnyOf")).toEqual("in");
    expect(transformMuiOperatorToCrudOperator("<")).toEqual("lt");
    expect(transformMuiOperatorToCrudOperator("before")).toEqual("lt");
    expect(transformMuiOperatorToCrudOperator("<=")).toEqual("lte");
    expect(transformMuiOperatorToCrudOperator("onOrBefore")).toEqual("lte");
    expect(transformMuiOperatorToCrudOperator(">")).toEqual("gt");
    expect(transformMuiOperatorToCrudOperator("after")).toEqual("gt");
    expect(transformMuiOperatorToCrudOperator(">=")).toEqual("gte");
    expect(transformMuiOperatorToCrudOperator("onOrAfter")).toEqual("gte");
    expect(transformMuiOperatorToCrudOperator("startsWith")).toEqual(
      "startswith",
    );
    expect(transformMuiOperatorToCrudOperator("endsWith")).toEqual("endswith");
    expect(transformMuiOperatorToCrudOperator("isEmpty")).toEqual("null");
    expect(transformMuiOperatorToCrudOperator("isNotEmpty")).toEqual("nnull");
    expect(transformMuiOperatorToCrudOperator("contains")).toEqual("contains");
    expect(transformMuiOperatorToCrudOperator("doesNotContain")).toEqual(
      "ncontains",
    );
    expect(transformMuiOperatorToCrudOperator("something")).toEqual(
      "something",
    );
  });
});

describe("transformCrudOperatorToMuiOperator", () => {
  it("transform crud operator to mui operator with 'number' value", () => {
    expect(transformCrudOperatorToMuiOperator("eq", "number")).toEqual("=");
    expect(transformCrudOperatorToMuiOperator("ne", "number")).toEqual("!=");
    expect(transformCrudOperatorToMuiOperator("gt", "number")).toEqual(">");
    expect(transformCrudOperatorToMuiOperator("gte", "number")).toEqual(">=");
    expect(transformCrudOperatorToMuiOperator("lt", "number")).toEqual("<");
    expect(transformCrudOperatorToMuiOperator("lte", "number")).toEqual("<=");

    expect(transformCrudOperatorToMuiOperator("null", "number")).toEqual(
      "isEmpty",
    );
    expect(transformCrudOperatorToMuiOperator("nnull", "number")).toEqual(
      "isNotEmpty",
    );

    expect(transformCrudOperatorToMuiOperator("in", "number")).toEqual(
      "isAnyOf",
    );
  });

  it("transform crud operator to mui operator with 'boolean' value", () => {
    expect(transformCrudOperatorToMuiOperator("eq", "boolean")).toEqual("is");
    expect(transformCrudOperatorToMuiOperator("eq", "boolean")).toEqual("is");
  });

  it("transform crud operator to mui operator with 'string' value", () => {
    expect(transformCrudOperatorToMuiOperator("contains", "string")).toEqual(
      "contains",
    );
    expect(transformCrudOperatorToMuiOperator("ncontains", "string")).toEqual(
      "doesNotContain",
    );
    expect(transformCrudOperatorToMuiOperator("eq", "string")).toEqual(
      "equals",
    );
    expect(transformCrudOperatorToMuiOperator("ne", "string")).toEqual(
      "doesNotEqual",
    );

    expect(transformCrudOperatorToMuiOperator("null", "string")).toEqual(
      "isEmpty",
    );
    expect(transformCrudOperatorToMuiOperator("nnull", "string")).toEqual(
      "isNotEmpty",
    );

    expect(transformCrudOperatorToMuiOperator("startswith", "string")).toEqual(
      "startsWith",
    );
    expect(transformCrudOperatorToMuiOperator("endswith", "string")).toEqual(
      "endsWith",
    );

    expect(transformCrudOperatorToMuiOperator("in", "string")).toEqual(
      "isAnyOf",
    );
  });

  it("transform crud operator to mui operator with 'date' and 'dateTime' value", () => {
    expect(transformCrudOperatorToMuiOperator("eq", "date")).toEqual("is");
    expect(transformCrudOperatorToMuiOperator("ne", "date")).toEqual("not");
    expect(transformCrudOperatorToMuiOperator("gt", "date")).toEqual("after");
    expect(transformCrudOperatorToMuiOperator("gte", "dateTime")).toEqual(
      "onOrAfter",
    );
    expect(transformCrudOperatorToMuiOperator("lt", "dateTime")).toEqual(
      "before",
    );
    expect(transformCrudOperatorToMuiOperator("lte", "dateTime")).toEqual(
      "onOrBefore",
    );
  });

  it("transform crud operator to mui operator with undefined value", () => {
    expect(transformCrudOperatorToMuiOperator("null", undefined)).toEqual(
      "isEmpty",
    );
    expect(transformCrudOperatorToMuiOperator("nnull", undefined)).toEqual(
      "isNotEmpty",
    );
  });
});

describe("transformCrudFiltersToFilterModel", () => {
  it("Map crud filters to filter model with 'or' operator", () => {
    const crudFilters: CrudFilters = [
      {
        operator: "or",
        value: [
          {
            field: "rating",
            operator: "gt",
            value: 4,
          },
          {
            field: "isAdmin",
            operator: "eq",
            value: true,
          },
        ],
      },
    ];

    const columnsLookup = {
      rating: "number",
      isAdmin: "boolean",
    };

    const filterModel: GridFilterModel = {
      items: [
        {
          field: "rating",
          operator: ">",
          value: 4,
          id: "ratinggt",
        },
        {
          field: "isAdmin",
          operator: "is",
          value: true,
          id: "isAdmineq",
        },
      ],
      logicOperator: GridLogicOperator.Or,
    };

    expect(
      transformCrudFiltersToFilterModel(crudFilters, columnsLookup),
    ).toEqual(filterModel);
  });

  it("Map crud filters to filter model with 'and' operator", () => {
    const crudFilters: CrudFilters = [
      {
        field: "rating",
        operator: "gt",
        value: 4,
      },
      {
        field: "isAdmin",
        operator: "eq",
        value: true,
      },
    ];

    const columnsLookup = {
      rating: "number",
      isAdmin: "boolean",
    };

    const filterModel: GridFilterModel = {
      items: [
        {
          field: "rating",
          operator: ">",
          value: 4,
          id: "ratinggt",
        },
        {
          field: "isAdmin",
          operator: "is",
          value: true,
          id: "isAdmineq",
        },
      ],
      logicOperator: GridLogicOperator.And,
    };

    expect(
      transformCrudFiltersToFilterModel(crudFilters, columnsLookup),
    ).toEqual(filterModel);
  });

  it("Map crud filters to filter model with 'or' and 'and' operator, should prioritize to 'or' filter", () => {
    const crudFilters: CrudFilters = [
      {
        field: "createdAt",
        operator: "gt",
        value: "2022-04-06T14:29",
      },
      {
        operator: "or",
        value: [
          {
            field: "rating",
            operator: "gt",
            value: 4,
          },
          {
            field: "isAdmin",
            operator: "eq",
            value: true,
          },
        ],
      },
      {
        field: "status",
        operator: "eq",
        value: "draft",
      },
    ];

    const columnsLookup = {
      rating: "number",
      isAdmin: "boolean",
    };

    const filterModel: GridFilterModel = {
      items: [
        {
          field: "rating",
          operator: ">",
          value: 4,
          id: "ratinggt",
        },
        {
          field: "isAdmin",
          operator: "is",
          value: true,
          id: "isAdmineq",
        },
      ],
      logicOperator: GridLogicOperator.Or,
    };

    expect(
      transformCrudFiltersToFilterModel(crudFilters, columnsLookup),
    ).toEqual(filterModel);
  });

  it("Map crud filters to filter model with no filters, should return default mui filter mui", () => {
    const crudFilters: CrudFilters = [];

    const columnsLookup = {};

    expect(
      transformCrudFiltersToFilterModel(crudFilters, columnsLookup),
    ).toEqual({
      items: [],
      logicOperator: "and",
    });
  });

  it("Should have unique IDs for filters with the same field and operator", () => {
    const crudFilters: CrudFilters = [
      {
        operator: "or",
        value: [
          {
            field: "status",
            operator: "eq",
            value: "draft",
          },
          {
            field: "status",
            operator: "eq",
            value: "published",
          },
        ],
      },
    ];

    const columnsLookup = {
      status: "string",
    };

    const filterModel: GridFilterModel = {
      items: [
        {
          field: "status",
          operator: "equals",
          value: "draft",
          id: "statuseq",
        },
        {
          field: "status",
          operator: "equals",
          value: "published",
          id: "statuseq2",
        },
      ],
      logicOperator: GridLogicOperator.Or,
    };

    expect(
      transformCrudFiltersToFilterModel(crudFilters, columnsLookup),
    ).toEqual(filterModel);
  });
});
