import { vi } from "vitest";

// Mock the useQueryClient hook before imports
const mockInvalidateQueries = vi.fn();
vi.mock("@tanstack/react-query", async () => {
  const actual = await vi.importActual("@tanstack/react-query");
  return {
    ...actual,
    useQueryClient: () => ({
      invalidateQueries: mockInvalidateQueries,
    }),
  };
});

import { renderHook } from "@testing-library/react";

import { TestWrapper } from "@test";

import { useInvalidate } from ".";
import type { IQueryKeys } from "../../contexts/data/types";

describe("useInvalidate", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("with empty invalidations array", async () => {
    const { result } = renderHook(() => useInvalidate(), {
      wrapper: TestWrapper({}),
    });

    result.current({
      resource: "posts",
      invalidates: [],
      dataProviderName: "rest",
      id: "1",
    });

    expect(mockInvalidateQueries).not.toHaveBeenCalled();
  });

  it("with false invalidation", async () => {
    const { result } = renderHook(() => useInvalidate(), {
      wrapper: TestWrapper({}),
    });

    result.current({
      resource: "posts",
      invalidates: false,
      dataProviderName: "rest",
      id: "1",
    });

    expect(mockInvalidateQueries).not.toHaveBeenCalled();
  });

  it("with list invalidation", async () => {
    const { result } = renderHook(() => useInvalidate(), {
      wrapper: TestWrapper({}),
    });

    result.current({
      resource: "posts",
      invalidates: ["list"],
      dataProviderName: "rest",
    });

    expect(mockInvalidateQueries).toHaveBeenCalledWith(
      expect.objectContaining({
        queryKey: ["data", "rest", "posts", "list"],
      }),
    );
  });

  it("with detail invalidation", async () => {
    const { result } = renderHook(() => useInvalidate(), {
      wrapper: TestWrapper({}),
    });

    result.current({
      resource: "posts",
      invalidates: ["list", "detail"],
      dataProviderName: "rest",
      id: "1",
    });

    expect(mockInvalidateQueries).toHaveBeenCalledWith(
      expect.objectContaining({
        queryKey: ["data", "rest", "posts", "list"],
      }),
    );

    expect(mockInvalidateQueries).toHaveBeenCalledWith(
      expect.objectContaining({
        queryKey: ["data", "rest", "posts", "one", "1"],
      }),
    );
  });

  it("with 'all' invalidation", async () => {
    const { result } = renderHook(() => useInvalidate(), {
      wrapper: TestWrapper({}),
    });

    await result.current({
      resource: "posts",
      invalidates: ["detail", "all", "list", "many", "resourceAll"],
      dataProviderName: "rest",
      id: "1",
    });

    expect(mockInvalidateQueries).toHaveBeenCalledWith(
      expect.objectContaining({
        queryKey: ["data", "rest", "posts", "one", "1"],
      }),
    );
    expect(mockInvalidateQueries).toHaveBeenCalledWith(
      expect.objectContaining({
        queryKey: ["data", "rest"],
      }),
    );
    expect(mockInvalidateQueries).toHaveBeenCalledWith(
      expect.objectContaining({
        queryKey: ["data", "rest", "posts", "list"],
      }),
    );
    expect(mockInvalidateQueries).toHaveBeenCalledWith(
      expect.objectContaining({
        queryKey: ["data", "rest", "posts", "many"],
      }),
    );
  });

  it("with 'wrong invalidate key' ", async () => {
    const { result } = renderHook(() => useInvalidate(), {
      wrapper: TestWrapper({}),
    });

    result.current({
      resource: "posts",
      invalidates: ["wrong-key"] as unknown as (keyof IQueryKeys)[],
      dataProviderName: "rest",
      id: "1",
    });

    expect(mockInvalidateQueries).not.toHaveBeenCalled();
  });
});
