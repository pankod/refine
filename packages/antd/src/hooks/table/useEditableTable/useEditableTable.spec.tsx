import { renderHook, waitFor, act } from "@testing-library/react";
import { vi } from "vitest";

import { TestWrapper, MockJSONServer } from "@test";
import { posts } from "@test/dataMocks";

import { useEditableTable } from "./useEditableTable";

const routerProvider = {
  parse: () => {
    return () => ({
      resource: {
        name: "posts",
      },
    });
  },
};

describe("useEditableTable Hook", () => {
  beforeAll(() => {
    vi.spyOn(console, "error").mockImplementation(vi.fn());
  });

  it("fetches table and form data", async () => {
    const { result } = renderHook(() => useEditableTable(), {
      wrapper: TestWrapper({
        routerProvider,
      }),
    });

    await waitFor(() => {
      expect(!result.current.tableProps.loading).toBeTruthy();
    });

    const {
      tableProps: { dataSource },
    } = result.current;

    expect(dataSource).toHaveLength(2);

    const examplePost = posts[0];

    act(() => {
      result.current.editButtonProps(examplePost.id).onClick();
    });

    await waitFor(() => {
      expect(!result.current.formLoading).toBeTruthy();
    });

    expect(result.current.formProps.initialValues?.title).toEqual(
      examplePost.title,
    );
  });

  it.each(["success", "fail"] as const)(
    "should set ot not set ID to undefined after submit is %p",
    async (scenario) => {
      const { result } = renderHook(() => useEditableTable(), {
        wrapper: TestWrapper({
          routerProvider,
          dataProvider: {
            ...MockJSONServer,
            update:
              scenario === "fail"
                ? () => Promise.reject(new Error("Update failed"))
                : MockJSONServer.update,
          },
        }),
      });

      await waitFor(() => {
        expect(!result.current.tableProps.loading).toBeTruthy();
      });

      const examplePost = posts[0];

      act(() => {
        result.current.editButtonProps(examplePost.id).onClick();
      });

      await waitFor(() => {
        expect(!result.current.formLoading).toBeTruthy();
      });

      await waitFor(() => {
        expect(result.current.id).toBe(examplePost.id);
      });

      act(() => {
        result.current.formProps?.onFinish?.(examplePost);
      });

      await waitFor(() => {
        expect(!result.current.formLoading).toBeTruthy();
      });

      await waitFor(() => {
        expect(result.current.id).toBe(
          scenario === "success" ? undefined : examplePost.id,
        );
      });
    },
  );

  it("should not set id to `undefined` when `autoSubmitClose` is false", async () => {
    const { result } = renderHook(
      () =>
        useEditableTable({
          autoSubmitClose: false,
        }),
      {
        wrapper: TestWrapper({
          routerProvider,
        }),
      },
    );

    await waitFor(() => {
      expect(!result.current.tableProps.loading).toBeTruthy();
    });

    const examplePost = posts[0];

    act(() => {
      result.current.editButtonProps(examplePost.id).onClick();
    });

    await waitFor(() => {
      expect(!result.current.formLoading).toBeTruthy();
    });

    await waitFor(() => {
      expect(result.current.id).toBe(examplePost.id);
    });

    act(() => {
      result.current.formProps?.onFinish?.(examplePost);
    });

    await waitFor(() => {
      expect(!result.current.formLoading).toBeTruthy();
    });

    await waitFor(() => {
      expect(result.current.id).toBe(examplePost.id);
    });
  });
});
