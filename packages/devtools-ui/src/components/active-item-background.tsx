import React from "react";
import clsx from "clsx";

export const ActiveItemBackground = ({ active }: { active?: boolean }) => {
  return (
    <div
      className={clsx(
        "re-absolute",
        "re-left-0",
        "re-top-0",
        "re-h-full",
        "re-w-full",
        active ? "re-scale-100" : "re-scale-0",
        "re-transition-all",
        "re-duration-300",
        "re-ease-[cubic-bezier(.25,.75,.5,1.25)]",
      )}
      style={{
        background:
          "url(https://refine.ams3.cdn.digitaloceanspaces.com/devtools/active-background-icon.png)",
        backgroundSize: "36px 36px",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    />
  );
};
