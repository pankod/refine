import cn, { clsx } from "clsx";

import { Cross, Plus, Minus } from "@components/icons";

import s from "./Quantity.module.css";
import { IconTrash } from "@components/icons/icon-trash";

export interface QuantityProps {
  value: number;
  increase: () => void;
  decrease: () => void;
  handleRemove: React.MouseEventHandler<HTMLButtonElement>;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
  max?: number;
}

export const Quantity: React.FC<QuantityProps> = ({
  value,
  increase,
  decrease,
  handleChange,
  handleRemove,
  max = 6,
}) => {
  return (
    <div className="flex flex-row gap-6 items-center justify-start">
      <div className={clsx("flex", "flex-row", "gap-0")}>
        <button
          type="button"
          onClick={decrease}
          className={clsx(
            "rounded-full",
            "w-8 h-8",
            "flex-shrink-0",
            "appearance-none",
            "border border-solid border-gray-dark",
            "text-gray-dark",
            "bg-transparent",
            "p-0",
            "flex items-center justify-center",
          )}
          disabled={value <= 1}
        >
          <Minus width={18} height={18} />
        </button>
        <div
          className={clsx(
            "w-8 h-8",
            "flex-shrink-0",
            "flex",
            "items-center",
            "justify-center",
            "font-medium",
            "text-base",
            "text-gray-darkest",
          )}
        >
          {value}
        </div>
        <button
          type="button"
          onClick={increase}
          className={clsx(
            "rounded-full",
            "w-8 h-8",
            "flex-shrink-0",
            "appearance-none",
            "border border-solid border-gray-darkest",
            "text-gray-lightest",
            "bg-gray-darkest",
            "p-0",
            "flex items-center justify-center",
          )}
          disabled={value < 1 || value >= max}
          title={value < 1 || value >= max ? "Max quantity reached" : ""}
        >
          <Plus width={18} height={18} />
        </button>
      </div>

      <button
        className={clsx(
          "rounded-full",
          "h-8 w-8",
          "flex-shrink-0",
          "appearance-none",
          "border-gray-dark border border-solid",
          "bg-transparent",
          "p-0",
          "flex items-center justify-center",
        )}
        onClick={handleRemove}
      >
        <IconTrash className={clsx("text-gray-dark")} />
      </button>
    </div>
  );
};
