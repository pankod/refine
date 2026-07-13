import { renderHook, waitFor } from "@testing-library/react";

import { MockJSONServer, TestWrapper } from "@test";

import { useDeleteButton } from ".";

describe("useDeleteButton", () => {
  it("should return labels correctly", () => {
    const { result } = renderHook(
      () =>
        useDeleteButton({
          id: 123,
          resource: "posts",
        }),
      {
        wrapper: TestWrapper({}),
      },
    );

    expect(result.current).toEqual(
      expect.objectContaining({
        label: "Delete",
        confirmOkLabel: "Delete",
        confirmTitle: "Are you sure?",
        cancelLabel: "Cancel",
      }),
    );
  });

  it("should return labels by i18n", () => {
    const { result } = renderHook(
      () =>
        useDeleteButton({
          id: 123,
          resource: "posts",
        }),
      {
        wrapper: TestWrapper({
          i18nProvider: {
            translate: (key: string) => {
              if (key === "buttons.delete") {
                return "Delete (i18n)";
              }
              if (key === "buttons.confirm") {
                return "Are you sure? (i18n)";
              }
              if (key === "buttons.cancel") {
                return "Cancel (i18n)";
              }
              return key;
            },
            changeLocale: () => Promise.resolve(),
            getLocale: () => "en",
          },
        }),
      },
    );

    expect(result.current).toEqual(
      expect.objectContaining({
        label: "Delete (i18n)",
        confirmOkLabel: "Delete (i18n)",
        confirmTitle: "Are you sure? (i18n)",
        cancelLabel: "Cancel (i18n)",
      }),
    );
  });

  it("should set loading to true when onConfirm is called", async () => {
    const { result } = renderHook(
      () =>
        useDeleteButton({
          id: 123,
          resource: "posts",
        }),
      {
        wrapper: TestWrapper({
          dataProvider: {
            default: {
              ...MockJSONServer.default,
              deleteOne: () => {
                return new Promise((resolve) => {
                  setTimeout(() => {
                    resolve({ data: { id: 123 } as any });
                  }, 500);
                });
              },
            },
          },
        }),
      },
    );

    result.current.onConfirm();

    await waitFor(() => {
      expect(result.current.loading).toBeTruthy();
    });

    await waitFor(() => {
      expect(result.current.loading).toBeFalsy();
    });
  });

  it("only the specific id should have the loading state", async () => {
    const { result } = renderHook(
      () => ({
        one: useDeleteButton({ id: 1, resource: "posts" }),
        two: useDeleteButton({ id: 2, resource: "posts" }),
      }),
      {
        wrapper: TestWrapper({
          dataProvider: {
            default: {
              ...MockJSONServer.default,
              deleteOne: () => {
                return new Promise((resolve) => {
                  setTimeout(() => {
                    resolve({ data: { id: 123 } as any });
                  }, 500);
                });
              },
            },
          },
        }),
      },
    );

    result.current.one.onConfirm();

    await waitFor(() => {
      expect(result.current.one.loading).toBeTruthy();
      expect(result.current.two.loading).toBeFalsy();
    });

    await waitFor(() => {
      expect(result.current.one.loading).toBeFalsy();
      expect(result.current.two.loading).toBeFalsy();
    });

    result.current.two.onConfirm();

    await waitFor(() => {
      expect(result.current.one.loading).toBeFalsy();
      expect(result.current.two.loading).toBeTruthy();
    });

    await waitFor(() => {
      expect(result.current.one.loading).toBeFalsy();
      expect(result.current.two.loading).toBeFalsy();
    });
  });

  it("should pass meta to accessControlProvider via useButtonCanAccess", async () => {
    const { result } = renderHook(
      () =>
        useDeleteButton({
          id: 1,
          resource: "posts",
          meta: { tenantId: "abc-123" },
        }),
      {
        wrapper: TestWrapper({
          accessControlProvider: {
            can: async ({ params }) => {
              if (params?.meta?.tenantId === "abc-123") {
                return { can: true };
              }
              return { can: false, reason: "Missing meta" };
            },
          },
        }),
      },
    );

    await waitFor(() => {
      expect(result.current).toEqual(
        expect.objectContaining({
          disabled: false,
          canAccess: expect.objectContaining({ can: true }),
        }),
      );
    });
  });
});
