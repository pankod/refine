import React from "react";
import { useGo, useParsed } from "@refinedev/core";
import clsx from "clsx";
import debounce from "lodash/debounce";
import { SEARCH_INPUT_ID } from "src/contants";

type Props = React.ComponentProps<"input">;

export const Searchbar = ({ className, ...props }: Props) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const go = useGo();
  const {
    pathname,
    params: { q } = {},
  } = useParsed();

  React.useEffect(() => {
    if (typeof q === "undefined") {
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  }, [q]);

  const onSearch = React.useMemo(() => {
    const debounced = debounce(
      (value: string) => {
        go({
          to: pathname !== "/" ? "/" : undefined,
          type: pathname === "/" ? "replace" : "push",
          query: {
            q: value ? value : undefined,
          },
        });
      },
      400,
      {
        trailing: true,
        leading: false,
      },
    );

    return debounced;
  }, [go, pathname]);

  return (
    <div
      className={clsx(
        "flex",
        "relative",
        "flex",
        "items-center",
        "justify-start",
        "gap-3",
        "pl-10",
        "pr-6",
        "border",
        "border-solid",
        "border-gray-dark",
        "rounded-[40px]",
        className,
      )}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={16}
        height={16}
        viewBox="0 0 16 16"
        fill="none"
        className={clsx(
          "absolute",
          "w-4",
          "h-4",
          "left-4",
          "top-4",
          "text-gray-dark",
        )}
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.333}
          d="M7.333 12.667A5.333 5.333 0 1 0 7.333 2a5.333 5.333 0 0 0 0 10.667ZM14 14l-2.867-2.867"
        />
      </svg>
      <input
        type="search"
        ref={inputRef}
        id={SEARCH_INPUT_ID}
        className={clsx(
          "border-none",
          "placeholder-gray-dark",
          "text-gray-darkest",
          "text-base",
          "w-full",
          "py-3",
          "focus:outline-none",
        )}
        placeholder="Search for products"
        defaultValue={q}
        onChange={(event) => onSearch(event.target.value)}
        {...props}
      />
    </div>
  );
};
