"use client";

import React from "react";
import Link from "next/link";
import { DividerVerticalIcon, RefineIcon } from "@/components/icons";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-primary">
      <div className="container mx-auto md:px-10 my-6 flex flex-wrap items-center justify-between">
        <div className="flex flex-col gap-3 font-semibold text-white md:flex-row">
          <div>
            <Link
              href="https://refine.dev/docs/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-all hover:underline hover:underline-offset-2"
            >
              Documentation
            </Link>
          </div>
          <DividerVerticalIcon />
          <div>
            <Link
              href="https://refine.dev/tutorial/essentials/intro/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-all hover:underline hover:underline-offset-2"
            >
              Tutorial
            </Link>
          </div>
          <DividerVerticalIcon />
          <div>
            <Link
              href="https://refine.dev/templates/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-all hover:underline hover:underline-offset-2"
            >
              Templates
            </Link>
          </div>
          <DividerVerticalIcon />
          <div>
            <Link
              href="https://refine.dev/blog/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-all hover:underline hover:underline-offset-2"
            >
              Blog
            </Link>
          </div>
        </div>
        <div className="text-white flex gap-3 items-center">
          Developed in
          <RefineIcon />
        </div>
      </div>
    </footer>
  );
};
