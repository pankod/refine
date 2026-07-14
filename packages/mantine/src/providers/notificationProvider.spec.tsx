import type { OpenNotificationParams } from "@refinedev/core";
import { showNotification } from "@mantine/notifications";
import { vi } from "vitest";

import { useNotificationProvider } from "./notificationProvider";

vi.mock("@mantine/notifications", () => ({
  showNotification: vi.fn(),
  updateNotification: vi.fn(),
  hideNotification: vi.fn(),
}));

describe("Mantine useNotificationProvider", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it.each([
    ["success", "primary"],
    ["error", "red"],
    ["info", "blue"],
    ["warning", "yellow"],
  ] as const)("uses %s styling", (type, color) => {
    const provider = useNotificationProvider();

    provider.open?.({
      key: "notification",
      message: "Notification message",
      type,
    });

    expect(showNotification).toHaveBeenCalledWith(
      expect.objectContaining({
        color,
        id: "notification",
        message: "Notification message",
      }),
    );
  });

  it("renders a neutral notification when type is omitted", () => {
    const provider = useNotificationProvider();
    const notification: Omit<OpenNotificationParams, "type"> = {
      key: "notification",
      message: "Notification message",
    };

    provider.open?.(notification);

    expect(showNotification).toHaveBeenCalledWith(
      expect.not.objectContaining({
        color: expect.anything(),
        icon: expect.anything(),
      }),
    );
  });
});
