import React from "react";
import { useColorMode } from "@docusaurus/theme-common";
import clsx from "clsx";

export const NewBadgeIcon = (props: React.SVGProps<SVGSVGElement>) => {
  const { colorMode } = useColorMode();

  return (
    <div
      className={clsx(
        "relative",
        "flex",
        "items-center",
        "justify-center",
        "rounded-full",
        "overflow-hidden",
        "p-px",
        "dark:bg-[#194b3a] bg-[#b7dbff]",
      )}
      style={{
        transform: "translateZ(0)",
      }}
    >
      <div
        className={clsx(
          "z-[1]",
          "absolute",
          "inset-0",
          "dark:bg-new-badge-border-dark bg-new-badge-border-light",
          "animate-new-badge-border",
        )}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={31}
        height={14}
        viewBox="0 0 31 14"
        fill="none"
        className={clsx("z-[2]", "dark:bg-gray-900 bg-gray-0", "rounded-full")}
        {...props}
      >
        <rect
          width={31}
          height={14}
          x={0}
          y={0}
          fill={colorMode === "dark" ? "#26d97f" : "#0080ff"}
          fillOpacity={0.1}
          rx={6.5}
        />
        <path
          fill={colorMode === "dark" ? "#26d97f" : "#0080ff"}
          d="M11.433 4.182V10h-.937L7.754 6.037h-.048V10H6.652V4.182h.943l2.739 3.966h.05V4.182h1.05ZM12.582 10V4.182h3.784v.883h-2.73v1.58h2.534v.883h-2.534v1.588h2.753V10h-3.807Zm6.084 0-1.643-5.818h1.134l1.048 4.275h.054l1.12-4.275h1.03l1.123 4.278h.051l1.048-4.278h1.134L23.123 10h-1.04l-1.165-4.082h-.045L19.705 10h-1.04Z"
        />
      </svg>
    </div>
  );
};
