import { vi } from "vitest";
import { renderHook } from "@testing-library/react";

import { TestWrapper } from "@test";

import type { OpenNotificationParams } from "../../../contexts/notification/types";
import { useHandleNotification } from "./";

const dummyNotification: OpenNotificationParams = {
  key: "notification",
  type: "success",
  message: "test",
  description: "i am here!!",
};

const openMock = vi.fn();
const closeMock = vi.fn();

describe("useHandleNotification Hook", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  const { result } = renderHook(() => useHandleNotification(), {
    wrapper: TestWrapper({
      notificationProvider: {
        open: openMock,
        close: closeMock,
      },
    }),
  });

  it("should call notification open when notification passed", async () => {
    result.current(dummyNotification);

    expect(openMock).toHaveBeenCalledTimes(1);
    expect(openMock).toHaveBeenCalledWith(dummyNotification);
  });

  it("should not call notification open when notification passed false", async () => {
    result.current(false);

    expect(openMock).toHaveBeenCalledTimes(0);
  });

  it("should not call notification open when notification passed to false and passed a fallback notification", async () => {
    result.current(false, dummyNotification);

    expect(openMock).toHaveBeenCalledTimes(0);
  });

  it("should work first notification when passed notification with fallback notification ", async () => {
    result.current(
      {
        ...dummyNotification,
        message: "i am here!",
      },
      dummyNotification,
    );

    expect(openMock).toHaveBeenCalledTimes(1);
    expect(openMock).toHaveBeenCalledWith({
      ...dummyNotification,
      message: "i am here!",
    });
  });

  it("should work fallback notification when not passed notification and passed fallback notification ", async () => {
    result.current(undefined, {
      ...dummyNotification,
      message: "i am here too!",
    });

    expect(openMock).toHaveBeenCalledTimes(1);
    expect(openMock).toHaveBeenCalledWith({
      ...dummyNotification,
      message: "i am here too!",
    });
  });
});
