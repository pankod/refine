import Link from "@docusaurus/Link";
import clsx from "clsx";
import React, { type FC, type PropsWithChildren, type SVGProps } from "react";

type Props = {
  className?: string;
  icon?: React.ReactNode;
  to?: string;
  onClick?: () => void;
};

export const LandingSectionCtaButton: FC<PropsWithChildren<Props>> = ({
  children,
  className,
  to,
  onClick,
  icon,
}) => {
  return (
    <Link
      to={to}
      target="_blank"
      rel="noopener"
      onClick={onClick}
      className={clsx(
        className,
        "tracking-[-0.004em]",
        "select-none",
        "group/cta-button",
        "relative",
        "no-underline",
        "rounded-lg",
        "flex",
        "items-center",
        "justify-center",
        "gap-2",
        "py-3 pr-3 pl-6",
        "landing-sm:py-3 landing-sm:pr-4 landing-sm:pl-6",
        "text-xs landing-sm:text-base",
        "font-semibold",
        "text-orange-400",
        "hover:text-orange-300",
        "transition-colors",
        "duration-300",
        "ease-in-out",
        "bg-[#3A261A]",
        "overflow-hidden",
      )}
    >
      {children}
      {icon || <DefaultIcon />}
      <div
        className={clsx(
          "select-none",
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
          "group-hover/cta-button:opacity-100",
          "group-hover/cta-button:scale-100",
          "pointer-events-none",
          "bg-landing-copy-command-hover-bg-dark",
        )}
      />
    </Link>
  );
};

const DefaultIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path
      xmlns="http://www.w3.org/2000/svg"
      d="M10 8L14 12L10 16M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);
