import { useInView } from "@site/src/hooks/use-in-view";
import clsx from "clsx";
import React from "react";

export const VideoInView = (props: React.ComponentProps<"video">) => {
  const ref = React.useRef<HTMLVideoElement>(null);
  const inView = useInView(ref);

  React.useEffect(() => {
    if (inView) {
      ref.current?.play();
    } else {
      ref.current?.pause();
    }
  }, [inView]);

  return (
    <video
      ref={ref}
      {...props}
      onClick={() => {
        if (ref.current?.paused) {
          ref.current?.play();
        } else {
          ref.current?.pause();
        }
      }}
      className={clsx(
        props.className,
        "w-full",
        "h-auto",
        "max-w-full",
        "max-h-full",
        "rounded-xl",
        "object-contain",
      )}
    />
  );
};
