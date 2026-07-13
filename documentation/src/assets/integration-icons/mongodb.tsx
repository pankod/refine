import * as React from "react";
import type { SVGProps } from "react";

const MsSqlServer = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <g clipPath="url(#mongodb-aa)">
      <path
        fill="#13AA52"
        d="M17.287 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.352-.494-.709-1.373-.709-1.373L11.98 0c-.036.495-.055.685-.522 1.184-.724.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.885 9.884l.07.05v-.005c.004.03.196 1.408.33 2.867h.482c.114-1.032.283-2.056.509-3.07l.039-.025c.275-.197.538-.412.786-.643l.028-.025a11.341 11.341 0 0 0 3.638-8.464 13.569 13.569 0 0 0-.198-2.218ZM11.95 17.75s0-8.29.274-8.29c.213 0 .49 10.695.49 10.695-.38-.045-.764-1.76-.764-2.405Z"
      />
    </g>
    <defs>
      <clipPath id="mongodb-a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);

export default MsSqlServer;
