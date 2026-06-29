import { renderHook, waitFor } from "@testing-library/react";
import { useOne } from "@refinedev/core";

import { act, MockJSONServer, TestWrapper } from "../../test";
import { mockRouterProvider } from "../../test/dataMocks";

import { useModalForm } from "./";

describe("useModalForm Hook", () => {
  it("should return correct initial value of 'visible'", async () => {
    const { result } = renderHook(() => useModalForm(), {
      wrapper: TestWrapper({}),
    });

    expect(result.current.modal.visible).toBe(false);
  });

  it("'visible' initial value should be set with 'defaultVisible'", async () => {
    const { result } = renderHook(
      () =>
        useModalForm({
          refineCoreProps: {
            resource: "posts",
          },
          modalProps: {
            defaultVisible: true,
          },
        }),
      {
        wrapper: TestWrapper({}),
      },
    );

    expect(result.current.modal.visible).toBe(true);
  });

  it("'visible' value should be false when 'close' is called", async () => {
    const { result } = renderHook(
      () =>
        useModalForm({
          modalProps: {
            defaultVisible: true,
          },
        }),
      {
        wrapper: TestWrapper({}),
      },
    );

    await act(async () => {
      result.current.modal.close();
    });

    expect(result.current.modal.visible).toBe(false);
  });

  it("'visible' value should be true when 'show' is called", async () => {
    const { result } = renderHook(
      () =>
        useModalForm({
          refineCoreProps: {
            id: "5",
          },
          modalProps: {
            defaultVisible: false,
          },
        }),
      {
        wrapper: TestWrapper({}),
      },
    );

    await act(async () => {
      result.current.modal.show();
    });

    await waitFor(() => expect(result.current.modal.visible).toBe(true));
  });

  it("'visible' value should be false when 'show' is called without id", async () => {
    const { result } = renderHook(
      () =>
        useModalForm({
          refineCoreProps: {
            action: "edit",
          },
          modalProps: {
            defaultVisible: false,
          },
        }),
      {
        wrapper: TestWrapper({}),
      },
    );

    await act(async () => {
      result.current.modal.show();
    });

    expect(result.current.modal.visible).toBe(false);
  });

  it("'id' should be updated when 'show' is called with 'id'", async () => {
    const { result } = renderHook(() => useModalForm(), {
      wrapper: TestWrapper({}),
    });

    const id = "5";

    await act(async () => {
      result.current.modal.show(id);
    });

    expect(result.current.refineCore.id).toBe(id);
  });

  it("'title' should be set with 'action' and 'resource'", async () => {
    const { result } = renderHook(
      () =>
        useModalForm({
          refineCoreProps: {
            resource: "test",
            action: "edit",
          },
        }),
      {
        wrapper: TestWrapper({}),
      },
    );

    expect(result.current.modal.title).toBe("Edit test");
  });

  it("when 'autoSubmitClose' is true, 'close' should be called when 'submit' is called", async () => {
    const { result } = renderHook(
      () =>
        useModalForm({
          refineCoreProps: {
            resource: "posts",
          },
          modalProps: {
            autoSubmitClose: true,
          },
        }),
      {
        wrapper: TestWrapper({}),
      },
    );

    await act(async () => {
      result.current.modal.close();
      result.current.modal.submit({});
    });

    expect(result.current.modal.visible).toBe(false);
  });

  it("when 'autoSubmitClose' is false, 'close' should not be called when 'submit' is called", async () => {
    const { result } = renderHook(
      () =>
        useModalForm({
          refineCoreProps: {
            id: 5,
            resource: "posts",
          },
          modalProps: {
            autoSubmitClose: false,
          },
        }),
      {
        wrapper: TestWrapper({}),
      },
    );

    await act(async () => {
      result.current.modal.show();
    });
    await act(async () => {
      result.current.modal.submit({});
    });

    await waitFor(() => expect(result.current.modal.visible).toBe(true));
  });

  it("autoResetForm is true, 'reset' should be called when 'submit' is called", async () => {
    const { result } = renderHook(
      () =>
        useModalForm({
          refineCoreProps: {
            resource: "posts",
            action: "create",
          },
          modalProps: {
            autoResetForm: true,
          },
        }),
      {
        wrapper: TestWrapper({}),
      },
    );

    await act(async () => {
      result.current.modal.show();
      result.current.register("test");
      result.current.setValue("test", "test");
      result.current.modal.submit({ test: "test" });
    });

    await waitFor(() => result.current.refineCore.mutation.isSuccess);

    expect(result.current.getValues()).toStrictEqual({});
  });

  it("autoResetForm is false, 'reset' should not be called when 'submit' is called", async () => {
    const { result } = renderHook(
      () =>
        useModalForm({
          refineCoreProps: {
            resource: "posts",
          },
          modalProps: {
            autoResetForm: false,
          },
        }),
      {
        wrapper: TestWrapper({}),
      },
    );

    await act(async () => {
      result.current.modal.show();
      result.current.register("test");
      result.current.setValue("test", "test");
      result.current.modal.submit({ test: "test" });
    });

    expect(result.current.getValues()).toStrictEqual({ test: "test" });
  });

  it("should `meta[syncWithLocationKey]` overrided by default", async () => {
    const mockGetOne = vi.fn().mockResolvedValue({ data: { id: 5 } });
    const mockUpdate = vi.fn().mockResolvedValue({ data: { id: 5 } });

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

    await waitFor(() => expect(mockGetOne.mock.calls.length).toBe(1));
    expect(mockGetOne.mock.calls[0][0].meta?.["modal-posts-edit"]).toBe(
      undefined,
    );
  });

  it("when 'autoResetFormWhenClose' is true, 'reset' should be called when 'close' is called", async () => {
    const { result } = renderHook(
      () =>
        useModalForm({
          refineCoreProps: {
            resource: "posts",
            action: "create",
          },
          modalProps: {
            autoResetFormWhenClose: true,
          },
        }),
      {
        wrapper: TestWrapper({}),
      },
    );

    await act(async () => {
      result.current.modal.show();
    });

    await act(async () => {
      // register values to form
      result.current.register("test");
      result.current.setValue("test", "test");
    });

    expect(result.current.getValues()).toStrictEqual({ test: "test" });

    await act(async () => {
      result.current.modal.close();
    });

    // check if form is reset. (values object should be empty)
    expect(result.current.getValues()).toStrictEqual({});
  });

  it("when 'autoResetFormWhenClose' is false, 'reset' should not be called when 'close' is called", async () => {
    const { result } = renderHook(
      () =>
        useModalForm({
          refineCoreProps: {
            resource: "posts",
            action: "create",
          },
          modalProps: {
            autoResetFormWhenClose: false,
          },
        }),
      {
        wrapper: TestWrapper({}),
      },
    );

    await act(async () => {
      result.current.modal.show();
      // register values to form
      result.current.register("test");
      result.current.setValue("test", "test");
    });

    await act(async () => {
      result.current.modal.close();
    });

    // check if form is not reset. (values object should NOT be empty)
    expect(result.current.getValues()).toStrictEqual({ test: "test" });
  });

  it("when 'autoResetFormWhenClose' is true for edit action, 'reset' should be called when 'close' is called", async () => {
    const { result } = renderHook(
      () =>
        useModalForm({
          refineCoreProps: {
            resource: "posts",
            action: "edit",
            id: "5",
          },
          modalProps: {
            autoResetFormWhenClose: true,
          },
        }),
      {
        wrapper: TestWrapper({
          dataProvider: {
            ...MockJSONServer,
            getOne: () =>
              Promise.resolve({ data: { id: 5, title: "default-title" } }),
          },
        }),
      },
    );

    await act(async () => {
      result.current.modal.show();
    });

    await act(async () => {
      result.current.setValue("title", "new-title");
    });

    expect(result.current.getValues()).toStrictEqual({
      id: 5,
      title: "new-title",
    });

    await act(async () => {
      result.current.modal.close();
    });

    expect(result.current.getValues()).toStrictEqual({
      id: 5,
      title: "default-title",
    });
  });

  it("should handle action switching correctly - modal should show after switching from edit to create", async () => {
    // This test reproduces the bug described in the issue
    const { result, rerender } = renderHook(
      ({ action }: { action: "create" | "edit" }) =>
        useModalForm({
          refineCoreProps: {
            resource: "posts",
            action,
          },
        }),
      {
        wrapper: TestWrapper({}),
        initialProps: { action: "create" as const },
      },
    );

    // Step 1: Open create modal - should work
    await act(async () => {
      result.current.modal.show();
    });
    expect(result.current.modal.visible).toBe(true);

    // Step 2: Close modal
    await act(async () => {
      result.current.modal.close();
    });
    expect(result.current.modal.visible).toBe(false);

    // Step 3: Switch to edit action
    rerender({ action: "edit" });

    // Step 4: Open edit modal with ID - should work
    await act(async () => {
      result.current.modal.show("5");
    });
    expect(result.current.modal.visible).toBe(true);

    // Step 5: Close modal
    await act(async () => {
      result.current.modal.close();
    });
    expect(result.current.modal.visible).toBe(false);

    // Step 6: Switch back to create action
    rerender({ action: "create" });

    // Step 7: Try to open create modal again
    await act(async () => {
      result.current.modal.show();
    });

    expect(result.current.modal.visible).toBe(true);
  });

  it("should not overwrite defaultValues with cached show-page data when action is 'create'", async () => {
    const showPageData = {
      id: 1,
      title: "Show page title",
      parent: "existing-parent-from-show-page",
    };

    const mockGetOne = vi.fn().mockResolvedValue({ data: showPageData });

    const { result } = renderHook(
      () => ({
        // Simulates the show page fetching data (populates the shared cache)
        showQuery: useOne({ resource: "posts", id: "1" }),
        // The create modal form on the same page
        modalForm: useModalForm({
          refineCoreProps: {
            resource: "posts",
            action: "create",
          },
          defaultValues: {
            title: "defaultValue title",
            newField: "defaultValue newField",
          },
        }),
      }),
      {
        wrapper: TestWrapper({
          dataProvider: { ...MockJSONServer, getOne: mockGetOne },
          routerProvider: mockRouterProvider({
            resource: { name: "posts" },
            action: "show",
            id: "1",
          }),
          resources: [{ name: "posts" }],
        }),
      },
    );

    // Wait for the show page query to resolve (populating the cache)
    await waitFor(() =>
      expect(result.current.showQuery.query.isSuccess).toBe(true),
    );
    expect(mockGetOne).toHaveBeenCalledTimes(1);

    // Verify defaultValues are intact before showing modal
    expect(result.current.modalForm.getValues("title")).toBe(
      "defaultValue title",
    );

    // Open the create modal
    await act(async () => {
      result.current.modalForm.modal.show();
    });

    expect(result.current.modalForm.modal.visible).toBe(true);

    // Allow effects to settle
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
    });

    // getOne should only have been called once (by the show page query)
    expect(mockGetOne).toHaveBeenCalledTimes(1);

    // The create form's core query should not have received cached data
    expect(result.current.modalForm.refineCore.query?.data).toBeUndefined();

    // The form values should still be the defaultValues
    const finalValues = result.current.modalForm.getValues();
    expect(finalValues.title).toBe("defaultValue title");
    expect(finalValues.newField).toBe("defaultValue newField");
    expect(finalValues.id).toBeUndefined();
  });
});
