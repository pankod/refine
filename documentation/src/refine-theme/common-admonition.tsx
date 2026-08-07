import clsx from "clsx";
import React from "react";
import { CautionIcon } from "./icons/caution";
import { CommandLineIcon } from "./icons/command-line";
import { InfoIcon } from "./icons/info";
import { TipIcon } from "./icons/tip";
import { NoteIcon } from "./icons/note";
import { GithubIcon } from "./icons/github";
import { isCurrentBlogRoute } from "../utils/is-blog-route";

type Props = {
  type:
    | "caution"
    | "command-line"
    | "sourcecode"
    | "info"
    | "tip"
    | "note"
    | "additional"
    | "danger"
    | "info-tip"
    | "simple";
  title?: React.ReactNode;
  children: React.ReactNode;
};

const icons = {
  danger: CautionIcon,
  caution: CautionIcon,
  "command-line": CommandLineIcon,
  sourcecode: GithubIcon,
  info: InfoIcon,
  tip: TipIcon,
  note: NoteIcon,
  additional: NoteIcon,
  "info-tip": TipIcon,
};

const colorTextClassesDoc = {
  caution: "text-orange-700 dark:text-orange-400",
  info: "text-refine-react-light-purple dark:text-refine-react-dark-purple",
  tip: "text-green-700 dark:text-green-400",
  note: "text-teal-700 dark:text-teal-400",
  "info-tip": "text-blue-700 dark:text-blue-400",
  danger: "text-refine-red",
  "command-line": "text-refine-purple",
  sourcecode: "text-refine-pink",
  additional: "text-refine-cyan",
  simple: "text-zinc-900 dark:text-white",
};

const colorWrapperClassesDoc = {
  caution:
    "bg-[#FEEADC] dark:bg-[#3A261A] border-l-orange-700 dark:border-l-orange-400",
  info: "bg-refine-react-light-purple bg-opacity-[0.15] dark:bg-refine-react-dark-purple dark:bg-opacity-[0.15] border-l-refine-react-light-purple dark:border-l-refine-react-dark-purple",
  tip: "bg-[#E4FAEC] dark:bg-[#1A3225] border-l-green-700 dark:border-l-green-400",
  note: "bg-[#DCF4F2] dark:bg-[#173030] border-l-teal-700 dark:border-l-teal-400",
  "info-tip":
    "bg-[#E7F2FE] dark:bg-[#1D283C] border-l-blue-700 dark:border-l-blue-400",
  "command-line": "bg-refine-purple bg-opacity-10 border-l-refine-purple",
  danger: "bg-refine-red bg-opacity-10 border-l-refine-red",
  warning: "bg-refine-red bg-opacity-10 border-l-refine-red",
  sourcecode: "bg-refine-pink bg-opacity-10 border-l-refine-pink",
  additional: "bg-refine-cyan bg-opacity-10 border-l-refine-cyan",
  simple:
    "bg-zinc-50 dark:bg-zinc-800 border-l-zinc-400 dark:border-l-zinc-600",
};

const colorTextClassesBlog = {
  caution: "text-amber-700 dark:text-amber-300",
  info: "text-blue-700 dark:text-blue-300",
  tip: "text-green-700 dark:text-green-300",
  note: "text-teal-700 dark:text-teal-300",
  "info-tip": "text-blue-700 dark:text-blue-300",
  danger: "text-refine-red",
  "command-line": "text-refine-purple",
  sourcecode: "text-refine-pink",
  additional: "text-refine-cyan",
  simple: "text-zinc-900 dark:text-white",
};

const colorWrapperClassesBlog = {
  caution:
    "bg-[#FBBF2426] dark:bg-[#F59E0B33] border-l-amber-700 dark:border-l-amber-300",
  info: "bg-[#60A5FA26] dark:bg-[#3B82F633] border-l-blue-700 dark:border-l-blue-300",
  tip: "bg-[#4ADE8026] dark:bg-[#22C55E33] border-l-green-700 dark:border-l-green-300",
  note: "bg-[#2DD4BF26] dark:bg-[#14B8A633] border-l-teal-700 dark:border-l-teal-300",
  "info-tip":
    "bg-[#60A5FA26] dark:bg-[#3B82F633] border-l-blue-700 dark:border-l-blue-300",
  "command-line": "bg-refine-purple bg-opacity-10 border-l-refine-purple",
  danger: "bg-refine-red bg-opacity-10 border-l-refine-red",
  warning: "bg-refine-red bg-opacity-10 border-l-refine-red",
  sourcecode: "bg-refine-pink bg-opacity-10 border-l-refine-pink",
  additional: "bg-refine-cyan bg-opacity-10 border-l-refine-cyan",
  simple:
    "bg-zinc-100 dark:bg-[#27272A] border-l-zinc-400 dark:border-l-zinc-600",
};

const titles = {
  danger: "DANGER",
  caution: "CAUTION",
  warning: "WARNING",
  "command-line": "COMMAND LINE",
  sourcecode: "SOURCE CODE",
  info: "INFORMATION",
  tip: "TIP",
  note: "NOTE",
  additional: "ADDITIONAL INFO",
  "info-tip": "INFORMATION",
  simple: "Good to know",
};

export const Admonition = ({ type, title, children }: Props) => {
  const isBlog = isCurrentBlogRoute();
  const colorTextClasses = isBlog ? colorTextClassesBlog : colorTextClassesDoc;
  const colorWrapperClasses = isBlog
    ? colorWrapperClassesBlog
    : colorWrapperClassesDoc;
  const Icon = icons[type] ?? (() => null);
  const clsText = colorTextClasses[type] ?? "tex-inherit";
  const clsWrapper = colorWrapperClasses[type] ?? "bg-inherit";

  if (type === "simple") {
    return (
      <Simple type={type} title={title}>
        {children}
      </Simple>
    );
  }

  return (
    <div
      className={clsx(
        "rounded-lg",
        "admonition",
        `admonition-${type}`,
        "mb-6",
        clsWrapper,
      )}
    >
      <div
        className={clsx(
          "border-l-4",
          "border-l-solid",
          "border-l-inherit",
          "rounded-tl-lg",
          "rounded-bl-lg",
          "py-4",
          "pr-4",
          "pl-3",
          "flex flex-col",
          "gap-2 sm:gap-4",
        )}
      >
        {(title || titles[type]) && (
          <h6
            className={clsx(
              "flex",
              "items-center",
              "gap-2",
              "text-xs sm:text-base 2xl:text-base 2xl:leading-7",
              "font-semibold",
              "admonition-header",
              clsText,
            )}
          >
            <Icon />
            <span className="uppercase">{title ?? titles[type] ?? ""}</span>
          </h6>
        )}
        <div className={clsx("text-white", "text-base", "last:mb-0")}>
          {children}
        </div>
      </div>
    </div>
  );
};

const Simple = ({ type, title, children }: Props) => {
  const isBlog = isCurrentBlogRoute();
  const colorTextClasses = isBlog ? colorTextClassesBlog : colorTextClassesDoc;
  const colorWrapperClasses = isBlog
    ? colorWrapperClassesBlog
    : colorWrapperClassesDoc;
  const clsText = colorTextClasses[type] ?? "tex-inherit";
  const clsWrapper = colorWrapperClasses[type] ?? "bg-inherit";

  return (
    <div
      className={clsx(
        isBlog && "border-l-4",
        isBlog && "border-l-solid",
        isBlog && "border-l-inherit",
        "rounded-lg",
        "admonition",
        `admonition-${type}`,
        "mb-6",
        clsWrapper,
      )}
    >
      <div className={clsx("flex flex-col", "gap-2", !title && "pt-4")}>
        {title && (
          <div
            className={clsx(
              "px-4",
              "pt-4",
              "text-sm",
              "leading-5",
              "-mt-0.5",
              clsText,
            )}
          >
            <span className="font-semibold">{title ?? ""}</span>
            <span>:</span>
          </div>
        )}
        <div
          className={clsx(
            "text-white",
            "text-base",
            "last:mb-0",
            "px-4 pb-4",
            "admonition-content",
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
