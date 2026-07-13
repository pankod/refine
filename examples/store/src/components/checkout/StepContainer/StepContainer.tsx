import { Disclosure } from "@headlessui/react";
import cn from "clsx";

import { useCheckout } from "@lib/context";

import s from "./StepContainer.module.css";
import { StepTitle } from "../StepTitle";

interface StepContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  index: number;
  title: string;
  closedState?: React.ReactNode;
  children?: React.ReactNode;
}

export const StepContainer: React.FC<StepContainerProps> = ({
  index,
  title,
  className,
  closedState,
  children,
  ...props
}) => {
  const {
    editAddresses: { state },
  } = useCheckout();
  return (
    <div>
      <div
        className={cn(className, {
          "pointer-events-none select-none opacity-50": state,
        })}
        {...props}
      >
        <Disclosure>
          <Disclosure.Panel
            static
            className={cn(s.panel, {
              "max-h-[9999px] opacity-100": !state,
              "max-h-0 opacity-0": state,
            })}
          >
            <StepTitle title={title} step={index} />
            {children}
          </Disclosure.Panel>
          {/* <Disclosure.Panel
            static
            className={cn(s.panel, {
              "max-h-[9999px] opacity-100": state,
              "max-h-0 opacity-0": !state,
            })}
          >
            {closedState}
          </Disclosure.Panel> */}
        </Disclosure>
      </div>
    </div>
  );
};
