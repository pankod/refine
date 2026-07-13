import type { SupabaseClient } from "@supabase/supabase-js";
import { afterEach, describe, expect, it, vi } from "vitest";
import { liveProvider } from "../../src/liveProvider";

describe("liveProvider", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  const createMockSupabaseClient = () => {
    const realtimeChannel = {
      on: vi.fn().mockReturnThis(),
      subscribe: vi.fn().mockReturnThis(),
    };

    const client = {
      channel: vi.fn().mockReturnValue(realtimeChannel),
      removeChannel: vi.fn(),
      rest: { schemaName: "public" },
    } as unknown as SupabaseClient<any, any, any>;

    return { client, realtimeChannel };
  };

  it("uses only the first realtime filter and warns when multiple filters are provided", () => {
    const warnSpy = vi
      .spyOn(console, "warn")
      .mockImplementation(() => undefined);
    const { client, realtimeChannel } = createMockSupabaseClient();
    const provider = liveProvider(client);

    provider.subscribe({
      channel: "resources/posts",
      types: ["created", "updated"],
      callback: vi.fn(),
      params: {
        filters: [
          { field: "id", operator: "eq", value: 1 },
          { field: "status", operator: "eq", value: "published" },
        ],
      },
    });

    expect(client.channel).toHaveBeenCalledWith(
      "resources/posts:INSERT|UPDATE:id=eq.1",
    );
    expect(realtimeChannel.on).toHaveBeenCalledTimes(2);
    expect(realtimeChannel.on).toHaveBeenCalledWith(
      "postgres_changes",
      expect.objectContaining({
        event: "INSERT",
        filter: "id=eq.1",
        schema: "public",
        table: "posts",
      }),
      expect.any(Function),
    );
    expect(realtimeChannel.on).toHaveBeenCalledWith(
      "postgres_changes",
      expect.objectContaining({
        event: "UPDATE",
        filter: "id=eq.1",
        schema: "public",
        table: "posts",
      }),
      expect.any(Function),
    );
    expect(realtimeChannel.subscribe).toHaveBeenCalledTimes(1);
    expect(warnSpy).toHaveBeenCalledTimes(1);
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining(`Using only the first filter: "id=eq.1".`),
    );
  });

  it("does not warn when a single realtime filter is provided", () => {
    const warnSpy = vi
      .spyOn(console, "warn")
      .mockImplementation(() => undefined);
    const { client } = createMockSupabaseClient();
    const provider = liveProvider(client);

    provider.subscribe({
      channel: "resources/posts",
      types: ["updated"],
      callback: vi.fn(),
      params: {
        filters: [{ field: "status", operator: "eq", value: "published" }],
      },
    });

    expect(client.channel).toHaveBeenCalledWith(
      "resources/posts:UPDATE:status=eq.published",
    );
    expect(warnSpy).not.toHaveBeenCalled();
  });
});
