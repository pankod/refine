import clsx from "clsx";
import React from "react";

type Props = {
  first: string;
  second: string;
  onEnd?: () => void;
  tick?: number;
  className?: string;
  prevClassName?: string;
  nextClassName?: string;
  activeClassName?: string;
};

export type ChangingTextElementRef = {
  start: () => void;
  reset: () => void;
};

export const ChangingTextElement = React.memo(
  React.forwardRef<ChangingTextElementRef, Props>(function ChangingText(
    {
      first,
      second,
      onEnd,
      tick = 75,
      className,
      prevClassName,
      nextClassName,
      activeClassName,
    },
    ref,
  ) {
    const maxLen = Math.max(first.length, second.length);
    const prev = first.padEnd(maxLen, " ");
    const next = second.padEnd(maxLen, " ");
    const [pos, setPos] = React.useState(-1);
    const [status, setStatus] = React.useState<"idle" | "running" | "done">(
      "idle",
    );

    React.useImperativeHandle(ref, () => ({
      start: () => {
        setPos(-1);
        setStatus("running");
      },
      reset: () => {
        setPos(-1);
        setStatus("idle");
      },
    }));

    React.useEffect(() => {
      if (status === "running") {
        setPos(-1);
      }
    }, [status]);

    React.useEffect(() => {
      if (status === "running") {
        const timer = setInterval(() => {
          setPos((prev) => {
            if (prev === maxLen - 1) {
              setStatus("done");
              return prev;
            }

            return prev + 1;
          });
        }, tick);

        return () => clearInterval(timer);
      }
    }, [status, tick, maxLen]);

    React.useEffect(() => {
      if (status === "done") {
        onEnd?.();
      }
    }, [status]);

    return (
      <span className={clsx("will-change-contents", className)}>
        <span className={clsx("will-change-contents", prevClassName)}>
          {next
            .split("")
            .slice(0, Math.max(pos, 0))

            .map((letter) => {
              return letter;
            })}
        </span>
        <span className={clsx("will-change-contents", activeClassName)}>
          {next.split("")[pos] ?? ""}
        </span>
        <span className={clsx("will-change-contents", nextClassName)}>
          {prev.split("").slice(pos + 1)}
        </span>
      </span>
    );
  }),
  (prev, next) => {
    return (
      prev.first === next.first &&
      prev.second === next.second &&
      prev.tick === next.tick &&
      prev.className === next.className &&
      prev.prevClassName === next.prevClassName &&
      prev.nextClassName === next.nextClassName &&
      prev.activeClassName === next.activeClassName
    );
  },
);
