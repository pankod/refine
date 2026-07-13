import React, { useImperativeHandle } from "react";
import cn, { clsx } from "clsx";
import { ErrorMessage } from "@hookform/error-message";
import { get } from "react-hook-form";

import s from "./Input.module.css";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  errors?: Record<string, unknown>;
  touched?: Record<string, unknown>;
  name: string;
  containerClassName?: string;
  errorClassName?: string;
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      name,
      label,
      errors,
      touched,
      required,
      containerClassName,
      errorClassName,
      ...props
    },
    ref,
  ) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    // eslint-disable-next-line
    useImperativeHandle(ref, () => inputRef.current!);

    const hasError = get(errors, name) && get(touched, name);

    return (
      <div className={cn(s.fieldset, containerClassName)}>
        {label && (
          <label
            htmlFor={name}
            onClick={() => inputRef.current?.focus()}
            className={cn(
              {
                "!text-rose-500": hasError,
              },
              "text-base",
              "leading-6",
              "capitalize",
              "text-gray-darkest",
              "pb-2",
            )}
          >
            {label}
            {required && <span className="text-rose-500">*</span>}
          </label>
        )}
        <input
          name={name}
          className={cn(s.input, "rounded-lg", {
            "!border-rose-500 focus:!border-rose-500": hasError,
          })}
          {...props}
          ref={inputRef}
        />
        {hasError && (
          <ErrorMessage
            errors={errors}
            name={name}
            render={({ message }) => {
              return (
                <div
                  className={clsx("pt-1 text-xs text-rose-500", errorClassName)}
                >
                  <span>{message}</span>
                </div>
              );
            }}
          />
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
