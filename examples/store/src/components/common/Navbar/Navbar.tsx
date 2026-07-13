import Link from "next/link";
import { Logo } from "@components/ui";

import { UserNav, Searchbar } from "@components/common";

import clsx from "clsx";

interface NavbarProps {
  links?: { title: string; id: string }[];
}

export const Navbar: React.FC<NavbarProps> = () => {
  return (
    <div className={clsx("flex", "items-center", "justify-between", "gap-8")}>
      <div className={clsx("w-auto lg:w-[200px]", "flex-shrink-0")}>
        <Link href="/">
          <Logo className={clsx("text-brand", "h-16", "w-auto")} />
        </Link>
      </div>
      <div
        className={clsx(
          "flex",
          "items-center",
          "justify-end sm:justify-between",
          "flex-1",
        )}
      >
        <Searchbar
          className={clsx("flex-1", "max-w-[600px]", "hidden", "sm:flex")}
        />
        <div
          className={clsx(
            "flex-shrink-0",
            "flex",
            "items-center",
            "justify-center",
            "gap-4",
          )}
        >
          <UserNav />
        </div>
      </div>
    </div>
  );
};
