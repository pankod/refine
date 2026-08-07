import { renderHook, waitFor } from "@testing-library/react";
import { vi } from "vitest";

import { act, MockJSONServer, TestWrapper } from "@test";

import { useModalForm } from "./";

describe("useModalForm Hook", () => {
  it("should return correct initial value of 'open'", async () => {
    const { result } = renderHook(
      () =>
        useModalForm({
          action: "create",
        }),
      {
        wrapper: TestWrapper({}),
      },
    );

    expect(result.current.modalProps.open).toBe(false);
  });

  it("'open' initial value should be set with 'defaultVisible'", async () => {
    const { result } = renderHook(
      () =>
        useModalForm({
          action: "create",
          defaultVisible: true,
        }),
      {
        wrapper: TestWrapper({}),
      },
    );

    expect(result.current.modalProps.open).toBe(true);
  });

  it("'open' value should be false when 'onCancel' is called", async () => {
    const { result } = renderHook(
      () =>
        useModalForm({
          action: "edit",
          defaultVisible: true,
        }),
      {
        wrapper: TestWrapper({}),
      },
    );

    expect(result.current.modalProps.open).toBe(true);

    await act(async () => {
      result.current.modalProps.onCancel?.({} as any);
    });

    expect(result.current.modalProps.open).toBe(false);
  });

  it("'open' value should be true when 'show' is called", async () => {
    const { result } = renderHook(
      () =>
        useModalForm({
          id: 1,
          action: "edit",
          defaultVisible: false,
        }),
      {
        wrapper: TestWrapper({}),
      },
    );

    expect(result.current.modalProps.open).toBe(false);

    await act(async () => {
      result.current.show();
    });

    await waitFor(() => expect(result.current.modalProps.open).toBe(true));
  });

  it("'id' should be updated when 'show' is called with 'id'", async () => {
    const { result } = renderHook(
      () =>
        useModalForm({
          action: "edit",
        }),
      {
        wrapper: TestWrapper({}),
      },
    );

    const id = "5";

    await act(async () => {
      result.current.show(id);
    });

    expect(result.current.id).toBe(id);
  });

  it("'title' should be set with 'action' and 'resource'", async () => {
    const { result } = renderHook(
      () =>
        useModalForm({
          resource: "test",
          action: "edit",
        }),
      {
        wrapper: TestWrapper({}),
      },
    );

    expect(result.current.modalProps.title).toBe("Edit test");
  });

  it("when 'autoSubmitClose' is true, the modal should be closed when 'submit' is called", async () => {
    const { result } = renderHook(
      () =>
        useModalForm({
          action: "edit",
          id: "1",
          resource: "posts",
          autoSubmitClose: true,
        }),
      {
        wrapper: TestWrapper({}),
      },
    );

    await act(async () => {
      result.current.show();
    });

    await act(async () => {
      result.current.formProps.onFinish?.({});
    });

    await waitFor(() => result.current.mutation.isSuccess);

    await waitFor(() => expect(result.current.modalProps.open).toBe(false));

    expect(result.current.modalProps.open).toBe(false);
  });

  it("when 'autoSubmitClose' is false, 'close' should not be called when 'submit' is called", async () => {
    const { result } = renderHook(
      () =>
        useModalForm({
          id: 1,
          action: "edit",
          resource: "posts",
          autoSubmitClose: false,
        }),
      {
        wrapper: TestWrapper({}),
      },
    );

    await act(async () => {
      result.current.show();
      result.current.formProps.onFinish?.({});
    });

    expect(result.current.modalProps.open).toBe(true);
  });

  it("autoResetForm is true, 'reset' should be called when the form is submitted", async () => {
    const { result } = renderHook(
      () =>
        useModalForm({
          resource: "posts",
          action: "edit",
          autoResetForm: true,
        }),
      {
        wrapper: TestWrapper({}),
      },
    );

    await act(async () => {
      result.current.show();
      result.current.formProps.form?.setFieldsValue({
        test: "test",
        foo: "bar",
      });
      result.current.modalProps.onOk?.({} as any);
    });

    await waitFor(() => result.current.mutation.isSuccess);

    expect(result.current.formProps.form?.getFieldsValue()).toStrictEqual({});
  });

  it("when mutationMode is 'pessimistic', the form should be closed when the mutation is successful", async () => {
    const updateMock = vi.fn(
      () => new Promise((resolve) => setTimeout(resolve, 1000)),
    );

    const { result } = renderHook(
      () =>
        useModalForm({
          action: "edit",
          resource: "posts",
          id: 1,
          mutationMode: "pessimistic",
        }),
      {
        wrapper: TestWrapper({
          dataProvider: {
            ...MockJSONServer,
            update: updateMock,
          },
        }),
      },
    );

    await act(async () => {
      result.current.show();
      result.current.formProps.onFinish?.({});
    });

    expect(result.current.modalProps.open).toBe(true);

    await waitFor(() => expect(result.current.modalProps.open).toBe(false));

    expect(updateMock).toHaveBeenCalledTimes(1);
    expect(result.current.modalProps.open).toBe(false);
  });

  it.each(["optimistic", "undoable"] as const)(
    "when mutationMode is '%s', the form should be closed when the mutation is successful",
    async (mutationMode) => {
      const updateMock = vi.fn(
        () => new Promise((resolve) => setTimeout(resolve, 1000)),
      );

      const { result } = renderHook(
        () =>
          useModalForm({
            action: "edit",
            resource: "posts",
            id: 1,
            mutationMode,
          }),
        {
          wrapper: TestWrapper({
            dataProvider: {
              ...MockJSONServer,
              update: updateMock,
            },
          }),
        },
      );

      await act(async () => {
        result.current.show();
        result.current.formProps.onFinish?.({});
      });

      expect(result.current.modalProps.open).toBe(false);
    },
  );

  it("should `meta[syncWithLocationKey]` overrided by default", async () => {
    const mockGetOne = vi.fn();
    const mockUpdate = vi.fn();

    const { result } = renderHook(
      () =>
        useModalForm({
          syncWithLocation: true,
          id: 5,
          action: "edit",
          resource: "posts",
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
      result.current.show();
    });

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
