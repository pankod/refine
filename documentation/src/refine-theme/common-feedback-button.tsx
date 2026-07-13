import React from "react";
import { FeedbackIcon } from "./icons/feedback";
import clsx from "clsx";

export const CommonFeedbackButton = () => {
  return (
    <button
      type="button"
      className={clsx(
        "focus:outline-none",
        "border-none",
        "appearance-none",
        "flex items-center justify-center",
        "py-2 px-3",
        "gap-2",
        "bg-gray-700",
        "text-gray-400",
        "text-sm leading-6",
        "rounded-lg",
        "hover:brightness-125",
        "focus:brightness-110",
        "active:brightness-110",
        "transition-[filter]",
        "duration-200",
        "ease-in-out",
      )}
    >
      <FeedbackIcon />
      <span>Feedback</span>
    </button>
  );
};
