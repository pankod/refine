import React from "react";
import clsx from "clsx";
import type { ProductOption } from "@medusajs/medusa";

type Props = {
  option: ProductOption;
  active: string | null;
  setActive: (value: string) => void;
};

export const ProductOptionPicker = ({ option, active, setActive }: Props) => {
  return (
    <div className={clsx("py-4", "flex", "flex-col", "gap-2")}>
      <div
        className={clsx(
          "font-semibold",
          "text-sm",
          "leading-6",
          "text-gray-darker",
          "uppercase",
        )}
      >
        {option.title}
      </div>
      <div role="listbox" className="flex flex-row gap-2">
        {option.values
          .filter(
            (val, index, arr) =>
              arr.findIndex((val2) => val2.value === val.value) === index,
          )
          .map((v, i: number) => {
            const isActive = v.value.toLowerCase() === active;
            return (
              <button
                type="button"
                key={`${option.id}-${i}`}
                onClick={() => {
                  setActive(v.value.toLowerCase());
                }}
                className={clsx(
                  "appearance-none",
                  "focus:outline-none",
                  "uppercase",
                  "text-xs",
                  "min-w-10",
                  "h-10",
                  "rounded-[20px]",
                  "py-2",
                  v.value.length <= 3 ? "px-2" : "px-4",
                  "flex",
                  "items-center",
                  "justify-center",
                  isActive ? "bg-gray-darkest" : "bg-gray-lighter",
                  isActive ? "text-gray-light" : "text-gray-darkest",
                )}
              >
                {v.value}
              </button>
            );
          })}
      </div>
    </div>
  );
};
