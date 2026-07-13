import { renderHook, waitFor } from "@testing-library/react";
import { vi } from "vitest";

import { MockJSONServer, TestWrapper, mockRouterProvider } from "@test";

import { useRefreshButton } from ".";
import { useOne } from "../../data/useOne";
import * as UseInvalidateScope from "../../invalidate";

describe("useRefreshButton", () => {
  it("should return label Refresh", () => {
    const { result } = renderHook(() => useRefreshButton({}), {
      wrapper: TestWrapper({}),
    });

    expect(result.current.label).toEqual("Refresh");
  });

  it("should return label by i18n", () => {
    const { result } = renderHook(() => useRefreshButton({}), {
      wrapper: TestWrapper({
        i18nProvider: {
          translate: (key: string) => {
            if (key === "buttons.refresh") {
              return "Refresh (i18n)";
            }
            return key;
          },
          changeLocale: () => Promise.resolve(),
          getLocale: () => "en",
        },
      }),
    });

    expect(result.current.label).toEqual("Refresh (i18n)");
  });

  it("onClick should call invalidate fn", async () => {
    const invalidateMock = vi.fn();

    const mock = vi
      .spyOn(UseInvalidateScope, "useInvalidate")
      .mockImplementation(() => {
        return invalidateMock;
      });

    const { result } = renderHook(() => useRefreshButton({}), {
      wrapper: TestWrapper({}),
    });

    result.current.onClick();

    await waitFor(() => {
      expect(invalidateMock).toHaveBeenCalled();
    });

    mock.mockRestore();
  });

  it("onClick should trigger loading if there's an existing query cache", async () => {
    let firstCall = true;

    const { result } = renderHook(
      () => ({
        one: useOne({ resource: "posts", id: 1 }),
        refresh: useRefreshButton({ resource: "posts", id: 1 }),
      }),
      {
        wrapper: TestWrapper({
          dataProvider: {
            default: {
              ...MockJSONServer.default,
              getOne: () => {
                return new Promise((resolve) => {
                  setTimeout(() => {
                    if (firstCall) {
                      firstCall = false;
                      resolve({ data: { id: 1, title: "Post 1" } as any });
                      return;
                    }
                    resolve({
                      data: { id: 1, title: "Post 1 updated" } as any,
                    });
                  }, 500);
                });
              },
            },
          },
        }),
      },
    );

    await waitFor(() => {
      expect(result.current.one.result).toEqual({ id: 1, title: "Post 1" });
    });

    result.current.refresh.onClick();

    await waitFor(() => {
      expect(result.current.refresh.loading).toBeTruthy();
    });

    await waitFor(() => {
      expect(result.current.refresh.loading).toBeFalsy();
    });

    await waitFor(() => {
      expect(result.current.one.result).toEqual({
        id: 1,
        title: "Post 1 updated",
      });
    });
  });
});
