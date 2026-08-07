import differenceWith from "lodash/differenceWith";
import unionWith from "lodash/unionWith";
import qs, { type IStringifyOptions } from "qs";
import warnOnce from "warn-once";

import type {
  CrudFilter,
  CrudOperators,
  CrudSort,
  SortOrder,
} from "../../contexts/data/types";

/**
 * Depth limit for `qs.parse`. Deeply nested conditional filters
 * (e.g. `or -> and -> { field, operator, value }`) require at least 7 levels.
 * We use 10 to leave comfortable headroom.
 */
export const QS_PARSE_DEPTH = 10;

export const parseTableParams = (url: string) => {
  const { currentPage, pageSize, sorters, sorter, filters } = qs.parse(
    url.substring(1), // remove first ? character
    { depth: QS_PARSE_DEPTH },
  );

  return {
    parsedCurrentPage: currentPage && Number(currentPage),
    parsedPageSize: pageSize && Number(pageSize),
    parsedSorter: (sorters as CrudSort[]) || (sorter as CrudSort[]) || [],
    parsedFilters: (filters as CrudFilter[]) ?? [],
  };
};

export const parseTableParamsFromQuery = (params: any) => {
  const { currentPage, pageSize, sorters, sorter, filters } = params;

  return {
    parsedCurrentPage: currentPage && Number(currentPage),
    parsedPageSize: pageSize && Number(pageSize),
    parsedSorter: (sorters as CrudSort[]) || (sorter as CrudSort[]) || [],
    parsedFilters: (filters as CrudFilter[]) ?? [],
  };
};

/**
 * @internal This function is used to stringify table params from the useTable hook.
 */
export const stringifyTableParams = (params: {
  pagination?: { currentPage?: number; pageSize?: number };
  sorters: CrudSort[];
  sorter?: CrudSort[];
  filters: CrudFilter[];
  [key: string]: any;
}): string => {
  // Note: qs.stringify has no depth limit by default, so it correctly
  // serialises deeply nested filters without extra configuration.
  // The matching qs.parse call uses QS_PARSE_DEPTH to deserialise them.
  const options: IStringifyOptions = {
    skipNulls: true,
    arrayFormat: "indices",
    encode: false,
  };
  const { pagination, sorters, sorter, filters, ...rest } = params;

  // Prioritize sorters over sorter
  const finalSorters = sorters && sorters.length > 0 ? sorters : sorter;

  const queryString = qs.stringify(
    {
      ...rest,
      ...(pagination ? pagination : {}),
      sorters: finalSorters,
      filters,
    },
    options,
  );

  return queryString;
};

export const compareFilters = (
  left: CrudFilter,
  right: CrudFilter,
): boolean => {
  if (
    left.operator !== "and" &&
    left.operator !== "or" &&
    right.operator !== "and" &&
    right.operator !== "or"
  ) {
    return (
      ("field" in left ? left.field : undefined) ===
        ("field" in right ? right.field : undefined) &&
      left.operator === right.operator
    );
  }

  return (
    ("key" in left ? left.key : undefined) ===
      ("key" in right ? right.key : undefined) &&
    left.operator === right.operator
  );
};

export const compareSorters = (left: CrudSort, right: CrudSort): boolean =>
  left.field === right.field;
// Keep only one CrudFilter per type according to compareFilters
// Items in the array that is passed first to unionWith have higher priority
// CrudFilter items with undefined values are necessary to signify no filter
// After union, don't keep CrudFilter items with undefined value in the result
// Items in the arrays with higher priority are put at the end.
export const unionFilters = (
  permanentFilter: CrudFilter[],
  newFilters: CrudFilter[],
  prevFilters: CrudFilter[] = [],
): CrudFilter[] => {
  const isKeyRequired = newFilters.filter(
    (f) => (f.operator === "or" || f.operator === "and") && !f.key,
  );

  if (isKeyRequired.length > 1) {
    warnOnce(
      true,
      "[conditionalFilters]: You have created multiple Conditional Filters at the top level, this requires the key parameter. \nFor more information, see https://refine.dev/docs/advanced-tutorials/data-provider/handling-filters/#top-level-multiple-conditional-filters-usage",
    );
  }

  return unionWith(
    permanentFilter,
    newFilters,
    prevFilters,
    compareFilters,
  ).filter(
    (crudFilter) =>
      crudFilter.value !== undefined &&
      crudFilter.value !== null &&
      (crudFilter.operator !== "or" ||
        (crudFilter.operator === "or" && crudFilter.value.length !== 0)) &&
      (crudFilter.operator !== "and" ||
        (crudFilter.operator === "and" && crudFilter.value.length !== 0)),
  );
};

export const unionSorters = (
  permanentSorter: CrudSort[],
  newSorters: CrudSort[],
): CrudSort[] =>
  unionWith(permanentSorter, newSorters, compareSorters).filter(
    (crudSorter) => crudSorter.order !== undefined && crudSorter.order !== null,
  );
// Prioritize filters in the permanentFilter and put it at the end of result array
export const setInitialFilters = (
  permanentFilter: CrudFilter[],
  defaultFilter: CrudFilter[],
): CrudFilter[] => [
  ...differenceWith(defaultFilter, permanentFilter, compareFilters),
  ...permanentFilter,
];

export const setInitialSorters = (
  permanentSorter: CrudSort[],
  defaultSorter: CrudSort[],
): CrudSort[] => [
  ...differenceWith(defaultSorter, permanentSorter, compareSorters),
  ...permanentSorter,
];

export const getDefaultSortOrder = (
  columnName: string,
  sorter?: CrudSort[],
): SortOrder | undefined => {
  if (!sorter) {
    return undefined;
  }

  const sortItem = sorter.find((item) => item.field === columnName);

  if (sortItem) {
    return sortItem.order as SortOrder;
  }

  return undefined;
};

export const getDefaultFilter = (
  columnName: string,
  filters?: CrudFilter[],
  operatorType: CrudOperators = "eq",
): CrudFilter["value"] | undefined => {
  const filter = filters?.find((filter) => {
    if (
      filter.operator !== "or" &&
      filter.operator !== "and" &&
      "field" in filter
    ) {
      const { operator, field } = filter;
      return field === columnName && operator === operatorType;
    }
    return undefined;
  });

  if (filter) {
    return filter.value || [];
  }

  return undefined;
};
