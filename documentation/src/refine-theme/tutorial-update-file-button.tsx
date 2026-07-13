import clsx from "clsx";
import React from "react";

type Props = {
  onClick: () => void;
};

export const TutorialUpdateFileButton = ({ onClick }: Props) => {
  return (
    <button
      type="button"
      className={clsx(
        "appearance-none",
        "focus:outline-none",
        "border-none",
        "bg-refine-react-light-link bg-opacity-10",
        "dark:bg-refine-react-dark-link dark:bg-opacity-20",
        "p-2",
        "rounded-[40px]",
        "gap-2",
        "flex items-center justify-center",
        "w-fit",
        "mt-2",
        "mb-6",
        "relative",
        "overflow-hidden",
        "after:content-['']",
        "after:absolute after:top-0 after:left-0",
        "after:w-full after:h-full",
        "after:z-[0]",
        "after:rounded-[40px]",
        "after:pointer-events-none",
        "after:scale-0",
        "after:opacity-50",
        "hover:after:scale-100",
        "hover:after:opacity-100",
        "after:origin-[15%_center]",
        "active:after:brightness-90",
        "after:transition-all after:duration-200 after:ease-in-out",
        "after:bg-refine-react-light-link",
        "dark:after:bg-refine-react-dark-link",
        "group",
      )}
      onClick={onClick}
    >
      <FileIcon
        className={clsx(
          "z-[1]",
          "text-zinc-800 dark:text-zinc-0",
          "group-hover:text-zinc-0",
          "transition-colors duration-200 ease-in-out",
        )}
      />
      <span
        className={clsx(
          "z-[1]",
          "block",
          "text-xs",
          "text-zinc-800 dark:text-zinc-0",
          "group-hover:text-zinc-0",
          "transition-colors duration-200 ease-in-out",
        )}
      >
        Click to auto-update the file
      </span>
    </button>
  );
};

const FileIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M14.317 2.183a.625.625 0 0 1 0 .884l-2.058 2.058 2.058 2.058a.625.625 0 1 1-.884.884l-2.5-2.5a.625.625 0 0 1 0-.884l2.5-2.5a.625.625 0 0 1 .884 0ZM6.25 4.5h2.026a7.601 7.601 0 0 0 0 1.25H6.25A1.75 1.75 0 0 0 4.5 7.5V19c0 .966.784 1.75 1.75 1.75h9A1.75 1.75 0 0 0 17 19v-6.479c.43-.072.848-.18 1.25-.323V19a3 3 0 0 1-3 3h-9a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3ZM7.625 12a.625.625 0 1 0 0 1.25h6.25a.625.625 0 1 0 0-1.25h-6.25Zm0 2.5a.625.625 0 1 0 0 1.25h6.25a.625.625 0 1 0 0-1.25h-6.25Zm0 2.5a.625.625 0 1 0 0 1.25h3.75a.625.625 0 1 0 0-1.25h-3.75Zm9.558-13.933a.625.625 0 1 1 .884-.884l2.5 2.5a.625.625 0 0 1 0 .884l-2.5 2.5a.625.625 0 1 1-.884-.884l2.058-2.058-2.058-2.058Z"
      clipRule="evenodd"
    />
  </svg>
);
