import clsx from "clsx";
import React from "react";

type Props = {
  visible?: boolean;
  onClose?: () => void;
};

export const BugReportModal = ({ visible, onClose }: Props) => {
  return (
    <div
      className={clsx(
        "absolute",
        "left-0",
        "top-0",
        "right-0",
        "bottom-0",
        !visible && "opacity-0",
        visible && "opacity-100",
        !visible && "pointer-events-none",
        !visible && "w-0",
        !visible && "!h-0",
        !visible && "overflow-hidden",
        visible && "w-full",
        visible && "h-full",
        "bg-gray-200",
        "bg-opacity-10",
        "backdrop-blur-sm",
        "p-8",
        "z-[4]",
      )}
    >
      <div
        className={clsx(
          "absolute",
          "left-1/2",
          "top-1/2",
          "max-w-sm",
          "w-full",
          "-translate-x-1/2",
          "-translate-y-1/2",
          "rounded",
          "bg-gray-0",
          "shadow-md",
          "p-4",
          "border",
          "border-gray-100",
        )}
      >
        <form
          className={clsx("flex", "flex-col", "gap-4")}
          onSubmit={(event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const emailValue = formData.get("email");

            console.log(emailValue);

            onClose();
          }}
        >
          <div className={clsx("text-gray-500", "text-xs")}>
            Thank you for reporting this issue! We&apos;ll fix it as soon as
            possible. If you want to get notified when it&apos;s fixed, let us
            email you!
          </div>
          <input
            name="email"
            type="email"
            placeholder="Your email address"
            className={clsx(
              "placeholder:text-gray-300",
              "text-gray-700",
              "py-2",
              "px-2",
              "rounded",
              "border",
              "border-gray-100",
              "focus:outline-none",
              "focus:ring",
              "focus:ring-gray-50",
            )}
          />
          <div className={clsx("flex", "items-center", "justify-between")}>
            <button
              type="button"
              className={clsx(
                "py-2",
                "px-3",
                "rounded",
                "transition-all",
                "duration-200",
                "ease-in-out",
                "bg-transparent",
                "hover:bg-gray-100",
                "focus:bg-gray-100",
                "text-gray-500",
              )}
              onClick={() => onClose()}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={clsx(
                "py-2",
                "px-3",
                "rounded",
                "transition-all",
                "duration-200",
                "ease-in-out",
                "text-gray-0",
                "bg-refine-blue",
                "hover:brightness-110",
                "focus:brightness-75",
              )}
            >
              Get Notified!
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
