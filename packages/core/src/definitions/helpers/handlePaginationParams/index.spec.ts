import { handlePaginationParams } from ".";

describe("handlePaginationParams", () => {
  it("should return default pagination", () => {
    expect(handlePaginationParams()).toEqual({
      currentPage: 1,
      pageSize: 10,
      mode: "server",
    });
  });

  it("should return pagination from `pagination` prop", () => {
    expect(
      handlePaginationParams({
        pagination: { currentPage: 2, pageSize: 20, mode: "client" },
      }),
    ).toEqual({
      currentPage: 2,
      pageSize: 20,
      mode: "client",
    });
  });

  it("should return pagination from `config` prop", () => {
    expect(
      handlePaginationParams({
        pagination: { currentPage: 3, pageSize: 30 },
      }),
    ).toEqual({
      currentPage: 3,
      pageSize: 30,
      mode: "server",
    });
  });

  it("should return pagination from `pagination` prop if config is defined", () => {
    expect(
      handlePaginationParams({
        pagination: { currentPage: 2, pageSize: 20, mode: "client" },
      }),
    ).toEqual({
      currentPage: 2,
      pageSize: 20,
      mode: "client",
    });
  });

  it("if both `hasPagination` and `pagination.mode` are defined, should return according to `pagination` prop", () => {
    expect(
      handlePaginationParams({
        pagination: { mode: "client" },
      }),
    ).toEqual({
      currentPage: 1,
      pageSize: 10,
      mode: "client",
    });
  });
});
