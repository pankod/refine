import * as React from "react";
import type { SVGProps } from "react";

const SvgAzureActiveDirectory = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={25}
    fill="none"
    {...props}
  >
    <path fill="#1E91DB" d="m.5 14.368 12-14 12 14-12 10-12-10Z" />
    <path
      fill="#fff"
      fillRule="evenodd"
      d="M11.885 9.272c.038.012.076.023.115.033v8.126a1.985 1.985 0 0 0-.39.145l-3.26-2.445c.097-.235.15-.493.15-.763 0-.4-.117-.771-.319-1.084l3.704-4.012Zm2.085-.548a2 2 0 1 0-2.94 0l-3.584 3.882a2 2 0 1 0 .303 3.324l3.093 2.32a2 2 0 1 0 3.316 0l3.093-2.32a2 2 0 1 0 .303-3.324L13.97 8.724Zm-.97.581c.039-.01.077-.02.115-.033l3.704 4.012a1.99 1.99 0 0 0-.169 1.847l-3.26 2.445a1.985 1.985 0 0 0-.39-.145V9.305Z"
      clipRule="evenodd"
    />
  </svg>
);

export default SvgAzureActiveDirectory;
