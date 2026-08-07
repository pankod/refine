import { useModalForm } from "..";
import { MockJSONServer, TestWrapper, waitFor, renderHook, act } from "@test";
import { vi } from "vitest";

describe("useModalForm hook", () => {
  it("should `meta[syncWithLocationKey]` overrided by default", async () => {
    const mockGetOne = vi.fn().mockResolvedValue({
      data: {
        id: "5",
        title: "Test Post",
        content: "Test content",
        status: "active",
      },
    });
    const mockUpdate = vi.fn();

    const { result } = renderHook(
      () =>
        useModalForm({
          syncWithLocation: true,
          refineCoreProps: {
            id: 5,
            action: "edit",
            resource: "posts",
          },
        }),
      {
        wrapper: TestWrapper({
          dataProvider: {
            ...MockJSONServer,
            getOne: mockGetOne,
            update: mockUpdate,
          },
        }),
      },
    );

    await act(async () => {
      result.current.modal.show();
    });

    await waitFor(() => expect(result.current.modal.visible).toBe(true));

    await waitFor(() => {
      expect(mockGetOne).toHaveBeenCalledTimes(1);
      expect(mockGetOne).toHaveBeenCalledWith(
        expect.objectContaining({
          meta: expect.objectContaining({
            "modal-posts-edit": undefined,
          }),
        }),
      );
    });
  });
});
