import React from "react";
import type { OpenNotificationParams } from "@refinedev/core";
import { renderHook, waitFor } from "@testing-library/react";
import { notification, App } from "antd";
import { vi } from "vitest";
import { UndoableNotification } from "@components/undoableNotification";
import { act } from "@test";
import { useNotificationProvider } from ".";

const mockNotification: OpenNotificationParams = {
  key: "test-notification",
  message: "Test Notification Message",
  type: "success",
};

const cancelMutation = vi.fn();

describe("Antd useNotificationProvider", () => {
  describe("using without Ant design's App component", () => {
    afterEach(() => {
      vi.clearAllMocks();
    });

    const notificationOpenSpy = vi.spyOn(notification, "open");
    const notificationSuccessSpy = vi.spyOn(notification, "success");
    const notificationErrorSpy = vi.spyOn(notification, "error");
    const notificationCloseSpy = vi.spyOn(notification, "destroy");

    it("should render notification type success notification using success method", async () => {
      const { result } = renderHook(() => useNotificationProvider(), {});

      result.current.open?.(mockNotification);

      expect(notificationSuccessSpy).toHaveBeenCalledTimes(1);
      expect(notificationSuccessSpy).toHaveBeenCalledWith({
        key: mockNotification.key,
        message: null,
        description: mockNotification.message,
      });
    });

    it("should render notification type error notification using error method", async () => {
      const { result } = renderHook(() => useNotificationProvider(), {});

      result.current.open?.({
        ...mockNotification,
        type: "error",
      });

      expect(notificationErrorSpy).toHaveBeenCalledTimes(1);
      expect(notificationErrorSpy).toHaveBeenCalledWith({
        key: mockNotification.key,
        message: null,
        description: mockNotification.message,
      });
    });

    it("should render notification with description", async () => {
      const { result } = renderHook(() => useNotificationProvider(), {});

      result.current.open?.({
        ...mockNotification,
        description: "Notification Description",
      });

      expect(notificationSuccessSpy).toHaveBeenCalledTimes(1);
      expect(notificationSuccessSpy).toHaveBeenCalledWith({
        key: mockNotification.key,
        message: "Notification Description",
        description: "Test Notification Message",
      });
    });

    it("should render progress notification using open method", async () => {
      const { result } = renderHook(() => useNotificationProvider(), {});

      result.current.open?.({
        ...mockNotification,
        type: "progress",
        cancelMutation,
        undoableTimeout: 5,
      });

      expect(notificationOpenSpy).toHaveBeenCalledTimes(1);
      expect(notificationOpenSpy).toHaveBeenCalledWith({
        key: "test-notification",
        message: null,
        closeIcon: <React.Fragment />,
        description: (
          <UndoableNotification
            message="Test Notification Message"
            notificationKey="test-notification"
            cancelMutation={expect.any(Function)}
            undoableTimeout={5}
          />
        ),
        duration: 0,
      });
    });

    it("should close notification", async () => {
      const { result } = renderHook(() => useNotificationProvider(), {});

      result.current.close?.("notification-key");

      expect(notificationCloseSpy).toHaveBeenCalledTimes(1);
      expect(notificationCloseSpy).toHaveBeenCalledWith("notification-key");
    });
  });

  describe("using with Ant design's App component", () => {
    const openFn = vi.fn();
    const successFn = vi.fn();
    const errorFn = vi.fn();
    const destroyFn = vi.fn();

    beforeAll(() => {
      vi.spyOn(App, "useApp").mockReturnValue({
        notification: {
          open: openFn,
          success: successFn,
          error: errorFn,
          destroy: destroyFn,
        },
      } as unknown as ReturnType<typeof App.useApp>);
    });

    afterEach(() => {
      vi.clearAllMocks();
    });

    it("should render notification type success notification using success method", async () => {
      const { result } = renderHook(() => useNotificationProvider());

      act(() => {
        result.current.open?.(mockNotification);
      });

      await waitFor(() => {
        expect(successFn).toHaveBeenCalledTimes(1);
        expect(successFn).toHaveBeenCalledWith({
          key: mockNotification.key,
          message: null,
          description: mockNotification.message,
        });
      });
    });

    it("should render notification type error notification using error method", async () => {
      const { result } = renderHook(() => useNotificationProvider());

      act(() => {
        result.current.open?.({
          ...mockNotification,
          type: "error",
        });
      });

      await waitFor(() => {
        expect(errorFn).toHaveBeenCalledTimes(1);
        expect(errorFn).toHaveBeenCalledWith({
          key: mockNotification.key,
          message: null,
          description: mockNotification.message,
        });
      });
    });

    it("should render notification with description", async () => {
      const { result } = renderHook(() => useNotificationProvider());

      act(() => {
        result.current.open?.({
          ...mockNotification,
          description: "Notification Description",
        });
      });

      await waitFor(() => {
        expect(successFn).toHaveBeenCalledTimes(1);
        expect(successFn).toHaveBeenCalledWith({
          key: mockNotification.key,
          message: "Notification Description",
          description: "Test Notification Message",
        });
      });
    });

    it("should render progress notification using open method", async () => {
      const { result } = renderHook(() => useNotificationProvider());

      act(() => {
        result.current.open?.({
          ...mockNotification,
          type: "progress",
          cancelMutation,
          undoableTimeout: 5,
        });
      });

      await waitFor(() => {
        expect(openFn).toHaveBeenCalledTimes(1);
        expect(openFn).toHaveBeenCalledWith({
          key: "test-notification",
          message: null,
          closeIcon: <React.Fragment />,
          description: (
            <UndoableNotification
              message="Test Notification Message"
              notificationKey="test-notification"
              cancelMutation={expect.any(Function)}
              undoableTimeout={5}
            />
          ),
          duration: 0,
        });
      });
    });

    it("should close notification", async () => {
      const { result } = renderHook(() => useNotificationProvider());

      act(() => {
        result.current.close?.("notification-key");
      });

      await waitFor(() => {
        expect(destroyFn).toHaveBeenCalledTimes(1);
        expect(destroyFn).toHaveBeenCalledWith("notification-key");
      });
    });
  });
});
