import debounce from "lodash/debounce";

type Callbacks<T extends (...args: any) => any> = {
  resolve?: (value: Awaited<ReturnType<T>>) => void;
  reject?: (reason?: any) => void;
};

type DebouncedFunction<T extends (...args: any) => any> = {
  (...args: Parameters<T>): Promise<Awaited<ReturnType<T>>>;
  flush: () => void;
  cancel: () => void;
};

/**
 * Debounces sync and async functions with given wait time. The debounced function returns a promise which can be awaited or catched.
 * Only the last call of the debounced function will resolve or reject.
 * Previous calls will be rejected with the given cancelReason.
 *
 * The original debounce function doesn't work well with async functions,
 * It won't return a promise to resolve/reject and therefore it's not possible to await the result.
 * This will always return a promise to handle and await the result.
 * Previous calls will be rejected immediately after a new call made.
 */
export const asyncDebounce = <T extends (...args: any[]) => any>(
  func: T,
  wait = 1000,
  cancelReason?: string,
): DebouncedFunction<T> => {
  let callbacks: Array<Callbacks<T>> = [];

  const cancelPrevious = () => {
    callbacks.forEach((cb) => cb.reject?.(cancelReason));
    callbacks = [];
  };

  const debouncedFunc = debounce((...args: Parameters<T>) => {
    const { resolve, reject } = callbacks.pop() || {};
    Promise.resolve(func(...args))
      .then(resolve)
      .catch(reject);
  }, wait);

  const runner = (...args: Parameters<T>) => {
    return new Promise<Awaited<ReturnType<T>>>((resolve, reject) => {
      cancelPrevious();

      callbacks.push({
        resolve,
        reject,
      });

      debouncedFunc(...args);
    });
  };

  runner.flush = () => debouncedFunc.flush();
  runner.cancel = () => {
    debouncedFunc.cancel();
    cancelPrevious();
  };

  return runner;
};
