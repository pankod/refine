import * as React from "react";
import type { LayoutProps } from "@refinedev/core";

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="bg-red">
      <div className="sticky top-0 z-50 flex items-center justify-between bg-[#fff] px-24 py-8">
        <a href="https://refine.dev">
          <img src="./refine_logo.png" alt="refine logo" />
        </a>
        <button className="mb-2 mt-2 w-fit rounded bg-[#042940] px-8 py-2 text-white outline outline-offset-2 outline-[#D6D58E]">
          Cart
        </button>
      </div>
      <div className="grid-rows-3">{children}</div>
    </div>
  );
};
