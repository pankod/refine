import { ErrorMessage } from "@hookform/error-message";
import cn, { clsx } from "clsx";
import {
  forwardRef,
  type SelectHTMLAttributes,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { get } from "react-hook-form";

import s from "./NativeSelect.module.css";
import { ChevronDown } from "@components/icons";

export type NativeSelectProps = {
  placeholder?: string;
  errors?: Record<string, unknown>;
  touched?: Record<string, unknown>;
  label: string;
} & SelectHTMLAttributes<HTMLSelectElement>;

export const NativeSelect = forwardRef<HTMLSelectElement, NativeSelectProps>(
  (
    {
      placeholder = "Select...",
      errors,
      label,
      touched,
      className,
      children,
      required,
      ...props
    },
    ref,
  ) => {
    const innerRef = useRef<HTMLSelectElement>(null);
    const [isPlaceholder, setIsPlaceholder] = useState(false);

    useImperativeHandle<HTMLSelectElement | null, HTMLSelectElement | null>(
      ref,
      () => innerRef.current,
    );

    const hasError = props.name
      ? get(errors, props.name) && get(touched, props.name)
      : false;

    useEffect(() => {
      if (innerRef.current && innerRef.current.value === "") {
        setIsPlaceholder(true);
      } else {
        setIsPlaceholder(false);
      }
    }, [innerRef.current?.value]);

    return (
      <div
        onFocus={() => innerRef.current?.focus()}
        onBlur={() => innerRef.current?.blur()}
        className={cn(s.fieldset, className, {
          "text-gray-500": isPlaceholder,
        })}
      >
        <label
          htmlFor={props.name}
          onClick={() => innerRef.current?.focus()}
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
        <div className={clsx("relative")}>
          <select
            ref={innerRef}
            className={cn(
              s.select,
              {
                "!border-rose-500 focus:!border-rose-500": hasError,
              },
              "rounded-lg",
            )}
            {...props}
          >
            <option value="">{placeholder}</option>
            {children}
          </select>
          <div
            className={clsx(
              "absolute",
              "right-0",
              "top-0",
              "h-full",
              "flex",
              "items-center",
              "justify-center",
              "right-2",
            )}
          >
            <ChevronDown className={clsx("w-5", "h-5", "text-gray-dark")} />
          </div>
        </div>
        {hasError && props.name && (
          <ErrorMessage
            errors={errors}
            name={props.name}
            render={({ message }) => {
              return (
                <div className="pt-1 text-xs text-rose-500">
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

NativeSelect.displayName = "NativeSelect";
