import React, { type ElementType, type RefObject } from "react";
import { useButton } from "@react-aria/button";
import type { AriaButtonProps } from "react-aria";

// eslint-disable-next-line
export default function Button(props: AriaButtonProps<ElementType> | any) {
  // eslint-disable-next-line
  const ref: RefObject<any> = React.useRef();
  const { buttonProps } = useButton(props, ref);

  return (
    <button
      {...buttonProps}
      ref={ref}
      className="mb-5 mt-3 flex items-center self-end rounded-lg bg-indigo-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-indigo-600 sm:w-auto"
    >
      {props.children}
    </button>
  );
}
