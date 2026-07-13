import React, { type RefObject } from "react";
import { useTextField } from "@react-aria/textfield";
import type { AriaTextFieldProps } from "react-aria";

export default function Input(props: AriaTextFieldProps) {
  // eslint-disable-next-line
  const ref: RefObject<any> = React.useRef();
  const {
    inputProps: { className, ...inputProps },
  } = useTextField(props, ref);

  return (
    <div className="w-full">
      <input
        {...inputProps}
        ref={ref}
        className={`w-full rounded-md border-2 border-slate-300 py-1.5 px-2.5 hover:border-sky-200 focus:border-sky-400 active:border-sky-400 ${className}`}
      />
    </div>
  );
}
