import React, {
  forwardRef,
  type ButtonHTMLAttributes,
  type JSXElementConstructor,
  useRef,
} from "react";
import cn from "clsx";
import mergeRefs from "react-merge-refs";

import { LoadingDots } from "../../index";
import s from "./Button.module.css";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  className?: string;
  variant?: "flat" | "slim" | "ghost" | "naked";
  active?: boolean;
  type?: "submit" | "reset" | "button";
  Component?: string | JSXElementConstructor<any>; // eslint-disable-line
  width?: string | number;
  loading?: boolean;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = forwardRef((props, buttonRef) => {
  const {
    className,
    variant = "flat",
    children,
    active,
    width,
    loading = false,
    disabled = false,
    style = {},
    Component = "button",
    ...rest
  } = props;
  const ref = useRef<typeof Component>(null);

  const rootClassName = cn(
    s.root,
    {
      [s.ghost]: variant === "ghost",
      [s.slim]: variant === "slim",
      [s.naked]: variant === "naked",
      [s.loading]: loading,
      [s.disabled]: disabled,
    },
    className,
  );

  return (
    <Component
      aria-pressed={active}
      data-variant={variant}
      ref={mergeRefs([ref, buttonRef])}
      className={rootClassName}
      disabled={disabled}
      style={{
        width,
        ...style,
      }}
      {...rest}
    >
      {children}
      {loading && (
        <i className="m-0 flex pl-2">
          <LoadingDots />
        </i>
      )}
    </Component>
  );
});

Button.displayName = "Button";
