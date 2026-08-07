import { vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { act } from "react";

import { defaultRefineOptions } from "@contexts/refine";
import { TestWrapper, mockRouterProvider } from "@test";

import { useLoadingOvertime } from "./";

describe("useLoadingOvertime Hook", () => {
  vi.useFakeTimers();

  it("should elapsedTime undefined when isLoading false", () => {
    const { result } = renderHook(
      () =>
        useLoadingOvertime({
          isLoading: false,
        }),
      {
        wrapper: TestWrapper({}),
      },
    );

    const { elapsedTime } = result.current;

    expect(elapsedTime).toBeUndefined();
  });

  it("should elapsedTime undefined when interval not start", () => {
    const { result } = renderHook(
      () =>
        useLoadingOvertime({
          isLoading: true,
        }),
      {
        wrapper: TestWrapper({}),
      },
    );

    act(() => {
      // default 1000
      vi.advanceTimersByTime(999);
    });

    const { elapsedTime } = result.current;
    // should be undefined
    expect(elapsedTime).toBeUndefined();
  });

  it("should elapsedTime 2000 when interval 3000", () => {
    const { result } = renderHook(
      () =>
        useLoadingOvertime({
          isLoading: true,
        }),
      {
        wrapper: TestWrapper({}),
      },
    );

    act(() => {
      // default 1000
      vi.advanceTimersByTime(2000);
    });

    const { elapsedTime } = result.current;
    expect(elapsedTime).toBe(2000);
  });

  it("should override global interval and onInverval", () => {
    const onInterval = vi.fn();
    const onIntervalGlobal = vi.fn();
    const { result } = renderHook(
      () =>
        useLoadingOvertime({
          isLoading: true,
          interval: 1000,
          onInterval,
        }),
      {
        wrapper: TestWrapper({
          refineProvider: {
            ...defaultRefineOptions,
            options: {
              ...defaultRefineOptions,
              overtime: {
                interval: 5000,
                onInterval: onIntervalGlobal,
              },
            },
          },
        }),
      },
    );

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    const { elapsedTime } = result.current;
    expect(elapsedTime).toBe(2000);
    expect(onInterval).toHaveBeenCalledTimes(1);
    // should not be called global interval
    expect(onIntervalGlobal).toHaveBeenCalledTimes(0);
  });

  it("should run global interval and onInterval", () => {
    const onInterval = vi.fn();
    const { result } = renderHook(
      () =>
        useLoadingOvertime({
          isLoading: true,
        }),
      {
        wrapper: TestWrapper({
          resources: [
            {
              name: "posts",
            },
          ],
          refineProvider: {
            ...defaultRefineOptions,
            options: {
              ...defaultRefineOptions,
              overtime: {
                interval: 500,
                onInterval,
              },
            },
          },
          routerProvider: mockRouterProvider({
            resource: {
              name: "posts",
            },
          }),
        }),
      },
    );

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    const { elapsedTime } = result.current;
    expect(elapsedTime).toBe(1000);
    expect(onInterval).toHaveBeenCalledTimes(1);
    expect(onInterval).toHaveBeenCalledWith(1000);
  });

  it("should not run interval when enabled is false", () => {
    const { result } = renderHook(
      () =>
        useLoadingOvertime({
          isLoading: true,
          enabled: false,
        }),
      {
        wrapper: TestWrapper({}),
      },
    );

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    const { elapsedTime } = result.current;

    expect(elapsedTime).toBeUndefined();
  });
});
