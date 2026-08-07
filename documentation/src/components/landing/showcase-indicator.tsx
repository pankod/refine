import React from "react";
import clsx from "clsx";

type Props = {
  x: string | number;
  y: string | number;
  className?: string;
  dark?: boolean;
};

export const ShowcaseIndicator = React.memo(function ShowcaseIndicatorBase({
  x,
  y,
  className,
  dark,
}: Props) {
  return (
    <div
      className={className}
      style={{
        position: "absolute",
        left: Number(x) + 10,
        top: Number(y) + 10,
        width: 16,
        height: 16,
      }}
    >
      <div
        className={clsx(
          "absolute",
          "w-4",
          "h-4",
          "flex",
          "items-center",
          "justify-center",
          "pointer-events-none",
        )}
      >
        {[0, 400, 800].map((d) => (
          <div
            key={d}
            className={clsx(
              "w-5",
              "h-5",
              "absolute",
              "left-0",
              "top-0",
              "right-0",
              "bottom-0",
              "flex",
              "items-center",
              "justify-center",
            )}
          >
            <IndicatorSvg dark={dark} />
          </div>
        ))}
      </div>
    </div>
  );
});

const IndicatorSvg = (
  props: React.SVGProps<SVGSVGElement> & { dark?: boolean },
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    viewBox="0 0 20 20"
    fill="none"
    {...props}
    className={clsx(
      !props.dark && "text-zinc-900",
      props.dark && "text-white",
      props.className,
    )}
  >
    <path fill="currentColor" d="M4 4h12v12H4z" />
    <path
      fill="currentColor"
      d="M8 0v2H2v6H0V0h8ZM8 20v-2H2v-6H0v8h8ZM20 8h-2V2h-6V0h8v8ZM20 12h-2v6h-6v2h8v-8Z"
    />
  </svg>
);
