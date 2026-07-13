import { useEffect, useState } from "react";
import { useRefineContext } from "..";

export type UseLoadingOvertimeRefineContext = Omit<
  UseLoadingOvertimeCoreProps,
  "isLoading" | "interval"
> &
  Required<Pick<UseLoadingOvertimeCoreProps, "interval">>;

export type UseLoadingOvertimeOptionsProps = {
  overtimeOptions?: UseLoadingOvertimeCoreOptions;
};

export type UseLoadingOvertimeReturnType = {
  overtime: {
    elapsedTime?: number;
  };
};

type UseLoadingOvertimeCoreOptions = Omit<
  UseLoadingOvertimeCoreProps,
  "isLoading"
>;

type UseLoadingOvertimeCoreReturnType = {
  elapsedTime?: number;
};

export type UseLoadingOvertimeCoreProps = {
  /**
   * If true, the elapsed time will be calculated. If set to false; the elapsed time will be `undefined`.
   *
   * @default: true
   */
  enabled?: boolean;

  /**
   * The loading state. If true, the elapsed time will be calculated.
   */
  isLoading: boolean;

  /**
   * The interval in milliseconds. If the loading time exceeds this time, the `onInterval` callback will be called.
   * If not specified, the `interval` value from the `overtime` option of the `RefineProvider` will be used.
   *
   * @default: 1000 (1 second)
   */
  interval?: number;

  /**
   * The callback function that will be called when the loading time exceeds the specified time.
   * If not specified, the `onInterval` value from the `overtime` option of the `RefineProvider` will be used.
   *
   * @param elapsedInterval The elapsed time in milliseconds.
   */
  onInterval?: (elapsedInterval: number) => void;
};

/**
 * if you need to do something when the loading time exceeds the specified time, refine provides the `useLoadingOvertime` hook.
 * It returns the elapsed time in milliseconds.
 *
 * @example
 * const { elapsedTime } = useLoadingOvertime({
 *    isLoading,
 *    interval: 1000,
 *    onInterval(elapsedInterval) {
 *        console.log("loading overtime", elapsedInterval);
 *    },
 * });
 */
export const useLoadingOvertime = ({
  enabled: enabledProp,
  isLoading,
  interval: intervalProp,
  onInterval: onIntervalProp,
}: UseLoadingOvertimeCoreProps): UseLoadingOvertimeCoreReturnType => {
  const [elapsedTime, setElapsedTime] = useState<number | undefined>(undefined);
  // get overtime options from refine context
  const { options } = useRefineContext();
  const { overtime } = options;

  // pick props or refine context options
  const interval = intervalProp ?? overtime.interval;
  const onInterval = onIntervalProp ?? overtime?.onInterval;
  const enabled =
    typeof enabledProp !== "undefined"
      ? enabledProp
      : typeof overtime.enabled !== "undefined"
        ? overtime.enabled
        : true;

  useEffect(() => {
    let intervalFn: ReturnType<typeof setInterval>;

    if (enabled && isLoading) {
      intervalFn = setInterval(() => {
        // increase elapsed time
        setElapsedTime((prevElapsedTime) => {
          if (prevElapsedTime === undefined) {
            return interval;
          }

          return prevElapsedTime + interval;
        });
      }, interval);
    }

    return () => {
      if (typeof intervalFn !== "undefined") {
        clearInterval(intervalFn);
      }
      // reset elapsed time
      setElapsedTime(undefined);
    };
  }, [isLoading, interval, enabled]);

  useEffect(() => {
    // call onInterval callback
    if (onInterval && elapsedTime) {
      onInterval(elapsedTime);
    }
  }, [elapsedTime]);

  return {
    elapsedTime,
  };
};
