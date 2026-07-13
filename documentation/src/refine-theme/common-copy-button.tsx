import clsx from "clsx";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { SubtractIcon } from "./icons/subtract";

export const CommonCopyButton = ({ code, className }) => {
  const [isCopied, setIsCopied] = useState(false);
  const copyTimeout = useRef(undefined);

  const handleCopyCode = useCallback(() => {
    try {
      navigator.clipboard.writeText(code).then(() => {
        setIsCopied(true);
        copyTimeout.current = window.setTimeout(() => {
          setIsCopied(false);
        }, 1000);
      });
    } catch (error) {}
  }, [code]);

  useEffect(() => () => window.clearTimeout(copyTimeout.current), []);

  return (
    <button
      type="button"
      aria-label={isCopied ? "Copied!" : "Copy code to clipboard"}
      title={"Copy code to clipboard"}
      className={clsx(
        "refine-code-block-copy-button",
        "w-6 h-6",
        "flex justify-center items-center",
        "bg-gray-200",
        "dark:bg-gray-800",
        "hover:bg-gray-300",
        "dark:hover:bg-refine-react-dark-code",
        "rounded",
        "group",
        "transition-[background-color] duration-200 ease-in-out",
      )}
      onClick={handleCopyCode}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={16}
        height={16}
        viewBox="0 0 16 16"
        className={clsx(
          "text-gray-500",
          "dark:text-gray-400",
          isCopied && "rotate-[360deg]",
          "transition-all duration-200 ease-in-out",
        )}
        fill="none"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.667 10.667c-.734 0-1.334-.6-1.334-1.333V2.667c0-.733.6-1.333 1.334-1.333h6.666c.734 0 1.334.6 1.334 1.333m-4 2.667h6.666c.737 0 1.334.596 1.334 1.333v6.667c0 .736-.597 1.333-1.334 1.333H6.667a1.333 1.333 0 0 1-1.334-1.333V6.667c0-.737.597-1.333 1.334-1.333Z"
        />
      </svg>
    </button>
  );
};
