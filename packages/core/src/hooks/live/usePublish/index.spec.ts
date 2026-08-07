import { renderHook } from "@testing-library/react";
import { vi } from "vitest";

import { TestWrapper } from "@test";

import { usePublish } from "./";

const publishMock = vi.fn();
describe("usePublish Hook", () => {
  it("publish event", async () => {
    const { result } = renderHook(() => usePublish(), {
      wrapper: TestWrapper({
        liveProvider: {
          subscribe: () => vi.fn(),
          unsubscribe: () => vi.fn(),
          publish: publishMock,
        },
      }),
    });

    const publish = result.current;

    const publishPayload = {
      channel: "channel",
      date: new Date(),
      payload: { ids: ["1"] },
      type: "created",
    };
    publish?.(publishPayload);

    expect(publishMock).toHaveBeenCalledWith(publishPayload);
    expect(publishMock).toHaveBeenCalledTimes(1);
  });
});
