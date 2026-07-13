import { useRef } from "react";
import { useGetIdentity } from "@refinedev/core";
import type { Customer } from "@medusajs/medusa";

export const Avatar: React.FC = () => {
  const ref = useRef() as React.MutableRefObject<HTMLInputElement>;

  const { data } = useGetIdentity<Customer>();

  return (
    <div
      ref={ref}
      className="border-primary hover:border-secondary focus:border-secondary inline-block h-8 w-8 rounded-full border-2 transition-colors ease-linear"
      style={{
        backgroundImage:
          "linear-gradient(140deg, rgb(121, 255, 225), rgb(218, 60, 60) 100%)",
      }}
    >
      {data && <img />}
    </div>
  );
};
