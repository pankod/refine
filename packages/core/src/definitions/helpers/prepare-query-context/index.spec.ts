import { prepareQueryContext } from ".";

describe("prepareQueryContext", () => {
  it("should keep signal lazy when merging it into meta", () => {
    const signal = new AbortController().signal;
    const signalGetter = vi.fn(() => signal);
    const context = {
      queryKey: ["posts", "list"],
      get signal() {
        return signalGetter();
      },
    } as any;

    const meta = prepareQueryContext(context, { foo: "bar" });

    expect(meta.foo).toBe("bar");
    expect(meta.queryKey).toEqual(["posts", "list"]);
    expect(signalGetter).not.toHaveBeenCalled();

    expect(meta.signal).toBe(signal);
    expect(signalGetter).toHaveBeenCalledTimes(1);
  });
});
