import React from "react";
import { vi } from "vitest";

import { UndoableQueueContext } from "@contexts/undoableQueue";
import { TestWrapper, render } from "@test";

import { UndoableQueue } from ".";

const doMutation = vi.fn();
const cancelMutation = vi.fn();

const openMock = vi.fn();
const closeMock = vi.fn();

const notificationDispatch = vi.fn();

const mockNotification = {
  id: "1",
  resource: "posts",
  cancelMutation,
  doMutation,
  seconds: 5000,
  isRunning: true,
  isSilent: false,
};
describe("Cancel Notification", () => {
  it("should trigger notification open function", async () => {
    vi.useFakeTimers();

    render(
      <UndoableQueueContext.Provider
        value={{
          notificationDispatch,
          notifications: [mockNotification],
        }}
      >
        <UndoableQueue notification={mockNotification} />
      </UndoableQueueContext.Provider>,
      {
        wrapper: TestWrapper({
          notificationProvider: {
            open: openMock,
            close: closeMock,
          },
        }),
      },
    );

    expect(openMock).toHaveBeenCalledTimes(1);
    expect(openMock).toHaveBeenCalledWith({
      cancelMutation: cancelMutation,
      key: "1-posts-notification",
      message: "You have 5 seconds to undo",
      type: "progress",
      undoableTimeout: 5,
    });

    vi.runAllTimers();

    expect(notificationDispatch).toHaveBeenCalledTimes(1);
    expect(notificationDispatch).toHaveBeenCalledWith({
      payload: {
        id: "1",
        resource: "posts",
        seconds: 5000,
      },
      type: "DECREASE_NOTIFICATION_SECOND",
    });

    vi.clearAllTimers();
    vi.useRealTimers();
  });

  it("should call doMutation on seconds zero", async () => {
    mockNotification.seconds = 0;
    render(<UndoableQueue notification={mockNotification} />);

    expect(doMutation).toHaveBeenCalledTimes(1);
  });
});
