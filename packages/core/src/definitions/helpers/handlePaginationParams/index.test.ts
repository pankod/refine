import { handlePaginationParams } from ".";

describe("handlePaginationParams", () => {
  it("should return defaults when no pagination is provided", () => {
    const result = handlePaginationParams();
    expect(result).toEqual({
      currentPage: 1,
      pageSize: 10,
      mode: "server",
    });
  });

  it("should return defaults when pagination is empty", () => {
    const result = handlePaginationParams({ pagination: {} });
    expect(result).toEqual({
      currentPage: 1,
      pageSize: 10,
      mode: "server",
    });
  });

  it("should override currentPage", () => {
    const result = handlePaginationParams({
      pagination: { currentPage: 5 },
    });
    expect(result.currentPage).toBe(5);
    expect(result.pageSize).toBe(10);
    expect(result.mode).toBe("server");
  });

  it("should override pageSize", () => {
    const result = handlePaginationParams({
      pagination: { pageSize: 25 },
    });
    expect(result.pageSize).toBe(25);
    expect(result.currentPage).toBe(1);
  });

  it("should override mode", () => {
    const result = handlePaginationParams({
      pagination: { mode: "client" },
    });
    expect(result.mode).toBe("client");
  });

  it("should override mode to off", () => {
    const result = handlePaginationParams({
      pagination: { mode: "off" },
    });
    expect(result.mode).toBe("off");
  });

  it("should override all values", () => {
    const result = handlePaginationParams({
      pagination: {
        currentPage: 3,
        pageSize: 50,
        mode: "client",
      },
    });
    expect(result).toEqual({
      currentPage: 3,
      pageSize: 50,
      mode: "client",
    });
  });

  it("should handle undefined pagination", () => {
    const result = handlePaginationParams({ pagination: undefined });
    expect(result).toEqual({
      currentPage: 1,
      pageSize: 10,
      mode: "server",
    });
  });
});
