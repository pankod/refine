import { vi } from "vitest";
import { waitFor } from "@testing-library/react";

import { asyncDebounce } from ".";

describe("asyncDebounce", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should debounce the function", async () => {
    const fn = vi.fn((num: number) => Promise.resolve(num));
    const debounced = asyncDebounce(fn, 1000);

    const result1 = debounced(1);
    const result2 = debounced(2);
    const result3 = debounced(3);

    expect(fn).not.toHaveBeenCalled();

    vi.runAllTimers();
    await Promise.allSettled([result1, result2, result3]);

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith(3);
  });

  it("should flush the debounced function", async () => {
    vi.useRealTimers();
    const fn = vi.fn((num: number) => Promise.resolve(num));
    const catcher = vi.fn();
    const debounced = asyncDebounce(fn, 1000);

    debounced(0).catch(catcher);
    const result1 = debounced(1);
    debounced.flush();
    const result2 = debounced(2);

    await Promise.allSettled([result1, result2]);

    expect(catcher).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledTimes(2);

    expect(fn).toHaveBeenCalledWith(1);
    expect(fn).toHaveBeenCalledWith(2);
  });

  it("should cancel the debounced function", async () => {
    const fn = vi.fn((num: number) => Promise.resolve(num));
    const catcher = vi.fn();
    const debounced = asyncDebounce(fn, 1000);

    const promise = debounced(1).catch(catcher);
    debounced.cancel();

    await promise;

    expect(fn).not.toHaveBeenCalled();
    expect(catcher).toHaveBeenCalledTimes(1);
  });

  it("should respect the wait time", async () => {
    const fn = vi.fn((num: number) => Promise.resolve(num));
    const catcher = vi.fn();
    const resolver = vi.fn();

    const debounced = asyncDebounce(fn, 2000);

    debounced(1).catch(catcher);

    vi.advanceTimersByTime(1000);

    const promise2 = debounced(2).then(resolver).catch(catcher);

    vi.advanceTimersByTime(2000);
    await promise2;

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith(2);
    expect(catcher).toHaveBeenCalledTimes(1);
    expect(resolver).toHaveBeenCalledTimes(1);
  });

  it("should debounce non-promises", async () => {
    const fn = vi.fn((num: number) => num);
    const catcher = vi.fn();
    const debounced = asyncDebounce(fn, 1000);

    const result1 = debounced(1).catch(catcher);
    const result2 = debounced(2).catch(catcher);
    const result3 = debounced(3).catch(catcher);

    expect(fn).not.toHaveBeenCalled();

    vi.runAllTimers();
    await Promise.allSettled([result1, result2, result3]);

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith(3);
    expect(catcher).toHaveBeenCalledTimes(2);
  });

  it("should reject by cancel reason", async () => {
    const fn = vi.fn((num: number) => Promise.resolve(num));
    const catcher = vi.fn();
    const resolver = vi.fn();
    const debounced = asyncDebounce(fn, 1000, "canceled");

    // First set of calls - previous ones should be canceled, last should resolve
    const promise1 = debounced(1).catch(catcher);
    const promise2 = debounced(2).catch(catcher);
    const promise3 = debounced(3).then(resolver).catch(catcher);

    vi.runAllTimers();
    await Promise.allSettled([promise1, promise2, promise3]);

    expect(catcher).toHaveBeenCalledTimes(2);
    expect(catcher).toHaveBeenNthCalledWith(1, "canceled");
    expect(catcher).toHaveBeenNthCalledWith(2, "canceled");
    expect(resolver).toHaveBeenCalledWith(3);

    // Test cancel on new pending operation
    const promise4 = debounced(4).catch(catcher);
    debounced.cancel();

    await promise4;

    expect(catcher).toHaveBeenCalledTimes(3);
    expect(catcher).toHaveBeenNthCalledWith(3, "canceled");
  });

  it("should call the correct callback in long awaits", async () => {
    const fn = vi.fn((num: number) => Promise.resolve(num));
    const catcher = vi.fn();
    const resolver = vi.fn();
    const debounced = asyncDebounce(fn, 1000, "canceled");

    const promise1 = debounced(1).catch(catcher);
    const promise2 = debounced(2).catch(catcher);
    const promise3 = debounced(3).then(resolver).catch(catcher);

    vi.runAllTimers();
    await Promise.allSettled([promise1, promise2, promise3]);

    expect(catcher).toHaveBeenCalledTimes(2);
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith(3);
    expect(resolver).toHaveBeenCalledWith(3);
  });

  it("should cancel previous and reject last if errored", async () => {
    const fn = vi.fn((num: number) => {
      if (num === 3) {
        return Promise.reject("error");
      }
      return Promise.resolve(num);
    });
    const catcher = vi.fn();
    const debounced = asyncDebounce(fn, 1000, "canceled");

    const promise1 = debounced(1).catch(catcher);
    const promise2 = debounced(2).catch(catcher);
    const promise3 = debounced(3).catch(catcher);

    vi.runAllTimers();
    await Promise.allSettled([promise1, promise2, promise3]);

    expect(catcher).toHaveBeenCalledTimes(3);
    expect(catcher).toHaveBeenNthCalledWith(1, "canceled");
    expect(catcher).toHaveBeenNthCalledWith(2, "canceled");
    expect(catcher).toHaveBeenNthCalledWith(3, "error");
  });
});
