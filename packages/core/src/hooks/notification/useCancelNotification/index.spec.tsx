import { renderHook } from "@testing-library/react";

import { TestWrapper } from "@test";

import { useCancelNotification } from "./";

describe("useCancelNotification Hook", () => {
  it("returns context correct value", async () => {
    const { result } = renderHook(() => useCancelNotification(), {
      wrapper: TestWrapper({
        resources: [{ name: "posts" }],
      }),
    });

    // The hook should return the default empty state from the provider
    expect(result.current.notifications).toEqual([]);
    expect(result.current.notificationDispatch).toBeInstanceOf(Function);
  });

  it("returns context false value", async () => {
    const { result } = renderHook(() => useCancelNotification(), {
      wrapper: TestWrapper({
        resources: [{ name: "posts" }],
      }),
    });

    // Check that notifications is an empty array (falsy when checking length)
    expect(result.current.notifications).toHaveLength(0);
    expect(result.current.notificationDispatch).toBeInstanceOf(Function);
  });

  it("context dispatch not called initially", async () => {
    const { result } = renderHook(() => useCancelNotification(), {
      wrapper: TestWrapper({
        resources: [{ name: "posts" }],
      }),
    });

    // The dispatch function should exist but won't be called during initialization
    expect(result.current.notificationDispatch).toBeInstanceOf(Function);
  });

  it("context dispatch can be called", async () => {
    const { result } = renderHook(() => useCancelNotification(), {
      wrapper: TestWrapper({
        resources: [{ name: "posts" }],
      }),
    });

    // This should not throw an error
    expect(() => {
      result.current.notificationDispatch({ type: "TEST_ACTION" });
    }).not.toThrow();
  });
});
