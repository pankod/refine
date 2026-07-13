import { useState } from "react";
import { Link, type LinkProps } from "react-router";

type Props = {} & LinkProps;

export const LinkDoubleClick = (props: Props) => {
  const [preventDefault, setPreventDefault] = useState(true);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (props.onClick) {
      props.onClick(e);
    }

    // double click
    if (preventDefault) {
      e.preventDefault();
    }
    setPreventDefault(false);
    setTimeout(() => {
      setPreventDefault(true);
    }, 500);
  };

  return (
    <Link {...props} onClick={handleClick}>
      {props.children}
    </Link>
  );
};
