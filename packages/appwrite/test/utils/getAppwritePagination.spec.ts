import { getAppwritePagination } from "../../src/utils";

import { Query } from "appwrite";

describe("getAppwritePagination", () => {
  it("should generate Appwrite pagination parameters based on the current page and page size", () => {
    const current = 2;
    const pageSize = 10;

    const result = getAppwritePagination(current, pageSize);

    expect(result).toEqual([
      Query.offset((current - 1) * pageSize),
      Query.limit(pageSize),
    ]);
  });

  it("should generate correct Appwrite pagination parameters for the first page", () => {
    const current = 1;
    const pageSize = 10;

    const result = getAppwritePagination(current, pageSize);

    expect(result).toEqual([Query.offset(0), Query.limit(pageSize)]);
  });

  it("should generate correct Appwrite pagination parameters for a custom page size", () => {
    const current = 3;
    const pageSize = 5;

    const result = getAppwritePagination(current, pageSize);

    expect(result).toEqual([
      Query.offset((current - 1) * pageSize),
      Query.limit(pageSize),
    ]);
  });
});
