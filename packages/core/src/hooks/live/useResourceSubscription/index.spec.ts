import { renderHook } from "@testing-library/react";
import { vi } from "vitest";

import { TestWrapper } from "@test";

import { defaultRefineOptions } from "@contexts/refine";
import type { IRefineContextProvider } from "../../../contexts/refine/types";
import { useResourceSubscription } from "./";

const invalidateQueriesMock = vi.fn();
vi.mock("@tanstack/react-query", async () => {
  const actual = await vi.importActual("@tanstack/react-query");
  return {
    ...actual,
    useQueryClient: () => ({
      ...(actual as any).useQueryClient(),
      invalidateQueries: invalidateQueriesMock,
    }),
  };
});

const mockRefineProvider: IRefineContextProvider = {
  ...defaultRefineOptions,
  options: defaultRefineOptions,
};

const onLiveEventMock = vi.fn();
describe("useResourceSubscription Hook", () => {
  beforeEach(() => {
    invalidateQueriesMock.mockReset();
  });

  it("useResourceSubscription enabled and all types", async () => {
    const onSubscribeMock = vi.fn();

    const subscriptionParams = {
      channel: "channel",
      onLiveEvent: onLiveEventMock,
    };
    renderHook(
      () =>
        useResourceSubscription({
          onLiveEvent: onLiveEventMock,
          channel: subscriptionParams.channel,
          resource: "posts",
          types: ["*"],
          meta: {
            fields: ["title"],
            operation: "update",
            variables: {
              id: "1",
            },
            dataProviderName: "dataProviderName",
          },
        }),
      {
        wrapper: TestWrapper({
          liveProvider: {
            subscribe: onSubscribeMock,
            unsubscribe: () => vi.fn(),
            publish: () => vi.fn(),
          },
          refineProvider: {
            ...mockRefineProvider,
            liveMode: "auto",
          },
        }),
      },
    );

    expect(onSubscribeMock).toHaveBeenCalledWith({
      channel: subscriptionParams.channel,
      params: {
        resource: "posts",
      },
      types: ["*"],
      callback: expect.any(Function),
      meta: {
        fields: ["title"],
        operation: "update",
        variables: {
          id: "1",
        },
        dataProviderName: "dataProviderName",
      },
    });
  });

  it("useResourceSubscription liveMode off", async () => {
    const onSubscribeMock = vi.fn();

    const subscriptionParams = {
      channel: "channel",
      onLiveEvent: onLiveEventMock,
    };
    renderHook(
      () =>
        useResourceSubscription({
          onLiveEvent: onLiveEventMock,
          channel: subscriptionParams.channel,
          resource: "posts",
          types: ["*"],
        }),
      {
        wrapper: TestWrapper({
          liveProvider: {
            subscribe: onSubscribeMock,
            unsubscribe: () => vi.fn(),
            publish: () => vi.fn(),
          },
          refineProvider: {
            ...mockRefineProvider,
            liveMode: "off",
          },
        }),
      },
    );

    expect(onSubscribeMock).not.toHaveBeenCalled();
  });

  it("useResourceSubscription liveMode on context off, params auto", async () => {
    const onLiveEventFromContextCallbackMock = vi.fn();

    const mockCallbackEventPayload = { type: "mock" };
    const onSubscribeMock = vi.fn(({ callback }) =>
      callback(mockCallbackEventPayload),
    );

    const subscriptionParams = {
      channel: "channel",
      onLiveEvent: onLiveEventMock,
    };
    renderHook(
      () =>
        useResourceSubscription({
          onLiveEvent: onLiveEventMock,
          channel: subscriptionParams.channel,
          resource: "posts",
          types: ["*"],
          liveMode: "auto",
        }),
      {
        wrapper: TestWrapper({
          liveProvider: {
            subscribe: onSubscribeMock,
            unsubscribe: () => vi.fn(),
            publish: () => vi.fn(),
          },
          refineProvider: {
            ...mockRefineProvider,
            onLiveEvent: onLiveEventFromContextCallbackMock,
            liveMode: "off",
          },
        }),
      },
    );

    expect(onSubscribeMock).toHaveBeenCalled();
    expect(invalidateQueriesMock).toHaveBeenCalledTimes(1);
    expect(onLiveEventMock).toHaveBeenCalledWith(mockCallbackEventPayload);
    expect(onLiveEventFromContextCallbackMock).toHaveBeenCalledWith(
      mockCallbackEventPayload,
    );
  });

  it("useResourceSubscription subscribe undefined", async () => {
    const onSubscribeMock = vi.fn();

    const subscriptionParams = {
      channel: "channel",
      onLiveEvent: onLiveEventMock,
    };
    renderHook(
      () =>
        useResourceSubscription({
          channel: subscriptionParams.channel,
          onLiveEvent: onLiveEventMock,
          resource: "posts",
          types: ["*"],
        }),
      {
        wrapper: TestWrapper({
          refineProvider: {
            ...mockRefineProvider,
            liveMode: "auto",
          },
        }),
      },
    );

    expect(onSubscribeMock).not.toHaveBeenCalled();
  });

  it("useResourceSubscription calls unsubscribe on unmount", async () => {
    const onSubscribeMock = vi.fn(() => true);
    const onUnsubscribeMock = vi.fn();

    const subscriptionParams = {
      channel: "channel",
      onLiveEvent: onLiveEventMock,
    };
    const { unmount } = renderHook(
      () =>
        useResourceSubscription({
          onLiveEvent: onLiveEventMock,
          channel: subscriptionParams.channel,
          resource: "posts",
          types: ["*"],
        }),
      {
        wrapper: TestWrapper({
          liveProvider: {
            subscribe: onSubscribeMock,
            unsubscribe: onUnsubscribeMock,
            publish: () => vi.fn(),
          },
          refineProvider: {
            ...mockRefineProvider,
            liveMode: "auto",
          },
        }),
      },
    );

    expect(onSubscribeMock).toHaveBeenCalled();

    unmount();
    expect(onUnsubscribeMock).toHaveBeenCalledWith(true);
    expect(onUnsubscribeMock).toHaveBeenCalledTimes(1);
  });

  it("should invalidate queries based on queryKey created with `identifier`", async () => {
    const mockCallbackEventPayload = { type: "mock" };
    const onSubscribeMock = vi.fn(({ callback }) =>
      callback(mockCallbackEventPayload),
    );

    renderHook(
      () =>
        useResourceSubscription({
          onLiveEvent: onLiveEventMock,
          channel: "resources/posts",
          resource: "featured-posts",
          types: ["*"],
          liveMode: "auto",
        }),
      {
        wrapper: TestWrapper({
          liveProvider: {
            subscribe: onSubscribeMock,
            unsubscribe: () => vi.fn(),
            publish: () => vi.fn(),
          },
          resources: [
            {
              name: "posts",
            },
            {
              name: "posts",
              identifier: "featured-posts",
            },
          ],
        }),
      },
    );

    expect(onSubscribeMock).toHaveBeenCalled();
    expect(onLiveEventMock).toHaveBeenCalledWith(mockCallbackEventPayload);
    expect(invalidateQueriesMock).toHaveBeenCalledWith({
      queryKey: ["data", "default", "featured-posts"],
      type: "active",
      refetchType: "active",
      cancelRefetch: false,
    });
  });
});
