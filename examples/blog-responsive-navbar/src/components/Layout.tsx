import { useMenu, type LayoutProps } from "@refinedev/core";
import { Link } from "react-router";
import React from "react";

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { menuItems } = useMenu();

  return (
    <div className="flex min-h-screen flex-col">
      <div className="mb-2 py-2 md:border-b">
        <div className="container mx-auto">
          <div className="flex justify-between gap-2">
            <img src="https://refine.dev/img/refine_logo.png" alt="Logo" />
            <ul className="hidden md:flex">
              {menuItems.map(({ name }) => (
                <li key={name} className="float-left">
                  <Link
                    className="mt-2 flex cursor-pointer items-center gap-1 rounded-sm px-2 py-1 capitalize
                                    decoration-indigo-500 decoration-2 underline-offset-1 transition duration-300 ease-in-out"
                    to={name}
                  >
                    <span className="text-green-500">{name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="flex flex-col border-b pl-3 md:hidden">
        {menuItems.map(({ name }) => (
          <Link
            key={name}
            className="mt-2 flex cursor-pointer items-center gap-1 rounded-sm px-2 py-1 capitalize
                                    decoration-indigo-500 decoration-2 underline-offset-1 transition duration-300 ease-in-out"
            to={name}
          >
            <span className="text-green-500">{name}</span>
          </Link>
        ))}
      </div>
      <div className="bg-white">{children}</div>
    </div>
  );
};
