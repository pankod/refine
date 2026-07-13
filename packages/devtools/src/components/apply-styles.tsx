import React from "react";

type Props = {
  children: string;
};

export const ApplyStyles = ({ children }: Props) => {
  React.useEffect(() => {
    const element = document.createElement("style");
    element.innerHTML = children;
    document.head.appendChild(element);

    return () => {
      document.head.removeChild(element);
    };
  }, [children]);

  return null;
};
