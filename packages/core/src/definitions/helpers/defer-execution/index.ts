/**
 * Delays the execution of a callback function asynchronously.
 * This utility function is used to defer the execution of the provided
 * callback, allowing the current call stack to clear before the callback
 * is invoked. It is particularly useful for ensuring non-blocking behavior
 * and providing a clear intent when a 0 ms timeout is used.
 */
export const deferExecution = (fn: Function) => {
  setTimeout(fn, 0);
};
