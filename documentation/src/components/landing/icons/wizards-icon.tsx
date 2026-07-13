import * as React from "react";
import type { SVGProps } from "react";

export const WizardsIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <path
        fill="currentColor"
        d="M15.77 11.964a.75.75 0 0 0 .92-.419l.666-1.498a.665.665 0 0 1 .534-.391l1.443-.16a.75.75 0 0 0 .447-1.276l-1.2-1.201a.665.665 0 0 1-.18-.615l.332-1.491a.75.75 0 0 0-1.13-.799l-1.25.781a.665.665 0 0 1-.704 0l-1.25-.781a.75.75 0 0 0-1.13.799l.331 1.491a.665.665 0 0 1-.179.615l-1.2 1.2a.75.75 0 0 0 .447 1.276l1.443.16a.665.665 0 0 1 .534.392l.666 1.498a.747.747 0 0 0 .46.419ZM11.344 9.827a5.016 5.016 0 0 0 2.829 2.829l-6.759 6.758a2 2 0 1 1-2.828-2.828l6.758-6.759Z"
      />
    </svg>
  );
};
