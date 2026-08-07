import type { Client as Appwrite } from "appwrite";
import { liveProvider } from "../../src";

const mockClient: Appwrite = {
  subscribe: vi.fn(() => vi.fn()),
} as unknown as Appwrite;

const testDate = new Date().getTime();

describe("liveProvider", () => {
  it("calls appwriteClient.subscribe with correct channel", () => {
    const provider = liveProvider(mockClient);
    const dummyCallback = () => undefined;

    provider?.subscribe({
      channel: "resources/blog_posts",
      types: ["*"],
      callback: dummyCallback,
    });

    expect(mockClient.subscribe).toHaveBeenCalledWith(
      "databases.default.collections.blog_posts.documents",
      expect.any(Function),
    );
  });

  it("calls appwriteClient.subscribe with correct channel when specific ids given", () => {
    const provider = liveProvider(mockClient);
    const dummyCallback = () => undefined;

    provider?.subscribe({
      channel: "resources/blog_posts",
      types: ["*"],
      callback: dummyCallback,
      params: {
        ids: ["a", "b"],
      },
    });

    expect(mockClient.subscribe).toHaveBeenCalledWith(
      [
        "databases.default.collections.blog_posts.documents.a",
        "databases.default.collections.blog_posts.documents.b",
      ],
      expect.any(Function),
    );
  });

  it("calls appwriteClient.subscribe with correct channel when specific ids given", () => {
    vi.useFakeTimers();

    const mockClientWithEvent: Appwrite = {
      subscribe: vi.fn((channel, cb) => {
        setImmediate(() => {
          cb({
            events: ["database.documents.create"],
            timestamp: testDate / 1000,
            payload: "test",
          });
        });
      }),
    } as unknown as Appwrite;

    const provider = liveProvider(mockClientWithEvent);
    const dummyCallback = vi.fn();

    provider?.subscribe({
      channel: "resources/blog_posts",
      types: ["*"],
      callback: dummyCallback,
      params: {
        ids: ["a", "b"],
      },
    });

    vi.runAllTimers();

    expect(dummyCallback).toHaveBeenCalledWith({
      type: "created",
      channel: "resources/blog_posts",
      date: new Date(testDate),
      payload: "test",
    });

    vi.clearAllTimers();
    vi.useRealTimers();
  });

  it("runs given function to unsubscribe", () => {
    const provider = liveProvider(mockClient);
    const dummyCallback = vi.fn();

    const unsubscribeFunction = vi.fn();

    provider?.subscribe({
      channel: "resources/blog_posts",
      types: ["*"],
      callback: dummyCallback,
      params: {
        ids: ["a", "b"],
      },
    });

    provider?.unsubscribe(unsubscribeFunction);

    expect(unsubscribeFunction).toHaveBeenCalled();
  });
});
