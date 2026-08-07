import React from "react";
import clsx from "clsx";

import {
  ChangingTextElement,
  type ChangingTextElementRef,
} from "./changing-text-element";
import { LandingCopySuccessIcon } from "./icons/landing-copy-success";
import { TerminalIcon } from "lucide-react";

const installText = "npm create refine-app@latest";
const copiedText = "copied to clipboard!";

export const LandingCopyCommandButton = ({
  className,
}: {
  className?: string;
}) => {
  const changingTextRef = React.useRef<ChangingTextElementRef>(null);
  const copyTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const [copied, setCopied] = React.useState(false);
  const [fadedOut, setFadedOut] = React.useState(false);

  const onCopy = () => {
    if (changingTextRef.current) {
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
      setCopied(false);
      changingTextRef.current.start();
      // copy to clipboard
      navigator.clipboard.writeText(installText);
      copyTimeoutRef.current = setTimeout(() => {
        setFadedOut(true);
        setTimeout(() => {
          changingTextRef.current?.reset();
          setFadedOut(false);
        }, 300);
      }, 3000);
    }
  };

  return (
    <button
      type="button"
      onClick={onCopy}
      className={clsx(
        "self-start",
        "appearance-none",
        "focus:outline-none",
        "border-none",
        "py-3",
        "pr-6",
        "pl-3",
        "rounded-lg",
        "bg-zinc-800",
        "bg-opacity-100",
        "text-white",
        "text-sm",
        "font-jetBrains-mono",
        "overflow-hidden",
        "relative",
        "group/copy-button",
        "h-12",
        className,
      )}
    >
      {/*  @ts-expect-error - lucide-react type incompatibility with React 17 */}
      <TerminalIcon
        className={clsx("text-zinc-500", "inline-block", "w-5", "h-5", "mr-2")}
      />
      <div
        className={clsx(
          "rounded-lg",
          "absolute",
          "left-0",
          "top-0",
          "w-full",
          "h-full",
          "scale-[2]",
          "origin-center",
          "transition-[opacity,transform]",
          "duration-300",
          "ease-in-out",
          "opacity-0",
          "group-hover/copy-button:opacity-100",
          "group-hover/copy-button:scale-100",
          "pointer-events-none",
          "bg-landing-copy-command-hover-bg-dark",
        )}
      />
      <ChangingTextElement
        ref={changingTextRef}
        first={installText}
        second={copiedText}
        onEnd={() => {
          setCopied(true);
          setTimeout(() => {
            setCopied(false);
          }, 1300);
        }}
        tick={30}
        className={clsx(
          "inline-block",
          "whitespace-pre",
          "duration-150",
          "transition-opacity",
          "will-change-[contents,opacity]",
          "ease-in-out",
          fadedOut && "opacity-0",
          !fadedOut && "opacity-100",
        )}
        activeClassName={clsx("text-gray-0", "relative", "z-[1]")}
      />
      <div
        className={clsx(
          "z-[1]",
          "py-4",
          "pr-4",
          "absolute",
          "top-0",
          "-right-8",
          copied && "-translate-x-8",
          "duration-150",
          "ease-out",
          "transition-transform",
        )}
      >
        <LandingCopySuccessIcon className={clsx()} />
      </div>
    </button>
  );
};
