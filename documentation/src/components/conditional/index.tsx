import React from "react";

type Props = {
  if: boolean;
  maxWait?: number;
  children?: () => JSX.Element;
};

export const Conditional = ({
  if: condition,
  maxWait: maxWaitProp,
  children,
}: Props): JSX.Element => {
  const [show, setShow] = React.useState(condition);
  const [maxWait] = React.useState(maxWaitProp);

  React.useEffect(() => {
    if (!show && condition) {
      setShow(true);
    }
  }, [condition]);

  React.useEffect(() => {
    if (maxWait) {
      const timeout = setTimeout(() => {
        setShow(true);
      }, maxWait);

      return () => clearTimeout(timeout);
    }
  }, [maxWait]);

  const memoized = React.useMemo(() => {
    if (!show) {
      return null;
    }
    if (typeof children === "function") {
      return children();
    }
    return null;
  }, [show]);

  if (typeof children !== "undefined" && typeof children !== "function") {
    throw new Error("Conditional component requires a function as a child");
  }

  return memoized;
};
