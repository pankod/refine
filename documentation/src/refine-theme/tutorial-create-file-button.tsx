import clsx from "clsx";
import React from "react";

type Props = {
  name: string;
  onClick: () => void;
};

export const TutorialCreateFileButton = ({ name, onClick }: Props) => {
  return (
    <button
      className={clsx(
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
        "after:origin-[85%_center]",
        "active:after:brightness-90",
        "after:transition-all after:duration-200 after:ease-in-out",
        "after:bg-refine-react-light-link",
        "dark:after:bg-refine-react-dark-link",
        "group",
      )}
      onClick={onClick}
    >
      <CreateIcon
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
        Click to create
      </span>
      <span
        className={clsx(
          "z-[1]",
          "block",
          "text-xs",
          "leading-6",
          "text-zinc-0",
          "px-2",
          "rounded-[24px]",
          "bg-refine-react-light-link",
          "dark:bg-refine-react-dark-link",
          "font-jetBrains-mono",
          "group-hover:bg-refine-react-dark-link",
          "dark:group-hover:bg-refine-react-light-link",
          "transition-colors duration-200 ease-in-out",
        )}
      >
        {name}
      </span>
    </button>
  );
};

const CreateIcon = (props: React.SVGProps<SVGSVGElement>) => (
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
      d="M20.567 2.183a.625.625 0 0 1 0 .884l-1.25 1.25a.625.625 0 1 1-.884-.884l1.25-1.25a.625.625 0 0 1 .884 0Zm-5 5a.625.625 0 0 1 0 .884l-1.25 1.25a.625.625 0 1 1-.884-.884l1.25-1.25a.625.625 0 0 1 .884 0ZM9.604 4.5H6.25a3 3 0 0 0-3 3V19a3 3 0 0 0 3 3h9a3 3 0 0 0 3-3v-5.854a7.55 7.55 0 0 1-1.25.104V19a1.75 1.75 0 0 1-1.75 1.75h-9A1.75 1.75 0 0 1 4.5 19V7.5c0-.967.784-1.75 1.75-1.75H9.5c0-.426.036-.844.104-1.25Zm4.713-2.317a.625.625 0 0 0-.884.884l1.25 1.25a.625.625 0 0 0 .884-.884l-1.25-1.25Zm5 5a.625.625 0 1 0-.884.884l1.25 1.25a.625.625 0 1 0 .884-.884l-1.25-1.25Z"
      clipRule="evenodd"
    />
  </svg>
);
