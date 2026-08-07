/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Original File: https://github.com/facebook/docusaurus/blob/main/website/src/components/BrowserWindow/index.tsx
 */

import React from "react";
import clsx from "clsx";

interface Props {
  children?: React.ReactNode;
  minHeight?: number;
  url?: string;
  hasBottom?: boolean;
}

export default function BrowserWindow({
  children,
  minHeight,
  url = "http://localhost:3000",
  hasBottom = false,
}: Props): JSX.Element {
  return (
    <div
      className={clsx(
        "refine-live-preview-browser-window",
        "flex",
        "flex-col",
        "gap-1",
        "h-full",
        "rounded-t-lg",
        "p-1",
        "bg-zinc-200 dark:bg-zinc-800",
      )}
    >
      <div
        className={clsx(
          "flex-shrink-0",
          "p-2",
          "rounded",
          "flex items-center justify-start",
          "gap-2",
          "relative",
          "bg-zinc-50 dark:bg-zinc-950",
          "tracking-[-0.004em]",
          "text-zinc-900 dark:text-white",
        )}
      >
        <GlobeIcon className="w-4 h-4" />
        <div className={clsx("text-xs")}>
          {`${url}`.replace(/^http(s?):\/\//, "")}
        </div>
      </div>
      <div
        className={clsx(
          "flex-1",
          "overflow-hidden",
          "rounded",
          "bg-zinc-50 dark:bg-zinc-950",
          "p-0.5",
          !hasBottom && "rounded-bl-lg rounded-br-lg",
        )}
      >
        <div
          className={clsx(
            "flex-1",
            "overflow-hidden",
            "rounded",
            "bg-zinc-50 dark:bg-zinc-950",
            !hasBottom && "rounded-bl-lg rounded-br-lg",
          )}
          style={{ minHeight }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

const GlobeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0Zm-6.066 5.21C9.264 14.55 8.522 15 8 15s-1.263-.449-1.934-1.79c-.59-1.179-.996-2.83-1.058-4.71h5.984c-.062 1.88-.469 3.531-1.058 4.71Zm1.058-5.71H5.008c.062-1.88.469-3.531 1.058-4.71C6.736 1.45 7.478 1 8 1s1.263.449 1.934 1.79c.59 1.179.996 2.83 1.058 4.71Zm1 1c-.079 2.555-.757 4.786-1.757 6.136A7.005 7.005 0 0 0 14.982 8.5h-2.99Zm2.99-1h-2.99c-.079-2.555-.757-4.786-1.757-6.136A7.005 7.005 0 0 1 14.982 7.5Zm-10.974 0c.078-2.555.757-4.786 1.757-6.136A7.005 7.005 0 0 0 1.018 7.5h2.99Zm-2.99 1a7.005 7.005 0 0 0 4.747 6.136c-1-1.35-1.679-3.581-1.757-6.136h-2.99Z"
      clipRule="evenodd"
    />
  </svg>
);
