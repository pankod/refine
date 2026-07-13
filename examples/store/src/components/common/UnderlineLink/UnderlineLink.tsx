import Link from "next/link";

import { ArrowRight } from "@icons";

type UnderlineLinkProps = {
  href: string;
  children?: React.ReactNode;
};

export const UnderlineLink: React.FC<UnderlineLinkProps> = ({
  href,
  children,
}: UnderlineLinkProps) => {
  return (
    <div className="flex items-start">
      <Link
        href={href}
        className="text-large-regular group flex items-center gap-x-4 border-b border-current py-2 transition-all duration-300 hover:pl-4 hover:pr-1"
      >
        <span>{children}</span>
        <ArrowRight
          size={20}
          className="transition-all duration-300 group-hover:ml-2"
        />
      </Link>
    </div>
  );
};
