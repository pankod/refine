import { getNextPageParam, getPreviousPageParam } from "./index";

describe("useInfiniteList pagination helper", () => {
  describe("getNextPageParam", () => {
    it("default page size", () => {
      const hasNextPage = getNextPageParam({
        data: [],
        total: 10,
      });
      expect(hasNextPage).toBe(undefined);
    });
    it("custom pageSize and current page", () => {
      const hasNextPage = getNextPageParam({
        data: [],
        total: 10,
        pagination: {
          currentPage: 2,
          pageSize: 3,
        },
      });
      expect(hasNextPage).toBe(3);
    });
    it("cursor", () => {
      const hasNextPage = getNextPageParam({
        data: [],
        total: 10,
        cursor: {
          next: 2,
        },
      });
      expect(hasNextPage).toBe(2);
    });
  });
  describe("getPreviousPageParam", () => {
    it("custom pageSize and current page", () => {
      const hasPreviousPage = getPreviousPageParam({
        data: [],
        total: 10,
        pagination: {
          currentPage: 2,
          pageSize: 3,
        },
      });
      expect(hasPreviousPage).toBe(1);
    });
    it("hasPreviousPage false", () => {
      const hasPreviousPage = getPreviousPageParam({
        data: [],
        total: 10,
      });
      expect(hasPreviousPage).toBe(undefined);
    });
    it("cursor", () => {
      const hasPreviousPage = getPreviousPageParam({
        data: [],
        total: 10,
        cursor: {
          next: 2,
          prev: 1,
        },
      });
      expect(hasPreviousPage).toBe(1);
    });
  });
});
