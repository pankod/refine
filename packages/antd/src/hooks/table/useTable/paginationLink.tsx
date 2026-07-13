import { useLink } from "@refinedev/core";
import React, { type ReactNode } from "react";

interface PaginationLinkProps {
  to: string;
  element: ReactNode;
}

export const PaginationLink = ({ to, element }: PaginationLinkProps) => {
  const Link = useLink();

  return (
    <Link
      to={to}
      replace={false}
      onClick={(e: React.PointerEvent<HTMLButtonElement>) => {
        e.preventDefault();
      }}
    >
      {element}
    </Link>
  );
};
